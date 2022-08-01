import React from 'react'
import { Link } from 'react-router-dom'
import PaymentTable from './paymenttable/PaymentTable'
import StatusCardGroup from '../../components/statuscardgroup/StatusCardGroup'

const Wallet = () => {
  return (
    <>
      <div>
        <StatusCardGroup />
        <div className='row my-5'>
          <div className='col-12'>
            <h1 className='fs-2hx fw-bold text-dark my-6'>Transactions</h1>
            <PaymentTable />
          </div>
        </div>
      </div>
    </>
  )
}

export default Wallet
