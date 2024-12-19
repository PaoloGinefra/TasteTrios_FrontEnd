/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"; // This is a client component
import React, { useCallback } from 'react';
import {
    Background,
    ReactFlow,
    addEdge,
    ConnectionLineType,
    Panel,
    useNodesState,
    useEdgesState,
    Connection,
    MiniMap,
    Controls,
} from '@xyflow/react';
import dagre from '@dagrejs/dagre';
import '@xyflow/react/dist/style.css';
import { Edge, Position } from '@xyflow/react';
import LeafNode from './LeafNode';
import { parseJsonToElements } from './jsonParser';
import { Button } from '@material-tailwind/react';

const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

const nodeTypes = {
    'leaf': (props: any) => <LeafNode {...props} direction={props.data.direction} />,
}

interface FlowProps {
    json: any;
}

export default function JsonVisualizer({ json }: FlowProps) {
    const [layoutDirection, setLayoutDirection] = React.useState('LR');

    const getLayoutedElements = (json: any, direction = 'LR') => {
        const elements = parseJsonToElements(json);
        const { nodes, edges } = elements;

        const isHorizontal = direction === 'LR';
        dagreGraph.setGraph({ rankdir: direction });

        nodes.forEach((node) => {
            dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
        });

        edges.forEach((edge) => {
            dagreGraph.setEdge(edge.source, edge.target);
        });

        dagre.layout(dagreGraph);

        const newNodes = nodes.map((node) => {
            const nodeWithPosition = dagreGraph.node(node.id);
            const newNode = {
                ...node,
                targetPosition: isHorizontal ? Position.Left : Position.Top,
                sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
                position: {
                    x: nodeWithPosition.x - nodeWidth / 2,
                    y: nodeWithPosition.y - nodeHeight / 2,
                },
                data: {
                    ...node.data,
                    direction: direction
                }
            };

            return newNode;
        });

        return { nodes: newNodes, edges };
    };

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(json);

    const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

    const onConnect = useCallback(
        (params: Edge | Connection) =>
            setEdges((eds) =>
                addEdge(
                    { ...params, type: ConnectionLineType.SmoothStep, animated: true },
                    eds,
                ),
            ),
        [],
    );
    const onLayout = useCallback(
        (direction: string) => {
            const { nodes: layoutedNodes, edges: layoutedEdges } =
                getLayoutedElements(json, direction);

            setNodes([...layoutedNodes]);
            setEdges([...layoutedEdges]);
            setLayoutDirection(direction);
        },
        [json],
    );

    return (
        <div style={{ height: 500, width: 700 }} className='text-black mx-auto rounded-xl overflow-hidden'>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                connectionLineType={ConnectionLineType.SmoothStep}
                fitView
                style={{ backgroundColor: "#F7F9FB", height: "100vh", width: "100vw" }}
                nodeTypes={nodeTypes}
            >
                <Panel position="top-right">
                    <Button
                        onClick={() => onLayout(layoutDirection === 'LR' ? 'TB' : 'LR')}
                        placeholder=""
                        onPointerEnterCapture={() => { }}
                        onPointerLeaveCapture={() => { }}>
                        {layoutDirection === 'LR' ? 'vertical layout' : 'horizontal layout'}
                    </Button>
                </Panel>
                <MiniMap />
                <Controls />
                <Background />
            </ReactFlow>
        </div>
    );
};