/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { ReactElement, useState } from 'react'
import ConfirmationModal from '../../../../components/modal/ConfirmationModal'
import clsx from 'clsx'
import Pagination from '../../../../components/pagination/Pagination'

type ArticleData = {
    id: number
    title: string
    views: string
    ctr: string
    category: string
    seoScore: number
    keyword: Array<string>
    seoTips: string
    content: string
}

type PaginationConfig = {
    totalPage: number
    handlePageChange: (page: number) => void
}

type Props = {
    onEditRow: (row: any) => void
    onDeleteRow: (row: any) => void
    paginationConfig: PaginationConfig
    data?: any
}

const ArticleTable = ({ onEditRow, onDeleteRow, data, paginationConfig }: Props) => {

    const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false);
    const [deleteRow, setDeleteRow] = useState<any>();
    const confirmationInfo = {
        action: 'confirmation',
        message: 'Do you want to delete this post?'
    }

    const confirmationCallback = (success: boolean) => {
        if (success) {
            onDeleteRow(deleteRow);
            setConfirmationOpen(false);
        } else {
            setConfirmationOpen(!confirmationOpen);
        }
    }

    const actionClick = (row: any, confirmation: boolean) => {
        if (confirmation) {
            toggleModal(row);
        }
    }

    const toggleModal = (row?: any) => {
        setConfirmationOpen(!confirmationOpen);
        setDeleteRow(row);
    }

    const renderTablerow = () => {
        let arr: Array<ReactElement> = [];
        data?.forEach((row: any, index: number) => {
            arr.push(<tr key={index + 1}>
                <td>
                    <span className='fw-semibold d-block fs-7'>
                        {/* {index + 1} */}
                        {row.rowNo}
                    </span>
                </td>
                <td>
                    <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                        {row.title.rendered}
                    </a>
                </td>
                <td>
                    <span className='fw-semibold d-block fs-7 mw-100'>
                        <ul className='list-unstyled mb-0'>
                            {row.categoryName && row.categoryName.map((item: string, index: number) => (<li key={item + index}>{item}</li>))}
                        </ul>
                    </span>
                </td>
                <td>
                    <span className={clsx('badge', {
                        'badge-light-success': row.status === 'publish',
                        'badge-light-primary': row.status === 'draft',
                        'badge-light-warning': row.status === 'pending',
                    })}>
                        {row.status}
                    </span>
                </td>
                <td>
                    <span className='fw-semibold d-block fs-7'>
                        {/* {row.views} */}
                        not find in res
                    </span>
                </td>
                <td>
                    <span className='fw-semibold d-block fs-7'>
                        {/* {row.ctr} */}
                        not find in res
                    </span>
                </td>
                <td className='text-end d-flex'>
                    {/* <a
                        href='#'
                        className='btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4 me-2'
                    >
                        View
                    </a> */}
                    <button
                        className={clsx('btn btn-secondary btn-sm px-4 me-2', {
                            'disabled': row.status !== 'draft'
                        })}
                        onClick={() => { onEditRow(row) }}
                    >
                        Edit
                    </button>

                    <button
                        className='btn btn-light  btn-sm px-4'
                        onClick={() => { actionClick(row, true) }}
                    >
                        Delete
                    </button>
                </td>
            </tr >)
        })

        return arr
    }

    const handlePageClick = (a: any) => {
        paginationConfig.handlePageChange(a.selected + 1);
    }

    return (
        <>
            {confirmationOpen && <ConfirmationModal
                open={confirmationOpen}
                confirmationInfo={confirmationInfo}
                onClose={() => { setConfirmationOpen(false) }}
                handleConfirmationMessage={confirmationCallback}
            />}
            <div className={`card`}>
                <div className='card-body py-3'>
                    <div className='table-responsive'>
                        {/* begin::Table */}
                        <table className='table align-middle gs-0 gy-4'>
                            {/* begin::Table head */}
                            <thead>
                                <tr className='fw-bold text-muted'>
                                    <th className='rounded-start'>No.</th>
                                    <th className='min-w-100'>Title</th>
                                    <th>Category</th>
                                    <th>Status</th>
                                    <th>Views</th>
                                    <th>CTR</th>
                                    <th className='text-center'>Actions</th>
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
        </>
    )
}

export default ArticleTable 
