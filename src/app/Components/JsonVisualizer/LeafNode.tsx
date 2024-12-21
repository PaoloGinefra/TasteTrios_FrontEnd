"use client"; // This is a client component
import { Handle, Position } from '@xyflow/react';
import { LeafContent } from './jsonParser';
import { Typography } from '@material-tailwind/react';
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
                        <Typography variant="small" className='font-bold'
                            placeholder=""
                            onPointerEnterCapture={() => { }}
                            onPointerLeaveCapture={() => { }}>
                            {content.name}
                        </Typography>
                        :&nbsp;
                        <Typography variant="small"
                            placeholder=""
                            onPointerEnterCapture={() => { }}
                            onPointerLeaveCapture={() => { }}>
                            {content.value}
                        </Typography>
                    </div>
                ))}
            </div>
        </>
    );
}