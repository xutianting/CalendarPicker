import CalendarPicker from "@/components/CalendarPicker";
import { useState } from "react";
import { renderTime,showDate } from "@/components/CalendarPicker/utils.ts";
import styles from './index.module.less'
const About=()=>{
    const [inputValue,setInputValue]=useState('')
    const [inputRightValue,setInputRightValue]=useState('')
    return <div style={{width: 1000,display: 'flex',justifyContent: 'space-around'}}>
        <div>
            <button>显示时间</button>
            <input className={styles.dateInput} value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
            <CalendarPicker
                showTime={true}
                onChange={(val) => {

                    setInputValue(showDate(val[0]) + ' ' + renderTime(val[0]) +
                        '——' + showDate(val[1]) + ' ' + renderTime(val[1]))


                }}
            />
        </div>
        <div>
            <button>隐藏时间</button>
            <input className={styles.dateInput} value={inputRightValue}
                   onChange={(e) => setInputRightValue(e.target.value)}/>
            <CalendarPicker
                showTime={false}
                onChange={(val) => {
                    setInputRightValue(showDate(val[0]) + '——' + showDate(val[1]))
                }}
            />
        </div>
    </div>
}

export default About
