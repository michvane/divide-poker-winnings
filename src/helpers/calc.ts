type UnParsedPlayer = {
    name: string
    moneyLeft: string
}

type Player = {
    name: string
    moneyLeft: number
}


const sortPlayersInProfit = (player1: Player, player2: Player) => {
    if (player1.moneyLeft > player2.moneyLeft) {
        return -1;
    }

    if (player1.moneyLeft < player2.moneyLeft) {
        return 1;
    }

    return 0;
}

const sortPlayersInLoss = (player1: Player, player2: Player) => {
    if (player1.moneyLeft < player2.moneyLeft) {
        return -1;
    }

    if (player1.moneyLeft > player2.moneyLeft) {
        return 1;
    }

    return 0;
}

export const parsePlayerMoneyIntoNumber = (players: UnParsedPlayer[]): Player[] => {
    return players.map((player) => ({...player, moneyLeft: Number(player.moneyLeft)}))
}


export const calculatePayouts = (players: Player[], buyInPrice: number) => {
    const initialPot = buyInPrice * players.length
    const totalMoneyLeft =  players.reduce((acc, curr) => {
        return acc + curr.moneyLeft
    }, 0)

    if (totalMoneyLeft !== initialPot) {
        const diff =  totalMoneyLeft - initialPot
        throw Error(`Please recount your money left, total amount is off by ${diff}`)
    }

    let playersInProfit = players.filter((player) => player.moneyLeft >= buyInPrice).sort(sortPlayersInProfit)
    const playersInLoss = players.filter((player) => player.moneyLeft < buyInPrice).sort(sortPlayersInLoss)   

    const result = playersInLoss.reduce((acc: string[], currentPlayerInLoss: Player) => {
        let currentPlayerLoss = buyInPrice - currentPlayerInLoss.moneyLeft
        
        // refactor to reducer pattern ya dummie
        const result = []
        for (let i = 0; i < playersInProfit.length; i++) {
            const currentPlayerInProfit = playersInProfit[i]

            const playerProfit = currentPlayerInProfit.moneyLeft - buyInPrice

            if (playerProfit <= 0 ) continue

            if (playerProfit > currentPlayerLoss) {
                result.push(`${currentPlayerInLoss.name} owns ${currentPlayerLoss} to ${currentPlayerInProfit.name}`)
                playersInProfit[i].moneyLeft = playersInProfit[i].moneyLeft - currentPlayerLoss
                break
            }
           
            if (playerProfit === currentPlayerLoss) {
                result.push(`${currentPlayerInLoss.name} owns ${playerProfit} to ${currentPlayerInProfit.name}`)
                playersInProfit[i].moneyLeft = playersInProfit[i].moneyLeft - currentPlayerLoss
                break
            }

            if (playerProfit < currentPlayerLoss) {
                result.push(`${currentPlayerInLoss.name} owns ${playerProfit} to ${currentPlayerInProfit.name}`)
                playersInProfit[i].moneyLeft = buyInPrice
                currentPlayerLoss = currentPlayerLoss - playerProfit
            }

        }

        return [...acc, ...result]
    }, [])

    return result
}

const players: Player[] = [{
    name: 'Michiel',
    moneyLeft: 6
}, {
    name: 'Jeremy',
    moneyLeft: 23
}, {
    name: 'David',
    moneyLeft: 2
}, {
    name: 'Joris',
    moneyLeft: 9
}]

console.log(calculatePayouts(players, 10))