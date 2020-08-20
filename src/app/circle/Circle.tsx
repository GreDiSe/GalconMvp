import React from 'react';
import {Statuses} from "../enums";

interface Props {
    x: number,
    y: number,
    value: number,
    onClick(): void,
    status: Statuses,
    selected: boolean
}

function Circle({x,y, status, value, onClick, selected}: Props) {
    let radius = value / 2;
    if(radius < 25) radius = 25;
    if(radius > 100) radius = 100;

    return (
        <g onClick={onClick}>
            <circle
                cx={x}
                cy={y}
                r={radius}
                stroke={selected ? 'green' : 'black'}
                strokeWidth="3"
                fill={status === Statuses.NEUTRALS ? 'grey' : 'limegreen'}
            />
            <text
                dy=".3em"
                x={x}
                y={y}
                textAnchor="middle"
                stroke="black"
                strokeWidth="1px"
            >
                {value}
            </text>
        </g>
    );
}

export default Circle;
