import {Statuses} from "./enums";
import {GameInfo, GameInfoItem} from "../types";

export const checkIsWin = (list: GameInfo): boolean =>
    list.every(info => info.status === Statuses.PLAYERS)

export const generateField = (): GameInfo => {
    const numberOfCircle = randomInteger(5, 8);
    let k = 0;
    const initialField: GameInfo = [];

    while(numberOfCircle > k) {
        const circle = generateCircle();

        if(!isCircleInStaticRadius(initialField, circle.x, circle.y)) {
            k++;
            initialField.push(circle);
        }
    }


    return setPlayerCircle(initialField);
}

const generateCircle = (): GameInfoItem => {
    return ({
        x: randomInteger(100, 900),
        y: randomInteger(100, 550),
        value: randomInteger(20, 130),
        status: Statuses.NEUTRALS
    })
}

const setPlayerCircle = (gameList: GameInfo): GameInfo => {
    const maxValue = Math.max(...gameList.map(c => c.value));
    const playerCircle = gameList.find(c => c.value === maxValue);
    if(playerCircle) {
        playerCircle.status = Statuses.PLAYERS;
    } else {
        gameList[0].status = Statuses.PLAYERS;
    }

    return gameList;
}

const isCircleInStaticRadius = (gameList: GameInfo, newX: number, newY: number): boolean =>
    gameList.some(circle =>
        circle.x + 130 > newX && circle.x - 130 < newX && circle.y + 130 > newY && circle.y - 130 < newY
    )


export const randomInteger = (min: number, max: number): number => {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}