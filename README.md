# EcoFlow Raycast Extension

This extension allows you to monitor and control your EcoFlow power stations directly from Raycast.

## Features

- Add and manage your EcoFlow devices
- Monitor battery levels, charging status, and power usage
- Control PowerStream settings
- Refresh device data with a single click

## Setup

To use this extension, you need to obtain API credentials from EcoFlow:

1. Visit the [EcoFlow Developer Portal](https://developer-eu.ecoflow.com) and log in with your EcoFlow account
2. Click "Become a Developer" if you don't already have developer access
3. After your developer access is approved (usually takes a few days), you can create an Access Key and Secret Key
4. Enter these credentials in the extension preferences:
   - **Access Key**: Your EcoFlow API access key
   - **Secret Key**: Your EcoFlow API secret key

## Usage

The extension provides the following commands:

- **Add Device**: Add a new EcoFlow device by entering its serial number
- **Manage Devices**: View and manage your saved EcoFlow devices
- **PowerStream Control**: Control your PowerStream devices (currently the only fully supported device type)

## Supported Devices

Currently, the extension fully supports:
- PowerStream

Other device types can be added but may have limited functionality.

## Requesting Developer Access

To request developer access to the EcoFlow API:

1. Go to the [EcoFlow Developer Portal](https://developer-eu.ecoflow.com) and log in with your EcoFlow account
2. Click the "Become a Developer" button
3. After registering for the developer program, you'll receive access to the EcoFlow IoT platform within a few days
4. Once you have access, you can create an Access Key and Secret Key in the developer portal

## API Documentation

This extension uses the EcoFlow API as documented at:
https://developer-eu.ecoflow.com/us/document/introduction

## Troubleshooting

If you encounter issues:

1. Verify your API credentials are correct
2. Check if your devices are online
3. Ensure your internet connection is stable

## Privacy

This extension only communicates with the official EcoFlow API. Your credentials are stored securely in Raycast and are only used to authenticate with the EcoFlow API.

## License

MIT