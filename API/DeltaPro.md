HTTP communication mode

Set & Get Quota

How to transfer request parameters by these two HTTP API.
PUT: /iot-open/sign/device/quota: SetCmdRequest
GET: /iot-open/sign/device/quota: Get cmdRequest, GetCmdResponse
Set Command	SetCmdRequest	GetCmdRequest	GetCmdResponse
Setting the X-Boost switch
                
"params":{
    "cmdSet": 32,
    "id": 66,
    "enabled": 0,
    "xboost": 0
}
                
            
                
"params":{
    "cmdSet": 32,
    "id": 66,
    "quotas": [
        "inv.cfgAcEnabled",
        "inv.cfgAcXboost"
    ]
}
                
            
                
"data":{
    "inv.cfgAcEnabled": 0,
    "inv.cfgAcXboost": 0
}
                
            
Setting the car charger switch
                
"params":{
    "cmdSet": 32,
    "id": 81,
    "enabled": 1
}
                
            
                
"params":{
    "cmdSet": 32,
    "id": 81,
    "quotas": [
        "mppt.carState"
    ]
}
                
            
                
"data":{
    "mppt.carState": 1
}
                
            
Setting the charge level
                
"params":{
    "cmdSet": 32,
    "id": 49,
    "maxChgSoc": 100
}
                
            
                
"params":{
    "cmdSet": 32,
    "id": 49,
    "quotas": [
        "ems.maxChargeSoc"
    ]
}
                
            
                
"data":{
    "ems.maxChargeSoc": 0
}
                
            
Setting the discharge level
                
"params":{
    "cmdSet": 32,
    "id": 51,
    "minDsgSoc": 10
}
                
            
                
"params":{
    "cmdSet": 32,
    "id": 51,
    "quotas": [
        "ems.minDsgSoc"
    ]
}
                
            
                
"data":{
    "ems.minDsgSoc": 0
}
                
            
Setting the car input current
                
"params":{
    "cmdSet": 32,
    "id": 71,
    "currMa": 4000
}
                
            
                
"params":{
    "cmdSet": 32,
    "id": 71,
    "quotas": [
        "mppt.cfgDcChgCurrent"
    ]
}
                
            
                
"data":{
    "mppt.cfgDcChgCurrent": 0
}
                
            
Setting the beep switch
                
"params":{
    "cmdSet": 32,
    "id": 38,
    "enabled": 1
}
                
            
                
"params":{
    "cmdSet": 32,
    "id": 38,
    "quotas": [
        "pd.beepState"
    ]
}
                
            
                
"data":{
    "pd.beepState": 1
}
                
            
Setting the screen brightness
                
"params":{
    "cmdSet": 32,
    "id": 39,
    "lcdBrightness": 100
}
                
            
                
"params":{
    "cmdSet": 32,
    "id": 39,
    "quotas": [
        "pd.lcdBrightness"
    ]
}
                
            
                
"data":{
    "pd.lcdBrightness": 100
}
                
            
Setting the lower threshold percentage of smart generator auto on
                
"params":{
    "cmdSet": 32,
    "id": 52,
    "openOilSoc": 52
}
                
            
                
"params":{
    "cmdSet": 32,
    "id": 52,
    "quotas": [
        "ems.minOpenOilEbSoc"
    ]
}
                
            
                
"data":{
    "ems.minOpenOilEbSoc": 0
}
                
            
Setting the upper threshold percentage of smart generator auto off
                
"params":{
    "cmdSet": 32,
    "id": 53,
    "closeOilSoc": 10
}
                
            
                
"params":{
    "cmdSet": 32,
    "id": 53,
    "quotas": [
        "ems.maxCloseOilEbSoc"
    ]
}
                
            
                
"data":{
    "ems.maxCloseOilEbSoc": 0
}
                
            
Setting the unit timeout
                
"params":{
    "cmdSet": 32,
    "id": 33,
    "standByMode": 0
}
                
            
                
"params":{
    "cmdSet": 32,
    "id": 33,
    "quotas": [
        "pd.standByMode"
    ]
}
                
            
                
"data":{
    "pd.standByMode": 0
}
                
            
Setting the screen timeout
                
"params":{
    "cmdSet": 32,
    "id": 39,
    "lcdTime": 60
}
                
            
                
"params":{
    "cmdSet": 32,
    "id": 39,
    "quotas": [
        "pd.lcdOffSec"
    ]
}
                
            
                
"data":{
    "pd.lcdOffSec": 60
}
                
            
Setting the AC standby time
                
"params":{
    "cmdSet": 32,
    "id": 153,
    "standByMins": 720
}
                
            
                
"params":{
    "cmdSet": 32,
    "id": 153,
    "quotas": [
        "inv.cfgStandbyMin"
    ]
}
                
            
                
"data":{
    "inv.cfgStandbyMin": 720
}
                
            
AC charging settings
                
"params":{
    "cmdSet": 32,
    "id": 69,
    "slowChgPower": 0
}
                
            
                
"params":{
    "cmdSet": 32,
    "id": 69,
    "quotas": [
        "inv.cfgSlowChgWatts",
        "inv.acDipSwitch"
    ]
}
                
            
                
"data":{
    "inv.cfgSlowChgWatts": 0,
    "inv.acDipSwitch": 0
}
                
            
PV charging type
                
"params":{
    "cmdSet": 32,
    "id": 82,
    "chgType": 0
}
                
            
                
"params":{
    "cmdSet": 32,
    "id": 82,
    "quotas": [
        "mppt.cfgChgType"
    ]
}
                
            
                
"data":{
    "mppt.cfgChgType": 0
}
                
            
Bypass AC auto start
                
"params":{
    "cmdSet": 32,
    "id": 84,
    "enabled": 0
}
                
            
                
"params":{
    "cmdSet": 32,
    "id": 84,
    "quotas": [
        "inv.acPassbyAutoEn"
    ]
}
                
            
                
"data":{
    "inv.acPassbyAutoEn": 0
}
                
            
Example
PUT: /iot-open/sign/device/quota: SetCmdRequest
// Delta Pro: Setting the X-Boost switch
// Request
curl -X PUT https://api-e.ecoflow.com/iot-open/sign/device/quota \
-H 'Content-Type:application/json;charset=UTF-8' \
-H 'accessKey:OCHzRuj6NLF7o43***' \
-H 'timestamp:1681872798000' \
-H 'nonce:238752' \
-H 'sign:0f3a1b102cd9a306307b7a9a0f0a9add7b8bfc93cf11***' \
-d '{"sn":"DCABZ***","params":{"cmdSet":32,"id":66,"enabled":1}}'

// Response
{
    "code":"0",
    "message":"Success"
}
GET: /iot-open/sign/device/quota: Get cmdRequest, GetCmdResponse
// Delta Pro: Get the X-Boost switch value
// Request
curl -X POST https://api-e.ecoflow.com/iot-open/sign/device/quota \
-H 'Content-Type:application/json;charset=UTF-8' \
-H 'accessKey:OCHzRuj6NLF7o43***' \
-H 'timestamp:1681872798000' \
-H 'nonce:238752' \
-H 'sign:1e48307441d06a6b31d4c0d66be1580c7748fd0***' \
-d '{"sn":"DCABZ***","params":{"cmdSet":32,"id":66,"quotas":["inv.cfgAcEnabled"]}}'

// Response
{
    "code":"0",
    "message":"Success",
    "data":{
        "inv.cfgAcEnabled":1
    }
}
GetAllQuotaResponse

How to transfer request parameters by this HTTP API.
GET: /iot-open/sign/device/quota/all: GetAllQuotaResponse
Field	Field's Type	Description
bmsMaster.soc
short
Remaining battery percentage
bmsMaster.temp
byte
Temperature ℃
bmsMaster.inputWatts
long
Input power
bmsMaster.outputWatts
long
Output power
bmsMaster.num
short
BMS number
bmsMaster.type
short
BMS type: 1. Lithium battery; 2. Oil-powered
bmsMaster.cellId
short
Battery capacity type: 1: 2.5 Ah per battery; 2: 2 Ah per battery
bmsMaster.errCode
long
Global error code
bmsMaster.sysVer
long
System version
bmsMaster.vol
float
Voltage
bmsMaster.amp
float
Current
bmsMaster.openBmsIdx
short
Battery pack enable state
bmsMaster.designCap
long
Design capacity (mAh)
bmsMaster.remainCap
long
Remaining capacity (mAh)
bmsMaster.fullCap
long
Full capacity (mAh)
bmsMaster.soh
short
Health status
bmsMaster.maxCellVol
int
Maximum cell voltage
bmsMaster.minCellVol
int
Minimum cell voltage
bmsMaster.maxCellTemp
byte
Maximum cell temperature
bmsMaster.minCellTemp
byte
Minimum cell temperature
bmsMaster.maxMosTemp
byte
Maximum MOS temperature
bmsMaster.minMosTemp
byte
Minimum MOS temperature
bmsMaster.bmsFault
short
BMS permanent fault
bmsMaster.bqSysStatReg
short
BQ hardware protection register
bmsMaster.tagChgAmp
long
Target charging current
bmsMaster.f32ShowSoc
float
SOC
bmsMaster.remainTime
long
Time remaining
inv.errCode
long
Global error code
inv.sysVer
long
System version
inv.chargerType
short
Charger type: 1: AC charging; 2: DC adapter charging; 3: solar charging; 4: CC; 5: BC
inv.inputWatts
int
Charging power (W)
inv.outputWatts
int
Discharging power (W)
inv.invType
short
PSDR model code
inv.invOutVol
long
Actual inverter output voltage (mV)
inv.invOutAmp
long
Inverter output current (mA)
inv.invOutFreq
short
Inverter output frequency (Hz)
inv.acInVol
long
Inverter input voltage (mV)
inv.acInAmp
long
Inverter input current (mA)
inv.acInFreq
short
Inverter input frequency (Hz)
inv.outTemp
short
Inverter temperature (℃)
inv.dcInVol
long
DC input voltage (mV)
inv.dcInAmp
long
DC input current (mA)
inv.dcInTemp
short
DC temperature (℃)
inv.fanState
short
Fan state: 0: disabled; 1: Level 1; 2: Level 2; 3: Level 3
inv.cfgAcEnabled
short
AC discharge switch setting
0 off, 1 on
inv.cfgAcXboost
short
X-Boost switch: 0: off; 1: on; 0xff: ignored
inv.cfgAcOutVoltage
long
Inverter output voltage (V): 0xffffffff: ignored
inv.cfgAcOutFreq
short
Inverter output frequency (Hz): 1: 50 Hz; 2: 60 Hz; 0xff: ignored
inv.cfgAcWorkMode
short
AC charging mode: 0: full power; 1: mute
inv.chgPauseFlag
short
AC charging pause flag: 1: charging stopped
inv.acDipSwitch
short
AC fast/slow charging dip switch: 0: unknown; 1: fast charging mode; 2: slow charging mode
inv.cfgFastChgWatts
int
Maximum charging power for AC fast charging (W): DELTA2000 (100 W–1400 W); DELTA MINI (TBD); DELTA3000 (TBD)
inv.cfgSlowChgWatts
int
Maximum charging power for AC slow charging (W): DELTA2000 (100 W–700 W); DELTA MINI (TBD); DELTA3000 (TBD)
inv.cfgStandbyMin
int
AC standby time /min**
0 Never standby**
720 Default value
inv.dischargeType
short
Discharging type: 1: AC discharging; 2: PR; 3: BC
mppt.faultCode
long
Error code: byte0: mppt_fault; byte1: car_fault; byte2: dc24v_fault
mppt.swVer
long
Version number
mppt.inVol
long
PV input voltage (mV)
mppt.inAmp
long
PV input current (mA)
mppt.inWatts
int
PV input power (W)
mppt.outVol
long
PV output voltage (mV)
mppt.outAmp
long
PV output current (mA)
mppt.outWatts
int
PV output power (W)
mppt.mpptTemp
short
MPPT temperature (℃)
mppt.xt60ChgType
short
XT60 charging type: 0: not detected; 1: MPPT; 2: adapter
mppt.cfgChgType
short
Configured charging type: This parameter is valid when xt60_chg_type is 0. 0: auto; 1: MPPT; 2: adapter
mppt.chgType
short
Actual charging type: 0: null; 1: adapter (adapter/DC source); 2: MPPT (solar); 3: AC (mains supply); 4: gas; 5: wind
mppt.chgState
short
Charging state: 0: disabled; 1: charging; 2: standby (DC charging stopped during AC charging)
mppt.dcdc12vVol
long
DC12V30A output voltage (mV), which is valid only for DELTA Pro
mppt.dcdc12vAmp
long
DC12V30A output current (mA), which is valid only for DELTA Pro
mppt.dcdc12vWatts
int
DC12V30A output power (W), which is valid only for DELTA Pro
mppt.carOutVol
long
Car charging output voltage (mV)
mppt.carOutAmp
long
Car charging output current (mA)
mppt.carOutWatts
int
Car charging output power (W)
mppt.carTemp
short
Car charging temperature (℃)
mppt.carState
short
Car charger switch settin
0 off, 1 on
mppt.dc24vTemp
short
DCDC24V temperature (℃)
mppt.dc24vState
short
DCDC24 switch state: 0: off; 1: on
mppt.chgPauseFlag
short
PV charging pause flag: 1: charging stopped
mppt.cfgDcChgCurrent
long
On-board charging current /mA
mppt.reserved
byte[]
Reserved
pd.model
short
Product model
pd.errCode
long
Global error code
pd.sysVer
long
System version
pd.wifiVer
long
Wi-Fi version
pd.wifiAutoRcvy
short
Wi-Fi auto mode: 0: default mode (STA); 1: The Wi-Fi network is automatically restored to the last mode (STA/AP) after powering on.
pd.soc
short
Displayed SOC
pd.wattsOutSum
int
Total output power (W)
pd.wattsInSum
int
Total input power (W)
pd.remainTime
int
Time remaining (min) > 0: remaining charging time; time remaining (min) < 0: remaining discharging time
pd.beepState
short
Beep status
0 Normal, 1 Quiet
pd.dcOutState
short
DC button state: 0: off; 1: on
pd.usb1Watts
short
Common usb1 output power /W
pd.usb2Watts
short
Common usb2 output power /W
pd.qcUsb1Watts
short
Quick charge usb1 output power /W
pd.qcUsb2Watts
short
Quick charge usb2 output power /W
pd.typec1Watts
short
Typec1 output power /W
pd.typec2Watts
short
Typec2 output power /W
pd.typec1Temp
byte
Type-C 1 temperature (℃)
pd.typec2Temp
byte
Type-C 2 temperature (℃)
pd.carState
short
CAR button state: 0: off; 1: on
pd.carWatts
short
CAR output power (W)
pd.carTemp
byte
CAR temperature (℃)
pd.standByMode
int
Device standby time /min
0 Never standby
5999 Max value
pd.lcdOffSec
int
LCD screen-off duration: 0: never off
pd.brightnessLevel
short
LCD brightness level: 0–3
pd.chgPowerDc
long
Cumulative DC power charged (Wh) (adapter)
pd.chgSunPower
long
Cumulative solar power charged (Wh)
pd.chgPowerAc
long
Cumulative AC power charged (Wh) (wall socket)
pd.dsgPowerDc
long
Cumulative DC power discharged (Wh)
pd.dsgPowerAc
long
Cumulative AC power discharged (Wh)
pd.usbUsedTime
long
USB use time (s)
pd.usbqcUsedTime
long
USB QC use time (s)
pd.typccUsedTime
long
Type-C use time (s)
pd.carUsedTime
long
Car use time (s)
pd.invUsedTime
long
Inverter use time (s)
pd.dcInUsedTime
long
DC charging time (s)
pd.mpptUsedTime
long
MPPT use time (s)
pd.extRj45Port
short
RJ45 port
pd.ext3p8Port
short
Infinity port
pd.ext4p8Port
short
Extra battery port. Only the status of the leftmost port can be identified.
pd.sysChgDsgState
short
Charging/discharging state on screen: 1: discharged; 2: charged
pd.wifiRssi
byte
Wi-Fi signal intensity
pd.wirelessWatts
short
Wireless charging output power (W): Reserved, not available
pd.iconRechgTimeMode
byte
Charge icon mode: 0: normal; 1: blinking
pd.iconRechgTimeState
byte
Charge icon state: 0: off; 1: on. This parameter is valid only when the charge icon mode is 0.
pd.iconFanMode
byte
Fan icon mode: 0: normal; 1: blinking
pd.iconFanState
byte
Fan icon state: 0: off; 1: Level 1; 2: Level 2; 3: Level 3. This parameter is valid only when the fan icon mode is 0.
pd.iconBmsParallelMode
byte
BMS parallel icon mode: 0: normal; 1: blinking
pd.iconBmsParallelState
byte
BMS parallel icon state: 0: off; 1: on. This parameter is valid only when the BMS parallel icon mode is 0.
pd.iconInvParallelMode
byte
Inverter parallel icon mode: 0: normal; 1: blinking
pd.iconInvParallelState
byte
Inverter parallel icon state: 0: off; 1: on. This parameter is valid only when the inverter parallel icon mode is 0.
pd.iconAcFreqMode
byte
AC icon mode: 0: normal; 1: blinking
pd.iconAcFreqState
byte
AC icon state: 0: off; 1: 50 Hz; 2: 60 Hz. This parameter is valid only when the AC icon mode is 0.
pd.iconSocUpsMode
byte
UPS icon mode: 0: normal; 1: blinking
pd.iconSocUpsState
byte
UPS icon state: 0: off; 1: on. This parameter is valid only when the UPS icon mode is 0.
pd.iconUsbMode
byte
USB icon mode: 0: normal; 1: blinking
pd.iconUsbState
byte
USB icon state: 0: off; 1: on. This parameter is valid only when the USB icon mode is 0.
pd.iconTypecMode
byte
Type-C icon mode: 0: normal; 1: blinking
pd.iconTypecState
byte
Type-C icon state: 0: off; 1: on. This parameter is valid only when the Type-C icon mode is 0.
pd.iconCarMode
byte
CAR icon mode: 0: normal; 1: blinking
pd.iconCarState
byte
CAR icon state: 0: off; 1: on. This parameter is valid only when the CAR icon mode is 0.
pd.iconWifiMode
byte
Wi-Fi icon mode: 0: normal; 1: blinking
pd.iconWifiState
byte
Wi-Fi icon state: 0: off; 1: on. This parameter is valid only when the Wi-Fi icon mode is 0.
pd.iconBmsErrMode
byte
Exclamation mark icon mode: 0: normal; 1: blinking
pd.iconBmsErrState
byte
Exclamation mark icon state: 0: off; 1: on. This parameter is valid only when the exclamation mark icon mode is 0.
pd.iconOverloadMode
byte
OVERLOAD icon mode: 0: normal; 1: blinking
pd.iconOverloadState
byte
OVERLOAD icon state: 0: off; 1: on. This parameter is valid only when the OVERLOAD icon mode is 0.
pd.iconHiTempMode
byte
High temperature icon mode: 0: normal; 1: blinking
pd.iconHiTempState
byte
High temperature icon state: 0: off; 1: on. This parameter is valid only when the high temperature icon mode is 0.
pd.iconLowTempMode
byte
Low temperature icon mode: 0: normal; 1: blinking
pd.iconLowTempState
byte
Low temperature icon state: 0: off; 1: on. This parameter is valid only when the low temperature icon mode is 0.
pd.iconWirelessChgMode
byte
Wireless charging icon mode: 0: normal; 1: blinking
pd.iconWirelessChgState
byte
Wireless charging icon state: 0: off; 1: on. This parameter is valid only when the wireless charging icon mode is 0.
pd.iconPackHeaterMode
byte
Battery heater icon mode: 0: normal; 1: blinking
pd.iconPackHeaterState
byte
Battery heater icon state: 0: off; 1: on. This parameter is valid only when the battery heater icon mode is 0.
pd.iconFactoryMode
byte
Factory icon mode: 0: normal; 1: blinking
pd.iconFactoryState
byte
Factory icon state: 0: off; 1: on. This parameter is valid only when the factory icon mode is 0.
pd.iconBtMode
byte
Bluetooth icon mode: 0: normal; 1: blinking
pd.iconBtState
byte
Bluetooth icon state: 0: off; 1: on. This parameter is valid only when the Bluetooth icon mode is 0.
pd.iconRcMode
byte
Remote control icon mode: 0: normal; 1: blinking
pd.iconRcState
byte
Remote control icon state: 0: off; 1: on; 2: one signal bar; 3: two signal bars; 4: searching signal. This parameter is valid only when the remote control icon mode is 0.
pd.iconChgStationMode
byte
Charging pile icon mode: 0: normal; 1: blinking
pd.iconChgStationState
byte
Charging pile icon state: 0: off; 1: on. This parameter is valid only when the charging pile icon mode is 0.
pd.iconCoGasMode
byte
CO toxic gas icon mode: 0: normal; 1: blinking
pd.iconCoGasState
byte
CO toxic gas icon state: 0: off; 1: on. This parameter is valid only when the CO toxic gas icon mode is 0.
pd.iconTransSwMode
byte
Transfer switch icon mode: 0: normal; 1: blinking
pd.iconTransSwState
byte
Transfer switch icon state: 0: off; 1: on. This parameter is valid only when the transfer switch icon mode is 0.
pd.iconEcoMode
byte
ECO icon mode: 0: normal; 1: blinking
pd.iconEcoState
byte
ECO icon state: 0: off; 1: on. This parameter is valid only when the ECO icon mode is 0.
pd.iconWindGenMode
byte
Wind power generation icon mode: 0: normal; 1: blinking
pd.iconWindGenState
byte
Wind power generation icon state: 0: off; 1: on. This parameter is valid only when the wind power generation icon mode is 0.
pd.iconGasGenMode
byte
Oil-powered generation icon mode: 0: normal; 1: blinking
pd.iconGasGenState
byte
Oil-powered generation icon state: 0: off; 1: on. This parameter is valid only when the oil-powered generation icon mode is 0.
pd.iconSolarBracketMode
byte
Solar panel tracking bracket icon mode: 0: normal; 1: blinking
pd.iconSolarBracketState
byte
Solar panel tracking bracket icon state: 0: off; 1: on. This parameter is valid only when the solar panel tracking bracket icon mode is 0.
pd.iconSolarPanelMode
byte
Solar panel icon mode: 0: normal; 1: blinking
pd.iconSolarPanelState
byte
Solar panel icon state: 0: off; 1: on. This parameter is valid only when the solar panel icon mode is 0.
pd.lcdBrightness
int
Screen brightness
Range：0~100
Input 128(0x11111111), indicates turned on the automatic brightness adjustment
ems.chgState
short
Charging state
ems.chgCmd
short
Charge command
ems.dsgCmd
short
Discharge command
ems.chgVol
long
Charging voltage
ems.chgAmp
long
Charging current
ems.fanLevel
short
Fan level
ems.maxChargeSoc
short
Charge upper limit
ems.bmsModel
short
BMS model
ems.lcdShowSoc
short
SOC on LCD
ems.openUpsFlag
short
UPS mode enable flag
ems.bmsWarningState
short
BMS warning state: bit0: hi_temp; bit1: low_temp; bit2: overload; bit3: chg_flag
ems.chgRemainTime
long
Remaining charging time (mins)
ems.dsgRemainTime
long
Remaining discharging time (mins)
ems.emsIsNormalFlag
short
Energy storage state: 0: sleep; 1: normal
ems.f32LcdShowSoc
float
SOC on LCD
ems.bms0Online
short
BMS online signal: BIT0: hardware online signal; BIT1: software online signal
ems.bms1Online
short
BMS online signal: BIT0: hardware online signal; BIT1: software online signal
ems.bms2Online
short
BMS online signal: BIT0: hardware online signal; BIT1: software online signal
ems.maxAvailableNum
short
Maximum available quantity
ems.openBmsIdx
short
Open BMS index
ems.paraVolMin
long
Minimum parallel voltage
ems.paraVolMax
long
Maximum parallel voltage
ems.minDsgSoc
short
Discharge lower limit
ems.minOpenOilEbSoc
short
The upper threshold of smart generator auto on
Range: 0~100
ems.maxCloseOilEbSoc
short
The lower threshold of smart generator auto off
Range: 0~100
Example
// Get Delta Pro all quota values
// Request
curl -X GET https://api-e.ecoflow.com/iot-open/sign/device/quota/all?sn=DCABZ*** \
-H 'accessKey:OCHzRuj6NLF7o43***' \
-H 'timestamp:1681872798000' \
-H 'nonce:238752' \
-H 'sign:534215ccfe93979588975630ea0ad7091c7e250ae5***'

// Response
{
    "code":"0",
    "message":"Success",
    "data":{
        "bmsMaster.soc":"100",
        "bmsMaster.temp":"34",
        "bmsMaster.inputWatts":"0",
        "bmsMaster.outputWatts":"0",
        "pd.remainTime":"14781",
        "inv.cfgAcEnabled":"0",
        "mppt.carState":"0",
        "pd.usb1Watts":"0",
        "pd.usb2Watts":"0",
        "pd.qcUsb1Watts":"0",
        ...
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
  "id":"123456789",
  "version":"1.0",
  "operateType": "TCP",
  "timestamp": 1634841971000,
  "params": {
    "cmdSet": 32,
    "id": 33,
    "standByMode": 0
  }
}
                
            
                
{
    "id":123456789,
    "version":"1.0",
    "operateType": "TCP",
    "code": "0",
    "data": {
        "cmdSet": 32,
        "id": 33,
        "ack": 0
    }
}
                
            
ParamInfo Message Format
Set Command	SetTopic's ParamInfo	SetReplyTopic's ParamInfo
Setting the X-Boost switch
                
"params":{
    "cmdSet": 32,
    "id": 66,
    "enabled": 1,
    "xboost": 0
}
                
            
                
"data":{
    "cmdSet": 32,
    "id": 66,
    "ack": 0
}
                
            
Setting the car charger switch
                
"params":{
    "cmdSet": 32,
    "id": 81,
    "enabled": 1
}
                
            
                
"data":{
    "cmdSet": 32,
    "id": 81,
    "ack": 0
}
                
            
Setting the charge level
                
"params":{
    "cmdSet": 32,
    "id": 49,
    "maxChgSoc": 100
}
                
            
                
"data":{
    "cmdSet": 32,
    "id": 49,
    "ack": 0
}
                
            
Setting the discharge level
                
"params":{
    "cmdSet": 32,
    "id": 51,
    "minDsgSoc": 10
}
                
            
                
"data":{
    "cmdSet": 32,
    "id": 51,
    "ack": 0
}
                
            
Setting the car input current
                
"params":{
    "cmdSet": 32,
    "id": 71,
    "currMa": 0
}
                
            
                
"data":{
    "cmdSet": 32,
    "id": 71,
    "ack": 0
}
                
            
Setting the beep switch
                
"params":{
    "cmdSet": 32,
    "id": 38,
    "enabled": 1
}
                
            
                
"data":{
    "cmdSet": 32,
    "id": 38,
    "ack": 0
}
                
            
Setting the screen brightness
                
"params":{
    "cmdSet": 32,
    "id": 39,
    "lcdBrightness": 100
}
                
            
                
"data":{
    "cmdSet": 32,
    "id": 39,
    "ack": 0
}
                
            
Setting the lower upper threshold percentage of smart generator auto on
                
"params":{
    "cmdSet": 32,
    "id": 52,
    "openOilSoc": 52
}
                
            
                
"data":{
    "cmdSet": 32,
    "id": 52,
    "ack": 0
}
                
            
Setting the upper threshold percentage of smart generator auto off
                
"params":{
    "cmdSet": 32,
    "id": 53,
    "closeOilSoc": 10
}
                
            
                
"data":{
    "cmdSet": 32,
    "id": 53,
    "ack": 0
}
                
            
Setting the unit timeout
                
"params":{
    "cmdSet": 32,
    "id": 33,
    "standByMode": 0
}
                
            
                
"data":{
    "cmdSet": 32,
    "id": 33,
    "ack": 0
}
                
            
Setting the screen timeout
                
"params":{
    "cmdSet": 32,
    "id": 39,
    "lcdTime": 60
}
                
            
                
"data":{
    "cmdSet": 32,
    "id": 39,
    "lcdTime": 60
}
                
            
Setting the AC standby time
                
"params":{
    "cmdSet": 32,
    "id": 153,
    "standByMins": 720
}
                
            
                
"data":{
    "cmdSet": 32,
    "id": 153,
    "ack": 0
}
                
            
AC charging settings
                
"params":{
    "cmdSet": 32,
    "id": 69,
    "slowChgPower": 0
}
                
            
                
"data":{
    "cmdSet": 32,
    "id": 69,
    "ack": 0
}
                
            
PV charging type settings
                
"params":{
    "cmdSet": 32,
    "id": 82,
    "chgType": 0
}
                
            
                
"data":{
    "cmdSet": 32,
    "id": 82,
    "ack": 0
}
                
            
Bypass AC auto start settings
                
"params":{
    "cmdSet": 32,
    "id": 84,
    "enabled": 0
}
                
            
                
"data":{
    "cmdSet": 32,
    "id": 84,
    "ack": 0
}
                
            
Get & Get Reply

Not Support
Report Device Quota

Usage of Topic	Topic	From	To
Report device quota
/open/${certificateAccount}/${sn}/quota
device
app
Please see HTTP GetAllQuotaResponse for the fields definition.
Example
{
    "id" :123456789,
    "version" : "1.0" ,
    "timestamp" :111111111,
    "params" :{
        "pd.iconWifiMode" : "0" ,
        "mppt.faultCode" : "0" ,
        "ems.minDsgSoc" : "0" ,
        "pd.iconOverloadState" : "0" ,
        "ems.emsIsNormalFlag" : "1" ,
        ...
    }
}
Was this page helpful?