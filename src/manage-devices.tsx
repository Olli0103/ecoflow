import { ActionPanel, Action, List, Icon, Color, showToast, Toast, confirmAlert, Form } from "@raycast/api";
import { useState, useEffect } from "react";
import { ecoFlowAPI } from "./api";
import { PowerStreamDetails } from "./powerstream-control";
import { SmartPlugDetails } from "./smartplug-control";

interface Device {
  sn: string;
  deviceName: string;
  online: number;
  type: string;
}

export default function Command() {
  const [isLoading, setIsLoading] = useState(true);
  const [devices, setDevices] = useState<Device[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showAddDeviceForm, setShowAddDeviceForm] = useState(false);

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

  useEffect(() => {
    fetchDevices();
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
            title="Refresh"
            icon={Icon.ArrowClockwise}
            onAction={fetchDevices}
            shortcut={{ modifiers: ["cmd"], key: "r" }}
          />
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
            accessories={[{ text: device.online === 1 ? "Online" : "Offline", icon: getStatusIcon(device.online) }]}
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
                  title="Add Device"
                  icon={Icon.Plus}
                  onAction={() => setShowAddDeviceForm(true)}
                  shortcut={{ modifiers: ["cmd"], key: "n" }}
                />
                <Action
                  title="Refresh"
                  icon={Icon.ArrowClockwise}
                  onAction={fetchDevices}
                  shortcut={{ modifiers: ["cmd"], key: "r" }}
                />
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
