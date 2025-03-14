ModuleType definition
Field	Field Type	Description
moduleType
int
15362: BBC_IN15363: BBC_OUT15365: IC_LOW0: BP5000/BP200015367: LD_AC15368: LD_DC15370: Wireless
HTTP communication mode
Set & Get Quota
How to transfer request parameters using these two HTTP APIs.
PUT: /iot-open/sign/device/quota: SetCmdRequest
GET: /iot-open/sign/device/quota: GetCmdRequest, GetCmdResponse
BCC_IN
Set Command	SetCmdRequest	GetCmdRequest	GetCmdResponse
DC output voltage (0: 12 V, 1: 24 V)
            
{
    "id": 123456789,
    "version": "1.0",
    "sn": "M106ZAB4Z000001F",
    "moduleSn": "M1093-DCIN-CA7C3",
    "moduleType": 15362,
    "operateType": "dischgParaSet",
    "params": {
        "volTag": 0
    }
}
            
        
            
{
    "sn": "M106ZAB4Z000001F",
    "params": {
        "quotas": [
            "bbcin"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "bbcin": {
            "M1093-DCIN-CA7C3": {
                "chgPause": 1,
                "workMode": 1,
                "l1Curr": 16,
                "bpOnlinePos": 2,
                "altCableUnit": 0,
                "batCurr": 89,
                "warnCode": 0,
                "batWatts": 4,
                "altCableLen": 800,
                "altVoltLmt": 464,
                "altVoltLmtEn": 1,
                "hs2Temp": 29,
                "dcInState": 0,
                "workMode2": 0,
                "dayEnergy": 1234,
                "dsgEnergy": 789,
                "inHwTpe": 0,
                "allowDsgOn": 1,
                "hs1Temp": 28,
                "dcInWatts": 0,
                "dcInCurr": 0,
                "chgType": 0,
                "shakeCtrlDisable": 1,
                "eventCode": 0,
                "l2Curr": -6,
                "chargeMode": 0,
                "pcbTemp": 0,
                "errCode": 10000,
                "dcInVol": 0,
                "batVol": 52095,
                "chgMaxCurr": 70000,
                "isCarMoving": 1
            }
        }
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Charging settings
            
{
    "id": 123456789,
    "version": "1.0",
    "sn": "M106ZAB4Z000001F",
    "moduleSn": "M1093-DCIN-CA7C3",
    "moduleType": 15362,
    "operateType": "chgParaSet",
    "params": {
        "chgPause": 0,
        "maxChgCurr": 30,
        "altVoltLmtEn": 255,
        "shakeCtrlDisable": 255,
        "altCableUnit": 255,
        "altCableLen": -1,
        "altVoltLmt": 65535
    }
}
            
        
Charging (operating mode) settings
            
{
    "id": 123456789,
    "version": "1.0",
    "sn": "M106ZAB4Z000001F",
    "moduleSn": "M106ZAB4Z000001F",
    "moduleType": 15362,
    "operateType": "chgDsgParaSet",
    "params": {
        "workMode": 0,
        "rsvd": [
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0"
        ]
    }
}
            
        
BBC_OUT
Set Command	SetCmdRequest	GetCmdRequest	GetCmdResponse
Discharging settings(swSta: 0: off 1: on)
            
{
    "id": 123456789,
    "version": "1.0",
    "sn": "M106ZAB4Z000001F",
    "moduleSn": "M1093-DCIN-CA7C3",
    "moduleType": 15362,
    "operateType": "dischgParaSet",
    "params": {
        "swSta": 0
    }
}
            
        
            
{
    "sn": "M106ZAB4Z000001F",
    "params": {
        "quotas": [
            "bbcout"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "bbcout": {
            "M109ZEB4Z0000016": {
                "dsgEnergy": 78219,
                "ldOutCurr": 0,
                "ldOutWatts": 0,
                "workMode": 2,
                "hs1Temp": 32,
                "dcOutSta": 0,
                "l1Curr": -261,
                "batCurr": 0,
                "warnCode": 0,
                "batWatts": 0,
                "eventCode": 0,
                "l2Curr": -342,
                "cfgVolTag": 1,
                "pcbTemp": 0,
                "errCode": 15000,
                "hs2Temp": 0,
                "standbyTime": 30,
                "batVol": 52986,
                "ldOutVol": 134,
                "dayEnergy": 12343
            }
        }
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
A broadcast instruction for synchronizing RTC time
            
{
    "id": 123456789,
    "version": "1.0",
    "sn": "M106ZAB4Z000001F",
    "moduleSn": "M109ZEB4Z0000016",
    "moduleType": 15363,
    "operateType": "rtcBroadcast",
    "params": {
        "unixTime": 1710835118,
        "timeZone": 8,
        "timeZoneQuarter": 1
    }
}
            
        
IC_LOW
Set Command	SetCmdRequest	GetCmdRequest	GetCmdResponse
Command for discharging, powerOn: 0: AC off, 1: AC on
            
{
    "id": 123456789,
    "version": "1.0",
    "sn": "M106ZAB4Z000001F",
    "moduleSn": "M109ZEB4ZE7B0963",
    "moduleType": 15365,
    "operateType": "dischgIcParaSet",
    "params": {
        "acCurrMaxSet": 255,
        "powerOn": 0,
        "acChgDisa": 255,
        "acFrequencySet": 255,
        "acVolSet": 255
    }
}
            
        
            
{
    "sn": "M106ZAB4Z000001F",
    "params": {
        "quotas": [
            "iclow"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "iclow": {
            "M109ZEB4ZE7B0963": {
                "warn_code": 74,
                "bmsChgCurr": 272,
                "realSoc": 87,
                "protectState": 0,
                "chgType": 1,
                "batCurr": 265,
                "dcTemp": 29,
                "chgDsgState": 0,
                "extKitType": 0,
                "busVol": 725,
                "lsplFlag": 1,
                "maxChgCurr": 0,
                "errCode": 0,
                "event_code": 0,
                "chrgFlag": 2,
                "fanLevel": 2,
                "chgInType": 1,
                "chgBatVol": 53223
            }
        }
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
AC input current (range: 1-23)
            
{
    "id": 123456789,
    "version": "1.0",
    "sn": "M106ZAB4Z000001F",
    "moduleSn": "M109ZEB4ZE7B0963",
    "moduleType": 15365,
    "operateType": "dischgIcParaSet",
    "params": {
        "acCurrMaxSet": 10
    }
}
            
        
Grid power in priority (passByModeEn, 1: on, 2: off)
            
{
    "id": 123456789,
    "version": "1.0",
    "sn": "M106ZAB4Z000001F",
    "moduleSn": "M109ZEB4ZE7B0963",
    "moduleType": 15365,
    "operateType": "dsgIcParaSet",
    "params": {
        "dsgLowPwrEn": 255,
        "pfcDsgModeEn": 255,
        "passByCurrMax": 255,
        "passByModeEn": 1
    }
}
            
        
BP5000/BP2000
Set Command	SetCmdRequest	GetCmdRequest	GetCmdResponse
Upper limit of charging (range: 50–100)
            
{
    "id": 123456789,
    "version": "1.0",
    "sn": "M106ZAB4Z000001F",
    "moduleSn": "0000000000000000",
    "moduleType": 0,
    "operateType": "socUpperLimit",
    "params": {
        "maxChgSoc": 80
    }
}
            
        
            
{
    "sn": "M106ZAB4Z000001F",
    "params": {
        "quotas": [
            "bp2000"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "bp2000": {
            "M102Z3B4ZE6H0009": {
                "chgDsgMosState": 3,
                "soc": 87,
                "ptcHeatingEvent": 0,
                "minCellVol": 3310,
                "upsFlag": 1,
                "warnCode": 0,
                "lcdOffConfirmS": 0,
                "ptcChgErrCnt": 0,
                "oilStopUpline": 50,
                "remainCap": 33130,
                "chgState": 0,
                "acDcLsplShutdMin": 0,
                "canId": 1,
                "maxCellTemp": 25,
                "lcdStandbyMin": 0,
                "errCode": 61000,
                "minPtcTemp": 25,
                "totalAmp": 0,
                "warningEvent": 0,
                "designCap": 40000,
                "totalFullCap": 37,
                "totalChgDsgState": 0,
                "kitNum": 2,
                "oilCloseSoc": 50,
                "amp": -87,
                "fullCap": 37894,
                "totalOutWatts": -4,
                "totalInWatts": 0,
                "ptcRemainTime": 0,
                "openBmsIdex": 1,
                "vol": 52998,
                "ptcHeatingFlag": 0,
                "remindDsgPtcFlag": 0,
                "minCellTemp": 25,
                "inWatts": 0,
                "proChgDsgMosState": 3,
                "temp": 25,
                "bmsChgUpline": 77,
                "maxMosTemp": 25,
                "doubleOilErrorFlag": 0,
                "remainTime": 6626,
                "ptcMosErr": 0,
                "minMosTemp": 25,
                "ptcAllowFlag": 0,
                "eventCode": 61500,
                "maxPtcTemp": 26,
                "maxCellVol": 3319,
                "totalSoc": 87,
                "dsgSetSoc": 27,
                "ptcTouchFlag": 0,
                "balanceFlag": 0,
                "totalRemainTime": 143999,
                "oilStartDownline": 30,
                "bmsFault": 0,
                "bmsType": 1,
                "chgSetSoc": 77,
                "oilOpenSoc": 30,
                "outWatts": -4,
                "bmsDsgDownline": 27
            },
            "M109ZEB4ZE7B0963": {
                "kitNum": 1,
                "oilCloseSoc": 100,
                "chgDsgMosState": 3,
                "amp": -17406,
                "fullCap": 37924,
                "soc": 89,
                "ptcHeatingEvent": 0,
                "minCellVol": 3239,
                "upsFlag": 0,
                "warnCode": 0,
                "ptcRemainTime": 0,
                "vol": 51981,
                "openBmsIdex": 3,
                "ptcHeatingFlag": 0,
                "minCellTemp": 26,
                "ptcChgErrCnt": 0,
                "remainCap": 33766,
                "inWatts": 0,
                "proChgDsgMosState": 3,
                "temp": 26,
                "maxMosTemp": 26,
                "chgState": 1,
                "remainTime": 115,
                "canId": 2,
                "maxCellTemp": 26,
                "ptcMosErr": 0,
                "minMosTemp": 26,
                "ptcAllowFlag": 0,
                "lcdStandbyMin": 0,
                "maxPtcTemp": 26,
                "eventCode": 60500,
                "maxCellVol": 3262,
                "errCode": 60000,
                "dsgSetSoc": 0,
                "ptcTouchFlag": 0,
                "minPtcTemp": 25,
                "balanceFlag": 0,
                "bmsFault": 0,
                "bmsType": 1,
                "chgSetSoc": 100,
                "oilOpenSoc": 0,
                "designCap": 40000,
                "outWatts": -904
            }
        }
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Lower limit of discharging (range: 0–50)
            
{
    "id": 123456789,
    "version": "1.0",
    "sn": "M106ZAB4Z000001F",
    "moduleSn": "0000000000000000",
    "moduleType": 0,
    "operateType": "socLowerLimit",
    "params": {
        "minDsgSoc": 40
    }
}
            
        
Setting screen standby time(Unit: seconds. 0: never off)
            
{
    "id": 123456789,
    "version": "1.0",
    "sn": "M106ZAB4Z000001F",
    "moduleSn": "0000000000000000",
    "moduleType": 0,
    "operateType": "lcdStandbyMin",
    "params": {
        "minute": 300
    }
}
            
        
BP off
            
{
    "id": 123456789,
    "version": "1.0",
    "sn": "M106ZAB4Z000001F",
    "moduleSn": "0000000000000000",
    "moduleType": 0,
    "operateType": "powerOff",
    "params": {
        "enable": 1
    }
}
            
        
Setting heating by discharging (0: off, other values: on)
            
{
    "id": 123456789,
    "version": "1.0",
    "sn": "M106ZAB4Z000001F",
    "moduleSn": "0000000000000000",
    "moduleType": 0,
    "operateType": "ptcDsgCale",
    "params": {
        "enable": 1
    }
}
            
        
Clearing charging errors (0: off, 1: on)
            
{
    "id": 123456789,
    "version": "1.0",
    "sn": "M106ZAB4Z000001F",
    "moduleSn": "0000000000000000",
    "moduleType": 0,
    "operateType": "clearError",
    "params": {
        "enable": 0
    }
}
            
        
Lower limit for startup of smart generator
            
{
    "id": 123456789,
    "version": "1.0",
    "sn": "M106ZAB4Z000001F",
    "moduleSn": "0000000000000000",
    "moduleType": 0,
    "operateType": "oilStartDownLimit",
    "params": {
        "soc": 60
    }
}
            
        
Upper limit for startup of smart generator
            
{
    "id": 123456789,
    "version": "1.0",
    "sn": "M106ZAB4Z000001F",
    "moduleSn": "0000000000000000",
    "moduleType": 0,
    "operateType": "oilStopUpLimit",
    "params": {
        "soc": 20
    }
}
            
        
Low power switch
            
{
    "id": 123456789,
    "version": "1.0",
    "sn": "M106ZAB4Z000001F",
    "moduleSn": "0000000000000000",
    "moduleType": 0,
    "operateType": "acDcLsplCfg",
    "params": {
        "recv": [
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
        "acDcLsplOvertime": 0
    }
}
            
        
LD_AC
Set Command	SetCmdRequest	GetCmdRequest	GetCmdResponse
Setting the alias of a single channel
            
{
    "id": 123456789,
    "version": "1.0",
    "sn": "M106ZAB4Z000001F",
    "moduleSn": "M106ZAB4Z000001F",
    "moduleType": 15362,
    "operateType": "setAcChAlias",
    "params": {
        "id": 3,
        "chAlias": {
            "logoNum": 0,
            "alias": "Circuit4"
        }
    }
}
            
        
            
{
    "sn": "M106ZAB4Z000001F",
    "params": {
        "quotas": [
            "ldac"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "ldac": {
            "M10EZEB4ZE7D0128": {
                "acTemp1": 28,
                "acChWatt": [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                "errorCodeAdd": [
                    30000,
                    30040,
                    30080,
                    30120,
                    30160,
                    30200,
                    30800
                ],
                "acChCur": [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                "acChSta": 0,
                "acTemp2": 29,
                "acInVol": 0,
                "acTotalWatts": 0,
                "acSetChSta": 0
            }
        }
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Getting the aliases of all channels
            
{
    "id": 123456789,
    "version": "1.0",
    "sn": "M106ZAB4Z000001F",
    "moduleSn": "M106ZAB4Z000001F",
    "moduleType": 15362,
    "operateType": "getAcAllAlias",
    "params": {
        "enable": 1
    }
}
            
        
LD_DC
Set Command	SetCmdRequest	GetCmdRequest	GetCmdResponse
Setting the alias of a single channel
            
{
    "id": 123456789,
    "version": "1.0",
    "sn": "M106ZAB4Z000001F",
    "moduleSn": "M106ZAB4Z000001F",
    "moduleType": 15362,
    "operateType": "setDcChAlias",
    "params": {
        "id": 3,
        "chAlias": {
            "logoNum": 0,
            "alias": "Circuit4"
        }
    }
}
            
        
            
{
    "sn": "M106ZAB4Z000001F",
    "params": {
        "quotas": [
            "lddc"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "code": "0",
        "message": "Success",
        "data": {
            "lddc": {
                "M10E1-LDDC-29A63": {
                    "dcTemp1": 26,
                    "dcTemp2": 24,
                    "dcChRelay": 59,
                    "dcChCur": [
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
                    "dcChSta": 0,
                    "errorCodeAdd": [
                        40000,
                        40040,
                        40080,
                        40120,
                        40160,
                        40200,
                        40240,
                        40280,
                        40320,
                        40360,
                        40400,
                        40440,
                        40800
                    ],
                    "dcTotalWatts": 0,
                    "dcSetChSta": 0,
                    "dcInVol": 0,
                    "dcChWatt": [
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
                    ]
                }
            }
        }
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Getting the aliases of all channels
            
{
    "id": 123456789,
    "version": "1.0",
    "sn": "M106ZAB4Z000001F",
    "moduleSn": "M106ZAB4Z000001F",
    "moduleType": 15362,
    "operateType": "getDcAllAlias",
    "params": {
        "enable": 1
    }
}
            
        
Setting the status of the 6-way channel relay
            
{
    "id": 123456789,
    "version": "1.0",
    "sn": "M106ZAB4Z000001F",
    "moduleSn": "M106ZAB4Z000001F",
    "moduleType": 15362,
    "operateType": "chSwitch",
    "params": {
        "bitsSwSta": 0
    }
}
            
        
Wireless
Set Command	SetCmdRequest	GetCmdRequest	GetCmdResponse
Setting the product name
            
{
    "id": 123456789,
    "version": "1.0",
    "sn": "M106ZAB4Z000001F",
    "moduleSn": "M106ZAB4Z000001F",
    "moduleType": 15370,
    "operateType": "writeProName",
    "params": {
        "nameLen": 10,
        "name": "test"
    }
}
            
        
            
{
    "sn": "M106ZAB4Z000001F",
    "params": {
        "quotas": [
            "wireless"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "wireless": "{\"M106WAB4Z000001F\":{\"scenes\":3}}"
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Getting the product name
            
{
    "id": 123456789,
    "version": "1.0",
    "sn": "M106ZAB4Z000001F",
    "moduleSn": "M106ZAB4Z000001F",
    "moduleType": 15370,
    "operateType": "readProName",
    "params": {
        "enable": 1
    }
}
            
        
Setting scenarios
            
{
    "id": 123456789,
    "version": "1.0",
    "sn": "M106ZAB4Z000001F",
    "moduleSn": "M106ZAB4Z000001F",
    "moduleType": 15370,
    "operateType": "setScenes",
    "params": {
        "scenes": 3
    }
}
            
        
Triggering comprehensive data report
            
{
    "id": 123456789,
    "version": "1.0",
    "sn": "M106ZAB4Z000001F",
    "moduleSn": "M106ZAB4Z000001F",
    "moduleType": 15370,
    "operateType": "fullIotDataPush",
    "params": {
        "times": 1
    }
}
            
        
GEN (smart generator)
Set Command	SetCmdRequest	GetCmdRequest	GetCmdResponse
Oil pocket start/stopinstruction (0: off, 1: on)
            
{
    "id": 123456789,
    "version": "1.0",
    "sn": "M106ZAB4Z000001F",
    "moduleSn": "M106ZAB4Z000001F",
    "moduleType": 6402,
    "operateType": "powerOffGen",
    "params": {
        "bitsSwSta": 0
    }
}
            
        
GetAllQuotaResponse
How to transfer request parameters by this HTTP API.
GET: /iot-open/sign/device/quota/all: GetAllQuotaResponse
BP2000\BP5000
Field	Field's Type	Description
kitNum
int
Unique dynamic ID for CAN Mediation
oilCloseSoc
int
Smart generator shutoff SOC
chgDsgMosState
int
Status of charging and discharging MOS
amp
int
Current mA
fullCap
int
Capacity of full charging (mAh)
soc
int
soc
ptcHeatingEvent
int
PTC stop heating event
minCellVol
int
Minimum battery cell voltage (mV)
upsFlag
int
Status of UPS mode
warnCode
int
Alarm code
ptcRemainTime
int
Remaining time of PTC heating (min)
vol
int
Voltage (mV)
openBmsIdex
int
Enable the battery or not. 0: not enabled, 1: enabled
ptcHeatingFlag
int
Current status of PTC: 0: stop, 1: heating, in delay due to error
minCellTemp
int
Minimum battery cell temperature (℃)
ptcChgErrCnt
int
Error count of PTC heating
remainCap
int
Remaining capacity (mAh)
inWatts
int
Input power (W)
proChgDsgMosState
int
Pre-discharging MOS status
temp
int
Showing current temperature (℃)
maxMosTemp
int
Maximum MOS temperature (℃)
chgState
int
Charging/Discharging status
remainTime
int
Remaining time (min)
canId
int
Version No.
maxCellTemp
int
Maximum battery cell temperature (℃)
ptcMosErr
int
Heating MOS exception
minMosTemp
int
Minimum MOS temperature (℃)
ptcAllowFlag
int
Allow PTC heating indication: 0: not allowed, 1: allowed
lcdStandbyMin
int
LCD screen standby time
maxPtcTemp
int
Maximum PTC temperature (℃)
eventCode
int
Event code
maxCellVol
int
Maximum battery cell voltage (mV)
errCode
int
Error code
dsgSetSoc
int
SOC lower limit when discharging the UPS
ptcTouchFlag
int
PTC triggering event: 0: not triggered, 1: heating by charging, 2: heating by discharging
minPtcTemp
int
Minimum PTC temperature (℃)
balanceFlag
int
Balancing status
bmsFault
int
BMS permanent failure
bmsType
int
0:BP5000 1:BP2000
chgSetSoc
int
SOC upper limit when charging the UPS
oilOpenSoc
int
Smart generator startup SOC
designCap
int
Design capacity (mAh)
outWatts
int
Output power (W)
bbcout
Field	Field's Type	Description
dsgEnergy
int
Accumulative power discharged (Wh)
ldOutCurr
int
Output current (mA)
ldOutWatts
int
Output power (W)
workMode
int
Operating mode, 1: charging mode, 2: power supply mode
hs1Temp
int
Radiator 1 temperature (℃)
dcOutSta
int
DC output status
l1Curr
int
Inductor L1 current (mA)
batCurr
int
Battery current (mA)
warnCode
int
Alarm code
batWatts
int
Battery power (W)
eventCode
int
Event code
l2Curr
int
Inductor L2 current (mA)
cfgVolTag
int
Configured output voltage type
pcbTemp
int
PCB temperature (℃)
errCode
int
See the preceding details of error codes.
hs2Temp
int
Radiator 2 temperature(℃)
standbyTime
int
Standby time with open load
batVol
int
Battery voltage (mV)
ldOutVol
int
Output voltage (mV)
dayEnergy
int
Daily power discharged (Wh)
bmsTotal
Field	Field's Type	Description
totalChgDsgState
int
Overall charging/discharging status, 0: idle, 1: discharging, 2: charging
bmsChgUpline
int
Upper limit of UPS charging of BMS
totalFullCap
int
Total battery capacity
totalOutWatts
int
Total output power (W)
doubleOilErrorFlag
int
Dual smart generator error
acDcLsplShutdMin
int
Time to shutoff when both AC and DC enter low power mode
totalInWatts
int
Total input power (W)
totalSoc
int
Total SOC
lcdOffConfirmS
int
Screen shutoff time
remindDsgPtcFlag
int
HUB under-voltage reminder to heat by charging
totalAmp
int
Total current (0.1 A)
totalRemainTime
int
Total remaining time (min)
warningEvent
int
Alarm event, 0: no warning, 1: charging, shutoff warning not allowed
oilStartDownline
int
Lower limit for the smart generator to start
oilStopUpline
int
Upper limit for the smart generator to disable
bmsDsgDownline
int
Lower limit of UPS charging of BMS
kitscc
Field	Field's Type	Description
pv2ErrCode
int
PV2 error code
pv1InWatts
int
PV1 input power (W)
pv2InWatts
int
PV2 input power (W)
pv1ErrCode
int
PV1 error code
chgEnergy
int
Accumulative power discharged (Wh)
l1Curr
int
Inductor L1 current (mA)
alt2CableUnit
int
Accumulative power discharged (Wh)
batCurr
int
Battery current (mA)
batWatts
int
Battery power (W)
pv1InCurr
int
PV1 input current (mA)
pv2InVol
int
PV2 input voltage (mV)
alt1VoltLmtEn
int
Custom restricted voltage 1 enable
pv2WorkMode
int
Operating mode, 1: solar, 2: adapter
alt1CableLen
float
ALT1 power charging cable length: 1 m to 30 m
hs2Temp
int
Radiator 2 temperature(℃)
mppt2SwSta
int
MPPT2 button status
alt2CableLen
float
ALT2 power charging cable length: 1 m to 30 m
alt2VoltLmtEn
int
Custom restricted voltage 2 enable
dayEnergy
int
Daily power discharged (Wh)
mppt1SwSta
int
MPPT1 button status
alt1VoltLmt
int
Custom restricted voltage value 1, unit: 100 mV
alt2VoltLmt
int
Custom restricted voltage value 2, unit: 100 mV
hs1Temp
int
Radiator 1 temperature (℃)
pv2InputFlag
int
PV2 input status
pv1InputFlag
int
PV1 input status
pv2InCurr
int
PV2 input current (mA)
pv1WorkMode
int
Operating mode, 1: solar, 2: adapter
l2Curr
int
Inductor L2 current (mA)
eventCode2
int
Event code
pcbTemp
int
PCB temperature (℃)
eventCode1
int
Event code
batVol
int
Battery voltage (mV)
pv1InVol
int
PV1 input voltage (mV)
alt1CableUnit
int
ALT power charging cable length unit, 0: meter, 1: foot
warnCode2
int
Alarm code
warnCode1
int
Alarm code
onLineModuleSnList
Field	Field's Type	Description
customData
int
Custom data
loaderVersion
int
Loader version
moduleAddr
int
Module static address
moduleDAddr
int
Module dynamic address
moduleDetail
int
Module detail
moduleSn
int
Module SN
moduleType
int
Module type
moduleVersion
int
Module version
wireless
Field	Field's Type	Description
scenes
int
Scenario
bbcin
Field	Field's Type	Description
errCode
int
See the preceding details of error codes.
dcInVol
int
Input voltage (mV)
dcInCurr
int
Input current (mA)
dcInWatts
int
Input power (W)
batVol
int
Battery voltage (mV)
batCurr
int
Battery current (mA)
batWatts
int
Battery power (W)
l1Curr
int
Inductor L1 current (mA)
l2Curr
int
Inductor L2 current (mA)
hs1Temp
int
Radiator 1 temperature (℃)
hs2Temp
int
Radiator 2 temperature(℃)
pcbTemp
int
PCB temperature (℃)
workMode
int
Operating mode, 1: charging mode, 2: power supply mode
chgPause
int
Pause of charging, 0: normal, 1: pause charging
chgMaxCurr
int
Maximum charging current configured (mA)
dayEnergy
int
Daily power discharged (Wh)
dsgEnergy
int
Accumulative power discharged (Wh)
dcInState
int
DC input status, 0: not connected, 1: connected
bpOnlinePos
int
BP in place information, BIT0:BP1 in place, BIT1:BP2 in place, BIT2:BP3 in place
inHwTpe
int
Input wire harness type, 0: ALT wire, 1: PV wire
chgType
int
Charging type, 0: unknown, 1: ALT, 2: PV
isCarMoving
int
Operating or not, enable after charging and operating
shakeCtrlDisable
int
Disable vibration detection while operating, 0 enabled, 1 disabled
altCableLen
int
ALT power charging cable length
altCableUnit
int
ALT power charging cable length unit, 0: meter, 1: foot
chargeMode
int
0: charging, 1: discharging
warnCode
int
Alarm code
eventCode
int
Event code
workMode2
int
Operating mode, 0: charging mode, 1 reverse charging mode
allowDsgOn
int
Operation status: 1: allow to open the discharging switch, 0: not allow to open the discharging switch
altVoltLmt
int
Custom restricted voltage value, unit: 100 mV
altVoltLmtEn
int
Custom restricted voltage enable
iclow
Field	Field's Type	Description
errCode
Int
Error code
batVol
Int
Battery voltage (mV)
warn_code
int
Alarm keyword
event_code
Int
Event keyword
batCurr
int
Battery current (mA)
busVol
Int
Bus Voltage (mV)
dcTemp
Int
DC temperature
fanLevel
int
Fan level: 0–3
chgType
Int
Charger type, 0: NULL, 1: AC charging, 2: adapter charging, 3: solar panel charging, 0xff: unknown charger type
chgDsgState
Int
Charging/discharging status, bit0~bit1: 00: idle, 01: discharging, 10: charging
protectState
int
Exception information displayed, BIT0: high temperature, BIT1: low temperature, BIT2: overload, BIT3: charging exception, BIT4: fan exception, BIT5: communication exception, BIT6: BMS failure
maxChgCurr
Int
Maximum chargeable current (mA)
bmsChgCurr
Int
BMS chargeable current (mA)
chgBatVol
Int
Charging voltage (mA)
chrgFlag
Int
0: BMS idle or disconnected, 1: allowed to charge 2: not allowed to charge
realSoc
Int
Power
chgInType
Int
Input type of charging and discharging, bit0~bit1: 00: null, 01: AC, 10: MPPT, 11: AC && MPPT
extKitType
Int
External accessory type, CC/PR/BC(SP), only MR500 is valid
lsplFlag
Int
Low power indication, 1: enter low power mode, 0: exit low power mode
res
int
Reserved numbers
warnCode
int
Alarm code
eventCode
int
Event code
ichigh
Field	Field's Type	Description
inVol
Int
Input voltage (mV)
inCurr
Int
Input current (mA)
inWatts
int
Input power (W)
outVol
Int
Output voltage (mV)
outCurr
Int
Output current (mA)
outWatts
int
Output power (W)
outVa
Int
Output apparent power (VA)
acTemp
Int
AC temperature
invType
int
Machine type
inFreq
Int
Inverter input frequency (Hz) 0,50,60
outFreq
int
Inverter output frequency (Hz) 0,50,60
invSwSta
Int
Inverter switch, 1: on, 0: off
cfgOutFreq
Int
Output frequency (Hz)
inputWhInDay
Int
1 day input watt-hour
outputWhInDay
Int
1 day output watt-hour
appCfg
Object
Application configuration
powerOn
int
Command for discharging; valid for the rising edge, 0: off, 1: on
acVolSet
int
RMS value, 220/110 V
acFreqSet
int
50/60Hz
acMaxCurrSer
int
Maximum AC input current (A)
acChgDisable
int
Charging not allowed
acRlyCtrlDis
int
AC earth relay control not allowed
wakeup
int
Exit low power mode, wake up
passByMaxCurr
int
Setting bypass maximum current
standbyTime
Int
Standby time with open load
ch2Watt
Int
Channel 2 power Is the power of the standalone socket on the KIT for the MM100 project
outAmp2
Int
Output current channel 2 (mA)
standbyTime
Int
Standby time with open load
passByModeEn
int
Use the grid power in priority when the button is disabled, 0: ignored, 1: enabled, 2: disabled
Ldac
Field	Field's Type	Description
acTemp1
int
PCB temperature measurement (℃)
acChWatt
[int, int…]
6-way channel active power (W)
errorCodeAdd
[int, int…]
Matching of comments for error codes (supplementary)
acChCur
[int, int…]
6-way channel current (mA)
acChSta
int
6-way channel status, bot0->ch1, 0: off, 1: on
acTemp2
Int
PCB temperature measurement (℃)
acInVol
Int
Input voltage (mV)
acTotalWatts
Int
Total active power (W)
acSetChSta
int
Setting 6-way channel status, bot0->ch1, 0: not allowed to use, 1: allowed to use
Lddc
Field	Field's Type	Description
errorCode
[int, int…]
Error code
dcInVol
Int
Input voltage (mV)
dcChCur
[int, int…]
12-way channel current (mA)
dcChWatt
[int, int…]
Total power + 12-way channel active power (W)
dcTotalWatts
Int
Total power (W)
dcTemp1
int
PCB temperature measurement (℃)
dcTemp2
Int
PCB temperature measurement (℃)
dcChRelay
Int
6-way relay status, bit0->ch1, 0: off, 1: on
dcChSta
Int
12 way channel status bit0->ch1 0: off 1: on
dcSetChSta
int
Setting 12 way channel status bot0->ch1 0: not allowed to use 1: allowed to use
errorCodeAdd
[int, int…]
Error codes (supplementary)
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
    "id": 123,
    "version": "1.0",
    "moduleType": 1,
    "operateType": "standbyTime",
    "params": {
        "standbyMin": 60
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
BBC_IN
Set Command	SetTopic's ParamInfo	SetReplyTopic's ParamInfo
DC output voltage, 0: 12 V, 1: 24 V
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleSn": "M1093-DCIN-CA7C3",
    "moduleType": 15362,
    "operateType": "dischgParaSet",
    "params": {
        "volTag": 0
    }
}
            
        
            
{
    "version": "1.0",
    "id": 123456789,
    "moduleSn": "M1093-DCIN-CA7C3",
    "moduleType": 15362,
    "operateType": "dischgParaSet",
    "time": 27946393,
    "data": {
        "retSta": 0
    }
}
            
        
Charging settings
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleSn": "M1093-DCIN-CA7C3",
    "moduleType": 15362,
    "operateType": "chgParaSet",
    "params": {
        "chgPause": 0,
        "maxChgCurr": 30,
        "altVoltLmtEn": 255,
        "shakeCtrlDisable": 255,
        "altCableUnit": 255,
        "altCableLen": -1,
        "altVoltLmt": 65535
    }
}
            
        
            
{
    "version": "1.0",
    "id": 123456789,
    "moduleSn": "M1093-DCIN-CA7C3",
    "moduleType": 15362,
    "operateType": "chgParaSet",
    "time": 27999673,
    "data": {
        "retSta": 0
    }
}
            
        
BBC_OUT
Set Command	SetTopic's ParamInfo	SetReplyTopic's ParamInfo
Discharging settings(swSta: 0: off 1: on)
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleSn": "M1093-DCIN-CA7C3",
    "moduleType": 15362,
    "operateType": "dischgParaSet",
    "params": {
        "swSta": 0
    }
}
            
        
            
{
    "version": "1.0",
    "id": 123456789,
    "moduleSn": "M1093-DCIN-CA7C3",
    "moduleType": 15362,
    "operateType": "dischgParaSet",
    "time": 27703933,
    "data": {
        "retSta": 0
    }
}
            
        
A broadcast instruction for synchronizing RTC time
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleSn": "M109ZEB4Z0000016",
    "moduleType": 15363,
    "operateType": "rtcBroadcast",
    "params": {
        "unixTime": 1710835118,
        "timeZone": 8,
        "timeZoneQuarter": 1
    }
}
            
        
            
{
    "version": "1.0",
    "id": 123456789,
    "moduleSn": "M109ZEB4Z0000016",
    "moduleType": 15363,
    "operateType": "rtcBroadcast",
    "time": 28043803,
    "data": {
        "retSta": 0
    }
}
            
        
IC_LOW
Set Command	SetTopic's ParamInfo	SetReplyTopic's ParamInfo
Command for discharging, powerOn: 0: AC off, 1: AC on
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleSn": "M109ZEB4ZE7B0963",
    "moduleType": 15365,
    "operateType": "dischgIcParaSet",
    "params": {
        "acCurrMaxSet": 255,
        "powerOn": 0,
        "acChgDisa": 255,
        "acFrequencySet": 255,
        "acVolSet": 255
    }
}
            
        
            
{
    "version": "1.0",
    "id": 123456789,
    "moduleSn": "M109ZEB4ZE7B0963",
    "moduleType": 15365,
    "operateType": "dischgIcParaSet",
    "time": 28112733,
    "data": {
        "retSta": 0
    }
}
            
        
AC input current (range: 1-23)
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleSn": "M109ZEB4ZE7B0963",
    "moduleType": 15365,
    "operateType": "dischgIcParaSet",
    "params": {
        "acCurrMaxSet": 10
    }
}
            
        
            
{
    "version": "1.0",
    "id": 123456789,
    "moduleSn": "M109ZEB4ZE7B0963",
    "moduleType": 15365,
    "operateType": "dischgIcParaSet",
    "time": 28166243,
    "data": {
        "retSta": 0
    }
}
            
        
Grid power in priority (passByModeEn, 1: on, 2: off)
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleSn": "M109ZEB4ZE7B0963",
    "moduleType": 15365,
    "operateType": "dsgIcParaSet",
    "params": {
        "dsgLowPwrEn": 255,
        "pfcDsgModeEn": 255,
        "passByCurrMax": 255,
        "passByModeEn": 1
    }
}
            
        
            
{
    "version": "1.0",
    "id": 123456789,
    "moduleSn": "M109ZEB4ZE7B0963",
    "moduleType": 15365,
    "operateType": "dsgIcParaSet",
    "time": 28215423,
    "data": {
        "retSta": 0
    }
}
            
        
BP5000/BP2000
Set Command	SetTopic's ParamInfo	SetReplyTopic's ParamInfo
Upper limit of charging (range: 50–100)
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleSn": "0000000000000000",
    "moduleType": 0,
    "operateType": "socUpperLimit",
    "params": {
        "maxChgSoc": 80
    }
}
            
        
            
{
    "version": "1.0",
    "id": 123456789,
    "moduleSn": "M102Z3B4ZE6H0009",
    "moduleType": 15371,
    "operateType": "socUpperLimit",
    "time": 2526232,
    "data": {
        "retSta": 0
    }
}
            
        
Lower limit of discharging (range: 0–50)
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleSn": "0000000000000000",
    "moduleType": 0,
    "operateType": "socLowerLimit",
    "params": {
        "minDsgSoc": 25
    }
}
            
        
            
{
    "version": "1.0",
    "id": 123456789,
    "moduleSn": "M109ZEB4ZE7B0963",
    "moduleType": 15371,
    "operateType": "socLowerLimit",
    "time": 2605402,
    "data": {
        "retSta": 0
    }
}
            
        
Setting screen standby time(Unit: seconds. 0: never off)
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleSn": "0000000000000000",
    "moduleType": 0,
    "operateType": "lcdStandbyMin",
    "params": {
        "minute": 300
    }
}
            
        
            
{
    "version": "1.0",
    "id": 123456789,
    "moduleSn": "M102Z3B4ZE6H0009",
    "moduleType": 15371,
    "operateType": "lcdStandbyMin",
    "time": 2653952,
    "data": {
        "retSta": 0
    }
}
            
        
BP off
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleSn": "0000000000000000",
    "moduleType": 0,
    "operateType": "powerOff",
    "params": {
        "enable": 1
    }
}
            
        
            
{
    "version": "1.0",
    "id": 123456789,
    "moduleSn": "M102Z3B4ZE6H0009",
    "moduleType": 15371,
    "operateType": "powerOff",
    "time": 2697972,
    "data": {
        "retSta": 0
    }
}
            
        
Setting heating by discharging (0: off, other values: on)
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleSn": "0000000000000000",
    "moduleType": 0,
    "operateType": "ptcDsgCale",
    "params": {
        "enable": 1
    }
}
            
        
            
{
    "version": "1.0",
    "id": 123456789,
    "moduleSn": "M102Z3B4ZE6H0009",
    "moduleType": 15371,
    "operateType": "ptcDsgCale",
    "time": 3092852,
    "data": {
        "retSta": 0
    }
}
            
        
Clearing charging errors (0: off, 1: on)
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleSn": "0000000000000000",
    "moduleType": 0,
    "operateType": "clearError",
    "params": {
        "enable": 0
    }
}
            
        
            
{
    "version": "1.0",
    "id": 123456789,
    "moduleSn": "M109ZEB4ZE7B0963",
    "moduleType": 15371,
    "operateType": "clearError",
    "time": 3156912,
    "data": {
        "retSta": 0
    }
}
            
        
Lower limit for startup of smart generator
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleSn": "0000000000000000",
    "moduleType": 0,
    "operateType": "oilStartDownLimit",
    "params": {
        "soc": 60
    }
}
            
        
            
{
    "version": "1.0",
    "id": 123456789,
    "moduleSn": "M102Z3B4ZE6H0009",
    "moduleType": 15371,
    "operateType": "oilStartDownLimit",
    "time": 3228602,
    "data": {
        "retSta": 0
    }
}
            
        
Upper limit for startup of smart generator
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleSn": "0000000000000000",
    "moduleType": 0,
    "operateType": "oilStopUpLimit",
    "params": {
        "soc": 20
    }
}
            
        
            
{
    "version": "1.0",
    "id": 123456789,
    "moduleSn": "M109ZEB4ZE7B0963",
    "moduleType": 15371,
    "operateType": "oilStopUpLimit",
    "time": 3247232,
    "data": {
        "retSta": 0
    }
}
            
        
Low power switch
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleSn": "0000000000000000",
    "moduleType": 0,
    "operateType": "acDcLsplCfg",
    "params": {
        "recv": [
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
        "acDcLsplOvertime": 0
    }
}
            
        
            
{
    "version": "1.0",
    "id": 123456789,
    "moduleSn": "M109ZEB4ZE7B0963",
    "moduleType": 15371,
    "operateType": "acDcLsplCfg",
    "time": 3271952,
    "data": {
        "retSta": 0
    }
}
            
        
LD_AC
Set Command	SetTopic's ParamInfo	SetReplyTopic's ParamInfo
Setting the alias of a single channel
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleSn": "M106ZAB4Z000001F",
    "moduleType": 15362,
    "operateType": "setAcChAlias",
    "params": {
        "id": 3,
        "chAlias": {
            "logoNum": 0,
            "alias": "Circuit4"
        }
    }
}
            
        
            
{
    "version": "1.0",
    "id": 123456789,
    "moduleSn": "M109ZEB4ZE7B0963",
    "moduleType": 15362,
    "operateType": "setAcChAlias",
    "time": 3271952,
    "data": {
        "retSta": 0
    }
}
            
        
Getting the aliases of all channels
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleSn": "M106ZAB4Z000001F",
    "moduleType": 15362,
    "operateType": "getAcAllAlias",
    "params": {
        "enable": 1
    }
}
            
        
            
{
    "version": "1.0",
    "id": 123456789,
    "moduleSn": "M109ZEB4ZE7B0963",
    "moduleType": 15362,
    "operateType": "getAcAllAlias",
    "time": 3271952,
    "data": {
        "retSta": 0
    }
}
            
        
LD_DC
Set Command	SetTopic's ParamInfo	SetReplyTopic's ParamInfo
Setting the alias of a single channel
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleSn": "M106ZAB4Z000001F",
    "moduleType": 15362,
    "operateType": "setDcChAlias",
    "params": {
        "id": 3,
        "chAlias": {
            "logoNum": 0,
            "alias": "Circuit4"
        }
    }
}
            
        
            
{
    "version": "1.0",
    "id": 123456789,
    "moduleSn": "M109ZEB4ZE7B0963",
    "moduleType": 15362,
    "operateType": "setDcChAlias",
    "time": 3271952,
    "data": {
        "retSta": 0
    }
}
            
        
Getting the aliases of all channels
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleSn": "M106ZAB4Z000001F",
    "moduleType": 15362,
    "operateType": "getDcAllAlias",
    "params": {
        "enable": 1
    }
}
            
        
            
{
    "version": "1.0",
    "id": 123456789,
    "moduleSn": "M109ZEB4ZE7B0963",
    "moduleType": 15362,
    "operateType": "getDcAllAlias",
    "time": 3271952,
    "data": {
        "retSta": 0
    }
}
            
        
Setting the status of the 6-way channel relay
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleSn": "M106ZAB4Z000001F",
    "moduleType": 15362,
    "operateType": "chSwitch",
    "params": {
        "bitsSwSta": 0
    }
}
            
        
            
{
    "version": "1.0",
    "id": 123456789,
    "moduleSn": "M109ZEB4ZE7B0963",
    "moduleType": 15362,
    "operateType": "chSwitch",
    "time": 3271952,
    "data": {
        "retSta": 0
    }
}
            
        
Wireless
Set Command	SetTopic's ParamInfo	SetReplyTopic's ParamInfo
Setting the product name
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleSn": "M106ZAB4Z000001F",
    "moduleType": 15370,
    "operateType": "writeProName",
    "params": {
        "nameLen": 10,
        "name": "test"
    }
}
            
        
            
{
    "version": "1.0",
    "id": 123456789,
    "moduleSn": "M106WAB4Z000001F",
    "moduleType": 15370,
    "operateType": "writeProName",
    "time": 3354902,
    "data": {
        "retSta": 0
    }
}
            
        
Getting the product name
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleSn": "M106ZAB4Z000001F",
    "moduleType": 15370,
    "operateType": "readProName",
    "params": {
        "enable": 1
    }
}
            
        
            
{
    "version": "1.0",
    "id": 123456789,
    "moduleSn": "M106WAB4Z000001F",
    "moduleType": 15370,
    "operateType": "readProName",
    "time": 3383022,
    "data": {
        "nameLen": 4,
        "name": "test"
    }
}
            
        
Setting scenarios
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleSn": "M106ZAB4Z000001F",
    "moduleType": 15370,
    "operateType": "setScenes",
    "params": {
        "scenes": 3
    }
}
            
        
            
{
    "version": "1.0",
    "id": 75798194,
    "moduleSn": "M106WAB4Z000001F",
    "moduleType": 15370,
    "operateType": "setScenes",
    "time": 3410042,
    "data": {
        "retSta": 0
    }
}
            
        
Triggering comprehensive data report
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleSn": "M106ZAB4Z000001F",
    "moduleType": 15370,
    "operateType": "fullIotDataPush",
    "params": {
        "times": 1
    }
}
            
        
            
{
    "version": "1.0",
    "id": 123456789,
    "moduleSn": "M106WAB4Z000001F",
    "moduleType": 15370,
    "operateType": "fullIotDataPush",
    "time": 361985392,
    "data": {
        "retSta": 0
    }
}
            
        
GEN (smart generator)
Set Command	SetTopic's ParamInfo	SetReplyTopic's ParamInfo
Oil pocket start/stop instruction (0: off, 1: on)
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleSn": "M106ZAB4Z000001F",
    "moduleType": 6402,
    "operateType": "powerOffGen",
    "params": {
        "bitsSwSta": 0
    }
}
            
        
            
{
    "version": "1.0",
    "id": 123456789,
    "moduleSn": "M109ZEB4ZE7B0963",
    "moduleType": 15362,
    "operateType": "powerOffGen",
    "time": 3271952,
    "data": {
        "retSta": 0
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