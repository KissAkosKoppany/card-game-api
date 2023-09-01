import { wait } from "@testing-library/user-event/dist/utils";
// import { wait } from "./Wait";
import { useEffect, useState } from "react";
import { soundEffects } from "../../../SoundEffects/soundEffects";

export const useTypeMessage = (message) => {
    
    const [typedMassage, setTypedMassage] = useState('')

    useEffect(() => {
        setTypedMassage('')
        if(message.length) {
            (async () => {
                await wait(3000)
                let visibleMessage = '';
                for(let i = 0; i < message.length; i++) {
                    await wait(300);
                    soundEffects.type.play();
                    visibleMessage = visibleMessage + message[i];
                    setTypedMassage(visibleMessage)
                }
            })();
        }
    }, [message])

    return typedMassage;
}