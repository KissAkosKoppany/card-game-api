import { useCallback, useEffect, useState } from "react"
import { httpGetStages } from "./requests"

export const useStages = () => {
    const [stages, setStages] = useState([])

    const getStages = useCallback(async() => {
        const stages = await httpGetStages()
        setStages(stages)
    }, [setStages])

    useEffect(() => {
        getStages()
    }, [getStages])

    return {
        stages
    }
}