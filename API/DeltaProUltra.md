ModuleType definition
Field	Field's Type	Description
HTTP communication mode
Set & Get Quota
How to transfer request parameters by these two HTTP API.
PUT: /iot-open/sign/device/quota: SetCmdRequest
POST: /iot-open/sign/device/quota: GetCmdRequest, GetCmdResponse
Set Command	SetCmdRequest	GetCmdRequest	GetCmdResponse
Enables battery heating.Confirmation method:Convert the decimal number returned by GetCmdResponse to a binary number, and view the second digit of the binary number. (0: enabled, 1: prohibited.)
            
{
    "sn": "Y711ZAB4SFAU0069",
    "cmdCode": "YJ751_PD_BP_HEAT_SET",
    "params": {
        "enBpHeat": 1
    }
}
            
        
            
{
    "sn": "Y711ZAB4SFAU0069",
    "params": {
        "quotas": [
            "hs_yj751_pd_appshow_addr.showFlag"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "hs_yj751_pd_appshow_addr.showFlag": 2064
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Enables the DC output switch.Confirmation method:Convert the decimal number returned by GetCmdResponse to a binary number, and view the sixth digit of the binary number.(0: disabled, 1: enabled.)
            
{
    "sn": "Y711ZAB4SFAU0069",
    "cmdCode": "YJ751_PD_DC_SWITCH_SET",
    "params": {
        "enable": 0
    }
}
            
        
            
{
    "sn": "Y711ZAB4SFAU0069",
    "params": {
        "quotas": [
            "hs_yj751_pd_appshow_addr.showFlag"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "hs_yj751_pd_appshow_addr.showFlag": 2064
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Sets the standby time of the device (min).(0: never turn off automatically, a non-zero value: device standby time when there is no button-pressing/charging/powering operations.)
            
{
    "sn": "Y711ZAB4SFAU0069",
    "cmdCode": "YJ751_PD_POWER_STANDBY_SET",
    "params": {
        "powerStandbyMin": 60
    }
}
            
        
            
{
    "sn": "Y711ZAB4SFAU0069",
    "params": {
        "quotas": [
            "hs_yj751_pd_app_set_info_addr.powerStandbyMins"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "hs_yj751_pd_app_set_info_addr.powerStandbyMins": 0
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Sets the standby time of the screen (s).(0: never turn off the screen, a non-zero value: screen standby time.)
            
{
    "sn": "Y711ZAB4SFAU0069",
    "cmdCode": "YJ751_PD_SCREEN_STANDBY_SET",
    "params": {
        "screenStandbySec": 60
    }
}
            
        
            
{
    "sn": "Y711ZAB4SFAU0069",
    "params": {
        "quotas": [
            "hs_yj751_pd_app_set_info_addr.screenStandbySec"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "hs_yj751_pd_app_set_info_addr.screenStandbySec": 60
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Sets AC no-load standby time (min).(0: always on, a non-zero value: AC port standby time when there is no load.)
            
{
    "sn": "Y711ZAB4SFAU0069",
    "cmdCode": "YJ751_PD_AC_STANDBY_SET",
    "params": {
        "acStandbyMin": 30
    }
}
            
        
            
{
    "sn": "Y711ZAB4SFAU0069",
    "params": {
        "quotas": [
            "hs_yj751_pd_app_set_info_addr.acStandbyMins"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "hs_yj751_pd_app_set_info_addr.acStandbyMins": 0
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Sets DC no-load standby time (min).(0: always on, a non-zero value: DC port standby time when there is no load.)
            
{
    "sn": "Y711ZAB4SFAU0069",
    "cmdCode": "YJ751_PD_DC_STANDBY_SET",
    "params": {
        "dcStandbyMin": 60
    }
}
            
        
            
{
    "sn": "Y711ZAB4SFAU0069",
    "params": {
        "quotas": [
            "hs_yj751_pd_app_set_info_addr.dcStandbyMins"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "hs_yj751_pd_app_set_info_addr.dcStandbyMins": 30
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Sets the upper limit SOC for battery pack charging.
            
{
    "sn": "Y711ZAB4SFAU0069",
    "cmdCode": "YJ751_PD_CHG_SOC_MAX_SET",
    "params": {
        "maxChgSoc": 75
    }
}
            
        
            
{
    "sn": "Y711ZAB4SFAU0069",
    "params": {
        "quotas": [
            "hs_yj751_pd_app_set_info_addr.chgMaxSoc"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "hs_yj751_pd_app_set_info_addr.chgMaxSoc": 75
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Sets the lower limit SOC for battery pack charging.
            
{
    "sn": "Y711ZAB4SFAU0069",
    "cmdCode": "YJ751_PD_DSG_SOC_MIN_SET",
    "params": {
        "minDsgSoc": 20
    }
}
            
        
            
{
    "sn": "Y711ZAB4SFAU0069",
    "params": {
        "quotas": [
            "hs_yj751_pd_app_set_info_addr.dsgMinSoc"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "hs_yj751_pd_app_set_info_addr.dsgMinSoc": 20
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
4G switch.(0: off, 1: on.)
            
{
    "sn": "Y711ZAB4SFAU0069",
    "cmdCode": "YJ751_PD_4G_SWITCH_SET",
    "params": {
        "en4GOpen": 1
    }
}
            
        
            
{
    "sn": "Y711ZAB4SFAU0069",
    "params": {
        "quotas": [
            "hs_yj751_pd_appshow_addr.wireless4gOn"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "hs_yj751_pd_appshow_addr.wireless4gOn": 1
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
AC Always-On settings.(acOftenOpen: 0: does not take effect, 1: takes effect;acOftenOpenMinSoc: the minimum SOC for AC Always-On.)
            
{
    "sn": "Y711ZAB4SFAU0069",
    "cmdCode": "YJ751_PD_AC_OFTEN_OPEN_SET",
    "params": {
        "acOftenOpen": 1
    }
}
            
        
            
{
    "sn": "Y711ZAB4SFAU0069",
    "params": {
        "quotas": [
            "hs_yj751_pd_app_set_info_addr.acOftenOpenFlg"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "hs_yj751_pd_app_set_info_addr.acOftenOpenMinSoc": 20
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
AC output settings.enable: specifies whether to enable AC. 0: turn off； 1: turn onX-boost: the X-Boost switch;outFreq: the output frequency.enable: Convert showFlag to a binary number and take the third digit from right to left.
            
{
    "sn": "Y711ZAB4SFAU0069",
    "cmdCode": "YJ751_PD_AC_DSG_SET",
    "params": {
        "enable": 1,
        "xboost": 1,
        "outFreq": 50
    }
}
            
        
            
{
    "sn": "Y711ZAB4SFAU0069",
    "params": {
        "quotas": [
            "hs_yj751_pd_appshow_addr.showFlag",
            "hs_yj751_pd_app_set_info_addr.acXboost",
            "hs_yj751_pd_app_set_info_addr.acOutFreq"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "hs_yj751_pd_appshow_addr.showFlag": 6429,
        "hs_yj751_pd_app_set_info_addr.acXboost": 1,
        "hs_yj751_pd_app_set_info_addr.acOutFreq": 60
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
AC charging power and the charging power of the AC POWER IN/OUT port
            
{
    "sn": "Y711ZKB2SG2Q0005",
    "cmdCode": "YJ751_PD_AC_CHG_SET",
    "params": {
        "chgC20Watts": 1500,
        "chg5p8Watts": 3900
    }
}
            
        
            
{
    "sn": "Y711ZKB2SG2Q0005",
    "params": {
        "quotas": [
            "hs_yj751_pd_app_set_info_addr.chgC20SetWatts",
            "hs_yj751_pd_app_set_info_addr.chg5p8SetWatts"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "hs_yj751_pd_app_set_info_addr.chgC20SetWatts": 1500,
        "hs_yj751_pd_app_set_info_addr.chg5p8SetWatts": 3900
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Device time zone
            
{
    "sn": "Y711ZKB2SG2Q0005",
    "params": {
        "quotas": [
            "hs_yj751_pd_app_set_info_addr.timezoneSettype",
            "hs_yj751_pd_app_set_info_addr.sysTimezoneId"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "hs_yj751_pd_app_set_info_addr.sysTimezoneId": "Asia/Shanghai",
        "hs_yj751_pd_app_set_info_addr.timezoneSettype": 0
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Backup reserve level
            
{
    "sn": "Y711ZKB2SG2Q0005",
    "params": {
        "quotas": [
            "hs_yj751_pd_app_set_info_addr.sysBackupSoc"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "hs_yj751_pd_app_set_info_addr.sysBackupSoc": 66
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Task mode0: Default mode1: Self-powered mode2: Scheduled tasks mode3: TOU mode
            
{
    "sn": "Y711ZKB2SG2Q0005",
    "params": {
        "quotas": [
            "hs_yj751_pd_app_set_info_addr.sysWordMode"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "hs_yj751_pd_app_set_info_addr.sysWordMode": 1
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
Input and output port parameters
            
{
    "sn": "Y711ZKB2SG2Q0005",
    "params": {
        "quotas": [
            "hs_yj751_pd_backend_addr.outAcL12Amp",
            "hs_yj751_pd_backend_addr.outAcL21Vol",
            "hs_yj751_pd_backend_addr.outAcL21Amp",
            "hs_yj751_pd_backend_addr.outAcL22Vol",
            "hs_yj751_pd_backend_addr.outAcL22Amp",
            "hs_yj751_pd_backend_addr.outAcTtVol",
            "hs_yj751_pd_backend_addr.outAcTtAmp",
            "hs_yj751_pd_backend_addr.outAcL14Vol",
            "hs_yj751_pd_backend_addr.outAcL14Amp",
            "hs_yj751_pd_backend_addr.outAc5p8Vol",
            "hs_yj751_pd_backend_addr.outAc5p8Amp",
            "hs_yj751_pd_backend_addr.inAc5p8Vol",
            "hs_yj751_pd_backend_addr.inAc5p8Amp",
            "hs_yj751_pd_backend_addr.inAcC20Vol",
            "hs_yj751_pd_backend_addr.inAcC20Amp",
            "hs_yj751_pd_backend_addr.inLvMpptVol",
            "hs_yj751_pd_backend_addr.inLvMpptAmp",
            "hs_yj751_pd_backend_addr.inHvMpptVol",
            "hs_yj751_pd_backend_addr.inHvMpptAmp",
            "hs_yj751_pd_backend_addr.outAcL11Pf",
            "hs_yj751_pd_backend_addr.outAcL12Pf",
            "hs_yj751_pd_backend_addr.outAcL21Pf",
            "hs_yj751_pd_backend_addr.outAcL22Pf",
            "hs_yj751_pd_backend_addr.outAcTtPf",
            "hs_yj751_pd_backend_addr.outAcL14Pf",
            "hs_yj751_pd_backend_addr.outAcP58Pf"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "hs_yj751_pd_backend_addr.inAc5p8Amp": 0,
        "hs_yj751_pd_backend_addr.outAcL14Vol": 0,
        "hs_yj751_pd_backend_addr.outAcL22Pf": 0,
        "hs_yj751_pd_backend_addr.outAcL21Pf": 0,
        "hs_yj751_pd_backend_addr.inLvMpptAmp": 0,
        "hs_yj751_pd_backend_addr.outAcL12Amp": 0,
        "hs_yj751_pd_backend_addr.outAcL14Amp": 0,
        "hs_yj751_pd_backend_addr.inAc5p8Vol": 0,
        "hs_yj751_pd_backend_addr.outAc5p8Vol": 0,
        "hs_yj751_pd_backend_addr.inHvMpptVol": 0,
        "hs_yj751_pd_backend_addr.outAcTtPf": 0,
        "hs_yj751_pd_backend_addr.outAcL21Amp": 0,
        "hs_yj751_pd_backend_addr.inLvMpptVol": 0,
        "hs_yj751_pd_backend_addr.outAc5p8Amp": 0,
        "hs_yj751_pd_backend_addr.inHvMpptAmp": 0,
        "hs_yj751_pd_backend_addr.outAcL21Vol": 0,
        "hs_yj751_pd_backend_addr.outAcL14Pf": 0,
        "hs_yj751_pd_backend_addr.outAcL11Pf": 0,
        "hs_yj751_pd_backend_addr.inAcC20Vol": 0,
        "hs_yj751_pd_backend_addr.outAcL12Pf": 0,
        "hs_yj751_pd_backend_addr.outAcTtVol": 0,
        "hs_yj751_pd_backend_addr.outAcP58Pf": 0,
        "hs_yj751_pd_backend_addr.outAcL22Vol": 0,
        "hs_yj751_pd_backend_addr.outAcTtAmp": 0,
        "hs_yj751_pd_backend_addr.outAcL22Amp": 0,
        "hs_yj751_pd_backend_addr.inAcC20Amp": 0
    },
    "eagleEyeTraceId": "",
    "tid": ""
}
            
        
GetAllQuotaResponse
How to transfer request parameters by this HTTP API.
GET: /iot-open/sign/device/quota/all: GetAllQuotaResponse
Field	Field's Type	Description
hs_yj751_pd_appshow_addr.outAcTtPwr
Float
AC30A output power.
hs_yj751_pd_appshow_addr.outAdsPwr
Float
Output power of the DC Anderson port.
hs_yj751_pd_app_set_info_addr.sysTimezone
Integer
Time zone of the system.
hs_yj751_pd_appshow_addr.wattsInSum
Float
Total input power (W).
hs_yj751_pd_appshow_addr.outAcL22Pwr
Float
Output power of the fourth AC port.
hs_yj751_pd_appshow_addr.outAc5p8Pwr
Float
Output power of the POWER IN/OUT port.
hs_yj751_pd_appshow_addr.outTypec1Pwr
Float
Type-C1 output power.
hs_yj751_pd_appshow_addr.remainTime
Integer
Remaining charging/discharging time (min).
hs_yj751_pd_appshow_addr.dsgTimeTaskType
Integer
Scheduled task type.
hs_yj751_pd_appshow_addr.access5p8OutType
Integer
POWER IN/OUT port output type.
hs_yj751_pd_appshow_addr.inHvMpptPwr
Float
High-voltage PV input power.
hs_yj751_pd_appshow_addr.soc
Integer
SOC for the entire device.
hs_yj751_pd_app_set_info_addr.chgC20SetWatts
Integer
AC input charging power.
hs_yj751_pd_appshow_addr.bpNum
Integer
Battery pack quantity.
hs_yj751_pd_app_set_info_addr.bmsModeSet
Integer
Battery auto-heating switch (0: disables, 1: enables).
hs_yj751_pd_appshow_addr.outAcL21Pwr
Float
Output power of the third AC port.
hs_yj751_pd_appshow_addr.fullCombo
Integer
Overall data transfer plan.
hs_yj751_pd_appshow_addr.wireless4gCon
Integer
Specifies whether the 4G network is registered. -1: The 4G module is not inserted; 0: PDP is not activated; 1: PDP is activated.
hs_yj751_pd_appshow_addr.outTypec2Pwr
Float
Type-C2 output power.
hs_yj751_pd_appshow_addr.outAcL14Pwr
Float
Output power of the last AC port.
hs_yj751_pd_appshow_addr.sysErrCode
Integer
Device error code.
hs_yj751_pd_appshow_addr.dsgTimeTaskNotice
Integer
Specifies whether to display scheduled tasks. 0: no, 1: yes.
hs_yj751_pd_app_set_info_addr.sysWordMode
Integer
System operating mode.
hs_yj751_pd_app_set_info_addr.screenStandbySec
Integer
Screen standby time (unit: s). The standby time defaults to 300s.
hs_yj751_pd_appshow_addr.wirlesss4gErrCode
Integer
4G-related error code.
hs_yj751_pd_app_set_info_addr.dsgMinSoc
Integer
Lower limit SOC for discharging.
hs_yj751_pd_appshow_addr.outUsb2Pwr
Float
USB2 output power.
hs_yj751_pd_app_set_info_addr.backupRatio
Integer
Backup reserve level.
hs_yj751_pd_appshow_addr.remainCombo
Integer
Remaining data transfer plan.
hs_yj751_pd_app_set_info_addr.dcStandbyMins
Integer
DC standby time (unit: min). The standby time defaults to 12 h.
hs_yj751_pd_appshow_addr.chgTimeTaskTable2
Integer
Third time period of the scheduled task.
hs_yj751_pd_appshow_addr.chgTimeTaskTable0
Integer
First time period of the scheduled task.
hs_yj751_pd_appshow_addr.chgTimeTaskTable1
Integer
Second time period of the scheduled task.
hs_yj751_pd_app_set_info_addr.sysTimezoneId
String
System time zone ID. Example: Asia/Shanghai.
hs_yj751_pd_appshow_addr.wireless4gOn
Integer
4G switch. 1: on (default), 0: off.
hs_yj751_pd_appshow_addr.c20ChgMaxWatts
Integer
Maximum charging power for ACC20. High voltage: 3000, low voltage: 1800.
hs_yj751_pd_app_set_info_addr.acStandbyMins
Integer
AC standby time (unit: min). The standby time defaults to 12 h.
hs_yj751_pd_app_set_info_addr.acOutFreq
Integer
AC output frequency. Valid values: 0, 50, and 60.
hs_yj751_pd_app_set_info_addr.chg5p8SetWatts
Integer
Sets the charging power of the POWER IN/OUT port.
hs_yj751_pd_appshow_addr.outAcL11Pwr
Float
Output power of the first AC port.
hs_yj751_pd_app_set_info_addr.acOftenOpenFlg
Integer
AC Always-On status.
hs_yj751_pd_appshow_addr.outUsb1Pwr
Float
USB1 output power.
hs_yj751_pd_appshow_addr.wattsOutSum
Float
Total output power.
hs_yj751_pd_appshow_addr.wireless4GSta
Integer
Network card selected. 0: Wi-Fi, 1: 4G, 2: WLAN.
hs_yj751_pd_app_set_info_addr.powerStandbyMins
Integer
Standby time of the entire device (unit: min). The standby time defaults to 2 h.
hs_yj751_pd_appshow_addr.chgTimeTaskType
Integer
Scheduled task type.
hs_yj751_pd_app_set_info_addr.acOftenOpenMinSoc
Integer
Minimum SOC for AC Always-On.
hs_yj751_pd_appshow_addr.paraChgMaxWatts
Integer
Maximum charging power of the POWER IN/OUT port.
hs_yj751_pd_appshow_addr.chgTimeTaskMode
Integer
0: daily, 1: weekly, 2: monthly, 3: the specified date containing year, month, and day (takes effect only once).
hs_yj751_pd_appshow_addr.outPrPwr
Float
Discharging power of the parallel box.
hs_yj751_pd_appshow_addr.chgTimeTaskParam
Integer
0: daily, 1: weekly, 2: monthly, 3: the specified date containing year, month, and day (takes effect only once).
hs_yj751_pd_appshow_addr.dsgTimeTaskTable2
Integer
Third time period of the timetable.
hs_yj751_pd_appshow_addr.access5p8InType
Integer
POWER IN/OUT port input type.
hs_yj751_pd_app_set_info_addr.timezoneSettype
Integer
System time zone setting type. 0: manual, 1: auto.
hs_yj751_pd_appshow_addr.dsgTimeTaskTable0
Integer
First time period of the timetable for scheduled discharging.
hs_yj751_pd_appshow_addr.dsgTimeTaskTable1
Integer
Second time period of the timetable.
hs_yj751_pd_appshow_addr.inLvMpptPwr
Float
Low-voltage PV input power.
hs_yj751_pd_app_set_info_addr.energyMamageEnable
Integer
Energy management switch.
hs_yj751_pd_appshow_addr.inAcC20Pwr
Float
AC_c20 input power.
hs_yj751_pd_appshow_addr.outAcL12Pwr
Float
Output power of the second AC output port.
hs_yj751_pd_app_set_info_addr.sysBackupSoc
Integer
System backup power SOC.
hs_yj751_pd_appshow_addr.simIccid
String
ICCID of the 4G card.
hs_yj751_pd_appshow_addr.dsgTimeTaskMode
Integer
0: daily, 1: weekly, 2: monthly, 3: the specified date containing year, month, and day (takes effect only once).
hs_yj751_pd_app_set_info_addr.chgMaxSoc
Integer
Upper limit SOC for charging.
hs_yj751_pd_appshow_addr.inAc5p8Pwr
Float
Input power of the POWER IN/OUT port.
hs_yj751_pd_backend_addr.outAcL12Amp
Float
Output current of AC_L1_2
hs_yj751_pd_backend_addr.outAcL21Vol
Float
Output voltage of AC_L2_1
hs_yj751_pd_backend_addr.outAcL21Amp
Float
Output current of AC_L2_1
hs_yj751_pd_backend_addr.outAcL22Vol
Float
Output voltage of AC_L2_2
hs_yj751_pd_backend_addr.outAcL22Amp
Float
Output current of AC_L2_2
hs_yj751_pd_backend_addr.outAcTtVol
Float
Output voltage of AC_TT port
hs_yj751_pd_backend_addr.outAcTtAmp
Float
Output current of AC_TT port
hs_yj751_pd_backend_addr.outAcL14Vol
Float
Output voltage of AC_L14
hs_yj751_pd_backend_addr.outAcL14Amp
Float
Output current of AC_L14
hs_yj751_pd_backend_addr.outAc5p8Vol
Float
AC output voltage
hs_yj751_pd_backend_addr.outAc5p8Amp
Float
AC output current
hs_yj751_pd_backend_addr.inAc5p8Vol
Float
AC input voltage
hs_yj751_pd_backend_addr.inAc5p8Amp
Float
AC input current
hs_yj751_pd_backend_addr.inAcC20Vol
Float
Input voltage of AC_20A port
hs_yj751_pd_backend_addr.inAcC20Amp
Float
Input current of AC_20A port
hs_yj751_pd_backend_addr.inLvMpptVol
Float
Input voltage of AC low voltage
hs_yj751_pd_backend_addr.inLvMpptAmp
Float
Input current of AC low voltage
hs_yj751_pd_backend_addr.inHvMpptVol
Float
Input voltage of AC high voltage
hs_yj751_pd_backend_addr.inHvMpptAmp
Float
Input current of AC high voltage
hs_yj751_pd_backend_addr.outAcL11Pf
Float
Output frequency of AC_L1_1
hs_yj751_pd_backend_addr.outAcL12Pf
Float
Output frequency of AC_L1_2
hs_yj751_pd_backend_addr.outAcL21Pf
Float
Output frequency of AC_L2_1
hs_yj751_pd_backend_addr.outAcL22Pf
Float
Output frequency of AC_L2_2
hs_yj751_pd_backend_addr.outAcTtPf
Float
Output frequency of AC_TT
hs_yj751_pd_backend_addr.outAcL14Pf
Float
Output frequency of AC_L14
hs_yj751_pd_backend_addr.outAcP58Pf
Float
Output frequency of AC POWER IN/OUT port
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
Set Command	SetTopic's ParamInfo	SetReplyTopic's ParamInfo
Enables battery heating.
            
{
    "id": 123456789,
    "version": "1.0",
    "cmdCode": "YJ751_PD_BP_HEAT_SET",
    "params": {
        "enBpHeat": 1
    }
}
            
        
            
{
    "data": {
        "result": 0
    },
    "id": 123456789
}
            
        
Enables the DC output switch.
            
{
    "id": 123456789,
    "version": "1.0",
    "cmdCode": "YJ751_PD_DC_SWITCH_SET",
    "params": {
        "enable": 0
    }
}
            
        
            
{
    "data": {
        "result": 0
    },
    "id": 123456789
}
            
        
Sets the standby time of the entire device (min).(0: never turn off automatically, a non-zero value: the timeout period for auto shutdown when there is no button-pressing/charging/powering operations.)
            
{
    "id": 123456789,
    "version": "1.0",
    "cmdCode": "YJ751_PD_POWER_STANDBY_SET",
    "params": {
        "powerStandbyMin": 60
    }
}
            
        
            
{
    "data": {
        "result": 0
    },
    "id": 123456789
}
            
        
Sets the standby time of the screen (s).(0: never turn off the screen, a non-zero value: the timeout period for auto screen-off when you do not wake up the screen.)
            
{
    "id": 123456789,
    "version": "1.0",
    "cmdCode": "YJ751_PD_SCREEN_STANDBY_SET",
    "params": {
        "screenStandbySec": 60
    }
}
            
        
            
{
    "data": {
        "result": 0
    },
    "id": 123456789
}
            
        
Sets AC no-load standby time (min).(0: always on, a non-zero value: the timeout period for auto shutdown when there is no load.)
            
{
    "id": 123456789,
    "version": "1.0",
    "cmdCode": "YJ751_PD_AC_STANDBY_SET",
    "params": {
        "acStandbyMin": 30
    }
}
            
        
            
{
    "data": {
        "result": 0
    },
    "id": 123456789
}
            
        
Sets DC no-load standby time (min).(0: always on, a non-zero value: the timeout period for auto shutdown when there is no load.)
            
{
    "id": 123456789,
    "version": "1.0",
    "cmdCode": "YJ751_PD_DC_STANDBY_SET",
    "params": {
        "dcStandbyMin": 60
    }
}
            
        
            
{
    "data": {
        "result": 0
    },
    "id": 123456789
}
            
        
Sets the upper limit SOC for battery pack charging.
            
{
    "id": 123456789,
    "version": "1.0",
    "cmdCode": "YJ751_PD_CHG_SOC_MAX_SET",
    "params": {
        "maxChgSoc": 75
    }
}
            
        
            
{
    "data": {
        "result": 0
    },
    "id": 123456789
}
            
        
Sets the lower limit SOC for battery pack charging.
            
{
    "id": 123456789,
    "version": "1.0",
    "cmdCode": "YJ751_PD_DSG_SOC_MIN_SET",
    "params": {
        "minDsgSoc": 20
    }
}
            
        
            
{
    "data": {
        "result": 0
    },
    "id": 123456789
}
            
        
4G switch.(0: off, 1: on.)
            
{
    "id": 123456789,
    "version": "1.0",
    "cmdCode": "YJ751_PD_4G_SWITCH_SET",
    "params": {
        "en4GOpen": 1
    }
}
            
        
            
{
    "data": {
        "result": 0
    },
    "id": 123456789
}
            
        
AC Always-On settings.(acOftenOpen: 0: does not take effect, 1: takes effect;acOftenOpenMinSoc: the minimum SOC for AC Always-On.)
            
{
    "id": 123456789,
    "version": "1.0",
    "cmdCode": "YJ751_PD_AC_OFTEN_OPEN_SET",
    "params": {
        "acOftenOpen": 1
    }
}
            
        
            
{
    "data": {
        "result": 0
    },
    "id": 123456789
}
            
        
AC output settings.enable: specifies whether to enable AC;X-boost: the X-Boost switch;outFreq: the output frequency.
            
{
    "id": 123456789,
    "version": "1.0",
    "cmdCode": "YJ751_PD_AC_DSG_SET",
    "params": {
        "enable": 1,
        "xboost": 1,
        "outFreq": 50
    }
}
            
        
            
{
    "data": {
        "result": 0
    },
    "id": 123456789
}
            
        
AC charging power and the charging power of the AC POWER IN/OUT port
            
{
    "id": 123456789,
    "version": "1.0",
    "cmdCode": "YJ751_PD_AC_CHG_SET",
    "params": {
        "chgC20Watts": 1500,
        "chg5p8Watts": 3900
    }
}
            
        
            
{
    "data": {
        "result": 0
    },
    "id": 123456789
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
        "batFlag": 0
    }
    ...
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
Device online or not 0: No, 1: Yes