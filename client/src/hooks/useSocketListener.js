import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setPvpReferee, setPvpRoom } from '../store/pvp/pvp.action'
import { setOpponentBattleCards, setPlayerBattleCards } from "../store/cards/cards.action"

export const useSocketListener = (socket, setBattleMode) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const refereeId = useSelector(state => state.rootReducer.pvp.pvpReferee)
    // const currentUser = useSelector(state => state.rootReducer.user.currentUser)
    // console.log(refereeId, 'usesocketlistener')

    useEffect(() => {
        if(socket) {
            socket.on('startCardSelect', (room, refereeId) => {
                navigate('/fight/pvp/card-select')
                dispatch(setPvpRoom(room))
                dispatch(setPvpReferee(refereeId))
                setBattleMode(true)
            })
            socket.on('setCards', (cards, isReferee) => {
                console.log('firstplayercards',cards)
                if(!isReferee) {
                    dispatch(setOpponentBattleCards(cards))
                } else {
                    dispatch(setPlayerBattleCards(cards))
                }
            })
            socket.on('startBattle', (cards, isReferee) => {
                console.log('startbattlecards', cards)
                if(isReferee) {
                    console.log('startbattlerefere', cards)
                    dispatch(setPlayerBattleCards(cards))
                } else {
                    console.log('startbattleNooootreferee', cards)
                    dispatch(setOpponentBattleCards(cards))
                }
                navigate('/fight/pvp/battle')
            })
        }
        // eslint-disable-next-line
    }, [socket, dispatch])
}