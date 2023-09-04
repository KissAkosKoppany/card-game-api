import React from 'react'

import { useStages } from '../../../../../hooks/useStages'

import StagePreview from '../Components/StagePreview'

import "./Stages.style.css"

const StagesContainer = ({ setBattleMode }) => {

  const { stages } = useStages()

  return (
    <div className='stages-slider-container'>
        {
          stages.map((stage, i) => (
            <StagePreview setBattleMode={setBattleMode} key={i} stage={stage} />
          ))
        }
    </div>
  )
}

export default StagesContainer