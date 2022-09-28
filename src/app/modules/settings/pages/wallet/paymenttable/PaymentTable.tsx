import { ReactElement } from 'react';

import moment from 'moment';

import Pagination from '../../../../../components/pagination/Pagination';

type PaginationConfig = {
  totalPage: number
  handlePageChange: (page: number) => void
}

type Props = {
  data?: any
  paginationConfig: PaginationConfig
}

const PaymentTable = ({ data, paginationConfig }: Props) => {

  const renderTablerow = () => {
    let arr: Array<ReactElement> = [];
    data?.forEach((row: any, index: any) => {
      arr.push(<tr key={index + 1}>
        {/* <td>
          <span className='fw-semibold d-block fs-6'>
            {index + 1}
          </span>
        </td> */}
        <td>
          <span className='text-dark fw-bold d-block fs-5'>
            {row.txn_id}
          </span>
        </td>
        <td>
          <span className='text-dark fw-bold d-block fs-5'>
            {row.txn_code}
          </span>
        </td>
        <td>
          <span className='fw-semibold d-block fs-6'>
            {moment(row.txn_created_on).format("Do MMM, YYYY - hh:mm A")}
          </span>
        </td>
        <td>
          <span className='fw-semibold d-block fs-6'>
            {row.txn_amount}
          </span>
        </td>
        <td>
          {/* href  {row.txn_invoice} */}
          <a
            href={'#'}
            className='text-secondary fw-semibold'
            onClick={() => { }}
          >
            <span className='border-bottom  border-secondary'>View</span>
          </a>
        </td>
      </tr>)
    })

    return arr
  }

  const handlePageClick = (a: any) => {
    paginationConfig.handlePageChange(a.selected + 1);
  }

  return (
    <div className={`card`}>
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table align-middle gs-0 gy-4'>
            {/* begin::Table head */}
            <thead>
              <tr className='fw-bold text-muted'>
                {/* <th className='rounded-start'>No.</th> */}
                <th className='rounded-start'>Transaction ID</th>
                <th className='min-w-100'>Transaction</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Invoice</th>
                {/* <th className='min-w-150px'>Rating</th> */}
                {/* <th className='min-w-200px text-end'>Actions</th> */}
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {renderTablerow()}
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
        <div className="card-footer d-flex justify-content-end align-items-center flex-wrap">
          <Pagination
            handlePageClick={handlePageClick}
            totalPage={paginationConfig.totalPage}
          />
          {/* <div className="d-flex align-items-center py-3">
            <select className="form-control form-select form-control-sm font-weight-bold mr-4 border-0 bg-light" style={{ width: '75px' }}>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <span className="text-muted ms-2">Displaying 10 of 230 records</span>
          </div> */}
        </div>
      </div>
      {/* begin::Body */}
    </div>
  )
}

export default PaymentTable 
