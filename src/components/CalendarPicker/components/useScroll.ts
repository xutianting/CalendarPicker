import { useState } from "react";

function useScroll(){
    const [ time,setTime ] = useState<number>(0);
    const handleScroll = (event) => {
        // 处理鼠标滚轮事件的逻辑
        if ( event.deltaY > 0 ){
            setTime(prevState => prevState - 1)
        } else if ( event.deltaY < 0 ){
            setTime(prevState => prevState + 1)
        }
    };

    return {
        time,
        handleScroll
    }
}

export default useScroll