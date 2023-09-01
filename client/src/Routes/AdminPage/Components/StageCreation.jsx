import React, { useCallback, useRef } from 'react'
import { httpCreateStage } from '../../../hooks/requests';

const StageCreation = () => {

  const formRef = useRef();

  const submitHandler = useCallback(() => async(e) => {
    e.preventDefault()

    const formData = {
      title: formRef.current.title.value,
      cards: [
        formRef.current.cardOne.value,
        formRef.current.cardTwo.value,
        formRef.current.cardThree.value,
      ],
      nextStageCards: [
        formRef.current.nextCardOne.value,
        formRef.current.nextCardTwo.value,
        formRef.current.nextCardThree.value,
      ],
      stageNumber: formRef.current.stageNumber.value,
      cardStyle: [
        "stagePreview one",
        "stagePreview two",
        "stagePreview three"
      ]
    }

    e.target.reset();

    httpCreateStage(formData)
  }, [])

  return (
    <form ref={formRef} onSubmit={submitHandler()} className='create-form'>
      <div className="form-container">
        <label htmlFor='title'>Title</label>
        <input id='title' name='title' type='text' required />
        <label htmlFor='cardOne'>Card</label>
        <input id='cardOne' name='cardOne' type='text' required />
        <label htmlFor='cardTwo'>Card</label>
        <input id='cardTwo' name='cardTwo' type='text' required />
        <label htmlFor='cardThree'>Card</label>
        <input id='cardThree' name='cardThree' type='text' required />
      </div>
      <div className="form-container">
        <label htmlFor='stageNumber'>Stage number</label>
        <input id='stageNumber' name='stageNumber' type='number' required />
        <label htmlFor='nextCardOne'>Next stage card</label>
        <input id='nextCardOne' name='nextCardOne' type='text' required />
        <label htmlFor='nextCardTwo'>Next stage card</label>
        <input id='nextCardTwo' name='nextCardTwo' type='text' required />
        <label htmlFor='nextCardThree'>Next stage card</label>
        <input id='nextCardThree' name='nextCardThree' type='text' required />
      </div>
      <button type='submit' className="creation-submit">Submit Creation</button>
    </form>
  )
}

export default StageCreation