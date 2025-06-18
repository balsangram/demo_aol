// import React from 'react';
// import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// interface PieDataItem {
//     name: string;
//     value: number;
// }

// interface DashboardPieChartProps {
//     data: PieDataItem[];
//     colors?: string[];
// }

// const defaultColors = ['#0A3425 ', '#056972 ', '#5466EE ', '#FF8042'];

// const RADIAN = Math.PI / 180;

// const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
//     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//     const x = cx + radius * Math.cos(-midAngle * RADIAN);
//     const y = cy + radius * Math.sin(-midAngle * RADIAN);

//     return (
//         <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" style={{ fontSize: '12px' }}>
//             {`${(percent * 100).toFixed(0)}%`}
//         </text>
//     );
// };

// const DashboardPieChart: React.FC<DashboardPieChartProps> = ({ data, colors = defaultColors }) => {
//     return (
//         <div style={{ width: '100%', height: 200 }}>
//             <ResponsiveContainer>
//                 <PieChart>
//                     <Pie data={data} cx="50%" cy="50%" labelLine={false} label={renderCustomizedLabel} outerRadius={80} dataKey="value">
//                         {data.map((_, index) => (
//                             <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
//                         ))}
//                     </Pie>
//                 </PieChart>
//             </ResponsiveContainer>
//         </div>
//     );
// };

// export default DashboardPieChart;

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface PieDataItem {
    name: string;
    value: number;
}

interface DashboardPieChartProps {
    data: PieDataItem[];
    colors?: string[];
    height?: number; // 👈 New optional height prop
}

const defaultColors = ['#0A3425', '#056972', '#5466EE', '#FF8042'];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" style={{ fontSize: '12px' }}>
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const DashboardPieChart: React.FC<DashboardPieChartProps> = ({ data, colors = defaultColors, height = 200 }) => {
    return (
        <div style={{ width: '100%', height }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie data={data} cx="50%" cy="50%" labelLine={false} label={renderCustomizedLabel} outerRadius={80} dataKey="value">
                        {data.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DashboardPieChart;
