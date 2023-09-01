import { useState, useEffect } from "react"

export const useCardDeath = (hp) => {
    const [deathAnimation, setDeathAnimation] = useState(false)
  
    useEffect(() => {
      if (hp === 0) {
        setDeathAnimation(true)
      }
    }, [hp])
  
    return {
      deathAnimation
    }
  }