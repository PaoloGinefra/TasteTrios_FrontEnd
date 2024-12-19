/* eslint-disable @typescript-eslint/no-explicit-any */
import { Node, Edge } from '@xyflow/react';

export interface LeafContent {
    name: string;
    value: string;
}

const position = { x: 0, y: 0 };
const edgeType = 'smoothstep';

/**
 * Check if the json passed is a leaf node. Meaning it is one of the following:
 * 1. null
 * 2. a primitive type
 * 3. made up of only primitive types
 * @param json
 * @returns Whether the json is a leaf node
 */
function isLeaf(json: any): boolean {
    if (json === null) {
        return true;
    }
    if (typeof json !== 'object') {
        return true;
    }

    return Object.values(json).every((element: any) => typeof element !== 'object');
}

function processLeaf(json: any, parentId: string): Node {
    if (typeof json !== 'object') {
        return {
            id: parentId + '-value',
            type: 'leaf',
            data: {
                contents: [
                    {
                        name: parentId.split('-').pop(),
                        value: json,
                    },
                ]
            },
            position,
        };
    }
    const contents: LeafContent[] = [];

    Object.keys(json).forEach((key: any) => {
        contents.push({
            name: key,
            value: json[key],
        });
    });

    return {
        id: parentId + '-value',
        type: 'leaf',
        data: {
            contents,
        },
        position,
    };
}

function parseJson(json: any, nodeList: Node[], edgeList: Edge[], parentId: string | null = null) {
    if (json === null) {
        return;
    }
    if (isLeaf(json)) {
        const node = processLeaf(json, parentId ?? '');
        nodeList.push(node);

        const edge: Edge = {
            id: `${parentId}-value`,
            source: parentId ? parentId : '',
            target: `${parentId}-value`,
            type: edgeType,
            animated: true,
        };
        edgeList.push(edge);
        return;
    }

    for (const key in json) {
        const nodeId = parentId ? `${parentId}-${key}` : key;
        if (isLeaf(json[key])) {
            const node = processLeaf(json[key], nodeId);
            nodeList.push(node);

            if (parentId) {
                const edge: Edge = {
                    id: nodeId + `-value`,
                    source: parentId ? parentId : '',
                    target: nodeId + '-value',
                    type: edgeType,
                    animated: true,
                };
                edgeList.push(edge);
            }
        }
        else {
            const node = {
                id: nodeId,
                data: { label: key },
                position,
            };
            nodeList.push(node);

            if (parentId) {
                const edge: Edge = {
                    id: `${parentId}-${key}`,
                    source: parentId ? parentId : '',
                    target: nodeId,
                    type: edgeType,
                    animated: true,
                };
                edgeList.push(edge);
            }

            parseJson(json[key], nodeList, edgeList, nodeId);
        }
    }
}

export function parseJsonToElements(json: any): { nodes: Node[]; edges: Edge[] } {
    const nodeList: Node[] = [];
    const edgeList: Edge[] = [];

    parseJson(json, nodeList, edgeList);

    return { nodes: nodeList, edges: edgeList };
}