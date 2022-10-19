import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useLayout } from '../../../../_metronic/layout/core';
import { useAuth } from '../../auth';

import { deleteUserApi, getUsersListApi } from '../../../api';

import UserTable from './usertable/UserTable';

const UserList = () => {

  const { auth } = useAuth();
  const { setLoader } = useLayout();
  const [usersData, setUsersData] = useState<any>();

  const [totalPage, setTotalPage] = useState<number>(0);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limitNo, setLimitNo] = useState<number>(5);

  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers({ page: 1 });
  }, [limitNo])

  const getAllUsers = async ({ page }: any) => {
    setLoader(true);
    let limit = 10;
    let response = await getUsersListApi({ token: auth?.token, page, limit: limitNo });
    if (response && response.status === 200) {
      setTotalPage(parseInt(response.data.pageCount))
      setTotalUsers(parseInt(response.data.userCount))
      let a = response?.data?.users.map((item: any, index: any) => { return ({ ...item, rowNo: (page - 1) * limit + index + 1 }) })
      setUsersData(a);
      setLoader(false);
    }
  }

  const onEditRow = (row: any) => {
    if (row.user_id) {
      navigate(`/users/edit-user/${row.user_id}`);
    }
  }

  const onDeleteRow = async (row: any) => {
    setLoader(true)
    const response = await deleteUserApi({ token: auth?.token, id: row.wp_user_id })
    if (response && response.status === 200) {
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

      {usersData?.length > 0 ? <UserTable
        onEditRow={onEditRow}
        onDeleteRow={onDeleteRow}
        data={usersData}
        paginationConfig={{ totalPage, handlePageChange, totalUsers, limitNo, setLimitNo }}
      /> :
        <div className={`card`}>
          <div className='card-body py-3'>
            <h4 className='mb-0 text-center'>No record found</h4>
          </div>
        </div>
      }

    </div>
  )
}

export default UserList
