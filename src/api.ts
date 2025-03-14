import axios from "axios";
import { getPreferenceValues, LocalStorage } from "@raycast/api";
import * as crypto from "crypto";

/**
 * EcoFlow API Implementation
 * 
 * This implementation follows the official EcoFlow API documentation:
 * - GET /iot-open/sign/device/list: Get device list
 * - GET /iot-open/sign/device/quota/all?sn=XXX: Get all device quotas
 * - POST /iot-open/sign/device/quota: Query specific device quotas
 * - PUT /iot-open/sign/device/quota: Set device properties
 * - PUT /iot-open/sign/device/cmd: Send device commands
 */

/**
 * EcoFlow API preferences
 */
interface Preferences {
  accessKey: string;
  secretKey: string;
}

/**
 * API Error Response interface
 */
export interface ApiErrorResponse {
  success: false;
  message: string;
  error: any;
}

/**
 * Device interface representing an EcoFlow device
 */
interface Device {
  sn: string;
  deviceName: string;
  online: number;
  type: string;
}

/**
 * PowerStream device quota interface
 */
interface PowerStreamQuota {
  [key: string]: string | number | boolean | undefined;
  
  // PowerStream specific fields
  supplyPriority?: number; // 0: prioritize power supply; 1: prioritize power storage
  permanentWatts?: number; // Custom load power settings (0-600W)
  lowerLimit?: number; // Lower limit for battery discharging (1-30)
  upperLimit?: number; // Upper limit for battery charging (70-100)
  invBrightness?: number; // LED brightness (0-1023)
  
  // Battery information
  batSoc?: number; // Battery level
  batInputVolt?: number; // Battery voltage
  batInputCur?: number; // Battery current
  batInputWatts?: number; // Battery input power
  batTemp?: number; // Battery temperature
  batStatue?: number; // Battery status
  batErrCode?: number; // Battery error code
  batWarningCode?: number; // Battery warning code
  batSystem?: number; // Battery system type (0: Power Station, 1: Electric Vehicle)
  chgRemainTime?: number; // Charging time remaining (minutes)
  dsgRemainTime?: number; // Discharging time remaining (minutes)
  
  // Inverter information
  invOnOff?: number; // Micro-inverter switch: 0: off; 1: on
  invOutputWatts?: number; // Inverter output power
  invStatue?: number; // Inverter status
  invErrCode?: number; // Inverter error code
  invWarnCode?: number; // Inverter warning code
  invFreq?: number; // Inverter frequency
  invTemp?: number; // Inverter temperature
  invInputVolt?: number; // Inverter input voltage
  invOutputCur?: number; // Inverter output current
  invOpVolt?: number; // Inverter operating voltage
  invDemandWatts?: number; // Inverter demand power
  
  // System information
  ratedPower?: number; // Rated power
  installCountry?: number; // Installation country code
  installTown?: number; // Installation town code
  feedProtect?: number; // Feed-in protection (0: disabled, 1: enabled)
  
  // Connection status
  interfaceConnFlag?: number; // Connection status flag
  
  // Power generation/consumption
  geneWatt?: number; // Power generation
  consWatt?: number; // Power consumption
  
  // Network information
  wifiRssi?: number; // WiFi signal strength
}

/**
 * Smart Plug device quota interface
 */
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
}

// API base URL
const BASE_URL = "https://api-e.ecoflow.com";

/**
 * EcoFlow API client for interacting with EcoFlow devices
 */
export class EcoFlowAPI {
  private accessKey: string;
  private secretKey: string;

  constructor() {
    const preferences = getPreferenceValues<Preferences>();
    this.accessKey = preferences.accessKey;
    this.secretKey = preferences.secretKey;
  }

  /**
   * Creates a signature for API authentication
   * @param params Request parameters
   * @param timestamp Current timestamp
   * @param nonce Random nonce
   * @returns Signature string
   */
  private createSignature(params: Record<string, unknown>, timestamp: number, nonce: number): string {
    // Convert params to a sorted query string
    const sortedParams = this.objectToSortedQueryString(params);
    
    // Add accessKey, nonce, timestamp
    const signStr = `${sortedParams ? sortedParams + "&" : ""}accessKey=${this.accessKey}&nonce=${nonce}&timestamp=${timestamp}`;
    
    // HMAC-SHA256 encryption and convert to hex
    const hmac = crypto.createHmac("sha256", this.secretKey);
    hmac.update(signStr);
    const signature = hmac.digest("hex");
    
    return signature;
  }

  /**
   * Converts an object to a sorted query string
   * @param obj Object to convert
   * @returns Sorted query string
   */
  private objectToSortedQueryString(obj: Record<string, unknown>): string {
    // Special handling for nested objects
    const flattenObject = (obj: Record<string, unknown>, prefix = ''): Record<string, string> => {
      return Object.keys(obj).reduce((acc: Record<string, string>, k: string) => {
        const pre = prefix.length ? `${prefix}.` : '';
        const value = obj[k];
        
        if (value === null || value === undefined) {
          return acc;
        }
        
        if (typeof value === 'object' && !Array.isArray(value)) {
          // Handle nested objects
          Object.assign(acc, flattenObject(value as Record<string, unknown>, `${pre}${k}`));
        } else if (Array.isArray(value)) {
          // Handle arrays according to the documentation
          // Example: ids[0]=1&ids[1]=2&ids[2]=3
          if (value.length === 0) {
            // Skip empty arrays
            return acc;
          }
          
          // For arrays of objects, we need special handling
          if (typeof value[0] === 'object' && value[0] !== null) {
            // Handle array of objects
            value.forEach((item, index) => {
              if (item !== null && typeof item === 'object') {
                Object.assign(
                  acc, 
                  flattenObject(item as Record<string, unknown>, `${pre}${k}[${index}]`)
                );
              }
            });
          } else {
            // Handle array of primitives
            value.forEach((item, index) => {
              acc[`${pre}${k}[${index}]`] = String(item);
            });
          }
        } else {
          // Handle primitive values
          acc[`${pre}${k}`] = String(value);
        }
        
        return acc;
      }, {});
    };
    
    // Flatten the object
    const flatObj = flattenObject(obj);
    
    // Sort keys and create query string
    return Object.keys(flatObj)
      .sort()
      .map(key => `${key}=${encodeURIComponent(flatObj[key])}`)
      .join('&');
  }

  /**
   * Makes a signed API request
   * @param method HTTP method
   * @param endpoint API endpoint
   * @param params Request parameters
   * @param contentType Content type header
   * @returns API response
   */
  private async makeSignedRequest<T>(
    method: string,
    endpoint: string,
    params: Record<string, unknown> = {},
    contentType?: string,
  ): Promise<T> {
    // Validate API keys
    if (!this.accessKey || this.accessKey.trim() === "") {
      throw new Error("EcoFlow Access Key is missing. Please set it in the extension preferences.");
    }
    
    if (!this.secretKey || this.secretKey.trim() === "") {
      throw new Error("EcoFlow Secret Key is missing. Please set it in the extension preferences.");
    }
    
    const timestamp = Date.now();
    const nonce = Math.floor(100000 + Math.random() * 900000); // 6-digit random number
    
    // Create headers according to the documentation
    const headers: Record<string, string> = {
      accessKey: this.accessKey,
      timestamp: timestamp.toString(),
      nonce: nonce.toString(),
    };
    
    let url = `${BASE_URL}${endpoint}`;
    let requestData: any = undefined;
    
    // Handle different request methods according to the documentation
    if (method === "GET") {
      // For GET requests, add params to URL
      if (Object.keys(params).length > 0) {
        const queryParams = new URLSearchParams();
        for (const key in params) {
          queryParams.append(key, String(params[key]));
        }
        url += `?${queryParams.toString()}`;
      }
      
      // For GET requests, the signature is based on the original params
      headers.sign = this.createSignature(params, timestamp, nonce);
      console.log(`GET request signature generated from params:`, JSON.stringify(params, null, 2));
    } else if (method === "PUT" || method === "POST") {
      // For PUT/POST requests with JSON content
      if (contentType === "application/json;charset=UTF-8") {
        headers["Content-Type"] = contentType;
        requestData = params;
      }
      
      // For PUT/POST requests, the signature is based on the request body
      headers.sign = this.createSignature(params, timestamp, nonce);
      
      // Log the signature generation details
      console.log(`${method} request signature details:`);
      console.log(`- Timestamp: ${timestamp}`);
      console.log(`- Nonce: ${nonce}`);
      console.log(`- AccessKey: ${this.accessKey.substring(0, 5)}...`);
      console.log(`- Params for signature:`, JSON.stringify(params, null, 2));
      
      // Log the flattened and sorted params for debugging
      const sortedParams = this.objectToSortedQueryString(params);
      console.log(`- Sorted params string: ${sortedParams}`);
      console.log(`- Final signature: ${headers.sign}`);
    }
    
    try {
      console.log(`Making ${method} request to ${url}`);
      console.log(`Headers:`, JSON.stringify(headers, null, 2));
      if (requestData) {
        console.log(`Request body:`, JSON.stringify(requestData, null, 2));
      }
      
      const response = await axios({
        method,
        url,
        headers,
        data: requestData,
        timeout: 10000, // 10 second timeout
      });
      
      console.log(`Response status: ${response.status}`);
      console.log(`Response data:`, JSON.stringify(response.data, null, 2));
      
      return response.data as T;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(`API Error (${error.response.status}):`, error.response.data);
        
        // For 405 Method Not Allowed errors, provide more helpful information
        if (error.response.status === 405) {
          console.error(`Method Not Allowed: The API does not support ${method} requests to ${endpoint}`);
          console.error(`This might indicate that the API endpoint has changed or the method is incorrect.`);
          console.error(`According to the documentation:`);
          console.error(`- GET /iot-open/sign/device/list: Get device list`);
          console.error(`- GET /iot-open/sign/device/quota/all?sn=XXX: Get all device quotas`);
          console.error(`- POST /iot-open/sign/device/quota: Query specific device quotas`);
          console.error(`- PUT /iot-open/sign/device/quota: Set device properties`);
          console.error(`- PUT /iot-open/sign/device/cmd: Send device commands`);
        }
        
        throw new Error(`API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
      } else {
        console.error("API Request Error:", error);
        throw error;
      }
    }
  }

  /**
   * Get list of devices from the API
   * @returns List of devices
   */
  async getDevices(): Promise<Device[]> {
    try {
      console.log("Fetching devices from API");
      
      // According to the documentation, we should use GET for /iot-open/sign/device/list
      const response = await this.makeSignedRequest<{ data: Device[] }>(
        "GET", 
        "/iot-open/sign/device/list"
      );
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching devices:", error);
      return [];
    }
  }

  /**
   * Get specific device quotas
   * @param serialNumber Device serial number
   * @param quotas List of quotas to request
   * @returns Device quotas
   */
  async getDeviceQuotas(serialNumber: string, quotas: string[]): Promise<Record<string, any> | ApiErrorResponse> {
    try {
      console.log(`Fetching specific quotas for device: ${serialNumber}`);
      console.log(`Requested quotas:`, JSON.stringify(quotas, null, 2));
      
      const requestBody = {
        sn: serialNumber,
        params: {
          quotas
        }
      };
      
      console.log(`Device quotas request:`, JSON.stringify(requestBody, null, 2));
      
      const response = await this.makeSignedRequest<any>(
        "POST",
        "/iot-open/sign/device/quota",
        requestBody,
        "application/json;charset=UTF-8"
      );
      
      console.log(`Device quotas response:`, JSON.stringify(response, null, 2));
      
      if (response.code !== "0") {
        console.error(`Error fetching device quotas: ${response.message || "Unknown error"} (Code: ${response.code})`);
        return {
          success: false,
          message: `API Error: ${response.message || "Unknown error"} (Code: ${response.code})`,
          error: response
        };
      }
      
      return response.data || {};
    } catch (error) {
      console.error("Error fetching device quotas:", error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
        error
      };
    }
  }

  /**
   * Get PowerStream device quotas
   * @param serialNumber Device serial number
   * @returns PowerStream quotas
   */
  async getPowerStreamQuotas(serialNumber: string): Promise<PowerStreamQuota | ApiErrorResponse> {
    try {
      console.log(`Fetching PowerStream quotas for device: ${serialNumber}`);
      
      // According to the Powerstream.md documentation, PowerStream quotas use prefix 20_1.*
      const requestBody = {
        sn: serialNumber,
        params: {
          quotas: [
            "20_1.batSoc",
            "20_1.batInputVolt",
            "20_1.batInputCur",
            "20_1.batInputWatts",
            "20_1.batTemp",
            "20_1.batStatue",
            "20_1.batErrCode",
            "20_1.batWarningCode",
            "20_1.invOnOff",
            "20_1.invOutputWatts",
            "20_1.invStatue",
            "20_1.invErrCode",
            "20_1.invWarnCode",
            "20_1.supplyPriority",
            "20_1.permanentWatts",
            "20_1.lowerLimit",
            "20_1.upperLimit",
            "20_1.invBrightness"
          ]
        }
      };
      
      console.log("PowerStream quotas request:", JSON.stringify(requestBody, null, 2));
      
      // Make the request directly using the makeSignedRequest method
      const response = await this.makeSignedRequest<any>(
        "POST",
        "/iot-open/sign/device/quota",
        requestBody,
        "application/json;charset=UTF-8"
      );
      
      console.log("PowerStream API Response:", JSON.stringify(response, null, 2));
      
      if (response.code !== "0") {
        console.error(`Error fetching PowerStream quotas: ${response.message || "Unknown error"} (Code: ${response.code})`);
        return {
          success: false,
          message: `API Error: ${response.message || "Unknown error"} (Code: ${response.code})`,
          error: response
        };
      }
      
      // Process the response to remove the "20_1." prefix from the keys
      const processedData: PowerStreamQuota = {};
      
      if (response.data && typeof response.data === 'object') {
        Object.entries(response.data).forEach(([key, value]) => {
          // Remove the prefix (e.g., "20_1.") from the key
          const cleanKey = key.replace(/^20_1\./, '');
          
          // Convert string values to appropriate types if needed
          if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
            processedData[cleanKey] = value;
          }
        });
      }
      
      return processedData;
    } catch (error) {
      console.error("Error fetching PowerStream quotas:", error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
        error
      };
    }
  }

  /**
   * Get Smart Plug device quotas
   * @param serialNumber Device serial number
   * @returns Smart Plug quotas
   */
  async getSmartPlugQuotas(serialNumber: string): Promise<SmartPlugQuota | ApiErrorResponse> {
    try {
      console.log(`Fetching Smart Plug quotas for device: ${serialNumber}`);
      
      // According to the SmartPlug.md documentation, we need to use the exact format
      // The documentation shows we should use POST for specific quotas
      const requestBody = {
        sn: serialNumber,
        params: {
          quotas: [
            "2_1.switchSta",
            "2_1.watts",
            "2_1.maxWatts",
            "2_1.current",
            "2_1.maxCur",
            "2_1.volt",
            "2_1.freq",
            "2_1.temp",
            "2_1.brightness",
            "2_1.errCode",
            "2_1.warnCode",
            "2_1.country",
            "2_1.town",
            "2_1.updateTime",
            "2_1.runTime"
          ]
        }
      };
      
      console.log("Smart Plug quotas request:", JSON.stringify(requestBody, null, 2));
      
      // Make the request directly using the makeSignedRequest method
      const response = await this.makeSignedRequest<any>(
        "POST",
        "/iot-open/sign/device/quota",
        requestBody,
        "application/json;charset=UTF-8"
      );
      
      console.log("Smart Plug API Response:", JSON.stringify(response, null, 2));
      
      if (response.code !== "0") {
        console.error(`Error fetching Smart Plug quotas: ${response.message || "Unknown error"} (Code: ${response.code})`);
        return {
          success: false,
          message: `API Error: ${response.message || "Unknown error"} (Code: ${response.code})`,
          error: response
        };
      }
      
      // Process the response to remove the "2_1." prefix from the keys
      const processedData: SmartPlugQuota = {};
      
      if (response.data && typeof response.data === 'object') {
        Object.entries(response.data).forEach(([key, value]) => {
          // Remove the prefix (e.g., "2_1.") from the key
          const cleanKey = key.replace(/^2_1\./, '');
          
          // Convert boolean strings to actual booleans
          if (value === "true" || value === "false") {
            processedData[cleanKey] = value === "true";
          } else if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
            processedData[cleanKey] = value;
          }
        });
      }
      
      return processedData;
    } catch (error) {
      console.error("Error fetching Smart Plug quotas:", error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
        error
      };
    }
  }

  /**
   * Set PowerStream function
   * @param serialNumber Device serial number
   * @param cmdCode Command code
   * @param params Command parameters
   * @returns API response
   */
  async setPowerStreamFunction(serialNumber: string, cmdCode: string, params: Record<string, unknown>): Promise<any> {
    try {
      console.log(`Setting PowerStream function for device ${serialNumber}: ${cmdCode}`);
      console.log(`Function parameters:`, JSON.stringify(params, null, 2));
      
      // According to the Powerstream.md documentation, we need to use the exact format
      // For commands, we should use PUT /iot-open/sign/device/cmd
      const requestBody = {
        sn: serialNumber,
        cmdCode,
        params
      };
      
      console.log("PowerStream command request:", JSON.stringify(requestBody, null, 2));
      
      const response = await this.makeSignedRequest<any>(
        "PUT",
        "/iot-open/sign/device/cmd",
        requestBody,
        "application/json;charset=UTF-8"
      );
      
      console.log("PowerStream command response:", JSON.stringify(response, null, 2));
      
      if (response.code === "0") {
        return {
          success: true,
          message: `Command ${cmdCode} executed successfully`,
          data: response.data
        };
      } else {
        return {
          success: false,
          message: `API Error: ${response.message || "Unknown error"} (Code: ${response.code})`,
          error: response
        };
      }
    } catch (error) {
      console.error(`Error setting PowerStream function:`, error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
        error
      };
    }
  }

  /**
   * Set Smart Plug function
   * @param serialNumber Device serial number
   * @param cmdCode Command code
   * @param params Command parameters
   * @returns API response
   */
  async setSmartPlugFunction(serialNumber: string, cmdCode: string, params: Record<string, unknown>): Promise<any> {
    try {
      console.log(`Setting Smart Plug function for device ${serialNumber}: ${cmdCode}`);
      console.log(`Function parameters:`, JSON.stringify(params, null, 2));
      
      // According to the SmartPlug.md documentation, we need to use the exact format
      // For commands, we should use PUT /iot-open/sign/device/cmd
      const requestBody = {
        sn: serialNumber,
        cmdCode,
        params
      };
      
      console.log("Smart Plug command request:", JSON.stringify(requestBody, null, 2));
      
      const response = await this.makeSignedRequest<any>(
        "PUT",
        "/iot-open/sign/device/cmd",
        requestBody,
        "application/json;charset=UTF-8"
      );
      
      console.log("Smart Plug command response:", JSON.stringify(response, null, 2));
      
      if (response.code === "0") {
        return {
          success: true,
          message: `Command ${cmdCode} executed successfully`,
          data: response.data
        };
      } else {
        return {
          success: false,
          message: `API Error: ${response.message || "Unknown error"} (Code: ${response.code})`,
          error: response
        };
      }
    } catch (error) {
      console.error(`Error setting Smart Plug function:`, error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
        error
      };
    }
  }

  /**
   * Save device to local storage
   * @param device Device to save
   */
  async saveDevice(device: Device): Promise<void> {
    // Get existing devices
    const existingDevices = await this.getSavedDevices();
    
    // Check if device already exists
    const deviceIndex = existingDevices.findIndex(d => d.sn === device.sn);
    
    if (deviceIndex >= 0) {
      // Update existing device
      existingDevices[deviceIndex] = device;
    } else {
      // Add new device
      existingDevices.push(device);
    }
    
    // Save updated devices
    await LocalStorage.setItem("ecoflow-devices", JSON.stringify(existingDevices));
  }

  /**
   * Get saved devices from local storage
   * @returns List of saved devices
   */
  async getSavedDevices(): Promise<Device[]> {
    const devicesJson = await LocalStorage.getItem("ecoflow-devices");
    return devicesJson ? JSON.parse(devicesJson as string) : [];
  }

  /**
   * Remove device from local storage
   * @param serialNumber Device serial number
   */
  async removeDevice(serialNumber: string): Promise<void> {
    // Get existing devices
    const existingDevices = await this.getSavedDevices();
    
    // Filter out the device to remove
    const updatedDevices = existingDevices.filter(d => d.sn !== serialNumber);
    
    // Save updated devices
    await LocalStorage.setItem("ecoflow-devices", JSON.stringify(updatedDevices));
  }

  /**
   * Get all quotas for a Delta device
   * @param serialNumber Device serial number
   * @returns All device quotas
   */
  async getAllQuotas(serialNumber: string): Promise<Record<string, any>> {
    try {
      console.log(`Fetching all quotas for device: ${serialNumber}`);
      
      // According to the documentation, we should use GET for /iot-open/sign/device/quota/all
      const response = await this.makeSignedRequest<any>(
        "GET",
        "/iot-open/sign/device/quota/all",
        { sn: serialNumber }
      );
      
      if (response.code !== "0") {
        return { 
          error: `API Error: ${response.message || "Unknown error"} (Code: ${response.code})`,
          fullQuotas: response.data || {}
        };
      }
      
      // Store the full quotas for debugging
      const result = {
        ...response.data,
        fullQuotas: response.data
      };
      
      return result;
    } catch (error) {
      console.error("Error fetching device quotas:", error);
      return { 
        error: error instanceof Error ? error.message : "Unknown error",
        fullQuotas: {}
      };
    }
  }

  /**
   * Set a device property
   * @param serialNumber Device serial number
   * @param property Property name
   * @param value Property value
   * @returns API response
   */
  async setDeviceProperty(serialNumber: string, property: string, value: any): Promise<any> {
    try {
      console.log(`Setting device property for ${serialNumber}: ${property} = ${value}`);
      
      const requestBody = {
        sn: serialNumber,
        params: {
          [property]: value
        }
      };
      
      const response = await this.makeSignedRequest<any>(
        "PUT",
        "/iot-open/sign/device/quota",
        requestBody,
        "application/json;charset=UTF-8"
      );
      
      if (response.code === "0") {
        return {
          success: true,
          message: `Property ${property} set to ${value}`,
          data: response.data
        };
      } else {
        return {
          success: false,
          message: `API Error: ${response.message || "Unknown error"} (Code: ${response.code})`,
          error: response
        };
      }
    } catch (error) {
      console.error(`Error setting device property:`, error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
        error
      };
    }
  }

  /**
   * Send a command to a device
   * @param serialNumber Device serial number
   * @param deviceType Device type
   * @param command Command name
   * @param params Command parameters
   * @returns API response
   */
  async setDeviceCommand(serialNumber: string, deviceType: string, command: string, params: Record<string, any>): Promise<any> {
    try {
      console.log(`Sending command to device ${serialNumber} (${deviceType}): ${command}`);
      console.log(`Command parameters:`, JSON.stringify(params, null, 2));
      
      const requestBody = {
        sn: serialNumber,
        cmdCode: command,
        params
      };
      
      const response = await this.makeSignedRequest<any>(
        "PUT",
        "/iot-open/sign/device/cmd",
        requestBody,
        "application/json;charset=UTF-8"
      );
      
      if (response.code === "0") {
        return {
          success: true,
          message: `Command ${command} executed successfully`,
          data: response.data
        };
      } else {
        return {
          success: false,
          message: `API Error: ${response.message || "Unknown error"} (Code: ${response.code})`,
          error: response
        };
      }
    } catch (error) {
      console.error(`Error executing device command:`, error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
        error
      };
    }
  }

  /**
   * Test API call with custom request body
   * @param serialNumber Device serial number
   * @param requestBody Request body
   * @param formatDescription Description of the format being tested
   * @returns API response
   */
  async testApiCall(serialNumber: string, requestBody: any, formatDescription: string): Promise<any> {
    try {
      console.log(`Testing API call format: ${formatDescription}`);
      console.log(`Request body:`, JSON.stringify(requestBody, null, 2));
      
      // Use our makeSignedRequest method instead of direct axios call
      const response = await this.makeSignedRequest<any>(
        "PUT",
        "/iot-open/sign/device/quota",
        requestBody,
        "application/json;charset=UTF-8"
      );
      
      if (response && response.code === "0") {
        return {
          success: true,
          message: `Format ${formatDescription} worked!`,
          data: response.data
        };
      } else {
        return {
          success: false,
          message: `API Error: ${response.message || "Unknown error"} (Code: ${response.code})`,
          error: response
        };
      }
    } catch (error) {
      console.error(`Error testing API call:`, error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
        error
      };
    }
  }

  /**
   * Test different AC toggle formats
   * @param serialNumber Device serial number
   * @param deviceType Device type
   * @param newState New state (0 or 1)
   * @returns Results of all format tests
   */
  async testAcToggleFormats(serialNumber: string, deviceType: string, newState: number): Promise<Record<string, any>> {
    const results: Record<string, any> = {};
    
    // Format 1: Direct property
    try {
      results["Format 1: Direct property"] = await this.testApiCall(
        serialNumber,
        {
          sn: serialNumber,
          params: {
            "inv.cfgAcEnabled": newState
          }
        },
        "Direct property"
      );
    } catch (error) {
      results["Format 1: Direct property"] = {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
        error
      };
    }
    
    // Format 2: With device type prefix
    try {
      results["Format 2: With device type prefix"] = await this.testApiCall(
        serialNumber,
        {
          sn: serialNumber,
          params: {
            [`${deviceType}.inv.cfgAcEnabled`]: newState
          }
        },
        "With device type prefix"
      );
    } catch (error) {
      results["Format 2: With device type prefix"] = {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
        error
      };
    }
    
    // Format 3: Using cfgAcEnabled directly
    try {
      results["Format 3: Using cfgAcEnabled directly"] = await this.testApiCall(
        serialNumber,
        {
          sn: serialNumber,
          params: {
            "cfgAcEnabled": newState
          }
        },
        "Using cfgAcEnabled directly"
      );
    } catch (error) {
      results["Format 3: Using cfgAcEnabled directly"] = {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
        error
      };
    }
    
    return results;
  }

  /**
   * Toggle AC output
   * @param serialNumber Device serial number
   * @param deviceType Device type
   * @param newState New state (0 or 1)
   * @returns API response
   */
  async rawAcToggle(serialNumber: string, deviceType: string, newState: number): Promise<any> {
    try {
      console.log(`Toggling AC output for ${deviceType} (${serialNumber}) to ${newState}`);
      
      // Determine the correct format based on device type
      let params: Record<string, any> = {};
      
      // Different device types use different parameter formats
      if (deviceType.includes("DELTA PRO ULTRA")) {
        params["hs_yj751_inv_cfg_addr.cfgAcEnabled"] = newState;
      } else if (deviceType.includes("DELTA PRO 3")) {
        // For Delta Pro 3, we need to find the correct prefix
        params["9_1.cfgAcEnabled"] = newState;
      } else if (deviceType.includes("DELTA 2 MAX")) {
        params["inv.cfgAcEnabled"] = newState;
      } else {
        // Default format for most Delta models
        params["inv.cfgAcEnabled"] = newState;
      }
      
      // Use our makeSignedRequest method instead of direct axios call
      const requestBody = {
        sn: serialNumber,
        params
      };
      
      const response = await this.makeSignedRequest<any>(
        "PUT",
        "/iot-open/sign/device/quota",
        requestBody,
        "application/json;charset=UTF-8"
      );
      
      if (response && response.code === "0") {
        return {
          success: true,
          message: `AC output set to ${newState ? "on" : "off"}`,
          data: response.data
        };
      } else {
        return {
          success: false,
          message: `API Error: ${response.message || "Unknown error"} (Code: ${response.code})`,
          error: response
        };
      }
    } catch (error) {
      console.error(`Error toggling AC output:`, error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
        error
      };
    }
  }

  /**
   * Toggle DC output
   * @param serialNumber Device serial number
   * @param deviceType Device type
   * @param newState New state (0 or 1)
   * @returns API response
   */
  async rawDcToggle(serialNumber: string, deviceType: string, newState: number): Promise<any> {
    try {
      console.log(`Toggling DC output for ${deviceType} (${serialNumber}) to ${newState}`);
      
      // Determine the correct format based on device type
      let params: Record<string, any> = {};
      
      // Different device types use different parameter formats
      if (deviceType.includes("DELTA PRO ULTRA")) {
        params["hs_yj751_pd_cfg_addr.cfgDcEnabled"] = newState;
      } else if (deviceType.includes("DELTA PRO 3")) {
        // For Delta Pro 3, we need to find the correct prefix
        params["9_1.cfgDcEnabled"] = newState;
      } else if (deviceType.includes("DELTA 2 MAX")) {
        params["pd.dcOutState"] = newState;
      } else {
        // Default format for most Delta models
        params["pd.dcOutState"] = newState;
      }
      
      // Use our makeSignedRequest method instead of direct axios call
      const requestBody = {
        sn: serialNumber,
        params
      };
      
      const response = await this.makeSignedRequest<any>(
        "PUT",
        "/iot-open/sign/device/quota",
        requestBody,
        "application/json;charset=UTF-8"
      );
      
      if (response && response.code === "0") {
        return {
          success: true,
          message: `DC output set to ${newState ? "on" : "off"}`,
          data: response.data
        };
      } else {
        return {
          success: false,
          message: `API Error: ${response.message || "Unknown error"} (Code: ${response.code})`,
          error: response
        };
      }
    } catch (error) {
      console.error(`Error toggling DC output:`, error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
        error
      };
    }
  }

  /**
   * Get Delta device quotas
   * @param serialNumber Device serial number
   * @param deviceType Device type (e.g., "DELTA MAX", "DELTA PRO")
   * @returns Delta device quotas
   */
  async getDeltaQuotas(serialNumber: string, deviceType: string): Promise<Record<string, any> | ApiErrorResponse> {
    try {
      console.log(`Fetching Delta quotas for device: ${serialNumber} (${deviceType})`);
      
      // Different Delta models may use different quota prefixes
      let prefix = "";
      
      if (deviceType.includes("DELTA PRO ULTRA")) {
        prefix = "hs_yj751_";
      } else if (deviceType.includes("DELTA PRO 3")) {
        prefix = "9_1.";
      } else if (deviceType.includes("DELTA 2 MAX")) {
        prefix = "";
      } else {
        // Default for most Delta models
        prefix = "";
      }
      
      // Common quotas for all Delta devices
      const commonQuotas = [
        "soc",
        "remainTime",
        "wattsOutSum",
        "wattsInSum",
        "chgPowerAC",
        "chgPowerDC",
        "typecCur",
        "typecVolt",
        "typecWatts",
        "carCur",
        "carVolt",
        "carWatts",
        "acFreq",
        "acVolt",
        "acWatts",
        "invTemp",
        "batVolt",
        "batCur",
        "batTemp",
        "ambientTemp",
        "sysVer",
        "errCode",
        "warnCode"
      ];
      
      // Add prefixes to quotas if needed
      const quotas = prefix ? commonQuotas.map(quota => `${prefix}${quota}`) : commonQuotas;
      
      // Add specific quotas for AC and DC output status
      if (prefix === "hs_yj751_") {
        quotas.push("hs_yj751_inv_cfg_addr.cfgAcEnabled");
        quotas.push("hs_yj751_pd_cfg_addr.cfgDcEnabled");
      } else if (prefix === "9_1.") {
        quotas.push("9_1.cfgAcEnabled");
        quotas.push("9_1.cfgDcEnabled");
      } else {
        quotas.push("inv.cfgAcEnabled");
        quotas.push("pd.dcOutState");
      }
      
      const response = await this.getDeviceQuotas(serialNumber, quotas);
      
      console.log("Delta quotas response:", JSON.stringify(response, null, 2));
      
      if ('success' in response && !response.success) {
        return response;
      }
      
      // Process the response to remove prefixes from the keys if needed
      if (prefix && response && typeof response === 'object') {
        const processedData: Record<string, any> = {};
        
        Object.entries(response).forEach(([key, value]) => {
          // Remove the prefix from the key
          const cleanKey = key.replace(new RegExp(`^${prefix.replace('.', '\\.')}`, ''), '');
          processedData[cleanKey] = value;
        });
        
        return processedData;
      }
      
      return response;
    } catch (error) {
      console.error("Error fetching Delta quotas:", error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
        error
      };
    }
  }

  /**
   * Get additional PowerStream device information
   * @param serialNumber Device serial number
   * @returns Additional PowerStream device information
   */
  async getPowerStreamInfo(serialNumber: string): Promise<Record<string, any> | ApiErrorResponse> {
    try {
      console.log(`Fetching additional PowerStream info for device: ${serialNumber}`);
      
      // According to the Powerstream.md documentation, these are additional fields we can request
      const requestBody = {
        sn: serialNumber,
        params: {
          quotas: [
            "20_1.invErrCode",
            "20_1.pv1ErrCode",
            "20_1.pv2ErrCode",
            "20_1.batErrCode",
            "20_1.llcErrCode",
            "20_1.pv1Statue",
            "20_1.pv2Statue",
            "20_1.batStatue",
            "20_1.llcStatue",
            "20_1.invStatue",
            "20_1.pv1InputVolt",
            "20_1.pv1VolInTag",
            "20_1.pv1InputCur",
            "20_1.pv2InputVolt",
            "20_1.pv2VolInTag",
            "20_1.pv2InputCur",
            "20_1.batInputVolt",
            "20_1.batInputCur",
            "20_1.batTemp",
            "20_1.batSoc",
            "20_1.invFreq",
            "20_1.bpType",
            "20_1.installCountry",
            "20_1.installTown",
            "20_1.supplyPriority",
            "20_1.lowerLimit",
            "20_1.upperLimit",
            "20_1.invOnOff",
            "20_1.wirelessErrCode",
            "20_1.invBrightness",
            "20_1.ratedPower",
            "20_1.chgRemainTime",
            "20_1.dsgRemainTime",
            "20_1.feedProtect",
            "20_1.interfaceConnFlag",
            "20_1.wifiRssi",
            "20_1.batSystem"
          ]
        }
      };
      
      console.log("PowerStream info request:", JSON.stringify(requestBody, null, 2));
      
      // Make the request directly using the makeSignedRequest method
      const response = await this.makeSignedRequest<any>(
        "POST",
        "/iot-open/sign/device/quota",
        requestBody,
        "application/json;charset=UTF-8"
      );
      
      console.log("PowerStream info response:", JSON.stringify(response, null, 2));
      
      if (response.code !== "0") {
        console.error(`Error fetching PowerStream info: ${response.message || "Unknown error"} (Code: ${response.code})`);
        return {
          success: false,
          message: `API Error: ${response.message || "Unknown error"} (Code: ${response.code})`,
          error: response
        };
      }
      
      // Process the response to remove the "20_1." prefix from the keys
      const processedData: Record<string, any> = {};
      
      if (response.data && typeof response.data === 'object') {
        Object.entries(response.data).forEach(([key, value]) => {
          // Remove the prefix (e.g., "20_1.") from the key
          const cleanKey = key.replace(/^20_1\./, '');
          processedData[cleanKey] = value;
        });
      }
      
      return processedData;
    } catch (error) {
      console.error("Error fetching PowerStream info:", error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
        error
      };
    }
  }

  /**
   * Set PowerStream supply priority
   * @param serialNumber Device serial number
   * @param priority 0: prioritize power supply; 1: prioritize power storage
   * @returns API response
   */
  async setPowerStreamSupplyPriority(serialNumber: string, priority: number): Promise<any> {
    return this.setPowerStreamFunction(serialNumber, "WN511_SET_SUPPLY_PRIORITY_PACK", {
      supplyPriority: priority
    });
  }

  /**
   * Set PowerStream custom load power
   * @param serialNumber Device serial number
   * @param watts Power in watts (Range: 0-600W)
   * @returns API response
   */
  async setPowerStreamPermanentWatts(serialNumber: string, watts: number): Promise<any> {
    return this.setPowerStreamFunction(serialNumber, "WN511_SET_PERMANENT_WATTS_PACK", {
      permanentWatts: watts
    });
  }

  /**
   * Set PowerStream lower limit for battery discharging
   * @param serialNumber Device serial number
   * @param limit Lower limit (Range: 1-30)
   * @returns API response
   */
  async setPowerStreamLowerLimit(serialNumber: string, limit: number): Promise<any> {
    return this.setPowerStreamFunction(serialNumber, "WN511_SET_BAT_LOWER_PACK", {
      lowerLimit: limit
    });
  }

  /**
   * Set PowerStream upper limit for battery charging
   * @param serialNumber Device serial number
   * @param limit Upper limit (Range: 70-100)
   * @returns API response
   */
  async setPowerStreamUpperLimit(serialNumber: string, limit: number): Promise<any> {
    return this.setPowerStreamFunction(serialNumber, "WN511_SET_BAT_UPPER_PACK", {
      upperLimit: limit
    });
  }

  /**
   * Set PowerStream LED brightness
   * @param serialNumber Device serial number
   * @param brightness Brightness (Range: 0-1023)
   * @returns API response
   */
  async setPowerStreamBrightness(serialNumber: string, brightness: number): Promise<any> {
    return this.setPowerStreamFunction(serialNumber, "WN511_SET_BRIGHTNESS_PACK", {
      brightness
    });
  }
}

/**
 * Singleton instance of the EcoFlowAPI class
 */
export const ecoFlowAPI = new EcoFlowAPI();
