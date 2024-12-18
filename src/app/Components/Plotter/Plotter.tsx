"use client"; // This is a client component 
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import { Button, Typography } from '@material-tailwind/react';
import Formatter from './Formatter';
import { PlottablePropertyConfig } from './Formatter';


export default function Plotter<Plottable, K extends keyof Plottable>({ data, configs }: { data: Plottable[], configs: PlottablePropertyConfig<K, Plottable>[] }) {
    const [selectedConfig, setSelectedConfig] = useState<PlottablePropertyConfig<K, Plottable>>(configs[0]);

    return (
        <div className="flex flex-col border-4 rounded-xl p-4 m-2">
            <Typography
                className="mx-4 mb-2"
                variant="h5"
                placeholder=""
                onPointerEnterCapture={() => { }}
                onPointerLeaveCapture={() => { }}
            >
                Matched recipes distribution
            </Typography>
            <div className="flex flex-row flex-wrap justify-center mb-4 gap-3">
                {configs.map((config, index) => (
                    <Button
                        key={index}
                        onClick={() => setSelectedConfig(config)}
                        placeholder=""
                        onPointerEnterCapture={() => { }}
                        onPointerLeaveCapture={() => { }}
                        color={selectedConfig === config ? "white" : "gray"}
                    >
                        {config.propertyName}
                    </Button>
                ))}
            </div>
            <ResponsiveContainer width={"100%"} height={300}>
                <BarChart
                    width={600}
                    height={300}
                    data={new Formatter<Plottable, K>().formatData(data, selectedConfig)}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={selectedConfig.propertyName} />
                    <YAxis tickFormatter={(tick) => Number(tick).toFixed(2)} />
                    <Tooltip
                        contentStyle={{ backgroundColor: "black", color: "white" }}
                    />
                    <Legend />
                    <Bar dataKey="Number of Matches" fill="white" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}