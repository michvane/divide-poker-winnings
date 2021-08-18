import React, { SetStateAction, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import { calculatePayouts, parsePlayerMoneyIntoNumber } from '../../helpers/calc';

type Player = {
    name: string
    moneyLeft: string
}


const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        minWidth: 200,
    },
    inputContainer: {
        marginLeft: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    playerContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    fieldContainer: {
        width: 90,
    },
    button: {
        marginBottom: 16,
    },
    scrollView: {
        marginTop: 48,
        padding: 16,
    },
    playerName: {
        fontSize: 24,
        fontWeight: '600'
    },
    result: {
        marginTop: 16,
        marginBottom: 16,
        backgroundColor: '#9ad861',
        color: 'white'
    }
});

const Home: React.FC = () => {
    const [showResults, setShowResults] = useState(false)
    const [players, setPlayers] = useState<Player[]>([{ name: '', moneyLeft: '0'}])
    const [buyInPrice, setBuyInPrice] = useState('0')
    const [results, setResults] = useState<string[]>([])

    const handleAddPlayer = () => {
        setPlayers([...players, { name: '', moneyLeft: '0'}])
    }

    const handleEditPlayerName = (playerIndex: number, name: string) => {
        const newPlayers = [...players]
        newPlayers[playerIndex].name = name
        setPlayers(newPlayers) 
    }

    const handleEditPlayerMoney = (playerIndex: number, money: string) => {
        console.log(money)
        const newPlayers = [...players]
        newPlayers[playerIndex].moneyLeft = money
        setPlayers(newPlayers) 
    }

    return (<View style={styles.scrollView}>
        <Text style={styles.title}>Enter buy-in price per person:</Text>
        <TextInput style={styles.input} keyboardType='numeric' value={String(buyInPrice)} onChangeText={(e) => setBuyInPrice(e)} />
        <Text style={styles.title}>Enter name and the money they finished with:</Text>
        {players.map((player, index) => {
            return <>
                <Text style={styles.playerName}>Player {index + 1}</Text>
                <View style={styles.inputContainer}>
                    
                    <View style={styles.playerContainer}> 
                        <Text style={styles.fieldContainer}>Player name:</Text>
                        <TextInput style={styles.input} value={player.name} onChangeText={(e) => handleEditPlayerName(index, e)} />
                    </View>
                    <View style={styles.playerContainer}>
                        <Text style={styles.fieldContainer}>Money left:</Text>
                        <TextInput style={styles.input} keyboardType='numeric' value={String(player.moneyLeft)} onChangeText={(e) => handleEditPlayerMoney(index, e)} />
                    </View>
                </View>
            </>
        })}
        <View style={styles.button}>
            <Button
                onPress={() => handleAddPlayer()}
                title="Add player"
                color="#1e86af"
                accessibilityLabel="Add a player"
            />
        </View>
        <View style={styles.button}>
            <Button
                onPress={() => {
                    setResults(calculatePayouts(parsePlayerMoneyIntoNumber(players), parseFloat(buyInPrice)))
                    setShowResults(true)
                }}
                title="Calculate earnings"
                color="#26a14f"
                accessibilityLabel="Calculate earnings"
            />
        </View>
        <View style={styles.button}>
            <Button
                onPress={() => setPlayers([{ name: '', moneyLeft: '0'}])}
                title="Reset"
                color="#971515"
                accessibilityLabel="Reset players"
            />
        </View>
        {showResults && <View style={styles.result} >
            {results.map((result) => <Text>{result}</Text>)}
        </View>}
    </View>)
}


export default Home