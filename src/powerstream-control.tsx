import { ActionPanel, Action, List, Icon, Color, showToast, Toast, Form, useNavigation } from "@raycast/api";
import { useState, useEffect } from "react";
import { ecoFlowAPI, ApiErrorResponse } from "./api";

interface Device {
  sn: string;
  deviceName: string;
  online: number;
  type: string;
}

interface PowerStreamQuota {
  [key: string]: string | number | undefined;
  
  // Power supply settings
  supplyPriority?: number; // 0: prioritize power supply; 1: prioritize power storage
  permanentWatts?: number; // Custom load power settings (0-600W)
  lowerLimit?: number; // Lower limit for battery discharging (1-30)
  upperLimit?: number; // Upper limit for battery charging (70-100)
  
  // Device status
  invOnOff?: number; // Micro-inverter switch: 0: off; 1: on
  invBrightness?: number; // LED brightness (0-1023)
  
  // Battery information
  batSoc?: number; // Battery level percentage
  batInputVolt?: number; // Battery input voltage (0.1V)
  batInputCur?: number; // Battery input current (0.1A) - positive: discharging, negative: charging
  batInputWatts?: number; // Battery input power
  batTemp?: number; // Battery temperature (0.1°C)
  batStatue?: number; // Battery operating status
  batErrCode?: number; // Battery error code
  batWarningCode?: number; // Battery warning code
  batSystem?: number; // Whether connected to power station (0) or EV (1)
  chgRemainTime?: number; // Remaining charging time
  dsgRemainTime?: number; // Remaining discharging time
  
  // Inverter information
  invOutputWatts?: number; // Inverter output power
  invStatue?: number; // Inverter operating status
  invErrCode?: number; // Inverter error code
  invWarnCode?: number; // Inverter warning code
  invFreq?: number; // Inverter frequency (0.1Hz)
  invTemp?: number; // Inverter temperature
  invInputVolt?: number; // Inverter input voltage
  invOutputCur?: number; // Inverter output current
  invOpVolt?: number; // Inverter operating voltage
  
  // PV (Solar) information
  pv1InputWatts?: number; // PV1 input power
  pv1InputVolt?: number; // PV1 input voltage (0.1V)
  pv1InputCur?: number; // PV1 input current (0.1A)
  pv1Statue?: number; // PV1 operating status
  pv1ErrCode?: number; // PV1 error code
  pv1WarnCode?: number; // PV1 warning code
  pv1Temp?: number; // PV1 temperature
  
  pv2InputWatts?: number; // PV2 input power
  pv2InputVolt?: number; // PV2 input voltage (0.1V)
  pv2InputCur?: number; // PV2 input current (0.1A)
  pv2Statue?: number; // PV2 operating status
  pv2ErrCode?: number; // PV2 error code
  pv2WarningCode?: number; // PV2 warning code
  pv2Temp?: number; // PV2 temperature
  
  // Additional fields that might be in the API response
  pvToInvWatts?: number; // Solar to inverter power
  invToPlugWatts?: number; // Inverter to grid power
  invDemandWatts?: number; // Demand power
  
  // System information
  ratedPower?: number; // Rated power
  installCountry?: number; // Country code
  installTown?: number; // City code
  feedProtect?: number; // Feed-in control: 0: off; 1: on
  
  // Connection status
  interfaceConnFlag?: number; // Port connection flag: bit0: AC connected; bit1: BAT connected; bit2: PV1connected; bit3: PV2 connected
  
  // Power generation/consumption
  geneWatt?: number; // Power generated
  consWatt?: number; // Power consumed
  
  // Network information
  wifiRssi?: number; // Wi-Fi signal strength
  wifiErr?: number; // Wi-Fi error code
}

// Type guard to check if the response is an error
function isApiErrorResponse(response: any): response is ApiErrorResponse {
  return 'success' in response && !response.success && 'message' in response;
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

      // Filter for PowerStream devices and check online status
      const powerStreamDevices = savedDevices.filter((device) => device.type === "powerstream");

      if (powerStreamDevices.length === 0) {
        setDevices([]);
        setIsLoading(false);
        return;
      }

      // Check online status for each device
      const devicesWithStatus = await Promise.all(
        powerStreamDevices.map(async (device) => {
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
          title="Failed to load PowerStream devices"
          description={error}
        />
      </List>
    );
  }

  return (
    <List
      isLoading={isLoading}
      searchBarPlaceholder="Search PowerStream devices"
      actions={
        <ActionPanel>
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
          title="No PowerStream devices found"
          description="Add a PowerStream device using the 'Add Device' command"
        />
      ) : (
        devices.map((device) => (
          <List.Item
            key={device.sn}
            title={device.deviceName || device.sn}
            subtitle="PowerStream"
            icon={{ source: Icon.Plug, tintColor: Color.Blue }}
            accessories={[{ text: device.online === 1 ? "Online" : "Offline", icon: getStatusIcon(device.online) }]}
            actions={
              <ActionPanel>
                {device.online === 1 ? (
                  <>
                    <Action.Push title="View Details" icon={Icon.Eye} target={<PowerStreamDetails device={device} />} />
                    <Action.Push
                      title="Configure Settings"
                      icon={Icon.Gear}
                      target={<PowerStreamSettings device={device} />}
                    />
                  </>
                ) : (
                  <Action title="Device Offline" icon={Icon.XmarkCircle} style={Action.Style.Destructive} />
                )}
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

export function PowerStreamDetails({ device }: { device: Device }) {
  const [isLoading, setIsLoading] = useState(true);
  const [quotas, setQuotas] = useState<PowerStreamQuota>({});
  const [error, setError] = useState<string | null>(null);
  const [showDetailedView, setShowDetailedView] = useState(false);

  async function fetchQuotas() {
    setIsLoading(true);
    try {
      console.log("Fetching quotas for device:", device.sn);
      const deviceQuotas = await ecoFlowAPI.getPowerStreamQuotas(device.sn);
      console.log("API Response - PowerStream Quotas:", JSON.stringify(deviceQuotas, null, 2));
      
      // Check if the response is an error response
      if (isApiErrorResponse(deviceQuotas)) {
        throw new Error(typeof deviceQuotas.message === 'string' ? deviceQuotas.message : "Failed to fetch PowerStream quotas");
      }
      
      // Now we know it's a PowerStreamQuota
      setQuotas(deviceQuotas as unknown as PowerStreamQuota);
    } catch (err) {
      console.error("Error fetching PowerStream quotas:", err);
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  // Add functions to control PowerStream settings
  async function toggleInverterPower() {
    try {
      const newState = quotas.invOnOff === 1 ? 0 : 1;
      console.log(`Toggling inverter power for device ${device.sn} from ${quotas.invOnOff} to ${newState}`);
      
      await ecoFlowAPI.setPowerStreamFunction(device.sn, "WN511_SET_INV_ONOFF_PACK", {
        invOnOff: newState
      });
      
      showToast({
        style: Toast.Style.Success,
        title: `Inverter ${newState === 1 ? "turned on" : "turned off"} successfully`,
      });
      
      // Refresh quotas to update UI
      await fetchQuotas();
    } catch (error) {
      console.error("Error toggling inverter power:", error);
      showToast({
        style: Toast.Style.Failure,
        title: "Failed to toggle inverter power",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async function adjustBrightness(newBrightness: number) {
    try {
      console.log(`Adjusting brightness for device ${device.sn} to ${newBrightness}`);
      
      await ecoFlowAPI.setPowerStreamFunction(device.sn, "WN511_SET_BRIGHTNESS_PACK", {
        brightness: newBrightness
      });
      
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

  async function setSupplyPriority(priority: number) {
    try {
      console.log(`Setting supply priority for device ${device.sn} to ${priority}`);
      
      await ecoFlowAPI.setPowerStreamFunction(device.sn, "WN511_SET_SUPPLY_PRIORITY_PACK", {
        supplyPriority: priority
      });
      
      showToast({
        style: Toast.Style.Success,
        title: `Supply priority set to ${priority === 0 ? "Power Supply" : "Power Storage"}`,
      });
      
      // Refresh quotas to update UI
      await fetchQuotas();
    } catch (error) {
      console.error("Error setting supply priority:", error);
      showToast({
        style: Toast.Style.Failure,
        title: "Failed to set supply priority",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async function setCustomLoadPower(watts: number) {
    try {
      console.log(`Setting custom load power for device ${device.sn} to ${watts}W`);
      
      await ecoFlowAPI.setPowerStreamFunction(device.sn, "WN511_SET_PERMANENT_WATTS_PACK", {
        permanentWatts: watts
      });
      
      showToast({
        style: Toast.Style.Success,
        title: `Custom load power set to ${watts}W`,
      });
      
      // Refresh quotas to update UI
      await fetchQuotas();
    } catch (error) {
      console.error("Error setting custom load power:", error);
      showToast({
        style: Toast.Style.Failure,
        title: "Failed to set custom load power",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async function setBatteryLimits(type: "lower" | "upper", value: number) {
    try {
      console.log(`Setting battery ${type} limit for device ${device.sn} to ${value}%`);
      
      const cmdCode = type === "lower" ? "WN511_SET_BAT_LOWER_PACK" : "WN511_SET_BAT_UPPER_PACK";
      const paramName = type === "lower" ? "lowerLimit" : "upperLimit";
      
      await ecoFlowAPI.setPowerStreamFunction(device.sn, cmdCode, {
        [paramName]: value
      });
      
      showToast({
        style: Toast.Style.Success,
        title: `Battery ${type === "lower" ? "discharge" : "charge"} limit set to ${value}%`,
      });
      
      // Refresh quotas to update UI
      await fetchQuotas();
    } catch (error) {
      console.error(`Error setting battery ${type} limit:`, error);
      showToast({
        style: Toast.Style.Failure,
        title: `Failed to set battery ${type} limit`,
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async function toggleFeedInControl() {
    try {
      const newState = quotas.feedProtect === 1 ? 0 : 1;
      console.log(`Toggling feed-in control for device ${device.sn} from ${quotas.feedProtect} to ${newState}`);
      
      await ecoFlowAPI.setPowerStreamFunction(device.sn, "WN511_SET_FEED_PROTECT_PACK", {
        feedProtect: newState
      });
      
      showToast({
        style: Toast.Style.Success,
        title: `Feed-in control ${newState === 1 ? "enabled" : "disabled"} successfully`,
      });
      
      // Refresh quotas to update UI
      await fetchQuotas();
    } catch (error) {
      console.error("Error toggling feed-in control:", error);
      showToast({
        style: Toast.Style.Failure,
        title: "Failed to toggle feed-in control",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  useEffect(() => {
    fetchQuotas();
  }, [device.sn]);

  // Helper function to format values with units
  const formatValue = (value: number | undefined, unit: string, multiplier = 1, fixed = 0): string => {
    if (value === undefined) return "N/A";
    return `${(value * multiplier).toFixed(fixed)}${unit}`;
  };

  // Helper function to decode connection status
  const decodeConnectionStatus = (flag: number | undefined): string[] => {
    if (flag === undefined) return ["Unknown"];
    const connections = [];
    if (flag & 1) connections.push("AC");
    if (flag & 2) connections.push("Battery");
    if (flag & 4) connections.push("PV1");
    if (flag & 8) connections.push("PV2");
    return connections.length > 0 ? connections : ["None"];
  };

  // Helper function to get status text
  const getStatusText = (status: number | undefined): string => {
    if (status === undefined) return "Unknown";
    switch (status) {
      case 1: return "Idle";
      case 2: return "Starting";
      case 5: return "Running";
      case 6: return "Grid Connected";
      case 11: return "Standby";
      default: return `Status ${status}`;
    }
  };

  if (error) {
    return (
      <List isLoading={isLoading}>
        <List.EmptyView
          icon={{ source: Icon.Warning, tintColor: Color.Red }}
          title="Failed to load PowerStream details"
          description={error}
        />
      </List>
    );
  }

  return (
    <List 
      isLoading={isLoading} 
      searchBarPlaceholder="Search PowerStream details..."
      navigationTitle={`${device.deviceName || device.sn} - ${showDetailedView ? "Detailed View" : "Quick View"}`}
      searchBarAccessory={
        <List.Dropdown
          tooltip="View Mode"
          value={showDetailedView ? "detailed" : "quick"}
          onChange={(newValue) => setShowDetailedView(newValue === "detailed")}
        >
          <List.Dropdown.Item title="Quick View" value="quick" icon={Icon.List} />
          <List.Dropdown.Item title="Detailed View" value="detailed" icon={Icon.AppWindowList} />
        </List.Dropdown>
      }
      actions={
        <ActionPanel>
          <Action
            title={showDetailedView ? "Switch to Quick View" : "Switch to Detailed View"}
            icon={showDetailedView ? Icon.List : Icon.AppWindowList}
            onAction={() => setShowDetailedView(!showDetailedView)}
            shortcut={{ modifiers: ["cmd"], key: "d" }}
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
            target={<PowerStreamSettings device={device} />}
            shortcut={{ modifiers: ["cmd"], key: "," }}
          />
        </ActionPanel>
      }
    >
      {/* Quick View - Only the most important information */}
      {!showDetailedView ? (
        <>
          <List.Section title="Status Overview">
            <List.Item 
              title="Device Status" 
              accessories={[{ 
                text: device.online === 1 ? "Online" : "Offline",
                icon: device.online === 1 ? { source: Icon.CheckCircle, tintColor: Color.Green } : { source: Icon.XMarkCircle, tintColor: Color.Red }
              }]} 
              icon={Icon.Signal0}
            />
            {quotas.invOnOff !== undefined && (
              <List.Item 
                title="Inverter Power" 
                accessories={[{ 
                  text: quotas.invOnOff === 1 ? "On" : "Off",
                  icon: quotas.invOnOff === 1 ? { source: Icon.Power, tintColor: Color.Green } : { source: Icon.Power, tintColor: Color.Red }
                }]} 
                icon={Icon.Power}
                actions={
                  <ActionPanel>
                    <Action
                      title={quotas.invOnOff === 1 ? "Turn Off Inverter" : "Turn On Inverter"}
                      icon={Icon.Power}
                      onAction={toggleInverterPower}
                    />
                    <Action
                      title="Refresh"
                      icon={Icon.ArrowClockwise}
                      onAction={fetchQuotas}
                    />
                  </ActionPanel>
                }
              />
            )}
            {quotas.batSoc !== undefined && (
              <List.Item 
                title="Battery Level" 
                accessories={[{ text: `${quotas.batSoc}%` }]} 
                icon={{ source: Icon.Battery, tintColor: 
                  quotas.batSoc > 70 ? Color.Green : 
                  quotas.batSoc > 30 ? Color.Yellow : 
                  Color.Red 
                }}
              />
            )}
            {quotas.invStatue !== undefined && (
              <List.Item 
                title="Inverter Status" 
                accessories={[{ text: getStatusText(quotas.invStatue) }]} 
                icon={{ source: Icon.Gauge, tintColor: Color.Blue }}
              />
            )}
          </List.Section>

          <List.Section title="Power Flow">
            {quotas.invOutputWatts !== undefined && (
              <List.Item 
                title="Inverter Output" 
                accessories={[{ text: `${typeof quotas.invOutputWatts === 'number' ? quotas.invOutputWatts.toFixed(1) : quotas.invOutputWatts}W` }]} 
                icon={{ source: Icon.ArrowRight, tintColor: Color.Blue }}
              />
            )}
            {quotas.batInputWatts !== undefined && (
              <List.Item 
                title="Battery Power" 
                accessories={[{ 
                  text: `${typeof quotas.batInputWatts === 'number' ? Math.abs(quotas.batInputWatts).toFixed(1) : Math.abs(Number(quotas.batInputWatts))}W ${Number(quotas.batInputWatts) > 0 ? "(Charging)" : "(Discharging)"}`,
                  icon: Number(quotas.batInputWatts) > 0 ? { source: Icon.ArrowDown, tintColor: Color.Green } : { source: Icon.ArrowUp, tintColor: Color.Orange }
                }]} 
                icon={Icon.Battery}
              />
            )}
            {(quotas.pv1InputWatts !== undefined || quotas.pv2InputWatts !== undefined) && (
              <List.Item 
                title="Solar Input" 
                accessories={[{ 
                  text: `${(quotas.pv1InputWatts || 0) + (quotas.pv2InputWatts || 0)}W Total` 
                }]} 
                icon={{ source: Icon.Sun, tintColor: Color.Yellow }}
              />
            )}
            {quotas.geneWatt !== undefined && quotas.consWatt !== undefined && (
              <List.Item 
                title="Net Power" 
                accessories={[{ 
                  text: `${Math.round(Number(quotas.geneWatt) - Math.abs(Number(quotas.consWatt)))}W ${Number(quotas.geneWatt) > Math.abs(Number(quotas.consWatt)) ? "(Surplus)" : "(Deficit)"}`,
                  icon: Number(quotas.geneWatt) > Math.abs(Number(quotas.consWatt)) ? { source: Icon.Plus, tintColor: Color.Green } : { source: Icon.Minus, tintColor: Color.Red }
                }]} 
                icon={{ source: Icon.Gauge, tintColor: Color.Purple }}
              />
            )}
          </List.Section>

          <List.Section title="Key Settings">
            {quotas.supplyPriority !== undefined && (
              <List.Item
                title="Power Supply Priority"
                accessories={[
                  {
                    text: quotas.supplyPriority === 0 ? "Prioritize Power Supply" : "Prioritize Power Storage",
                  },
                ]}
                icon={{ source: quotas.supplyPriority === 0 ? Icon.Globe : Icon.Battery, tintColor: Color.Blue }}
                actions={
                  <ActionPanel>
                    <Action
                      title={quotas.supplyPriority === 0 ? "Prioritize Power Storage" : "Prioritize Power Supply"}
                      icon={quotas.supplyPriority === 0 ? Icon.Battery : Icon.Globe}
                      onAction={() => setSupplyPriority(quotas.supplyPriority === 0 ? 1 : 0)}
                    />
                    <Action
                      title="Refresh"
                      icon={Icon.ArrowClockwise}
                      onAction={fetchQuotas}
                    />
                  </ActionPanel>
                }
              />
            )}
            {quotas.permanentWatts !== undefined && (
              <List.Item
                title="Custom Load Power"
                accessories={[{ text: `${quotas.permanentWatts}W` }]}
                icon={{ source: Icon.Plug, tintColor: Color.Orange }}
                actions={
                  <ActionPanel>
                    <ActionPanel.Section>
                      <Action
                        title="Set to 4500W (Maximum)"
                        icon={Icon.Plug}
                        onAction={() => setCustomLoadPower(4500)}
                      />
                      <Action
                        title="Set to 3000W"
                        icon={Icon.Plug}
                        onAction={() => setCustomLoadPower(3000)}
                      />
                      <Action
                        title="Set to 1500W"
                        icon={Icon.Plug}
                        onAction={() => setCustomLoadPower(1500)}
                      />
                      <Action
                        title="Set to 0W (Minimum)"
                        icon={Icon.Plug}
                        onAction={() => setCustomLoadPower(0)}
                      />
                    </ActionPanel.Section>
                    <ActionPanel.Section>
                      <Action
                        title="Refresh"
                        icon={Icon.ArrowClockwise}
                        onAction={fetchQuotas}
                      />
                    </ActionPanel.Section>
                  </ActionPanel>
                }
              />
            )}
            {quotas.feedProtect !== undefined && (
              <List.Item 
                title="Feed-in Control" 
                accessories={[{ text: quotas.feedProtect === 1 ? "On" : "Off" }]} 
                icon={{ source: quotas.feedProtect === 1 ? Icon.CheckCircle : Icon.XMarkCircle, tintColor: quotas.feedProtect === 1 ? Color.Green : Color.Red }}
                actions={
                  <ActionPanel>
                    <Action
                      title={quotas.feedProtect === 1 ? "Disable Feed-in Control" : "Enable Feed-in Control"}
                      icon={quotas.feedProtect === 1 ? Icon.XMarkCircle : Icon.CheckCircle}
                      onAction={toggleFeedInControl}
                    />
                    <Action
                      title="Refresh"
                      icon={Icon.ArrowClockwise}
                      onAction={fetchQuotas}
                    />
                  </ActionPanel>
                }
              />
            )}
            {quotas.invBrightness !== undefined && (
              <List.Item
                title="LED Brightness"
                accessories={[{ text: `${quotas.invBrightness}/1023` }]}
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
                        title="Refresh"
                        icon={Icon.ArrowClockwise}
                        onAction={fetchQuotas}
                      />
                    </ActionPanel.Section>
                  </ActionPanel>
                }
              />
            )}
          </List.Section>

          <List.Section title="Battery Settings">
            {quotas.lowerLimit !== undefined && (
              <List.Item
                title="Battery Discharge Limit"
                accessories={[{ text: `${quotas.lowerLimit}%` }]}
                icon={{ source: Icon.MinusCircle, tintColor: Color.Orange }}
                actions={
                  <ActionPanel>
                    <ActionPanel.Section>
                      <Action
                        title="Set to 30% (Maximum)"
                        icon={Icon.MinusCircle}
                        onAction={() => setBatteryLimits("lower", 30)}
                      />
                      <Action
                        title="Set to 20%"
                        icon={Icon.MinusCircle}
                        onAction={() => setBatteryLimits("lower", 20)}
                      />
                      <Action
                        title="Set to 10%"
                        icon={Icon.MinusCircle}
                        onAction={() => setBatteryLimits("lower", 10)}
                      />
                      <Action
                        title="Set to 5% (Minimum)"
                        icon={Icon.MinusCircle}
                        onAction={() => setBatteryLimits("lower", 5)}
                      />
                    </ActionPanel.Section>
                    <ActionPanel.Section>
                      <Action
                        title="Refresh"
                        icon={Icon.ArrowClockwise}
                        onAction={fetchQuotas}
                      />
                    </ActionPanel.Section>
                  </ActionPanel>
                }
              />
            )}
            {quotas.upperLimit !== undefined && (
              <List.Item
                title="Battery Charge Limit"
                accessories={[{ text: `${quotas.upperLimit}%` }]}
                icon={{ source: Icon.PlusCircle, tintColor: Color.Green }}
                actions={
                  <ActionPanel>
                    <ActionPanel.Section>
                      <Action
                        title="Set to 100% (Maximum)"
                        icon={Icon.PlusCircle}
                        onAction={() => setBatteryLimits("upper", 100)}
                      />
                      <Action
                        title="Set to 90%"
                        icon={Icon.PlusCircle}
                        onAction={() => setBatteryLimits("upper", 90)}
                      />
                      <Action
                        title="Set to 80%"
                        icon={Icon.PlusCircle}
                        onAction={() => setBatteryLimits("upper", 80)}
                      />
                      <Action
                        title="Set to 70% (Minimum)"
                        icon={Icon.PlusCircle}
                        onAction={() => setBatteryLimits("upper", 70)}
                      />
                    </ActionPanel.Section>
                    <ActionPanel.Section>
                      <Action
                        title="Refresh"
                        icon={Icon.ArrowClockwise}
                        onAction={fetchQuotas}
                      />
                    </ActionPanel.Section>
                  </ActionPanel>
                }
              />
            )}
          </List.Section>

          {(quotas.invErrCode || quotas.batErrCode || quotas.pv1ErrCode || quotas.pv2ErrCode || quotas.wifiErr) && (
            <List.Section title="Alerts">
              {quotas.invErrCode !== undefined && quotas.invErrCode !== 0 && (
                <List.Item 
                  title="Inverter Error" 
                  accessories={[{ text: `Code: ${quotas.invErrCode}` }]} 
                  icon={{ source: Icon.ExclamationMark, tintColor: Color.Red }}
                />
              )}
              {quotas.batErrCode !== undefined && quotas.batErrCode !== 0 && (
                <List.Item 
                  title="Battery Error" 
                  accessories={[{ text: `Code: ${quotas.batErrCode}` }]} 
                  icon={{ source: Icon.ExclamationMark, tintColor: Color.Red }}
                />
              )}
              {quotas.wifiErr !== undefined && quotas.wifiErr !== 0 && (
                <List.Item 
                  title="Wi-Fi Error" 
                  accessories={[{ text: `Code: ${quotas.wifiErr}` }]} 
                  icon={{ source: Icon.ExclamationMark, tintColor: Color.Red }}
                />
              )}
            </List.Section>
          )}
        </>
      ) : (
        // Detailed View - All information
        <>
          <List.Section title="Device Information">
            <List.Item 
              title="Name" 
              accessories={[{ text: device.deviceName }]} 
              icon={Icon.Tag}
            />
            <List.Item 
              title="Serial Number" 
              accessories={[{ text: device.sn }]} 
              icon={Icon.BarCode}
            />
            <List.Item 
              title="Status" 
              accessories={[{ 
                text: device.online === 1 ? "Online" : "Offline",
                icon: device.online === 1 ? { source: Icon.CheckCircle, tintColor: Color.Green } : { source: Icon.XMarkCircle, tintColor: Color.Red }
              }]} 
              icon={Icon.Signal0}
            />
            {quotas.invOnOff !== undefined && (
              <List.Item 
                title="Inverter Power" 
                accessories={[{ 
                  text: quotas.invOnOff === 1 ? "On" : "Off",
                  icon: quotas.invOnOff === 1 ? { source: Icon.Power, tintColor: Color.Green } : { source: Icon.Power, tintColor: Color.Red }
                }]} 
                icon={Icon.Power}
              />
            )}
          </List.Section>

          <List.Section title="Power Overview">
            {quotas.invOutputWatts !== undefined && (
              <List.Item 
                title="Inverter Output" 
                accessories={[{ text: `${typeof quotas.invOutputWatts === 'number' ? quotas.invOutputWatts.toFixed(1) : quotas.invOutputWatts}W` }]} 
                icon={{ source: Icon.ArrowRight, tintColor: Color.Blue }}
              />
            )}
            {quotas.batInputWatts !== undefined && (
              <List.Item 
                title="Battery Power" 
                accessories={[{ 
                  text: `${typeof quotas.batInputWatts === 'number' ? Math.abs(quotas.batInputWatts).toFixed(1) : Math.abs(Number(quotas.batInputWatts))}W ${Number(quotas.batInputWatts) > 0 ? "(Charging)" : "(Discharging)"}`,
                  icon: Number(quotas.batInputWatts) > 0 ? { source: Icon.ArrowDown, tintColor: Color.Green } : { source: Icon.ArrowUp, tintColor: Color.Orange }
                }]} 
                icon={Icon.Battery}
              />
            )}
            {quotas.pvToInvWatts !== undefined && (
              <List.Item 
                title="Solar to Inverter" 
                accessories={[{ text: `${typeof quotas.pvToInvWatts === 'number' ? quotas.pvToInvWatts.toFixed(1) : quotas.pvToInvWatts}W` }]} 
                icon={{ source: Icon.Sun, tintColor: Color.Yellow }}
              />
            )}
            {quotas.invToPlugWatts !== undefined && (
              <List.Item 
                title="Inverter to Grid" 
                accessories={[{ text: `${typeof quotas.invToPlugWatts === 'number' ? quotas.invToPlugWatts.toFixed(1) : quotas.invToPlugWatts}W` }]} 
                icon={{ source: Icon.Globe, tintColor: Color.Blue }}
              />
            )}
            {quotas.consWatt !== undefined && (
              <List.Item 
                title="Consumption" 
                accessories={[{ text: `${typeof quotas.consWatt === 'number' ? quotas.consWatt.toFixed(1) : quotas.consWatt}W` }]} 
                icon={{ source: Icon.LightBulb, tintColor: Color.Orange }}
              />
            )}
            {quotas.geneWatt !== undefined && (
              <List.Item 
                title="Generation" 
                accessories={[{ text: `${typeof quotas.geneWatt === 'number' ? quotas.geneWatt.toFixed(1) : quotas.geneWatt}W` }]} 
                icon={{ source: Icon.Sun, tintColor: Color.Yellow }}
              />
            )}
            {quotas.invDemandWatts !== undefined && (
              <List.Item 
                title="Demand Power" 
                accessories={[{ text: `${typeof quotas.invDemandWatts === 'number' ? quotas.invDemandWatts.toFixed(1) : quotas.invDemandWatts}W` }]} 
                icon={{ source: Icon.Gauge, tintColor: Color.Purple }}
              />
            )}
          </List.Section>

          <List.Section title="Battery Details">
            {quotas.batSoc !== undefined && (
              <List.Item 
                title="Battery Level" 
                accessories={[{ text: `${quotas.batSoc}%` }]} 
                icon={{ source: Icon.Battery, tintColor: 
                  quotas.batSoc > 70 ? Color.Green : 
                  quotas.batSoc > 30 ? Color.Yellow : 
                  Color.Red 
                }}
              />
            )}
            {quotas.batInputVolt !== undefined && (
              <List.Item title="Battery Voltage" accessories={[{ text: formatValue(quotas.batInputVolt, "V", 0.1, 1) }]} />
            )}
            {quotas.batInputCur !== undefined && (
              <List.Item title="Battery Current" accessories={[{ text: formatValue(quotas.batInputCur, "A", 0.1, 1) }]} />
            )}
            {quotas.batTemp !== undefined && (
              <List.Item title="Battery Temperature" accessories={[{ text: formatValue(quotas.batTemp, "°C", 0.1, 1) }]} />
            )}
            {quotas.batStatue !== undefined && (
              <List.Item title="Battery Status" accessories={[{ text: getStatusText(quotas.batStatue) }]} />
            )}
            {quotas.batSystem !== undefined && (
              <List.Item 
                title="Connected To" 
                accessories={[{ text: quotas.batSystem === 0 ? "Power Station" : "Electric Vehicle" }]} 
              />
            )}
            {quotas.chgRemainTime !== undefined && (
              <List.Item title="Charging Time Remaining" accessories={[{ text: `${Math.floor(quotas.chgRemainTime / 60)}h ${quotas.chgRemainTime % 60}m` }]} />
            )}
            {quotas.dsgRemainTime !== undefined && (
              <List.Item title="Discharging Time Remaining" accessories={[{ text: `${Math.floor(quotas.dsgRemainTime / 60)}h ${quotas.dsgRemainTime % 60}m` }]} />
            )}
          </List.Section>

          <List.Section title="Solar PV1 Details">
            {quotas.pv1InputWatts !== undefined && (
              <List.Item title="PV1 Power" accessories={[{ text: `${typeof quotas.pv1InputWatts === 'number' ? quotas.pv1InputWatts.toFixed(1) : quotas.pv1InputWatts}W` }]} />
            )}
            {quotas.pv1InputVolt !== undefined && (
              <List.Item title="PV1 Voltage" accessories={[{ text: formatValue(quotas.pv1InputVolt, "V", 0.1, 1) }]} />
            )}
            {quotas.pv1InputCur !== undefined && (
              <List.Item title="PV1 Current" accessories={[{ text: formatValue(quotas.pv1InputCur, "A", 0.1, 1) }]} />
            )}
            {quotas.pv1Statue !== undefined && (
              <List.Item title="PV1 Status" accessories={[{ text: getStatusText(quotas.pv1Statue) }]} />
            )}
            {quotas.pv1Temp !== undefined && (
              <List.Item title="PV1 Temperature" accessories={[{ text: formatValue(quotas.pv1Temp, "°C", 0.1, 1) }]} />
            )}
          </List.Section>

          <List.Section title="Solar PV2 Details">
            {quotas.pv2InputWatts !== undefined && (
              <List.Item title="PV2 Power" accessories={[{ text: `${typeof quotas.pv2InputWatts === 'number' ? quotas.pv2InputWatts.toFixed(1) : quotas.pv2InputWatts}W` }]} />
            )}
            {quotas.pv2InputVolt !== undefined && (
              <List.Item title="PV2 Voltage" accessories={[{ text: formatValue(quotas.pv2InputVolt, "V", 0.1, 1) }]} />
            )}
            {quotas.pv2InputCur !== undefined && (
              <List.Item title="PV2 Current" accessories={[{ text: formatValue(quotas.pv2InputCur, "A", 0.1, 1) }]} />
            )}
            {quotas.pv2Statue !== undefined && (
              <List.Item title="PV2 Status" accessories={[{ text: getStatusText(quotas.pv2Statue) }]} />
            )}
            {quotas.pv2Temp !== undefined && (
              <List.Item title="PV2 Temperature" accessories={[{ text: formatValue(quotas.pv2Temp, "°C", 0.1, 1) }]} />
            )}
          </List.Section>

          <List.Section title="Inverter Details">
            {quotas.invStatue !== undefined && (
              <List.Item title="Status" accessories={[{ text: getStatusText(quotas.invStatue) }]} />
            )}
            {quotas.invFreq !== undefined && (
              <List.Item title="Frequency" accessories={[{ text: formatValue(quotas.invFreq, "Hz", 0.1, 1) }]} />
            )}
            {quotas.invTemp !== undefined && (
              <List.Item title="Temperature" accessories={[{ text: formatValue(quotas.invTemp, "°C", 0.1, 1) }]} />
            )}
            {quotas.invInputVolt !== undefined && (
              <List.Item title="Input Voltage" accessories={[{ text: formatValue(quotas.invInputVolt, "V", 1, 1) }]} />
            )}
            {quotas.invOutputCur !== undefined && (
              <List.Item title="Output Current" accessories={[{ text: formatValue(quotas.invOutputCur, "A", 1, 1) }]} />
            )}
          </List.Section>

          <List.Section title="Settings">
            {quotas.supplyPriority !== undefined && (
              <List.Item
                title="Power Supply Priority"
                accessories={[
                  {
                    text: quotas.supplyPriority === 0 ? "Prioritize Power Supply" : "Prioritize Power Storage",
                  },
                ]}
              />
            )}
            {quotas.permanentWatts !== undefined && (
              <List.Item title="Custom Load Power" accessories={[{ text: `${quotas.permanentWatts}W` }]} />
            )}
            {quotas.lowerLimit !== undefined && (
              <List.Item title="Battery Discharge Limit" accessories={[{ text: `${quotas.lowerLimit}%` }]} />
            )}
            {quotas.upperLimit !== undefined && (
              <List.Item title="Battery Charge Limit" accessories={[{ text: `${quotas.upperLimit}%` }]} />
            )}
            {quotas.invBrightness !== undefined && (
              <List.Item title="LED Brightness" accessories={[{ text: `${quotas.invBrightness}/1023` }]} />
            )}
            {quotas.feedProtect !== undefined && (
              <List.Item 
                title="Feed-in Control" 
                accessories={[{ text: quotas.feedProtect === 1 ? "On" : "Off" }]} 
              />
            )}
          </List.Section>

          <List.Section title="Network">
            {quotas.wifiRssi !== undefined && (
              <List.Item 
                title="Wi-Fi Signal Strength" 
                accessories={[{ text: `${quotas.wifiRssi} dBm` }]} 
                icon={{ 
                  source: Icon.Wifi, 
                  tintColor: 
                    quotas.wifiRssi > -60 ? Color.Green : 
                    quotas.wifiRssi > -70 ? Color.Yellow : 
                    Color.Red 
                }}
              />
            )}
          </List.Section>

          {(quotas.invErrCode || quotas.batErrCode || quotas.pv1ErrCode || quotas.pv2ErrCode || quotas.wifiErr) && (
            <List.Section title="Error Codes">
              {quotas.invErrCode !== undefined && quotas.invErrCode !== 0 && (
                <List.Item 
                  title="Inverter Error" 
                  accessories={[{ text: `Code: ${quotas.invErrCode}` }]} 
                  icon={{ source: Icon.ExclamationMark, tintColor: Color.Red }}
                />
              )}
              {quotas.batErrCode !== undefined && quotas.batErrCode !== 0 && (
                <List.Item 
                  title="Battery Error" 
                  accessories={[{ text: `Code: ${quotas.batErrCode}` }]} 
                  icon={{ source: Icon.ExclamationMark, tintColor: Color.Red }}
                />
              )}
              {quotas.wifiErr !== undefined && quotas.wifiErr !== 0 && (
                <List.Item 
                  title="Wi-Fi Error" 
                  accessories={[{ text: `Code: ${quotas.wifiErr}` }]} 
                  icon={{ source: Icon.ExclamationMark, tintColor: Color.Red }}
                />
              )}
            </List.Section>
          )}
        </>
      )}
    </List>
  );
}

function PowerStreamSettings({ device }: { device: Device }) {
  const [isLoading, setIsLoading] = useState(true);
  const [quotas, setQuotas] = useState<PowerStreamQuota>({});
  const { pop } = useNavigation();

  async function fetchQuotas() {
    setIsLoading(true);
    try {
      const deviceQuotas = await ecoFlowAPI.getPowerStreamQuotas(device.sn);
      
      // Check if the response is an error response
      if (isApiErrorResponse(deviceQuotas)) {
        throw new Error(typeof deviceQuotas.message === 'string' ? deviceQuotas.message : "Failed to fetch PowerStream quotas");
      }
      
      // Now we know it's a PowerStreamQuota
      setQuotas(deviceQuotas as unknown as PowerStreamQuota);
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
    supplyPriority: string;
    permanentWatts: string;
    lowerLimit: string;
    upperLimit: string;
    invBrightness: string;
    invOnOff: string;
    feedProtect: string;
  }) {
    setIsLoading(true);

    try {
      // Set supply priority
      if (values.supplyPriority) {
        await ecoFlowAPI.setPowerStreamFunction(device.sn, "WN511_SET_SUPPLY_PRIORITY_PACK", {
          supplyPriority: parseInt(values.supplyPriority),
        });
      }

      // Set custom load power
      if (values.permanentWatts) {
        await ecoFlowAPI.setPowerStreamFunction(device.sn, "WN511_SET_PERMANENT_WATTS_PACK", {
          permanentWatts: parseInt(values.permanentWatts),
        });
      }

      // Set lower limit
      if (values.lowerLimit) {
        await ecoFlowAPI.setPowerStreamFunction(device.sn, "WN511_SET_BAT_LOWER_PACK", {
          lowerLimit: parseInt(values.lowerLimit),
        });
      }

      // Set upper limit
      if (values.upperLimit) {
        await ecoFlowAPI.setPowerStreamFunction(device.sn, "WN511_SET_BAT_UPPER_PACK", {
          upperLimit: parseInt(values.upperLimit),
        });
      }

      // Set brightness
      if (values.invBrightness) {
        await ecoFlowAPI.setPowerStreamFunction(device.sn, "WN511_SET_BRIGHTNESS_PACK", {
          brightness: parseInt(values.invBrightness),
        });
      }

      // Set inverter on/off
      if (values.invOnOff) {
        await ecoFlowAPI.setPowerStreamFunction(device.sn, "WN511_SET_INV_ONOFF_PACK", {
          invOnOff: parseInt(values.invOnOff),
        });
      }

      // Set feed-in control
      if (values.feedProtect) {
        await ecoFlowAPI.setPowerStreamFunction(device.sn, "WN511_SET_FEED_PROTECT_PACK", {
          feedProtect: parseInt(values.feedProtect),
        });
      }

      await showToast({
        style: Toast.Style.Success,
        title: "Settings updated successfully",
      });

      pop();
    } catch (error) {
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
        title="PowerStream Settings"
        text="Configure your PowerStream device settings. Changes will be applied immediately."
      />

      <Form.Separator />
      
      <Form.Dropdown
        id="invOnOff"
        title="Inverter Power"
        info="Turn the inverter on or off"
        defaultValue={quotas.invOnOff?.toString() || ""}
      >
        <Form.Dropdown.Item value="1" title="On" icon="🟢" />
        <Form.Dropdown.Item value="0" title="Off" icon="🔴" />
      </Form.Dropdown>

      <Form.Dropdown
        id="supplyPriority"
        title="Power Supply Priority"
        info="Choose whether to prioritize power supply or storage"
        defaultValue={quotas.supplyPriority?.toString() || ""}
      >
        <Form.Dropdown.Item value="0" title="Prioritize Power Supply" icon="🔌" />
        <Form.Dropdown.Item value="1" title="Prioritize Power Storage" icon="🔋" />
      </Form.Dropdown>

      <Form.Dropdown
        id="feedProtect"
        title="Feed-in Control"
        info="Enable or disable feed-in control"
        defaultValue={quotas.feedProtect?.toString() || ""}
      >
        <Form.Dropdown.Item value="1" title="On" icon="🟢" />
        <Form.Dropdown.Item value="0" title="Off" icon="🔴" />
      </Form.Dropdown>

      <Form.Separator />

      <Form.TextField
        id="permanentWatts"
        title="Custom Load Power (W)"
        placeholder="0-4500"
        info="Range: 0W-4500W - Set the custom load power"
        defaultValue={quotas.permanentWatts?.toString() || ""}
      />

      <Form.TextField
        id="lowerLimit"
        title="Battery Discharge Limit (%)"
        placeholder="1-30"
        info="Range: 1-30% - Set the lower limit for battery discharging"
        defaultValue={quotas.lowerLimit?.toString() || ""}
      />

      <Form.TextField
        id="upperLimit"
        title="Battery Charge Limit (%)"
        placeholder="70-100"
        info="Range: 70-100% - Set the upper limit for battery charging"
        defaultValue={quotas.upperLimit?.toString() || ""}
      />

      <Form.TextField
        id="invBrightness"
        title="LED Brightness"
        placeholder="0-1023"
        info="Range: 0-1023 (higher is brighter) - Adjust the LED brightness"
        defaultValue={quotas.invBrightness?.toString() || ""}
      />
    </Form>
  );
}

function getStatusIcon(online: number): { source: Icon; tintColor: Color } {
  return online === 1
    ? { source: Icon.Checkmark, tintColor: Color.Green }
    : { source: Icon.XmarkCircle, tintColor: Color.Red };
}
