import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface EChangeTransaction {
    roleNo: number;
    name: string;
    amount: number;
    debitedFrom: string;
    creditedTo: string;
    status: 'On Hold' | 'Success' | 'Declined';
    date: string;
}

interface EChangeTableProps {
    data: EChangeTransaction[];
    onApprove?: (roleNo: number) => void;
    onReject?: (roleNo: number) => void;
}

const EChangeTable: React.FC<EChangeTableProps> = ({ data, onApprove, onReject }) => {
    const [viewStates, setViewStates] = useState<Record<number, boolean>>({});

    const toggleView = (id: number) => {
        setViewStates((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="w-full overflow-x-auto rounded shadow-md">
            <table className="min-w-full table-auto border text-sm">
                <thead className="bg-gray-100 text-gray-700 font-semibold">
                    <tr>
                        <th className="px-4 py-2 border">Role No</th>
                        <th className="px-4 py-2 border">Name</th>
                        <th className="px-4 py-2 border">E Change Amount</th>
                        <th className="px-4 py-2 border">Debited From</th>
                        <th className="px-4 py-2 border">Credited To</th>
                        <th className="px-4 py-2 border">Status</th>
                        <th className="px-4 py-2 border">Date</th>
                        <th className="px-4 py-2 border">Permissions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((txn) => (
                        <tr key={txn.roleNo} className="hover:bg-gray-50">
                            <td className="px-4 py-2 border">{txn.roleNo}</td>
                            <td className="px-4 py-2 border">{txn.name}</td>
                            <td className="px-4 py-2 border">₹{txn.amount.toFixed(2)}</td>
                            <td className="px-4 py-2 border">{txn.debitedFrom}</td>
                            <td className="px-4 py-2 border">{txn.creditedTo}</td>
                            <td className="px-4 py-2 border font-medium">
                                <span className={txn.status === 'Success' ? 'text-green-600' : txn.status === 'Declined' ? 'text-red-600' : 'text-yellow-600'}>{txn.status}</span>
                            </td>
                            <td className="px-4 py-2 border">{txn.date}</td>
                            <td className="px-4 py-2 border">
                                <button onClick={() => toggleView(txn.roleNo)} className="text-gray-600 hover:text-gray-800">
                                    {viewStates[txn.roleNo] ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EChangeTable;
