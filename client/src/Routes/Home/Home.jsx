import React from 'react';

import { GiStabbedNote, GiNewspaper } from 'react-icons/gi'

import './Home.css';

const Home = () => {

  return (
    <div className='game-wrapper'>
      <div className="game-body">
        <div className='game-interface'>
          <div className="home-container">
            <div className="home-message">
              <p>Select your cards and get ready to play!</p>
            </div>
            <div className="patch-notes-container">
              <div className="patch-notes">
                <div className="patch-notes-bg"></div>
                <p><span><GiNewspaper /></span>News<span><GiNewspaper /></span></p>
                <div className="notes-container">
                  <p>2 new cards: Asta, Natsu</p>
                  <p>3 new Boss cards</p>
                  <p>New game mode: PvP</p>
                  <p className="note-center">PvP info</p>
                  <p>PvP point system:</p>
                  <p>After every win you get 15 points, plus the number of survived cards times 4</p>
                  <p>After every loss you lose 15 points</p>
                  <p>Gameplay:</p>
                  <p>{`Go to Fight >> PvP and challange an online player`}</p>
                  <p>Select your cards and press 'To Battle'</p>
                  <p>Wait for the opponent to select their cards</p>
                  <p>And let the battle begin!</p>
                  <p>Always the player who sent the request makes the first attack</p>
                </div>
              </div>
              <div className="patch-notes">
                <div className="patch-notes-bg"></div>
                <p><span><GiStabbedNote /></span>Patch notes 1.3<span><GiStabbedNote /></span></p>
                <div className="notes-container">
                  <p className="note-center">Bug fixed</p>
                  <p>Buff efect stays on after the duration expires</p>
                  <p>Stun and silence stayed on longer for one side.</p>
                  <p className='note-center'>Buffs</p>
                  <p>Naofumi: now can stack resistance on allies</p>
                  <p>{`Orihime: heal increased 1000 >> 2400`}</p>
                  <p>{`Yuno: bleed damage increased 800 >> 1200`}</p>
                  <p className="note-center">Nerfs</p>
                  <p>Base crit rate decreased for every card</p>
                  <p>{`Naofumi: resistance buff decreased 200 >> 150`}</p>
                  <p>{`Erwin: attack buff decreased 500 >> 400`}</p>
                  <p>{`Asuna: heal decreased 800 >> 600, end of round heal 500 >> 300`}</p>
                  <p className="note-center">Adjustments</p>
                  <p>Kaneki: instead of buffing his attack and crit, heals himself in the changed stance mode</p>
                  <p>Aqua: the active skill now heals also</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;