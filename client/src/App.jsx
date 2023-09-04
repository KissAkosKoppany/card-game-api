import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { io } from 'socket.io-client';

import { useSelector } from "react-redux";
import { useLoadCards } from "./hooks/useLoadCards";
import { useLoadUsers } from "./hooks/useLoadUsers";
import { useRefreshUsers } from "./hooks/useRefreshUsers";
import { useLoadUserInfo } from "./hooks/useLoadUserInfo";
import { useConnectSocket } from "./hooks/useConnetSocket";
import { useSocketListener } from "./hooks/useSocketListener.js";

import Home from './Routes/Home/Home';
import Cards from './GameInterface/Components/Cards/Cards';
import Fight from './GameInterface/Components/Fight/Fight';
import NavBar from "./Navigation/Container/NavBar";
import BattleEnd from "./Routes/BattleEnd/BattleEnd";
import AdminPage from "./Routes/AdminPage/AdminPage";
import Background from "./Background/Background";
import ProfileInfo from "./Routes/UserInfromation/ProfileInfo";
import LeaderBoard from "./Routes/LeaderBoard/LeaderBoard";
import RequestsModal from "./Routes/RequestsModal/RequestsModal";
import NotificationModal from "./Routes/NotificationModal/NotificationModal";

import './App.css';

const App = () => {
  
  const [battleMode, setBattleMode] = useState(false)
  const [socket, setSocket] = useState(null)

  useLoadUserInfo()
  useLoadCards()
  useLoadUsers()
  
  const user = useSelector(state => state.rootReducer.user.currentUser)

  useEffect(() => {
    //need to change this link to backand link
    const sockett = user ? io('https://www.ascendedbattle.com:8000', {
      auth: {
        token: user.id
      }
    }) : null
    setSocket(sockett)
  }, [user])
  
  useConnectSocket(user, socket)
  
  useRefreshUsers(socket)
  
  useSocketListener(socket, setBattleMode)
  
  return(
    <>
      <div className="app">
        <Background />
        <RequestsModal socket={socket} />
        <NotificationModal socket={socket} />
        <Routes>
          <Route path="/" element={<NavBar battleMode={battleMode} />}>
            <Route index element={<Home />} />
            <Route path="fight/*" element={<Fight socket={socket} battleMode={battleMode} setBattleMode={setBattleMode} />} />
            <Route path="cards/*" element={<Cards />} />
            <Route path="leaderboard/*" element={<LeaderBoard socket={socket} />} />
            <Route path="user-info" element={<ProfileInfo />} />
            <Route path="admin-page/*" element={<AdminPage />} />
            <Route path="battle-end" element={<BattleEnd setBattleMode={setBattleMode}/>} />
          </Route>
        </Routes>   
      </div>
    </>
  )
}

export default App;