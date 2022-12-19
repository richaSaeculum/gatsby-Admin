import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import { PageLink, PageTitle } from '../../../_metronic/layout/core';
import { UserType } from '../../constants/user/user_type';
import { useAuth } from '../auth';

import Category from './pages/category/Category';
import Configuration from './pages/configuration/Configuration';
import Payment from './pages/payment/Payment';
import PaymentList from './pages/payoffs/PaymentList';
import Payoffs from './pages/payoffs/Payoffs';
import PayoffsTransactions from './pages/payoffstransactions/PayoffsTransactions';
import Wallet from './pages/wallet/Wallet';

const SettingsBreadcrumb: Array<PageLink> = [
  {
    title: '',
    path: '/wallet',
    isSeparator: false,
    isActive: false,
  },
]

const SettingsPage = () => {
  const { auth } = useAuth();
  return (
    <>
      <Routes>
        <Route element={<Outlet />}>
          <Route
            path='payment'
            element={
              <>
                {/* breadcrumbs={SettingsBreadcrumb} */}
                <PageTitle >Payment</PageTitle>
                <Payment />
              </>
            }
          />
          <Route
            path='wallet'
            element={
              <>
                {/* breadcrumbs={SettingsBreadcrumb} */}
                <PageTitle >Wallet</PageTitle>
                <Wallet />
              </>
            }
          />
          {auth?.user?.user_role === UserType.ADMINISTRATOR &&
            (
              <>
                <Route
                  path='category'
                  element={
                    <>
                      {/* breadcrumbs={SettingsBreadcrumb} */}
                      <PageTitle >Category</PageTitle>
                      <Category />
                    </>
                  }
                />
                <Route
                  path='config'
                  element={
                    <>
                      {/* breadcrumbs={SettingsBreadcrumb} */}
                      <PageTitle >Configuration</PageTitle>
                      <Configuration />
                    </>
                  }
                />
                <Route
                  path='payoffs'
                  element={
                    <>
                      {/* breadcrumbs={SettingsBreadcrumb} */}
                      <PageTitle >Monthly Payoffs</PageTitle>
                      <Payoffs />
                    </>
                  }
                />
                <Route
                  path='payoffs/:id'
                  element={
                    <>
                      {/* breadcrumbs={SettingsBreadcrumb} */}
                      <PageTitle >Monthly Payoffs</PageTitle>
                      <PaymentList />
                    </>
                  }
                />
                <Route
                  path='transactions'
                  element={
                    <>
                      {/* breadcrumbs={SettingsBreadcrumb} */}
                      <PageTitle >User Payoffs Transactions</PageTitle>
                      <PayoffsTransactions />
                    </>
                  }
                />
              </>
            )
          }
          <Route index element={<Navigate to={'/settings/payment'} />} />
          {/* Page Not Found */}
          <Route path='*' element={<Navigate to='/error/404' replace />} />
        </Route>
      </Routes>
    </>
  )
}

export default SettingsPage

