import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { useLayout } from '../../../../_metronic/layout/core'
import { deleteUserApi, getUsersListApi } from '../../../api';
import { useAuth } from '../../auth';
import UserTable from './usertable/UserTable';

const UserList = () => {

  const { wpAuth } = useAuth();
  const { setLoader } = useLayout();
  const [usersData, setUsersData] = useState<any>();
  const wpAuthToken = wpAuth?.token
  
  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers();
  }, [wpAuthToken])

  const getAllUsers = async () => {
    setLoader(true)
    let response = await getUsersListApi({ wpAuthToken });
    if (response && response.status === 200) {
      setUsersData(response?.data)
      setLoader(false);
    }
  }

  const onEdit = (row: any) => {
    if (row.id) {
      navigate(`/users/edit-user/${row.id}`)
    }
  }

  const onDelete = async (row:any) => {
    setLoader(true)
    const res = await deleteUserApi({ wpAuthToken, id: row.id })
    if (res && res.status === 200 && res.data.deleted) {
      getAllUsers();
    }
  }

  return (
    <div>
      <div className='d-flex justify-content-between align-items-center mb-5'>
        <div>
          <h1 className='fs-2hx fw-bold text-dark mb-0'>Users</h1>
        </div>
        <div className='d-flex justify-content-between align-items-center'>
          <Link to={'/users/add-user'}>
            <button type='button' className='btn btn-secondary'>
              Add User
            </button>
          </Link>
        </div>
      </div>

      <UserTable
        onEditRow={onEdit}
        onDeleteRow={onDelete}
        data={usersData}
      />
    </div>
  )
}

export default UserList
