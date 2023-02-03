import { Navigate, Routes, Route, Outlet } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import { Overview } from './components/Overview'
import { EditProfile } from './components/edit-profile/EditProfile'
import { MyProfileHeader } from './MyProfileHeader'

const accountBreadCrumbs: Array<PageLink> = [
  {
    title: 'Account',
    path: '/crafted/account/overview',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const MyProfilePage = () => (
  <Routes>
    <Route
      element={
        <>
          <MyProfileHeader />
          <Outlet />
        </>
      }
    >
      <Route
        path='overview'
        element={
          <>
            <PageTitle>Overview</PageTitle>
            <Overview />
          </>
        }
      />
      <Route
        path='edit'
        element={
          <>
            <PageTitle>Edit Profile</PageTitle>
            <EditProfile />
          </>
        }
      />
      <Route index element={<Navigate to='/my-profile/overview' />} />
    </Route>
  </Routes>
)

export default MyProfilePage
