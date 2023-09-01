import { useCallback, useEffect } from "react"
import { httpGetAllUser } from "./requests"
import { useDispatch } from "react-redux"
import { setAllUsers } from "../store/user/user.action"

export const useLoadUsers = () => {
    const dispatch = useDispatch()

    const getUsers = useCallback(async() => {
        const usersList = await httpGetAllUser()
        dispatch(setAllUsers(usersList))
    }, [dispatch])

    useEffect(() => {
        getUsers()
    }, [getUsers])

}