import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import { useLayout } from '../../../../../_metronic/layout/core';

import { getPayoffAllApi } from '../../../../api';

import PayoffsTable from './payoffstable/PayoffsTable';

const Payoffs = () => {

  const { setLoader } = useLayout()
  const navigate = useNavigate();
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [payoffsList, setPayoffsList] = useState<any>();

  const getPayofflist = async ({ page }: any) => {
    setLoader(true);
    let limit = 5
    const res = await getPayoffAllApi({ page, limit })
    if (res && res.status === 200) {
      setTotalPage(parseInt(res.data.pageCount))
      let a = res?.data?.payoffs.map((item: any, index: number) => { return ({ ...item, rowNo: (page - 1) * limit + index + 1 }) })
      setPayoffsList(a);
      setLoader(false);
    }
  }

  useEffect(() => {
    getPayofflist({ page: currentPage });
  }, [])

  const onShowPaymentList = (row: any) => {
    if (row.month && row.year) {
      navigate(`/settings/payoffs/${row.month}-${row.year}`);
    }
  }

  const handlePageChange = async (selectedPage: number) => {
    // return
    await getPayofflist({ page: selectedPage });
    setCurrentPage(selectedPage);
  }

  return (
    <>
      <div className='d-flex justify-content-between align-items-center mb-5'>
        <div>
          <h1 className='fs-2hx fw-bold text-dark mb-0'>Payoffs</h1>
        </div>
      </div>

      <PayoffsTable
        onShowPaymentList={onShowPaymentList}
        data={payoffsList}
        paginationConfig={{ currentPage, totalPage, handlePageChange }}
      />
    </>
  )
}

export default Payoffs

