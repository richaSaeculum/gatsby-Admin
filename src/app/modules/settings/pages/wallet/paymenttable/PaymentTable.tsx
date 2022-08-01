import React, { ReactElement } from 'react'
import Tabledata from './sample_payment.json'


const PaymentTable = () => {

    const renderTablerow = () => {
        let arr: Array<ReactElement> = [];
        Tabledata.data.forEach((item, index) => {
            arr.push(<tr key={index + 1}>
                <td>
                    <span className='fw-semibold d-block fs-6'>
                        {index + 1}
                    </span>
                </td>
                <td>
                    <span className='text-dark fw-bold d-block fs-5'>
                        {item.tansactionName}
                    </span>
                </td>
                <td>
                    <span className='fw-semibold d-block fs-6'>
                        {item.date}
                    </span>
                </td>
                <td>
                    <span className='fw-semibold d-block fs-6'>
                        {item.amount}
                    </span>
                </td>
                <td>
                    {/* href  {item.invoice} */}
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
                                <th className='rounded-start'>No.</th>
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
            </div>
            {/* begin::Body */}
        </div>
    )
}

export default PaymentTable 
