import { lazy, FC, Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { MasterLayout } from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
// import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper'
// import { MenuTestPage } from '../pages/MenuTestPage'
import { getCSSVariableValue } from '../../_metronic/assets/ts/_utils'
import { WithChildren } from '../../_metronic/helpers'
import { useAuth } from '../modules/auth'
import { UserType } from '../constants/user/user_type'
// import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'

const PrivateRoutes = () => {
  const { auth } = useAuth();
  
  const AdminDashboardPage = lazy(() => import('../modules/admin-dashboard/AdminDashboardPage'))
  const ArticlePage = lazy(() => import('../modules/articles/ArticlePage'))
  const UserPage = lazy(() => import('../modules/user/UserPage'))
  const SettingsPage = lazy(() => import('../modules/settings/SettingsPage'))
  const MyProfilePage = lazy(() => import('../modules/my-profile/MyProfilePage'))
  
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='/*' element={<Navigate to='/auth' />} />
        {auth?.user?.user_role !== UserType.EDITOR && <Route path='auth/*' element={<Navigate to='/admin-dashboard' />} />}
        {auth?.user?.user_role === UserType.EDITOR && <Route path='auth/*' element={<Navigate to='/articles' />} />}
        {/* Pages */}
        {/* <Route path='dashboard' element={<DashboardWrapper />} /> */}
        {/* <Route path='builder' element={<BuilderPageWrapper />} /> */}
        {/* <Route path='menu-test' element={<MenuTestPage />} /> */}

        {/* Lazy Modules */}
        {/* <Route
          path='crafted/pages/profile/*'
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/wizards/*'
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/widgets/*'
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/account/*'
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/chat/*'
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/user-management/*'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        /> */}

        {auth?.user?.user_role !== UserType.EDITOR && <Route
          path='admin-dashboard'
          element={
            <SuspensedView>
              <AdminDashboardPage />
            </SuspensedView>
          }
        />}

        <Route
          path='my-profile/*'
          element={
            <SuspensedView>
              <MyProfilePage />
            </SuspensedView>
          }
        />

        <Route
          path='articles/*'
          element={
            <SuspensedView>
              <ArticlePage />
            </SuspensedView>
          }
        />

        {auth?.user?.user_role === UserType.ADMINISTRATOR && <Route
          path='users/*'
          element={
            <SuspensedView>
              <UserPage />
            </SuspensedView>
          }
        />}

        {auth?.user?.user_role !== UserType.EDITOR && <Route
          path='settings/*'
          element={
            <SuspensedView>
              <SettingsPage />
            </SuspensedView>
          }
        />}

        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue('--kt-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export { PrivateRoutes }
