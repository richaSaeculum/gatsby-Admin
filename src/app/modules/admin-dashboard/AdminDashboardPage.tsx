import { PageLink, PageTitle } from '../../../_metronic/layout/core';

import Dashboard from './Dashboard';

const AdminDashboardBreadcrumb: Array<PageLink> = [
    {
        title: '',
        path: '/admin-dashboard',
        isSeparator: false,
        isActive: false,
    },
]

const AdminDashboardPage = () => {
    return (
        <>
            <PageTitle>Dashboard</PageTitle>
            <Dashboard />
        </>
    )
}
export default AdminDashboardPage
