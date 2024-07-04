export const showDate = (date?: Date) => {
    if ( !date ){
        return ''
    }
    return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`
}


export const renderTime = (date: Date) => {
    const currentHour = ('0' + date.getHours()).slice(-2);
    const currentMinute = ('0' + date.getMinutes()).slice(-2);
    const currentSecond = ('0' + date.getSeconds()).slice(-2);
    return `${currentHour}:${currentMinute}:${currentSecond}`
}

export const showYearMonth = (date: Date | null) => {
    if ( !date ){
        return ''
    }
    return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}`
}