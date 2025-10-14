'use client'
import DashboardCard from './DashboardCard';
import RecentTransactionsTable from './RecentTransactionsTable';

const ContaCorrenteDashboard = () => (
  <div className="flex flex-col items-center gap-0 w-full">
    <DashboardCard type="conta" value="12,345.67" />
    <RecentTransactionsTable />
  </div>
);

export default ContaCorrenteDashboard;
