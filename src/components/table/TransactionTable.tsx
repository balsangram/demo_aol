// import React from 'react';
// import { CheckCircle, XCircle } from 'lucide-react';

// interface Transaction {
//     id: number;
//     amount: number;
//     debitedTo: string;
//     creditedTo: string;
//     status: 'Pending' | 'Success' | 'Failed';
//     date: string;
// }

// interface TransactionTableProps {
//     transactions: Transaction[];
//     onApprove: (id: number) => void;
//     onReject: (id: number) => void;
// }

// const TransactionTable: React.FC<TransactionTableProps> = ({ transactions, onApprove, onReject }) => {
//     return (
//         <div className="w-full overflow-x-auto rounded shadow-md">
//             <table className="min-w-full table-auto border text-sm">
//                 <thead className="bg-gray-100 text-gray-700 font-semibold">
//                     <tr>
//                         <th className="px-4 py-2 border">ID No</th>
//                         <th className="px-4 py-2 border">Transaction Amount</th>
//                         <th className="px-4 py-2 border">Debited To</th>
//                         <th className="px-4 py-2 border">Credited To</th>
//                         <th className="px-4 py-2 border">Status</th>
//                         <th className="px-4 py-2 border">Date</th>
//                         <th className="px-4 py-2 border">Permissions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {transactions.map((txn) => (
//                         <tr key={txn.id} className="hover:bg-gray-50">
//                             <td className="px-4 py-2 border">{txn.id}</td>
//                             <td className="px-4 py-2 border">₹{txn.amount.toFixed(2)}</td>
//                             <td className="px-4 py-2 border">{txn.debitedTo}</td>
//                             <td className="px-4 py-2 border">{txn.creditedTo}</td>
//                             <td className="px-4 py-2 border font-medium">
//                                 <span className={txn.status === 'Success' ? 'text-green-600' : txn.status === 'Failed' ? 'text-red-600' : 'text-yellow-600'}>{txn.status}</span>
//                             </td>
//                             <td className="px-4 py-2 border">{txn.date}</td>
//                             <td className="px-4 py-2 border space-x-2">
//                                 {txn.status === 'Pending' ? (
//                                     <>
//                                         <button onClick={() => onApprove(txn.id)} className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded">
//                                             <CheckCircle size={16} />
//                                         </button>
//                                         <button onClick={() => onReject(txn.id)} className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded">
//                                             <XCircle size={16} />
//                                         </button>
//                                     </>
//                                 ) : (
//                                     <span className="text-gray-400">—</span>
//                                 )}
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default TransactionTable;

import React, { useState } from 'react';
import { CheckCircle, XCircle, Eye, EyeOff } from 'lucide-react';

interface Transaction {
    id: number;
    amount: number;
    debitedTo: string;
    creditedTo: string;
    status: 'Success' | 'Declined' | 'On Hold';
    date: string;
}

interface TransactionTableProps {
    transactions: Transaction[];
    onApprove: (id: number) => void;
    onReject: (id: number) => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions, onApprove, onReject }) => {
    const [viewed, setViewed] = useState<Record<number, boolean>>({});

    const toggleView = (id: number) => {
        setViewed((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="w-full overflow-x-auto rounded shadow-md">
            <table className="min-w-full table-auto border text-sm">
                <thead className="bg-gray-100 text-gray-700 font-semibold">
                    <tr>
                        <th className="px-4 py-2 border">ID No</th>
                        <th className="px-4 py-2 border">Transaction Amount</th>
                        <th className="px-4 py-2 border">Debited To</th>
                        <th className="px-4 py-2 border">Credited To</th>
                        <th className="px-4 py-2 border">Status</th>
                        <th className="px-4 py-2 border">Date</th>
                        <th className="px-4 py-2 border">Permissions</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((txn) => (
                        <tr key={txn.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2 border">{txn.id}</td>
                            <td className="px-4 py-2 border">₹{txn.amount.toFixed(2)}</td>
                            <td className="px-4 py-2 border">{txn.debitedTo}</td>
                            <td className="px-4 py-2 border">{txn.creditedTo}</td>
                            <td className="px-4 py-2 border font-medium">
                                <span className={txn.status === 'Success' ? 'text-green-600' : txn.status === 'Declined' ? 'text-red-600' : 'text-yellow-600'}>{txn.status}</span>
                            </td>
                            <td className="px-4 py-2 border">{txn.date}</td>
                            <td className="px-4 py-2 border space-x-2 flex items-center justify-center">
                                <button onClick={() => toggleView(txn.id)} className="text-gray-600 hover:text-gray-800">
                                    {viewed[txn.id] ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionTable;
