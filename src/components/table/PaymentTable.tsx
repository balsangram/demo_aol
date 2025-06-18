// import React, { useState, useEffect } from 'react';

// interface Payment {
//     id: number;
//     name: string;
//     balance: number;
//     paymentDate: string;
// }

// interface PaymentTableProps {
//     data: Payment[];
// }

// const PaymentTable: React.FC<PaymentTableProps> = ({ data }) => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [filteredData, setFilteredData] = useState<Payment[]>([]);

//     useEffect(() => {
//         let filtered = data;

//         if (searchTerm) {
//             filtered = filtered.filter((d) => d.name.toLowerCase().includes(searchTerm.toLowerCase()));
//         }

//         // Sort by date descending and take latest 5
//         filtered = filtered.sort((a, b) => new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime()).slice(0, 5);

//         setFilteredData(filtered);
//     }, [searchTerm, data]);

//     return (
//         <div className="bg-white  rounded-xl shadow-md space-y-4 ">
//             <div className="flex justify-between px-4 pt-6">
//                 <h2 className="text-xl font-bold ">Payment History</h2>

//                 <input type="text" placeholder="Search by name" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border px-3 py-2 rounded w-full sm:w-1/3" />
//             </div>

//             <table className="w-full mt-4 border text-sm">
//                 <thead className="bg-gray-100">
//                     <tr>
//                         <th className="text-left py-2 px-3">Name</th>
//                         <th className="text-left py-2 px-3">Balance</th>
//                         <th className="text-left py-2 px-3">Payment Date</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredData.length === 0 ? (
//                         <tr>
//                             <td colSpan={3} className="text-center py-4 text-gray-500">
//                                 No results
//                             </td>
//                         </tr>
//                     ) : (
//                         filteredData.map((item) => (
//                             <tr key={item.id} className="border-t">
//                                 <td className="py-2 px-3">{item.name}</td>
//                                 <td className="py-2 px-3">₹{item.balance.toFixed(2)}</td>
//                                 <td className="py-2 px-3">{new Date(item.paymentDate).toLocaleDateString()}</td>
//                             </tr>
//                         ))
//                     )}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default PaymentTable;

import React, { useState, useEffect } from 'react';

interface Payment {
    id: number;
    name: string;
    balance: number;
    paymentDate: string;
}

interface PaymentTableProps {
    data: Payment[];
}

const PaymentTable: React.FC<PaymentTableProps> = ({ data }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState<Payment[]>([]);

    useEffect(() => {
        let filtered = data;

        if (searchTerm) {
            filtered = filtered.filter((d) => d.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        // Sort by date descending and take latest 5
        filtered = filtered.sort((a, b) => new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime()).slice(0, 5);

        setFilteredData(filtered);
    }, [searchTerm, data]);

    return (
        <div className="bg-white rounded-xl shadow-md space-y-4">
            {/* <div className="flex justify-between px-4 pt-6">
                <h2 className="text-xl font-bold">Payment History</h2>
                <input type="text" placeholder="Search by name" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border px-3 py-2 rounded w-full sm:w-1/3" />
            </div> */}

            <table className="w-full mt-4 border text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="text-left py-2 px-3">S.No</th>
                        <th className="text-left py-2 px-3">Name</th>
                        <th className="text-left py-2 px-3">Balance</th>
                        <th className="text-right py-2 px-3">Payment Date</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="text-center py-4 text-gray-500">
                                No results
                            </td>
                        </tr>
                    ) : (
                        filteredData.map((item, index) => (
                            <tr key={item.id} className="border-t">
                                <td className="py-2 px-3">{index + 1}</td>
                                <td className="py-2 px-3">{item.name}</td>
                                <td className="py-2 px-3">₹{item.balance.toFixed(2)}</td>
                                <td className="py-2 px-7 text-right">{new Date(item.paymentDate).toLocaleDateString()}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentTable;
