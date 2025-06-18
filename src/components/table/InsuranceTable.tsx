

import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface InsuranceData {
    id: number;
    clientName: string;
    patientName: string;
    petName: string;
    insuranceType: string;
}

interface InsuranceTableProps {
    data: InsuranceData[];
    onApprove?: (id: number, petName: string) => void;
    onReject?: (id: number, petName: string) => void;
}

type StatusMap = Record<number, 'Approved' | 'Rejected' | null>;

const InsuranceTable: React.FC<InsuranceTableProps> = ({ data, onApprove, onReject }) => {
    const [status, setStatus] = useState<StatusMap>({});

    const handleApprove = (id: number, petName: string) => {
        setStatus((prev) => ({ ...prev, [id]: 'Approved' }));
        onApprove?.(id, petName);
    };

    const handleReject = (id: number, petName: string) => {
        setStatus((prev) => ({ ...prev, [id]: 'Rejected' }));
        onReject?.(id, petName);
    };

    return (
        <div className="overflow-x-auto rounded shadow-md">
            <table className="min-w-full text-sm text-left border border-gray-200 dark:border-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold">
                    <tr>
                        <th className="px-4 py-2 border">Serial No</th>
                        <th className="px-4 py-2 border">Pet Name</th>
                        <th className="px-4 py-2 border">Insurance Type</th>
                        <th className="px-4 py-2 border">Action / Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, idx) => (
                        <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-4 py-2 border">{idx + 1}</td>
                            <td className="px-4 py-2 border">{row.petName}</td>
                            <td className="px-4 py-2 border">{row.insuranceType}</td>
                            <td className="px-4 py-2 border">
                                {status[row.id] ? (
                                    <span className={`font-semibold ${status[row.id] === 'Approved' ? 'text-green-600' : 'text-red-500'}`}>{status[row.id]}</span>
                                ) : (
                                    <div className="space-x-2">
                                        <button
                                            onClick={() => handleApprove(row.id, row.petName)}
                                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded inline-flex items-center gap-1"
                                        >
                                            <CheckCircle size={16} />
                                        </button>
                                        <button onClick={() => handleReject(row.id, row.petName)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded inline-flex items-center gap-1">
                                            <XCircle size={16} />
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InsuranceTable;
