import { Eye, EyeOff, Trash2 } from 'lucide-react';
import React, { useState } from 'react';

export interface Coupon {
    id: string;
    name: string;
    dateAdded: string;
    viewCount: number;
    expiredOn: string;
    status: 'Deleted' | 'Expired';
    claimPercentage: number;
}

interface CouponsTableProps {
    coupons: Coupon[];
    onDelete: (id: string) => void;
}

const CouponsTable: React.FC<CouponsTableProps> = ({ coupons, onDelete }) => {
    const [viewStates, setViewStates] = useState<Record<string, boolean>>({});

    const toggleView = (id: string) => {
        setViewStates((prev) => ({ ...prev, [id]: !prev[id] }));
    };

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
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${coupon.status === 'Deleted' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {coupon.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3">{coupon.claimPercentage}%</td>
                                <td className="px-4 py-2 flex gap-2 justify-center items-center">
                                    <button onClick={() => toggleView(coupon.id)} className="text-gray-600 hover:text-gray-800" title={viewStates[coupon.id] ? 'Hide' : 'View'}>
                                        {viewStates[coupon.id] ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                    <button onClick={() => onDelete(coupon.id)} className="text-red-600 hover:text-red-800" title="Delete">
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
