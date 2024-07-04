import { useEffect,useRef,useState } from "react";
import styles from '@/components/CalendarPicker/components/TimeEditor.module.less'

type Time = {
    hours: string;
    minutes: string;
    seconds: string;
};

type TimeEditorProps = {
    value: Time;
    onChange: (time: Time) => void;
};
const TimeEditor=(props:TimeEditorProps)=>{
    const divRef = useRef(null);
    const { value, onChange } = props;
    const [isEditable, setIsEditable] = useState(false);
    const [hours, setHours] = useState(value.hours || '00');
    const [minutes, setMinutes] = useState(value.minutes || '00');
    const [seconds, setSeconds] = useState(value.seconds || '00');

    useEffect(() => {
        const handleClickOutside = (event:MouseEvent) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (divRef.current&&!divRef.current.contains(event.target as Node)) {
                console.log('点击了 div 外部！');
                setIsEditable(false);
                onChange({ hours, minutes, seconds });
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    const handleTimeClick = () => {
        setIsEditable(true);
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setValue: React.Dispatch<React.SetStateAction<string>>) => {
        const newValue = e.target.value;
        setValue(newValue);


            onChange({ hours, minutes, seconds, [e.target.name]: newValue });

    };

    const showNumber=(num:string)=>{
        return ('0' + num).slice(-2)
    }

    return (
        <div ref={divRef} onClick={handleTimeClick} >
            {isEditable ?
                <div className={styles.container}>
                    <input type="text" name="hours" value={showNumber(hours)} onChange={(e) => handleInputChange(e, setHours)} />:
                    <input type="text" name="minutes" value={showNumber(minutes)} onChange={(e) => handleInputChange(e, setMinutes)} />:
                    <input type="text" name="seconds" value={showNumber(seconds)} onChange={(e) => handleInputChange(e, setSeconds)} />
                </div>
                :
                <div>{hours}:{minutes}:{seconds}</div>
            }
        </div>
    );
}
export default TimeEditor