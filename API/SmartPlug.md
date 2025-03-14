Smart Plug

HTTP communication mode
Set & Get Quota
How to transfer request parameters by these two HTTP API.
PUT: /iot-open/sign/device/quota: SetCmdRequest
GET: /iot-open/sign/device/quota: GetCmdRequest, GetCmdResponse
Set Command	SetCmdRequest	GetCmdRequest	GetCmdResponse
Relay switch(0: off, 1: on)
            
{
    "sn": "HW52ZDH1RF3J0033",
    "cmdCode": "WN511_SOCKET_SET_PLUG_SWITCH_MESSAGE",
    "params": {
        "plugSwitch": 0
    }
}
            
        
            
{
    "sn": "HW52ZDH1RF3J0033",
    "params": {
        "quotas": [
            "2_1.switchSta"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "2_1.switchSta": false
    },
    "tid": ""
}
            
        
Indicator light brightness adjustment(rgb brightness: 0-1023 (the larger the value, the higher the brightness); default value: 1023)
            
{
    "sn": "HW52ZDH1RF3J0033",
    "cmdCode": "WN511_SOCKET_SET_BRIGHTNESS_PACK",
    "params": {
        "brightness": 1000
    }
}
            
        
            
{
    "sn": "HW52ZDH1RF3J0033",
    "params": {
        "quotas": [
            "2_1.brightness"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "2_1.brightness": 1000
    },
    "tid": ""
}
            
        
Deleting scheduled tasks(taskIndex: 0-9)
            
{
    "sn": "HW52ZDH1RF3J0033",
    "cmdCode": "WN511_SOCKET_DELETE_TIME_TASK",
    "params": {
        "taskIndex": 1
    }
}
            
        
            
{
    "sn": "HW52ZDH1RF3J0033",
    "params": {
        "quotas": [
            "2_2.task5"
        ]
    }
}
            
        
            
{
    "code": "0",
    "message": "Success",
    "data": {
        "2_2.task5": {
            "taskIndex": 4,
            "type": 0,
            "timeRange": {
                "isConfig": false,
                "timeData": 0,
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
                "stopTime": {
                    "sec": 0,
                    "week": 0,
                    "min": 0,
                    "hour": 0,
                    "month": 0,
                    "year": 0,
                    "day": 0
                },
                "isEnable": false
            }
        }
    },
    "tid": ""
}
            
        
GetAllQuotaResponse
How to transfer request parameters by this HTTP API.
GET: /iot-open/sign/device/quota/all: GetAllQuotaResponse
heartbeat(2_1)
Field	Field's Type	Description
2_1.switchSta
int
Smart plug switch status
2_1.country
int
Country
2_1.temp
int
Smart plug temperature
2_1.town
int
City
2_1.freq
int
Operating frequency (Hz)
2_1.updateTime
int
Update time
2_1.warnCode
int
Smart plug warning code
2_1.current
int
Operating current (mA)
2_1.maxCur
int
Maximum output current: 0.1 A
2_1.watts
int
Operating output power: 0.1 W
2_1.brightness
int
RGB light brightness: 0–1023 (the larger the value, the higher the brightness)
2_1.volt
int
Operating voltage (V)
2_1.errCode
int
Error code
task(2_2)
Field	Field's Type	Description
2_2.task
json
Scheduled task
2_2.taskIndex
int
Task coding
2_2.type
int
Task type: 1: prioritize power supply; 2: prioritize power storage
2_2.timeRange
json
Time configuration
2_2.isEnable
boolean
Whether to enable: 0: no; 1: yes
2_2.isConfig
boolean
Whether to configure: 0: no; 1: yes
2_2.timeData
int
mode == 1, bit0-bit6 represents Monday to Saturday respectively; mode == 2, bit0-bit30 represents the 1st to the 31st
2_2.timeMode
int
Scheduled mode: 0: daily; 1: weekly; 2: monthly; 3: do not repeat
2_2.startTime
int
Task start time
2_2.stopTime
int
Task end time
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
    "cmdCode": "WN511_SET_SUPPLY_PRIORITY_PACK",
    "params": {
        "supplyPriority": 1
    }
}
                
            
Set Command	SetTopic's ParamInfo	SetReplyTopic's ParamInfo	Observation Indicator
Relay switch(0: off, 1: on)
            
{
    "id": 123456789,
    "version": "1.0",
    "cmdCode": "WN511_SOCKET_SET_PLUG_SWITCH_MESSAGE",
    "params": {
        "plugSwitch": 0
    }
}
            
        
            
{
    "id": 123456789,
    "data": {
        "ack": 0
    }
}
            
        
switchSta
Indicator light brightness adjustment(rgb brightness: 0-1023 (the larger the value, the higher the brightness); default value: 1023)
            
{
    "id": 123456789,
    "version": "1.0",
    "cmdCode": "WN511_SOCKET_SET_BRIGHTNESS_PACK",
    "params": {
        "brightness": 1000
    }
}
            
        
            
{
    "data": {
        "ack": 0
    },
    "id": 123456789
}
            
        
brightness
Deletiing scheduled task(taskIndex: 0-9)
            
{
    "id": 123456789,
    "version": "1.0",
    "cmdCode": "WN511_SOCKET_DELETE_TIME_TASK",
    "params": {
        "taskIndex": 1
    }
}
            
        
            
{
    "data": {
        "result": 1
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
heartbeat(2_1)
{
    "cmdId": 1,
    "cmdFunc": 2,
    "param": {
        "lanState": 3,
        "country": 17230,
        "selfMac": 487292708,
        "stackMinFree": 40,
        "resetCount": 3,
        "freq": 50,
        "warnCode": 0,
        "resetReason": 1,
        "current": 450,
        "watts": 10,
        "runTime": 279924,
        "switchSta": false,
        "temp": 39,
        "stackFree": 70,
        "parentMac": 0,
        "town": 0,
        "meshLayel": 0,
        "updateTime": "2023-09-16 16:45:03",
        "meshId": 16130048,
        "rtcResetReason": 1,
        "maxCur": 0,
        "brightness": 1023,
        "heartbeatFrequency": 2,
        "errCode": 0,
        "volt": 233,
        "maxWatts": 2500
    }
}
task(2_2)
{
    "cmdId": 2,
    "cmdFunc": 2,
    "param": {
        "task1": {
            "taskIndex": 0,
            "type": 0,
            "timeRange": {
                "isConfig": false,
                "timeData": 0,
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
                "stopTime": {
                    "sec": 0,
                    "week": 0,
                    "min": 0,
                    "hour": 0,
                    "month": 0,
                    "year": 0,
                    "day": 0
                },
                "isEnable": false
            },
            "task2": {
                ...
            },
            ...
        }
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