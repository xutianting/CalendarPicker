type CalendarYearMonthChangeProps={
    currentDate:Date;
    onChange:(date:Date)=>void
    selectedDate?:Date
}
const CalendarYearMonthChange=(props:CalendarYearMonthChangeProps)=>{
    const {currentDate,onChange,selectedDate} = props

    const year=currentDate.getFullYear()
    const month=currentDate.getMonth()
    const day=selectedDate?.getDate()??1
    return <div className="calendarHeader">
        <div className="prevYear" onClick={() => {
            onChange(new Date(year - 1,month,day))
        }}>{`<<`}</div>
        <div className="prevMonth" onClick={() => {
            onChange(new Date(year,month - 1,day))
        }}>{`<`}</div>
        <div>{year}年{month + 1}月</div>
        <div className="nextMonth" onClick={() => {
            onChange(new Date(year,month + 1,day))
        }}>{`>`}</div>
        <div className="nextYear" onClick={() => {
            onChange(new Date(year + 1,month,day))
        }}>{`>>`}</div>
    </div>

}

export default CalendarYearMonthChange