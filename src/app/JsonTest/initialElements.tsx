import { Node, Edge, Position } from '@xyflow/react';

const position = { x: 0, y: 0 };
const edgeType = 'smoothstep';

const json = {
  test: 'test-content',
  test2: 'yolo',
  test3: {
    test4: 'yolo2',
    test5: {
      test6: 'yolo3',
    },
  },
  test7: [
    {
      test8: 'yolo4',
    },
    {
      test9: 'yolo5',
    },
  ]
};

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
  if (json === null) {
    return {
      id: parentId + '-value',
      data: {
        label: 'leaf',
        type: 'normal',
        schema: [],
      },
      position,
    };
  }

  if (typeof json !== 'object') {
    return {
      id: parentId + '-value',
      type: 'normal',
      data: {
        label: json,
      },
      position,
    };
  }
  const schema = [];

  Object.keys(json).forEach((key: any) => {
    schema.push({
      name: json[key],
      type: key,
    });
  });

  return {
    id: parentId + '-value',
    data: {
      label: 'leaf',
      type: 'leaf',
      schema: schema,
    },
    position,
  };
}

function parseJson(json: any, nodeList: Node[], edgeList: Edge[], parentId: string | null = null) {
  console.log(json);
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
    const node = {
      id: nodeId,
      data: { label: key },
      position,
    };
    nodeList.push(node);

    const edge: Edge = {
      id: `${parentId}-${key}`,
      source: parentId ? parentId : '',
      target: nodeId,
      type: edgeType,
      animated: true,
    };
    edgeList.push(edge);
    parseJson(json[key], nodeList, edgeList, nodeId);
  }
}

const nodeList: Node[] = [
  {
    id: 'rootNode',
    data: { label: 'root' },
    type: 'normal',
    position,
  },
];
const edgeList: Edge[] = [];
parseJson(json, nodeList, edgeList, 'rootNode');

console.log(nodeList);
console.log(edgeList);

export const initialNodes = nodeList;
export const initialEdges = edgeList;