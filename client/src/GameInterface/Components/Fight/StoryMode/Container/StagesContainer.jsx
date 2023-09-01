import React from 'react'
import "./Stages.style.css"
import StagePreview from '../Components/StagePreview'
import { useStages } from '../../../../../hooks/useStages'

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