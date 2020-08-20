import {Statuses} from "./app/enums";

export interface GameInfoItem {
    x: number,
    y: number,
    value: number,
    status: Statuses
}

export type GameInfo = GameInfoItem[];