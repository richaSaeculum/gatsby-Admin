/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { ReactElement, useState } from 'react'
import ConfirmationModal from '../../../../components/modal/ConfirmationModal'
import Tabledata from './sample_article.json'
import clsx from 'clsx'

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

type Props = {
    onEditRow: (row: any) => void
    onDeleteRow: (row: any) => void
    data?: any
}

const ArticleTable = ({ onEditRow, onDeleteRow, data }: Props) => {

    const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false)
    const [deleteRow, setDeleteRow] = useState<any>()

    const confirmationCallback = (success: boolean) => {
        if (success) {
            onDeleteRow(deleteRow)
            setConfirmationOpen(false)
        } else {
            setConfirmationOpen(!confirmationOpen)
        }
    }

    const toggleModal = (row?: any) => {
        setConfirmationOpen(!confirmationOpen)
        setDeleteRow(row)
    }

    const renderTablerow = () => {
        let arr: Array<ReactElement> = [];
        data?.forEach((row: any, index: number) => {
            arr.push(<tr key={index + 1}>
                <td>
                    <span className='fw-semibold d-block fs-7'>
                        {index + 1}
                    </span>
                </td>
                <td>
                    <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                        {row.title.rendered}
                    </a>
                </td>
                <td>
                    <span className='fw-semibold d-block fs-7 mw-100'>
                        <ul className='list-unstyled'>
                            {row.categoryName && row.categoryName.map((item: string) => (<li>{item}</li>))}
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
                <td className='text-end'>
                    {/* <a
                        href='#'
                        className='btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4 me-2'
                    >
                        View
                    </a> */}
                    <button
                        className='btn btn-secondary btn-sm px-4 me-2'
                        onClick={() => { onEditRow(row) }}
                    >
                        Edit
                    </button>

                    <button
                        className='btn btn-light  btn-sm px-4'
                        onClick={() => { toggleModal(row) }}
                    >
                        Delete
                    </button>
                </td>
            </tr >)
        })

        return arr
    }

    return (
        <>
            <ConfirmationModal
                open={confirmationOpen}
                confirmationInfo={'Do you want to delete article?'}
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
                </div>
                {/* begin::Body */}
            </div>
        </>
    )
}

export default ArticleTable 
