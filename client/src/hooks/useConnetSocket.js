import { useCallback, useEffect } from "react"

export const useConnectSocket = (user, socket) => {

    const connetSocket = useCallback(() => {
        if(socket) {
            socket.on('connect', () => {
                console.log('connect frontend')
            })
        }
        // eslint-disable-next-line
    }, [user])

    useEffect(() => {
        connetSocket()   
    }, [connetSocket])

    return {
        socket
    }
}