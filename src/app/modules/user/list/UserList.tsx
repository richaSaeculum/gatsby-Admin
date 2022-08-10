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

  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers({ page: currentPage });
  }, [wpAuthToken])

  const getAllUsers = async ({ page }: any) => {
    setLoader(true)
    let response = await getUsersListApi({ wpAuthToken, page });
    if (response && response.status === 200) {
      setTotalPage(parseInt(response.headers['x-wp-totalpages']))
      let a = response?.data.map((item: any, index: any) => { return ({ ...item, rowNo: (page - 1) * 10 + index + 1 }) })
      setUsersData(a);
      setLoader(false);
    }
  }

  const onEditRow = (row: any) => {
    if (row.id) {
      navigate(`/users/edit-user/${row.id}`);
    }
  }

  const onDeleteRow = async (row: any) => {
    setLoader(true)
    const response = await deleteUserApi({ wpAuthToken, id: row.id })
    if (response && response.status === 200 && response.data.deleted) {
      getAllUsers({ page: currentPage });
    }
  }

  const handlePageChange = async (selectedPage: number) => {
    // return
    await getAllUsers({ page: selectedPage });
    setCurrentPage(selectedPage);
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
        onDeleteRow={onDeleteRow}
        data={usersData}
        paginationConfig={{ totalPage, handlePageChange }}
      />
    </div>
  )
}

export default UserList
