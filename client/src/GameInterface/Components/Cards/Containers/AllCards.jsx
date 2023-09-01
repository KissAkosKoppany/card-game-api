import React, { Suspense, useState } from 'react'
import Spinner from '../../../../Components/Spinner';
import Tilt from 'react-parallax-tilt'; 
import CardModal from '../Components/CardModal';
const Card = React.lazy(() => import("../../../../Components/Card/Card"))


const AllCards = ({ cards }) => {


    const [showCardModal, setShowCardModal] = useState(false)
    const [card, setCard] = useState(null)

    const handleOpenCardModal = (id) => {
      const selectedCard = cards.filter(card => card.id === id)[0]
      setCard(selectedCard)
      setShowCardModal(true)
    }

  return (
            <Suspense fallback={<Spinner />}>
              {cards.map(card => {
                return (
                  <div onClick={() => handleOpenCardModal(card.id)} key={card.id} style={{cursor: "pointer"}}>
                  <Tilt key={card.id} scale={1.1} tiltMaxAngleX={10} tiltMaxAngleY={10} >
                    <Card card={card} opponent={false} cardStyle="statList"/>
                  </Tilt>
                  </div>
                )
              })}
              {
                showCardModal
                  ? <CardModal setShowCardModal={setShowCardModal} card={card} />
                  : null
              } 
            </Suspense>
  )
}

export default AllCards