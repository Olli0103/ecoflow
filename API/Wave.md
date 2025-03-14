WAVE Air Conditioner

ModuleType definition
Field	Field's Type	Description
moduleType
int
1: PD2: BMS3: INV4: BMS_SLAVE5: MPPT
HTTP communication mode
Set & Get Quota
How to transfer request parameters by these two HTTP API.
PUT: /iot-open/sign/device/quota: SetCmdRequest
GET: /iot-open/sign/device/quota: GetCmdRequest, GetCmdResponse
Set Command	SetCmdRequest	GetCmdRequest	GetCmdResponse
Set main mode(0: Cool, 1: Heat, 2: Fan)
            
{
    "id": 123456789,
    "version": "1.0",
    "sn": "KT21ZCH2ZF170012",
    "moduleType": 1,
    "operateType": "mainMode",
    "params": {
        "mainMode": 1
    }
}
            
        
            
{
    "sn": "KT21ZCH2ZF170012",
    "params": {
        "quotas": [
            "pd.mainMode"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "pd.mainMode": 1
    }
}
            
        
Set sub-mode(0: Max, 1: Sleep, 2: Eco, 3: Manual)
            
{
    "id": 123456789,
    "version": "1.0",
    "sn": "KT21ZCH2ZF170012",
    "operateType": "subMode",
    "params": {
        "subMode": 3
    }
}
            
        
            
{
    "sn": "KT21ZCH2ZF170012",
    "params": {
        "quotas": [
            "pd.pdSubMode"
        ]
    }
}
            
        
                
"data":{
    "pd.pdSubMode": 3
}
                
            
Set unit of temperature(0: Celsius, 1: Fahrenheit)
            
{
    "id": 123456789,
    "version": "1.0",
    "sn": "KT21ZCH2ZF170012",
    "operateType": "tempSys",
    "params": {
        "mode": 1
    }
}
            
        
            
{
    "sn": "KT21ZCH2ZF170012",
    "params": {
        "quotas": [
            "pd.tempSys"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "pd.tempSys": 0
    },
    "tid": ""
}
            
        
Set screen timeout (time unit: sec; Always on: "idleTime": 0, "idleMode": 0)
            
{
    "id": 123456789,
    "version": "1.0",
    "sn": "KT21ZCH2ZF170012",
    "operateType": "display",
    "params": {
        "idleTime": 5,
        "idleMode": 1
    }
}
            
        
            
{
    "sn": "KT21ZCH2ZF170012",
    "params": {
        "quotas": [
            "pd.idleMode",
            "pd.idleTime"
        ]
    }
}
            
        
                
"data":{
    "pd.idleMode": 0,
    "pd.idleTime": 5
}
                
            
Set timer(timeSet: 0-65535; Unit: min;timeEn: 0: Turn off 1: Turn on)
            
{
    "id": 123456789,
    "version": "1.0",
    "sn": "KT21ZCH2ZF170012",
    "operateType": "sacTiming",
    "params": {
        "timeSet": 10,
        "timeEn": 1
    }
}
            
        
            
{
    "sn": "KT21ZCH2ZF170012",
    "params": {
        "quotas": [
            "pd.timeSet",
            "pd.timeEn"
        ]
    }
}
            
        
                
"data":{
    "pd.timeEn": 0,
    "pd.timeSet": 0
}
                
            
Enable buzzer (0: Disable; 1: Enable)
            
{
    "id": 123456789,
    "version": "1.0",
    "sn": "KT21ZCH2ZF170012",
    "operateType": "beepEn",
    "params": {
        "en": 1
    }
}
            
        
            
{
    "sn": "KT21ZCH2ZF170012",
    "params": {
        "quotas": [
            "pd.beepEn"
        ]
    }
}
            
        
                
"data":{
    "pd.beepEn": 1
}
                
            
Set temperature(16-30 ℃）
            
{
    "id": 123456789,
    "version": "1.0",
    "sn": "KT21ZCH2ZF170012",
    "moduleType": 1,
    "operateType": "setTemp",
    "params": {
        "setTemp": 27
    }
}
            
        
            
{
    "sn": "KT21ZCH2ZF170012",
    "params": {
        "quotas": [
            "pd.setTemp"
        ]
    }
}
            
        
                
"data":{
    "pd.setTemp": 27
}
                
            
Set temperature display (0: Display ambient temperature; 1: Display air outlet temperature)
            
{
    "id": 123456789,
    "version": "1.0",
    "sn": "KT21ZCH2ZF170012",
    "moduleType": 1,
    "operateType": "tempDisplay",
    "params": {
        "tempDisplay": 0
    }
}
            
        
            
{
    "sn": "KT21ZCH2ZF170012",
    "params": {
        "quotas": [
            "pd.tempDisplay"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "pd.tempDisplay": 0
    },
    "tid": ""
}
            
        
Set wind speed (0: Low; 1: Medium; 2: High)
            
{
    "id": 123456789,
    "version": "1.0",
    "sn": "KT21ZCH2ZF170012",
    "operateType": "fanValue",
    "params": {
        "fanValue": 1
    }
}
            
        
            
{
    "sn": "KT21ZCH2ZF170012",
    "params": {
        "quotas": [
            "pd.fanValue"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "pd.fanValue": 1
    },
    "tid": ""
}
            
        
Set automatic drainage(In Cool/Fan mode: 0: Turn on Manual drainage，1: Turn on No drainage, 2: Turn off Manual drainage, 3 Turn off No drainageIn Heat Mode: 0: Turn off, 1: Turn on Manual drainage， 3: Turn off Manual drainage)
            
{
    "id": 123456789,
    "version": "1.0",
    "sn": "KT21ZCH2ZF170012",
    "operateType": "wteFthEn",
    "params": {
        "wteFthEn": 3
    }
}
            
        
            
{
    "sn": "KT21ZCH2ZF170012",
    "params": {
        "quotas": [
            "pd.wteFthEn"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "pd.wteFthEn": 1
    },
    "tid": ""
}
            
        
Light strip settings (0: Follow the screen; 1: Always on; 2: Always off; other parameters indicate “Always off”)
            
{
    "id": 123456789,
    "version": "1.0",
    "sn": "KT21ZCH2ZF170012",
    "moduleType": 1,
    "operateType": "rgbState",
    "params": {
        "rgbState": 1
    }
}
            
        
            
{
    "sn": "KT21ZCH2ZF170012",
    "params": {
        "quotas": [
            "pd.rgbState"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "pd.rgbState": 1
    },
    "tid": ""
}
            
        
Remote startup/shutdown (1: Startup; 2: Standby; 3: Shutdown)
            
{
    "id": 123456789,
    "version": "1.0",
    "sn": "KT21ZCH2ZF170012",
    "moduleType": 1,
    "operateType": "powerMode",
    "params": {
        "powerMode": 2
    }
}
            
        
            
{
    "sn": "KT21ZCH2ZF170012",
    "params": {
        "quotas": [
            "pd.powerMode"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "pd.powerMode": 2
    },
    "tid": ""
}
            
        
GetAllQuotaResponse
How to transfer request parameters by this HTTP API.
GET: /iot-open/sign/device/quota/all: GetAllQuotaResponse
Field	Field's Type	Description
pd.idleMode
int
Screen timeout: 0: Disable; 1: Enable
pd.midWindSpeedCnt
int
Count of setting medium wind speed
power.acFreq
int
AC input frequency
power.batVolt
int
Battery voltage
pd.pdSubMode
int
Set sub-mode
pd.lowWindSpeedCnt
int
Count of setting low wind speed
motor.power
int
Motor operating power
pd.batChgStatus
int
Battery charging/discharging status
motor.motorFsmState
int
Current state of main state machine
motor.windTime
int
Working duration in fan mode (sec)
motor.threeWayState
int
Three-way valve status
pd.tempDisplay
int
Temperature display: 0: Display ambient temperature; 1: Display air outlet temperature
motor.vBus
int
Bus voltage feedback
power.mpptLockFlag
uint8_t
MPPT lock flag
bms.bmsDisplayTime
int
Time displayed in BMS (min)
pd.ver
int
Version of drainage logic
pd.heatEnv
int
Return air temperature in condensation zone, magnified 100 times
bms.maxCellVol
int
Maximum cell voltage
bms.bmsBatErrCode
int
BMS error code
pd.dmPowerSupplyCnt
int
Count of using DELTA Max as the power source
motor.mosTemp
int
MOS tube temperature feedback
power.acWattsRange0Time
int
Length of time when AC power falls in interval 0 (101 W-200 W), measured in seconds
pd.mpptPwr
int
PV input power
bms.bmsSoc
int
Battery SoC
pd.CompressorTempCnt
int
Count of temperature sensor errors at the compressor discharge pipe
motor.hpProtFlg
int
High pressure protection flag bit
pd.batVolt
int
Battery voltage (unit: 0.01 V)
power.mpptVolRange0Time
int
Length of time when MPPT power supply voltage falls in interval 0 (11 V-20 V), measured in seconds
pd.envTempRangeCnt
[int]
Count of ambient temperature intervals; the range is 0-55 degrees Celsius; each interval covers 5 degrees; it is counted every time the button is pressed to power on.
power.powerResv
            
[
    "int"
]
            
        
Reserved power field: 32 bytes
power.batCurr
int
Battery current (mA)
motor.motorResv
            
[
    "int"
]
            
        
Reserved motor field: 32 bytes
pd.fanValue
int
Wind speed in the current mode: 0: Low; 1: Medium; 2: High
pd.busVol
int
Bus voltage
power.acWattsRange4Time
int
Length of time when AC power falls in interval 4 (501 W-600 W), measured in seconds
motor.frontFanWorkTime
int
Working duration of front fan (sec)
motor.compressorWorkTime
int
Working duration of compressor (sec)
pd.powerMode
int
Remotely power on/off: 1: Power on; 2: Power off,
motor.serveFsmState
int
Current state of the service state machine
motor.coolSleepTime
int
Working duration in the Sleep mode of Cool mode (sec)
motor.setCondFanRpm
int
Set condensing fan speed
power.errCode
int
Fault error
pd.batSoc
int
Battery SoC (0-100)
motor.setEvapFanRpm
int
Set evaporative fan speed
power.runSts
int
bit0 ac_in; bit1 pfc; bit2 llc; bit3 mppt: 1: Run; 0: Not run
pd.deviceName
String
Name
power.pfcOcpS
uint8_t
Count of PFC software overcurrent
power.fanSts
int
Fan speed level: 0-4; 0 for non-rotation
pd.tempSys
int
Unit of temperature: 0: Celsius; 1: Fahrenheit
power.mpptVolRange3Time
int
Length of time when MPPT power supply voltage falls in interval 3 (41 V-50 V), measured in seconds
pd.sacWorkTime
int
Device working duration
bms.remainCap
int
Remaining capacity
pd.pdTempSys
int
Unit of temperature
pd.bmsBoundFlag
int
Upper and lower limits on main battery pack charging and discharging: 0: Normal charging and discharging; 1: Upper limit on charging
pd.condTemp
int
Condensation temperature, magnified 100 times
power.batPwrOut
int
Battery output power (W)
motor.ecoStopFlag
int
Energy-saving shutdown protection flag bit
bms.bmsCur
int
BMS current (1 mA)
power.mpptVolRange1Time
int
Length of time when MPPT power supply voltage falls in interval 1 (21 V-30 V), measured in seconds
power.mpptWork
int
MPPT operating status; 1: Car charging; 2: Solar charging
power.resv
[int]
Reserved bytes: 31 bytes
motor.fourWaySwitchCnt
int
Count of four-way valve switching
pd.beepEn
int
Buzzer enabling status: 0: Disabled; 1: Enabled
pd.runSts
int
bit0 ac_in; bit1 pfc; bit2 llc; bit3 mppt: 1: Run; 0: Not run
motor.waterValue
int
Water level: 0: Level 1; 1: Level 2; 2: Full
pd.batCurr
int
Battery current (mA)
pd.dp2PowerSupplyCnt
int
Count of using DELTA 2 as the power source
pd.rlySts
int
bit0 soft start rly; bit1 ac rly; 1: Closed; 0: Open
bms.chgWattRangeTime
[int]
Length of time (sec) when the charging power falls in each of the four intervals
power.acPowerSupplyCnt
int
Count of using AC power supply
pd.setTempCel
int
Set temperature in degrees Celsius
pd.pvPower
int
PV charging power
pd.hotSleepCnt
int
Count of setting the Sleep mode in Heat mode
power.acWattsRange1Time
int
Length of time when AC power falls in interval 1 (201 W-300 W), measured in seconds
pd.timeEn
int
0: Timer off; 1: Timer on
pd.batPwrOut
int
Battery output power (W)
motor.drainageTime
int
Duration of outward drainage (sec)
motor.hotNormalTime
int
Working duration in Normal mode of the Heat mode (sec)
pd.bmsPid
int
Product ID of BMS
bms.sleepCnt
int
Count of pressing the Sleep button
pd.acFreq
int
AC input frequency
pd.mpptVol
int
PV voltage (unit: 0.01 V)
pd.acCurrRms
int
RMS value of the AC input current (mA)
bms.xt150AccessCnt
int
Count of XT150 connections
power.acVoltRms
int
RMS value of the AC input voltage (unit: 0.1 V)
power.mpptWattsRange0Time
int
Length of time when MPPT power supply falls in interval 0 (101 W-200 W), measured in seconds
motor.setEleExpansStep
int
Opening of electronic expansion valve
pd.setFanVal
int
Fan speed
pd.batPowerSupplyTime
int
Duration of using battery provided with the air conditioner (min)
power.busVol
int
Bus voltage (unit: 0.1 V)
power.acPwrIn
int
AC input power (W)
pd.hotNormalCnt
int
Count of setting the Normal mode in Heat mode
pd.acPwrIn
int
AC input power (W)
motor.hotSleepTime
int
Working duration in the Sleep mode of Heat mode (sec)
pd.coolMaxCnt
int
Count of setting the Max mode in Cool mode
bms.awakeCnt
int
Count of pressing button for wakeup
pd.frontInTempErrCnt
int
Count of temperature sensor errors at the front air inlet
bms.maxCellTemp
int
Maximum cell temperature
bms.powerOnCnt
int
Count of pressing button for startup
power.pvOcpHw
uint8_t
Count of PV overcurrent
power.acWattsRange5Time
int
Length of time when AC power falls in interval 5 (601 W-700 W), measured in seconds
pd.bmsUnderVoltage
int
Battery undervoltage flag bit: 0: Normal; 1: Undervoltage
bms.bmsType
int
0:master,1:slaver
pd.tempNtc
int
NTC temperature (unit: 0.1°C)
power.carPowerSupplyCnt
int
Count of car charging
pd.envTemp
float
Ambient temperature
pd.waterValue
int
Water level: 0: Level 1; 1: Level 2; 2: Full
motor.drainageCnt
int
Count of outward drainage
power.mpptCur
int
PV current (mA)
bms.minCellVol
int
Minimum cell voltage
pd.sacIdleTime
int
Device standby time
pd.acVoltRms
int
RMS value of the AC input voltage (unit: 0.1 V)
pd.dp2PowerSupplyTime
int
Duration of using DELTA 2 as the power source (min)
motor.evapFanRpm
int
Evaporative fan speed feedback
power.mpptSts
int
PV execution status
pd.coolNormalCnt
int
Count of setting the Normal mode in Cool mode
bms.bmsReqVol
int
BMS request voltage (unit: 1 mV)
pd.coolEnv
int
Air outlet temperature, magnified 100 times
motor.frontFanBlockCnt
int
Count of front fan blocking
pd.setTemp
int
Temperature set in current mode
pd.batChgRemain
int
Remaining battery charging time
pd.coolTemp
float
Air outlet temperature
pd.powerOffCounts
int
Count of shutdown
pd.sacWattRangeTime
[int]
Length of time the device power falls in each interval (sec). The intervals include 101 W-200 W, 201 W-300 W, 301 W-400 W, 401 W-500 W, 501 W-600 W, and 601 W-700 W.
pd.errPowerCommCnt
int
Count of power communication errors
pd.mpptCur
int
PV current (mA)
pd.backPipeTempErrCnt
int
Count of temperature sensor errors at the rear copper pipe
pd.mpptSts
int
PV execution status
motor.fourWayWorkTime
int
Working duration of four-way valve (sec)
motor.mtrLogicErr
int
Current state of the service state machine
motor.focId
uint32_t
foc id
motor.protFlag
int
Shutdown protection flag bit
bms.bmsDsgTime
int
BMS discharging time (min)
bms.bmsHwFlag
int
Hardware in place
pd.dpPowerSupplyCnt
int
Count of using DELTA Pro as the power source
power.errLock
uint8_t
Error lock
pd.mpptWork
int
MPPT operating status; 1: Car charging; 2: Solar charging
power.mpptVolRange2Time
int
Length of time when MPPT power supply voltage falls in interval 2 (31 V-40 V), measured in seconds
pd.powerOnCounts
int
Count of startup
motor.compressorRpm
int
Compressor speed feedback
power.mpptWattsRange1Time
int
Length of time when MPPT power supply falls in interval 1 (201 W-300 W), measured in seconds
motor.coolMaxTime
int
Working duration in the Max mode of Cool mode (sec)
bms.minCellTemp
int
Minimum cell temperature
pd.idleTime
int
Screen timeout (sec)
pd.hotEcoCnt
int
Count of setting the ECO mode in Heat mode
pd.pdResv
            
[
    "int"
]
            
        
Reserved pd field: 32 bytes
pd.mainMode
int
Main mode: 0: Cool; 1: Heat; 2: Fan
bms.bmsSwFlag
int
Software in place
motor.pMtrCnt
int
Motor communication counter
pd.busVolt
int
Bus voltage
pd.bmsErr
int
BMS error code
pd.refEn
int
Cool/Heat enabling flag: 0: Cool/Heat mode cannot be set; 1: Cool/Heat mode can be set
pd.errAllCnt
int
Total count of errors
pd.pdMainMode
int
Set mode
bms.resv
[int]
Reserved bytes: 16 bytes
pd.frontPipeTempErrCnt
int
Count of temperature sensor errors at the front copper pipe
pd.highWindSpeedCnt
int
Count of setting high wind speed
power.acCurrRms
int
RMS value of the AC input current (mA)
motor.fourWayState
int
Status of the four-way valve
pd.psdrPower
int
Power supply power
pd.errMotorCommCnt
int
Count of motor communication errors
pd.timeSet
int
Time set for current mode (min)
pd.dpPowerSupplyTime
int
Duration of using DELTA Pro as the power source (min)
power.llcCurr
float
LLC output current
pd.timeRemain
int
Remaining time in current mode (min)
power.busVolt
int
Bus voltage
power.rlySts
int
bit0 soft start rly; bit1 ac rly; 1: Closed; 0: Open
pd.wteFthEn
int
bit1 (main switch of automatic drainage function): 0: On; 1: Off bit0: (in Cool/Fan mode): 0: Manual drainage; 1: No drainage (in Heat mode): 0: Off; 1: Physical drainage
bms.bmsVol
int
BMS voltage (unit: 1mV)
power.acWattsRange2Time
int
Length of time when AC power falls in interval 2 (301 W-400 W), measured in seconds
pd.hotMaxCnt
int
Count of setting the Max mode in Heat mode
bms.bmsReqCur
int
BMS request current (unit: 1 mA)
pd.powerSrc
int
Input source: bit0: AC; bit1: MPTT; bit2: Battery main pack; bit3: Battery slave pack
power.tempNtc
int
NTC temperature (unit: 0.1°C)
power.tempMax
int8_t
The highest temperature among the four temperatures: MPPT temperature, PFC temperature, LLC high-voltage side temperature, and LLC low-voltage side temperature
motor.commcAck
int
Motor operating mode
pd.batPowerSupplyCnt
int
Count of using battery provided with the air conditioner
pd.errWifiCommCnt
int
Count of Wi-Fi communication errors
motor.backFanBlockCnt
int
Count of rear fan blocking
motor.setWaterRpm
int
Water pump speed settings
motor.errCode
int
Error code
pd.fanSts
int
Fan speed level: 0-4; 0 for non-rotation
pd.windCnt
int
Count of setting in Fan mode
pd.sysPowerWatts
int
System power
motor.hotEcoTime
int
Working duration in the ECO mode of the Heat mode (sec)
power.tempMin
int8_t
The minimum temperature value among the four temperatures: MPPT temperature, PFC temperature, LLC high-voltage side temperature, and LLC low-voltage side temperature
bms.bmsChgTime
int
BMS charging duration (min)
motor.hotMaxTime
int
Working duration in the Max mode of Heat mode (sec)
pd.rgbState
int
Light strip settings: 0: Follow the screen; 1: Always on; 2: Always off
pd.resv
[int]
Reserved bytes: 31 bytes
pd.frontOutTempErrCnt
int
Count of temperature sensor errors at the front air outlet
pd.powerSts
int
Power supply status
power.pvPowerSupplyCnt
int
Count of using PV power supply
motor.backFanWorkTime
int
Working duration of rear fan (sec)
pd.evapTemp
int
Evaporation temperature, magnified 100 times
bms.powerOffCnt
int
Count of pressing button for shutdown
power.mpptVol
int
PV voltage (unit: 0.01 V)
power.mpptWattsRange2Time
int
Length of time when MPPT power supply falls in interval 2 (301 W-400 W), measured in seconds
motor.condeFanRpm
int
Condensing fan speed feedback
bms.bmsMinDsgSoc
int
UPS minimum discharge SoC
pd.batDsgRemain
int
Remaining battery discharging time
motor.setCompressorRpm
int
Compressor speed settings
pd.batPower
int
Battery power
pd.motorOutTemp
int
Exhaust temperature, magnified 100 times
motor.resv
[int]
Reserved 10 bytes
pd.recv
            
[
    "int"
]
            
        
Reserved 15 bytes
power.llcOcpInt
uint8_t
Count of LLC overcurrent
pd.reserved
            
[
    "int"
]
            
        
Reserved field: 20 bytes
pd.pdErrCode
int
Error code
pd.coolSleepCnt
int
Count of setting the Sleep mode in Cool mode
power.psdrCnt
int
Communication counter
pd.frontBarTempErrCnt
int
Count of temperature sensor errors at the front copper bar
motor.waterPumpWorkTime
int
Working duration of water pump (sec)
motor.serveCtrlErr
int
Service shutdown error code
pd.psdrCnt
int
Communication counter
pd.airInTemp
int
Evaporation zone return air temperature, magnified 100 times
pd.setTempfah
int
Set temperature in degrees Fahrenheit
motor.coolEcoTime
int
Working duration in the ECO mode of Cool mode (sec)
motor.v24
int
24 V voltage feedback
power.mpptPwr
int
PV input power (W)
bms.bmsMaxChgSoc
int
UPS maximum charging SOC
pd.llcCurr
float
LLC output current
motor.coolNormalTime
int
Working duration in the Normal mode of Cool mode (sec)
pd.errCode
int
Error code
pd.lcdStatus
int
Screen enabling bit
power.mpptVolRange4Time
int
Length of time when MPPT power supply voltage falls in interval 4 (51 V-60 V), measured in seconds
pd.coolEcoCnt
int
Count of setting the ECO mode in Cool mode
pd.dmPowerSupplyTime
int
Duration of using DELTA Max as the power source (min)
bms.bmsChgDsgSts
int
0:idle,1:chg 2:dsg
pd.subMode
int
Set sub-mode
power.acWattsRange3Time
int
Length of time when AC power falls in interval 3 (401 W-500 W), measured in seconds
Example
{
    "code": "0",
    "message": "Success",
    "data": {
        "pd.idleMode": 1,
        "power.acFreq": 50,
        "pd.midWindSpeedCnt": 539,
        "power.batVolt": 74,
        "pd.pdSubMode": 3,
        "pd.lowWindSpeedCnt": 501,
        "motor.power": 0,
        "pd.batChgStatus": 0,
        "motor.motorFsmState": 9,
        "motor.windTime": 462733,
        "motor.threeWayState": 0,
        "pd.tempDisplay": 1,
        "motor.vBus": 112,
        "power.mpptLockFlag": 0,
        "bms.bmsDisplayTime": 0,
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
ParamInfo Message Format
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
                
            
Set Command	SetTopic's ParamInfo	SetReplyTopic's ParamInfo
Set main mode(0: Cool, 1: Heat, 2: Fan)
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleType": 1,
    "operateType": "mainMode",
    "params": {
        "mainMode": 0
    }
}
            
        
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleType": 1,
    "time": 18118340,
    "code": 0,
    "operateType": "mainMode",
    "data": {
        "ack": 0
    }
}
            
        
Set sub-mode(0: Max, 1: Sleep, 2: Eco, 3: Manual)
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleType": 1,
    "operateType": "subMode",
    "params": {
        "subMode": 3
    }
}
            
        
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleType": 1,
    "time": 18087130,
    "code": 0,
    "operateType": "subMode",
    "data": {
        "ack": 0
    }
}
            
        
Set unit of temperature(0: Celsius; 1: Fahrenheit)
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleType": 1,
    "operateType": "tempSys",
    "params": {
        "mode": 1
    }
}
            
        
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleType": 1,
    "time": 18061410,
    "code": 0,
    "operateType": "tempSys",
    "data": {
        "ack": 0
    }
}
            
        
Set screen timeout (unit: sec; Always on: "idleTime":0,"idleMode":0)
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleType": 1,
    "operateType": "display",
    "params": {
        "idleTime": 5,
        "idleMode": 1
    }
}
            
        
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleType": 1,
    "time": 18035600,
    "code": 0,
    "operateType": "display",
    "data": {
        "ack": 0
    }
}
            
        
Set timer(timeSet: 0-65535; Unit: min;timeEn: 0: Turn off 1: Turn on)
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleType": 1,
    "operateType": "sacTiming",
    "params": {
        "timeSet": 100,
        "timeEn": 1
    }
}
            
        
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleType": 1,
    "time": 18006110,
    "code": 0,
    "operateType": "sacTiming",
    "data": {
        "ack": 0
    }
}
            
        
Enable buzzer (0: Disable; 1: Enable)
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleType": 1,
    "operateType": "beepEn",
    "params": {
        "en": 1
    }
}
            
        
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleType": 1,
    "time": 17978460,
    "code": 0,
    "operateType": "beepEn",
    "data": {
        "ack": 0
    }
}
            
        
Set temperature(16-30 ℃)
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleType": 1,
    "operateType": "setTemp",
    "params": {
        "setTemp": 27
    }
}
            
        
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleType": 1,
    "time": 17946640,
    "code": 0,
    "operateType": "setTemp",
    "data": {
        "ack": 0
    }
}
            
        
Set temperature display (0: Display ambient temperature; 1: Display air outlet temperature)
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleType": 1,
    "operateType": "tempDisplay",
    "params": {
        "tempDisplay": 1
    }
}
            
        
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleType": 1,
    "time": 17913760,
    "code": 0,
    "operateType": "tempDisplay",
    "data": {
        "ack": 0
    }
}
            
        
Set wind speed (0: Low; 1: Medium; 2: High)
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleType": 1,
    "operateType": "fanValue",
    "params": {
        "fanValue": 1
    }
}
            
        
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleType": 1,
    "time": 17888360,
    "code": 0,
    "operateType": "fanValue",
    "data": {
        "ack": 0
    }
}
            
        
Set automatic drainage(In Cool/Fan mode: 0: Turn on Manual drainage，1: Turn on No drainage, 2: Turn off Manual drainage, 3 Turn off No drainageIn Heat Mode: 0: Turn off, 1: Turn on Manual drainage， 3: Turn off Manual drainage)
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleType": 1,
    "operateType": "wteFthEn",
    "params": {
        "wteFthEn": 1
    }
}
            
        
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleType": 1,
    "time": 17858160,
    "code": 0,
    "operateType": "wteFthEn",
    "data": {
        "ack": 0
    }
}
            
        
Light strip settings (0: Follow the screen; 1: Always on; 2: Always off; other parameters indicate “Always off”)
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleType": 1,
    "operateType": "rgbState",
    "params": {
        "rgbState": 0
    }
}
            
        
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleType": 1,
    "time": 17824370,
    "code": 0,
    "operateType": "rgbState",
    "data": {
        "ack": 0
    }
}
            
        
Remote startup/shutdown (1: Startup; 2: Standby; 3: Shutdown)
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleType": 1,
    "operateType": "powerMode",
    "params": {
        "powerMode": 1
    }
}
            
        
            
{
    "id": 123456789,
    "version": "1.0",
    "moduleType": 1,
    "time": 10559000,
    "code": 0,
    "operateType": "powerMode",
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
PD-analysisPD
{
    "id": 172279,
    "version": "1.0",
    "time": 61831790,
    "moduleType": 1,
    "needAck": 0,
    "typeCode": "analysisPD",
    "params": {
        "pdMainMode": 2,
        "pdSubMode": 3,
        "pdTempSys": 0,
        "setTempCel": 18,
        "setTempfah": 64,
        "setFanVal": 0,
        "lcdStatus": 1,
        "heatEnv": 2382,
        "coolEnv": 2547,
        "condTemp": 2391,
        "evapTemp": 2449,
        "motorOutTemp": 2677,
        "airInTemp": 2453,
        "pdErrCode": 0,
        "sysPowerWatts": 0,
        "waterValue": 0,
        "powerSts": 1
    }
}
PD-devStatus
{
    "id": 172287,
    "version": "1.0",
    "time": 61834890,
    "moduleType": 1,
    "needAck": 0,
    "typeCode": "devStatus",
    "params": {
        "envTemp": 24.5,
        "coolTemp": 25.4
    }
}
BMS-analysisPOWER
{
    "id": 61835216,
    "version": "1.0",
    "time": 61834680,
    "moduleType": 2,
    "needAck": 0,
    "typeCode": "analysisPOWER",
    "params": {
        "errCode": 0,
        "rlySts": 2,
        "runSts": 1,
        "acVoltRms": 232,
        "acCurrRms": 5870,
        "acPwrIn": 0,
        "busVolt": 3457,
        "busCurr": 0,
        "batVolt": 73,
        "batCurr": 0,
        "batPwrOut": 0,
        "busVol": 3457,
        "tempNtc": 37,
        "fanSts": 25,
        "psdrCnt": 25253,
        "mpptVol": 25,
        "mpptCur": 0,
        "mpptPwr": 0,
        "mpptSts": 0,
        "mpptWork": 0,
        "llcCurr": -24.7,
        "acFreq": 50,
        "mpptLockFlag": 0,
        "errLock": 0,
        "pfcOcpS": 0,
        "tempMax": 0,
        "tempMin": 0,
        "llcOcpInt": 0,
        "pvOcpHw": 0,
        "resv": [
            0,
            0,
            0,
            0
        ]
    }
}
BMS_SLAVE-analysisBMS
{
    "id": 61838316,
    "version": "1.0",
    "time": 61837780,
    "moduleType": 4,
    "needAck": 0,
    "typeCode": "analysisBMS",
    "params": {
        "bmsHwFlag": 0,
        "bmsSwFlag": 0,
        "bmsType": 0,
        "bmsChgDsgSts": 0,
        "bmsSoc": 0,
        "bmsMaxChgSoc": 0,
        "bmsMinDsgSoc": 0,
        "bmsVol": 0,
        "bmsCur": 0,
        "bmsReqVol": 0,
        "bmsReqCur": 0,
        "bmsChgTime": 0,
        "bmsDsgTime": 0,
        "bmsDisplayTime": 0,
        "bmsBatErrCode": 0,
        "maxCellVol": 0,
        "minCellVol": 0,
        "maxCellTemp": 0,
        "minCellTemp": 0,
        "remainCap": 0
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
Device online or not 0: No, 1: Yes
Was this page helpful?