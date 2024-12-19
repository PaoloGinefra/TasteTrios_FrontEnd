"use client"; // This is a client component
import { Handle, Position } from '@xyflow/react';


export default function LeafNode({ data }) {
    return (
        <>
            <Handle type="target" position={Position.Left} />
            <div className='text-left'>
                {data.schema.map((schemaItem) => (
                    <div key={schemaItem.name}>
                        <p>{schemaItem.type} : {schemaItem.name}</p>
                    </div>
                ))}
            </div>
        </>
    );
}