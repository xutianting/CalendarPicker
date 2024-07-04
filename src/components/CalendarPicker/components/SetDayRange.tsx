import TimeEditor from "@/components/CalendarPicker/components/TimeEditor.tsx";
import { showDate,renderTime } from "@/components/CalendarPicker/utils.ts";

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
    return <div className="times">
        <div className="startTime">
            <div style={{cursor: 'pointer'}} onClick={() => {
                if ( selectedEndDate ){
                    if ( currentDate > selectedEndDate ){
                        alert('请选择比结束日期大的时间')
                        return
                    }
                }
                onStartDate(currentDate)
            }}>开始时间
            </div>
            <div className="dayShow" onClick={() => {
                if(selectedStartDate){
                    onCurrentDate(new Date(showDate(selectedStartDate)))
                }
            }}>{showDate(selectedStartDate)}</div>
            <div>{renderTime(currentDate)}</div>
        </div>
        <div className="endTime">
            <div onClick={() => {
                if ( selectedStartDate ){
                    if ( currentDate < selectedStartDate ){
                        alert('请选择比开始日期小的时间')
                        return
                    }
                }
                onEndDate(currentDate)
            }}>结束时间
            </div>
            <div className="dayShow" onClick={() => {
                if(selectedEndDate){
                    onCurrentDate(new Date(showDate(selectedEndDate)))
                }
            }}>{
                showDate(selectedEndDate)
            }</div>
            <div>
                <TimeEditor value={{hours: '07',minutes: '12',seconds: '23'}} onChange={(val) => {
                    console.log('233',val)
                }}/>
                {/*<input*/}
                {/*    style={{width: 50,height: 50,background: 'pink',overflowY: 'hidden'}}*/}
                {/*    onWheel={handleScroll} value={hourTime}*/}
                {/*    onChange={(e) => {*/}
                {/*        if ( e.target.value ){*/}
                {/*            setHourTime(parseInt(e.target.value))*/}
                {/*        } else{*/}
                {/*            setHourTime(0)*/}
                {/*        }*/}
                {/*    }}*/}
                {/*/>*/}

                :36
            </div>
        </div>
    </div>
}
export default SetDayRange