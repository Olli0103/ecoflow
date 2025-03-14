ModuleType definition
Field	Field's Type	Description
moduleType
int
1: PD
2: BMS
3: INV
4: BMS_SLAVE
5: MPPT
HTTP communication mode
Set & Get Quota
How to transfer request parameters by these two HTTP API.
PUT: /iot-open/sign/device/quota: SetCmdRequest
GET: /iot-open/sign/device/quota: GetCmdRequest, GetCmdResponse
PD
Set Command	SetCmdRequest	GetCmdRequest	GetCmdResponse
Silent mode settings(0: disabled, 1: enabled)
            
{
    "id": 123456789,
    "sn": "R351ZFB4HF6L0030",
    "version": "1.0",
    "moduleType": 1,
    "operateType": "quietCfg",
    "params": {
        "enabled": 0
    }
}
            
        
            
{
    "sn": "R351ZFB4HF6L0030",
    "params": {
        "quotas": [
            "pd.beepMode"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "pd.beepMode": 0
    }
}
            
        
Standby time settings(Standby duration before auto shutdown (min), 0: never shuts down, other values: specifies the standby duration when no buttons are pressed, the battery is not being charged, and no load is being powered (min))
            
{
    "id": 123,
    "sn": "R351ZFB4HF6L0030",
    "version": "1.0",
    "moduleType": 1,
    "operateType": "standbyTime",
    "params": {
        "standbyMin": 240
    }
}
            
        
            
{
    "sn": "R351ZFB4HF6L0030",
    "params": {
        "quotas": [
            "pd.standbyMin"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "pd.standbyMin": 240
    }
}
            
        
DC (USB) switch settings(0: off, 1: on)
            
{
    "id": 123,
    "sn": "R351ZFB4HF6L0030",
    "version": "1.0",
    "moduleType": 1,
    "operateType": "dcOutCfg",
    "params": {
        "enabled": 1
    }
}
            
        
            
{
    "sn": "R351ZFB4HF6L0030",
    "params": {
        "quotas": [
            "pd.dcOutState"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "pd.dcOutState": 0
    },
    "tid": ""
}
            
        
LCD screen settings(delayOff: screen timeout (s); brightLevel: brightness level, 0: off; 1: Level 1, 2: Level 2, 3: Level 3)
            
{
    "id": 123,
    "sn": "R351ZFB4HF6L0030",
    "version": "1.0",
    "moduleType": 1,
    "operateType": "lcdCfg",
    "params": {
        "delayOff": 12,
        "brighLevel": 2
    }
}
            
        
            
{
    "sn": "R351ZFB4HF6L0030",
    "params": {
        "quotas": [
            "pd.lcdOffSec",
            "pd.brightLevel"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "pd.brightLevel": 3,
        "pd.lcdOffSec": 12
    },
    "tid": ""
}
            
        
AC always on(enabled: 0: disabled, 1: enabled; minAcSoc: minimum SOC for enabling the new “AC Always On” feature)
            
{
    "id": 123,
    "version": "1.0",
    "sn": "R351ZFB4HF6L0030",
    "moduleType": 1,
    "operateType": "newAcAutoOnCfg",
    "params": {
        "enabled": 1,
        "minAcSoc": 21
    }
}
            
        
            
{
    "sn": "R351ZFB4HF6L0030",
    "params": {
        "quotas": [
            "pd.newAcAutoOnCfg",
            "pd.minAcSoc"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "pd.newAcAutoOnCfg": 1,
        "pd.minAcSoc": 21
    },
    "tid": ""
}
            
        
Energy statistics(isConfig: energy management, 0: enabled, 1: disabled; bpPowerSoc: backup reserve level; minDsgSoc: lower limit when discharging (not in use); minChgSoc: upper limit when charging (not in use))
            
{
    "id": 123,
    "version": "1.0",
    "sn": "R351ZFB4HF6L0030",
    "moduleType": 1,
    "operateType": "watthConfig",
    "params": {
        "isConfig": 0,
        "bpPowerSoc": 70,
        "minDsgSoc": 255,
        "minChgSoc": 255
    }
}
            
        
            
{
    "sn": "R351ZFB4HF6L0030",
    "params": {
        "quotas": [
            "pd.watchIsConfig",
            "pd.bpPowerSoc"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "pd.watchIsConfig": 0,
        "pd.bpPowerSoc": 70
    },
    "tid": ""
}
            
        
MPPT
Set Command	SetCmdRequest	GetCmdRequest	GetCmdResponse
Car charging switch settings(0: off, 1: on)
            
{
    "id": 123,
    "version": "1.0",
    "sn": "R351ZFB4HF6L0030",
    "moduleType": 5,
    "operateType": "mpptCar",
    "params": {
        "enabled": 1
    }
}
            
        
            
{
    "sn": "R351ZFB4HF6L0030",
    "params": {
        "quotas": [
            "mppt.carState"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "mppt.carState": 1
    },
    "tid": ""
}
            
        
PV charging type settings(chaType: 0: auto identification, 1: MPPT, 2: adapter, other values are invalid; chaType2: 0: auto identification, 1: MPPT, 2: adapter, other values are invalid)
            
{
    "id": 123,
    "version": "1.0",
    "sn": "R351ZFB4HF6L0030",
    "moduleType": 5,
    "operateType": "chaType",
    "params": {
        "chaType": 0,
        "chaType2": 0
    }
}
            
        
            
{
    "sn": "R351ZFB4HF6L0030",
    "params": {
        "quotas": [
            "mppt.cfgChgType",
            "mppt.pv2CfgChgType"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "mppt.cfgChgType": 1,
        "mppt.pv2CfgChgType": 1
    },
    "tid": ""
}
            
        
12 V DC (car charging) charging current settings(dcChgCfg: maximum DC charging current (mA), range: 4000 mA–8000 mA, default value: 8000 mA; dcChgCfg2: maximum DC charging current (mA), range: 4000 mA–8000 mA, default value: 8000 mA)
            
{
    "id": 123,
    "version": "1.0",
    "sn": "R351ZFB4HF6L0030",
    "moduleType": 5,
    "operateType": "dcChgCfg",
    "params": {
        "dcChgCfg": 4000,
        "dcChgCfg2": 4000
    }
}
            
        
            
{
    "sn": "R351ZFB4HF6L0030",
    "params": {
        "quotas": [
            "mppt.pv2DcChgCurrent",
            "mppt.dcChgCurrent"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "mppt.pv2DcChgCurrent": 4000,
        "mppt.dcChgCurrent": 4000
    },
    "tid": ""
}
            
        
CAR standby duration settings(Auto shutdown when there is no load, 0: never shuts down, default value: 12 x 60 mins, unit: minute)
            
{
    "id": 123,
    "version": "1.0",
    "sn": "R351ZFB4HF6L0030",
    "moduleType": 5,
    "operateType": "standbyTime",
    "params": {
        "standbyMin": 360
    }
}
            
        
            
{
    "sn": "R351ZFB4HF6L0030",
    "params": {
        "quotas": [
            "mppt.carStandbyMin"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "mppt.carStandbyMin": 306
    },
    "tid": ""
}
            
        
INV
Set Command	SetCmdRequest	GetCmdRequest	GetCmdResponse
AC discharging settings(enabled: AC switch, 0: off, 1: on; xboost: X-Boost switch, 0: off, 1: on; out_voltage: output voltage, read-only; out_freq: output frequency, 1: 50 Hz, 2: 60 Hz, other values are invalid)
            
{
    "id": 123,
    "version": "1.0",
    "sn": "R351ZFB4HF6L0030",
    "moduleType": 3,
    "operateType": "acOutCfg",
    "params": {
        "enabled": 0,
        "xboost": 0,
        "out_voltage": 4294967295,
        "out_freq": 2
    }
}
            
        
            
{
    "sn": "R351ZFB4HF6L0030",
    "params": {
        "quotas": [
            "inv.cfgAcEnabled",
            "inv.cfgAcXboost",
            "inv.cfgAcOutFreq"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "inv.cfgAcOutFreq": 2,
        "inv.cfgAcEnabled": 0,
        "inv.cfgAcXboost": 0
    },
    "tid": ""
}
            
        
AC charging settings(Maximum charging power for AC fast charging; slowChgWatts: maximum charging power for AC slow charging; chgPauseFlag: 0: AC charging in normal operation, 1: AC charging paused (not saved, restored by plugging))
            
{
    "id": 123,
    "version": "1.0",
    "sn": "R351ZFB4HF6L0030",
    "moduleType": 3,
    "operateType": "acChgCfg",
    "params": {
        "fastChgWatts": 2400,
        "slowChgWatts": 400,
        "chgPauseFlag": 0
    }
}
            
        
            
{
    "sn": "R351ZFB4HF6L0030",
    "params": {
        "quotas": [
            "inv.SlowChgWatts",
            "inv.FastChgWatts",
            "inv.chgPauseFlag"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "inv.chgPauseFlag": 0,
        "inv.SlowChgWatts": 400,
        "inv.FastChgWatts": 2400
    },
    "tid": ""
}
            
        
AC standby duration when there is no load(Auto shutdown when there is no load, 0: never shuts down, default value: 12 x 60 mins, unit: minute)
            
{
    "id": 123,
    "version": "1.0",
    "sn": "R351ZFB4HF6L0030",
    "moduleType": 3,
    "operateType": "standbyTime",
    "params": {
        "standbyMin": 120
    }
}
            
        
            
{
    "sn": "R351ZFB4HF6L0030",
    "params": {
        "quotas": [
            "inv.standbyMin"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "inv.standbyMin": 120
    },
    "tid": ""
}
            
        
BMS
Set Command	SetCmdRequest	GetCmdRequest	GetCmdResponse
UPS settings
            
{
    "id": 123,
    "version": "1.0",
    "sn": "R351ZFB4HF6L0030",
    "moduleType": 2,
    "operateType": "upsConfig",
    "params": {
        "maxChgSoc": 90
    }
}
            
        
            
{
    "sn": "R351ZFB4HF6L0030",
    "params": {
        "quotas": [
            "bms_emsStatus.maxChargeSoc"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "bms_emsStatus.maxChargeSoc": 91
    },
    "tid": ""
}
            
        
SOC lower limit when discharging
            
{
    "id": 123,
    "version": "1.0",
    "sn": "R351ZFB4HF6L0030",
    "moduleType": 2,
    "operateType": "dsgCfg",
    "params": {
        "minDsgSoc": 100
    }
}
            
        
            
{
    "sn": "R351ZFB4HF6L0030",
    "params": {
        "quotas": [
            "bms_emsStatus.minDsgSoc"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "bms_emsStatus.minDsgSoc": 100
    },
    "tid": ""
}
            
        
SOC that triggers EMS to turn on Smart Generator
            
{
    "id": 123,
    "version": "1.0",
    "sn": "R351ZFB4HF6L0030",
    "moduleType": 2,
    "operateType": "openOilSoc",
    "params": {
        "openOilSoc": 102
    }
}
            
        
            
{
    "sn": "R351ZFB4HF6L0030",
    "params": {
        "quotas": [
            "bms_emsStatus.minOpenOilEb"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "bms_emsStatus.minOpenOilEb": 103
    },
    "tid": ""
}
            
        
SOC that triggers EMS to turn off Smart Generator
            
{
    "id": 123,
    "version": "1.0",
    "sn": "R351ZFB4HF6L0030",
    "moduleType": 2,
    "operateType": "closeOilSoc",
    "params": {
        "closeOilSoc": 80
    }
}
            
        
            
{
    "sn": "R351ZFB4HF6L0030",
    "params": {
        "quotas": [
            "bms_emsStatus.maxCloseOilEb"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "bms_emsStatus.maxCloseOilEb": 80
    },
    "tid": ""
}
            
        
GetAllQuotaResponse
How to transfer request parameters by this HTTP API.
GET: /iot-open/sign/device/quota/all: GetAllQuotaResponse
Field	Field's Type	Description
bms_bmsStatus.hwVersion
int
Hardware version, for example, V0.1.1; 6 bytes
mppt.faultCode
int
Error code: byte0: mppt_fault; byte1: car_fault; byte2: dc24v_fault
mppt.dc24vState
int
DCDC24V switch status: 0: off; 1: on
pd.wattsInSum
int
Total input power (W)
bms_emsStatus.maxChargeSoc
int
Maximum charging SOC
pd.wifiVer
int
Wi-Fi version
inv.cfgAcWorkMode
int
AC charging mode: 0: full power; 1: mute
bms_bmsStatus.designCap
int
Design capacity (mAh)
bms_bmsStatus.temp
int
Temperature (℃)
bms_bmsStatus.f32ShowSoc
int
Battery level SOC_float
pd.bpPowerSoc
int
Backup reserve percentage
bms_bmsStatus.outputWatts
int
Output power
pd.beepMode
int
PD BEEP mode: 0: Normal; 1: Mute
mppt.pv2ChgPauseFlag
int
PV2 charging pause flag bit: 1: charging stopped
pd.typec2Watts
int
Type-C 2 output power (W)
inv.outputWatts
int
Discharging power (W)
bms_bmsStatus.vol
int
Voltage (mV)
pd.pv1ChargeWatts
int
PV1 power
inv.invOutFreq
int
Inverter output frequency (Hz): 50 or 60;
mppt.inAmp
int
PV1 input current (mA)
bms_emsStatus.bmsIsConnt
int
BMS online signal: BIT0: hardware online signal; BIT1: software online signal
bms_bmsStatus.maxVolDiff
int
Cell voltage difference
mppt.pv2ChgState
int
PV2 charging status: 0: disabled; 1: charging; 2: standby (DC charging stopped during AC charging)
pd.XT150Watts1
int
XT150 No. 1 interface power (W): -: output; +: input
bms_emsStatus.dsgCmd
int
Discharge command
bms_bmsStatus.fullCap
int
Full capacity (mAh)
mppt.inVol
int
PV1 input voltage (mV)
pd.XT150Watts2
int
XT150 No. 2 interface power (W): -: output; +: input
bms_emsStatus.chgVol
int
Charging voltage
bms_bmsStatus.balanceState
int
Balance status
pd.icoBytes
int
ICO flag bit
inv.fanState
int
Fan status: 0: disabled; 1: Level 1; 2: Level 2; 3: Level 3
inv.acChgRatedPower
int
AC charging power
pd.usb1Watts
int
Common USB1 output power (W)
inv.cfgAcXboost
int
X-Boost switch: 0: off; 1: on
inv.outTemp
int
INV temperature (℃)
mppt.res
int
Reserve 4 bytes
mppt.dcdc12vAmp
int
Anderson output current: The actual current is amplified 100 times. This parameter is valid only for DELTA Pro.
inv.invOutVol
int
Inverter actual output voltage (mV)
bms_bmsStatus.errCode
int
BMS error code
mppt.pv2MpptTemp
int
PV2 input power: The actual voltage is amplified 10 times.
bms_emsStatus.chgAmp
int
Charging current
inv.inputWatts
int
Charging power (W)
bms_emsStatus.chgState
int
Charging state: 0: disabled; 1: CC 2: CV 3: UPS 4: PARA 0x55: Charging error
bms_bmsStatus.inputWatts
int
Input power
mppt.pv2CfgChgType
int
Charging type configured for PV2: This parameter is valid when pv2_xt60_chg_type is 0. 0: auto; 1: MPPT; 2: adapter
pd.watchIsConfig
int
Power management configuration: 0: disable; 1: enable
bms_emsStatus.openBmsIdx
int
BMS enable index: bit0: host (#1); bit1: #2; bit2: #3
pd.typec2Temp
int
Type-C 2 temperature (℃)
pd.carUsedTime
int
CAR port use time (s)
pd.typec1Watts
int
Type-C 1 output power (W)
pd.chgDsgState
int
Charging/discharging status on screen: 1: discharging; 2: charging
inv.chgPauseFlag
int
AC charging pause flag: 1: charging stopped
inv.acInFreq
int
Inverter input frequency (Hz)
mppt.carStandbyMin
int
Auto shutdown when there is no load: 0: never shut down; default value: 12 x 60 min, unit: minute
pd.pv2ChargeType
int
PV2 charging type: 0: none; 1: adapter; 2: solar panel
pd.otherKitState
int
GNP:bit0-1
pd.soc
int
Show SOC
inv.invOutAmp
int
Inverter output current (mA)
bms_emsStatus.fanLevel
int
Fan level
mppt.carOutVol
int
Car charging output voltage (mV): The actual voltage is amplified 10 times.
inv.standbyMin
int
Auto shutdown when there is no load: 0: never shut down, default value: 12 x 60 min, unit: minute
mppt.pv2ChgType
int
Actual PV2 charging type: 0: null; 1: adapter (adapter/DC); 2: MPPT (solar power); 3: AC (mains supply); 4: gas; 5: wind
inv.dcInVol
int
DC input voltage (mV)
pd.acAutoPause
int
Whether the new AC Always On feature suspends enabling AC due to manual operations
pd.dsgPowerDC
int
Cumulative DC power discharged for PD (Wh)
inv.SlowChgWatts
int
Maximum charging power for AC slow charging (W): DELTA2000 (100 W–700 W); DELTA MINI (TBD); DELTA3000 (TBD)
inv.dcInAmp
int
DC input current (mA)
mppt.carOutAmp
int
Car charging output current (mA): The actual current is amplified 100 times.
pd.typecUsedTime
int
Type-C use time (s)
inv.prBalanceMode
int
0: current balance; 1: voltage balance
bms_bmsStatus.remainCap
int
Remaining capacity (mAh)
pd.brightLevel
int
PD LCD brightness level: 0–3
inv.dcInTemp
int
DC temperature (℃)
mppt.pv2InVol
int
PV2 input voltage: The actual voltage is amplified 10 times.
pd.acAutoOnCfg
int
AC Always On: 0: none; 1: enable AC Always On
bms_emsStatus.maxAvailNum
int
Maximum available quantity
mppt.dcdc12vVol
int
Anderson output voltage: The actual voltage is amplified 10 times. This parameter is valid only for DELTA Pro.
pd.newAcAutoOnCfg
int
New AC Always On configuration: 0: disable; 1: enable
bms_emsStatus.maxCloseOilEb
int
SOC for turning off Smart Generator
pd.minAcSoc
int
Minimum SOC for enabling the new AC Always On feature
pd.wattsOutSum
int
Total output power (W)
mppt.carOutWatts
int
Car charging output power (W): The actual power is amplified 10 times.
pd.relaySwitchCnt
int
Number of relay disconnections
bms_bmsStatus.recv
int
Reserved bytes
mppt.outVol
int
PV output voltage (mV): The actual voltage is amplified 10 times.
bms_emsStatus.f32LcdShowSoc
int
SOC value displayed on LCD: used for showing the SOC value with a decimal point
inv.cfgAcEnabled
int
AC switch: 0: off; 1: on
bms_emsStatus.paraVolMax
int
Maximum voltage when two devices work in parallel
mppt.chgType
int
Actual PV1 charging type: 0: null; 1: adapter (adapter/DC); 2: MPPT (solar power); 3: AC (mains supply); 4: gas; 5: wind
pd.pv1ChargeType
int
PV1 charging type: 0: none; 1: adapter; 2: solar panel
bms_bmsStatus.bmsFault
int
BMS permanent fault
inv.acDipSwitch
int
AC fast/slow charging dip switch: 0: unknown; 1: fast charging mode; 2: slow charging mode
mppt.cfgChgType
int
Charging type configured for PV1: This parameter is valid when xt60_chg_type is 0. 0: auto; 1: MPPT; 2: adapter
inv.acPassbyAutoEn
int
AC bypass auto start: 0: disable; 1: enable
bms_emsStatus.paraVolMin
int
Minimum voltage when two devices work in parallel
inv.dischargeType
int
Discharging type: 1: AC discharging; 2: PR; 3: BC
mppt.chgState
int
PV1 charging status: 0: disabled; 1: charging; 2: standby (DC charging stopped during AC charging)
pd.carState
int
PD CAR button status: 0: off; 1: on
pd.invUsedTime
int
Inverter use time (s)
bms_emsStatus.bmsWarState
int
BMS warning state: bit0: hi_temp; bit1: low_temp; bit2: overload; bit3: chg_flag
mppt.carState
int
Car charging switch state: 0: off; 1: on
pd.typec1Temp
int
Type-C 1 temperature (℃)
bms_bmsStatus.sysVer
int
BMS version
pd.dcInUsedTime
int
DC charging time (s)
mppt.carTemp
int
Car charging temperature (℃)
pd.model
int
PD product model
bms_bmsStatus.minCellVol
int
Minimum cell voltage
mppt.outWatts
int
PV output power (W): The actual power is amplified 10 times.
pd.wifiAutoRcvy
int
The Wi-Fi network is automatically restored to the last mode after being powering on.
pd.remainTime
int
PD available time (min) > 0: time remaining before full charging; PD available time (min) < 0: time remaining before full discharging
bms_bmsStatus.maxCellVol
int
Maximum cell voltage
bms_bmsStatus.type
int
BMS type: 1: lithium battery; 2: oil-powered
bms_bmsStatus.maxCellTemp
int
Maximum cell temperature
mppt.outAmp
int
PV output voltage (mA): The actual current is amplified 100 times.
bms_bmsStatus.cellId
int
Cell material LI/LFP/LA, battery capacity type: 1: 2.5 Ah per battery; 2: 2 Ah per battery
bms_bmsStatus.cellTemp
int
Cell temperature
bms_bmsStatus.minMosTemp
int
Minimum MOS temperature
mppt.chgPauseFlag
int
PV charging pause flag bit: 1: charging stopped
bms_emsStatus.minOpenOilEb
int
SOC for turning on Smart Generator
pd.hysteresisAdd
int
Hysteresis SOC
inv.chargerType
int
Charger type: 1: AC charging; 2: DC adapter charging; 3: solar charging; 4: CC; 5: BC
pd.chgSunPower
int
Cumulative solar power charged for PD (Wh)
pd.carTemp
int
PD CAR temperature (℃)
bms_bmsStatus.cellVol
int
Cell voltage
bms_bmsStatus.bqSysStatReg
int
BQ hardware protection register
inv.acInAmp
int
Inverter input current (mA)
pd.pvChargePrioSet
int
Prioritize solar power usage: 1: prioritize solar power usage
bms_emsStatus.chgRemainTime
int
Remaining charging time (min)
bms_bmsStatus.openBmsIdx
int
Battery pack enabling status
pd.dsgPowerAC
int
Cumulative AC power discharged (Wh)
pd.qcUsb2Watts
int
qc_usb2 output power (W)
bms_bmsStatus.num
int
BMS No.: 0–2
pd.wireWatts
int
Wireless charging output power (W)
bms_bmsStatus.mosState
int
Charging/discharging MOS status
mppt.pv2InAmp
int
PV2 input current: The current voltage is amplified 100 times.
pd.chgPowerAC
int
Cumulative AC power charged for PD (Wh) (wall socket)
pd.lcdOffSec
int
PD LCD screen-off duration: 0: never off (unit: second)
bms_bmsStatus.soc
int
Battery level
inv.acInVol
int
Inverter input voltage (mV)
inv.FastChgWatts
int
Maximum charging power for AC fast charging (W): DELTA2000 (100 W–1400 W); DELTA MINI (TBD); DELTA3000 (TBD)
mppt.pv2Xt60ChgType
int
PV2 XT60 charging type: 0: not detected; 1: MPPT; 2: adapter
pd.sysVer
int
PD system version
mppt.pv2DcChgCurrent
int
PV2 DC current
mppt.dc24vTemp
int
DCDC24V temperature (℃)
pd.invInWatts
int
Inverter input power
bms_emsStatus.chgCmd
int
Charge command
bms_bmsStatus.tagChgAmp
int
Target charging current
bms_bmsStatus.maxMosTemp
int
Maximum MOS temperature
pd.qcUsb1Watts
int
qc_usb1 output power (W)
pd.reserved
int
Reserve 2 bytes for PD
mppt.pv2InWatts
int
PV2 input power: The actual voltage is amplified 10 times.
bms_bmsStatus.minCellTemp
int
Minimum cell temperature
pd.chgPowerDC
int
Cumulative DC power charged for PD (Wh) (adapter)
mppt.swVer
int
MPPT version number
pd.standbyMin
int
PD standby duration before auto shutdown (min): 0: never go into standby; maximum value: 5999 minutes (99 hours and 59 minutes)
mppt.x60ChgType
int
PV1 XT60 charging type: 0: not detected; 1: MPPT; 2: adapter
inv.cfgAcOutFreq
int
Output frequency configured for the inverter (Hz)
bms_bmsStatus.soh
int
Health status
inv.errCode
int
INV error code
bms_emsStatus.openUpsFlag
int
UPS mode enable flag
mppt.dcdc12vWatts
int
Anderson output power: The actual current is amplified 100 times. This parameter is valid only for DELTA Pro.
bms_emsStatus.minDsgSoc
int
Minimum discharging SOC
pd.usbqcUsedTime
int
USB QC use time (s)
bms_bmsStatus.remainTime
int
Time remaining
pd.dcOutState
int
PD DC button status: 0: off; 1: on
mppt.inWatts
int
PV1 input power (W)
pd.bmsKitState
int
bms_kit_state[0]: upgradeable interface; bms_kit_state[1]: non-upgradeable interface
bms_emsStatus.emsIsNormalFlag
int
0: sleep 1: normal
pd.usbUsedTime
int
USB use time (s)
pd.mpptUsedTime
int
MPPT use time (s)
inv.reserved
int
Reserve 8 bytes
mppt.mpptTemp
int
PV1 MPPT temperature (℃)
pd.wifiRssi
int
Wi-Fi signal strength
bms_bmsStatus.amp
int
Current (mA)
inv.invType
int
PSDR model code (corresponds to dip Switch and high-low voltage switch)
bms_emsStatus.lcdShowSoc
int
SOC value displayed on LCD
inv.cfgAcOutVol
int
Output voltage configured for the inverter (V)
bms_emsStatus.bmsModel
int
BMS product model
pd.errCode
int
PD error code
pd.pv2ChargeWatts
int
PV2 power
pd.carWatts
int
CAR output power (W)
pd.usb2Watts
int
Common USB2 output power for PD (W)
mppt.dcChgCurrent
int
Maximum DC charging current (mA)
pd.invOutWatts
int
Inverter output power
bms_emsStatus.dsgRemainTime
int
Remaining discharging time (min)
inv.sysVer
int
INV system version
Example
{
    "code": "0",
    "message": "Success",
    "data": {
        "bms_emsStatus.dsgCmd": 1,
        "bms_bmsStatus.maxVolDiff": 4,
        "bms_bmsStatus.balanceState": 0,
        "inv.acChgRatedPower": 2400,
        "pd.usb1Watts": 0,
        "inv.cfgAcXboost": 1,
        "inv.outTemp": 35,
        "mppt.dcdc12vAmp": 0,
        "bms_emsStatus.chgAmp": 1000,
        "mppt.pv2MpptTemp": 34,
        "inv.inputWatts": 0,
        "bms_emsStatus.chgState": 3,
        "bms_emsStatus.openBmsIdx": 1,
        "mppt.pv2CfgChgType": 1,
        "pd.typec2Temp": 30,
        "pd.chgDsgState": 1,
        "pd.typec1Watts": 0,
        "mppt.carStandbyMin": 306,
        "pd.soc": 83,
        "inv.invOutAmp": 0,
        "bms_emsStatus.fanLevel": 0,
        "inv.standbyMin": 0,
        "mppt.pv2ChgType": 0,
        "pd.acAutoPause": 1
    }
}
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
PD
Set Command	SetTopic's ParamInfo	SetReplyTopic's ParamInfo	Indicator
Silent mode settings(0: disabled, 1: enabled)
            
{
    "id": 123,
    "version": "1.0",
    "moduleType": 1,
    "operateType": "quietCfg",
    "params": {
        "enabled": 0
    }
}
            
        
            
{
    "id": 123,
    "version": "1.0",
    "moduleType": 1,
    "time": 5228671,
    "code": 0,
    "operateType": "quietCfg",
    "data": {
        "ack": 0
    }
}
            
        
pd.beepMode
Standby time settings(Standby duration before auto shutdown (min), 0: never shuts down, other values: specifies the standby duration when no buttons are pressed, the battery is not being charged, and no load is being powered (min))
            
{
    "id": 123,
    "version": "1.0",
    "moduleType": 1,
    "operateType": "standbyTime",
    "params": {
        "standbyMin": 240
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
            
        
pd.standbyMin
DC (USB) switch settings(0: off, 1: on)
            
{
    "id": 123,
    "version": "1.0",
    "moduleType": 1,
    "operateType": "dcOutCfg",
    "params": {
        "enabled": 1
    }
}
            
        
            
{
    "id": 123,
    "version": "1.0",
    "moduleType": 1,
    "time": 1209801,
    "code": 0,
    "operateType": "dcOutCfg",
    "data": {
        "ack": 0
    }
}
            
        
pd.dcOutState
LCD screen settings(delayOff: screen timeout (s); brightLevel: brightness level, 0: off; 1: Level 1, 2: Level 2, 3: Level 3)
            
{
    "id": 123,
    "version": "1.0",
    "moduleType": 1,
    "operateType": "lcdCfg",
    "params": {
        "delayOff": 12,
        "brighLevel": 2
    }
}
            
        
            
{
    "id": 123,
    "version": "1.0",
    "moduleType": 1,
    "time": 3365211,
    "code": 0,
    "operateType": "lcdCfg",
    "data": {
        "ack": 0
    }
}
            
        
pd.lcdOffSecpd.brightLevel
AC always on(enabled: 0: disabled, 1: enabled; minAcSoc: minimum SOC for enabling the new “AC Always On” feature)
            
{
    "id": 123,
    "version": "1.0",
    "moduleType": 1,
    "operateType": "newAcAutoOnCfg",
    "params": {
        "enabled": 1,
        "minAcSoc": 20
    }
}
            
        
            
{
    "id": 123,
    "version": "1.0",
    "moduleType": 1,
    "time": 6139661,
    "code": 0,
    "operateType": "newAcAutoOnCfg",
    "data": {
        "ack": 0
    }
}
            
        
pd.newAcAutoOnCfgpd.minAcSoc
Energy statistics(isConfig: energy management, 0: enabled, 1: disabled; bpPowerSoc: backup reserve level; minDsgSoc: lower limit when discharging (not in use); minChgSoc: upper limit when charging (not in use))
            
{
    "id": 123,
    "version": "1.0",
    "moduleType": 1,
    "operateType": "watthConfig",
    "params": {
        "isConfig": 0,
        "bpPowerSoc": 70,
        "minDsgSoc": 255,
        "minChgSoc": 255
    }
}
            
        
            
{
    "id": 123,
    "version": "1.0",
    "moduleType": 1,
    "time": 6466751,
    "code": 0,
    "operateType": "watthConfig",
    "data": {
        "ack": 0
    }
}
            
        
pd.watchIsConfigpd.bpPowerSoc
MPPT
Set Command	SetTopic's ParamInfo	SetReplyTopic's ParamInfo	Observation Indicator
Car charging switch settings(0: off ,1: on)
            
{
    "id": 123,
    "version": "1.0",
    "moduleType": 5,
    "operateType": "mpptCar",
    "params": {
        "enabled": 1
    }
}
            
        
            
{
    "id": 123,
    "version": "1.0",
    "moduleType": 5,
    "time": 7888871,
    "code": 0,
    "operateType": "mpptCar",
    "data": {
        "ack": 0
    }
}
            
        
mppt.carState
PV charging type settings(chaType: 0: auto identification, 1: MPPT, 2: adapter, other values are invalid; chaType2: 0: auto identification, 1: MPPT, 2: adapter, other values are invalid)
            
{
    "id": 123,
    "version": "1.0",
    "moduleType": 5,
    "operateType": "chaType",
    "params": {
        "chaType": 1,
        "chaType2": 1
    }
}
            
        
            
{
    "id": 123,
    "version": "1.0",
    "moduleType": 5,
    "time": 8410091,
    "code": 0,
    "operateType": "chaType",
    "data": {
        "ack": 0
    }
}
            
        
mppt.cfgChgType
mppt.pv2CfgChgType
12 V DC (car charging) charging current (set)(dcChgCfg: maximum DC charging current (mA), range: 4000 mA–8000 mA, default value: 8000 mA; dcChgCfg2: maximum DC charging current (mA), range: 4000 mA–8000 mA, default value: 8000 mA)
            
{
    "id": 123,
    "version": "1.0",
    "moduleType": 5,
    "operateType": "dcChgCfg",
    "params": {
        "dcChgCfg": 5000,
        "dcChgCfg2": 5000
    }
}
            
        
            
{
    "id": 123,
    "version": "1.0",
    "moduleType": 5,
    "time": 9119011,
    "code": 0,
    "operateType": "dcChgCfg",
    "data": {
        "ack": 0
    }
}
            
        
mppt.pv2DcChgCurrent
mppt.dcChgCurrent
12 V DC (car charging) charging current (get)
            
{
    "id": 123,
    "version": "1.0",
    "moduleType": 5,
    "operateType": "dcChgGet",
    "params": {}
}
            
        
            
{
    "id": 123,
    "version": "1.0",
    "moduleType": 5,
    "time": 9307141,
    "code": 0,
    "operateType": "dcChgGet",
    "data": {
        "curDcChgCfg": 5000,
        "curDcChgCfg2": 5000
    }
}
            
        
mppt.pv2DcChgCurrent
mppt.dcChgCurrent
CAR standby duration settings(Auto shutdown when there is no load, 0: never shuts down, default value: 12 x 60 mins, unit: minute)
            
{
    "id": 123,
    "version": "1.0",
    "moduleType": 5,
    "operateType": "standbyTime",
    "params": {
        "standbyMin": 304
    }
}
            
        
            
{
    "id": 123,
    "version": "1.0",
    "moduleType": 5,
    "time": 9530751,
    "code": 0,
    "operateType": "standbyTime",
    "data": {
        "ack": 0
    }
}
            
        
mppt.carStandbyMin
INV
Set Command	SetTopic's ParamInfo	SetReplyTopic's ParamInfo	Observation Indicator
AC discharging settings(enabled: AC switch, 0: off, 1: on; xboost: X-Boost switch, 0: off, 1: on; out_voltage: output voltage, read-only; out_freq: output frequency, 1: 50 Hz, 2: 60 Hz, other values are invalid)
            
{
    "id": "399751272",
    "version": "1.0",
    "moduleType": 3,
    "operateType": "acOutCfg",
    "params": {
        "out_voltage": 4294967295,
        "out_freq": 1,
        "xboost": 1,
        "enabled": 1
    }
}
            
        
            
{
    "id": 123,
    "version": "1.0",
    "moduleType": 3,
    "time": 10030071,
    "code": 0,
    "operateType": "acOutCfg",
    "data": {
        "ack": 0
    }
}
            
        
inv.cfgAcEnabled
inv.cfgAcXboost
inv.cfgAcOutFreq
AC charging settings(Maximum charging power for AC fast charging; slowChgWatts: maximum charging power for AC slow charging; chgPauseFlag: 0: AC charging in normal operation, 1: AC charging paused (not saved, restored by plugging))
            
{
    "id": 123,
    "version": "1.0",
    "moduleType": 3,
    "operateType": "acChgCfg",
    "params": {
        "fastChgWatts": 2400,
        "slowChgWatts": 500,
        "chgPauseFlag": 0
    }
}
            
        
            
{
    "id": 123,
    "version": "1.0",
    "moduleType": 3,
    "time": 24558341,
    "code": 0,
    "operateType": "acChgCfg",
    "data": {
        "ack": 0
    }
}
            
        
inv.SlowChgWatts
AC standby duration when there is no load(Auto shutdown when there is no load, 0: never shuts down, default value: 12 x 60 mins, unit: minute)
            
{
    "id": 123,
    "version": "1.0",
    "moduleType": 3,
    "operateType": "standbyTime",
    "params": {
        "standbyMin": 120
    }
}
            
        
            
{
    "id": 123,
    "version": "1.0",
    "moduleType": 3,
    "time": 25134331,
    "code": 0,
    "operateType": "standbyTime",
    "data": {
        "ack": 0
    }
}
            
        
inv.standbyMin
BMS
Set Command	SetTopic's ParamInfo	SetReplyTopic's ParamInfo	Observation Indicator
UPS settings
            
{
    "id": 123,
    "version": "1.0",
    "moduleType": 2,
    "operateType": "upsConfig",
    "params": {
        "maxChgSoc": 90
    }
}
            
        
            
{
    "id": 123,
    "version": "1.0",
    "moduleType": 2,
    "time": 75083481,
    "code": 0,
    "operateType": "upsConfig",
    "data": {
        "ack": 0
    }
}
            
        
bms_emsStatus.maxChargeSoc
SOC lower limit settings when discharging
            
{
    "id": 123,
    "version": "1.0",
    "moduleType": 2,
    "operateType": "dsgCfg",
    "params": {
        "minDsgSoc": 100
    }
}
            
        
            
{
    "id": 123,
    "version": "1.0",
    "moduleType": 2,
    "time": 75594951,
    "code": 0,
    "operateType": "dsgCfg",
    "data": {
        "ack": 0
    }
}
            
        
bms_emsStatus.minDsgSoc
SOC that triggers EMS to turn on Smart Generator
            
{
    "id": 123,
    "version": "1.0",
    "moduleType": 2,
    "operateType": "openOilSoc",
    "params": {
        "openOilSoc": 102
    }
}
            
        
            
{
    "id": 123,
    "version": "1.0",
    "moduleType": 2,
    "time": 75781121,
    "code": 0,
    "operateType": "openOilSoc",
    "data": {
        "ack": 0
    }
}
            
        
bms_emsStatus.minOpenOilEb
SOC that triggers EMS to turn off Smart Generator
            
{
    "id": 123,
    "version": "1.0",
    "moduleType": 2,
    "operateType": "closeOilSoc",
    "params": {
        "closeOilSoc": 107
    }
}
            
        
            
{
    "id": 123,
    "version": "1.0",
    "moduleType": 2,
    "time": 76026051,
    "code": 0,
    "operateType": "closeOilSoc",
    "data": {
        "ack": 0
    }
}
            
        
bms_emsStatus.maxCloseOilEb
Report Device Quota
Usage of Topic	Topic	From	To
Report device quota
/open/${certificateAccount}/${sn}/quota
device
app
Please see HTTP GetAllQuotaResponse and Set & Set Reply for the fields definition.
Example
PD
{
    "id": 46551,
    "version": "1.0",
    "time": 15483241,
    "moduleType": 1,
    "needAck": 0,
    "typeCode": "pdStatus",
    "params": {
        "model": 1,
        "errCode": 0,
        "sysVer": 16975436,
        "wifiVer": 0,
        "wifiAutoRcvy": 0,
        "soc": 83,
        "wattsOutSum": 0,
        "wattsInSum": 0,
        "remainTime": 5999,
        "beepMode": 0,
        "dcOutState": 0,
        "usb1Watts": 0,
        "usb2Watts": 0,
        "qcUsb1Watts": 0,
        "qcUsb2Watts": 0,
        "typec1Watts": 0,
        "typec2Watts": 0,
        "typec1Temp": 30,
        "typec2Temp": 30,
        "carState": 0,
        "carWatts": 0,
        "carTemp": 35,
        "standbyMin": 300,
        "lcdOffSec": 12,
        "brightLevel": 2,
        "chgPowerDC": 5174,
        "chgSunPower": 0,
        "chgPowerAC": 7520,
        "dsgPowerDC": 149,
        "dsgPowerAC": 6140,
        "usbUsedTime": 4308,
        "usbqcUsedTime": 30348,
        "typecUsedTime": 1400,
        "carUsedTime": 40770,
        "invUsedTime": 312272,
        "dcInUsedTime": 23201,
        "mpptUsedTime": 0,
        "bmsKitState": [
            0,
            0
        ],
        "otherKitState": 0,
        "reserved": [
            0,
            0
        ],
        "chgDsgState": 1,
        "wifiRssi": 0,
        "wireWatts": 0,
        "icoBytes": [
            0,
            0,
            128,
            0,
            128,
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
        "XT150Watts1": 0,
        "XT150Watts2": 0,
        "invInWatts": 0,
        "invOutWatts": 0,
        "pv1ChargeType": 0,
        "pv1ChargeWatts": 0,
        "pv2ChargeType": 0,
        "pv2ChargeWatts": 0,
        "pvChargePrioSet": 0,
        "acAutoOnCfg": 0,
        "newAcAutoOnCfg": 1,
        "minAcSoc": 11,
        "acAutoPause": 1,
        "watchIsConfig": 0,
        "bpPowerSoc": 83,
        "hysteresisAdd": 5,
        "relaySwitchCnt": 0
    }
}
MPPT
{
    "id": 58426,
    "version": "1.0",
    "time": 15483171,
    "moduleType": 5,
    "needAck": 0,
    "typeCode": "mpptStatus",
    "params": {
        "faultCode": 0,
        "swVer": 83886156,
        "inVol": 17,
        "inAmp": 0,
        "inWatts": 0,
        "outVol": 51762,
        "outAmp": 139,
        "outWatts": 7,
        "mpptTemp": 35,
        "x60ChgType": 0,
        "cfgChgType": 1,
        "chgType": 0,
        "chgState": 0,
        "dcdc12vVol": 0,
        "dcdc12vAmp": 0,
        "dcdc12vWatts": 0,
        "carOutVol": 0,
        "carOutAmp": 29,
        "carOutWatts": 0,
        "carTemp": 35,
        "carState": 0,
        "dc24vTemp": 34,
        "dc24vState": 0,
        "chgPauseFlag": 0,
        "dcChgCurrent": 4000,
        "pv2InVol": 15,
        "pv2InAmp": 0,
        "pv2InWatts": 0,
        "pv2MpptTemp": 35,
        "pv2Xt60ChgType": 0,
        "pv2CfgChgType": 1,
        "pv2ChgType": 0,
        "pv2ChgState": 0,
        "pv2ChgPauseFlag": 0,
        "carStandbyMin": 306,
        "pv2DcChgCurrent": 4000,
        "res": [
            0,
            0,
            0,
            0
        ]
    }
}
INV
{
    "id": 184642,
    "version": "1.0",
    "time": 15484741,
    "moduleType": 3,
    "needAck": 0,
    "typeCode": "invStatus",
    "params": {
        "errCode": 0,
        "sysVer": 33554497,
        "chargerType": 255,
        "inputWatts": 0,
        "outputWatts": 0,
        "invType": 8,
        "invOutVol": 0,
        "invOutAmp": 0,
        "invOutFreq": 0,
        "acInVol": 234338,
        "acInAmp": 0,
        "acInFreq": 50,
        "outTemp": 35,
        "dcInVol": 0,
        "dcInAmp": 0,
        "dcInTemp": 35,
        "fanState": 0,
        "cfgAcEnabled": 0,
        "cfgAcXboost": 1,
        "cfgAcOutVol": 230000,
        "cfgAcOutFreq": 1,
        "cfgAcWorkMode": 0,
        "chgPauseFlag": 0,
        "acDipSwitch": 1,
        "FastChgWatts": 2400,
        "SlowChgWatts": 600,
        "standbyMin": 0,
        "dischargeType": 0,
        "acPassbyAutoEn": 0,
        "prBalanceMode": 0,
        "acChgRatedPower": 2400,
        "reserved": [
            0,
            0,
            0,
            0,
            0,
            0
        ]
    }
}
BMS-bmsStatus
{
    "id": 260206,
    "version": "1.0",
    "time": 15483371,
    "moduleType": 2,
    "needAck": 0,
    "typeCode": "bmsStatus",
    "params": {
        "num": 0,
        "type": 1,
        "cellId": 2,
        "errCode": 23,
        "sysVer": 33620236,
        "soc": 83,
        "vol": 53194,
        "amp": -40,
        "temp": 36,
        "openBmsIdx": 1,
        "designCap": 40000,
        "remainCap": 32480,
        "fullCap": 39280,
        "soh": 100,
        "maxCellVol": 3335,
        "minCellVol": 3330,
        "maxCellTemp": 36,
        "minCellTemp": 34,
        "maxMosTemp": 35,
        "minMosTemp": 25,
        "bmsFault": 0,
        "bqSysStatReg": 0,
        "tagChgAmp": 40000,
        "f32ShowSoc": 82.6,
        "inputWatts": 0,
        "outputWatts": 0,
        "remainTime": 0,
        "mosState": 2,
        "balanceState": 0,
        "maxVolDiff": 5,
        "cellVol": [
            3334,
            3333,
            3334,
            3334,
            3333,
            3333,
            3333,
            3333,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
        ],
        "cellTemp": [
            35,
            34,
            36,
            36,
            34
        ],
        "hwVersion": [
            86,
            48,
            46,
            49,
            46,
            50
        ],
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
            0
        ]
    }
}
BMS-emsStatus
{
    "id": 143197,
    "version": "1.0",
    "time": 15483351,
    "moduleType": 2,
    "needAck": 0,
    "typeCode": "emsStatus",
    "params": {
        "chgState": 3,
        "chgCmd": 1,
        "dsgCmd": 1,
        "chgVol": 42000,
        "chgAmp": 1000,
        "fanLevel": 0,
        "maxChargeSoc": 83,
        "bmsModel": 1,
        "lcdShowSoc": 83,
        "openUpsFlag": 1,
        "bmsWarState": 0,
        "chgRemainTime": 5999,
        "dsgRemainTime": 5999,
        "emsIsNormalFlag": 1,
        "f32LcdShowSoc": 82.6,
        "bmsIsConnt": [
            3,
            0,
            0
        ],
        "maxAvailNum": 1,
        "openBmsIdx": 1,
        "paraVolMin": 52195,
        "paraVolMax": 54195,
        "minDsgSoc": 6,
        "minOpenOilEb": 103,
        "maxCloseOilEb": 108
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
Device online or not
0: No, 1: Yes