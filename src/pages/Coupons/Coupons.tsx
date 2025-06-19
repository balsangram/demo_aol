// import React, { useState } from 'react';
// import DashboardPieChart from '../../components/pieChart/DashboardPieChart';
// import CouponsTable, { Coupon } from '../../components/table/CouponsTable';
// import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

// interface PieDataItem {
//     name: string;
//     value: number;
// }

// const pieData: PieDataItem[] = [
//     { name: 'Added', value: 400 },
//     { name: 'Viewed', value: 300 },
//     { name: 'Expired', value: 300 },
//     { name: 'Deleted', value: 100 },
// ];

// function Coupons() {
//     const [viewedCouponId, setViewedCouponId] = useState<string | null>(null);

//     const couponList: Coupon[] = [
//         {
//             id: '1',
//             name: 'Festival Deal',
//             dateAdded: '2025-06-01',
//             viewCount: 200,
//             expiredOn: '2025-06-30',
//             status: 'Deleted',
//             claimPercentage: 80,
//         },
//         {
//             id: '2',
//             name: 'Flash Sale',
//             dateAdded: '2025-05-01',
//             viewCount: 120,
//             expiredOn: '2025-05-15',
//             status: 'Expired',
//             claimPercentage: 95,
//         },
//     ];

//     const handleView = (id: string) => {
//         setViewedCouponId(viewedCouponId === id ? null : id);
//     };

//     const handleDelete = (id: string) => {
//         alert(`Delete clicked for coupon ID: ${id}`);
//     };

//     return (
//         <>
//             <div className="text-center">
//                 <DashboardPieChart data={pieData} />
//                 <p>
//                     <span className="text-green-600">● Added</span> <span className="text-red-600">● Viewed</span> <span className="text-yellow-600">● Expired</span>{' '}
//                     <span className="text-pink-600">● Deleted</span>
//                 </p>
//             </div>

//             <div className="p-6">
//                 <h2 className="text-xl font-semibold mb-4">Coupons Management</h2>
//                 <CouponsTable coupons={couponList} onView={handleView} onDelete={handleDelete} viewedCouponId={viewedCouponId} />
//             </div>
//         </>
//     );
// }

// export default Coupons;

// CouponsTable.tsx
import { Eye, EyeOff, Trash2 } from 'lucide-react';
import React from 'react';

export interface Coupon {
    id: string;
    name: string;
    dateAdded: string;
    viewCount: number;
    expiredOn: string;
    status: 'Deleted' | 'Expired';
    claimPercentage: number;
}

export interface CouponsTableProps {
    coupons: Coupon[];
    onDelete: (id: string) => void;
    onView: (id: string) => void;
    viewedCouponId: string | null;
}

const CouponsTable: React.FC<CouponsTableProps> = ({ coupons, onDelete, onView, viewedCouponId }) => {
    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });

    return (
        <div className="p-4 overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                <thead>
                    <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                        <th className="px-4 py-3">S.No</th>
                        <th className="px-4 py-3">Coupon Name</th>
                        <th className="px-4 py-3">Date Added On</th>
                        <th className="px-4 py-3">View Count</th>
                        <th className="px-4 py-3">Expired On</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Claim %</th>
                        <th className="px-4 py-3">Permissions</th>
                    </tr>
                </thead>
                <tbody>
                    {coupons.length === 0 ? (
                        <tr>
                            <td colSpan={8} className="px-4 py-3 text-center text-gray-500">
                                No coupons available
                            </td>
                        </tr>
                    ) : (
                        coupons.map((coupon, index) => (
                            <tr key={coupon.id} className="border-t border-gray-200 hover:bg-gray-50 text-sm">
                                <td className="px-4 py-3">{index + 1}</td>
                                <td className="px-4 py-3 font-medium">{coupon.name}</td>
                                <td className="px-4 py-3">{formatDate(coupon.dateAdded)}</td>
                                <td className="px-4 py-3">{coupon.viewCount}</td>
                                <td className="px-4 py-3">{formatDate(coupon.expiredOn)}</td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${coupon.status === 'Deleted' ? 'bg-pink-100 text-pink-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {coupon.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3">{coupon.claimPercentage}%</td>
                                <td className="px-4 py-2 flex gap-2 justify-center items-center">
                                    <button onClick={() => onView(coupon.id)} className="text-gray-600 hover:text-gray-800">
                                        {viewedCouponId === coupon.id ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                    <button onClick={() => onDelete(coupon.id)} className="text-red-600 hover:text-red-800">
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default CouponsTable;
