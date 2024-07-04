import CalendarPicker from "@/components/CalendarPicker";
import { useState } from "react";
import { showDate } from "@/components/CalendarPicker/utils.ts";

const About=()=>{
    const [inputValue,setInputValue]=useState('')
    return <div>
        <input value={inputValue} onChange={(e)=>setInputValue(e.target.value)}/>
        <CalendarPicker
         onChange={(val)=>{
             const data=showDate(val[0])+'-'+showDate(val[1])
             setInputValue(data)
         }}
        />
    </div>
}

export default About
