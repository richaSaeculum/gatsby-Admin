/* eslint-disable jsx-a11y/anchor-is-valid */
import { Dispatch, ReactElement, SetStateAction, useState } from 'react';
import { KTSVG } from '../../../../../../_metronic/helpers';

import ConfirmationModal from '../../../../../components/modal/ConfirmationModal';
import Pagination from '../../../../../components/pagination/Pagination';

type PaginationConfig = {
    currentPage: number
    totalPage: number
    handlePageChange: (page: number) => void
    totalCategories: number
    limitNo: number
    setLimitNo: Dispatch<SetStateAction<number>>
}

type Props = {
    onEditRow: (row: any) => void
    onDeleteRow: (row: any) => void
    data: Array<any> | undefined
    paginationConfig: PaginationConfig
}

const CategoryTable = ({ onEditRow, onDeleteRow, data, paginationConfig }: Props) => {

    const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false)
    const [deleteRow, setDeleteRow] = useState<any>()
    const confirmationInfo = {
        action: 'confirmation',
        message: 'Do you want to delete category?'
    }

    const confirmationCallback = (success: boolean) => {
        if (success) {
            onDeleteRow(deleteRow)
            setConfirmationOpen(false)
        } else {
            setConfirmationOpen(!confirmationOpen)
        }
    }

    const actionClick = (row: any, confirmation: boolean) => {
        if (confirmation) {
            toggleModal(row)
        }
    }

    const toggleModal = (row?: any) => {
        setConfirmationOpen(!confirmationOpen)
        setDeleteRow(row)
    }

    const renderTablerow = () => {
        let arr: Array<ReactElement> = [];
        data?.forEach((row, index) => {
            arr.push(<tr key={index + 1}>
                <td>
                    <span className='fw-semibold d-block fs-7'>
                        {/* {index + 1} */}
                        {row.rowNo}
                    </span>
                </td>
                <td>
                    <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                        {row.name}
                    </a>
                </td>
                {/* <td className='text-end'>
                    <a
                        href='#'
                        className='btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4 me-2'
                    >
                        View
                    </a>
                    <button
                        className='btn btn-secondary btn-sm px-4 me-2'
                        onClick={() => { onEditRow(row) }}
                    >
                        Edit
                    </button>

                    <button
                        className='btn btn-light btn-sm px-4'
                        onClick={() => { actionClick(row, true) }}
                    >
                        Delete
                    </button>
                </td> */}
                <td className='text-end'>
                    <button
                        className='btn btn-active-icon-gray-100 btn-icon btn-light-twitter btn-sm me-1'
                        onClick={() => { onEditRow(row) }}
                    >
                        <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                    </button>

                    < button
                        className='btn btn-icon btn-light-danger btn-active-color-danger btn-active-icon-gray-100 btn-sm'
                        onClick={() => { actionClick(row, true) }}
                    >
                        <KTSVG
                            path='/media/icons/duotune/general/gen027.svg'
                            className='svg-icon-3'
                        />
                    </button>

                </td>
            </tr>)
        })

        return arr
    }

    const handlePageClick = (a: any) => {
        paginationConfig?.handlePageChange(a.selected + 1);
    }

    return (
        <>
            <ConfirmationModal
                open={confirmationOpen}
                confirmationInfo={confirmationInfo}
                onClose={() => { setConfirmationOpen(false) }}
                handleConfirmationMessage={confirmationCallback}
            />
            <div className={`card`}>
                <div className='card-body py-3'>
                    <div className='table-responsive'>
                        {/* begin::Table */}
                        <table className='table align-middle gs-0 gy-4'>
                            {/* begin::Table head */}
                            <thead>
                                <tr className='fw-bold text-muted'>
                                    <th className='rounded-start'>No.</th>
                                    <th className='min-w-10'>Title</th>
                                    <th className='text-end'>Actions</th>
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
                            <span className="text-muted ms-2">Displaying {(paginationConfig.limitNo > paginationConfig.totalCategories) ? paginationConfig.totalCategories : paginationConfig.limitNo} of {paginationConfig.totalCategories} records</span>
                        </div>
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
        </>
    )
}

export default CategoryTable 
