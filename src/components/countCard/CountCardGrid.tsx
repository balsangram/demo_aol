// import React from 'react';
// import CountUp from 'react-countup';

// interface CountItem {
//     label: string;
//     value: number;
//     duration?: number;
// }

// interface CountCardGridProps {
//     items: CountItem[];
// }

// const CountCardGrid: React.FC<CountCardGridProps> = ({ items }) => {
//     return (
//         <div className="mb-5 grid grid-cols-2 sm:grid-cols-3 justify-items-center gap-3 max-w-[900px] mx-auto">
//             {items.map((item, idx) => (
//                 <div key={idx}>
//                     <div className="w-[70px] h-[70px] sm:w-[100px] sm:h-[100px] shadow-[1px_2px_12px_0_rgba(31,45,61,0.10)] rounded border border-white-light dark:border-[#1b2e4b] flex justify-center flex-col">
//                         <CountUp start={0} end={item.value} duration={item.duration || 3} className="text-primary text-xl sm:text-3xl text-center" />
//                     </div>
//                     <h4 className="text-[#3b3f5c] text-xs sm:text-[15px] mt-4 text-center dark:text-white-dark font-semibold">{item.label}</h4>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default CountCardGrid;

import React from 'react';
import CountUp from 'react-countup';
import { User, Users, Activity } from 'lucide-react'; // Use any icons you prefer

interface CountItem {
    label: string;
    value: number;
    duration?: number;
    icon?: JSX.Element;
    iconBgColor?: string;
}

interface CountCardGridProps {
    items: CountItem[];
}

const CountCardGrid: React.FC<CountCardGridProps> = ({ items }) => {
    return (
        <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-4">
            {items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-4 shadow-md rounded-2xl bg-white dark:bg-[#1b2e4b]">
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-300">{item.label}</p>
                        <CountUp start={0} end={item.value} duration={item.duration || 3} className="text-2xl font-bold text-primary dark:text-white" />
                    </div>
                    <div className={`w-12 h-12 flex items-center justify-center rounded-full ${item.iconBgColor || 'bg-blue-500'} text-white`}>{item.icon}</div>
                </div>
            ))}
        </div>
    );
};

export default CountCardGrid;
