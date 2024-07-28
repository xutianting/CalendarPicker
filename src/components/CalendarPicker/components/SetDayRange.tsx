import TimeEditor from "@/components/CalendarPicker/components/TimeEditor.tsx";
import { showDate } from "@/components/CalendarPicker/utils.ts";
import styles from './SetDayRange.module.less'
import { useState } from "react";

export type Time = {
    hour: number;
    minute: number;
    second: number;
};

type SetDayRangeProps={
    currentDate:Date,
    selectedStartDate?:Date,
    selectedEndDate?:Date,
    onCurrentDate:(date:Date)=>void,
    onStartDate:(date:Date)=>void,
    onEndDate:(date:Date)=>void,
    showTime:boolean,
}
const SetDayRange=(props:SetDayRangeProps)=> {
    const {currentDate,selectedStartDate,selectedEndDate,onCurrentDate,onStartDate,onEndDate,showTime} = props
    const [startTimes,setStartTimes] = useState<Time>()
    const [endTimes,setEndTimes] = useState<Time>()
    const setCurrentTime=()=>{
        return {
            hour:new Date().getHours(),
            minute: new Date().getMinutes(),
            second:new Date().getSeconds(),
        }
    }

    return <div className={styles.times}>
        <div className={styles.startTime}>
            <div style={{cursor: 'pointer'}} onClick={() => {
                if ( selectedEndDate ){
                    const date=new Date(currentDate.getFullYear(),currentDate.getMonth(),currentDate.getDate(),0,0,0)
                    if ( date > selectedEndDate ){
                        alert('请选择比结束日期小的时间')
                        return
                    }
                }
                onStartDate(currentDate)

                if(showTime){
                    setStartTimes(setCurrentTime())
                    // if(showDate(selectedStartDate) === showDate(selectedEndDate)){
                    //     console.log(1)
                    //     if(endTimes){
                    //         console.log(2)
                    //         const time: Time = {...endTimes}
                    //         setStartTimes(time)
                    //     }else{
                    //         setStartTimes(setCurrentTime())
                    //     }
                    // }else{
                    //     setStartTimes(setCurrentTime())
                    // }
                }
            }}>开始时间
            </div>
            <div className={styles.dayShow} onClick={() => {
                if(selectedStartDate){
                    onCurrentDate(new Date(showDate(selectedStartDate)))
                }
            }}>{showDate(selectedStartDate)}</div>
            <div>
                {selectedStartDate&&startTimes&&<TimeEditor value={startTimes} onChange={(val) => {
                    if(showDate(selectedStartDate) === showDate(selectedEndDate)){
                        if(!endTimes){
                            setStartTimes(val)
                            onStartDate(new Date(selectedStartDate.getFullYear(),selectedStartDate.getMonth(),selectedStartDate.getDate(),val.hour,val.minute,val.second))
                            return
                        }
                        if(val.hour > endTimes.hour||
                            (val.hour <= endTimes.hour&&val.minute>endTimes.minute)||
                            (val.hour <= endTimes.hour&&val.minute<=endTimes.minute&&val.second>endTimes.second)){
                            alert("开始时间不能大于结束时间")
                            const time={...endTimes}
                            setStartTimes(time)
                            onStartDate(new Date(selectedStartDate.getFullYear(),selectedStartDate.getMonth(),selectedStartDate.getDate(),time.hour,time.minute,time.second))
                            return
                        }
                        setStartTimes(val)
                        onStartDate(new Date(selectedStartDate.getFullYear(),selectedStartDate.getMonth(),selectedStartDate.getDate(),val.hour,val.minute,val.second))
                    }else{
                        setStartTimes(val)
                        onStartDate(new Date(selectedStartDate.getFullYear(),selectedStartDate.getMonth(),selectedStartDate.getDate(),val.hour,val.minute,val.second))
                    }
                }}/>}
            </div>
        </div>
        <div className={styles.endTime}>
            <div style={{cursor: 'pointer'}} onClick={() => {
                if ( selectedStartDate ){
                    const date=new Date(currentDate.getFullYear(),currentDate.getMonth(),currentDate.getDate(),23,59,59)
                    if ( date < selectedStartDate ){
                        alert('请选择比开始日期大的时间')
                        return
                    }
                }
                onEndDate(currentDate)
                if(showTime){
                    setEndTimes(setCurrentTime())
                }
            }}>结束时间
            </div>
            <div className={styles.dayShow} onClick={() => {
                if(selectedEndDate){
                    onCurrentDate(new Date(showDate(selectedEndDate)))
                }
            }}>{
                showDate(selectedEndDate)
            }</div>
            <div>
                {selectedEndDate&&endTimes&& <TimeEditor value={endTimes} onChange={(val) => {
                    if(showDate(selectedStartDate) === showDate(selectedEndDate)){
                        if(!startTimes){
                            setEndTimes(val)
                            onEndDate(new Date(selectedEndDate.getFullYear(),selectedEndDate.getMonth(),selectedEndDate.getDate(),val.hour,val.minute,val.second))
                            return
                        }
                        if(val.hour < startTimes.hour||
                            (val.hour >= startTimes.hour&&val.minute<startTimes.minute)||
                            (val.hour >= startTimes.hour&&val.minute>=startTimes.minute&&val.second<startTimes.second)){
                            alert('结束时间不能小于开始时间')
                            const time={...startTimes}
                            setEndTimes(time)
                            onEndDate(new Date(selectedEndDate.getFullYear(),selectedEndDate.getMonth(),selectedEndDate.getDate(),time.hour,time.minute,time.second))
                            return
                        }
                        setEndTimes(val)
                        onEndDate(new Date(selectedEndDate.getFullYear(),selectedEndDate.getMonth(),selectedEndDate.getDate(),val.hour,val.minute,val.second))
                    }else{
                        setEndTimes(val)
                        onEndDate(new Date(selectedEndDate.getFullYear(),selectedEndDate.getMonth(),selectedEndDate.getDate(),val.hour,val.minute,val.second))
                    }
                }}/>}
            </div>
        </div>
    </div>
}
export default SetDayRange