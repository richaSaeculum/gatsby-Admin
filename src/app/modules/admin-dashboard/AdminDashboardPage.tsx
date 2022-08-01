import React from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import Dashboard from './Dashboard'


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
            <PageTitle breadcrumbs={AdminDashboardBreadcrumb}>Dashboard</PageTitle>
            <Dashboard />
        </>
    )
}
export default AdminDashboardPage
