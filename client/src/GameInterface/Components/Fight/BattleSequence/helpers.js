export const delay = async(ms) => new Promise(resolve => {
    setTimeout(() => {
        resolve()
    }, ms)
})

export const playerChoice = (cards) => {
    return Math.floor(Math.random() * cards?.length)
}

export const randomCard = (cards) => {
    return Math.floor(Math.random() * cards?.length)
}