# EcoFlow for Raycast

![EcoFlow Extension Banner](./metadata/ecoflow-banner.png)

A powerful Raycast extension to control and monitor your EcoFlow devices directly from your Mac.

## Features

### Device Management
- **Automatic Device Discovery**: Automatically sync your EcoFlow devices from the EcoFlow API
- **Manual Device Management**: Add, edit, and remove devices manually
- **Device Type Mapping**: Automatically maps API device types to the correct internal format, with manual override options

### Supported Devices

#### Power Stations
- **DELTA Series**: DELTA Pro Ultra, DELTA Pro 3, DELTA Pro, DELTA 2 Max, DELTA 2, and other DELTA models

#### Other Devices
- **PowerStream**: Full control of your PowerStream microinverter
- **Smart Plug**: Control your EcoFlow Smart Plugs
- **Additional Devices**: Support for Smart Home Panel, Wave Air Conditioner, Glacier, Power Kits, and PowerOcean

### Device Control

#### DELTA Power Stations
- **Real-time Monitoring**: View battery level, input/output power, and remaining time
- **Power Control**: Toggle AC and DC outputs
- **Detailed Information**: Access comprehensive device information including temperatures, cycle count, and more
- **Quick and Detailed Views**: Choose between a simplified view for quick actions or a detailed view for complete information

#### PowerStream
- **Power Flow Monitoring**: View real-time power flow between solar panels, battery, and grid
- **Settings Control**: Adjust power supply priority, custom load power, battery limits, and more
- **LED Brightness**: Control the LED brightness of your PowerStream
- **Feed-in Control**: Enable or disable feed-in control

#### Smart Plug
- **Power Control**: Turn your Smart Plug on or off
- **Power Monitoring**: View real-time power consumption

## Installation

### Requirements
- [Raycast](https://raycast.com/) installed on your Mac
- An EcoFlow account with registered devices
- EcoFlow Developer API keys (see below)

### Installation Steps
1. Open Raycast
2. Search for "Store" and open the Raycast Store
3. Search for "EcoFlow"
4. Click "Install"

### Obtaining EcoFlow Developer API Keys
To use this extension, you need to obtain API keys from the EcoFlow Developer Platform:

1. Visit the [EcoFlow Developer Platform](https://developer.ecoflow.com/)
2. Create an account or log in with your existing EcoFlow account
3. Navigate to the "Applications" section
4. Click "Create New Application"
5. Fill in the required information for your application
6. Once approved, you will receive an Access Key and Secret Key
7. Enter these keys in the extension preferences in Raycast

### Setting Up API Keys in Raycast
1. Open Raycast
2. Search for "EcoFlow: Manage Devices"
3. When prompted, enter your Access Key and Secret Key
4. Alternatively, you can set these keys in Raycast Preferences:
   - Open Raycast Preferences
   - Go to Extensions
   - Find "EcoFlow"
   - Enter your Access Key and Secret Key in the respective fields

## Usage

### Managing Devices
1. Open Raycast and search for "EcoFlow: Manage Devices"
2. Use the "Sync Devices from API" action to automatically add your devices
3. Alternatively, use "Add Device" to manually add a device

### Controlling Devices
1. Open Raycast and search for the specific device control command:
   - "EcoFlow: Delta Control" for DELTA and RIVER power stations
   - "EcoFlow: PowerStream Control" for PowerStream devices
   - "EcoFlow: Smart Plug Control" for Smart Plugs
2. Select your device from the list
3. Use the available actions to control and monitor your device

### Keyboard Shortcuts
- `Cmd+R`: Refresh device data
- `Cmd+S`: Sync devices from API
- `Cmd+N`: Add a new device
- `Cmd+E`: Edit device type
- `Cmd+Backspace`: Remove device

## Advanced Features

### Device Type Mapping
The extension automatically maps device types from the EcoFlow API to the correct internal format. If a device is not correctly recognized, you can manually edit its type:

1. Select a device in the "Manage Devices" view
2. Press `Cmd+E` or use the "Edit Device Type" action
3. Select the correct device type from the dropdown
4. Click "Update Device Type"

### Debug Mode
Enable debug mode to see additional information about API responses and device mapping:

1. Open "Manage Devices"
2. Open the "Preferences" submenu
3. Select "Enable Debug Mode"

### Auto-Sync
The extension can automatically sync your devices from the EcoFlow API when it starts:

1. Open "Manage Devices"
2. Open the "Preferences" submenu
3. Toggle "Enable Auto-Sync" or "Disable Auto-Sync"

## Troubleshooting

### Device Not Found
If your device is not found when syncing from the API:
1. Make sure your device is registered in the EcoFlow app
2. Try refreshing the device list with `Cmd+R`
3. Add the device manually if it still doesn't appear

### Device Offline
If your device shows as offline:
1. Check that your device is powered on and connected to the internet
2. Verify that the device is online in the EcoFlow app
3. Try refreshing the device data with `Cmd+R`

### Incorrect Device Type
If your device is showing the wrong type:
1. Use the "Edit Device Type" action to manually set the correct type
2. If the correct type is not available, please open an issue on GitHub

### API Key Issues
If you're experiencing issues with your API keys:
1. Verify that you've entered the correct Access Key and Secret Key
2. Check that your developer application is still active on the EcoFlow Developer Platform
3. Try regenerating your keys on the EcoFlow Developer Platform if necessary

## Privacy

This extension communicates directly with the EcoFlow API using your account credentials. No data is sent to third parties.

## Feedback and Contributions

If you encounter any issues or have suggestions for improvements, please open an issue on the [GitHub repository](https://github.com/yourusername/raycast-ecoflow).

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Credits

- [Raycast](https://raycast.com/) for the amazing platform
- [EcoFlow](https://www.ecoflow.com/) for their innovative power solutions