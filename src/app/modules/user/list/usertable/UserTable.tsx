/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { ReactElement, useState } from 'react'
import ConfirmationModal from '../../../../components/modal/ConfirmationModal'

type Props = {
    onEditRow: (row: any) => void
    onDeleteRow: (row: any) => void
    data?: any
}

const UserTable = ({ onEditRow, onDeleteRow, data }: Props) => {

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
                        {row.id}
                    </span>
                </td>
                <td>
                    <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                        {row.name}
                    </a>
                </td>
                {/* <td>
                    <span className='fw-semibold d-block fs-7 mw-100'>

                    </span>
                </td> */}
                <td className='text-end'>
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
            </tr>)
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
                                    <th>Id</th>
                                    <th>Name</th>
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
                </div>
                {/* begin::Body */}
            </div>
        </>
    )
}

export default UserTable 
