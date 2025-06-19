import React from 'react';
import DashboardPieChart from '../../components/pieChart/DashboardPieChart';
import AdsTable, { AdData } from '../../components/table/AdsTable';

interface PieDataItem {
    name: string;
    value: number;
}

const pieData: PieDataItem[] = [
    { name: 'Added', value: 400 },
    { name: 'Viewed', value: 300 },
    { name: 'Expired', value: 300 },
    { name: 'Deleted', value: 100 },
];

const dummyAds: AdData[] = [
    {
        id: 1,
        adName: 'Summer Sale',
        dateAdded: '2025-06-01',
        adCount: 150,
        expiredOn: '2025-06-30',
        status: 'Deleted',
    },
    {
        id: 2,
        adName: 'Flash Discount',
        dateAdded: '2025-05-10',
        adCount: 90,
        expiredOn: '2025-06-10',
        status: 'Expired',
    },
];

function Ads() {
    return (
        <>
            <div className="text-center">
                <DashboardPieChart data={pieData} />
                <p>
                    <span className="text-green-600">● Added</span> <span className="text-red-600">● Viewed</span> <span className="text-yellow-600">● Expired</span>{' '}
                    <span className="text-pink-600">● Deleted</span>
                </p>
            </div>
            <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Ad Management</h2>
                <AdsTable ads={dummyAds} />
            </div>
        </>
    );
}

export default Ads;
