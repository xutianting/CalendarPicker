import '@/components/CalendarPicker/index.less';
import { useState } from "react";
import CalendarYearMonthChange from "@/components/CalendarPicker/components/CalendarYearMonthChange.tsx";
import { showDate,showYearMonth } from "@/components/CalendarPicker/utils.ts";
import SetDayRange from "@/components/CalendarPicker/components/SetDayRange.tsx";
import useCalendarPicker from "@/components/CalendarPicker/useCalendarPicker.ts";

type CalendarPickerProps = {
    value?: [ Date,Date ],
    onChange?: (value: [ Date,Date ]) => void,
    showTime?: boolean,
}
const CalendarPicker = (props: CalendarPickerProps) => {
    const {onChange,showTime = true} = props
    const weekdays = [ 'S','M','T','W','T','F','S' ];
    const [ currentDate,setCurrentDate ] = useState(new Date());
    const [ selectedDate,setSelectedDate ] = useState<Date>();
    const [ selectedStartDate,setSelectedStartDate ] = useState<Date>();
    const [ selectedEndDate,setSelectedEndDate ] = useState<Date>();

    const {days} = useCalendarPicker(currentDate,selectedStartDate,selectedEndDate);
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const getCurrentDayNumber = (date?: Date ) => {
        if ( !date ){
            return 0
        }
        return date.getDate()
    }

    return <div>
        <div className="container">
            <div>
                <CalendarYearMonthChange currentDate={currentDate} onChange={setCurrentDate}
                                         selectedDate={selectedDate}/>
                <div className="weekdays">
                    {weekdays.map((weekday,index) => (<div key={index}>{weekday}</div>))}
                </div>
                <div className="days">
                    {days.map((week,weekIndex) => (
                        <div key={weekIndex} className="week">
                            {week.map((day,index) => {
                                if ( weekIndex === 0 && !day.isCurrentMonth ){
                                    return <div key={index} className={day.hasBack ? "dayDiv backColor" : "dayDiv"}>
                                        <div className="lastMonthDay"
                                             onClick={() => {
                                                 setCurrentDate(new Date(year,month - 1,day.date))
                                                 setSelectedDate(new Date(year,month - 1,day.date))
                                             }}
                                        >{day.date}</div>
                                    </div>
                                } else if ( !day.isCurrentMonth ){
                                    return <div key={index} className={day.hasBack ? "dayDiv backColor" : "dayDiv"}>
                                        <div className="nextMonthDay"
                                             onClick={() => {
                                                 setCurrentDate(new Date(year,month + 1,day.date))
                                                 setSelectedDate(new Date(year,month + 1,day.date))
                                             }}
                                        >{day.date}</div>
                                    </div>

                                } else{
                                    const isStartDate=showDate(selectedStartDate) === showDate(new Date(year,month,day.date))
                                    const isEndDate=showDate(selectedEndDate) === showDate(new Date(year,month,day.date))
                                    const selectedBackCss=()=>{
                                        if(day.hasBack){
                                            if(showDate(selectedStartDate)===showDate(selectedEndDate)){
                                                return "dayDiv backColor"
                                            }
                                            else if(isStartDate){
                                                return "dayDiv backColorRight"
                                            }else if(isEndDate){
                                                return "dayDiv backColorLeft"
                                            }else{
                                                return "dayDiv backColor"
                                            }
                                        }else{
                                            return "dayDiv"
                                        }
                                    }
                                    const selectedCss=()=>{
                                        if(isStartDate){
                                            return "day dayActive"
                                        }else if(isEndDate){
                                            return "day dayActive"
                                        }else if(getCurrentDayNumber(selectedDate) === day.date &&
                                            showYearMonth(currentDate) === showYearMonth(selectedDate)){
                                            return "day daySelect"
                                        }
                                        else{
                                            return "day"
                                        }
                                    }

                                    return <div key={index} className={selectedBackCss()}>
                                        <div
                                            className={selectedCss()}
                                            onClick={() => {
                                                setCurrentDate(new Date(year,month,day.date))
                                                setSelectedDate(new Date(year,month,day.date))
                                            }}>
                                            {day.date}
                                        </div>
                                    </div>
                                }
                            })}
                        </div>
                    ))}
                </div>
                <SetDayRange currentDate={currentDate}
                             selectedStartDate={selectedStartDate}
                             selectedEndDate={selectedEndDate}
                             onCurrentDate={setCurrentDate}
                             onStartDate={(val) => {
                                 setSelectedStartDate(val)
                                 if ( selectedEndDate ){
                                     onChange?.([ val,selectedEndDate ])
                                 }
                             }
                             }
                             onEndDate={(val) => {
                                 setSelectedEndDate(val)
                                 if ( selectedStartDate ){
                                     onChange?.([ selectedStartDate,val ])
                                 }
                             }}
                             showTime={showTime}
                />
                <div className="time">

                </div>
            </div>
        </div>
    </div>
}

export default CalendarPicker