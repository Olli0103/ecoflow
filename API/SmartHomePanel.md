ModuleType definition
Field	Field Type	Description
HTTP communication mode
Set & Get Quota
How to transfer request parameters using these two HTTP APIs.
PUT: /iot-open/sign/device/quota: SetCmdRequest
GET: /iot-open/sign/device/quota: GetCmdRequest, GetCmdResponse
Set Command	SetCmdRequest	GetCmdRequest	GetCmdResponse
RTC time update
            
{
    "sn": "SP10ZAW5ZE9E0052",
    "operateType": "TCP",
    "params": {
        "cmdSet": 11,
        "id": 3,
        "week": 2,
        "sec": 17,
        "min": 38,
        "hour": 18,
        "day": 16,
        "month": 11,
        "year": 2022
    }
}
            
        
            
{
    "sn": "SP10ZAW5ZE9E0052",
    "params": {
        "quotas": [
            "heartbeat.time"
        ]
    }
}
            
        
Load channel control
            
{
    "sn": "SP10ZAW5ZE9E0052",
    "operateType": "TCP",
    "params": {
        "cmdSet": 11,
        "id": 16,
        "ch": 1,
        "ctrlMode": 1,
        "sta": 1
    }
}
            
        
            
{
    "sn": "SP10ZAW5ZE9E0052",
    "params": {
        "quotas": [
            "loadChInfo"
        ]
    }
}
            
        
Standby channel control
            
{
    "sn": "SP10ZAW5ZE9E0052",
    "operateType": "TCP",
    "params": {
        "cmdSet": 11,
        "id": 17,
        "ch": 10,
        "ctrlMode": 1,
        "sta": 1
    }
}
            
        
Split-phase information configuration
            
{
    "sn": "SP10ZAW5ZE9E0052",
    "operateType": "TCP",
    "params": {
        "cmdSet": 11,
        "id": 18,
        "cfgList": [
            {
                "linkMark": 1,
                "linkCh": 0
            },
            {
                "linkMark": 0,
                "linkCh": 0
            },
            {
                "linkMark": 0,
                "linkCh": 0
            },
            {
                "linkMark": 0,
                "linkCh": 0
            },
            {
                "linkMark": 0,
                "linkCh": 0
            },
            {
                "linkMark": 0,
                "linkCh": 0
            },
            {
                "linkMark": 0,
                "linkCh": 0
            },
            {
                "linkMark": 0,
                "linkCh": 0
            },
            {
                "linkMark": 0,
                "linkCh": 0
            },
            {
                "linkMark": 0,
                "linkCh": 0
            }
        ]
    }
}
            
        
            
{
    "sn": "SP10ZAW5ZE9E0052",
    "params": {
        "quotas": [
            "splitPhaseInfo.cur",
            "splitPhaseInfo.cfgList",
            "splitPhaseInfo.cmdSet",
            "splitPhaseInfo.id"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "splitPhaseInfo.id": 19,
        "splitPhaseInfo.cmdSet": 11,
        "splitPhaseInfo.cfgList": [
            {
                "linkMark": 1,
                "linkCh": 0
            },
            {
                "linkMark": 0,
                "linkCh": 0
            },
            {
                "linkMark": 0,
                "linkCh": 0
            },
            {
                "linkMark": 0,
                "linkCh": 0
            },
            {
                "linkMark": 0,
                "linkCh": 0
            },
            {
                "linkMark": 0,
                "linkCh": 0
            },
            {
                "linkMark": 0,
                "linkCh": 0
            },
            {
                "linkMark": 0,
                "linkCh": 0
            },
            {
                "linkMark": 0,
                "linkCh": 0
            },
            {
                "linkMark": 0,
                "linkCh": 0
            }
        ]
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Channel current configuration (cur: 6, 13, 16, 20, 30)
            
{
    "sn": "SP10ZAW5ZE9E0052",
    "operateType": "TCP",
    "params": {
        "cmdSet": 11,
        "id": 20,
        "chNum": 0,
        "cur": 6
    }
}
            
        
            
{
    "sn": "SP10ZAW5ZE9E0052",
    "params": {
        "quotas": [
            "loadChCurInfo.cur",
            "loadChCurInfo.cmdSet",
            "loadChCurInfo.id"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "loadChCurInfo.cur": [
            6,
            15,
            20,
            30,
            20,
            20,
            20,
            20,
            20,
            20,
            16,
            16
        ],
        "loadChCurInfo.cmdSet": 11,
        "loadChCurInfo.id": 21
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Grid power parameter configuration (gridVol: 220 230 240)
            
{
    "sn": "SP10ZAW5ZE9E0052",
    "operateType": "TCP",
    "params": {
        "gridVol": 230,
        "gridFreq": 50,
        "cmdSet": 11,
        "id": 22
    }
}
            
        
            
{
    "sn": "SP10ZAW5ZE9E0052",
    "params": {
        "quotas": [
            "gridInfo.gridVol",
            "gridInfo.gridFreq",
            "gridInfo.cmdSet",
            "gridInfo.id"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "gridInfo.cmdSet": 11,
        "gridInfo.gridFreq": 60,
        "gridInfo.gridVol": 120,
        "gridInfo.id": 23
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
EPS mode configuration (eps: 0: off, 1: on)
            
{
    "sn": "SP10ZAW5ZE9E0052",
    "operateType": "TCP",
    "params": {
        "cmdSet": 11,
        "id": 24,
        "eps": 1
    }
}
            
        
            
{
    "sn": "SP10ZAW5ZE9E0052",
    "params": {
        "quotas": [
            "epsModeInfo.eps",
            "epsModeInfo.cmdSet",
            "epsModeInfo.id"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "epsModeInfo.cmdSet": 11,
        "epsModeInfo.id": 25,
        "epsModeInfo.eps": true
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Channel enable status configuration(chNum: 0–9, isEnable, 0: off, 1: on)
            
{
    "sn": "SP10ZAW5ZE9E0052",
    "operateType": "TCP",
    "params": {
        "isEnable": 1,
        "chNum": 1,
        "cmdSet": 11,
        "id": 26
    }
}
            
        
            
{
    "sn": "SP10ZAW5ZE9E0052",
    "params": {
        "quotas": [
            "emergencyStrategy.chSta"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "emergencyStrategy.chSta": [
            {
                "priority": 0,
                "isEnable": 1
            },
            {
                "priority": 1,
                "isEnable": 1
            },
            {
                "priority": 2,
                "isEnable": 1
            },
            {
                "priority": 3,
                "isEnable": 1
            },
            {
                "priority": 4,
                "isEnable": 1
            },
            {
                "priority": 5,
                "isEnable": 1
            },
            {
                "priority": 6,
                "isEnable": 1
            },
            {
                "priority": 7,
                "isEnable": 1
            },
            {
                "priority": 8,
                "isEnable": 1
            },
            {
                "priority": 9,
                "isEnable": 1
            }
        ]
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Load channel information configuration(chNum 0~9 )
            
{
    "sn": "SP10ZAW5ZE9E0052",
    "operateType": "TCP",
    "params": {
        "cmdSet": 11,
        "id": 32,
        "chNum": 1,
        "info": {
            "chName": "test",
            "iconInfo": 10
        }
    }
}
            
        
            
{
    "sn": "SP10ZAW5ZE9E0052",
    "params": {
        "quotas": [
            "loadChInfo"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "loadChInfo": {
            "info": [
                {
                    "iconNum": 0,
                    "chName": "test"
                },
                {
                    "iconNum": 27,
                    "chName": "Line 2"
                },
                {
                    "iconNum": 27,
                    "chName": "Line 3"
                },
                {
                    "iconNum": 27,
                    "chName": "Line 4"
                },
                {
                    "iconNum": 0,
                    "chName": "Line 5"
                },
                {
                    "iconNum": 27,
                    "chName": "Line 6"
                },
                {
                    "iconNum": 27,
                    "chName": "Line 7"
                },
                {
                    "iconNum": 27,
                    "chName": "Line 8"
                },
                {
                    "iconNum": 27,
                    "chName": "Line 9"
                },
                {
                    "iconNum": 27,
                    "chName": "Line 10"
                }
            ]
        }
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Region information configuration
            
{
    "sn": "SP10ZAW5ZE9E0052",
    "operateType": "TCP",
    "params": {
        "cmdSet": 11,
        "id": 34,
        "area": "US, China"
    }
}
            
        
            
{
    "sn": "SP10ZAW5ZE9E0052",
    "params": {
        "quotas": [
            "areaInfo.area",
            "areaInfo.cmdSet",
            "areaInfo.id"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "areaInfo.id": 35,
        "areaInfo.cmdSet": 11,
        "areaInfo.area": "United States,Alabama"
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Setting the emergency mode
            
{
    "sn": "SP10ZAW5ZE9E0052",
    "operateType": "TCP",
    "params": {
        "cmdSet": 11,
        "id": 64,
        "isCfg": 1,
        "backupMode": 1,
        "overloadMode": 1,
        "chSta": [
            {
                "priority": 1,
                "isEnable": 1
            },
            {
                "priority": 1,
                "isEnable": 1
            },
            {
                "priority": 2,
                "isEnable": 1
            },
            {
                "priority": 3,
                "isEnable": 1
            },
            {
                "priority": 4,
                "isEnable": 1
            },
            {
                "priority": 5,
                "isEnable": 1
            },
            {
                "priority": 6,
                "isEnable": 1
            },
            {
                "priority": 7,
                "isEnable": 1
            },
            {
                "priority": 8,
                "isEnable": 1
            },
            {
                "priority": 9,
                "isEnable": 1
            }
        ]
    }
}
            
        
            
{
    "sn": "SP10ZAW5ZE9E0052",
    "params": {
        "quotas": [
            "emergencyStrategy.isCfg",
            "emergencyStrategy.backupMode",
            "emergencyStrategy.cmdSet",
            "emergencyStrategy.chSta",
            "emergencyStrategy.id",
            "emergencyStrategy.overloadMode"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "emergencyStrategy.backupMode": 1,
        "emergencyStrategy.overloadMode": 1,
        "emergencyStrategy.chSta": [
            {
                "priority": 1,
                "isEnable": 1
            },
            {
                "priority": 1,
                "isEnable": 1
            },
            {
                "priority": 2,
                "isEnable": 1
            },
            {
                "priority": 3,
                "isEnable": 1
            },
            {
                "priority": 4,
                "isEnable": 1
            },
            {
                "priority": 5,
                "isEnable": 1
            },
            {
                "priority": 6,
                "isEnable": 1
            },
            {
                "priority": 7,
                "isEnable": 1
            },
            {
                "priority": 8,
                "isEnable": 1
            },
            {
                "priority": 9,
                "isEnable": 1
            }
        ],
        "emergencyStrategy.id": 65,
        "emergencyStrategy.isCfg": 1,
        "emergencyStrategy.cmdSet": 11
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Setting the scheduled charging job
            
{
    "sn": "SP10ZAW5ZE9E0052",
    "operateType": "TCP",
    "params": {
        "cfg": {
            "param": {
                "lowBattery": 95,
                "chChargeWatt": 2000,
                "chSta": [
                    1,
                    0
                ],
                "hightBattery": 100
            },
            "comCfg": {
                "timeScale": [
                    255,
                    255,
                    255,
                    255,
                    255,
                    255,
                    255,
                    255,
                    255,
                    255,
                    255,
                    255,
                    255,
                    255,
                    255,
                    255,
                    255,
                    127
                ],
                "isCfg": 1,
                "type": 1,
                "timeRange": {
                    "isCfg": 1,
                    "startTime": {
                        "sec": 0,
                        "min": 0,
                        "week": 4,
                        "hour": 0,
                        "month": 1,
                        "year": 2023,
                        "day": 11
                    },
                    "timeMode": 0,
                    "endTime": {
                        "sec": 59,
                        "min": 59,
                        "week": 7,
                        "hour": 23,
                        "month": 1,
                        "year": 2023,
                        "day": 22
                    },
                    "mode1": {
                        "thur": 0,
                        "sat": 0,
                        "wed": 0,
                        "tues": 0,
                        "fri": 0,
                        "sun": 0,
                        "mon": 0
                    },
                    "isEnable": 1
                },
                "isEnable": 1,
                "setTime": {
                    "sec": 35,
                    "min": 53,
                    "week": 4,
                    "hour": 15,
                    "month": 1,
                    "year": 2023,
                    "day": 11
                }
            }
        },
        "cfgIndex": 1,
        "cmdSet": 11,
        "id": 81
    }
}
            
        
            
{
    "sn": "SP10ZAW5ZE9E0052",
    "params": {
        "quotas": [
            "timeTask"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "timeTask": [
            {
                "cfg": {
                    "param": {
                        "lowBattery": 0,
                        "chChargeWatt": 0,
                        "chSta": [
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0
                        ],
                        "hightBattery": 0
                    },
                    "comCfg": {
                        "timeScale": [
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0
                        ],
                        "isCfg": 0,
                        "type": 0,
                        "isEnable": 0,
                        "setTime": {
                            "sec": 0,
                            "week": 0,
                            "min": 0,
                            "hour": 0,
                            "month": 0,
                            "year": 0,
                            "day": 0
                        },
                        "timeRange": {
                            "isCfg": 0,
                            "timeMode": 0,
                            "startTime": {
                                "sec": 0,
                                "week": 0,
                                "min": 0,
                                "hour": 0,
                                "month": 0,
                                "year": 0,
                                "day": 0
                            },
                            "endTime": {
                                "sec": 59,
                                "week": 0,
                                "min": 59,
                                "hour": 23,
                                "month": 0,
                                "year": 0,
                                "day": 0
                            },
                            "isEnable": 0
                        }
                    }
                },
                "index": 16
            }
        ]
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Setting the scheduled discharging job
            
{
    "sn": "SP10ZAW5ZE9E0052",
    "operateType": "TCP",
    "params": {
        "cfg": {
            "chSta": [
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1
            ],
            "comCfg": {
                "timeScale": [
                    1,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                "isCfg": 1,
                "type": 2,
                "timeRange": {
                    "isCfg": 1,
                    "timeMode": 0,
                    "startTime": {
                        "sec": 0,
                        "min": 0,
                        "week": 2,
                        "hour": 0,
                        "month": 10,
                        "year": 2022,
                        "day": 24
                    },
                    "endTime": {
                        "sec": 59,
                        "min": 59,
                        "week": 2,
                        "hour": 23,
                        "month": 10,
                        "year": 2022,
                        "day": 25
                    },
                    "isEnable": 1
                },
                "isEnable": 1,
                "setTime": {
                    "sec": 61,
                    "min": 9,
                    "week": 7,
                    "hour": 16,
                    "month": 11,
                    "year": 2022,
                    "day": 15
                }
            }
        },
        "cfgIndex": 0,
        "cmdSet": 11,
        "id": 82
    }
}
            
        
            
{
    "sn": "SP10ZAW5ZE9E0052",
    "params": {
        "quotas": [
            "timeTask"
        ]
    }
}
            
        
Setting the configuration status
            
{
    "sn": "SP10ZAW5ZE9E0052",
    "operateType": "TCP",
    "params": {
        "cmdSet": 11,
        "id": 7,
        "cfgSta": 1
    }
}
            
        
            
{
    "sn": "SP10ZAW5ZE9E0052",
    "params": {
        "quotas": [
            "cfgSta.sta",
            "cfgSta.cmdSet",
            "cfgSta.id"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "cfgSta.cmdSet": 11,
        "cfgSta.sta": 0,
        "cfgSta.id": 8
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Getting the configuration status
            
{
    "sn": "SP10ZAW5ZE9E0052",
    "operateType": "TCP",
    "params": {
        "cmdSet": 11,
        "id": 8
    }
}
            
        
Start self-check information pushing
            
{
    "sn": "SP10ZAW5ZE9E0052",
    "operateType": "TCP",
    "params": {
        "cmdSet": 11,
        "id": 112,
        "selfCheckType": 1
    }
}
            
        
            
{
    "sn": "SP10ZAW5ZE9E0052",
    "params": {
        "quotas": [
            "selfCheck.flag",
            "selfCheck.cmsSet",
            "selfCheck.id"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "selfCheck.id": 113,
        "selfCheck.flag": 1
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Pushing standby charging/discharging parameters
            
{
    "sn": "SP10ZAW5ZE9E0052",
    "operateType": "TCP",
    "params": {
        "cmdSet": 11,
        "id": 29,
        "forceChargeHigh": 0,
        "discLower": 0
    }
}
            
        
            
{
    "sn": "SP10ZAW5ZE9E0052",
    "params": {
        "quotas": [
            "backupChaDiscCfg.forceChargeHigh",
            "backupChaDiscCfg.discLower",
            "backupChaDiscCfg.cmdSet",
            "backupChaDiscCfg.id"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "backupChaDiscCfg.cmdSet": 11,
        "backupChaDiscCfg.discLower": 0,
        "backupChaDiscCfg.forceChargeHigh": 100,
        "backupChaDiscCfg.id": 30
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
GetAllQuotaResponse
heartbeat
Field	Field's Type	Description
workTime
long
Device work time /min
backupFullCap
int
Backup full capacity
backupBatPer
int
Backup battery percentage
gridDayWatth
float
Grid electricity consumption per day
backupDayWatth
float
Backup electricity consumption per day
backupChaTime
int
Backup discharge time
gridSta
int
Grid electricity status0 off, 1 on
heartbeat.time
Field	Field's Type	Description
year
int
Year
month
int
Month
day
int
Day
hour
int
Hour
min
int
Minute
sec
int
Second
week
int
Week
heartbeat.loadCmdChCtrlInfos
Field	Field's Type	Description
powCh
int
Channel number 0~9
ctrlSta
short
Power supply type0 Grid supply, 1 storage power supply, 2 close
ctrlMode
short
Contol mode0 Auto, 1 Manual
priority
short
Channel priority
heartbeat.backupCmdChCtrlInfos
Field	Field's Type	Description
pwoCh
int
Channel number 10~11
ctrlSta
short
Power supply type0 Grid supply, 1 storage power supply, 2 close
ctrlMode
short
Contol mode0 Auto, 1 Manual
priority
short
Channel priority
splitPhaseInfo
Field	Field's Type	Description
cfgList
CfgInfo[10]
Split phase info listcfgList.length must be 10
CfgInfo
Field	Field's Type	Description
linkMark
short
0 Not be split1 Should be split
linkCh
int
Spilt channel number
loadChCurInfo
Field	Field's Type	Description
cur
int[10]
Channel currentcur[0] represent channel1's current
gridInfo
Field	Field's Type	Description
gridVol
int
Grid voltageRange: 100 ~ 250
gridFreq
int
Grid FrequencyRange: 50 ~ 60
epsModeInfo
Field	Field's Type	Description
eps
bool
EPS mode status0 off, 1 on
chUseInfo
Field	Field's Type	Description
isEnable
bool[]
Channel use or notisEnable[0]=false, represent channel1 off
loadChInfo
Field	Field's Type	Description
chName
string
Channel nick name
iconNum
int
Channel icon number
timeTask
Field	Field's Type	Description
index
int
Task index
cfg
CfgInfo
Task config info
CfgInfo
Field	Field's Type	Description
param
param
Parameter
comCfg
ComCfg
Job configuration
param
Field	Field's Type	Description
hightBattery
int
Charge high power percentage
lowBattery
int
Charge low power percentage
chChargeWatt
int
Channel charge power
chSta
int[]
Channel status0 off, 1 on
ComCfg
Field	Field's Type	Description
timeScale
int[]
Time scale
isCfg
short
Config or not0 No, 1 Yes
type
short
Power type1 charge, 2 discharge
isEnable
short
Config enable or not0 No, 1 Yes
setTime
TimeInfo
Setting time
timeRange
TimeRangeInfo
Strategy effective time range
TimeRangeInfo
Field	Field's Type	Description
isCfg
short
Config or not0 No, 1 Yes
isEnable
short
Config enable or not0 No, 1 Yes
timeMode
short
Time mode0 every day, 1 every week, 2 every month, 3 year month day
startTime
TimeInfo
Start time
endTime
TimeInfo
End time
model
——
timeMode = 0 "model": { "data": 12212121212122 }timeMode = 1 "model" : { "mon":1, "tues":1, "wed":1, "thur":1, "fri": 1, "sat": 1, "sun": 1, } timeMode = 2 "model": [1,2,3,4,5,6] timeMode = 3 "model":{ "day":1, "month":4, "year":2022 }
TimeInfo
Field	Field's Type	Description
year
int
Year
month
int
Month
day
int
Day
hour
int
Hour
min
int
Minute
sec
int
Second
week
int
Week
cfgSta
Field	Field's Type	Description
sta
int
Config or not 0 No, 1 Yes
backupChaDiscCfg
Field	Field's Type	Description
forceChargeHigh
int
Charge upper threshold percentage
discLower
int
Discharge lower threshold percentage
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
            
{
    "id": 123456789,
    "moduleType": 1,
    "operateType": "TCP",
    "version": "1.0",
    "sn": "SP10ZAW5ZE9E0052",
    "params": {
        "cmdSet": 11,
        "id": 16,
        "ch": 1,
        "ctrlMode": 1,
        "sta": 1
    }
}
            
        
            
{
    "id": 123,
    "version": "1.0",
    "moduleType": 1,
    "time": 2557051,
    "code": 0,
    "operateType": "standbyTime",
    "data": {
        "ack": 0
    }
}
            
        
ParamInfo Message Format
Set Command	SetTopic's ParamInfo	SetReplyTopic's ParamInfo
RTC time update
            
{
    "id": 123456789,
    "moduleType": 1,
    "operateType": "TCP",
    "version": "1.0",
    "sn": "SP10ZAW5ZE9E0052",
    "params": {
        "cmdSet": 11,
        "id": 3,
        "week": 2,
        "sec": 17,
        "min": 38,
        "hour": 18,
        "day": 16,
        "month": 11,
        "year": 2022
    }
}
            
        
            
{
    "version": "1.0",
    "cmdId": 0,
    "cmdFunc": 0,
    "id": 438661101,
    "addr": 0,
    "timestamp": 1711452104016,
    "operateType": "TCP",
    "params": {
        "ack": 0,
        "cmdSet": 11,
        "id": 3
    }
}
            
        
Load channel control
            
{
    "id": 123456789,
    "moduleType": 1,
    "operateType": "TCP",
    "version": "1.0",
    "sn": "SP10ZAW5ZE9E0052",
    "params": {
        "cmdSet": 11,
        "id": 16,
        "ch": 1,
        "ctrlMode": 1,
        "sta": 1
    }
}
            
        
            
{
    "version": "1.0",
    "cmdId": 0,
    "cmdFunc": 0,
    "id": 123456789,
    "addr": 0,
    "timestamp": 1711452160038,
    "operateType": "TCP",
    "params": {
        "sta": 0,
        "ack": 0,
        "cmdSet": 11,
        "id": 16
    }
}
            
        
Standby channel control
            
{
    "id": 123456789,
    "moduleType": 1,
    "operateType": "TCP",
    "version": "1.0",
    "sn": "SP10ZAW5ZE9E0052",
    "params": {
        "cmdSet": 11,
        "id": 17,
        "ch": 10,
        "ctrlMode": 1,
        "sta": 1
    }
}
            
        
            
{
    "id": 123456789,
    "moduleType": 1,
    "operateType": "TCP",
    "version": "1.0",
    "sn": "SP10ZAW5ZE9E0052",
    "params": {
        "cmdSet": 11,
        "id": 17,
        "ch": 10,
        "ctrlMode": 1,
        "sta": 1
    }
}
            
        
Split-phase information configuration
            
{
    "id": 123456789,
    "moduleType": 1,
    "operateType": "TCP",
    "version": "1.0",
    "sn": "SP10ZAW5ZE9E0052",
    "params": {
        "cmdSet": 11,
        "id": 18,
        "cfgList": [
            {
                "linkMark": 1,
                "linkCh": 0
            },
            {
                "linkMark": 0,
                "linkCh": 0
            },
            {
                "linkMark": 0,
                "linkCh": 0
            },
            {
                "linkMark": 0,
                "linkCh": 0
            },
            {
                "linkMark": 0,
                "linkCh": 0
            },
            {
                "linkMark": 0,
                "linkCh": 0
            },
            {
                "linkMark": 0,
                "linkCh": 0
            },
            {
                "linkMark": 0,
                "linkCh": 0
            },
            {
                "linkMark": 0,
                "linkCh": 0
            },
            {
                "linkMark": 0,
                "linkCh": 0
            }
        ]
    }
}
            
        
            
{
    "version": "1.0",
    "cmdId": 0,
    "cmdFunc": 0,
    "id": 123456789,
    "addr": 0,
    "timestamp": 1711452195163,
    "operateType": "TCP",
    "params": {
        "sta": 0,
        "ack": 0,
        "cmdSet": 11,
        "id": 18
    }
}
            
        
Channel current configuration (cur: 6, 13, 16, 20, 30)
            
{
    "id": 123456789,
    "moduleType": 1,
    "operateType": "TCP",
    "version": "1.0",
    "sn": "SP10ZAW5ZE9E0052",
    "params": {
        "cmdSet": 11,
        "id": 20,
        "chNum": 0,
        "cur": 6
    }
}
            
        
            
{
    "version": "1.0",
    "cmdId": 0,
    "cmdFunc": 0,
    "id": 123456789,
    "addr": 0,
    "timestamp": 1711452228967,
    "operateType": "TCP",
    "params": {
        "sta": 0,
        "ack": 0,
        "cmdSet": 11,
        "id": 20
    }
}
            
        
Grid power parameter configuration (gridVol: 220 230 240)
            
{
    "id": 123456789,
    "moduleType": 1,
    "operateType": "TCP",
    "version": "1.0",
    "sn": "SP10ZAW5ZE9E0052",
    "params": {
        "gridVol": 230,
        "gridFreq": 50,
        "cmdSet": 11,
        "id": 22
    }
}
            
        
            
{
    "version": "1.0",
    "cmdId": 0,
    "cmdFunc": 0,
    "id": 123456789,
    "addr": 0,
    "timestamp": 1711452256182,
    "operateType": "TCP",
    "params": {
        "sta": 0,
        "reconGridFreq": 5632,
        "ack": 0,
        "cmdSet": 11,
        "id": 22,
        "reconGridVol": 0
    }
}
            
        
EPS mode configuration (eps: 0: off, 1: on)
            
{
    "id": 123456789,
    "moduleType": 1,
    "operateType": "TCP",
    "version": "1.0",
    "sn": "SP10ZAW5ZE9E0052",
    "params": {
        "cmdSet": 11,
        "id": 24,
        "eps": 0
    }
}
            
        
            
{
    "version": "1.0",
    "cmdId": 0,
    "cmdFunc": 0,
    "id": 123456789,
    "addr": 0,
    "timestamp": 1711452767766,
    "operateType": "TCP",
    "params": {
        "sta": 0,
        "ack": 0,
        "cmdSet": 11,
        "id": 24
    }
}
            
        
Channel enable status configuration(chNum: 0–9, isEnable, 0: off, 1: on)
            
{
    "id": 123456789,
    "moduleType": 1,
    "operateType": "TCP",
    "version": "1.0",
    "sn": "SP10ZAW5ZE9E0052",
    "params": {
        "isEnable": 1,
        "chNum": 1,
        "cmdSet": 11,
        "id": 26
    }
}
            
        
            
{
    "version": "1.0",
    "cmdId": 0,
    "cmdFunc": 0,
    "id": 123456789,
    "addr": 0,
    "timestamp": 1711452787483,
    "operateType": "TCP",
    "params": {
        "sta": 0,
        "chNum": 1,
        "ack": 0,
        "cmdSet": 11,
        "id": 26
    }
}
            
        
Load channel information configuration(chNum 0~9 )
            
{
    "id": 123456789,
    "moduleType": 1,
    "operateType": "TCP",
    "version": "1.0",
    "sn": "SP10ZAW5ZE9E0052",
    "params": {
        "chNum": 1,
        "cmdSet": 11,
        "id": 32,
        "info": {
            "iconInfo": 10,
            "chName": "test223111"
        }
    }
}
            
        
            
{
    "version": "1.0",
    "cmdId": 0,
    "cmdFunc": 0,
    "id": 123456789,
    "addr": 0,
    "timestamp": 1711452805878,
    "operateType": "TCP",
    "params": {
        "sta": 0,
        "chNum": 1,
        "ack": 0,
        "cmdSet": 11,
        "id": 32
    }
}
            
        
Region information configuration
            
{
    "id": 123456789,
    "moduleType": 1,
    "operateType": "TCP",
    "version": "1.0",
    "sn": "SP10ZAW5ZE9E0052",
    "params": {
        "cmdSet": 11,
        "id": 34,
        "area": "US, China 1"
    }
}
            
        
            
{
    "version": "1.0",
    "cmdId": 0,
    "cmdFunc": 0,
    "id": 123456789,
    "addr": 0,
    "timestamp": 1711452043883,
    "operateType": "TCP",
    "params": {
        "sta": 0,
        "ack": 0,
        "cmdSet": 11,
        "id": 34
    }
}
            
        
Setting the emergency mode
            
{
    "id": 123456789,
    "moduleType": 1,
    "operateType": "TCP",
    "version": "1.0",
    "sn": "SP10ZAW5ZE9E0052",
    "params": {
        "cmdSet": 11,
        "id": 64,
        "isCfg": 1,
        "backupMode": 1,
        "overloadMode": 1,
        "chSta": [
            {
                "priority": 1,
                "isEnable": 1
            },
            {
                "priority": 1,
                "isEnable": 1
            },
            {
                "priority": 2,
                "isEnable": 1
            },
            {
                "priority": 3,
                "isEnable": 1
            },
            {
                "priority": 4,
                "isEnable": 1
            },
            {
                "priority": 5,
                "isEnable": 1
            },
            {
                "priority": 6,
                "isEnable": 1
            },
            {
                "priority": 7,
                "isEnable": 1
            },
            {
                "priority": 8,
                "isEnable": 1
            },
            {
                "priority": 9,
                "isEnable": 1
            }
        ]
    }
}
            
        
            
{
    "version": "1.0",
    "cmdId": 0,
    "cmdFunc": 0,
    "id": 123456789,
    "addr": 0,
    "timestamp": 1711452841815,
    "operateType": "TCP",
    "params": {
        "sta": 0,
        "ack": 0,
        "cmdSet": 11,
        "id": 64
    }
}
            
        
Reset
            
{
    "id": 123456789,
    "moduleType": 1,
    "operateType": "TCP",
    "version": "1.0",
    "sn": "SP10ZAW5ZE9E0052",
    "params": {
        "cmdSet": 1,
        "id": 20
    }
}
            
        
            
{
    "version": "1.0",
    "cmdId": 0,
    "cmdFunc": 0,
    "id": 123456789,
    "addr": 0,
    "timestamp": 1711452878830,
    "operateType": "TCP",
    "params": {
        "ack": 0,
        "cmdSet": 1,
        "id": 20
    }
}
            
        
Setting the scheduled charging job
            
{
    "id": 123456789,
    "moduleType": 1,
    "operateType": "TCP",
    "version": "1.0",
    "sn": "SP10ZAW5ZE9E0052",
    "params": {
        "cfg": {
            "param": {
                "lowBattery": 95,
                "chChargeWatt": 2000,
                "chSta": [
                    1,
                    0
                ],
                "hightBattery": 100
            },
            "comCfg": {
                "timeScale": [
                    255,
                    255,
                    255,
                    255,
                    255,
                    255,
                    255,
                    255,
                    255,
                    255,
                    255,
                    255,
                    255,
                    255,
                    255,
                    255,
                    255,
                    127
                ],
                "isCfg": 1,
                "type": 1,
                "timeRange": {
                    "isCfg": 1,
                    "startTime": {
                        "sec": 0,
                        "min": 0,
                        "week": 4,
                        "hour": 0,
                        "month": 1,
                        "year": 2023,
                        "day": 11
                    },
                    "timeMode": 0,
                    "endTime": {
                        "sec": 59,
                        "min": 59,
                        "week": 7,
                        "hour": 23,
                        "month": 1,
                        "year": 2023,
                        "day": 22
                    },
                    "mode1": {
                        "thur": 0,
                        "sat": 0,
                        "wed": 0,
                        "tues": 0,
                        "fri": 0,
                        "sun": 0,
                        "mon": 0
                    },
                    "isEnable": 1
                },
                "isEnable": 1,
                "setTime": {
                    "sec": 35,
                    "min": 53,
                    "week": 4,
                    "hour": 15,
                    "month": 1,
                    "year": 2023,
                    "day": 11
                }
            }
        },
        "cfgIndex": 1,
        "cmdSet": 11,
        "id": 81
    }
}
            
        
            
{
    "version": "1.0",
    "cmdId": 0,
    "cmdFunc": 0,
    "id": 123456789,
    "addr": 0,
    "timestamp": 1711452905589,
    "operateType": "TCP",
    "params": {
        "sta": 0,
        "cfgIndex": 1,
        "ack": 0,
        "cmdSet": 11,
        "id": 81
    }
}
            
        
Setting the scheduled discharging job
            
{
    "id": 123456789,
    "moduleType": 1,
    "operateType": "TCP",
    "version": "1.0",
    "sn": "SP10ZAW5ZE9E0052",
    "params": {
        "cfg": {
            "chSta": [
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1
            ],
            "comCfg": {
                "timeScale": [
                    1,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                "isCfg": 1,
                "type": 2,
                "timeRange": {
                    "isCfg": 1,
                    "timeMode": 0,
                    "startTime": {
                        "sec": 0,
                        "min": 0,
                        "week": 2,
                        "hour": 0,
                        "month": 10,
                        "year": 2022,
                        "day": 24
                    },
                    "endTime": {
                        "sec": 59,
                        "min": 59,
                        "week": 2,
                        "hour": 23,
                        "month": 10,
                        "year": 2022,
                        "day": 25
                    },
                    "isEnable": 1
                },
                "isEnable": 1,
                "setTime": {
                    "sec": 61,
                    "min": 9,
                    "week": 7,
                    "hour": 16,
                    "month": 11,
                    "year": 2022,
                    "day": 15
                }
            }
        },
        "cfgIndex": 0,
        "cmdSet": 11,
        "id": 82
    }
}
            
        
            
{
    "version": "1.0",
    "cmdId": 0,
    "cmdFunc": 0,
    "id": 123456789,
    "addr": 0,
    "timestamp": 1711452933095,
    "operateType": "TCP",
    "params": {
        "sta": 0,
        "cfgIndex": 0,
        "ack": 0,
        "cmdSet": 11,
        "id": 82
    }
}
            
        
Setting the configuration status
            
{
    "id": 123456789,
    "moduleType": 1,
    "operateType": "TCP",
    "version": "1.0",
    "sn": "SP10ZAW5ZE9E0052",
    "params": {
        "cmdSet": 11,
        "id": 7,
        "cfgSta": 1
    }
}
            
        
            
{
    "version": "1.0",
    "cmdId": 0,
    "cmdFunc": 0,
    "id": 123456789,
    "addr": 0,
    "timestamp": 1711452958649,
    "operateType": "TCP",
    "params": {
        "sta": 0,
        "ack": 0,
        "cmdSet": 11,
        "id": 7
    }
}
            
        
Getting the configuration status
            
{
    "id": 123456789,
    "moduleType": 1,
    "operateType": "TCP",
    "version": "1.0",
    "sn": "SP10ZAW5ZE9E0052",
    "params": {
        "cmdSet": 11,
        "id": 8
    }
}
            
        
            
{
    "version": "1.0",
    "cmdId": 0,
    "cmdFunc": 0,
    "id": 123456789,
    "addr": 0,
    "timestamp": 1711452958649,
    "operateType": "TCP",
    "params": {
        "sta": 0,
        "ack": 0,
        "cmdSet": 11,
        "id": 7
    }
}
            
        
Start self-check information pushing
            
{
    "id": 123456789,
    "moduleType": 1,
    "operateType": "TCP",
    "version": "1.0",
    "sn": "SP10ZAW5ZE9E0052",
    "params": {
        "cmdSet": 11,
        "id": 112,
        "selfCheckType": 1
    }
}
            
        
            
{
    "version": "1.0",
    "cmdId": 0,
    "cmdFunc": 0,
    "id": 123456789,
    "addr": 0,
    "timestamp": 1711453003786,
    "operateType": "TCP",
    "params": {
        "ack": 0,
        "result": 0,
        "cmdSet": 11,
        "id": 112
    }
}
            
        
Pushing standby charging/discharging parameters
            
{
    "id": 123456789,
    "moduleType": 1,
    "operateType": "TCP",
    "version": "1.0",
    "sn": "SP10ZAW5ZE9E0052",
    "params": {
        "cmdSet": 11,
        "id": 29,
        "forceChargeHigh": 60,
        "discLower": 30
    }
}
            
        
            
{
    "version": "1.0",
    "cmdId": 0,
    "cmdFunc": 0,
    "id": 123456789,
    "addr": 0,
    "timestamp": 1711453031712,
    "operateType": "TCP",
    "params": {
        "sta": 0,
        "ack": 0,
        "cmdSet": 11,
        "id": 29
    }
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
    "id": "123456789",
    "version": "1.0",
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