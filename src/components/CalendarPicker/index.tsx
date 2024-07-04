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
    const {value,onChange,showTime = true} = props
    const weekdays = [ 'S','M','T','W','T','F','S' ];
    const [ currentDate,setCurrentDate ] = useState(new Date());
    const [ selectedDate,setSelectedDate ] = useState<Date>();
    const [ selectedStartDate,setSelectedStartDate ] = useState<Date>();
    const [ selectedEndDate,setSelectedEndDate ] = useState<Date>();

    const [ hourTime,setHourTime ] = useState(0);
    const {days} = useCalendarPicker(currentDate,selectedStartDate,selectedEndDate);
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const getCurrentDayNumber = (date: Date | null) => {
        if ( !date ){
            return 0
        }
        return date.getDate()
    }
    const handleScroll = (event) => {
        // // 阻止事件冒泡
        // event.stopPropagation();
        // // 阻止默认行为
        // event.preventDefault();

        // 处理鼠标滚轮事件的逻辑
        if ( event.deltaY > 0 ){
            setHourTime(prevState => prevState - 1)
            // 向下滚动
            console.log("向下滚动");
        } else if ( event.deltaY < 0 ){
            setHourTime(prevState => prevState + 1)
            // 向上滚动
            console.log("向上滚动");
        }
    };
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
                                    return <div key={index} className={day.hasBack ? "dayDiv backColor" : "dayDiv"}>
                                        <div
                                            className={(getCurrentDayNumber(selectedDate) === day.date && showYearMonth(currentDate) === showYearMonth(selectedDate)) || showDate(selectedStartDate) === showDate(new Date(currentDate.getFullYear(),currentDate.getMonth(),day.date)) || showDate(selectedEndDate) === showDate(new Date(currentDate.getFullYear(),currentDate.getMonth(),day.date)) ? "day dayActive" : "day"}
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