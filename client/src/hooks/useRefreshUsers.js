import { useDispatch } from "react-redux"
import { setAllUsers } from "../store/user/user.action"
import { useCallback, useEffect } from "react"

export const useRefreshUsers = (socket) => {
    const dispach = useDispatch()
    const refreshUsers = useCallback(() => {
        if(socket) {
            socket.on('refreshUsers', (users) => {
                dispach(setAllUsers(users))
            })
        }
    }, [socket])

    useEffect(() => {
        refreshUsers()
    }, [refreshUsers])
}