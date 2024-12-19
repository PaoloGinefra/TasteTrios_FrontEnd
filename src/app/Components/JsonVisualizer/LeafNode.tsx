"use client"; // This is a client component
import { Handle, Position } from '@xyflow/react';
import { LeafContent } from './jsonParser';
interface LeafNodeProps {
    data: {
        contents: LeafContent[];
        direction: string;
    };
}

export default function LeafNode({ data }: LeafNodeProps) {
    const handlePosition = data.direction === 'LR' ? Position.Left : Position.Top;
    return (
        <>
            <Handle type="target" position={handlePosition} />
            <div className='text-left'>
                {data.contents.map((content) => (
                    <div key={content.name} className='flex flex-row'>
                        <p>{content.name}</p>
                        :&nbsp;
                        <p className='ml-2'>{content.value}</p>
                    </div>
                ))}
            </div>
        </>
    );
}