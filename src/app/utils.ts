import {Statuses} from "./enums";
import {GameInfo} from "../types";

export const checkIsWin = (list: GameInfo): boolean =>
    list.every(info => info.status === Statuses.PLAYERS)
