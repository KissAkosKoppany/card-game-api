import { useDispatch } from "react-redux"
import { setAllUsers, setCurrentUser } from "../store/user/user.action"
import { useCallback, useEffect } from "react"

export const useRefreshUsers = (socket) => {
    const dispach = useDispatch()
    const refreshUsers = useCallback(() => {
        if(socket) {
            socket.on('refreshUsers', (users) => {
                dispach(setAllUsers(users))
            });
            socket.on('refreshAllUsers', (allUsers, currentUser) => {
                dispach(setAllUsers(allUsers))
                dispach(setCurrentUser(currentUser))
            })
        }
    }, [socket, dispach])

    useEffect(() => {
        refreshUsers()
    }, [refreshUsers])
}