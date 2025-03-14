ModuleType definition
Field	Field's Type	Description
HTTP communication mode
Get Quota
Obtaining real-time data: POST: /iot-open/sign/device/quota
PowerOcean
Set Command	GetCmdRequest	GetCmdResponse
Phase A data
            
{
    "sn": "HJ31ZDH2ZF690029",
    "params": {
        "quotas": [
            "pcsAPhase"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "pcsAPhase": {
            "vol": 229.70134,
            "amp": 3.6087508,
            "actPwr": -810.62787,
            "reactPwr": 173.24965,
            "apparentPwr": 828.9349
        }
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Phase B data
            
{
    "sn": "HJ31ZDH2ZF690029",
    "params": {
        "quotas": [
            "pcsBPhase"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "pcsBPhase": {
            "vol": 229.49283,
            "amp": 3.2976089,
            "actPwr": -738.08673,
            "reactPwr": 167.15356,
            "apparentPwr": 756.7776
        }
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Phase C data
            
{
    "sn": "HJ31ZDH2ZF690029",
    "params": {
        "quotas": [
            "pcsCPhase"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "pcsCPhase": {
            "vol": 229.82661,
            "amp": 3.4730835,
            "actPwr": -776.1484,
            "reactPwr": 186.35483,
            "apparentPwr": 798.20703
        }
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
PV data
            
{
    "sn": "HJ31ZDH2ZF690025",
    "params": {
        "quotas": [
            "mpptHeartBeat"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "mpptHeartBeat": [
            {
                "mpptPv": [
                    {
                        "vol": 0,
                        "amp": 0.085432455,
                        "pwr": 0
                    },
                    {
                        "vol": 26.255978,
                        "amp": 0,
                        "pwr": 0
                    }
                ]
            }
        ]
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
MPPT power
            
{
    "sn": "HJ31ZDH2ZF690025",
    "params": {
        "quotas": [
            "mpptPwr"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "mpptPwr": 0
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Battery SoC
            
{
    "sn": "HJ31ZDH2ZF690025",
    "params": {
        "quotas": [
            "bpSoc"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "bpSoc": 42
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Battery power
            
{
    "sn": "HJ31ZDH2ZF690025",
    "params": {
        "quotas": [
            "bpPwr"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "bpPwr": -104
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Load power
            
{
    "sn": "HJ31ZDH2ZF690025",
    "params": {
        "quotas": [
            "sysLoadPwr"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "sysLoadPwr": 101
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Grid power
            
{
    "sn": "HJ31ZDH2ZF690025",
    "params": {
        "quotas": [
            "sysGridPwr"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "sysGridPwr": -3
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
PowerHeat
Set Command	GetCmdRequest	GetCmdResponse
Current temperature of zone B
            
{
    "sn": "HJ31ZDH2ZF690025",
    "params": {
        "quotas": [
            "sectorB"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "sectorB": {
            "tempCurr": 22.7
        }
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Current temperature of zone A
            
{
    "sn": "HJ31ZDH2ZF690025",
    "params": {
        "quotas": [
            "sectorA"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "sectorA": {
            "tempCurr": 22.5
        }
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Ambient temperature and inlet and outlet temperature
            
{
    "sn": "HJ31ZDH2ZF690025",
    "params": {
        "quotas": [
            "hpMaster"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "hpMaster": {
            "tempInlet": 22.5,
            "tempOutlet": 22.5,
            "tempAmbient": -3270
        }
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Current temperature of hot water
            
{
    "sn": "HJ31ZDH2ZF690025",
    "params": {
        "quotas": [
            "sectorDhw"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "sectorDhw": {
            "tempCurr": 22.5
        }
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Error code
            
{
    "sn": "HJ31ZDH2ZF690025",
    "params": {
        "quotas": [
            "emsErrCode"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "emsErrCode": {
            "errCode": [
                601
            ]
        }
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
PowerGlow
Set Command	GetCmdRequest	GetCmdResponse
Power of the heating rod and current water temperature
            
{
    "sn": "HJ31ZDH2ZF690025",
    "params": {
        "quotas": [
            "hrEnergyStream"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "hrEnergyStream": [
            {
                "temp": 22,
                "hrPwr": 0
            }
        ]
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Error code
            
{
    "sn": "HJ31ZDH2ZF690025",
    "params": {
        "quotas": [
            "emsErrCode"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "emsErrCode": {
            "errCode": [
                601
            ]
        }
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
PowerPulse
Set Command	GetCmdRequest	GetCmdResponse
Power of the EV charger
            
{
    "sn": "HJ31ZDH2ZF690025",
    "params": {
        "quotas": [
            "evPwr"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "evPwr": 0
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
EV charger status
            
{
    "sn": "HJ31ZDH2ZF690025",
    "params": {
        "quotas": [
            " chargingStatus"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        " chargingStatus": "EV_CHG_STS_AVAILABLE"
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Error code(Binary array)
            
{
    "sn": "HJ31ZDH2ZF690025",
    "params": {
        "quotas": [
            "errorCode"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "errorCode": "AAAAAAAAAAA="
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Historical data
Obtaining historical data (timespan not exceeding a week): POST: /iot-open/sign/device/quota/data
Set Command	GetCmdRequest	GetCmdResponse
Obtaining historical data (timespan not exceeding a week)
            
{
    "sn": "HJ31ZDH2ZF690025",
    "params": {
        "code": "JT303_Dashboard_Overview_Summary_Week",
        "beginTime": "2024-06-17 00:00:00",
        "endTime": "2024-06-23 23:59:59"
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "code": "0",
        "message": "Success",
        "data": [
            {
                "indexName": "pv_to_powerglow",
                "indexValue": 13.81,
                "unit": "kWh"
            },
            {
                "indexName": "From Solar",
                "indexValue": 32.27,
                "unit": "kWh"
            },
            {
                "indexName": "Self-sufficiency",
                "indexValue": 95.17,
                "unit": "%"
            },
            {
                "indexName": "pv_to_powerplus",
                "indexValue": 16.31,
                "unit": "kWh"
            },
            {
                "indexName": "pv_to_heatpump",
                "indexValue": 0,
                "unit": "kWh"
            },
            {
                "indexName": "pv_to_powerplus_pct",
                "indexValue": 0.7162,
                "unit": "%"
            },
            {
                "indexName": "To Battery",
                "indexValue": 9.1,
                "unit": "kWh"
            },
            {
                "indexName": "From Battery",
                "indexValue": 3.88,
                "unit": "kWh"
            },
            {
                "indexName": "From Grid",
                "indexValue": 5.13,
                "unit": "kWh"
            },
            {
                "indexName": "To Grid",
                "indexValue": 9.42,
                "unit": "kWh"
            },
            {
                "indexName": "To Home",
                "indexValue": 22.77,
                "unit": "kWh"
            }
        ],
        "eagleEyeTraceId": "",
        "tid": ""
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
GetAllQuotaResponse
GET: /iot-open/sign/device/quota/all: GetAllQuotaResponse
Field	Field's Type	Description
mpptPwr
float
MPPT power
bpSoc
float
Battery Soc
bpPwr
float
Battery power
sysLoadPwr
float
Load power
sysGridPwr
float
Grid power
evPwr
float
Power of the EV charger
chargingStatus
String
EV charger status
errorCode
string
Error code
pcsAPhase
Field	Field's Type	Description
vol
float
Voltage
amp
float
Current
actPwr
float
Active power
reactPwr
float
Reactive power
apparentPwr
float
Apparent power
pcsBPhase
Field	Field's Type	Description
vol
float
Voltage
amp
float
Current
actPwr
float
Active power
reactPwr
float
Reactive power
apparentPwr
float
Apparent power
pcsCPhase
Field	Field's Type	Description
vol
float
Voltage
amp
float
Current
actPwr
float
Active power
reactPwr
float
Reactive power
apparentPwr
float
Apparent power
mpptPv
Field	Field's Type	Description
vol
float
PV voltage
amp
float
PV current
pwr
float
PV power
sectorB
Field	Field's Type	Description
tempCurr
float
Current temperature of zone B
sectorA
Field	Field's Type	Description
tempCurr
float
Current temperature of zone A
hpMaster
Field	Field's Type	Description
tempInlet
float
Inlet temperature
tempOutlet
float
Outlet temperature
tempAmbient
float
Ambient temperature
sectorDhw
Field	Field's Type	Description
tempCurr
float
Current temperature
emsErrCode
Field	Field's Type	Description
errCode
int[]
Error code
PowerHeat: 601
PowerGlow: 602
mpptHeartBeat
Field	Field's Type	Description
mpptPv
json
mpptPv
mpptPv
Field	Field's Type	Description
vol
float
PV voltage
amp
float
PV current
pwr
float
PV power
MQTT communication mode
Report Device Quota
Usage of Topic	Topic	From	To
Report device quota
/open/${certificateAccount}/${sn}/quota
device
app
Please see HTTP GetAllQuotaResponse and Set & Set Reply for the fields definition.
Example
JSON
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
Plaintext
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
Device online or not
0: No, 1: Yes