import * as React from 'react';
import styled from 'styled-components';

import { Deal } from '../models';

const Canvas = styled.canvas`
    background: linear-gradient(180deg, #1E2530 0%, #293341 100%);
`;

const PADDING = 20;
const JOINT_RADIUS = 5; // not that "joint" 😝
const GRAPH_WIDTH = 4;

export const Chart: React.FC<{deals: Deal[]}> = ({deals}) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    // preparations of the canvas on mount
    React.useEffect(
        () => {
            if (canvasRef.current) {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d')!;
                
                // transform to classic cartesian coordinate system
                ctx.translate(0, canvas.height);
                ctx.scale(1,-1);

                // line styling
                ctx.strokeStyle = "#00A3FF";
                ctx.fillStyle = "#8fd6ff";
                ctx.lineWidth = GRAPH_WIDTH;
                ctx.lineJoin = 'round';

                ctx.save();
            }
        },
        []
    );

    React.useEffect(
        () => {
            if (canvasRef.current) {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d')!;
                
                // clean the canvas
                ctx.restore();
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.save();

                // apply padding
                ctx.translate(PADDING, PADDING);
                ctx.scale(
                    (canvas.width - PADDING * 2) / canvas.width, 
                    (canvas.height - PADDING * 2) / canvas.height
                );

                // normalization
                const maxValue = Math.max(...deals.map(x => x.value));
                const unixDates = deals.map(x => +x.date);
                const minDate = Math.min(...unixDates);
                const maxDate = Math.max(...unixDates);
                const dateDelta = maxDate - minDate;
                const points = deals.map(deal => ({
                    x: ((+deal.date) - minDate) / dateDelta * canvas.width,
                    // I assume that deal price is always >= 0.
                    // Otherwise should be `(maxValue - minValue)` instead of just `maxValue`
                    y: canvas.height / maxValue * deal.value,
                    deal
                }));
                
                // draw the graph
                ctx.beginPath();
                points.forEach(({x, y}, i) => {
                    if (i === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                });
                ctx.stroke();
                
                // draw joints
                points.forEach(({x, y}, i) => {
                    ctx.beginPath();
                    ctx.arc(x, y, JOINT_RADIUS, 0, Math.PI * 2);
                    ctx.fill();
                });
            }
        },
        [deals] // I assume that canvas ref, width and height remain the same
    );

    return (
        <Canvas height="290" width={window.innerWidth} ref={canvasRef}>
            Your browser doesn't support canvas.
        </Canvas>
    );
};