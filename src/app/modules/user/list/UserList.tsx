import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { useLayout } from '../../../../_metronic/layout/core'
import { getUsersListApi } from '../../../api';
import UserTable from './usertable/UserTable';

const UserList = () => {

  const { setLoader } = useLayout();
  const [usersData, setUsersData] = useState<any>();

  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers();
  }, [])

  const getAllUsers = async () => {
    setLoader(true)
    let response = await getUsersListApi();
    if (response && response.status === 200) {
      console.log(response?.data)
      setUsersData(response?.data)
      setLoader(false)
    }
  }

  const onEditRow = (row: any) => {
    if (row.id) {
      navigate(`/users/edit-user/${row.id}`)
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
        onEditRow={onEditRow}
        onDeleteRow={()=>{}}
        data={usersData}
      />
    </div>
  )
}

export default UserList
