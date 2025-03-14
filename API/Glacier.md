GLACIER

ModuleType definition
Field	Field's Type	Description
moduleType
int
1: PD 2: BMS 3: INV 4: BMS_SLAVE 5: MPPT
HTTP communication mode
Set & Get Quota
How to transfer request parameters by these two HTTP API.
PUT: /iot-open/sign/device/quota: SetCmdRequest
GET: /iot-open/sign/device/quota: GetCmdRequest, GetCmdResponse
Set Command	SetCmdRequest	GetCmdRequest	GetCmdResponse
Set temperature(tmpR indicates the temperature of the right side of the refrigerator, tmpL indicates the temperature of the left side, and tmpM indicates the temperature setting after the middle partition is removed. The difference between tmpR and tmpL cannot exceed 25℃)
            
{
    "id": 123456789,
    "version": "1.0",
    "sn": "BX11ZCB4EF2E0002",
    "moduleType": 1,
    "operateType": "temp",
    "params": {
        "tmpR": -19,
        "tmpL": 0,
        "tmpM": 0
    }
}
            
        
            
{
    "sn": "BX11ZCB4EF2E0002",
    "params": {
        "quotas": [
            "pd.tmpLSet",
            "pd.tmpRSet",
            "pd.tmpMSet"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "pd.tmpMSet": 0,
        "pd.tmpLSet": -1,
        "pd.tmpRSet": -17
    },
    "tid": ""
}
            
        
Set ECO mode(mode: 1: ECO; 0: Normal)
            
{
    "id": 123456789,
    "version": "1.0",
    "sn": "BX11ZCB4EF2E0002",
    "moduleType": 1,
    "operateType": "ecoMode",
    "params": {
        "mode": 1
    }
}
            
        
            
{
    "sn": "BX11ZCB4EF2E0002",
    "params": {
        "quotas": [
            "pd.coolMode"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "pd.coolMode": 1
    },
    "tid": ""
}
            
        
Set buzzer enabling status(0: Disable; 1: Enable)
            
{
    "id": 123456789,
    "version": "1.0",
    "sn": "BX11ZCB4EF2E0002",
    "moduleType": 1,
    "operateType": "beepEn",
    "params": {
        "flag": 1
    }
}
            
        
            
{
    "sn": "BX11ZCB4EF2E0002",
    "params": {
        "quotas": [
            "pd.beepEn"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "pd.beepEn": 1
    },
    "tid": ""
}
            
        
Buzzer commands(1: Beep once; 2: Beep twice; 3: Beep three times; 0: Always beeping)
            
{
    "id": 123456789,
    "version": "1.0",
    "sn": "BX11ZCB4EF2E0002",
    "moduleType": 1,
    "operateType": "beep",
    "params": {
        "flag": 1
    }
}
            
        
            
{
    "sn": "BX11ZCB4EF2E0002",
    "params": {
        "quotas": [
            "pd.beep"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {},
    "tid": ""
}
            
        
Set screen timeout(unit: sec; when set to 0, the screen is always on)
            
{
    "id": 123456789,
    "version": "1.0",
    "sn": "BX11ZCB4EF2E0002",
    "moduleType": 1,
    "operateType": "blTime",
    "params": {
        "time": 600
    }
}
            
        
            
{
    "sn": "BX11ZCB4EF2E0002",
    "params": {
        "quotas": [
            "pd.blTime"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "pd.blTime": 0
    },
    "tid": ""
}
            
        
Set temperature unit(0: Celsius; 1: Fahrenheit）
            
{
    "id": 123456789,
    "version": "1.0",
    "sn": "BX11ZCB4EF2E0002",
    "moduleType": 1,
    "operateType": "tmpUnit",
    "params": {
        "unit": 0
    }
}
            
        
            
{
    "sn": "BX11ZCB4EF2E0002",
    "params": {
        "quotas": [
            "pd.tmpUnit"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "pd.tmpUnit": 1
    },
    "tid": ""
}
            
        
Set ice making(If "enable"=0, ice making is disabled. If "enable"=1 and "iceShape"=0, the device will make small ice cubes. If "enable"=1 and "iceShape"=1, the device will make large ice cubes.)
            
{
    "id": 123456789,
    "version": "1.0",
    "sn": "BX11ZCB4EF2E0002",
    "moduleType": 1,
    "operateType": "iceMake",
    "params": {
        "enable": 1,
        "iceShape": 1
    }
}
            
        
            
{
    "sn": "BX11ZCB4EF2E0002",
    "params": {
        "quotas": [
            "pd.iceMkMode"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "pd.iceMkMode": 0
    },
    "tid": ""
}
            
        
Set ice detaching(enable: 0: Invalid, 1: Detach iceiceTm: Duration of ice detaching; unit: secfsmState: 4: Detaching ice, 5: Detaching completed）
            
{
    "id": 123456789,
    "version": "1.0",
    "sn": "BX11ZCB4EF2E0002",
    "moduleType": 1,
    "operateType": "deIce",
    "params": {
        "enable": 0
    }
}
            
        
            
{
    "sn": "BX11ZCB4EF2E0002",
    "params": {
        "quotas": [
            "pd.iceTm",
            "pd.fsmState"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "pd.iceTm": 0,
        "pd.fsmState": 5
    },
    "tid": ""
}
            
        
Sensor detection blocking(0: Unblocked; 1: Blocked)
            
{
    "id": 123456789,
    "version": "1.0",
    "sn": "BX11ZCB4EF2E0002",
    "moduleType": 1,
    "operateType": "sensorAdv",
    "params": {
        "sensorAdv": 1
    }
}
            
        
            
{
    "sn": "BX11ZCB4EF2E0002",
    "params": {
        "quotas": [
            "pd.sensorAdv"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "pd.sensorAdv": 0
    },
    "tid": ""
}
            
        
Set battery low voltage protection level(state: 0: Disabled; 1: Enabled; level: 0: Low; 1: Medium; 2: High)
            
{
    "id": 123456789,
    "version": "1.0",
    "sn": "BX11ZCB4EF2E0002",
    "moduleType": 1,
    "operateType": "protectBat",
    "params": {
        "state": 1,
        "level": 0
    }
}
            
        
            
{
    "sn": "BX11ZCB4EF2E0002",
    "params": {
        "quotas": [
            "pd.powerPbLevel"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "pd.powerPbLevel": 0
    },
    "tid": ""
}
            
        
GetAllQuotaResponse
How to transfer request parameters by this HTTP API.
GET: /iot-open/sign/device/quota/all: GetAllQuotaResponse
Field	Field's Type	Description
pd.exhaustTmp
int
Exhaust pipe wall temperature
pd.errBms
int
BMS fault code
pd.tempCoolTime
[int]
Length of time when the actual temperature of the cooling zone falls in each interval: COOL_ ZONE_ MAX*TEMP_ COOL_ MAX
pd.errPd
int
PD fault code
bms_bmsStatus.designCap
int
Design capacity (mAh)
bms_bmsStatus.f32ShowSoc
float
Battery level SOC
pd.iceTm
int
Duration of the current ice making (for app and LCD effect display)
pd.batTime
int
Unit: min; a negative value indicates a discharging time, and positive value indicates a charging time
bms_bmsStatus.minMosTmp
int
Minimum MOS temperature
bms_bmsStatus.vol
int
Voltage (mV)
bms_emsStatus.closeOilEbSocMax
int
SOC for turning off Smart Generator
pd.appSensorAdv
[int]
Duration of sensor blocking: SENSOR_ADV_MAX
pd.errorTimePower
[int]
Duration of each type of fault in the POWER module: ERROR_MAX_POWER
pd.fsmState
int
Real-time running status
bms_emsStatus.bmsIsConnt
int
BMS online signal: BIT0: hardware online signal; BIT1: software online signal
pd.tempWater
int
Water temperature of the ice making zone: the data is 10 times the actual temperature value
bms_emsStatus.dsgCmd
int
Discharge command
bms_bmsStatus.fullCap
int
Full capacity (mAh)
pd.motorWait
int
Waiting for compressor: 0: No need to wait; 1: Need to wait
bms_emsStatus.chgVol
int
Charging voltage
pd.A12Val
int
12 V auxiliary supply voltage
pd.pwrState
int
0: Powered off; 1: Powered on
pd.coolZoneDoubleCount
int
Count of dual temperature zones
pd.buttonLong
[int]
Count of long presses: USER_BEHAVIOR_BUTTON_MAX
pd.coolMode
int
0: Normal; 1: Eco
bms_emsStatus.openBmsIdx
int
BMS enable index: bit0: host (#1); bit1: #2; bit2: #3
bms_emsStatus.dsgRemain
int
Remaining discharging time (min)
pd.coolCoverCount
int
Count of cooling zone openings
pd.tempIceTime
[int]
Length of time when temperature of the ice-making zone falls in each interval: TEMP_ICE_MAX
pd.bldcDntWork
int
Compressor work limit: 0: Allow to work; 1: Do not allow to work
pd.networkTypeCount
[int]
Count of being networked: NETWORK_TYPE_MAX
pd.errBldc
int
BLDC fault code
pd.motorCur
int
mA
pd.waterLine
int
Ice making zone water level: 0-3 levels
pd.sensorAdv
int
Sensor detection blocking. Refer to @ST_SENSOR for data explanation. Bit: 1: Blocked; 0: Unblocked.
pd.powerXt60Count
[int]
Count of each type of power supply on XT60: POWER_TYPE_MAX
pd.flagAmbintReady
int
Ambient temperature reliability: 0: Unreliable; 1: Reliable
bms_bmsStatus.remainCap
int
Remaining capacity (mAh)
pd.batFlag
int
Battery pack in-place status: 0: Not in place; 1: In place
pd.networkTypeTime
[int]
Duration of being networked: NETWORK_TYPE_MAX
bms_emsStatus.maxAvailNum
int
Maximum available quantity
pd.emsChgFlg
int
EMS charging flag
pd.errorCountPower
[int]
Count of each type of fault in POWER module: ERROR_MAX_POWER
pd.appOpCountDeIce
int
Count of ice detaching through app
bms_bmsStatus.tmp
int
Temperature (℃)
pd.xt150InState
int
0:no input, 1:has input
pd.powerXt60Time
[int]
Duration of each type of power supply on XT60: POWER_TYPE_MAX
bms_bmsStatus.outWatts
int
Output power
bms_emsStatus.paraVolMax
int
Maximum voltage when battery packs work in parallel
bms_bmsStatus.bmsFault
int
BMS permanent fault
pd.dntMakeIceDevice
int
Count of pressing the ice making button when ice making is disabled
bms_emsStatus.paraVolMin
int
Minimum voltage when battery packs work in parallel
pd.doorStat
int
Door status detection. 1: Open; 0: Closed
pd.appOpCountBeepOff
int
Count of turning off buzzer through app
pd.appOpCountPowerOn
int
Count of powering on through app
pd.errLcd
int
Fault code displayed on LCD screen
pd.countinueMakeIceMax
int
Maximum count of consecutive ice making
pd.tmpMSet
int
Combined temperature zone settings (valid when the partition is removed)
pd.runState
int
Operating status: 0: Normal (24 V output, 40 V output); 1: Charging suspended (or when there is no input) (24 V off, 40 V output); 2: Standby (24 V off, 40 V off)
pd.workFsmCount
[int]
Count of entering each state of state machine: USER_BEHAVIOR_FSM_MAX
pd.appOpCountPowerOff
int
Count of powering off through app
pd.appOpCountDntMakeIce
int
Count of ice making through app when ice making is disabled
bms_bmsStatus.err
int
Global error code
pd.powerBatInCount
int
Count of battery pack in place
pd.icePercent
int
Ice making progress (%)
bms_bmsStatus.minCellVol
int
Minimum cell voltage
bms_emsStatus.lcdSoc
int
SoC value displayed on LCD
pd.errorCountBldc
[int]
Count of each type of fault in BLDC module: ERROR_MAX_BLDC
pd.beepEn
int
0: Buzzer disabled; 1: Buzzer enabled
bms_bmsStatus.maxCellVol
int
Maximum cell voltage
bms_bmsStatus.maxMosTmp
int
Maximum MOS temperature
bms_emsStatus.emsFlag
int
0: sleep 1: normal
bms_bmsStatus.type
int
BMS type: 1: Lithium battery; 2: Oil powered
pd.fanLvl
int
Fan level
bms_bmsStatus.cellId
int
Cell material LI/LFP/LA
bms_bmsStatus.inWatts
int
Input power
bms_bmsStatus.bqStatReg
int
BQ hardware protection register
pd.powerBatInTime
int
Duration of battery pack in place
pd.ambientTmp
int
Ambient temperature
pd.workModeCount
int
Count of entering each work mode; WORK_MODE_MAX
pd.warnInfo
int
Warning: BIT0: Over-temperature; BIT1: Under-temperature; BIT2: Overload; BIT3: Charging error; BIT4: Fan error; BIT5: BLCD communication error
pd.errorCountBms
[int]
Count of each type of fault in BMS module: ERROR_MAX_PD
pd.powerPbLevel
int
Battery protection level
pd.pwrPbEn
int
Battery protection switch: 0: Disable; 1: Enable
pd.coolZoneSingleTime
int
Single temperature zone duration
pd.chgType
int
Charger type //Charger type: 0: NULL; 1: XT150 charging; 2: Adapter charging (hardware detection); 3: Car charging (hardware detection); 4: Solar panel charging (hardware detection); 5: Car charging (software detection); 6: Solar panel charging (software detection); 7: Input source cannot be identified (0xff): the charging cable is connected, but it actually does not work due to charging being disabled.
bms_bmsStatus.openBmsIdx
int
Battery pack status: 0: Not enabled; 1: Enabled
pd.resvP
[int]
Reserve 5 bytes
pd.chargeXt60Time
[int]
Duration of each type of charging power supply on XT60: POWER_TYPE_MAX
pd.chargeXt60Count
[int]
Count of each type of charging power supply on XT60: POWER_TYPE_MAX
bms_bmsStatus.num
int
BMS number: 0-2
pd.errorTimeBms
[int]
Duration of each type of fault in BMS module: ERROR_MAX_BMS
pd.makeIceCount
int
Total count of ice making
pd.threeWayState
int
Refrigerant flow direction flag bit
bms_bmsStatus.soc
int
Battery level
bms_emsStatus.fanLvl
int
Fan level
pd.tmpAver
int
Real-time temperature of single temperature zone, amplified 10 times
bms_emsStatus.chgRemain
int
Remaining charging time (min)
pd.sensor
int
Sensor status; refer to @ST_SENSOR for data explanation; bit 1: Error; bit 0: Normal
pd.flagTwoZone
int
Partition detection
pd.xt60InState
int
0: no input, 1: has input
pd.appOpTimeBlTime
[int]
Screen timeout set through app: BL_TIME_MAX
pd.tmpUnit
int
0: Celsius; 1: Fahrenheit
bms_emsStatus.chgCmd
int
Charge command
bms_bmsStatus.tagChgAmp
int
Target charging current
pd.tmpRSet
int
Right temperature zone setting value (works when partition is inserted)
pd.appOpCountWorkMode
[int]
Count of each work mode set through app: WORK_MODE_MAX
bms_emsStatus.openOilEbSocMin
int
SoC for turning on Smart Generator
pd.iceAlert
int
Ice taking reminder: 0: Do not remind; 1: Remind
pd.carBatLow
int
Car charger battery protection reminder: 0: Do not remind; 1: Remind
pd.tmpR
int
Real-time temperature of the right temperature zone, amplified 10 times
pd.batPct
int
Battery level (%)
bms_bmsStatus.ver
int
System version
pd.errorTimePd
[int]
Duration of each type of fault in PD module: ERROR_MAX_PD
pd.iceTmTag
int
The ice making target time (used for app and LCD effect display)
pd.chargeWorkCount
int
Count of working while charging
pd.coolCoverTime
int
Duration of cooling zone being opened
bms_bmsStatus.minCellTmp
int
Minimum cell temperature
pd.tmpL
int
Real-time temperature of the left temperature zone, amplified 10 times
bms_bmsStatus.soh
int
Health status
pd.resvD
[int]
Reserve 1 byte
pd.powerBatOutTime
int
Duration of battery pack not in place
pd.resvB
[int]
Reserve 2 bytes
pd.chargeWorkTime
int
Duration of working while charging
bms_emsStatus.minDsgSoc
int
Minimum discharging SOC
bms_bmsStatus.maxCellTmp
int
Maximum cell temperature
pd.workFsmTime
[int]
Running duration of state machine under each state: USER_BEHAVIOR_FSM_MAX
pd.motorVol
int
mv
bms_emsStatus.warnState
int
BMS warning state: bit0: hi_temp; bit1: low_temp; bit2: overload; bit3: chg_flag
pd.appOpCountBlTime
[int]
Count of setting different screen timeout through app: BL_TIME_MAX
pd.workModeTime
[int]
Running duration of each work mode; WORK_MODE_MAX
pd.coolZoneSingleCount
int
Count of single temperature zone
bms_bmsStatus.remainTime
int
Time remaining
pd.coolZoneDoubleTime
int
Duration of dual temperature zone
pd.tempAmbientTime
[int]
Length of time when ambient temperature falls in each interval: TEMP_AMBIENT_MAX
pd.err
int
Error code
pd.bmsInFlag
int
BMS in-place flag, detected through BMS->PD heartbeat packet: 0: Not in place; 1: In place
pd.tempCoolSetTime
[int]
Length of time when the set temperature of the cooling zone falls in each interval: COOL_ZONE_MAX*TEMP_COOL_SET_MAX
bms_emsStatus.upsFlag
int
UPS mode enable flag
pd.errorCountPd
[int]
Count of each fault in PD module: ERROR_MAX_PD
pd.buttonShort
[int]
Count of short pressings: USER_BEHAVIOR_BUTTON_MAX
pd.threeWayState
int
Refrigerant flow direction flag bit
pd.tmpLSet
int
Set temperature of the left temperature zone (valid when partition is inserted)
pd.motorSpeed
int
Motor speed
bms_bmsStatus.amp
int
Current (mA)
pd.blTime
int
Screen timeout (unit: sec)
pd.motorWat
int
w
bms_emsStatus.bmsModel
int
BMS model
pd.errCode
int
Error code
pd.countinueMakeIceAve
int
Average count of consecutive ice making actions
pd.appOpCountTempUnitC
int
Count of setting degrees in Celsius through app
pd.appOpCountTempUnitF
int
Count of setting degrees in Fahrenheit through app
pd.bldcDntIce
int
Ice making limit on compressor: 0: Ice making is allowed; 1: Ice making is not allowed
bms_emsStatus.maxChgSoc
int
Maximum charging SOC
pd.appOpCountBeepOn
int
Count of enabling buzzer through app
pd.errPwr
int
POWER fault code
pd.iceMkMode
int
Large/small ice cube status: 0: Small ice cube (in preparation); 1: Large ice cube (in preparation); 2: Small ice cube (ice making in progress; cannot be changed); 3: Large ice cube (ice making in progress)
Example
{
    "code": "0",
    "message": "Success",
    "data": {
        "pd.iceZoneWaterTmp": -40,
        "pd.exhaustTmp": 395,
        "pd.threeWayState": 4,
        "pd.motorSpeed": 2128,
        "pd.tmpLSet": 0,
        "pd.blTime": 0,
        "bms_bmsStatus.amp": -1116,
        "bms_emsStatus.bmsModel": 1,
        "pd.motorWat": 26,
        "pd.errCode": 0,
        "pd.countinueMakeIceAve": 2,
        "pd.appOpCountTempUnitC": 5,
        "pd.appOpCountTempUnitF": 5,
        "pd.bldcDntIce": 0,
        "bms_emsStatus.maxChgSoc": 100,
        "pd.appOpCountBeepOn": 80,
        "pd.errPwr": 0,
        "pd.iceMkMode": 1
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
Set Command	SetTopic's ParamInfo	SetReplyTopic's ParamInfo
Set temperature(tmpR indicates the temperature of the right side of the refrigerator, tmpL indicates the temperature of the left side, and tmpM indicates the temperature setting after the middle partition is removed. The difference between tmpR and tmpL cannot exceed 25℃)
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleType": 1,
    "operateType": "temp",
    "params": {
        "tmpR": -10,
        "tmpL": -5,
        "tmpM": 0
    }
}
            
        
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleType": 1,
    "time": 18164454,
    "code": 0,
    "operateType": "temp",
    "data": {
        "ack": 0
    }
}
            
        
Set ECO mode(mode: 1: ECO; 0: Normal)
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleType": 1,
    "operateType": "ecoMode",
    "params": {
        "mode": 1
    }
}
            
        
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleType": 1,
    "time": 18317234,
    "code": 0,
    "operateType": "ecoMode",
    "data": {
        "ack": 0
    }
}
            
        
Set buzzer enabling status(0: Disable; 1: Enable)
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleType": 1,
    "operateType": "beepEn",
    "params": {
        "flag": 1
    }
}
            
        
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleType": 1,
    "time": 18479344,
    "code": 0,
    "operateType": "beepEn",
    "data": {
        "ack": 0
    }
}
            
        
Buzzer commands(1: Beep once; 2: Beep twice; 3: Beep three times; 0: Always beeping)
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleType": 1,
    "operateType": "beep",
    "params": {
        "flag": 2
    }
}
            
        
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleType": 1,
    "time": 18819874,
    "code": 0,
    "operateType": "beep",
    "data": {
        "ack": 0
    }
}
            
        
Set screen timeout(unit: sec; when the value is set to 0 or any value lower than 10, the screen is always on)
            
{
    "id": 123456789,
    "version": "1.0",
    "sn": "BX11ZCB4EF2E0002",
    "moduleType": 1,
    "operateType": "blTime",
    "params": {
        "time": 300
    }
}
            
        
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleType": 1,
    "time": 18935014,
    "code": 0,
    "operateType": "blTime",
    "data": {
        "ack": 0
    }
}
            
        
Set temperature unit(0: Celsius; 1: Fahrenheit）
            
{
    "id": 123456789,
    "version": "1.0",
    "sn": "BX11ZCB4EF2E0002",
    "moduleType": 1,
    "operateType": "tmpUnit",
    "params": {
        "unit": 0
    }
}
            
        
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleType": 1,
    "time": 19187644,
    "code": 0,
    "operateType": "tmpUnit",
    "data": {
        "ack": 0
    }
}
            
        
Set ice making(If "enable"=0, ice making is disabled. If "enable"=1 and "iceShape"=0, the device will make small ice cubes. If "enable"=1 and "iceShape"=1, the device will make large ice cubes.)
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleType": 1,
    "operateType": "iceMake",
    "params": {
        "enable": 1,
        "iceShape": 1
    }
}
            
        
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleType": 1,
    "time": 19187644,
    "code": 0,
    "operateType": "iceMake",
    "data": {
        "ack": 0
    }
}
            
        
Set ice detaching(enable: 0: Invalid, 1: Detach ice)
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleType": 1,
    "operateType": "deIce",
    "params": {
        "enable": 1
    }
}
            
        
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleType": 1,
    "time": 259934,
    "code": 0,
    "operateType": "deIce",
    "data": {
        "ack": 0
    }
}
            
        
Sensor detection blocking(0: Unblocked; 1: Blocked)
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleType": 1,
    "operateType": "sensorAdv",
    "params": {
        "sensorAdv": 0
    }
}
            
        
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleType": 1,
    "time": 415814,
    "code": 0,
    "operateType": "sensorAdv",
    "data": {
        "ack": 0
    }
}
            
        
Set battery low voltage protection level(state: 0: Disabled; 1: Enabled; level: 0: Low; 1: Medium; 2: High)
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleType": 1,
    "operateType": "protectBat",
    "params": {
        "state": 1,
        "level": 2
    }
}
            
        
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleType": 1,
    "time": 599524,
    "code": 0,
    "operateType": "protectBat",
    "data": {
        "ack": 0
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