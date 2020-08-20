import React, {useCallback, useEffect, useState} from 'react';

import './App.css';
import Circle from './circle/Circle'
import {Statuses} from "./enums";
import {initialState} from "../data";
import {GameInfo} from "../types";
import {checkIsWin, generateField} from "./utils";

const SUCCESS_MESSAGE = 'You win';
const init = generateField();

function App() {
    const [gameData, setGameData] = useState<GameInfo>(init);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [isWin, setIsWin] = useState<boolean>(false);

    const onPlayerClicked = useCallback((clickedIndex: number): void => {
        if(selectedIndex === null) return;

        setGameData(gameData => {
            const newGameData = [...gameData];
            newGameData[clickedIndex] = {
                ...newGameData[clickedIndex],
                value: gameData[selectedIndex].value + gameData[clickedIndex].value
            }

            newGameData[selectedIndex] = {
                ...newGameData[selectedIndex],
                value: 0
            };

            return newGameData
        })
        setSelectedIndex(null);
    }, [selectedIndex, gameData])

    const onClick = useCallback((clickedIndex: number) => (): void => {
        if(selectedIndex === null) {
            if(gameData[clickedIndex].status === Statuses.PLAYERS)
                setSelectedIndex(clickedIndex);
        } else {
            if(gameData[clickedIndex].status === Statuses.PLAYERS) {
                onPlayerClicked(clickedIndex);
            } else if(clickedIndex === selectedIndex
                || gameData[selectedIndex].value - gameData[clickedIndex].value < 0
            ) {
                setSelectedIndex(null);
            } else {
                setGameData(gameData => {
                    const newGameData = [...gameData];
                    newGameData[clickedIndex] = {
                        ...newGameData[clickedIndex],
                        status: Statuses.PLAYERS,
                        value: gameData[selectedIndex].value - gameData[clickedIndex].value
                    };

                    newGameData[selectedIndex] = {
                        ...newGameData[selectedIndex],
                        value: 0
                    };

                    return newGameData;
                })
                setSelectedIndex(null);
            }
        }
    }, [gameData, selectedIndex])

    useEffect(() => {
        if(!isWin && checkIsWin(gameData)) {
            setIsWin(true)
        }
    }, [gameData, isWin]);

    useEffect(() => {
        const interval = setInterval(() => {
            setGameData(gameData => gameData.map(data => {
                    if(data.status === Statuses.NEUTRALS) return data;

                    return ({
                        ...data,
                        value: data.value + 1
                    })
                }
            ))
        }, 300)

        if(isWin) {
            clearInterval(interval)
        }

        return () => clearInterval(interval);
    }, [isWin])

    return (
        <div className="App">
            <svg height="650" width="1000">
                {isWin && (
                    <text
                        dy=".3em"
                        x='50%'
                        y='30'
                        textAnchor="middle"
                        stroke="black"
                        strokeWidth="1px"
                    >
                        {SUCCESS_MESSAGE}
                    </text>
                )}
                {gameData.map((circle, index) =>
                    <Circle
                        key={index}
                        onClick={onClick(index)}
                        selected={selectedIndex === index}
                        {...circle}
                    />
                )}
            </svg>
        </div>
    );
}

export default App;
