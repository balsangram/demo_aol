import React from 'react';
import DashboardPieChart from '../../components/pieChart/DashboardPieChart';
import EChangeTable from '../../components/table/EChangeTable';

interface PieDataItem {
    name: string;
    value: number;
}

export interface EChangeTransaction {
    roleNo: number;
    name: string;
    amount: number;
    debitedFrom: string;
    creditedTo: string;
    status: 'On Hold' | 'Success' | 'Declined';
    date: string;
}

const pieData: PieDataItem[] = [
    { name: 'Added', value: 400 },
    { name: 'Viewed', value: 300 },
    { name: 'Expired', value: 300 },
];

// ✅ Explicitly annotate sampleData with EChangeTransaction[]
const sampleData: EChangeTransaction[] = [
    {
        roleNo: 101,
        name: 'Alice Johnson',
        amount: 1200,
        debitedFrom: 'Wallet A',
        creditedTo: 'Wallet B',
        status: 'On Hold',
        date: '2025-06-18',
    },
    {
        roleNo: 102,
        name: 'Bob Smith',
        amount: 2500,
        debitedFrom: 'Bank X',
        creditedTo: 'Bank Y',
        status: 'Success',
        date: '2025-06-17',
    },
];

function EChange() {
    return (
        <>
            <div className="text-center">
                <DashboardPieChart data={pieData} />
                <p>
                    <span className="text-green-600">● Successful</span> <span className="text-red-600">● Declined</span> <span className="text-yellow-600">● On Hold</span>
                </p>
            </div>
            <div className="mt-8">
                <EChangeTable data={sampleData} />
            </div>
        </>
    );
}

export default EChange;
