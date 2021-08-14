import * as React from 'react';
import styled from 'styled-components';

import { Deal } from '../models';

const Canvas = styled.canvas`
    background: linear-gradient(180deg, #1E2530 0%, #293341 100%);
`;

const PADDING = 20;
const JOINT_RADIUS = 5; // not that "joint" 😝
const JOINT_COLOR = '#8fd6ff';
const SELECTION_TRIGGER_RADIUS = 15;
const GRAPH_WIDTH = 4;
const GRID_WIDTH = 1;
const GRID_CELLS_HORIZONTAL_COUNT = 10;
const GRID_CELLS_VERTICAL_COUNT = 6;
const GRID_COLOR = 'rgba(248, 243, 235, 0.219)';
const GRAPH_COLOR = '#00A3FF';

export const Chart: React.FC<{
    deals: Deal[],
    selectedDeal: Deal | null,
    onDealSelect: (deal: Deal) => void,
}> = ({ deals, selectedDeal, onDealSelect }) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    // circle areas surrounding all deal-points (joints on graph)
    // they are necessary to register user clicks for deal selection.
    const selectionTriggers = React.useRef<{ path: Path2D, deal: Deal }[]>([]);

    // preparations of the canvas on mount
    React.useEffect(
        () => {
            (window as any).temp = [];
            const canvas = canvasRef.current!;
            const ctx = canvas.getContext('2d')!;
            
            // transform to classic cartesian coordinate system
            ctx.translate(0, canvas.height);
            ctx.scale(1,-1);

            ctx.save();
        },
        []
    );

    // graph rendering
    React.useEffect(
        () => {
            const canvas = canvasRef.current!;
            const ctx = canvas.getContext('2d')!;

            // clean selection triggers
            selectionTriggers.current = [];
            
            // clean the canvas
            ctx.restore();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();

            // draw the grid
            ctx.strokeStyle = GRID_COLOR;
            ctx.lineWidth = GRID_WIDTH;

            const xGridStep = Math.ceil(canvas.width / GRID_CELLS_HORIZONTAL_COUNT);
            const yGridStep = canvas.height / GRID_CELLS_VERTICAL_COUNT;

            for (let i = 1; i < GRID_CELLS_HORIZONTAL_COUNT; i++) {
                ctx.beginPath();
                ctx.moveTo(xGridStep * i, 0);
                ctx.lineTo(xGridStep * i, canvas.height);
                ctx.stroke();
            }

            for (let i = 1; i < GRID_CELLS_VERTICAL_COUNT; i++) {
                ctx.beginPath();
                ctx.moveTo(0, yGridStep * i);
                ctx.lineTo(canvas.width, yGridStep * i);
                ctx.stroke();
            }
            
            // normalization + apply padding
            const maxValue = Math.max(...deals.map(x => x.value));
            const unixDates = deals.map(x => +x.date);
            const minDate = Math.min(...unixDates);
            const maxDate = Math.max(...unixDates);
            const dateDelta = maxDate - minDate;
            const points = deals.map(deal => ({
                x: ((+deal.date) - minDate) / dateDelta * (canvas.width - PADDING * 2) + PADDING,
                // I assume that deal price is always >= 0.
                // Otherwise should be `(maxValue - minValue)` instead of just `maxValue`
                y: (canvas.height - PADDING * 2) / maxValue * deal.value + PADDING,
                deal
            }));

            // draw the graph
            ctx.strokeStyle = GRAPH_COLOR;
            ctx.lineWidth = GRAPH_WIDTH;
            ctx.fillStyle = JOINT_COLOR;
            ctx.lineJoin = 'round';
            
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
            points.forEach(({x, y, deal}, i) => {
                const trigger = new Path2D();
                trigger.arc(x, y, SELECTION_TRIGGER_RADIUS, 0, Math.PI * 2);
                selectionTriggers.current.push({ path: trigger, deal });

                if (deal === selectedDeal) {
                    ctx.fillStyle = 'rgba(132, 211, 255, 0.33)';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(0, y);
                    ctx.lineTo(canvas.width, y);
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.moveTo(x, 0);
                    ctx.lineTo(x, canvas.height);
                    ctx.stroke();

                    ctx.fillStyle = 'rgba(132, 211, 255, 0.53)';
                    ctx.beginPath();
                    ctx.arc(x, y, JOINT_RADIUS * 2, 0, Math.PI * 2);
                    ctx.fill();
                }

                ctx.fillStyle = JOINT_COLOR;
                ctx.beginPath();
                ctx.arc(x, y, JOINT_RADIUS, 0, Math.PI * 2);
                ctx.fill();
                // ctx.save();
                // ctx.restore();
            });
        },
        [deals, selectedDeal]
    );

    const onClick = React.useCallback(
        ({ nativeEvent: { offsetX, offsetY }}: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
            const ctx = canvasRef.current?.getContext('2d')!;
            const clickedJoint = selectionTriggers.current.find(({ path }) =>
                ctx.isPointInPath(path, offsetX, offsetY));

            if (clickedJoint) {
                onDealSelect(clickedJoint.deal);
            }
        },
        []
    );

    return (
        <Canvas
            height="290"
            width={window.innerWidth}
            ref={canvasRef}
            onClick={onClick}
        >
            Your browser doesn't support canvas.
        </Canvas>
    );
};