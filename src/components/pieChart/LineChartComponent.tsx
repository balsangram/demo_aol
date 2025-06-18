import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartData {
    name: string;
    uv: number;
    pv: number;
    amt?: number;
}

interface LineChartComponentProps {
    data: ChartData[];
    height?: number | string;
}

const LineChartComponent: React.FC<LineChartComponentProps> = ({ data, height = 300 }) => {
    return (
        <div className="w-full h-full">
            <ResponsiveContainer width="100%" height={height}>
                <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default LineChartComponent;
