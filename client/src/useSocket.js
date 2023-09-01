import { io } from 'socket.io-client'
import { useSelector } from 'react-redux'

export const Socket = () => {
    const user = useSelector(state => state.rootReducer.user.currentUser)
    if(user) {
        const socket = io('https://localhost:8000/', {
            auth: {
                token: user.id
            }
        })
        return socket
    }
}


