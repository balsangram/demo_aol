import React, { useState } from 'react';
import DashboardPieChart from '../../components/pieChart/DashboardPieChart';
import DashboardBarChart from '../../components/pieChart/DashboardBarChart';
import PaymentTable from '../../components/table/PaymentTable';
import LineChartComponent from '../../components/pieChart/LineChartComponent';
import BloodRequestTable, { BloodRequest } from '../../components/table/BloodRequestTable';
import CountCardGrid from '../../components/countCard/CountCardGrid';
import InsuranceTable from '../../components/table/InsuranceTable';
import { UserPlus, Users, Building2 } from 'lucide-react';

interface PieDataItem {
    name: string;
    value: number;
}

interface ChartCardProps {
    title: string;
    data: PieDataItem[];
}

const pieData: PieDataItem[] = [
    { name: 'Added', value: 400 },
    { name: 'Viewed', value: 300 },
    { name: 'Expired', value: 300 },
];

// ✅ Reusable Card Component
const ChartCard: React.FC<ChartCardProps> = ({ title, data }) => (
    <div className="">
        <h2 className="text-lg font-bold mb-2 text-center">{title}</h2>
        <DashboardPieChart data={data} />
        <p className="mt-2 text-sm text-gray-700 text-center">Added • Viewed • Expired</p>
    </div>
);

const ChartCard2: React.FC<ChartCardProps> = ({ title, data }) => (
    <div className="">
        <h2 className="text-lg font-bold mb-2 text-center">{title}</h2>
        <DashboardPieChart data={data} />
        <p className="mt-2 text-sm text-gray-700 text-center">Added • Viewed • Expired</p>
    </div>
);

// ✅ Bar Chart Data
const sampleData = [
    { name: 'Page A', uv: 4000, pv: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398 },
    { name: 'Page C', uv: 2000, pv: 9800 },
    { name: 'Page D', uv: 2780, pv: 3908 },
];

const tablweSampleData = [
    { id: 1, name: 'Alice', balance: 1200, paymentDate: '2025-06-17' },
    { id: 2, name: 'Bob', balance: 800, paymentDate: '2025-06-15' },
    { id: 3, name: 'Charlie', balance: 600, paymentDate: '2025-06-12' },
    { id: 4, name: 'Charlie', balance: 600, paymentDate: '2025-06-12' },
    { id: 5, name: 'Charlie', balance: 600, paymentDate: '2025-06-12' },
];

const sampleDataGraph = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
];

const data = [
    { label: 'NEW FINT USERS', value: 710, icon: <UserPlus />, iconBgColor: 'bg-orange-400' },
    { label: 'FINT USERS', value: 915, icon: <Users />, iconBgColor: 'bg-blue-600' },
    { label: 'VENTURES USERS', value: 580, icon: <Building2 />, iconBgColor: 'bg-green-500' },
];

const insuranceData = [
    {
        id: 1,
        clientName: 'ABC Corp',
        patientName: 'John Doe',
        petName: 'Buddy',
        insuranceType: 'Health',
    },
    {
        id: 2,
        clientName: 'XYZ Ltd',
        patientName: 'Jane Smith',
        petName: 'Whiskers',
        insuranceType: 'Life',
    },
    {
        id: 3,
        clientName: 'XYZ Ltd',
        patientName: 'Jane Smith',
        petName: 'Coco',
        insuranceType: 'Life',
    },
    {
        id: 4,
        clientName: 'XYZ Ltd',
        patientName: 'Jane Smith',
        petName: 'Simba',
        insuranceType: 'Life',
    },
    {
        id: 5,
        clientName: 'XYZ Ltd',
        patientName: 'Jane Smith',
        petName: 'Luna',
        insuranceType: 'Life',
    },
];

const Dashboard: React.FC = () => {
    const [requests, setRequests] = useState<BloodRequest[]>([
        { id: 1, bloodGroup: 'A+', userName: 'John Doe', status: 'Pending' },
        { id: 2, bloodGroup: 'B-', userName: 'Jane Smith', status: 'Pending' },
        { id: 3, bloodGroup: 'O+', userName: 'Ravi Kumar', status: 'Pending' },
        { id: 4, bloodGroup: 'O+', userName: 'Ravi Kumar', status: 'Pending' },
    ]);

    const handleApprove = (id: number) => {
        setRequests((prev) => prev.map((req) => (req.id === id ? { ...req, status: 'Approved' } : req)));
    };

    const handleReject = (id: number) => {
        setRequests((prev) => prev.map((req) => (req.id === id ? { ...req, status: 'Rejected' } : req)));
    };

    return (
        <>
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
            <div className="flex mt-8">
                <CountCardGrid items={data} />
            </div>
            <div className="flex">
                <div className="p-4 space-y-6 w-[60%] ">
                    {/* Pie Chart Cards Grid */}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                        {/* Chart Cards from headData */}

                        <ChartCard title="E-CHANGE" data={pieData} />
                        <ChartCard title="RED DROP" data={pieData} />
                        <ChartCard title="PET INSURANCE" data={pieData} />

                        {/* Dashboard Bar Chart (spans 2 columns on large screens) */}
                        <div className="lg:col-span-2 ">
                            <h1 className="text-lg font-bold">PAYMENT </h1>
                            <DashboardBarChart data={sampleData} height={300} />
                        </div>

                        {/* Coupons Card */}
                        <div className="">
                            <ChartCard2 title="COUPONS" data={pieData} />
                        </div>

                        {/* Payment Table (spans 2 columns on large screens) */}
                        <div className="lg:col-span-2 h-[10rem] ">
                            <h1 className="text-lg font-bold">PAYMENT</h1>
                            <PaymentTable data={tablweSampleData} />
                        </div>

                        {/* ADS Card */}
                        <div className=" ">
                            <ChartCard2 title="ADS" data={pieData} />
                        </div>
                    </div>
                </div>
                <div className="p-4 space-y-6 w-[40%] ">
                    <div>
                        <h1 className="text-lg font-bold my-4 ">Latest Blood Requests</h1>
                        <BloodRequestTable requests={requests} onApprove={handleApprove} onReject={handleReject} />
                    </div>
                    <div className="lg:col-span-2 mb-10 ">
                        <h1 className="text-lg font-bold mb-2">Active Users List </h1>
                        <LineChartComponent height={290} data={sampleDataGraph} />
                    </div>

                    <div className=" ">
                        <h1 className="text-lg font-bold my-4">Insurance Table</h1>
                        <InsuranceTable data={insuranceData} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
