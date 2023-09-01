import React from 'react'
import Card from '../../../../../Components/Card/Card'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md'

const CardSelectSlider = ({ handleCardSelect, cardSelectList }) => {

    const slideLeft = async function() {
        const slider = document.getElementById('slider');
        var scrollLeft = slider.scrollLeft - (slider.clientWidth - 500);
        return slider.scrollLeft = scrollLeft;
    }
        
    const slideRight = async function() {
        const slider = document.getElementById('slider');
        var scrollRight = slider.scrollLeft + (slider.clientWidth - 500);
        return slider.scrollLeft = scrollRight;
    }

  return (
    <>
        <button onClick={() => slideLeft()} className="card-slider-button left"><MdKeyboardArrowLeft /></button>
        <div id='slider' className='card-select-container snaps-inline'>
            {
                cardSelectList.map(card => (
                    <div onClick={() => handleCardSelect(card)} key={card?.id} className="card-select">
                        <Card card={card} cardStyle="select" />
                    </div>
                ))
            }
        </div>
        <button onClick={() => slideRight()} className="card-slider-button right"><MdKeyboardArrowRight /></button>
    </>
  )
}

export default CardSelectSlider