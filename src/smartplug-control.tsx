import { ActionPanel, Action, List, Icon, Color, showToast, Toast, Form, useNavigation, Detail, open } from "@raycast/api";
import { useState, useEffect } from "react";
import { ecoFlowAPI } from "./api";

interface Device {
  sn: string;
  deviceName: string;
  online: number;
  type: string;
}

interface SmartPlugQuota {
  [key: string]: string | number | boolean | undefined;
  
  // Switch status
  switchSta?: boolean; // Smart plug switch status: false: off; true: on
  
  // Power information
  watts?: number; // Operating output power: 0.1 W
  maxWatts?: number; // Maximum power threshold
  current?: number; // Operating current (mA)
  maxCur?: number; // Maximum output current: 0.1 A
  volt?: number; // Operating voltage (V)
  freq?: number; // Operating frequency (Hz)
  
  // Device status
  temp?: number; // Smart plug temperature
  brightness?: number; // RGB light brightness: 0–1023
  errCode?: number; // Error code
  warnCode?: number; // Smart plug warning code
  
  // Location information
  country?: number; // Country code
  town?: number; // City code
  
  // System information
  updateTime?: string; // Last update time
  runTime?: number; // Run time
}

export default function Command() {
  const [isLoading, setIsLoading] = useState(true);
  const [devices, setDevices] = useState<Device[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function fetchDevices() {
    setIsLoading(true);
    try {
      // Get saved devices from local storage
      const savedDevices = await ecoFlowAPI.getSavedDevices();

      // Filter for Smart Plug devices and check online status
      const smartPlugDevices = savedDevices.filter((device) => device.type === "smart-plug");

      if (smartPlugDevices.length === 0) {
        setDevices([]);
        setIsLoading(false);
        return;
      }

      // Check online status for each device
      const devicesWithStatus = await Promise.all(
        smartPlugDevices.map(async (device) => {
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

  useEffect(() => {
    fetchDevices();
  }, []);

  if (error) {
    return (
      <List isLoading={isLoading}>
        <List.EmptyView
          icon={{ source: Icon.Warning, tintColor: Color.Red }}
          title="Failed to load Smart Plug devices"
          description={error}
        />
      </List>
    );
  }

  return (
    <List
      isLoading={isLoading}
      searchBarPlaceholder="Search Smart Plug devices"
      actions={
        <ActionPanel>
          <Action
            title="Open Manage Devices"
            icon={Icon.Plus}
            onAction={() => open("manage-devices")}
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
          title="No Smart Plug devices found"
          description="Add a Smart Plug device using the 'Manage Devices' command first"
          actions={
            <ActionPanel>
              <Action
                title="Open Manage Devices"
                icon={Icon.Plus}
                onAction={() => open("manage-devices")}
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
      ) : (
        devices.map((device) => (
          <List.Item
            key={device.sn}
            title={device.deviceName || device.sn}
            subtitle="Smart Plug"
            icon={{ source: Icon.Plug, tintColor: Color.Green }}
            accessories={[{ text: device.online === 1 ? "Online" : "Offline", icon: getStatusIcon(device.online) }]}
            actions={
              <ActionPanel>
                {device.online === 1 ? (
                  <>
                    <Action.Push title="View Details" icon={Icon.Eye} target={<SmartPlugDetails device={device} />} />
                    <Action.Push
                      title="Configure Settings"
                      icon={Icon.Gear}
                      target={<SmartPlugSettings device={device} />}
                    />
                  </>
                ) : (
                  <Action title="Device Offline" icon={Icon.XmarkCircle} style={Action.Style.Destructive} />
                )}
                <Action
                  title="Open Manage Devices"
                  icon={Icon.Plus}
                  onAction={() => open("manage-devices")}
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

export function SmartPlugDetails({ device }: { device: Device }) {
  const [isLoading, setIsLoading] = useState(true);
  const [quotas, setQuotas] = useState<SmartPlugQuota>({});
  const [error, setError] = useState<string | null>(null);

  async function fetchQuotas() {
    setIsLoading(true);
    try {
      console.log("Fetching quotas for device:", device.sn);
      const deviceQuotas = await ecoFlowAPI.getSmartPlugQuotas(device.sn);
      console.log("API Response - Smart Plug Quotas:", JSON.stringify(deviceQuotas, null, 2));
      
      // Check if response is an error
      if ('success' in deviceQuotas && !deviceQuotas.success) {
        throw new Error(String(deviceQuotas.message));
      }
      
      setQuotas(deviceQuotas as SmartPlugQuota);
    } catch (err) {
      console.error("Error fetching Smart Plug quotas:", err);
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  async function togglePowerState() {
    try {
      // According to the documentation, plugSwitch should be 0 or 1
      const newState = quotas.switchSta === true ? 0 : 1;
      console.log(`Toggling power state for device ${device.sn} from ${quotas.switchSta} to ${newState}`);
      
      // Log the exact request we're about to make
      console.log(`Using command code: WN511_SOCKET_SET_PLUG_SWITCH_MESSAGE`);
      console.log(`Request parameters: { plugSwitch: ${newState} }`);
      console.log(`API endpoint: /iot-open/sign/device/cmd`);
      console.log(`Full expected URL: https://api-e.ecoflow.com/iot-open/sign/device/cmd`);
      
      // Create the request body for logging
      const requestBody = {
        sn: device.sn,
        cmdCode: "WN511_SOCKET_SET_PLUG_SWITCH_MESSAGE",
        params: {
          plugSwitch: newState
        }
      };
      
      console.log(`Full request body:`, JSON.stringify(requestBody, null, 2));
      
      // Use the exact format from the documentation
      const response = await ecoFlowAPI.setSmartPlugFunction(device.sn, "WN511_SOCKET_SET_PLUG_SWITCH_MESSAGE", {
        plugSwitch: newState
      });
      
      // Log the full response for debugging
      console.log(`Toggle power state response:`, JSON.stringify(response, null, 2));
      
      // Check if the API call was successful
      if (!response.success) {
        throw new Error(response.message || "Failed to toggle power state");
      }
      
      showToast({
        style: Toast.Style.Success,
        title: `Smart Plug ${newState === 1 ? "turned on" : "turned off"} successfully`,
      });
      
      // Refresh quotas to update UI
      await fetchQuotas();
    } catch (error) {
      console.error("Error toggling power state:", error);
      showToast({
        style: Toast.Style.Failure,
        title: "Failed to toggle power state",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // Add functions to adjust brightness and maximum power threshold
  async function adjustBrightness(newBrightness: number) {
    try {
      console.log(`Adjusting brightness for device ${device.sn} to ${newBrightness}`);
      
      const response = await ecoFlowAPI.setSmartPlugFunction(device.sn, "WN511_SOCKET_SET_BRIGHTNESS_PACK", {
        brightness: newBrightness
      });
      
      // Check if the API call was successful
      if (!response.success) {
        throw new Error(response.message || "Failed to adjust brightness");
      }
      
      showToast({
        style: Toast.Style.Success,
        title: `LED brightness set to ${newBrightness}`,
      });
      
      // Refresh quotas to update UI
      await fetchQuotas();
    } catch (error) {
      console.error("Error adjusting brightness:", error);
      showToast({
        style: Toast.Style.Failure,
        title: "Failed to adjust brightness",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async function setMaxPowerThreshold(newMaxWatts: number) {
    try {
      console.log(`Setting max power threshold for device ${device.sn} to ${newMaxWatts}W`);
      
      const response = await ecoFlowAPI.setSmartPlugFunction(device.sn, "WN511_SOCKET_SET_MAX_WATTS_PACK", {
        maxWatts: newMaxWatts
      });
      
      // Check if the API call was successful
      if (!response.success) {
        throw new Error(response.message || "Failed to set maximum power threshold");
      }
      
      showToast({
        style: Toast.Style.Success,
        title: `Maximum power threshold set to ${newMaxWatts}W`,
      });
      
      // Refresh quotas to update UI
      await fetchQuotas();
    } catch (error) {
      console.error("Error setting max power threshold:", error);
      showToast({
        style: Toast.Style.Failure,
        title: "Failed to set max power threshold",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  useEffect(() => {
    fetchQuotas();
  }, [device.sn]);

  if (error) {
    return (
      <List isLoading={isLoading}>
        <List.EmptyView
          icon={{ source: Icon.Warning, tintColor: Color.Red }}
          title="Failed to load Smart Plug details"
          description={error}
        />
      </List>
    );
  }

  // Format power values with proper units
  const formatPower = (value: number | undefined): string => {
    if (value === undefined) return "N/A";
    return `${(value / 10).toFixed(1)}W`;
  };

  // Format maxWatts value (no scaling needed)
  const formatMaxPower = (value: number | undefined): string => {
    if (value === undefined) return "N/A";
    return `${value}W`;
  };

  // Format current values with proper units
  const formatCurrent = (value: number | undefined): string => {
    if (value === undefined) return "N/A";
    if (value < 1000) {
      return `${value}mA`;
    } else {
      return `${(value / 1000).toFixed(2)}A`;
    }
  };

  // Format voltage values with proper units
  const formatVoltage = (value: number | undefined): string => {
    if (value === undefined) return "N/A";
    return `${value}V`;
  };

  // Format temperature values with proper units
  const formatTemperature = (value: number | undefined): string => {
    if (value === undefined) return "N/A";
    return `${value}°C`;
  };

  return (
    <List
      isLoading={isLoading}
      searchBarPlaceholder="Search Smart Plug details..."
      navigationTitle={`${device.deviceName || device.sn} - Details`}
      actions={
        <ActionPanel>
          <Action
            title={quotas.switchSta === true ? "Turn Off" : "Turn On"}
            icon={quotas.switchSta === true ? Icon.Power : Icon.Power}
            onAction={togglePowerState}
            shortcut={{ modifiers: ["cmd"], key: "p" }}
          />
          <Action
            title="Refresh"
            icon={Icon.ArrowClockwise}
            onAction={fetchQuotas}
            shortcut={{ modifiers: ["cmd"], key: "r" }}
          />
          <Action.Push
            title="Configure Settings"
            icon={Icon.Gear}
            target={<SmartPlugSettings device={device} />}
            shortcut={{ modifiers: ["cmd"], key: "," }}
          />
        </ActionPanel>
      }
    >
      <List.Section title="Status">
        <List.Item
          title="Power State"
          accessories={[{
            text: quotas.switchSta === true ? "On" : "Off",
            icon: quotas.switchSta === true 
              ? { source: Icon.Power, tintColor: Color.Green } 
              : { source: Icon.Power, tintColor: Color.Red }
          }]}
          icon={Icon.Power}
          actions={
            <ActionPanel>
              <Action
                title={quotas.switchSta === true ? "Turn Off" : "Turn On"}
                icon={quotas.switchSta === true ? Icon.Power : Icon.Power}
                onAction={togglePowerState}
              />
            </ActionPanel>
          }
        />
        {quotas.updateTime !== undefined && (
          <List.Item
            title="Last Updated"
            accessories={[{ text: quotas.updateTime.toString() }]}
            icon={Icon.Clock}
          />
        )}
        {quotas.runTime !== undefined && (
          <List.Item
            title="Run Time"
            accessories={[{ text: `${Math.floor(Number(quotas.runTime) / 3600)}h ${Math.floor((Number(quotas.runTime) % 3600) / 60)}m` }]}
            icon={Icon.Hourglass}
          />
        )}
      </List.Section>

      <List.Section title="Power Consumption">
        {quotas.watts !== undefined && (
          <List.Item
            title="Current Power"
            accessories={[{ text: formatPower(quotas.watts) }]}
            icon={{ source: Icon.Bolt, tintColor: Color.Yellow }}
          />
        )}
        {quotas.maxWatts !== undefined && (
          <List.Item
            title="Maximum Power Threshold"
            accessories={[{ text: formatMaxPower(quotas.maxWatts) }]}
            icon={{ source: Icon.Gauge, tintColor: Color.Orange }}
            actions={
              <ActionPanel>
                <ActionPanel.Section>
                  <Action
                    title="Set to 2500W (Maximum)"
                    icon={Icon.Gauge}
                    onAction={() => setMaxPowerThreshold(2500)}
                  />
                  <Action
                    title="Set to 2000W"
                    icon={Icon.Gauge}
                    onAction={() => setMaxPowerThreshold(2000)}
                  />
                  <Action
                    title="Set to 1500W"
                    icon={Icon.Gauge}
                    onAction={() => setMaxPowerThreshold(1500)}
                  />
                  <Action
                    title="Set to 1000W (Minimum)"
                    icon={Icon.Gauge}
                    onAction={() => setMaxPowerThreshold(1000)}
                  />
                </ActionPanel.Section>
                <ActionPanel.Section>
                  <Action
                    title={quotas.switchSta === true ? "Turn Off" : "Turn On"}
                    icon={quotas.switchSta === true ? Icon.Power : Icon.Power}
                    onAction={togglePowerState}
                  />
                </ActionPanel.Section>
              </ActionPanel>
            }
          />
        )}
        {quotas.current !== undefined && (
          <List.Item
            title="Current"
            accessories={[{ text: formatCurrent(quotas.current) }]}
            icon={{ source: Icon.CircleProgress, tintColor: Color.Blue }}
          />
        )}
        {quotas.volt !== undefined && (
          <List.Item
            title="Voltage"
            accessories={[{ text: formatVoltage(quotas.volt) }]}
            icon={{ source: Icon.LightBulb, tintColor: Color.Yellow }}
          />
        )}
        {quotas.freq !== undefined && (
          <List.Item
            title="Frequency"
            accessories={[{ text: `${quotas.freq}Hz` }]}
            icon={{ source: Icon.Waveform, tintColor: Color.Purple }}
          />
        )}
      </List.Section>

      <List.Section title="Device Information">
        {quotas.temp !== undefined && (
          <List.Item
            title="Temperature"
            accessories={[{ text: formatTemperature(quotas.temp) }]}
            icon={{ source: Icon.Temperature, tintColor: 
              Number(quotas.temp) > 60 ? Color.Red : 
              Number(quotas.temp) > 40 ? Color.Orange : 
              Color.Green 
            }}
          />
        )}
        {quotas.brightness !== undefined && (
          <List.Item
            title="LED Brightness"
            accessories={[{ text: `${quotas.brightness}/1023` }]}
            icon={{ source: Icon.LightBulb, tintColor: Color.Yellow }}
            actions={
              <ActionPanel>
                <ActionPanel.Section>
                  <Action
                    title="Set to Maximum (1023)"
                    icon={Icon.LightBulb}
                    onAction={() => adjustBrightness(1023)}
                  />
                  <Action
                    title="Set to High (800)"
                    icon={Icon.LightBulb}
                    onAction={() => adjustBrightness(800)}
                  />
                  <Action
                    title="Set to Medium (500)"
                    icon={Icon.LightBulb}
                    onAction={() => adjustBrightness(500)}
                  />
                  <Action
                    title="Set to Low (200)"
                    icon={Icon.LightBulb}
                    onAction={() => adjustBrightness(200)}
                  />
                  <Action
                    title="Turn Off (0)"
                    icon={Icon.LightBulb}
                    onAction={() => adjustBrightness(0)}
                  />
                </ActionPanel.Section>
                <ActionPanel.Section>
                  <Action
                    title={quotas.switchSta === true ? "Turn Off" : "Turn On"}
                    icon={quotas.switchSta === true ? Icon.Power : Icon.Power}
                    onAction={togglePowerState}
                  />
                </ActionPanel.Section>
              </ActionPanel>
            }
          />
        )}
      </List.Section>

      {(quotas.errCode !== undefined && Number(quotas.errCode) !== 0) || 
       (quotas.warnCode !== undefined && Number(quotas.warnCode) !== 0) && (
        <List.Section title="Alerts">
          {quotas.errCode !== undefined && Number(quotas.errCode) !== 0 && (
            <List.Item
              title="Error"
              accessories={[{ text: `Code: ${quotas.errCode}` }]}
              icon={{ source: Icon.ExclamationMark, tintColor: Color.Red }}
            />
          )}
          {quotas.warnCode !== undefined && Number(quotas.warnCode) !== 0 && (
            <List.Item
              title="Warning"
              accessories={[{ text: `Code: ${quotas.warnCode}` }]}
              icon={{ source: Icon.ExclamationMark, tintColor: Color.Orange }}
            />
          )}
        </List.Section>
      )}
    </List>
  );
}

function SmartPlugSettings({ device }: { device: Device }) {
  const [isLoading, setIsLoading] = useState(true);
  const [quotas, setQuotas] = useState<SmartPlugQuota>({});
  const { pop } = useNavigation();

  async function fetchQuotas() {
    setIsLoading(true);
    try {
      const deviceQuotas = await ecoFlowAPI.getSmartPlugQuotas(device.sn);
      
      // Check if response is an error
      if ('success' in deviceQuotas && !deviceQuotas.success) {
        throw new Error(String(deviceQuotas.message));
      }
      
      setQuotas(deviceQuotas as SmartPlugQuota);
    } catch (err) {
      showToast({
        style: Toast.Style.Failure,
        title: "Failed to load settings",
        message: err instanceof Error ? err.message : "Unknown error",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchQuotas();
  }, [device.sn]);

  async function handleSubmit(values: {
    plugSwitch: string;
    brightness: string;
    maxWatts: string;
  }) {
    setIsLoading(true);

    try {
      // Set power state
      if (values.plugSwitch) {
        console.log(`Setting power state for device ${device.sn} to ${values.plugSwitch}`);
        const powerResponse = await ecoFlowAPI.setSmartPlugFunction(device.sn, "WN511_SOCKET_SET_PLUG_SWITCH_MESSAGE", {
          plugSwitch: parseInt(values.plugSwitch)
        });
        
        if (!powerResponse.success) {
          throw new Error(powerResponse.message || "Failed to set power state");
        }
      }

      // Set LED brightness
      if (values.brightness) {
        console.log(`Setting brightness for device ${device.sn} to ${values.brightness}`);
        const brightnessResponse = await ecoFlowAPI.setSmartPlugFunction(device.sn, "WN511_SOCKET_SET_BRIGHTNESS_PACK", {
          brightness: parseInt(values.brightness)
        });
        
        if (!brightnessResponse.success) {
          throw new Error(brightnessResponse.message || "Failed to set LED brightness");
        }
      }

      // Set max power threshold (overload protection)
      if (values.maxWatts) {
        console.log(`Setting max watts for device ${device.sn} to ${values.maxWatts}`);
        const maxWattsResponse = await ecoFlowAPI.setSmartPlugFunction(device.sn, "WN511_SOCKET_SET_MAX_WATTS_PACK", {
          maxWatts: parseInt(values.maxWatts)
        });
        
        if (!maxWattsResponse.success) {
          throw new Error(maxWattsResponse.message || "Failed to set maximum power threshold");
        }
      }

      await showToast({
        style: Toast.Style.Success,
        title: "Settings updated successfully",
      });

      pop();
    } catch (error) {
      console.error("Error updating settings:", error);
      showToast({
        style: Toast.Style.Failure,
        title: "Failed to update settings",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form
      isLoading={isLoading}
      actions={
        <ActionPanel>
          <Action.SubmitForm onSubmit={handleSubmit} />
          <Action title="Refresh" icon={Icon.ArrowClockwise} onAction={fetchQuotas} />
          <Action title="Cancel" icon={Icon.XmarkCircle} onAction={pop} />
        </ActionPanel>
      }
    >
      <Form.Description
        title="Smart Plug Settings"
        text="Configure your Smart Plug device settings. Changes will be applied immediately."
      />

      <Form.Separator />
      
      <Form.Dropdown
        id="plugSwitch"
        title="Power State"
        info="Turn the Smart Plug on or off"
        defaultValue={quotas.switchSta === true ? "1" : "0"}
      >
        <Form.Dropdown.Item value="1" title="On" icon="🟢" />
        <Form.Dropdown.Item value="0" title="Off" icon="🔴" />
      </Form.Dropdown>

      <Form.Separator />

      <Form.TextField
        id="maxWatts"
        title="Overload Protection (W)"
        placeholder="1000-2500"
        info="Range: 1000W-2500W - Set the maximum power threshold"
        defaultValue={quotas.maxWatts ? quotas.maxWatts.toString() : ""}
      />

      <Form.TextField
        id="brightness"
        title="LED Brightness"
        placeholder="0-1023"
        info="Range: 0-1023 (higher is brighter) - Adjust the LED brightness"
        defaultValue={quotas.brightness?.toString() || ""}
      />
    </Form>
  );
}

function getStatusIcon(online: number): { source: Icon; tintColor: Color } {
  return online === 1
    ? { source: Icon.Checkmark, tintColor: Color.Green }
    : { source: Icon.XmarkCircle, tintColor: Color.Red };
} 