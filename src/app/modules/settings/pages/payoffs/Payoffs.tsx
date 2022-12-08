import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import { useLayout } from '../../../../../_metronic/layout/core';

import { getPayoffAllApi } from '../../../../api';

import PayoffsTable from './payoffstable/PayoffsTable';
import { LocalStorageKeys } from '../../../../constants/localstorage';
import { getItem, removeItem, setItem } from '../../../../Utils/storage';

const Payoffs = () => {

  let p = getItem(LocalStorageKeys.PAYOFFS_PAGE);

  const { setLoader } = useLayout()
  const navigate = useNavigate();
  const [totalPage, setTotalPage] = useState<number>(0);
  const [totalPayoffs, setTotalPayoffs] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(p || 1);
  const [payoffsList, setPayoffsList] = useState<any>([]);
  const [limitNo, setLimitNo] = useState<number>(10);

  useEffect(() => {
    setCurrentPage(currentPage);
    getPayofflist({ page: currentPage });
    removeItem(LocalStorageKeys.PAYOFFS_PAGE);
  }, [])

  useEffect(() => {
    getPayofflist({ page: currentPage });
  }, [limitNo])

  const getPayofflist = async ({ page }: any) => {
    setLoader(true);
    const res = await getPayoffAllApi({ page, limit: limitNo })
    if (res && res.status === 200) {
      setTotalPage(parseInt(res.data.pageCount))
      setTotalPayoffs(parseInt(res.data.totalCount))
      let a = res?.data?.payoffs.map((item: any, index: number) => { return ({ ...item, rowNo: (page - 1) * limitNo + index + 1 }) })
      setPayoffsList(a);
      setLoader(false);
    }
  }

  const onShowPaymentList = (row: any) => {
    if (row.month && row.year) {
      setItem(LocalStorageKeys.PAYOFFS_PAGE, currentPage);
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

      {payoffsList.length > 0 ? <PayoffsTable
        onShowPaymentList={onShowPaymentList}
        data={payoffsList}
        paginationConfig={{ currentPage, totalPage, handlePageChange, totalPayoffs, limitNo, setLimitNo }}
      /> :
        <div className={`card`}>
          <div className='card-body py-3'>
            <h4 className='mb-0 text-center'>No record found</h4>
          </div>
        </div>
      }
    </>
  )
}

export default Payoffs

