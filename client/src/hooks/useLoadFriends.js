import { useCallback, useEffect, useState } from "react"
import { httpGetAllFriends } from "./requests"

export const useLoadFriends = () => {
    const [friends, setFriends] = useState([])

    const getFriends = useCallback(async() => {
        const friendsList = await httpGetAllFriends()
        setFriends(friendsList)
    }, [setUsers])

    useEffect(() => {
        getFriends()
    }, [getFriends])

    return {
        friends
    }
}