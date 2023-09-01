import { useDispatch } from "react-redux";
import { httpGetCards, httpGetBossCards } from "./requests";
import { setCards, setBossCards } from "../store/cards/cards.action";
import { useCallback, useEffect } from "react";

export const useLoadCards = () => {
    const dispatch = useDispatch()

    const loadCards = useCallback(async() => {
        const cards = await httpGetCards()
        const bossCards = await httpGetBossCards()

        dispatch(setCards(cards))
        dispatch(setBossCards(bossCards))
    }, [dispatch])

    useEffect(() => {
        loadCards()
    }, [loadCards])
}