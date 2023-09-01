import { useCallback, useEffect } from "react"

export const useConnectSocket = (user, socket) => {

    const connetSocket = useCallback(() => {
        if(socket) {
            socket.on('connect', () => {
                console.log('connect frontend')
            })
        } 
    }, [user])

    useEffect(() => {
        connetSocket()   
    }, [connetSocket])

    return {
        socket
    }
}