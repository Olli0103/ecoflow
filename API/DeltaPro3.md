ModuleType definition
Field	Field's Type	Description
HTTP communication mode
Set & Get Quota
How to transfer request parameters by these two HTTP API.
PUT: /iot-open/sign/device/quota: SetCmdRequest
POST: /iot-open/sign/device/quota: GetCmdRequest, GetCmdResponse
Set Command	SetCmdRequest	GetCmdRequest	GetCmdResponse
Sets the beeper switch. (true: on, false: off.)
            
{
    "sn": "MR51ZAS2PG330026",
    "cmdId": 17,
    "dirDest": 1,
    "dirSrc": 1,
    "cmdFunc": 254,
    "dest": 2,
    "needAck": true,
    "params": {
        "cfgBeepEn": true
    }
}
            
        
            
{
    "sn": "MR51ZAS2PG330026",
    "params": {
        "quotas": [
            "enBeep"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "enBeep": true
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Sets AC timeout (min).
            
{
    "sn": "MR51ZAS2PG330026",
    "cmdId": 17,
    "dirDest": 1,
    "dirSrc": 1,
    "cmdFunc": 254,
    "dest": 2,
    "needAck": true,
    "params": {
        "cfgAcStandbyTime": 120
    }
}
            
        
            
{
    "sn": "MR51ZAS2PG330026",
    "params": {
        "quotas": [
            "acStandbyTime"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "acStandbyTime": 120
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Sets DC timeout (min).
            
{
    "sn": "MR51ZAS2PG330026",
    "cmdId": 17,
    "dirDest": 1,
    "dirSrc": 1,
    "cmdFunc": 254,
    "dest": 2,
    "needAck": true,
    "params": {
        "cfgDcStandbyTime": 120
    }
}
            
        
            
{
    "sn": "MR51ZAS2PG330026",
    "params": {
        "quotas": [
            "dcStandbyTime"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "dcStandbyTime": 120
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Sets the screen timeout (s).
            
{
    "sn": "MR51ZAS2PG330026",
    "cmdId": 17,
    "dirDest": 1,
    "dirSrc": 1,
    "cmdFunc": 254,
    "dest": 2,
    "needAck": true,
    "params": {
        "cfgScreenOffTime": 30
    }
}
            
        
            
{
    "sn": "MR51ZAS2PG330026",
    "params": {
        "quotas": [
            "screenOffTime"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "screenOffTime": 30
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Sets the device timeout (min).
            
{
    "sn": "MR51ZAS2PG330026",
    "cmdId": 17,
    "dirDest": 1,
    "dirSrc": 1,
    "cmdFunc": 254,
    "dest": 2,
    "needAck": true,
    "params": {
        "cfgDevStandbyTime": 30
    }
}
            
        
            
{
    "sn": "MR51ZAS2PG330026",
    "params": {
        "quotas": [
            "devStandbyTime"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "devStandbyTime": 30
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Sets screen brightness.
            
{
    "sn": "MR51ZAS2PG330026",
    "cmdId": 17,
    "dirDest": 1,
    "dirSrc": 1,
    "cmdFunc": 254,
    "dest": 2,
    "needAck": true,
    "params": {
        "cfgLcdLight": 30
    }
}
            
        
            
{
    "sn": "MR51ZAS2PG330026",
    "params": {
        "quotas": [
            "lcdLight"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "lcdLight": 30
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
High-voltage AC output switch.
            
{
    "sn": "MR51ZAS2PG330026",
    "cmdId": 17,
    "dirDest": 1,
    "dirSrc": 1,
    "cmdFunc": 254,
    "dest": 2,
    "needAck": true,
    "params": {
        "cfgHvAcOutOpen": true
    }
}
            
        
            
{
    "sn": "MR51ZAS2PG330026",
    "params": {
        "quotas": [
            "flowInfoAcHvOut"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "flowInfoAcHvOut": 2
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Low-voltage AC output switch.
            
{
    "sn": "MR51ZAS2PG330026",
    "cmdId": 17,
    "dirDest": 1,
    "dirSrc": 1,
    "cmdFunc": 254,
    "dest": 2,
    "needAck": true,
    "params": {
        "cfgLvAcOutOpen": true
    }
}
            
        
            
{
    "sn": "MR51ZAS2PG330026",
    "params": {
        "quotas": [
            "flowInfoAcLvOut"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "flowInfoAcLvOut": 0
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Sets the AC output frequency (50Hz/60Hz).
            
{
    "sn": "MR51ZAS2PG330026",
    "cmdId": 17,
    "dirDest": 1,
    "dirSrc": 1,
    "cmdFunc": 254,
    "dest": 2,
    "needAck": true,
    "params": {
        "cfgAcOutFreq": 50
    }
}
            
        
            
{
    "sn": "MR51ZAS2PG330026",
    "params": {
        "quotas": [
            "acOutFreq"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "acOutFreq": 50
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
12V output switch.
            
{
    "sn": "MR51ZAS2PG330026",
    "cmdId": 17,
    "dirDest": 1,
    "dirSrc": 1,
    "cmdFunc": 254,
    "dest": 2,
    "needAck": true,
    "params": {
        "cfgDc12vOutOpen": true
    }
}
            
        
            
{
    "sn": "MR51ZAS2PG330026",
    "params": {
        "quotas": [
            "flowInfo12v"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "flowInfo12v": 0
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
X-Boost switch.
            
{
    "sn": "MR51ZAS2PG330026",
    "cmdId": 17,
    "dirDest": 1,
    "dirSrc": 1,
    "cmdFunc": 254,
    "dest": 2,
    "needAck": true,
    "params": {
        "cfgXboostEn": true
    }
}
            
        
            
{
    "sn": "MR51ZAS2PG330026",
    "params": {
        "quotas": [
            "xboostEn"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "xboostEn": true
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Shuts down the device.
            
{
    "sn": "MR51ZAS2PG330026",
    "cmdId": 17,
    "dirDest": 1,
    "dirSrc": 1,
    "cmdFunc": 254,
    "dest": 2,
    "needAck": true,
    "params": {
        "cfgPowerOff": true
    }
}
            
        
Sets the charge limit.
            
{
    "sn": "MR51ZAS2PG330026",
    "cmdId": 17,
    "dirDest": 1,
    "dirSrc": 1,
    "cmdFunc": 254,
    "dest": 2,
    "needAck": true,
    "params": {
        "cfgMaxChgSoc": 70
    }
}
            
        
            
{
    "sn": "MR51ZAS2PG330026",
    "params": {
        "quotas": [
            "cmsMaxChgSoc"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "cmsMaxChgSoc": 75
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Sets the discharge limit.
            
{
    "sn": "MR51ZAS2PG330026",
    "cmdId": 17,
    "dirDest": 1,
    "dirSrc": 1,
    "cmdFunc": 254,
    "dest": 2,
    "needAck": true,
    "params": {
        "cfgMinDsgSoc": 30
    }
}
            
        
            
{
    "sn": "MR51ZAS2PG330026",
    "params": {
        "quotas": [
            "cmsMinDsgSoc"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "cmsMinDsgSoc": 25
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Sets the backup reserve level.
            
{
    "sn": "MR51ZAS2PG330026",
    "cmdId": 17,
    "dirDest": 1,
    "dirSrc": 1,
    "cmdFunc": 254,
    "dest": 2,
    "needAck": true,
    "params": {
        "cfgEnergyBackup": {
            "energyBackupStartSoc": 40,
            "energyBackupEn": true
        }
    }
}
            
        
            
{
    "sn": "MR51ZAS2PG330026",
    "params": {
        "quotas": [
            "energyBackupStartSoc",
            "energyBackupEn"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "energyBackupStartSoc": 40,
        "energyBackupEn": true
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Sets the maximum input current of the low-voltage PV port.
            
{
    "sn": "MR51ZAS2PG330026",
    "cmdId": 17,
    "dirDest": 1,
    "dirSrc": 1,
    "cmdFunc": 254,
    "dest": 2,
    "needAck": true,
    "params": {
        "cfgPlugInInfoPvLDcAmpMax": 7
    }
}
            
        
            
{
    "sn": "MR51ZAS2PG330026",
    "params": {
        "quotas": [
            "plugInInfoPvLDcAmpMax"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "plugInInfoPvLDcAmpMax": 7
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Sets the maximum input current of the high-voltage PV port.
            
{
    "sn": "MR51ZAS2PG330026",
    "cmdId": 17,
    "dirDest": 1,
    "dirSrc": 1,
    "cmdFunc": 254,
    "dest": 2,
    "needAck": true,
    "params": {
        "cfgPlugInInfoPvHDcAmpMax": 12
    }
}
            
        
            
{
    "sn": "MR51ZAS2PG330026",
    "params": {
        "quotas": [
            "plugInInfoPvHDcAmpMax"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "plugInInfoPvHDcAmpMax": 11
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Sets the maximum AC charging power.
            
{
    "sn": "MR51ZAS2PG330026",
    "cmdId": 17,
    "dirDest": 1,
    "dirSrc": 1,
    "cmdFunc": 254,
    "dest": 2,
    "needAck": true,
    "params": {
        "cfgPlugInInfoAcInChgPowMax": 3000
    }
}
            
        
            
{
    "sn": "MR51ZAS2PG330026",
    "params": {
        "quotas": [
            "plugInInfoAcInChgPowMax "
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "plugInInfoAcInChgPowMax ": 7
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Maximum charging power of the Power In/Out port.
            
{
    "sn": "MR51ZAS2PG330026",
    "cmdId": 17,
    "dirDest": 1,
    "dirSrc": 1,
    "cmdFunc": 254,
    "dest": 2,
    "needAck": true,
    "params": {
        "cfgPlugInInfo5p8ChgPowMax": 1800
    }
}
            
        
            
{
    "sn": "MR51ZAS2PG330026",
    "params": {
        "quotas": [
            "plugInInfo5p8ChgPowMax"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "plugInInfo5p8ChgPowMax": 11
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Smart Generator auto start/stop switch.
            
{
    "sn": "MR51ZAS2PG330026",
    "cmdId": 17,
    "dirDest": 1,
    "dirSrc": 1,
    "cmdFunc": 254,
    "dest": 2,
    "needAck": true,
    "params": {
        "cfgCmsOilSelfStart": true
    }
}
            
        
            
{
    "sn": "MR51ZAS2PG330026",
    "params": {
        "quotas": [
            "cmsOilSelfStart"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "cmsOilSelfStart": true
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Sets the SOC that automatically starts the Smart Generator.
            
{
    "sn": "MR51ZAS2PG330026",
    "cmdId": 17,
    "dirDest": 1,
    "dirSrc": 1,
    "cmdFunc": 254,
    "dest": 2,
    "needAck": true,
    "params": {
        "cfgCmsOilOnSoc": 36
    }
}
            
        
            
{
    "sn": "MR51ZAS2PG330026",
    "params": {
        "quotas": [
            "cmsOilOnSoc"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "cmsOilOnSoc": 36
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Sets the SOC that automatically stops the Smart Generator.
            
{
    "sn": "MR51ZAS2PG330026",
    "cmdId": 17,
    "dirDest": 1,
    "dirSrc": 1,
    "cmdFunc": 254,
    "dest": 2,
    "needAck": true,
    "params": {
        "cfgCmsOilOffSoc": 67
    }
}
            
        
            
{
    "sn": "MR51ZAS2PG330026",
    "params": {
        "quotas": [
            "cmsOilOffSoc"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "cmsOilOffSoc": 67
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
GFCI switch.
            
{
    "sn": "MR51ZAS2PG330026",
    "cmdId": 17,
    "dirDest": 1,
    "dirSrc": 1,
    "cmdFunc": 254,
    "dest": 2,
    "needAck": true,
    "params": {
        "cfgLlcGFCIFlag": true
    }
}
            
        
            
{
    "sn": "MR51ZAS2PG330026",
    "params": {
        "quotas": [
            "llcGFCIFlag"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "llcGFCIFlag": false
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Sets Bluetooth timeout.
            
{
    "sn": "MR51ZAS2PG330026",
    "cmdId": 17,
    "dirDest": 1,
    "dirSrc": 1,
    "cmdFunc": 254,
    "dest": 2,
    "needAck": true,
    "params": {
        "cfgBleStandbyTime": 200
    }
}
            
        
            
{
    "sn": "MR51ZAS2PG330026",
    "params": {
        "quotas": [
            "bleStandbyTime"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "bleStandbyTime": 200
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
AC energy-saving mode switch.
            
{
    "sn": "MR51ZAS2PG330026",
    "cmdId": 17,
    "dirDest": 1,
    "dirSrc": 1,
    "cmdFunc": 254,
    "dest": 2,
    "needAck": true,
    "params": {
        "cfgAcEnergySavingOpen": true
    }
}
            
        
            
{
    "sn": "MR51ZAS2PG330026",
    "params": {
        "quotas": [
            "acEnergySavingOpen"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "acEnergySavingOpen": false
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Battery charging/discharging order.0: default1: The device will automatically decide the charge and discharge order based on each battery's voltage.2: The main battery is prioritized during charging, and extra batteries are prioritized during discharging.
            
{
    "sn": "MR51ZAS2PG330026",
    "cmdId": 17,
    "dirDest": 1,
    "dirSrc": 1,
    "cmdFunc": 254,
    "dest": 2,
    "needAck": true,
    "params": {
        "cfgMultiBpChgDsgMode": 1
    }
}
            
        
            
{
    "sn": "MR51ZAS2PG330026",
    "params": {
        "quotas": [
            "multiBpChgDsgMode"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "multiBpChgDsgMode": 1
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
GetAllQuotaResponse
How to transfer request parameters by this HTTP API.
GET: /iot-open/sign/device/quota/all: GetAllQuotaResponse
Field	Field's Type	Description
errcode
int
Device error code.
devSleepState
int
Sleep status.
devStandbyTime
int
Device timeout (min). 0: the device will never sleep.
dcStandbyTime
int
DC timeout (min). 0: DC output ports will never time out.
bleStandbyTime
int
Bluetooth timeout (h). 0: Bluetooth will never time out.
acStandbyTime
int
AC timeout (min). 0: AC output ports will never time out.
cmsMinDsgSoc
int
Discharge limit.
cmsChgDsgState
int
Charging/Discharging status. 0: not charging or discharging, 1: discharging, 2: charging.
cmsBmsRunState
int
On/Off status. 0: off, 1: on.
cmsBattSoc
float
Overall SOC.
cmsMaxChgSoc
int
Charge limit.
cmsChgRemTime
int
Remaining charging time (min).
cmsOilSelfStart
bool
Smart Generator auto start/stop switch.
cmsOilOffSoc
int
SOC for automatically stopping the Smart Generator.
cmsDsgRemTime
int
Remaining discharging time (min).
cmsOilOnSoc
int
SOC for automatically stopping the Smart Generator.
bmsChgRemTime
int
Remaining charging time of the main battery (min).
bmsDesignCap
int
Battery capacity (mAh).
bmsMaxCellTemp
int
Temperature of the main battery (°C).
bmsBattSoc
float
SOC of the main battery.
bmsChgDsgState
int
Charging/Discharging status of the main battery. 0: not charging/discharging, 1: discharging, 2: charging.
bmsMinCellTemp
int
Minimum temperature of the main battery (°C).
bmsDsgRemTime
int
Remaining discharging time (min).
powInSumW
float
Total input power (W).
powOutSumW
float
Total output power (W).
powGetAcHvOut
float
Real-time grid power (W).
powGetAc
float
Real-time AC power (W).
powGetTypec1
float
Real-time power of Type-C port 1 (W).
powGetTypec2
float
Real-time power of Type-C port 2 (W).
powGet12v
float
Real-time 12V power (W).
powGet24v
float
Real-time 24V power (W).
powGetAcLvOut
float
Real-time low-voltage AC output power (W).
powGet5p8
float
Real-time power of the Power In/Out port (W).
powGetQcusb1
float
Real-time power of the USB 1 port (W).
powGetQcusb2
float
Real-time power of the USB 2 port (W).
powGet4p81
float
Real-time power of Extra Battery Port 1 (W).
powGet4p82
float
Real-time power of Extra Battery Port 2 (W).
powGetAcLvTt30Out
float
Real-time power of the low-voltage AC output port (W).
powGetPvH
float
Real-time high-voltage PV power (W).
powGetAcIn
float
Real-time AC input power (W).
powGetPvL
float
Real-time low-voltage PV power (W).
plugInInfoAcInChgHalPowMax
int
Maximum AC charging power.
plugInInfoPvHChargerFlag
bool
PV connection status. 0: disconnected, 1: connected.
plugInInfo4p82InFlag
int
Indicates whether the Extra Battery port is connected. 0: disconnected, 1: connected.
plugInInfoPvLChgAmpMax
int
Maximum charging current of the PV port.
plugInInfoAcInFeq
int
AC input frequency.
plugInInfoPvLType
int
PV port charging mode. 1: car charging, 2: solar charging, 3: DC charging.
plugInInfo5p8RunState
int
Operating status of the device connected to the Power In/Out port.
plugInInfo4p82RunState
int
Operating status of the device connected to Extra Battery Port 2.
plugInInfo4p81ChargerFlag
bool
Identifier of charger connection to Extra Battery Port 1. 0: disconnected, 1: connected.
plugInInfo5p8ChgHalPowMax
int
Operating status of the device connected to the Power In/Out port.
plugInInfoPvHChgAmpMax
int
Maximum charging current of the high-voltage PV port (A).
plugInInfo5p8DsgPowMax
int
Maximum discharging power of the Power In/Out port.
plugInInfoAcInChgPowMax
int
Maximum AC charging power (W).
plugInInfoPvHType
int
High-voltage PV port charging mode. 1: car charging, 2: solar charging, 3: DC charging.
plugInInfo5p8ChargerFlag
bool
Operating status of the device connected to the Power In/Out port.
plugInInfoAcInFlag
int
Indicates whether the AC charging port is connected. 0: disconnected, 1: connected.
plugInInfo4p81DsgChgType
int
Charging/Discharging type of Extra Battery Port 1. 0: reserved, 1: charging/discharging, 2: charging only, 3: discharging only.
plugInInfoAcChargerFlag
bool
Indicates whether the charger is connected to the AC port. 0: disconnected, 1: connected.
plugInInfoPvHFlag
int
Indicates whether the high-voltage PV port is connected. 0: disconnected, 1: connected.
plugInInfo4p81Sn
string
SN of the device connected to the Extra Battery port.
plugInInfo4p82DsgChgType
int
Charging/Discharging type of Extra Battery Port 2. 1: charging/discharging, 2: charging only, 3: discharging only.
plugInInfoPvHDcAmpMax
int
Maximum DC input current of the high-voltage PV port (A).
plugInInfo4p81InFlag
int
Indicates whether Extra Battery Port 1 is connected. 0: disconnected, 1: connected.
plugInInfo4p82ChargerFlag
bool
Identifier of charger connection to Extra Battery Port 2. 0: disconnected, 1: connected.
plugInInfoPvLChgVolMax
int
Maximum charging voltage of the low-voltage PV port (V).
plugInInfoPvLDcAmpMax
int
Maximum DC input current of the low-voltage PV port (A).
plugInInfo5p8Flag
int
Indicates whether the Power In/Out port is connected. 0: disconnected, 1: connected.
plugInInfoAcOutDsgPowMax
int
Maximum AC discharging power.
plugInInfo5p8Sn
string
SN of the device connected to the Power In/Out port.
plugInInfoPvLChargerFlag
bool
Identifier of charger connection to the low-voltage PV port. 0: disconnected, 1: connected.
plugInInfo4p82Sn
string
SN of the ecosystem product connected to Extra Battery Port 2.
plugInInfo5p8ChgPowMax
int
Maximum charging power of the Power In/Out port.
plugInInfoPvLFlag
int
Indicates whether the low-voltage PV port is connected. 0: disconnected, 1: connected.
plugInInfo4p81RunState
int
Operating status of the device connected to Extra Battery Port 1.
plugInInfoPvHChgVolMax
int
Maximum charging voltage of the high-voltage PV port (V).
plugInInfo5p8DsgChg
int
Charging/Discharging type of the Power In/Out port.
flowInfoPvL
int
Low-voltage PV switch status. (0: off, 2: on.)
flowInfoPvH
int
High-voltage PV switch status. (0: off, 2: on.)
flowInfoTypec1
int
Type-C port 1 switch status. (0: off, 2: on.)
flowInfoTypec2
int
Type-C port 2 switch status. (0: off, 2: on.)
flowInfoAcLvOut
int
AC low-voltage output switch status. (0: off, 2: on.)
flowInfo4p82Out
int
Extra Battery port output switch status. (0: off, 2: on.)
flowInfoAcIn
int
AC input switch status. (0: off, 2: on.)
flowInfoAcHvOut
int
High-voltage AC output switch status. (0: off, 2: on.)
flowInfo12v
int
12V output switch status. (0: off, 2: on.)
flowInfo24v
int
24V output switch status. (0: off, 2: on.)
flowInfo4p81In
int
Extra Battery Port 1 input switch status. (0: off, 2: on.)
flowInfoQcusb1
int
USB output port 1 switch status. (0: off, 2: on.)
flowInfoQcusb2
int
USB output port 2 switch status. (0: off, 2: on.)
flowInfo4p82In
int
Extra Battery Port 2 input switch status. (0: off, 2: on.)
flowInfo5p8In
int
Power In/Out port switch status. (0: off, 2: on.)
flowInfo4p81Out
int
Extra Battery Port 1 switch status. (0: off, 2: on.)
flowInfo5p8Out
int
Power In/Out port switch status. (0: off, 2: on.)
acEnergySavingOpen
bool
AC energy-saving mode switch. 0: off, 1: on.
multiBpChgDsgMode
int
Battery charging/discharging order.0: default1: The device will automatically decide the charge and discharge order based on each battery's voltage.2: The main battery is prioritized during charging, and extra batteries are prioritized during discharging.
fastChargeSwitch
int
Fast charging slider switch. 0: fast charging; 1: custom charging power.
lcdLight
int
Screen brightness.
energyBackupEn
bool
Backup reserve function switch. 0: off, 1: on.
acOutFreq
int
AC output frequency.
xboostEn
bool
X-Boost switch. 0: off, 1: on.
llcHvLvFlag
int
High-voltage/Low-voltage AC identifier.
llcGFCIFlag
bool
GFCI switch.
acLvAlwaysOn
bool
AC Always-on.
screenOffTime
int
Screen timeout (s). 0: The screen will never time out. Other values: using the value you set (unit: s).
energyBackupStartSoc
int
Backup reserve level.
acHvAlwaysOn
bool
Sets the High-voltage AC Always-on function. 0: off. 1: on.
acAlwaysOnMiniSoc
int
Sets the minimum SOC to enable the AC Always-on function.
enBeep
bool
Indicates whether the beeper is turned on. 0: off, 1: on.
generatorPvHybridModeOpen
bool
Generator and solar energy hybrid mode. 0: off, 1: on.
generatorCareModeOpen
bool
Night care mode switch. 0: off, 1: on.
generatorPvHybridModeSocMax
int
Maximum SOC in the generator and solar energy hybrid mode
MQTT communication mode
Set & Set Reply
Usage of Topic	Topic	From	To
Set device function
/open/${certificateAccount}/${sn}/set
app
device
Reply to the set result
/open/${certificateAccount}/${sn}/set_reply
device
app
Full Format Example
Set Data Format	Set Reply Data Format
ParamInfo Message Format
Set Command	SetTopic's ParamInfo	SetReplyTopic's ParamInfo
Beeper on/off. (true: on, false: off.)
            
{
    "sn": "MR51ZAS2PG330026",
    "cmdId": 17,
    "id": 12334345,
    "version": "1.0",
    "dirDest": 1,
    "dirSrc": 1,
    "cmdFunc": 254,
    "dest": 2,
    "needAck": true,
    "params": {
        "cfgBeepEn": true
    }
}
            
        
            
{
    "data": {
        "cfgBeepEn": true,
        "configOk": true,
        "actionId": 9
    },
    "id": 12334345
}
            
        
AC timeout (min).
            
{
    "sn": "MR51ZAS2PG330026",
    "cmdId": 17,
    "id": 123123,
    "version": "1.0",
    "dirDest": 1,
    "dirSrc": 1,
    "cmdFunc": 254,
    "dest": 2,
    "needAck": true,
    "params": {
        "cfgAcStandbyTime": 120
    }
}
            
        
            
{
    "data": {
        "cfgAcStandbyTime": 120,
        "configOk": true,
        "actionId": 10
    },
    "id": 123123
}
            
        
DC timeout (min).
            
{
    "sn": "MR51ZAS2PG330026",
    "cmdId": 17,
    "id": 123123,
    "version": "1.0",
    "dirDest": 1,
    "dirSrc": 1,
    "cmdFunc": 254,
    "dest": 2,
    "needAck": true,
    "params": {
        "cfgDcStandbyTime": 60
    }
}
            
        
            
{
    "data": {
        "configOk": true,
        "actionId": 11,
        "cfgDcStandbyTime": 60
    },
    "id": 123123
}
            
        
Screen timeout (s).
            
{
    "sn": "MR51ZAS2PG330026",
    "cmdId": 17,
    "id": 123123,
    "version": "1.0",
    "dirDest": 1,
    "dirSrc": 1,
    "cmdFunc": 254,
    "dest": 2,
    "needAck": true,
    "params": {
        "cfgScreenOffTime": 30
    }
}
            
        
            
{
    "data": {
        "configOk": true,
        "actionId": 12,
        "cfgScreenOffTime": 30
    },
    "id": 123123
}
            
        
Device timeout (min).
            
{
    "sn": "MR51ZAS2PG330026",
    "id": 123123,
    "version": "1.0",
    "cmdId": 17,
    "dirDest": 1,
    "dirSrc": 1,
    "cmdFunc": 254,
    "dest": 2,
    "needAck": true,
    "params": {
        "cfgDevStandbyTime": 60
    }
}
            
        
            
{
    "data": {
        "cfgDevStandbyTime": 60,
        "configOk": true,
        "actionId": 13
    },
    "id": 123123
}
            
        
Screen brightness.
            
{
    "sn": "MR51ZAS2PG330026",
    "id": 12313,
    "version": "1.0",
    "cmdId": 17,
    "dirDest": 1,
    "dirSrc": 1,
    "cmdFunc": 254,
    "dest": 2,
    "needAck": true,
    "params": {
        "cfgLcdLight": 30
    }
}
            
        
            
{
    "data": {
        "cfgLcdLight": 30,
        "configOk": true,
        "actionId": 14
    },
    "id": 12313
}
            
        
Sets the high-voltage AC output switch.
            
{
    "sn": "MR51ZAS2PG330026",
    "id": 12313,
    "version": "1.0",
    "cmdId": 17,
    "dirDest": 1,
    "dirSrc": 1,
    "cmdFunc": 254,
    "dest": 2,
    "needAck": true,
    "params": {
        "cfgHvAcOutOpen": true
    }
}
            
        
            
{
    "data": {
        "cfgHvAcOutOpen": true,
        "configOk": true,
        "actionId": 15
    },
    "id": 12313
}
            
        
Sets the low-voltage AC output switch.
            
{
    "sn": "MR51ZAS2PG330026",
    "id": 123123,
    "version": "1.0",
    "cmdId": 17,
    "dirDest": 1,
    "dirSrc": 1,
    "cmdFunc": 254,
    "dest": 2,
    "needAck": true,
    "params": {
        "cfgLvAcOutOpen": true
    }
}
            
        
            
{
    "data": {
        "cfgLvAcOutOpen": true,
        "configOk": true,
        "actionId": 16
    },
    "id": 123123
}
            
        
Sets the 12V output switch.
            
{
    "sn": "MR51ZAS2PG330026",
    "id": 123123,
    "version": "1,0",
    "cmdId": 17,
    "dirDest": 1,
    "dirSrc": 1,
    "cmdFunc": 254,
    "dest": 2,
    "needAck": true,
    "params": {
        "cfgDc12vOutOpen": true
    }
}
            
        
            
{
    "data": {
        "cfgDc12vOutOpen": true,
        "configOk": true,
        "actionId": 18
    },
    "id": 123123
}
            
        
X-Boost switch.
            
{
    "sn": "MR51ZAS2PG330026",
    "id": 123113,
    "version": "1.0",
    "cmdId": 17,
    "dirDest": 1,
    "dirSrc": 1,
    "cmdFunc": 254,
    "dest": 2,
    "needAck": true,
    "params": {
        "cfgXboostEn": true
    }
}
            
        
            
{
    "data": {
        "configOk": true,
        "actionId": 25,
        "cfgXboostEn": true
    },
    "id": 123113
}
            
        
Shuts down the entire device.
            
{
    "sn": "MR51ZAS2PG330026",
    "id": 123123,
    "version": "1.0",
    "cmdId": 17,
    "dirDest": 1,
    "dirSrc": 1,
    "cmdFunc": 254,
    "dest": 2,
    "needAck": true,
    "params": {
        "cfgPowerOff": true
    }
}
            
        
            
{
    "data": {
        "cfgPowerOff": true,
        "configOk": true,
        "actionId": 3
    },
    "id": 123123
}
            
        
Charge limit.
            
{
    "sn": "MR51ZAS2PG330026",
    "id": 123123,
    "version": "1.0",
    "cmdId": 17,
    "dirDest": 1,
    "dirSrc": 1,
    "cmdFunc": 254,
    "dest": 2,
    "needAck": true,
    "params": {
        "cfgMaxChgSoc": 70
    }
}
            
        
            
{
    "data": {
        "configOk": true,
        "cfgMaxChgSoc": 70,
        "actionId": 33
    },
    "id": 123123
}
            
        
Discharge limit.
            
{
    "sn": "MR51ZAS2PG330026",
    "id": 123123,
    "version": "1.0",
    "cmdId": 17,
    "dirDest": 1,
    "dirSrc": 1,
    "cmdFunc": 254,
    "dest": 2,
    "needAck": true,
    "params": {
        "cfgMinDsgSoc": 30
    }
}
            
        
            
{
    "data": {
        "configOk": true,
        "cfgMinDsgSoc": 30,
        "actionId": 34
    },
    "id": 123123
}
            
        
Maximum input current of the low-voltage PV port.
            
{
    "sn": "MR51ZAS2PG330026",
    "id": 1231231,
    "version": "1.0",
    "cmdId": 17,
    "dirDest": 1,
    "dirSrc": 1,
    "cmdFunc": 254,
    "dest": 2,
    "needAck": true,
    "params": {
        "cfgPlugInInfoPvLDcAmpMax": 7
    }
}
            
        
            
{
    "data": {
        "cfgPlugInInfoPvLDcAmpMax": 0,
        "configOk": true,
        "actionId": 52
    },
    "id": 1231231
}
            
        
Maximum input current of the high-voltage PV port.
            
{
    "sn": "MR51ZAS2PG330026",
    "id": 123123,
    "version": "1.0",
    "cmdId": 17,
    "dirDest": 1,
    "dirSrc": 1,
    "cmdFunc": 254,
    "dest": 2,
    "needAck": true,
    "params": {
        "cfgPlugInInfoPvHDcAmpMax": 12
    }
}
            
        
            
{
    "data": {
        "cfgPlugInInfoPvHDcAmpMax": 0,
        "configOk": true,
        "actionId": 53
    },
    "id": 123123
}
            
        
Maximum AC input power for charging.
            
{
    "sn": "MR51ZAS2PG330026",
    "id": 1231213,
    "version": "1.0",
    "cmdId": 17,
    "dirDest": 1,
    "dirSrc": 1,
    "cmdFunc": 254,
    "dest": 2,
    "needAck": true,
    "params": {
        "cfgPlugInInfoAcInChgPowMax": 3000
    }
}
            
        
            
{
    "data": {
        "cfgPlugInInfoAcInChgPowMax": 3000,
        "configOk": true,
        "actionId": 54
    },
    "id": 1231213
}
            
        
Maximum charging power of the Power In/Out port.
            
{
    "sn": "MR51ZAS2PG330026",
    "id": 1123,
    "version": "1.0",
    "cmdId": 17,
    "dirDest": 1,
    "dirSrc": 1,
    "cmdFunc": 254,
    "dest": 2,
    "needAck": true,
    "params": {
        "cfgPlugInInfo5p8ChgPowMax": 1800
    }
}
            
        
            
{
    "data": {
        "cfgPlugInInfo5p8ChgPowMax": 1800,
        "configOk": true,
        "actionId": 56
    },
    "id": 1123
}
            
        
Smart Generator auto start/stop switch.
            
{
    "sn": "MR51ZAS2PG330026",
    "id": 123123,
    "version": "1.0",
    "cmdId": 17,
    "dirDest": 1,
    "dirSrc": 1,
    "cmdFunc": 254,
    "dest": 2,
    "needAck": true,
    "params": {
        "cfgCmsOilSelfStart": true
    }
}
            
        
            
{
    "data": {
        "cfgCmsOilSelfStart": true,
        "configOk": true,
        "actionId": 58
    },
    "id": 123123
}
            
        
SOC for automatically starting the Smart Generator.
            
{
    "sn": "MR51ZAS2PG330026",
    "id": 123123,
    "version": "1.0",
    "cmdId": 17,
    "dirDest": 1,
    "dirSrc": 1,
    "cmdFunc": 254,
    "dest": 2,
    "needAck": true,
    "params": {
        "cfgCmsOilOnSoc": 36
    }
}
            
        
            
{
    "data": {
        "cfgCmsOilOnSoc": 36,
        "configOk": true,
        "actionId": 59
    },
    "id": 123123
}
            
        
SOC for automatically stopping the Smart Generator.
            
{
    "sn": "MR51ZAS2PG330026",
    "id": 123123,
    "version": "1.0",
    "cmdId": 17,
    "dirDest": 1,
    "dirSrc": 1,
    "cmdFunc": 254,
    "dest": 2,
    "needAck": true,
    "params": {
        "cfgCmsOilOffSoc": 67
    }
}
            
        
            
{
    "data": {
        "cfgCmsOilOffSoc": 0,
        "configOk": true,
        "actionId": 60
    },
    "id": 123123
}
            
        
GFCI switch.
            
{
    "sn": "MR51ZAS2PG330026",
    "id": 12123,
    "version": "1.0",
    "cmdId": 17,
    "dirDest": 1,
    "dirSrc": 1,
    "cmdFunc": 254,
    "dest": 2,
    "needAck": true,
    "params": {
        "cfgLlcGFCIFlag": true
    }
}
            
        
Sets Bluetooth timeout.
            
{
    "sn": "MR51ZAS2PG330026",
    "id": 1231233,
    "version": "1.0",
    "cmdId": 17,
    "dirDest": 1,
    "dirSrc": 1,
    "cmdFunc": 254,
    "dest": 2,
    "needAck": true,
    "params": {
        "cfgBleStandbyTime": 200
    }
}
            
        
AC energy-saving mode switch.
            
{
    "sn": "MR51ZAS2PG330026",
    "id": 12132,
    "version": "1.0",
    "cmdId": 17,
    "dirDest": 1,
    "dirSrc": 1,
    "cmdFunc": 254,
    "dest": 2,
    "needAck": true,
    "params": {
        "cfgAcEnergySavingOpen": true
    }
}
            
        
            
{
    "data": {
        "configOk": true,
        "actionId": 99,
        "cfgAcEnergySavingOpen": true
    },
    "id": 12132
}
            
        
Battery charging/discharging order
            
{
    "sn": "MR51ZAS2PG330026",
    "id": 123123,
    "version": "1.0",
    "cmdId": 17,
    "dirDest": 1,
    "dirSrc": 1,
    "cmdFunc": 254,
    "dest": 2,
    "needAck": true,
    "params": {
        "cfgMultiBpChgDsgMode": 1
    }
}
            
        
            
{
    "data": {
        "configOk": true,
        "cfgMultiBpChgDsgMode": 1,
        "actionId": 100
    },
    "id": 123123
}
            
        
Report Device Quota
Usage of Topic	Topic	From	To
Report device quota
/open/${certificateAccount}/${sn}/quota
device
app
Please see HTTP GetAllQuotaResponse and Set & Set Reply for the fields definition.
Example
{
  "id": 1479773,
  "version": "1.0",
  "time": 871405684,
  "moduleType": 1,
  "needAck": 1,
  "typeCode": "pdStatus",
  "params": {
    "fsmState": 5,
    "iceMkMode": 1,
    "flagTwoZone": 1,
    "tmpR": 845,
    "tmpL": -85,
    "tmpAver": 335,
    "iceTm": 0,
    "iceTmTag": 0,
    "err": 0,
    "doorStat": 0,
    "icePercent": 0,
    "batFlag": 0,
    ...
  }
}
Report Device status
Usage of Topic	Topic	From	To
Report Device status
/open/${certificateAccount}/${sn}/status
device
app
Message Format
{
  "id":"123456789",
  "version":"1.0",
  "timestamp": 1634841971000,
  "params": {
    "status": 0
  }
}
Field
Field	Field Type	Description
status
int
Device online or not0: No, 1: Yes