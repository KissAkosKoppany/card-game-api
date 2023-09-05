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
                  <p>New stages available.</p>
                  <p>3 new Boss cards.</p>
                  <p>New game mode: PvP.</p>
                  <p className="note-center">PvP info</p>
                  <p>PvP point system:</p>
                  <p>After every win you get 15 points, plus the number of survived cards times 4.</p>
                  <p>After every loss you lose 15 points.</p>
                  <p>Gameplay:</p>
                  <p>{`Go to Fight >> PvP and challange an online player.`}</p>
                  <p>Select your cards and press 'To Battle!.'</p>
                  <p>Wait for the opponent to select their cards.</p>
                  <p>And let the battle begin!</p>
                  <p>Always the player who sent the request makes the first attack.</p>
                </div>
              </div>
              <div className="patch-notes">
                <div className="patch-notes-bg"></div>
                <p><span><GiStabbedNote /></span>Patch notes<span><GiStabbedNote /></span></p>
                <div className="notes-container">
                  <p className="note-center">Bug fixed</p>
                  <p>Luffy's fear stays on after the duration expires.</p>
                  <p className='note-center'>Buffs</p>
                  <p>Zoro's base attack increased</p>
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