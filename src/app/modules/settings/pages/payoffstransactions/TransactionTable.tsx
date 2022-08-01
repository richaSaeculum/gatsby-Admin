/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { ReactElement, useState } from 'react'

type category = {
    id: number | null
    name: string | ''
}


type Props = {
    data: Array<any> | undefined
}

const TransactionTable = ({ data }: Props) => {

    const renderTablerow = () => {
        let arr: Array<ReactElement> = [];
        data?.forEach((row, index) => {
            arr.push(<tr key={index + 1}>
                <td>
                    <span className='fw-semibold d-block fs-7'>
                        {index + 1}
                    </span>
                </td>
                <td>
                    <span className='fw-semibold d-block fs-7'>
                        {row.username}
                    </span>
                </td>
                <td>
                    <span className='fw-semibold d-block fs-7'>
                        {row.payout}
                    </span>
                </td>
                <td>
                    <span className='fw-semibold d-block fs-7'>
                        {row.payoutMonth}
                    </span>
                </td>
                <td>
                    <span className='fw-semibold d-block fs-7'>
                        {row.date}
                    </span>
                </td>
                <td>
                    <span className='fw-semibold d-block fs-7'>
                        {row.articles}
                    </span>
                </td>
            </tr>)
        })

        return arr
    }

    return (
        <>
            <div className={`card`}>
                <div className='card-body py-3'>
                    <div className='table-responsive'>
                        {/* begin::Table */}
                        <table className='table align-middle gs-0 gy-4'>
                            {/* begin::Table head */}
                            <thead>
                                <tr className='fw-bold text-muted'>
                                    <th className='rounded-start'>No.</th>
                                    <th>Username</th>
                                    <th>Payout</th>
                                    <th>Payout Month</th>
                                    <th>Date</th>
                                    <th>Articles</th>
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
        </>
    )
}

export default TransactionTable 
