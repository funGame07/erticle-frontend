import { useEffect, useState } from "react";

function useResizer(){
    const [width, setWidth] = useState(window.innerWidth)

    useEffect(()=>{
        const id = window.addEventListener("resize", ()=>{
            setWidth(window.innerWidth)
        })

        return ()=> removeEventListener("resize", id)
    }, [])

    return width
}

export {
    useResizer
}