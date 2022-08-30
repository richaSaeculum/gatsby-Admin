import React, { useEffect, useState } from 'react'
import PaymentTable from './paymenttable/PaymentTable'
import { getTransactionsApi, getWalletDetailsApi } from '../../../../api'
import { useAuth } from '../../../auth'
import { useLayout } from '../../../../../_metronic/layout/core'
import StatusCard from '../../components/statuscard/StatusCard'
import moment from 'moment'

const Wallet = () => {

  const { auth } = useAuth();
  const { setLoader } = useLayout();
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [wallet, setWallet] = useState<any>();
  const [transactionList, setTransactionList] = useState<any>();

  const getWalletDetails = async () => {
    try {
      setLoader(true)
      const res = await getWalletDetailsApi({ token: auth?.token })
      if (res && res.status === 200) {
        setWallet(res.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false)
    }
  }

  const getTransactionsDetails = async ({ page }: any) => {
    try {
      setLoader(true);
      const response = await getTransactionsApi({ token: auth?.token, page })
      if (response && response.status === 200) {
        setTotalPage(parseInt(response.data['page-count']))
        let a = response?.data?.transactions.map((item: any, index: any) => { return ({ ...item, rowNo: (page - 1) * 10 + index + 1 }) })
        setTransactionList(a);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false)
    }
  }

  useEffect(() => {
    getWalletDetails();
    getTransactionsDetails({ page: currentPage });
  }, []);

  const handlePageChange = async (selectedPage: number) => {
    // return
    await getTransactionsDetails({ page: selectedPage });
    setCurrentPage(selectedPage);
  }

  return (
    <>
      <div>
        <div className='row'>
          <StatusCard
            className='card-xl-stretch'
            faIcon='fa-dollar-sign'
            bgColor='secondary'
            value={wallet?.getLastTransaction.txn_amount}
            title='Wallet'
            valueColor='white'
            titleColor='white'
          />
          <StatusCard
            className='card-xl-stretch'
            faIcon='fa-chart-simple'
            value={wallet?.totalEarning.total_earning}
            title='Total Earned'
            valueColor='dark'
            titleColor='dark'
          />
          <StatusCard
            className='card-xl-stretch'
            faIcon='fa-file'
            value={wallet?.getLastTransaction.txn_code}
            title='Last Transaction'
            valueColor='dark'
            titleColor='dark'
            layout='col-xl-6 col-md-12'
            summery={moment(wallet?.getLastTransaction.txn_created_on).format("DD MMM YYYY - hh:mm A")}
          />
        </div>
        <div className='row my-5'>
          <div className='col-12'>
            <h1 className='fs-2hx fw-bold text-dark my-6'>Transactions</h1>
            {transactionList?.length > 0 ? <PaymentTable
              data={transactionList}
              paginationConfig={{ totalPage, handlePageChange }}
            /> : <div className={`card`}>
              <div className='card-body py-3'>
                <h4 className='mb-0 text-center'>No record found</h4>
              </div>
            </div>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Wallet
