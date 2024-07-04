import { showYearMonth } from "@/components/CalendarPicker/utils.ts";
import { useMemo } from "react";

type DayItem = {
    date: number,
    isCurrentMonth: boolean,
    hasBack: boolean
}
const useCalendarPicker = (currentDate: Date,selectedStartDate?: Date,selectedEndDate?: Date) => {
    const currentYearMonth = showYearMonth(currentDate)
    /*当月总天数 是28/29/30/31*/
    const daysInMonth = new Date(currentDate.getFullYear(),currentDate.getMonth() + 1,0).getDate();
    /*当月第一天是星期几*/
    const startingDay = new Date(currentDate.getFullYear(),currentDate.getMonth(),1).getDay();
    // 获取上一个月的最后一天
    const lastDayOfLastMonth = new Date(currentDate.getFullYear(),currentDate.getMonth(),0).getDate();

    const days: DayItem[][] = useMemo(()=>{
        let date: number = 1;
        const newDays: DayItem[][] = [];
        for ( let i = 0; i < 6; i++ ){
            const week: DayItem[] = [];

            for ( let j = 0; j < 7; j++ ){


                if ( i === 0 && j < startingDay ){
                    week.push({date: lastDayOfLastMonth - startingDay + j + 1,isCurrentMonth: false,hasBack: false});


                } else if ( date > daysInMonth ){
                    break;
                } else{
                    if ( selectedStartDate && selectedEndDate ){
                        const startInCurrent = showYearMonth(currentDate) === showYearMonth(selectedStartDate)
                        const endInCurrent = showYearMonth(currentDate) === showYearMonth(selectedEndDate)
                        //开始日期，结束日期在当月的情况
                        if ( startInCurrent && endInCurrent && selectedStartDate.getDate() <= date && selectedEndDate.getDate() >= date ){
                            week.push({date: date,isCurrentMonth: true,hasBack: true});
                        } else if ( startInCurrent && !endInCurrent && selectedStartDate.getDate() <= date ){
                            //开始日期在当月，结束日期不在当月的情况
                            week.push({date: date,isCurrentMonth: true,hasBack: true});
                        } else if ( !startInCurrent && endInCurrent && selectedEndDate.getDate() >= date ){
                            //开始日期不在当月，结束日期在当月
                            week.push({date: date,isCurrentMonth: true,hasBack: true});
                        } else if ( !startInCurrent && !endInCurrent && selectedStartDate < currentDate && selectedEndDate > currentDate ){
                            //开始日期不在当月，结束日期不在当月 开始日期小于当月日期，结束日期大于当月日期
                            week.push({date: date,isCurrentMonth: true,hasBack: true});
                        } else{
                            week.push({date: date,isCurrentMonth: true,hasBack: false});
                        }
                    } else{
                        week.push({date: date,isCurrentMonth: true,hasBack: false});
                    }
                    date++;
                }
            }
            if ( week.length !== 0 ){
                newDays.push(week);
            }

        }
        // 获取下一个月需要显示的天数
        const daysFromNextMonth = 7 - newDays[newDays.length - 1].length;

        // 向newDays数组中添加下一个月的日期
        for ( let i = 1; i <= daysFromNextMonth; i++ ){
            newDays[newDays.length - 1].push({date: i,isCurrentMonth: false,hasBack: false});
        }

        if ( newDays.length === 5 ){
            newDays.push([])
            for ( let i = 1; i <= 7; i++ ){
                newDays[5].push({date: i,isCurrentMonth: false,hasBack: false});
            }
        }
        return newDays
    },[currentYearMonth,selectedStartDate,selectedEndDate]);

    return {
        days
    }

}

export default useCalendarPicker