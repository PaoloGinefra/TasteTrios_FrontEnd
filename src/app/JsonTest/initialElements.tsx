/* eslint-disable @typescript-eslint/no-explicit-any */
import { Node, Edge } from '@xyflow/react';

const position = { x: 0, y: 0 };
const edgeType = 'smoothstep';

const json = {
  "queryResult": {
    "took": 5,
    "timed_out": false,
    "_shards": {
      "total": 1,
      "successful": 1,
      "skipped": 0,
      "failed": 0
    },
    "hits": {
      "total": {
        "value": 1,
        "relation": "eq"
      },
      "max_score": 1.3862942,
      "hits": [
        {
          "_index": "my-index-000001",
          "_id": "kxWFcnMByiguvud1Z8vC",
          "_score": 1.3862942,
          "_source": {
            "@timestamp": "2099-11-15T14:12:12",
            "http": {
              "request": {
                "method": "get"
              },
              "response": {
                "bytes": 1070000,
                "status_code": 200
              },
              "version": "1.1"
            },
            "message": "GET /search HTTP/1.1 200 1070000",
            "source": {
              "ip": "127.0.0.1"
            },
            "user": {
              "id": "kimchy"
            }
          }
        }
      ]
    }
  }
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
      type: 'leaf',
      data: {
        label: json,
        schema: [
          {
            name: json,
            type: parentId.split('-').pop(),
          },
        ],
      },
      position,
    };
  }
  const schema: { name: any; type: any; }[] = [];

  Object.keys(json).forEach((key: any) => {
    schema.push({
      name: json[key],
      type: key,
    });
  });

  return {
    id: parentId + '-value',
    type: 'leaf',
    data: {
      label: 'leaf',
      schema: schema,
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
          id: `${parentId}-${key}-value`,
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

const nodeList: Node[] = [];
const edgeList: Edge[] = [];
parseJson(json, nodeList, edgeList);

console.log(nodeList);
console.log(edgeList);

export const initialNodes = nodeList;
export const initialEdges = edgeList;