import React, { ReactElement, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useLayout } from '../../../../../_metronic/layout/core';
import { getPayoffsByMonthApi } from '../../../../api';
import ConfirmationModal from '../../../../components/modal/ConfirmationModal';
import { useAuth } from '../../../auth';

const listData = [
    {
        id: 1,
        username: 'demouser1',
        userId: 12,
        articles: 12,
        month: 'January 2022',
        amount: 1200,
        isSelected: false
    },
    {
        id: 2,
        username: 'demouser2',
        userId: 11,
        articles: 11,
        month: 'January 2022',
        amount: 1100,
        isSelected: false
    },
    {
        id: 3,
        username: 'demouser3',
        userId: 13,
        articles: 5,
        month: 'January 2022',
        amount: 500,
        isSelected: false
    },
    {
        id: 4,
        username: 'demouser4',
        userId: 17,
        articles: 10,
        month: 'January 2022',
        amount: 1000,
        isSelected: false
    },
    {
        id: 5,
        username: 'demouser5',
        userId: 90,
        articles: 15,
        month: 'January 2022',
        amount: 1500,
        isSelected: false
    }
]

type Props = {
    data: any
}


const PaymentList = () => {

    const { auth } = useAuth();
    const { setLoader } = useLayout();
    const param = useParams();
    const [monthYear, setMonthYear] = useState();
    const [data, setData] = useState<any>();
    const [selectAll, setSelectAll] = useState<boolean>(false);
    const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false)
    const [paymentData, setPaymentData] = useState<any>()
    const confirmationInfo = {
        action: 'confirmation',
        message: 'Do you want to continue for payment?'
    }

    useEffect(() => {
        const { id } = param;
        if (id) {
            getMonthWisePaypoffList(id);
        }
    }, [])

    const getMonthWisePaypoffList = async (id: any) => {
        setLoader(true)
        let a = id.split('-');
        let payload = {
            "month": a[0],
            "year": a[1]
        }
        const res = await getPayoffsByMonthApi({ token: auth?.token, payload });
        if (res && res.status === 200) {
            const a = res?.data.map((a: any) => ({ ...a, isSelected: false }))
            setData(a);
            setMonthYear(res.data[0].month);
            setLoader(false)
        }
    }

    const confirmationCallback = (success: boolean) => {
        if (success) {
            // complete payment api call using paymentData(variable)
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
        setConfirmationOpen(!confirmationOpen);
        setPaymentData(row);
    }

    const onUserSelect = (row: any) => {
        let arr = data.map((item: any) => {
            if (item.userid === row.userid) {
                return { ...item, isSelected: !item.isSelected }
            } else {
                return item
            }
        })
        let a = arr.every((item: any) => item.isSelected)
        setSelectAll(a);
        setData(arr);
    }

    const onSelectAll = (e: any) => {
        setSelectAll(e.target.checked)
        let arr = data.map((item: any) => {
            return { ...item, isSelected: e.target.checked }
        })
        setData(arr)
    }

    const renderTablerow = () => {
        let arr: Array<ReactElement> = [];
        data?.forEach((row: any, index: number) => {
            arr.push(<tr key={index + 1}>
                <td>
                    <label className='form-check form-check-custom form-check-solid align-items-start'>
                        <input
                            className='form-check-input me-3'
                            type='checkbox'
                            checked={row.isSelected}
                            onChange={() => { onUserSelect(row) }}
                        />
                    </label>
                </td>
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
                        {row.userid}
                    </span>
                </td>
                <td>
                    <span className='fw-semibold d-block fs-7'>
                        {row.totalArticles}
                    </span>
                </td>
                <td>
                    <span className='fw-semibold d-block fs-7'>
                        {row.amount}
                    </span>
                </td>
                <td>
                    <span className='fw-semibold d-block fs-7'>
                        {row.month}
                    </span>
                </td>
                <td className='text-center'>
                    <button
                        className='btn btn-secondary btn-sm px-4 me-2'
                        onClick={() => { actionClick(row, true) }}
                    >
                        Complete
                    </button>
                </td>
            </tr>)
        })

        return arr
    }

    return (
        <div>
            <ConfirmationModal
                open={confirmationOpen}
                confirmationInfo={confirmationInfo}
                onClose={() => { setConfirmationOpen(false) }}
                handleConfirmationMessage={confirmationCallback}
            />
            <div className='d-flex justify-content-between align-items-center mb-5'>
                <div>
                    <h1 className='fs-2hx fw-bold text-dark mb-0'>{monthYear}</h1>
                </div>
                <button type='button' className='btn btn-secondary' onClick={() => { toggleModal('selected') }}>
                    Complete Selected
                </button>
            </div>
            <div className='card'>
                <div className='card-body py-3'>
                    <div className='table-responsive'>
                        {/* begin::Table */}
                        <table className='table align-middle gs-0 gy-4'>
                            {/* begin::Table head */}
                            <thead>
                                <tr className='fw-bold text-muted'>
                                    <th>
                                        <label className='form-check form-check-custom form-check-solid align-items-start'>
                                            <input
                                                className='form-check-input me-3'
                                                type='checkbox'
                                                name='selectAll'
                                                checked={selectAll}
                                                onChange={onSelectAll}
                                            />
                                        </label>
                                    </th>
                                    <th className='rounded-start'>No.</th>
                                    <th>Username</th>
                                    <th>User ID</th>
                                    <th>Total Articles</th>
                                    <th>Amount</th>
                                    <th>Month</th>
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
        </div>
    )
}

export default PaymentList




