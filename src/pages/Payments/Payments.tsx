import DashboardBarChart from '../../components/pieChart/DashboardBarChart';
import TransactionTable from '../../components/table/TransactionTable';

const sampleData = [
    { name: 'Page A', uv: 4000, pv: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398 },
    { name: 'Page C', uv: 2000, pv: 9800 },
    { name: 'Page D', uv: 2780, pv: 3908 },
    { name: 'Page D', uv: 2780, pv: 3908 },
    { name: 'Page D', uv: 2780, pv: 3908 },
    { name: 'Page D', uv: 2780, pv: 3908 },
    { name: 'Page D', uv: 2780, pv: 3908 },
    { name: 'Page D', uv: 2780, pv: 3908 },
];

type Transaction = {
    id: number;
    amount: number;
    debitedTo: string;
    creditedTo: string;
    status: 'Success' | 'Declined' | 'On Hold';
    date: string;
};

const transactions: Transaction[] = [
    {
        id: 1, 
        amount: 1500,
        debitedTo: 'Account A',
        creditedTo: 'Account B',
        status: 'Declined',
        date: '2025-06-18',
    },
    {
        id: 2,
        amount: 3200,
        debitedTo: 'Account C',
        creditedTo: 'Account D',
        status: 'Success',
        date: '2025-06-17',
    },
];

function Payments() {
    return (
        <>
            <div>
                {/* Breadcrumbs */}
                <ol className="flex text-gray-500 font-semibold dark:text-white-dark space-x-2">
                    <li>
                        <button className="hover:text-gray-500/70 dark:hover:text-white-dark/70">Home</button>
                    </li>
                    <li>/</li>
                    <li>
                        <button className="hover:text-gray-500/70 dark:hover:text-white-dark/70">Dashboard</button>
                    </li>
                    {/* <li>/</li>
                <li>
                    <button className="text-black dark:text-white-light hover:text-black/70 dark:hover:text-white-light/70">UI Kit</button>
                </li> */}
                </ol>
                {/* <h1 className="text-lg font-bold">PAYMENT </h1> */}
                <div className="px-[8rem]">
                    <DashboardBarChart data={sampleData} height={400} />
                </div>
                <TransactionTable transactions={transactions} onApprove={(id) => console.log('Approved', id)} onReject={(id) => console.log('Rejected', id)} />
            </div>
        </>
    );
}

export default Payments;
