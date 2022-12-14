/* eslint-disable jsx-a11y/anchor-is-valid */
import { Dispatch, ReactElement, SetStateAction } from 'react';

import Pagination from '../../../../components/pagination/Pagination';

type PaginationConfig = {
    currentPage: number
    totalPage: number
    handlePageChange: (page: number) => void
    totalPayoffs: number
    limitNo: number
    setLimitNo: Dispatch<SetStateAction<number>>
}

type Props = {
    data: any,
    paginationConfig: PaginationConfig
}

const TransactionTable = ({ data, paginationConfig }: Props) => {

    const renderTablerow = () => {
        let arr: Array<ReactElement> = [];
        data?.forEach((row: any, index: any) => {
            arr.push(<tr key={index + 1}>
                <td>
                    <span className='fw-semibold d-block fs-7'>
                        {row.rowNo}
                    </span>
                </td>
                <td>
                    <span className='fw-semibold d-block fs-7'>
                        {row.txn_user_name}
                    </span>
                </td>
                <td>
                    <span className='fw-semibold d-block fs-7'>
                        {row.payout}
                    </span>
                </td>
                <td>
                    <span className='fw-semibold d-block fs-7'>
                        {`${row.txn_month_name} ${row.txn_year}`}
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

    const handlePageClick = (a: any) => {
        paginationConfig.handlePageChange(a.selected + 1);
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
                                    {/* <th>Date</th> */}
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
                    <div className="card-footer d-flex justify-content-between align-items-center flex-wrap">
                        <select
                            value={paginationConfig.limitNo}
                            onChange={(e: any) => { paginationConfig?.setLimitNo(e.target.value); }}
                            className="form-control form-select form-control-sm font-weight-bold mr-4 border-0 bg-light"
                            style={{ width: '75px' }}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                        </select>
                        <div className="d-flex align-items-center py-3">
                            <Pagination
                                currentPage={paginationConfig.currentPage}
                                handlePageClick={handlePageClick}
                                totalPage={paginationConfig.totalPage}
                            />
                            <span className="text-muted ms-2">Displaying {(paginationConfig.limitNo > paginationConfig.totalPayoffs) ? paginationConfig.totalPayoffs : paginationConfig.limitNo} of {paginationConfig.totalPayoffs} records</span>
                        </div>
                    </div>
                </div>
                {/* begin::Body */}
            </div>
        </>
    )
}

export default TransactionTable 
