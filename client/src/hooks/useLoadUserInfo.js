import { useDispatch } from "react-redux";
import { getUserInfo } from "./requests"
import { setCurrentUser } from "../store/user/user.action";
import { useCallback, useEffect } from "react";

export const useLoadUserInfo = () => {
    const dispatch = useDispatch()
    
    const loadUser = useCallback(async() => {
        const userInfo = await getUserInfo()
        console.log('userinfo', userInfo)
        if(userInfo) {
            dispatch(setCurrentUser(userInfo))
        }
    
    }, [dispatch])

    useEffect(() => {
        loadUser()
    }, [loadUser])
    
}