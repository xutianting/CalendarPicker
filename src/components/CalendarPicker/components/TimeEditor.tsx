import { useEffect,useRef,useState } from "react";
import styles from '@/components/CalendarPicker/components/TimeEditor.module.less'
import { Time } from "@/components/CalendarPicker/components/SetDayRange.tsx";


type TimeEditorProps = {
    value: Time;
    onChange: (time: Time) => void;
};
const TimeEditor=(props:TimeEditorProps)=>{
    const divRef = useRef(null);
    const { value, onChange } = props;
    const [isEditable, setIsEditable] = useState(false);

    const [hour,setHour]=useState(value.hour)
    const [minute,setMinute]=useState(value.minute)
    const [second,setSecond]=useState(value.second)

    useEffect(() => {
        setHour(value.hour)
        setMinute(value.minute)
        setSecond(value.second)
    },[value]);

    const handleClickOutside = (event:MouseEvent) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (divRef.current&&!divRef.current.contains(event.target as Node)) {
            setIsEditable(false);
            onChange({ hour, minute, second });
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [value,hour, minute, second]);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const handleHourScroll = (event) => {
        // 处理鼠标滚轮事件的逻辑
        if ( event.deltaY > 0 ){
            if ( hour === 0 ) return
            setHour(prevState => prevState - 1)
        } else if ( event.deltaY < 0 ){
            if ( hour === 23 ) return
            setHour(prevState => prevState + 1)
        }
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const handleMinuteScroll=(event)=>{
        if ( event.deltaY > 0 ){
            if ( minute === 0 ) return
            setMinute(prevState => prevState - 1)
        } else if ( event.deltaY < 0 ){
                if ( minute === 59 ) return
            setMinute(prevState => prevState + 1)
        }
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const handleSecondScroll=(event)=>{
        if ( event.deltaY > 0 ){
            if ( second === 0 ) return
            setSecond(prevState => prevState - 1)
        } else if ( event.deltaY < 0 ){
            if ( second === 59 ) return
            setSecond(prevState => prevState + 1)
        }
    }

    const handleTimeClick = () => {
        setIsEditable(true);
    };


    const showNumber=(num:number)=>{
        return ('0' + num).slice(-2)
    }

    return (
        <div ref={divRef} onClick={handleTimeClick} >
            {isEditable ?
                <div className={styles.container}>
                    <input type="text" name="hour" onWheel={handleHourScroll} value={showNumber(hour)}  />:
                    <input type="text" name="minute" onWheel={handleMinuteScroll} value={showNumber(minute)}  />:
                    <input type="text" name="second" onWheel={handleSecondScroll} value={showNumber(second)}  />
                </div>
                :
                <div className={styles.container}>{showNumber(hour)}:{showNumber(minute)}:{showNumber(second)}</div>
            }
        </div>
    );
}
export default TimeEditor