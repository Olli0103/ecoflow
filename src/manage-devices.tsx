import { ActionPanel, Action, List, Icon, Color, showToast, Toast, confirmAlert, Form, launchCommand, LaunchType, LocalStorage } from "@raycast/api";
import { useState, useEffect } from "react";
import { ecoFlowAPI } from "./api";
import { PowerStreamDetails } from "./powerstream-control";
import { SmartPlugDetails } from "./smartplug-control";

interface Device {
  sn: string;
  deviceName: string;
  online: number;
  type: string;
  originalType?: string; // Optional property to store the original API device type
}

export default function Command() {
  const [isLoading, setIsLoading] = useState(true);
  const [devices, setDevices] = useState<Device[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showAddDeviceForm, setShowAddDeviceForm] = useState(false);
  const [showEditTypeForm, setShowEditTypeForm] = useState<Device | null>(null);
  const [autoSyncEnabled, setAutoSyncEnabled] = useState(true); // Default to true for auto-sync
  const [debugMode, setDebugMode] = useState(false); // Debug mode for additional logging

  async function fetchDevices() {
    setIsLoading(true);
    try {
      // Get saved devices from local storage
      const savedDevices = await ecoFlowAPI.getSavedDevices();

      // Check online status for each device
      const devicesWithStatus = await Promise.all(
        savedDevices.map(async (device) => {
          try {
            // Try to get device status from API
            const apiDevices = await ecoFlowAPI.getDevices();
            const apiDevice = apiDevices.find((d) => d.sn === device.sn);

            if (apiDevice) {
              return {
                ...device,
                online: apiDevice.online,
                deviceName: apiDevice.deviceName || device.deviceName,
              };
            }

            return device;
          } catch (err) {
            // If we can't get status, just return the saved device
            return device;
          }
        }),
      );

      setDevices(devicesWithStatus);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRemoveDevice(device: Device) {
    const options = {
      title: `Remove ${device.deviceName}?`,
      message: "This will remove the device from your saved devices. You can add it again later.",
      icon: Icon.Trash,
    };

    if (await confirmAlert(options)) {
      try {
        await ecoFlowAPI.removeDevice(device.sn);
        await showToast({
          style: Toast.Style.Success,
          title: "Device removed successfully",
        });
        fetchDevices();
      } catch (error) {
        showToast({
          style: Toast.Style.Failure,
          title: "Failed to remove device",
          message: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }
  }

  async function handleAddDevice(values: { serialNumber: string; deviceName: string; deviceType: string }) {
    setIsLoading(true);
    
    try {
      // Validate serial number
      if (!values.serialNumber) {
        showToast({
          style: Toast.Style.Failure,
          title: "Serial number is required",
        });
        setIsLoading(false);
        return;
      }
      
      // Save device to local storage
      await ecoFlowAPI.saveDevice({
        sn: values.serialNumber,
        deviceName: values.deviceName || values.serialNumber,
        online: 0, // We'll check online status when viewing devices
        type: values.deviceType,
      });
      
      await showToast({
        style: Toast.Style.Success,
        title: "Device added successfully",
      });
      
      setShowAddDeviceForm(false);
      fetchDevices();
    } catch (error) {
      showToast({
        style: Toast.Style.Failure,
        title: "Failed to add device",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function syncDevicesFromAPI() {
    setIsLoading(true);
    try {
      // Get current saved devices
      const savedDevices = await ecoFlowAPI.getSavedDevices();
      const savedSerialNumbers = savedDevices.map(device => device.sn);
      
      // Fetch devices from API
      const apiDevices = await ecoFlowAPI.getDevices();
      
      if (debugMode) {
        console.log("API devices:", JSON.stringify(apiDevices, null, 2));
        showToast({
          style: Toast.Style.Animated,
          title: "Debug: API Devices",
          message: `Found ${apiDevices.length} devices from API`
        });
      }
      
      // Filter for new devices that aren't already saved
      const newDevices = apiDevices.filter(device => !savedSerialNumbers.includes(device.sn));
      
      if (newDevices.length === 0) {
        showToast({
          style: Toast.Style.Success,
          title: "No new devices found",
          message: "All your EcoFlow devices are already saved"
        });
        setIsLoading(false);
        return;
      }
      
      if (debugMode) {
        console.log("New devices to add:", JSON.stringify(newDevices, null, 2));
      }
      
      // Save each new device
      let addedCount = 0;
      let mappingDetails = "";
      
      for (const device of newDevices) {
        try {
          // Map API device type to our internal device type format
          const mappedType = mapDeviceType(device.type);
          
          if (debugMode) {
            mappingDetails += `${device.type} → ${mappedType}\n`;
            console.log(`Mapping device type: ${device.type} → ${mappedType}`);
          }
          
          await ecoFlowAPI.saveDevice({
            sn: device.sn,
            deviceName: device.deviceName || device.sn,
            online: device.online,
            type: mappedType,
            originalType: device.type // Store the original type from the API
          } as any);
          addedCount++;
        } catch (error) {
          console.error(`Failed to add device ${device.sn}:`, error);
        }
      }
      
      showToast({
        style: Toast.Style.Success,
        title: "Devices synced successfully",
        message: `Added ${addedCount} new device(s)`
      });
      
      if (debugMode && mappingDetails) {
        showToast({
          style: Toast.Style.Animated,
          title: "Debug: Type Mapping",
          message: mappingDetails
        });
      }
      
      // Refresh the device list
      fetchDevices();
    } catch (error) {
      showToast({
        style: Toast.Style.Failure,
        title: "Failed to sync devices",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    } finally {
      setIsLoading(false);
    }
  }
  
  // Helper function to map API device types to our internal format
  function mapDeviceType(apiType: string): string {
    if (!apiType) return "unknown";
    
    const type = apiType.toLowerCase().trim();
    
    // Map Delta models
    if (type.includes("delta pro ultra") || type.includes("delta_pro_ultra")) {
      return "delta-pro-ultra";
    } else if (type.includes("delta pro 3") || type.includes("delta_pro_3")) {
      return "delta-pro-3";
    } else if (type.includes("delta pro") || type.includes("delta_pro")) {
      return "delta-pro";
    } else if (type.includes("delta 2 max") || type.includes("delta_2_max")) {
      return "delta-2-max";
    } else if (type.includes("delta 2") || type.includes("delta_2")) {
      return "delta-2";
    } else if (type.includes("delta max") || type.includes("delta_max")) {
      return "delta-pro"; // Delta Max is closer to Pro in capabilities
    } else if (type.includes("delta mini") || type.includes("delta_mini")) {
      return "delta-2"; // Delta Mini is closer to Delta 2 in capabilities
    } else if (type.includes("delta")) {
      return "delta-2"; // Default to Delta 2 for other Delta models
    }
    
    // Map River models - treat them as their own category
    if (type.includes("river pro") || type.includes("river_pro")) {
      return "river-pro";
    } else if (type.includes("river max") || type.includes("river_max")) {
      return "river-max";
    } else if (type.includes("river plus") || type.includes("river_plus")) {
      return "river-plus";
    } else if (type.includes("river mini") || type.includes("river_mini")) {
      return "river-mini";
    } else if (type.includes("river")) {
      return "river"; // Default River model
    }
    
    // Map other device types
    if (type.includes("powerstream")) {
      return "powerstream";
    } else if (type.includes("smart plug") || type.includes("smart-plug") || type.includes("smart_plug")) {
      return "smart-plug";
    } else if (type.includes("wave") || type.includes("air conditioner") || type.includes("air_conditioner")) {
      return "wave-air-conditioner";
    } else if (type.includes("glacier")) {
      return "glacier";
    } else if (type.includes("power kits") || type.includes("power-kits") || type.includes("power_kits")) {
      return "power-kits";
    } else if (type.includes("powerocean")) {
      return "powerocean";
    } else if (type.includes("smart home panel") || type.includes("smart-home-panel") || type.includes("smart_home_panel")) {
      return "smart-home-panel";
    }
    
    // If no match, return the original type
    return apiType;
  }

  // Load auto-sync preference from local storage
  async function loadAutoSyncPreference() {
    const savedPreference = await LocalStorage.getItem("ecoflow_auto_sync_enabled");
    if (savedPreference !== undefined) {
      setAutoSyncEnabled(savedPreference === "true");
    }
  }
  
  // Save auto-sync preference to local storage
  async function saveAutoSyncPreference(enabled: boolean) {
    await LocalStorage.setItem("ecoflow_auto_sync_enabled", enabled.toString());
    setAutoSyncEnabled(enabled);
    
    showToast({
      style: Toast.Style.Success,
      title: `Auto-sync ${enabled ? "enabled" : "disabled"}`,
      message: enabled ? "Devices will be automatically synced on startup" : "Devices will not be automatically synced"
    });
  }

  // Load debug mode preference from local storage
  async function loadDebugModePreference() {
    const savedPreference = await LocalStorage.getItem("ecoflow_debug_mode_enabled");
    if (savedPreference !== undefined) {
      setDebugMode(savedPreference === "true");
    }
  }
  
  // Save debug mode preference to local storage
  async function saveDebugModePreference(enabled: boolean) {
    await LocalStorage.setItem("ecoflow_debug_mode_enabled", enabled.toString());
    setDebugMode(enabled);
    
    showToast({
      style: Toast.Style.Success,
      title: `Debug mode ${enabled ? "enabled" : "disabled"}`,
      message: enabled ? "Additional debug information will be shown" : "Debug information will be hidden"
    });
  }

  // Handle editing device type
  async function handleEditDeviceType(device: Device, newType: string) {
    setIsLoading(true);
    try {
      // Update the device type while keeping other properties the same
      // If there's no originalType yet, use the current type as the original
      const originalType = (device as any).originalType || device.type;
      
      await ecoFlowAPI.saveDevice({
        ...device,
        type: newType,
        originalType: originalType
      } as any);
      
      showToast({
        style: Toast.Style.Success,
        title: "Device type updated",
        message: `Changed ${device.deviceName || device.sn} type to ${newType}`
      });
      
      // Close the form and refresh the device list
      setShowEditTypeForm(null);
      fetchDevices();
    } catch (error) {
      showToast({
        style: Toast.Style.Failure,
        title: "Failed to update device type",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    async function initialLoad() {
      await loadAutoSyncPreference();
      await loadDebugModePreference();
      await fetchDevices();
      
      // Auto-sync devices from API if enabled
      if (autoSyncEnabled) {
        await syncDevicesFromAPI();
      }
    }
    
    initialLoad();
  }, []);

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case "powerstream":
        return { source: Icon.Plug, tintColor: Color.Blue };
      case "delta-pro":
      case "delta-2":
      case "delta-2-max":
      case "delta-pro-ultra":
      case "delta-pro-3":
      case "power-kits":
      case "powerocean":
        return { source: Icon.Battery, tintColor: Color.Green };
      case "smart-home-panel":
        return { source: Icon.House, tintColor: Color.Purple };
      case "smart-plug":
        return { source: Icon.Plug, tintColor: Color.Orange };
      case "wave-air-conditioner":
      case "glacier":
        return { source: Icon.Snowflake, tintColor: Color.Blue };
      default:
        return { source: Icon.Bolt, tintColor: Color.Yellow };
    }
  };

  if (showAddDeviceForm) {
    return (
      <Form
        isLoading={isLoading}
        actions={
          <ActionPanel>
            <Action.SubmitForm onSubmit={handleAddDevice} />
            <Action title="Cancel" icon={Icon.XmarkCircle} onAction={() => setShowAddDeviceForm(false)} />
          </ActionPanel>
        }
      >
        <Form.TextField
          id="serialNumber"
          title="Serial Number"
          placeholder="Enter device serial number"
          info="The serial number of your EcoFlow device"
        />
        
        <Form.TextField
          id="deviceName"
          title="Device Name"
          placeholder="Enter a name for your device"
          info="A friendly name for your device"
        />
        
        <Form.Dropdown id="deviceType" title="Device Type" info="Select your device type">
          <Form.Dropdown.Item value="powerstream" title="PowerStream" icon="🔌" />
          <Form.Dropdown.Item value="delta-pro" title="DELTA Pro" icon="🔋" />
          <Form.Dropdown.Item value="delta-2" title="DELTA 2" icon="🔋" />
          <Form.Dropdown.Item value="delta-2-max" title="DELTA 2 Max" icon="🔋" />
          <Form.Dropdown.Item value="delta-pro-ultra" title="DELTA Pro Ultra" icon="🔋" />
          <Form.Dropdown.Item value="delta-pro-3" title="DELTA Pro 3" icon="🔋" />
          <Form.Dropdown.Item value="smart-home-panel" title="Smart Home Panel" icon="🏠" />
          <Form.Dropdown.Item value="smart-plug" title="Smart Plug" icon="🔌" />
          <Form.Dropdown.Item value="wave-air-conditioner" title="Wave Air Conditioner" icon="❄️" />
          <Form.Dropdown.Item value="glacier" title="Glacier" icon="❄️" />
          <Form.Dropdown.Item value="power-kits" title="Power Kits" icon="🔋" />
          <Form.Dropdown.Item value="powerocean" title="PowerOcean" icon="🔋" />
        </Form.Dropdown>
      </Form>
    );
  }

  if (showEditTypeForm) {
    // Check if the device has an originalType property
    const originalType = (showEditTypeForm as any).originalType || showEditTypeForm.type;
    const hasOriginalType = originalType !== showEditTypeForm.type;
    
    return (
      <Form
        isLoading={isLoading}
        actions={
          <ActionPanel>
            <Action.SubmitForm 
              title="Update Device Type"
              icon={Icon.Pencil}
              onSubmit={(values) => handleEditDeviceType(showEditTypeForm, values.deviceType)} 
            />
            {hasOriginalType && (
              <Action
                title="Reset to Original Type"
                icon={Icon.ArrowCounterClockwise}
                onAction={() => handleEditDeviceType(showEditTypeForm, originalType)}
              />
            )}
            <Action 
              title="Cancel" 
              icon={Icon.XmarkCircle} 
              onAction={() => setShowEditTypeForm(null)} 
            />
          </ActionPanel>
        }
      >
        <Form.Description 
          title="Edit Device Type" 
          text={`Change the device type for ${showEditTypeForm.deviceName || showEditTypeForm.sn}`} 
        />
        
        <Form.Dropdown 
          id="deviceType" 
          title="Device Type" 
          info="Select the correct device type"
          defaultValue={showEditTypeForm.type}
        >
          <Form.Dropdown.Item value="delta-pro-ultra" title="DELTA Pro Ultra" icon="🔋" />
          <Form.Dropdown.Item value="delta-pro-3" title="DELTA Pro 3" icon="🔋" />
          <Form.Dropdown.Item value="delta-pro" title="DELTA Pro" icon="🔋" />
          <Form.Dropdown.Item value="delta-2-max" title="DELTA 2 Max" icon="🔋" />
          <Form.Dropdown.Item value="delta-2" title="DELTA 2" icon="🔋" />
          <Form.Dropdown.Item value="river-pro" title="RIVER Pro" icon="🔋" />
          <Form.Dropdown.Item value="river-max" title="RIVER Max" icon="🔋" />
          <Form.Dropdown.Item value="river-plus" title="RIVER Plus" icon="🔋" />
          <Form.Dropdown.Item value="river-mini" title="RIVER Mini" icon="🔋" />
          <Form.Dropdown.Item value="river" title="RIVER" icon="🔋" />
          <Form.Dropdown.Item value="powerstream" title="PowerStream" icon="🔌" />
          <Form.Dropdown.Item value="smart-plug" title="Smart Plug" icon="🔌" />
          <Form.Dropdown.Item value="smart-home-panel" title="Smart Home Panel" icon="🏠" />
          <Form.Dropdown.Item value="wave-air-conditioner" title="Wave Air Conditioner" icon="❄️" />
          <Form.Dropdown.Item value="glacier" title="Glacier" icon="❄️" />
          <Form.Dropdown.Item value="power-kits" title="Power Kits" icon="🔋" />
          <Form.Dropdown.Item value="powerocean" title="PowerOcean" icon="🔋" />
        </Form.Dropdown>
        
        <Form.Description 
          title="Current Type" 
          text={`Current type: ${showEditTypeForm.type}`} 
        />
        
        {hasOriginalType && (
          <Form.Description 
            title="Original API Type" 
            text={`Original API type: ${originalType}`} 
          />
        )}
      </Form>
    );
  }

  if (error) {
    return (
      <List isLoading={isLoading}>
        <List.EmptyView
          icon={{ source: Icon.Warning, tintColor: Color.Red }}
          title="Failed to load devices"
          description={error}
        />
      </List>
    );
  }

  return (
    <List
      isLoading={isLoading}
      searchBarPlaceholder="Search devices"
      actions={
        <ActionPanel>
          <Action
            title="Add Device"
            icon={Icon.Plus}
            onAction={() => setShowAddDeviceForm(true)}
            shortcut={{ modifiers: ["cmd"], key: "n" }}
          />
          <Action
            title="Sync Devices from API"
            icon={Icon.Download}
            onAction={syncDevicesFromAPI}
            shortcut={{ modifiers: ["cmd"], key: "s" }}
          />
          <Action
            title="Refresh"
            icon={Icon.ArrowClockwise}
            onAction={fetchDevices}
            shortcut={{ modifiers: ["cmd"], key: "r" }}
          />
          {devices.length > 0 && (
            <ActionPanel.Submenu
              title="Edit Device Type"
              icon={Icon.Pencil}
            >
              {devices.map(device => (
                <Action
                  key={device.sn}
                  title={device.deviceName || device.sn}
                  icon={getDeviceIcon(device.type)}
                  onAction={() => setShowEditTypeForm(device)}
                />
              ))}
            </ActionPanel.Submenu>
          )}
          <ActionPanel.Submenu
            title="Preferences"
            icon={Icon.Gear}
          >
            <Action
              title={autoSyncEnabled ? "Disable Auto-Sync" : "Enable Auto-Sync"}
              icon={autoSyncEnabled ? Icon.XmarkCircle : Icon.Checkmark}
              onAction={() => saveAutoSyncPreference(!autoSyncEnabled)}
            />
            <Action
              title={debugMode ? "Disable Debug Mode" : "Enable Debug Mode"}
              icon={debugMode ? Icon.XmarkCircle : Icon.Bug}
              onAction={() => saveDebugModePreference(!debugMode)}
            />
          </ActionPanel.Submenu>
        </ActionPanel>
      }
    >
      {devices.length === 0 && !isLoading ? (
        <List.EmptyView
          icon={{ source: Icon.Warning, tintColor: Color.Yellow }}
          title="No devices found"
          description="Add a device using the 'Add Device' button"
          actions={
            <ActionPanel>
              <Action
                title="Add Device"
                icon={Icon.Plus}
                onAction={() => setShowAddDeviceForm(true)}
              />
            </ActionPanel>
          }
        />
      ) : (
        devices.map((device) => (
          <List.Item
            key={device.sn}
            title={device.deviceName || device.sn}
            subtitle={getDeviceTypeLabel(device.type)}
            icon={getDeviceIcon(device.type)}
            accessories={[
              { text: device.online === 1 ? "Online" : "Offline", icon: getStatusIcon(device.online) },
              ...(((device as any).originalType && (device as any).originalType !== device.type) 
                ? [{ tag: { color: Color.Purple, value: "Mapped" } }] 
                : [])
            ]}
            actions={
              <ActionPanel>
                {device.type === "powerstream" && device.online === 1 ? (
                  <Action.Push
                    title="View Details & Control"
                    icon={Icon.Eye}
                    target={<PowerStreamDetails device={device} />}
                  />
                ) : device.type === "smart-plug" && device.online === 1 ? (
                  <Action.Push
                    title="View Details & Control"
                    icon={Icon.Eye}
                    target={<SmartPlugDetails device={device} />}
                  />
                ) : device.type.toLowerCase().includes("delta") && device.online === 1 ? (
                  <Action
                    title="Open Delta Control"
                    icon={Icon.Eye}
                    onAction={() => launchCommand({ 
                      name: "delta-control", 
                      type: LaunchType.UserInitiated,
                      context: { selectedDevice: device }
                    })}
                  />
                ) : (
                  <Action
                    title="Device Offline or Not Supported"
                    icon={Icon.XmarkCircle}
                    style={Action.Style.Destructive}
                  />
                )}
                <Action
                  title="Remove Device"
                  icon={Icon.Trash}
                  style={Action.Style.Destructive}
                  onAction={() => handleRemoveDevice(device)}
                  shortcut={{ modifiers: ["cmd"], key: "backspace" }}
                />
                <Action
                  title="Edit Device Type"
                  icon={Icon.Pencil}
                  onAction={() => setShowEditTypeForm(device)}
                  shortcut={{ modifiers: ["cmd"], key: "e" }}
                />
                <Action
                  title="Add Device"
                  icon={Icon.Plus}
                  onAction={() => setShowAddDeviceForm(true)}
                  shortcut={{ modifiers: ["cmd"], key: "n" }}
                />
                <Action
                  title="Sync Devices from API"
                  icon={Icon.Download}
                  onAction={syncDevicesFromAPI}
                  shortcut={{ modifiers: ["cmd"], key: "s" }}
                />
                <Action
                  title="Refresh"
                  icon={Icon.ArrowClockwise}
                  onAction={fetchDevices}
                  shortcut={{ modifiers: ["cmd"], key: "r" }}
                />
                <ActionPanel.Submenu
                  title="Preferences"
                  icon={Icon.Gear}
                >
                  <Action
                    title={autoSyncEnabled ? "Disable Auto-Sync" : "Enable Auto-Sync"}
                    icon={autoSyncEnabled ? Icon.XmarkCircle : Icon.Checkmark}
                    onAction={() => saveAutoSyncPreference(!autoSyncEnabled)}
                  />
                  <Action
                    title={debugMode ? "Disable Debug Mode" : "Enable Debug Mode"}
                    icon={debugMode ? Icon.XmarkCircle : Icon.Bug}
                    onAction={() => saveDebugModePreference(!debugMode)}
                  />
                </ActionPanel.Submenu>
              </ActionPanel>
            }
          />
        ))
      )}
    </List>
  );
}

function getDeviceTypeLabel(type: string): string {
  switch (type) {
    case "powerstream":
      return "PowerStream";
    case "delta-pro":
      return "DELTA Pro";
    case "delta-2":
      return "DELTA 2";
    case "delta-2-max":
      return "DELTA 2 Max";
    case "delta-pro-ultra":
      return "DELTA Pro Ultra";
    case "delta-pro-3":
      return "DELTA Pro 3";
    case "smart-home-panel":
      return "Smart Home Panel";
    case "smart-plug":
      return "Smart Plug";
    case "wave-air-conditioner":
      return "Wave Air Conditioner";
    case "glacier":
      return "Glacier";
    case "power-kits":
      return "Power Kits";
    case "powerocean":
      return "PowerOcean";
    default:
      return "EcoFlow Device";
  }
}

function getStatusIcon(online: number): { source: Icon; tintColor: Color } {
  return online === 1
    ? { source: Icon.Checkmark, tintColor: Color.Green }
    : { source: Icon.XmarkCircle, tintColor: Color.Red };
}
