import React from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import AddUser from './add/AddUser'
import UserList from './list/UserList'

const ArticleBreadcrumb: Array<PageLink> = [
    {
        title: '',
        path: '/list',
        isSeparator: false,
        isActive: false,
    },
]

const AddEditArticleBreadcrumb: Array<PageLink> = [
    {
        title: 'User',
        path: '/users/list',
        isSeparator: false,
        isActive: false,
    }
]

const UserPage = () => {
    return (
        <>
            <Routes>
                <Route element={<Outlet />}>
                    <Route
                        path='list'
                        element={
                            <>
                                <PageTitle breadcrumbs={ArticleBreadcrumb}>Users</PageTitle>
                                <UserList />
                            </>
                        }
                    />
                    <Route
                        path='add-user'
                        element={
                            <>
                                <PageTitle breadcrumbs={AddEditArticleBreadcrumb}>Add User</PageTitle>
                                <AddUser />
                            </>
                        }
                    />
                    <Route
                        path='edit-user/:id'
                        element={
                            <>
                                <PageTitle breadcrumbs={AddEditArticleBreadcrumb}>Edit User</PageTitle>
                                <AddUser />
                            </>
                        }
                    />
                    <Route index element={<Navigate to={'/users/list'} />} />
                    <Route path="*" element={<Navigate to={'/users/list'} />} />
                </Route>
            </Routes>
        </>
    )
}

export default UserPage
