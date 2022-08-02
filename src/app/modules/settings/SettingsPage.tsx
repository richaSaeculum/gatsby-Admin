import React from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import Category from './pages/category/Category'
import Configuration from './pages/configuration/Configuration'
import Payment from './pages/payment/Payment'
import PaymentList from './pages/payoffs/PaymentList'
import Payoffs from './pages/payoffs/Payoffs'
import PayoffsTransactions from './pages/payoffstransactions/PayoffsTransactions'
import Wallet from './pages/wallet/Wallet'


const SettingsBreadcrumb: Array<PageLink> = [
    {
        title: '',
        path: '/wallet',
        isSeparator: false,
        isActive: false,
    },
]

// const SettingsBreadcrumb: Array<PageLink> = [
//     {
//         title: 'Settings',
//         path: '/settings/payment',
//         isSeparator: false,
//         isActive: false,
//     }
// ]


const SettingsPage = () => {
    return (
        <>
            <Routes>
                <Route element={<Outlet />}>
                    <Route
                        path='payment'
                        element={
                            <>
                                <PageTitle breadcrumbs={SettingsBreadcrumb}>Payment</PageTitle>
                                <Payment />
                            </>
                        }
                    />
                    <Route
                        path='wallet'
                        element={
                            <>
                                <PageTitle breadcrumbs={SettingsBreadcrumb}>Wallet</PageTitle>
                                <Wallet />
                            </>
                        }
                    />
                    <Route
                        path='category'
                        element={
                            <>
                                <PageTitle breadcrumbs={SettingsBreadcrumb}>Category</PageTitle>
                                <Category />
                            </>
                        }
                    />
                    <Route
                        path='config'
                        element={
                            <>
                                <PageTitle breadcrumbs={SettingsBreadcrumb}>Configuration</PageTitle>
                                <Configuration />
                            </>
                        }
                    />
                    <Route
                        path='payoffs'
                        element={
                            <>
                                <PageTitle breadcrumbs={SettingsBreadcrumb}>Monthly Payoffs</PageTitle>
                                <Payoffs />
                            </>
                        }
                    />
                    <Route
                        path='payoffs/:id'
                        element={
                            <>
                                <PageTitle breadcrumbs={SettingsBreadcrumb}>Monthly Payoffs</PageTitle>
                                <PaymentList />
                            </>
                        }
                    />
                    <Route
                        path='transactions'
                        element={
                            <>
                                <PageTitle breadcrumbs={SettingsBreadcrumb}>User Payoffs Transactions</PageTitle>
                                <PayoffsTransactions />
                            </>
                        }
                    />
                    <Route index element={<Navigate to={'/settings/payment'} />} />
                    <Route path="*" element={<Navigate to={'/settings/payment'} />} />
                </Route>
            </Routes>
        </>
    )
}

export default SettingsPage

