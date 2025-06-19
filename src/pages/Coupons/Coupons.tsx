import React, { useState } from 'react';
import DashboardPieChart from '../../components/pieChart/DashboardPieChart';
import CouponsTable, { Coupon } from '../../components/table/CouponsTable';

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

function Coupons() {
    const [viewedCouponId, setViewedCouponId] = useState<string | null>(null);

    const couponList: Coupon[] = [
        {
            id: '1',
            name: 'Festival Deal',
            dateAdded: '2025-06-01',
            viewCount: 200,
            expiredOn: '2025-06-30',
            status: 'Deleted',
            claimPercentage: 80,
        },
        {
            id: '2',
            name: 'Flash Sale',
            dateAdded: '2025-05-01',
            viewCount: 120,
            expiredOn: '2025-05-15',
            status: 'Expired',
            claimPercentage: 95,
        },
    ];

    const handleView = (id: string) => {
        setViewedCouponId(viewedCouponId === id ? null : id);
    };

    const handleDelete = (id: string) => {
        alert(`Delete clicked for coupon ID: ${id}`);
    };

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
                <h2 className="text-xl font-semibold mb-4">Coupons Management</h2>
                <CouponsTable coupons={couponList} onView={handleView} onDelete={handleDelete} viewedCouponId={viewedCouponId} />
            </div>
        </>
    );
}

export default Coupons;
