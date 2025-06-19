import React, { useState } from 'react';
import { Eye, EyeOff, Trash2 } from 'lucide-react';

export interface AdData {
    id: number;
    adName: string;
    dateAdded: string;
    adCount: number;
    expiredOn: string;
    status: 'Deleted' | 'Expired';
}

export interface AdsTableProps {
    ads: AdData[];
    onDelete?: (id: number) => void;
}

const AdsTable: React.FC<AdsTableProps> = ({ ads, onDelete }) => {
    const [viewStates, setViewStates] = useState<Record<number, boolean>>({});

    const toggleView = (id: number) => {
        setViewStates((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="w-full overflow-x-auto rounded shadow-md">
            <table className="min-w-full table-auto border text-sm">
                <thead className="bg-gray-100 text-gray-700 font-semibold">
                    <tr>
                        <th className="px-4 py-2 border">Serial No</th>
                        <th className="px-4 py-2 border">Ad Name</th>
                        <th className="px-4 py-2 border">Date Added On</th>
                        <th className="px-4 py-2 border">Ad Count</th>
                        <th className="px-4 py-2 border">Expired On</th>
                        <th className="px-4 py-2 border">Status</th>
                        <th className="px-4 py-2 border">Permissions</th>
                    </tr>
                </thead>
                <tbody>
                    {ads.map((ad, index) => (
                        <tr key={ad.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2 border text-center">{index + 1}</td>
                            <td className="px-4 py-2 border">{ad.adName}</td>
                            <td className="px-4 py-2 border">{ad.dateAdded}</td>
                            <td className="px-4 py-2 border">{ad.adCount}</td>
                            <td className="px-4 py-2 border">{ad.expiredOn}</td>
                            <td className="px-4 py-2 border">
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${ad.status === 'Deleted' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                    {ad.status}
                                </span>
                            </td>
                            <td className="px-4 py-2 border text-center flex gap-2 justify-center">
                                <button onClick={() => toggleView(ad.id)} className="text-gray-600 hover:text-gray-800">
                                    {viewStates[ad.id] ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                                <button onClick={() => onDelete?.(ad.id)} className="text-red-600 hover:text-red-800">
                                    <Trash2 size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdsTable;
