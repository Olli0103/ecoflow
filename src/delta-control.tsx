import { ActionPanel, Action, List, Icon, Color, showToast, Toast, Form, useNavigation, Detail, open } from "@raycast/api";
import { useState, useEffect } from "react";
import { ecoFlowAPI, ApiErrorResponse } from "./api";
import axios from "axios";
import { Clipboard } from "@raycast/api";

// Use the same Device interface as in the API file
interface Device {
  sn: string;
  deviceName: string;
  online: number;
  type: string;
}

// Common interface for all Delta device quotas
interface DeltaQuota {
  [key: string]: any; // Using any to accommodate various quota types
  
  // Common fields across all Delta models
  soc?: number; // Battery level
  wattsInSum?: number; // Total input power
  wattsOutSum?: number; // Total output power
  remainTime?: number; // Remaining time (negative for discharge, positive for charge)
  
  // Status fields
  errCode?: number; // Error code
  warnCode?: number; // Warning code
  
  // Power state
  dcOutState?: number; // DC output state (0: off, 1: on)
  acOutState?: number; // AC output state (derived from different fields depending on model)
  
  // Model-specific fields will be handled in the component logic
}

// View mode for the UI
type ViewMode = "quick" | "detailed";

// Temporary extension of the EcoFlowAPI class to add the getAllQuotas method
// This will be moved to the API file later
declare module "./api" {
  interface EcoFlowAPI {
    getAllQuotas(serialNumber: string): Promise<Record<string, any>>;
    setDeviceProperty(serialNumber: string, property: string, value: any): Promise<any>;
    setDeviceCommand(serialNumber: string, deviceType: string, command: string, payload: Record<string, any>): Promise<any>;
    testAcToggleFormats(serialNumber: string, deviceType: string, state: number): Promise<Record<string, any>>;
    rawAcToggle(serialNumber: string, deviceType: string, state: number): Promise<any>;
    rawDcToggle(serialNumber: string, deviceType: string, state: number): Promise<any>;
    testApiCall(serialNumber: string, requestBody: any, formatDescription: string): Promise<any>;
    getDeltaQuotas(serialNumber: string, deviceType: string): Promise<Record<string, any>>;
  }
}

// Raw Data View component
function RawDataView(props: { device: Device; quotas: Record<string, any> }) {
  const { device, quotas } = props;
  const [filter, setFilter] = useState<string>("");
  const [showCommonOnly, setShowCommonOnly] = useState<boolean>(false);
  const { pop, push } = useNavigation();
  
  // Common fields that are useful for most users
  const commonFields = [
    "soc", "wattsInSum", "wattsOutSum", "remainTime", "errCode", "warnCode",
    "dcOutState", "acOutState", "bmsMaster.soc", "pd.soc", "pd.wattsInSum",
    "pd.wattsOutSum", "pd.remainTime", "pd.dcOutState", "inv.cfgAcEnabled"
  ];
  
  // Filter the quotas based on the filter text and common fields option
  const filteredQuotas = Object.entries(quotas).reduce((acc, [key, value]) => {
    // Apply text filter
    const matchesFilter = filter === "" || key.toLowerCase().includes(filter.toLowerCase());
    
    // Apply common fields filter
    const isCommonField = !showCommonOnly || commonFields.some(field => key.includes(field));
    
    if (matchesFilter && isCommonField) {
      acc[key] = value;
    }
    
    return acc;
  }, {} as Record<string, any>);
  
  // Format the JSON data for display
  const formattedData = JSON.stringify(filteredQuotas, null, 2);
  
  // Create markdown content with filtering options
  const markdown = `
# Raw Device Data for ${device.deviceName || device.sn}

## Device Information
- **Serial Number**: ${device.sn}
- **Model**: ${device.type}
- **Status**: ${device.online === 1 ? "Online" : "Offline"}

## Quota Data
${filter ? `> Filtered by: "${filter}"` : ""}
${showCommonOnly ? "> Showing common fields only" : "> Showing all fields"}

\`\`\`json
${formattedData}
\`\`\`
  `;

  // Show search form
  const showSearchForm = () => {
    push(
      <Form
        actions={
          <ActionPanel>
            <Action.SubmitForm
              title="Apply Filter"
              onSubmit={(values) => {
                setFilter(values.searchText);
                pop();
              }}
            />
          </ActionPanel>
        }
      >
        <Form.TextField
          id="searchText"
          title="Filter by Property Name"
          placeholder="Enter text to filter properties"
          defaultValue={filter}
        />
      </Form>
    );
  };
  
  return (
    <Detail
      markdown={markdown}
      navigationTitle={`${device.deviceName || device.sn} - Raw Data`}
      metadata={
        <Detail.Metadata>
          <Detail.Metadata.Label title="Serial Number" text={device.sn} />
          <Detail.Metadata.Label title="Device Type" text={device.type} />
          <Detail.Metadata.Label title="Status" text={device.online === 1 ? "Online" : "Offline"} />
          <Detail.Metadata.Separator />
          <Detail.Metadata.Label title="Data Points" text={Object.keys(filteredQuotas).length.toString()} />
        </Detail.Metadata>
      }
    />
  );
}

// Add a new diagnostic view component
function DiagnosticView(props: { device: Device; quotas: Record<string, any> }) {
  const { device, quotas } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Record<string, any>>({});
  const { pop } = useNavigation();
  
  // Format the device information for display
  const deviceInfo = {
    serialNumber: device.sn,
    deviceName: device.deviceName,
    deviceType: device.type,
    online: device.online === 1 ? "Online" : "Offline"
  };
  
  const deviceInfoMarkdown = `
# Device Diagnostic Information

## Device Details
- **Serial Number**: ${device.sn}
- **Name**: ${device.deviceName || "N/A"}
- **Type**: ${device.type}
- **Status**: ${device.online === 1 ? "Online" : "Offline"}

## API Test Results
${Object.keys(results).length > 0 
  ? Object.entries(results).map(([key, value]) => 
      `### ${key}\n\`\`\`json\n${JSON.stringify(value, null, 2)}\n\`\`\``
    ).join('\n\n')
  : "No tests run yet. Use the actions to test different API formats."}
  `;
  
  // Test AC toggle with a specific format
  const testFormat = async (formatName: string, requestBody: any) => {
    setIsLoading(true);
    try {
      // Get the current state to toggle to the opposite
      const currentState = quotas?.acOutState || 0;
      const newState = currentState === 1 ? 0 : 1;
      
      // Modify the request body to include the new state
      let modifiedBody = { ...requestBody };
      
      // Handle different request body formats
      if (modifiedBody.params?.enabled !== undefined) {
        modifiedBody.params.enabled = newState;
      } else if (modifiedBody.params?.enable !== undefined) {
        modifiedBody.params.enable = newState;
      } else if (modifiedBody.params?.["inv.cfgAcEnabled"] !== undefined) {
        modifiedBody.params["inv.cfgAcEnabled"] = newState;
      } else if (modifiedBody.params?.["cfgAcEnabled"] !== undefined) {
        modifiedBody.params["cfgAcEnabled"] = newState;
      } else if (modifiedBody.params?.["pd.acEnabled"] !== undefined) {
        modifiedBody.params["pd.acEnabled"] = newState;
      }
      
      // Always include the serial number
      modifiedBody.sn = device.sn;
      
      // Make the API call
      const result = await ecoFlowAPI.testApiCall(device.sn, modifiedBody, formatName);
      
      // Update the results
      setResults(prev => ({
        ...prev,
        [formatName]: {
          requestBody: modifiedBody,
          response: result,
          timestamp: new Date().toISOString()
        }
      }));
      
      // Show toast
      showToast({
        style: result.success ? Toast.Style.Success : Toast.Style.Failure,
        title: result.success ? "Test Successful" : "Test Failed",
        message: result.message
      });
    } catch (error) {
      console.error(`Error testing format ${formatName}:`, error);
      
      // Update the results
      setResults(prev => ({
        ...prev,
        [formatName]: {
          requestBody,
          error: error instanceof Error ? error.message : "Unknown error",
          timestamp: new Date().toISOString()
        }
      }));
      
      // Show toast
      showToast({
        style: Toast.Style.Failure,
        title: "Error Testing Format",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Detail
      markdown={deviceInfoMarkdown}
      isLoading={isLoading}
      navigationTitle={`${device.deviceName || device.sn} - Diagnostics`}
      metadata={
        <Detail.Metadata>
          <Detail.Metadata.Label title="Serial Number" text={device.sn} />
          <Detail.Metadata.Label title="Device Type" text={device.type} />
          <Detail.Metadata.Label title="Status" text={device.online === 1 ? "Online" : "Offline"} />
          <Detail.Metadata.Separator />
          <Detail.Metadata.TagList title="Test Results">
            {Object.entries(results).map(([key, value]) => (
              <Detail.Metadata.TagList.Item
                key={key}
                text={key}
                color={(value as any).response?.success ? Color.Green : Color.Red}
              />
            ))}
          </Detail.Metadata.TagList>
        </Detail.Metadata>
      }
    />
  );
}

export default function Command() {
  const [isLoading, setIsLoading] = useState(true);
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [deviceQuotas, setDeviceQuotas] = useState<DeltaQuota>({});
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("quick");
  const [debugMode, setDebugMode] = useState<boolean>(false);
  const { push, pop } = useNavigation();

  // Helper function to find a value in the quotas object by checking multiple possible keys
  const findQuotaValue = (possibleKeys: string[], defaultValue?: any): any => {
    if (!deviceQuotas.fullQuotas) return defaultValue;
    
    // Check each possible key
    for (const key of possibleKeys) {
      if (deviceQuotas.fullQuotas[key] !== undefined) {
        return deviceQuotas.fullQuotas[key];
      }
    }
    
    // Check for keys that contain the search terms
    const allKeys = Object.keys(deviceQuotas.fullQuotas);
    for (const searchTerm of possibleKeys) {
      const matchingKey = allKeys.find(k => k.toLowerCase().includes(searchTerm.toLowerCase()));
      if (matchingKey && deviceQuotas.fullQuotas[matchingKey] !== undefined) {
        return deviceQuotas.fullQuotas[matchingKey];
      }
    }
    
    return defaultValue;
  };

  // Add the showDiagnosticView function inside the Command component
  const showDiagnosticView = () => {
    if (!selectedDevice || !deviceQuotas.fullQuotas) {
      showToast({
        style: Toast.Style.Failure,
        title: "No data available",
        message: "Please select a device first"
      });
      return;
    }

    push(<DiagnosticView device={selectedDevice} quotas={deviceQuotas} />);
  };

  async function fetchDevices() {
    setIsLoading(true);
    try {
      console.log("Fetching devices...");
      
      // Get saved devices from local storage
      const savedDevices = await ecoFlowAPI.getSavedDevices();
      console.log("Saved devices:", JSON.stringify(savedDevices, null, 2));

      // Filter for Delta devices (all types except smart-plug, powerstream, etc.)
      const deltaDevices = savedDevices.filter((device) => {
        const type = device.type.toLowerCase();
        const isDelta = type.includes("delta") || type.includes("river");
        const isExcluded = type.includes("smart-plug") || type.includes("powerstream");
        return isDelta && !isExcluded;
      });
      
      console.log("Filtered Delta devices:", JSON.stringify(deltaDevices, null, 2));

      if (deltaDevices.length === 0) {
        console.log("No Delta devices found");
        setDevices([]);
        setIsLoading(false);
        return;
      }

      // Check online status for each device
      console.log("Checking online status for devices...");
      let apiDevices: Device[] = [];
      try {
        apiDevices = await ecoFlowAPI.getDevices();
        console.log("API devices:", JSON.stringify(apiDevices, null, 2));
      } catch (apiError) {
        console.error("Error fetching devices from API:", apiError);
        showToast({
          style: Toast.Style.Failure,
          title: "Failed to check device status",
          message: apiError instanceof Error ? apiError.message : "Unknown error",
        });
        // Continue with saved devices even if API call fails
      }

      const devicesWithStatus = deltaDevices.map((device) => {
        const apiDevice = apiDevices.find((d) => d.sn === device.sn);
        
        if (apiDevice) {
          return {
            ...device,
            online: apiDevice.online,
            deviceName: apiDevice.deviceName || device.deviceName,
          };
        }
        
        // If device not found in API response, mark as offline
        return {
          ...device,
          online: 0
        };
      });
      
      console.log("Devices with status:", JSON.stringify(devicesWithStatus, null, 2));

      setDevices(devicesWithStatus);
      
      // Auto-select the first online device if available
      const onlineDevice = devicesWithStatus.find(device => device.online === 1);
      if (onlineDevice) {
        console.log(`Auto-selecting online device: ${onlineDevice.sn}`);
        setSelectedDevice(onlineDevice);
        fetchDeviceQuotas(onlineDevice);
      } else if (devicesWithStatus.length > 0) {
        // If no online devices, select the first one anyway
        console.log(`No online devices found, selecting first device: ${devicesWithStatus[0].sn}`);
        setSelectedDevice(devicesWithStatus[0]);
        // Don't fetch quotas for offline devices
      }
      
      // Show success toast
      showToast({
        style: Toast.Style.Success,
        title: "Devices loaded",
        message: `Found ${devicesWithStatus.length} Delta device(s)`
      });
    } catch (err) {
      console.error("Error fetching devices:", err);
      setError(err instanceof Error ? err.message : "Unknown error occurred");
      
      showToast({
        style: Toast.Style.Failure,
        title: "Failed to load devices",
        message: err instanceof Error ? err.message : "Unknown error",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchDeviceQuotas(device: Device) {
    if (!device || !device.sn) {
      showToast({
        style: Toast.Style.Failure,
        title: "Invalid device",
        message: "Device information is incomplete"
      });
      return;
    }
    
    setIsLoading(true);
    try {
      console.log(`Fetching quotas for device: ${device.sn} (${device.type})`);
      
      // Use the new getDeltaQuotas method which is optimized for Delta devices
      const quotas = await ecoFlowAPI.getDeltaQuotas(device.sn, device.type);
      
      // Add detailed logging for debugging
      const resultLog = `Device quotas result: ${JSON.stringify(quotas, null, 2)}`;
      console.log(resultLog);
      
      // Add debug toast if debug mode is enabled
      if (debugMode) {
        showToast({
          style: Toast.Style.Animated,
          title: "Debug Info",
          message: 'success' in quotas && !quotas.success ? `API call failed: ${quotas.message}` : "API call succeeded"
        });
      }
      
      // Check if there was an error in the API response
      if ('success' in quotas && !quotas.success) {
        console.error(`Error in API response: ${quotas.message}`);
        showToast({
          style: Toast.Style.Failure,
          title: "Failed to fetch device data",
          message: quotas.message
        });
        // We don't have valid data, so set default values
        setDeviceQuotas({
          soc: 0,
          remainTime: 0,
          wattsOutSum: 0,
          wattsInSum: 0,
          acOutState: 0,
          dcOutState: 0,
          errCode: 0,
        });
        setIsLoading(false);
        return;
      }
      
      // Check if we have any data in the quotas
      if (!quotas || Object.keys(quotas).length === 0) {
        console.error("Empty quotas received from API");
        showToast({
          style: Toast.Style.Failure,
          title: "No device data available",
          message: "The API returned an empty response"
        });
        setDeviceQuotas({
          soc: 0,
          remainTime: 0,
          wattsOutSum: 0,
          wattsInSum: 0,
          acOutState: 0,
          dcOutState: 0,
          errCode: 0,
        });
        setIsLoading(false);
        return;
      }
      
      // Extract available keys for debugging
      if (debugMode) {
        const availableKeys = Object.keys(quotas);
        console.log("Available quota keys:", availableKeys);
      }
      
      // Set the quotas in state
      setDeviceQuotas(quotas);
    } catch (error) {
      console.error("Error fetching device quotas:", error);
      showToast({
        style: Toast.Style.Failure,
        title: "Error fetching device data",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    } finally {
      setIsLoading(false);
    }
  }

  // Process quotas based on device model
  function processQuotasByModel(device: Device, quotas: Record<string, any>): DeltaQuota {
    console.log(`Processing quotas for device type: ${device.type}`);
    
    // Create a base object with the full quotas
    const processedQuotas: DeltaQuota = {
      ...quotas,
      fullQuotas: quotas.fullQuotas || quotas
    };
    
    // Handle error case
    if (quotas.error) {
      console.log(`Error found in quotas: ${quotas.error}`);
      return processedQuotas;
    }
    
    // Log all keys for debugging
    console.log("Available quota keys:", Object.keys(quotas));
    
    // For Delta Pro 3, we need to handle specific data structure
    if (device.type.includes("DELTA PRO 3")) {
      console.log("Processing Delta Pro 3 specific quotas");
      
      // Extract values from the fullQuotas object if available
      const fullQuotas = quotas.fullQuotas || {};
      
      // Find the prefix pattern (e.g., "9_1.")
      let prefix = "";
      const firstKey = Object.keys(fullQuotas)[0];
      if (firstKey) {
        const match = firstKey.match(/^(\d+_\d+\.)/);
        if (match) {
          prefix = match[1];
          console.log(`Found prefix pattern for Delta Pro 3: ${prefix}`);
        }
      }
      
      // Extract SOC (battery level)
      if (fullQuotas[`${prefix}bmsMaster.soc`] !== undefined) {
        processedQuotas.soc = fullQuotas[`${prefix}bmsMaster.soc`];
        console.log(`Found SOC in bmsMaster.soc: ${processedQuotas.soc}`);
      } else if (quotas.soc !== undefined) {
        processedQuotas.soc = quotas.soc;
        console.log(`Found SOC in root: ${processedQuotas.soc}`);
      }
      
      // Extract input power
      if (fullQuotas[`${prefix}pd.wattsInSum`] !== undefined) {
        processedQuotas.wattsInSum = fullQuotas[`${prefix}pd.wattsInSum`];
        console.log(`Found wattsInSum in pd.wattsInSum: ${processedQuotas.wattsInSum}`);
      } else if (quotas.wattsInSum !== undefined) {
        processedQuotas.wattsInSum = quotas.wattsInSum;
        console.log(`Found wattsInSum in root: ${processedQuotas.wattsInSum}`);
      }
      
      // Extract output power
      if (fullQuotas[`${prefix}pd.wattsOutSum`] !== undefined) {
        processedQuotas.wattsOutSum = fullQuotas[`${prefix}pd.wattsOutSum`];
        console.log(`Found wattsOutSum in pd.wattsOutSum: ${processedQuotas.wattsOutSum}`);
      } else if (quotas.wattsOutSum !== undefined) {
        processedQuotas.wattsOutSum = quotas.wattsOutSum;
        console.log(`Found wattsOutSum in root: ${processedQuotas.wattsOutSum}`);
      }
      
      // Extract remaining time
      if (fullQuotas[`${prefix}pd.remainTime`] !== undefined) {
        processedQuotas.remainTime = fullQuotas[`${prefix}pd.remainTime`];
        console.log(`Found remainTime in pd.remainTime: ${processedQuotas.remainTime}`);
      } else if (quotas.remainTime !== undefined) {
        processedQuotas.remainTime = quotas.remainTime;
        console.log(`Found remainTime in root: ${processedQuotas.remainTime}`);
      }
      
      // Extract error code
      if (fullQuotas[`${prefix}pd.errCode`] !== undefined) {
        processedQuotas.errCode = fullQuotas[`${prefix}pd.errCode`];
        console.log(`Found errCode in pd.errCode: ${processedQuotas.errCode}`);
      } else if (quotas.errCode !== undefined) {
        processedQuotas.errCode = quotas.errCode;
        console.log(`Found errCode in root: ${processedQuotas.errCode}`);
      }
      
      // Extract warning code
      if (fullQuotas[`${prefix}pd.warnCode`] !== undefined) {
        processedQuotas.warnCode = fullQuotas[`${prefix}pd.warnCode`];
        console.log(`Found warnCode in pd.warnCode: ${processedQuotas.warnCode}`);
      } else if (quotas.warnCode !== undefined) {
        processedQuotas.warnCode = quotas.warnCode;
        console.log(`Found warnCode in root: ${processedQuotas.warnCode}`);
      }
      
      // Extract AC output state
      if (fullQuotas[`${prefix}cfgAcHvEnabled`] !== undefined || fullQuotas[`${prefix}cfgAcLvEnabled`] !== undefined) {
        const hvEnabled = fullQuotas[`${prefix}cfgAcHvEnabled`] === 1;
        const lvEnabled = fullQuotas[`${prefix}cfgAcLvEnabled`] === 1;
        processedQuotas.acOutState = (hvEnabled || lvEnabled) ? 1 : 0;
        console.log(`Found acOutState from cfgAcHvEnabled/cfgAcLvEnabled: ${processedQuotas.acOutState}`);
      } else if (quotas.cfgAcHvEnabled !== undefined || quotas.cfgAcLvEnabled !== undefined) {
        const hvEnabled = quotas.cfgAcHvEnabled === 1;
        const lvEnabled = quotas.cfgAcLvEnabled === 1;
        processedQuotas.acOutState = (hvEnabled || lvEnabled) ? 1 : 0;
        console.log(`Found acOutState from root cfgAcHvEnabled/cfgAcLvEnabled: ${processedQuotas.acOutState}`);
      }
      
      // Extract DC output state
      if (fullQuotas[`${prefix}cfgDcEnabled`] !== undefined) {
        processedQuotas.dcOutState = fullQuotas[`${prefix}cfgDcEnabled`];
        console.log(`Found dcOutState in cfgDcEnabled: ${processedQuotas.dcOutState}`);
      } else if (quotas.cfgDcEnabled !== undefined) {
        processedQuotas.dcOutState = quotas.cfgDcEnabled;
        console.log(`Found dcOutState in root cfgDcEnabled: ${processedQuotas.dcOutState}`);
      }
    } else {
      // Try to find SOC in various possible locations
      const possibleSocKeys = [
        "pd.soc", "bmsMaster.soc", "soc", "cmsBattSoc", 
        "hs_yj751_pd_appshow_addr.soc", "batSoc"
      ];
      
      for (const key of possibleSocKeys) {
        if (quotas[key] !== undefined) {
          console.log(`Found SOC in key: ${key} = ${quotas[key]}`);
          processedQuotas.soc = quotas[key];
          break;
        }
      }
      
      // Try to find input power in various possible locations
      const possibleInputKeys = [
        "pd.wattsInSum", "wattsInSum", "powInSumW", 
        "hs_yj751_pd_appshow_addr.wattsInSum"
      ];
      
      for (const key of possibleInputKeys) {
        if (quotas[key] !== undefined) {
          console.log(`Found input power in key: ${key} = ${quotas[key]}`);
          processedQuotas.wattsInSum = quotas[key];
          break;
        }
      }
      
      // Try to find output power in various possible locations
      const possibleOutputKeys = [
        "pd.wattsOutSum", "wattsOutSum", "powOutSumW", 
        "hs_yj751_pd_appshow_addr.wattsOutSum"
      ];
      
      for (const key of possibleOutputKeys) {
        if (quotas[key] !== undefined) {
          console.log(`Found output power in key: ${key} = ${quotas[key]}`);
          processedQuotas.wattsOutSum = quotas[key];
          break;
        }
      }
      
      // Try to find remaining time in various possible locations
      const possibleRemainTimeKeys = [
        "pd.remainTime", "remainTime", "cmsChgRemTime", "cmsDsgRemTime",
        "hs_yj751_pd_appshow_addr.remainTime"
      ];
      
      for (const key of possibleRemainTimeKeys) {
        if (quotas[key] !== undefined) {
          console.log(`Found remaining time in key: ${key} = ${quotas[key]}`);
          processedQuotas.remainTime = quotas[key];
          break;
        }
      }
      
      // Try to find error code in various possible locations
      const possibleErrorKeys = [
        "pd.errCode", "errCode", "errcode", 
        "hs_yj751_pd_appshow_addr.sysErrCode"
      ];
      
      for (const key of possibleErrorKeys) {
        if (quotas[key] !== undefined) {
          console.log(`Found error code in key: ${key} = ${quotas[key]}`);
          processedQuotas.errCode = quotas[key];
          break;
        }
      }
      
      // Try to find warning code in various possible locations
      const possibleWarningKeys = [
        "pd.warnCode", "warnCode", "warncode"
      ];
      
      for (const key of possibleWarningKeys) {
        if (quotas[key] !== undefined) {
          console.log(`Found warning code in key: ${key} = ${quotas[key]}`);
          processedQuotas.warnCode = quotas[key];
          break;
        }
      }
      
      // Process DC output state based on device type
      if (device.type.includes("DELTA PRO ULTRA")) {
        // For Pro Ultra, we need to extract DC state from showFlag or use the direct property
        if (quotas["hs_yj751_pd_appshow_addr.showFlag"] !== undefined) {
          const showFlag = quotas["hs_yj751_pd_appshow_addr.showFlag"];
          const binaryFlag = Number(showFlag).toString(2);
          // 6th bit from right is DC state
          processedQuotas.dcOutState = binaryFlag.length >= 6 ? 
            (binaryFlag[binaryFlag.length - 6] === '1' ? 1 : 0) : 0;
        } else {
          processedQuotas.dcOutState = quotas["hs_yj751_pd_cfg_addr.cfgDcEnabled"] || 0;
        }
      } else {
        // Default for most Delta models
        processedQuotas.dcOutState = quotas["pd.dcOutState"] || quotas["dcOutState"] || 0;
      }
      
      // Process AC output state based on device type
      if (device.type.includes("DELTA PRO ULTRA")) {
        // For Pro Ultra, we can extract AC state from showFlag or use the direct property
        if (quotas["hs_yj751_pd_appshow_addr.showFlag"] !== undefined) {
          const showFlag = quotas["hs_yj751_pd_appshow_addr.showFlag"];
          const binaryFlag = Number(showFlag).toString(2);
          // 3rd bit from right is AC state
          processedQuotas.acOutState = binaryFlag.length >= 3 ? 
            (binaryFlag[binaryFlag.length - 3] === '1' ? 1 : 0) : 0;
        } else {
          processedQuotas.acOutState = quotas["hs_yj751_inv_cfg_addr.cfgAcEnabled"] || 0;
        }
      } else {
        // Default for most Delta models
        processedQuotas.acOutState = quotas["inv.cfgAcEnabled"] || quotas["cfgAcEnabled"] || 0;
      }
    }
    
    console.log("Final processed quotas:", JSON.stringify(processedQuotas, null, 2));
    return processedQuotas;
  }

  useEffect(() => {
    fetchDevices();
  }, []);

  // Handle device selection change
  const handleDeviceSelect = (deviceSN: string) => {
    const device = devices.find(d => d.sn === deviceSN);
    if (device) {
      setSelectedDevice(device);
      fetchDeviceQuotas(device);
    }
  };

  // Toggle AC output
  const toggleAcOutput = async (device: Device, currentState: number | undefined) => {
    if (!device) {
      showToast(Toast.Style.Failure, "No device selected", "Please select a device first");
      return;
    }

    setIsLoading(true);
    try {
      // Enhanced logging
      const logMessage = `Toggling AC output for ${device.type} (${device.sn}) from ${currentState} to ${currentState ? 0 : 1}`;
      console.log(logMessage);
      
      if (debugMode) {
        showToast({
          style: Toast.Style.Animated,
          title: "Debug Info",
          message: logMessage
        });
      }
      
      // The new state is the opposite of the current state
      const newState = currentState ? 0 : 1;
      
      // Use the new raw method that exactly mimics the EcoFlow app
      if (debugMode) {
        showToast({
          style: Toast.Style.Animated,
          title: "Debug Info",
          message: `Calling rawAcToggle with device type: "${device.type}"`
        });
      }
      
      const result = await ecoFlowAPI.rawAcToggle(device.sn, device.type, newState);
      
      const resultLog = `Toggle AC output result: ${JSON.stringify(result, null, 2)}`;
      console.log(resultLog);
      
      if (debugMode) {
        showToast({
          style: Toast.Style.Animated,
          title: "Debug Info",
          message: result.success ? "API call succeeded" : `API call failed: ${result.message}`
        });
      }
      
      if (result.success) {
        // Update the local state
        setDeviceQuotas(prev => ({
          ...prev,
          acOutState: newState
        }));
        
        showToast(Toast.Style.Success, "AC output toggled", `AC output turned ${newState ? "on" : "off"}`);
        
        // Refresh device quotas after a short delay to allow the device to update
        setTimeout(() => {
          fetchDeviceQuotas(device);
        }, 2000);
      } else {
        showToast(Toast.Style.Failure, "Failed to toggle AC output", result.message);
        
        if (debugMode) {
          // Show a more detailed error toast in debug mode
          showToast(Toast.Style.Failure, "API Error Details", 
            result.error ? JSON.stringify(result.error, null, 2) : "No detailed error information");
        }
      }
    } catch (error) {
      const errorMessage = `Error toggling AC output: ${error instanceof Error ? error.message : "Unknown error"}`;
      console.error(errorMessage);
      
      if (debugMode) {
        showToast(Toast.Style.Failure, "Exception Caught", errorMessage);
        if (error instanceof Error && error.stack) {
          console.error("Stack trace:", error.stack);
        }
      }
      
      showToast(Toast.Style.Failure, "Error toggling AC output", error instanceof Error ? error.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Toggle DC output
  const toggleDcOutput = async (device: Device, currentState: number | undefined) => {
    try {
      const newState = currentState === 1 ? 0 : 1;
      setIsLoading(true);
      
      const result = await ecoFlowAPI.rawDcToggle(device.sn, device.type, newState);
      
      const resultLog = `Toggle DC output result: ${JSON.stringify(result, null, 2)}`;
      console.log(resultLog);
      
      if (debugMode) {
        showToast({
          style: Toast.Style.Animated,
          title: "Debug Info",
          message: result.success ? "API call succeeded" : `API call failed: ${result.message}`
        });
      }
      
      if (result.success) {
        showToast({
          style: Toast.Style.Success,
          title: `DC Output ${newState === 1 ? "Enabled" : "Disabled"}`,
        });
        
        // Refresh device data after toggling
        await fetchDeviceQuotas(device);
      } else {
        showToast({
          style: Toast.Style.Failure,
          title: "Failed to Toggle DC Output",
          message: result.message,
        });
      }
    } catch (error) {
      console.error("Error toggling DC output:", error);
      showToast({
        style: Toast.Style.Failure,
        title: "Error Toggling DC Output",
        message: String(error),
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Format remaining time in a more human-readable format
  const formatRemainingTime = (minutes: number | undefined): string => {
    if (minutes === undefined || minutes <= 0) {
      return "Unknown";
    }
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${remainingMinutes}m`;
    } else {
      return `${remainingMinutes}m`;
    }
  };

  // Get battery color based on state of charge
  const getBatteryColor = (soc: number | undefined): string => {
    if (soc === undefined) return Color.SecondaryText;
    
    if (soc <= 20) {
      return Color.Red;
    } else if (soc <= 50) {
      return Color.Orange;
    } else if (soc <= 80) {
      return Color.Yellow;
    } else {
    return Color.Green;
    }
  };

  // Get power flow icon based on wattage
  const getPowerFlowIcon = (watts: number | undefined): { icon: Icon; tintColor: string } => {
    if (watts === undefined || watts === 0) {
      return { icon: Icon.Minus, tintColor: Color.SecondaryText };
    }
    
    if (watts > 0) {
      return { icon: Icon.ArrowRight, tintColor: Color.Green };
    } else {
      return { icon: Icon.ArrowLeft, tintColor: Color.Red };
    }
  };

  // Calculate net power (positive means charging, negative means discharging)
  const calculateNetPower = (inputWatts: number | undefined, outputWatts: number | undefined): string => {
    const input = inputWatts || 0;
    const output = outputWatts || 0;
    const netPower = input - output;
    
    return netPower.toString();
  };

  // Get net power icon
  const getNetPowerIcon = (inputWatts: number | undefined, outputWatts: number | undefined): { source: Icon; tintColor: Color } => {
    const input = inputWatts || 0;
    const output = outputWatts || 0;
    const netPower = input - output;
    
    if (netPower > 0) {
      return { source: Icon.Plus, tintColor: Color.Green }; // Charging
    } else if (netPower < 0) {
      return { source: Icon.Minus, tintColor: Color.Red }; // Discharging
    } else {
      return { source: Icon.Dot, tintColor: Color.SecondaryText }; // Balanced
    }
  };

  // Show raw data view
  const showRawDataView = () => {
    if (!selectedDevice || !deviceQuotas.fullQuotas) {
      showToast({
        style: Toast.Style.Failure,
        title: "No data available",
        message: "Please select a device first"
      });
      return;
    }

    push(<RawDataView device={selectedDevice} quotas={deviceQuotas.fullQuotas} />);
  };

  // Toggle beeper
  const toggleBeeper = async (device: Device) => {
    if (!device || !device.sn) return;
    
    setIsLoading(true);
    try {
      console.log(`Toggling beeper for device ${device.sn} (${device.type})`);
      
      let result;
      
      if (device.type.includes("DELTA PRO ULTRA")) {
        // For Delta Pro Ultra, use the device-specific command
        console.log(`Using device-specific command for Delta Pro Ultra`);
        result = await ecoFlowAPI.setDeviceCommand(
          device.sn,
          device.type,
          "setBeeper",
          { value: 1 }
        );
      } else if (device.type.includes("DELTA PRO 3")) {
        // For Delta Pro 3, use the cfgBeeperSwitch property with prefix
        console.log("Setting beeper for Delta Pro 3");
        
        // Get the prefix from the fullQuotas
        const fullQuotas = deviceQuotas.fullQuotas || {};
        let prefix = "";
        const firstKey = Object.keys(fullQuotas)[0];
        if (firstKey) {
          const match = firstKey.match(/^(\d+_\d+\.)/);
          if (match) {
            prefix = match[1];
            console.log(`Found prefix pattern for Delta Pro 3: ${prefix}`);
          }
        }
        
        // Try with prefix first
        let propertyName = prefix ? `${prefix}cfgBeeperSwitch` : "cfgBeeperSwitch";
        console.log(`Setting beeper for Delta Pro 3 using property: ${propertyName}`);
        result = await ecoFlowAPI.setDeviceProperty(device.sn, propertyName, 1);
      } else {
        // Default for other Delta models
        const propertyName = "pd.beepState";
        console.log(`Setting beeper using property: ${propertyName}`);
        result = await ecoFlowAPI.setDeviceProperty(device.sn, propertyName, 1);
      }
      
      console.log("Toggle beeper result:", result);
      
      if (result.success) {
        showToast({
          style: Toast.Style.Success,
          title: "Beeper Enabled",
        });
        // Refresh device quotas
        fetchDeviceQuotas(device);
      } else {
        throw new Error("Failed to toggle beeper");
      }
    } catch (err) {
      console.error("Error toggling beeper:", err);
      showToast({
        style: Toast.Style.Failure,
        title: "Failed to toggle beeper",
        message: err instanceof Error ? err.message : "Unknown error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Add this function to your component
  async function testAcToggleFormats() {
    if (!selectedDevice) {
      showToast(Toast.Style.Failure, "No device selected", "Please select a device first");
      return;
    }

    setIsLoading(true);
    try {
      console.log(`Testing AC toggle formats for device ${selectedDevice.deviceName} (${selectedDevice.type})`);
      
      // Get the current AC state to toggle to the opposite
      // Use the correct variable name for the quotas
      const currentState = deviceQuotas?.["inv.cfgAcEnabled"] || 0;
      const newState = currentState === 1 ? 0 : 1;
      
      console.log(`Current AC state: ${currentState}, toggling to: ${newState}`);
      
      // Call the test function
      const results = await ecoFlowAPI.testAcToggleFormats(selectedDevice.sn, selectedDevice.type, newState);
      
      // Check if any format was successful
      const successfulFormat = Object.entries(results).find(([_, result]) => result.success);
      
      if (successfulFormat) {
        showToast(Toast.Style.Success, "Test successful", `Format ${successfulFormat[0]} worked!`);
        // Refresh quotas to see the change
        await fetchDeviceQuotas(selectedDevice);
      } else {
        showToast(Toast.Style.Failure, "Test failed", "None of the formats worked");
      }
    } catch (error) {
      console.error("Error testing AC toggle formats:", error);
      showToast(Toast.Style.Failure, "Error testing formats", error instanceof Error ? error.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }

  if (error) {
    return (
      <List isLoading={isLoading}>
        <List.EmptyView
          icon={{ source: Icon.Warning, tintColor: Color.Red }}
          title="Failed to load Delta devices"
          description={error}
        />
      </List>
    );
  }

  return (
    <List
      isLoading={isLoading}
      searchBarPlaceholder="Search devices..."
      filtering={true}
      navigationTitle={selectedDevice ? `${selectedDevice.deviceName || selectedDevice.sn} - Control${debugMode ? " (Debug)" : ""}` : "Delta Control"}
      searchBarAccessory={
        <List.Dropdown
          tooltip="View Mode"
          value={viewMode}
          onChange={(newValue) => setViewMode(newValue as ViewMode)}
        >
          <List.Dropdown.Item title="Quick View" value="quick" icon={Icon.Eye} />
          <List.Dropdown.Item title="Detailed View" value="detailed" icon={Icon.List} />
        </List.Dropdown>
      }
      throttle={true}
    >
      {devices.length === 0 && !isLoading ? (
        <List.EmptyView
          icon={{ source: Icon.Warning, tintColor: Color.Yellow }}
          title="No Delta devices found"
          description="Add a Delta device using the 'Manage Devices' command first"
        />
      ) : (
        <>
          {/* Device Selection Section - Only show if no device is selected */}
          {!selectedDevice && (
            <List.Section title="Select Device">
              {devices.map((device) => (
                <List.Item
                  key={device.sn}
                  title={device.deviceName || device.sn}
                  subtitle={device.type}
                  icon={{ 
                    source: getDeviceIcon(device.type), 
                    tintColor: device.online === 1 ? Color.Green : Color.SecondaryText 
                  }}
                  accessories={[{ text: device.online === 1 ? "Online" : "Offline", icon: getStatusIcon(device.online) }]}
                  actions={
                    <ActionPanel>
                      <Action title="Select Device" onAction={() => handleDeviceSelect(device.sn)} />
                    </ActionPanel>
                  }
                />
              ))}
            </List.Section>
          )}

          {/* Device Control Section */}
          {selectedDevice && deviceQuotas && (
            <>
              {viewMode === "quick" ? (
                // Quick View
                <List.Section title="Quick View">
                  {/* Battery Status */}
                  <List.Item
                    title="Battery"
                    subtitle={`${deviceQuotas.soc !== undefined ? deviceQuotas.soc + '%' : 'Unknown'}`}
                    icon={{ 
                      source: getBatteryIcon(deviceQuotas.soc), 
                      tintColor: getBatteryColor(deviceQuotas.soc) 
                    }}
                    accessories={[
                      { 
                        text: formatRemainingTime(deviceQuotas.remainTime),
                        icon: deviceQuotas.remainTime && deviceQuotas.remainTime < 0 
                          ? { source: Icon.ArrowDown, tintColor: Color.Red } 
                          : { source: Icon.ArrowUp, tintColor: Color.Green }
                      }
                    ]}
                    actions={
                      <ActionPanel>
                        <Action
                          title="Refresh"
                          icon={Icon.ArrowClockwise}
                          onAction={() => fetchDeviceQuotas(selectedDevice)}
                        />
                      </ActionPanel>
                    }
                  />
                  
                  {/* Power Input */}
                  <List.Item
                    title="Power Input"
                    subtitle={`${deviceQuotas.wattsInSum !== undefined ? deviceQuotas.wattsInSum + 'W' : '0W'}`}
                    icon={{ 
                      source: Icon.Plug, 
                      tintColor: deviceQuotas.wattsInSum && deviceQuotas.wattsInSum > 0 
                        ? Color.Green 
                        : Color.SecondaryText 
                    }}
                    accessories={[
                      { 
                        icon: getPowerFlowIcon(deviceQuotas.wattsInSum).icon,
                        text: deviceQuotas.wattsInSum && deviceQuotas.wattsInSum > 0 
                          ? "Charging" 
                          : "No Input"
                      }
                    ]}
                  />
                  
                  {/* Power Output */}
                  <List.Item
                    title="Power Output"
                    subtitle={`${deviceQuotas.wattsOutSum !== undefined ? deviceQuotas.wattsOutSum + 'W' : '0W'}`}
                    icon={{ 
                      source: Icon.LightBulb, 
                      tintColor: deviceQuotas.wattsOutSum && deviceQuotas.wattsOutSum > 0 
                        ? Color.Yellow 
                        : Color.SecondaryText 
                    }}
                    accessories={[
                      { 
                        icon: getPowerFlowIcon(deviceQuotas.wattsOutSum).icon,
                        text: deviceQuotas.wattsOutSum && deviceQuotas.wattsOutSum > 0 
                          ? "Discharging" 
                          : "No Output"
                      }
                    ]}
                  />
                  
                  {/* AC Output */}
                  <List.Item
                    title="AC Output"
                    icon={{ 
                      source: Icon.Plug, 
                      tintColor: deviceQuotas.acOutState === 1 ? Color.Green : Color.SecondaryText 
                    }}
                    accessories={[
                      { 
                        text: deviceQuotas.acOutState === 1 ? "On" : "Off",
                        icon: deviceQuotas.acOutState === 1 
                          ? { source: Icon.Checkmark, tintColor: Color.Green } 
                          : { source: Icon.XmarkCircle, tintColor: Color.Red }
                      }
                    ]}
                  />
                  
                  {/* DC Output */}
                  <List.Item
                    title="DC Output"
                    icon={{ 
                      source: Icon.Bolt, 
                      tintColor: deviceQuotas.dcOutState === 1 ? Color.Yellow : Color.SecondaryText 
                    }}
                    accessories={[
                      { 
                        text: deviceQuotas.dcOutState === 1 ? "On" : "Off",
                        icon: deviceQuotas.dcOutState === 1 
                          ? { source: Icon.Checkmark, tintColor: Color.Green } 
                          : { source: Icon.XmarkCircle, tintColor: Color.Red }
                      }
                    ]}
                  />
                  
                  {/* Device Status */}
                  <List.Item
                    title="Device Status"
                    icon={{ 
                      source: deviceQuotas.errCode && deviceQuotas.errCode > 0 ? Icon.Warning : Icon.Checkmark,
                      tintColor: deviceQuotas.errCode && deviceQuotas.errCode > 0 ? Color.Red : Color.Green
                    }}
                    accessories={[
                      { 
                        text: deviceQuotas.errCode && deviceQuotas.errCode > 0 
                          ? `Error: ${deviceQuotas.errCode}` 
                          : "Normal"
                      }
                    ]}
                  />
                </List.Section>
              ) : (
                // Detailed View
                <>
                  {/* Device Summary Section */}
                  <List.Section title="Device Summary">
                    <List.Item
                      title={selectedDevice.deviceName || selectedDevice.sn}
                      subtitle={selectedDevice.type}
                      icon={{ 
                        source: getDeviceIcon(selectedDevice.type), 
                        tintColor: selectedDevice.online === 1 ? Color.Green : Color.SecondaryText 
                      }}
                      accessories={[{ 
                        text: selectedDevice.online === 1 ? "Online" : "Offline", 
                        icon: getStatusIcon(selectedDevice.online) 
                      }]}
                    />
                  </List.Section>
                  
                  {/* Use Grid for master-detail view */}
                  <List.Section title="Device Details">
                    <List.Item
                      title="Battery Information"
                      icon={Icon.Battery}
                      accessories={[{ text: deviceQuotas.soc !== undefined ? `${deviceQuotas.soc}%` : "Unknown" }]}
                    />
                    <List.Item
                      title="Remaining Time"
                      icon={Icon.Clock}
                      accessories={[{ 
                        text: formatRemainingTime(deviceQuotas.remainTime)
                      }]}
                    />
                    {findQuotaValue(["pd.chgSoc", "chgSoc", "cfgChgSoc", "bmsMaster.chgSoc"]) !== undefined && (
                      <List.Item
                        title="Max Charge Limit"
                        icon={Icon.ArrowUp}
                        accessories={[{ text: `${findQuotaValue(["pd.chgSoc", "chgSoc", "cfgChgSoc", "bmsMaster.chgSoc"])}%` }]}
                      />
                    )}
                    {findQuotaValue(["pd.dsgSoc", "dsgSoc", "cfgDsgSoc", "bmsMaster.dsgSoc"]) !== undefined && (
                      <List.Item
                        title="Min Discharge Limit"
                        icon={Icon.ArrowDown}
                        accessories={[{ text: `${findQuotaValue(["pd.dsgSoc", "dsgSoc", "cfgDsgSoc", "bmsMaster.dsgSoc"])}%` }]}
                      />
                    )}
                    {findQuotaValue(["pd.bpPowerSoc", "bpPowerSoc", "cfgBpPowerSoc"]) !== undefined && (
                      <List.Item
                        title="Backup Reserve"
                        icon={Icon.Shield}
                        accessories={[{ text: `${findQuotaValue(["pd.bpPowerSoc", "bpPowerSoc", "cfgBpPowerSoc"])}%` }]}
                      />
                    )}
                    {findQuotaValue(["bmsMaster.temp", "temp", "pd.temp", "batTemp"]) !== undefined && (
                      <List.Item
                        title="Battery Temperature"
                        icon={Icon.Temperature}
                        accessories={[{ text: `${findQuotaValue(["bmsMaster.temp", "temp", "pd.temp", "batTemp"])}°C` }]}
                      />
                    )}
                    {findQuotaValue(["bmsMaster.cycles", "cycles", "pd.cycles", "batCycles"]) !== undefined && (
                      <List.Item
                        title="Battery Cycles"
                        icon={Icon.Repeat}
                        accessories={[{ text: `${findQuotaValue(["bmsMaster.cycles", "cycles", "pd.cycles", "batCycles"])} cycles` }]}
                      />
                    )}
                    <List.Item
                      title="Battery Status"
                      icon={{ 
                        source: deviceQuotas.errCode && deviceQuotas.errCode > 0 ? Icon.Warning : Icon.Checkmark,
                        tintColor: deviceQuotas.errCode && deviceQuotas.errCode > 0 ? Color.Red : Color.Green
                      }}
                      accessories={[{ 
                        text: deviceQuotas.errCode && deviceQuotas.errCode > 0 
                          ? `Error: ${deviceQuotas.errCode}` 
                          : "Normal" 
                      }]}
                    />
                    {deviceQuotas.warnCode && deviceQuotas.warnCode > 0 && (
                      <List.Item
                        title="Warning"
                        icon={Icon.ExclamationMark}
                        accessories={[{ text: `Warning: ${deviceQuotas.warnCode}` }]}
                      />
                    )}
                    {findQuotaValue(["bmsMaster.designCap", "designCap", "batteryCapacity"]) !== undefined && (
                      <List.Item
                        title="Battery Capacity"
                        icon={Icon.Battery}
                        accessories={[{ text: `${findQuotaValue(["bmsMaster.designCap", "designCap", "batteryCapacity"])}Wh` }]}
                      />
                    )}
                    {findQuotaValue(["bmsMaster.remainCap", "remainCap", "remainingCapacity"]) !== undefined && (
                      <List.Item
                        title="Remaining Capacity"
                        icon={Icon.Battery}
                        accessories={[{ text: `${findQuotaValue(["bmsMaster.remainCap", "remainCap", "remainingCapacity"])}Wh` }]}
                      />
                    )}
                  </List.Section>

                  <List.Section title="Power Information">
                    <List.Item
                      title="Input Power"
                      icon={{ 
                        source: Icon.Plug, 
                        tintColor: deviceQuotas.wattsInSum && deviceQuotas.wattsInSum > 0 
                          ? Color.Green 
                          : Color.SecondaryText 
                      }}
                      accessories={[{ 
                        text: deviceQuotas.wattsInSum !== undefined ? `${deviceQuotas.wattsInSum}W` : "0W",
                        icon: getPowerFlowIcon(deviceQuotas.wattsInSum).icon
                      }]}
                    />
                    {findQuotaValue(["pd.acInVol", "acInVol", "acInVolts", "acInputVoltage"]) !== undefined && (
                      <List.Item
                        title="AC Input Voltage"
                        icon={Icon.Bolt}
                        accessories={[{ text: `${findQuotaValue(["pd.acInVol", "acInVol", "acInVolts", "acInputVoltage"])}V` }]}
                      />
                    )}
                    {findQuotaValue(["pd.acInFreq", "acInFreq", "acInFrequency", "acInputFrequency"]) !== undefined && (
                      <List.Item
                        title="AC Input Frequency"
                        icon={Icon.Waveform}
                        accessories={[{ text: `${findQuotaValue(["pd.acInFreq", "acInFreq", "acInFrequency", "acInputFrequency"])}Hz` }]}
                      />
                    )}
                    {findQuotaValue(["pd.pvInVol", "pvInVol", "pvInVolts", "solarInputVoltage"]) !== undefined && (
                      <List.Item
                        title="Solar Input Voltage"
                        icon={Icon.Sun}
                        accessories={[{ text: `${findQuotaValue(["pd.pvInVol", "pvInVol", "pvInVolts", "solarInputVoltage"])}V` }]}
                      />
                    )}
                    {findQuotaValue(["pd.pvInPower", "pvInPower", "pvPower", "solarInputPower"]) !== undefined && (
                      <List.Item
                        title="Solar Input Power"
                        icon={Icon.Sun}
                        accessories={[{ text: `${findQuotaValue(["pd.pvInPower", "pvInPower", "pvPower", "solarInputPower"])}W` }]}
                      />
                    )}
                    <List.Item
                      title="Output Power"
                      icon={{ 
                        source: Icon.LightBulb, 
                        tintColor: deviceQuotas.wattsOutSum && deviceQuotas.wattsOutSum > 0 
                          ? Color.Yellow 
                          : Color.SecondaryText 
                      }}
                      accessories={[{ 
                        text: deviceQuotas.wattsOutSum !== undefined ? `${deviceQuotas.wattsOutSum}W` : "0W",
                        icon: getPowerFlowIcon(deviceQuotas.wattsOutSum).icon
                      }]}
                    />
                    {findQuotaValue(["inv.acOutVol", "acOutVol", "acOutVolts", "acOutputVoltage"]) !== undefined && (
                      <List.Item
                        title="AC Output Voltage"
                        icon={Icon.Bolt}
                        accessories={[{ text: `${findQuotaValue(["inv.acOutVol", "acOutVol", "acOutVolts", "acOutputVoltage"])}V` }]}
                      />
                    )}
                    {findQuotaValue(["inv.acOutFreq", "acOutFreq", "acOutFrequency", "acOutputFrequency"]) !== undefined && (
                      <List.Item
                        title="AC Output Frequency"
                        icon={Icon.Waveform}
                        accessories={[{ text: `${findQuotaValue(["inv.acOutFreq", "acOutFreq", "acOutFrequency", "acOutputFrequency"])}Hz` }]}
                      />
                    )}
                    <List.Item
                      title="Net Power"
                      icon={Icon.Gauge}
                      accessories={[{ 
                        text: `${calculateNetPower(deviceQuotas.wattsInSum, deviceQuotas.wattsOutSum)}W`,
                        icon: getNetPowerIcon(deviceQuotas.wattsInSum, deviceQuotas.wattsOutSum)
                      }]}
                    />
                    {findQuotaValue(["pd.cfgAcChgWatts", "cfgAcChgWatts", "acChgWatts"]) !== undefined && (
                      <List.Item
                        title="AC Charging Speed"
                        icon={Icon.Bolt}
                        accessories={[{ text: `${findQuotaValue(["pd.cfgAcChgWatts", "cfgAcChgWatts", "acChgWatts"])}W` }]}
                      />
                    )}
                    {findQuotaValue(["pd.cfgDcChgCurrent", "cfgDcChgCurrent", "dcChgCurrent"]) !== undefined && (
                      <List.Item
                        title="DC Charging Current"
                        icon={Icon.Bolt}
                        accessories={[{ text: `${findQuotaValue(["pd.cfgDcChgCurrent", "cfgDcChgCurrent", "dcChgCurrent"])}A` }]}
                      />
                    )}
                  </List.Section>

                  <List.Section title="Output Controls">
                    <List.Item
                      title="AC Output"
                      icon={{ 
                        source: Icon.Plug, 
                        tintColor: deviceQuotas.acOutState === 1 ? Color.Green : Color.SecondaryText 
                      }}
                      accessories={[{ 
                        text: deviceQuotas.acOutState === 1 ? "On" : "Off",
                        icon: deviceQuotas.acOutState === 1 
                          ? { source: Icon.Checkmark, tintColor: Color.Green } 
                          : { source: Icon.XmarkCircle, tintColor: Color.Red }
                      }]}
                      actions={
                        <ActionPanel>
                          <Action
                            title={deviceQuotas.acOutState === 1 ? "Turn AC Output Off" : "Turn AC Output On"}
                            icon={deviceQuotas.acOutState === 1 ? Icon.XmarkCircle : Icon.Checkmark}
                            onAction={() => toggleAcOutput(selectedDevice, deviceQuotas.acOutState)}
                          />
                        </ActionPanel>
                      }
                    />
                    <List.Item
                      title="DC Output"
                      icon={{ 
                        source: Icon.Bolt, 
                        tintColor: deviceQuotas.dcOutState === 1 ? Color.Yellow : Color.SecondaryText 
                      }}
                      accessories={[{ 
                        text: deviceQuotas.dcOutState === 1 ? "On" : "Off",
                        icon: deviceQuotas.dcOutState === 1 
                          ? { source: Icon.Checkmark, tintColor: Color.Green } 
                          : { source: Icon.XmarkCircle, tintColor: Color.Red }
                      }]}
                      actions={
                        <ActionPanel>
                          <Action
                            title={deviceQuotas.dcOutState === 1 ? "Turn DC Output Off" : "Turn DC Output On"}
                            icon={deviceQuotas.dcOutState === 1 ? Icon.XmarkCircle : Icon.Checkmark}
                            onAction={() => toggleDcOutput(selectedDevice, deviceQuotas.dcOutState)}
                          />
                        </ActionPanel>
                      }
                    />
                    {findQuotaValue(["inv.cfgAcEnergySavingOpen", "cfgAcEnergySavingOpen", "acEnergySaving"]) !== undefined && (
                    <List.Item
                        title="Energy Saving Mode"
                        icon={Icon.Leaf}
                        accessories={[{ 
                          text: findQuotaValue(["inv.cfgAcEnergySavingOpen", "cfgAcEnergySavingOpen", "acEnergySaving"]) === 1 ? "On" : "Off",
                          icon: findQuotaValue(["inv.cfgAcEnergySavingOpen", "cfgAcEnergySavingOpen", "acEnergySaving"]) === 1 
                            ? { source: Icon.Checkmark, tintColor: Color.Green } 
                            : { source: Icon.XmarkCircle, tintColor: Color.Red }
                        }]}
                      />
                    )}
                    {findQuotaValue(["inv.cfgAcXboost", "cfgAcXboost", "xboost"]) !== undefined && (
                    <List.Item
                        title="X-Boost Mode"
                        icon={Icon.Bolt}
                        accessories={[{ 
                          text: findQuotaValue(["inv.cfgAcXboost", "cfgAcXboost", "xboost"]) === 1 ? "On" : "Off",
                          icon: findQuotaValue(["inv.cfgAcXboost", "cfgAcXboost", "xboost"]) === 1 
                            ? { source: Icon.Checkmark, tintColor: Color.Green } 
                            : { source: Icon.XmarkCircle, tintColor: Color.Red }
                        }]}
                      />
                    )}
                  </List.Section>

                  <List.Section title="Device Settings">
                    {findQuotaValue(["pd.screenTimeout", "screenTimeout", "cfgScreenTimeout"]) !== undefined && (
                    <List.Item
                        title="Screen Timeout"
                        icon={Icon.Desktop}
                        accessories={[{ text: `${findQuotaValue(["pd.screenTimeout", "screenTimeout", "cfgScreenTimeout"])} seconds` }]}
                      />
                    )}
                    {findQuotaValue(["pd.deviceStandbyTime", "deviceStandbyTime", "cfgDeviceStandbyTime"]) !== undefined && (
                      <List.Item
                        title="Device Standby Time"
                        icon={Icon.Clock}
                        accessories={[{ text: `${findQuotaValue(["pd.deviceStandbyTime", "deviceStandbyTime", "cfgDeviceStandbyTime"])} seconds` }]}
                      />
                    )}
                    {findQuotaValue(["pd.beepState", "beepState", "cfgBeeperSwitch"]) !== undefined && (
                    <List.Item
                        title="Beeper Status"
                        icon={Icon.Speaker}
                        accessories={[{ 
                          text: findQuotaValue(["pd.beepState", "beepState", "cfgBeeperSwitch"]) === 1 ? "On" : "Off",
                          icon: findQuotaValue(["pd.beepState", "beepState", "cfgBeeperSwitch"]) === 1 
                            ? { source: Icon.Checkmark, tintColor: Color.Green } 
                            : { source: Icon.XmarkCircle, tintColor: Color.Red }
                        }]}
                      actions={
                        <ActionPanel>
                          <Action
                              title="Toggle Beeper"
                              icon={Icon.Switch}
                              onAction={() => toggleBeeper(selectedDevice)}
                                      />
                                    </ActionPanel>
                                  }
                      />
                    )}
                    {findQuotaValue(["pd.upsMode", "upsMode", "cfgUpsMode"]) !== undefined && (
                      <List.Item
                        title="UPS Mode"
                        icon={Icon.Power}
                        accessories={[{ text: `${findQuotaValue(["pd.upsMode", "upsMode", "cfgUpsMode"])}` }]}
                      />
                    )}
                    {findQuotaValue(["pd.ambientTemp", "ambientTemp", "envTemp"]) !== undefined && (
                      <List.Item
                        title="Ambient Temperature"
                        icon={Icon.Temperature}
                        accessories={[{ text: `${findQuotaValue(["pd.ambientTemp", "ambientTemp", "envTemp"])}°C` }]}
                      />
                    )}
                  </List.Section>

                  <List.Section title="Device Information">
                    <List.Item
                      title="Device Name"
                      icon={Icon.Tag}
                      accessories={[{ text: selectedDevice.deviceName || selectedDevice.sn }]}
                    />
                    <List.Item
                      title="Serial Number"
                      icon={Icon.BarCode}
                      accessories={[{ text: selectedDevice.sn }]}
                    />
                    <List.Item
                      title="Model"
                      icon={Icon.Info}
                      accessories={[{ text: selectedDevice.type }]}
                    />
                    {findQuotaValue(["pd.firmwareVersion", "firmwareVersion", "version"]) !== undefined && (
                      <List.Item
                        title="Firmware Version"
                        icon={Icon.Code}
                        accessories={[{ text: findQuotaValue(["pd.firmwareVersion", "firmwareVersion", "version"]) }]}
                      />
                    )}
                    {findQuotaValue(["pd.hardwareVersion", "hardwareVersion", "hwVersion"]) !== undefined && (
                    <List.Item
                        title="Hardware Version"
                        icon={Icon.Gear}
                        accessories={[{ text: findQuotaValue(["pd.hardwareVersion", "hardwareVersion", "hwVersion"]) }]}
                      />
                    )}
                    <List.Item
                      title="Status"
                      icon={selectedDevice.online === 1 ? Icon.Checkmark : Icon.XmarkCircle}
                      accessories={[{ text: selectedDevice.online === 1 ? "Online" : "Offline" }]}
                    />
                  </List.Section>

                  <List.Section title="Raw Data & Debug">
                    <List.Item
                      title="View All Quotas"
                      icon={Icon.Code}
                      accessories={[{ text: "View JSON data" }]}
                      actions={
                        <ActionPanel>
                          <Action
                            title="View Raw Data"
                            icon={Icon.Code}
                            onAction={showRawDataView}
                          />
                          <Action.CopyToClipboard
                            title="Copy Raw Data"
                            content={JSON.stringify(deviceQuotas.fullQuotas || {}, null, 2)}
                            shortcut={{ modifiers: ["cmd"], key: "c" }}
                          />
                          <Action
                            title={debugMode ? "Disable Debug Mode" : "Enable Debug Mode"}
                            icon={debugMode ? Icon.EyeDisabled : Icon.Eye}
                            shortcut={{ modifiers: ["cmd"], key: "d" }}
                            onAction={() => setDebugMode(!debugMode)}
                          />
                        </ActionPanel>
                      }
                    />
                    <List.Item
                      title="Available Data Keys"
                      icon={Icon.List}
                      accessories={[{ text: `${Object.keys(deviceQuotas.fullQuotas || {}).length} keys` }]}
                      actions={
                        <ActionPanel>
                          <Action.CopyToClipboard
                            title="Copy Keys List"
                            content={Object.keys(deviceQuotas.fullQuotas || {}).join("\n")}
                          />
                          <Action
                            title="Show Common Values"
                            onAction={() => {
                              // Create a list of common values to check for
                              const commonKeys = [
                                "soc", "wattsInSum", "wattsOutSum", "remainTime",
                                "acOutState", "dcOutState", "chgSoc", "dsgSoc",
                                "bpPowerSoc", "temp", "cycles", "upsMode",
                                "cfgAcXboost", "cfgAcChgWatts", "cfgDcChgCurrent",
                                "designCap", "remainCap", "ambientTemp",
                                "firmwareVersion", "hardwareVersion"
                              ];
                              
                              // Find values for these keys
                              const foundValues: Record<string, any> = {};
                              
                              for (const key of commonKeys) {
                                const value = findQuotaValue([key]);
                                if (value !== undefined) {
                                  foundValues[key] = value;
                                }
                              }
                              
                              // Show a toast with the found values
                                              showToast({
                                                style: Toast.Style.Success,
                                title: `Found ${Object.keys(foundValues).length} common values`,
                                message: "Values copied to clipboard"
                              });
                              
                              // Copy to clipboard
                              Clipboard.copy(JSON.stringify(foundValues, null, 2));
                            }}
                          />
                        </ActionPanel>
                      }
                    />
                    <List.Item
                      title="Refresh Device Data"
                      icon={Icon.Repeat}
                      accessories={[{ text: "Update all device information" }]}
                      actions={
                        <ActionPanel>
                          <Action
                            title="Refresh Data"
                            icon={Icon.Repeat}
                            shortcut={{ modifiers: ["cmd"], key: "r" }}
                            onAction={() => {
                              if (selectedDevice) {
                                fetchDeviceQuotas(selectedDevice);
                              }
                            }}
                          />
                          <Action
                            title={debugMode ? "Disable Debug Mode" : "Enable Debug Mode"}
                            icon={debugMode ? Icon.EyeDisabled : Icon.Eye}
                            shortcut={{ modifiers: ["cmd"], key: "d" }}
                            onAction={() => setDebugMode(!debugMode)}
                          />
                        </ActionPanel>
                      }
                    />
                  </List.Section>
                </>
              )}
            </>
          )}
        </>
      )}
    </List>
  );
}

// Helper function to get device icon based on type
function getDeviceIcon(deviceType: string): Icon {
  if (deviceType.toLowerCase().includes("delta")) {
    return Icon.Battery;
  } else if (deviceType.toLowerCase().includes("river")) {
    return Icon.Battery;
  } else {
    return Icon.Power;
  }
}

// Helper function to get status icon
function getStatusIcon(online: number): { source: Icon; tintColor: Color } {
  return online === 1
    ? { source: Icon.Checkmark, tintColor: Color.Green }
    : { source: Icon.XmarkCircle, tintColor: Color.Red };
}

// Helper function to get battery icon based on SOC
function getBatteryIcon(soc: number | undefined): Icon {
  if (soc === undefined) return Icon.Battery;
  if (soc <= 10) return Icon.Battery;
  if (soc <= 30) return Icon.Battery;
  if (soc <= 70) return Icon.Battery;
  return Icon.Battery;
}
