import React from 'react'

import { Link, Route, Routes } from 'react-router-dom'
import { httpCreateCard, httpCreateBossCard } from '../../hooks/requests'

import CardCreation from './Components/CardCreation'
import StageCreation from './Components/StageCreation'

import './AdminPage.style.css'

const AdminPage = () => {

  return (
    <div className='admin-page-wrapper'>
      <div className="admin-interface-container">
        <div className="admin-nav">
          <Link to='create-card' className='link'><p className="admin-link">Create card</p></Link>
          <Link to='create-boss-card' className='link'><p className="admin-link">Create boss card</p></Link>
          <Link to='create-stage' className='link'><p className="admin-link">Create stage</p></Link>
        </div>
        <div className="admin-interface">
          <Routes>
            <Route path='create-card' element={<CardCreation httpCreateCard={httpCreateCard} />}/>
            <Route path='create-boss-card' element={<CardCreation httpCreateCard={httpCreateBossCard} />}/>
            <Route path='create-stage' element={<StageCreation />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default AdminPage