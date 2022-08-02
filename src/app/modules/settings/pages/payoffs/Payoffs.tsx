import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useAuth } from '../../../auth'
import { getPostListByMonthApi } from '../../../../api'
import { useLayout } from '../../../../../_metronic/layout/core'
import PayoffsTable from './payoffstable/PayoffsTable'
import { useNavigate } from 'react-router-dom'
import DatePicker from '../../../../components/modal/DatePicker'

const data = [
    {
        id: 1,
        month: 'July 2022',
        totalRevenue: '11000',
        amountPerArticle: '1100'
    },
    {
        id: 8,
        month: 'June 2022',
        totalRevenue: '5000',
        amountPerArticle: '500'
    },
    {
        id: 7,
        month: 'May 2022',
        totalRevenue: '17000',
        amountPerArticle: '1700'
    },
    {
        id: 5,
        month: 'April 2022',
        totalRevenue: '10000',
        amountPerArticle: '100'
    },
    {
        id: 4,
        month: 'March 2022',
        totalRevenue: '14000',
        amountPerArticle: '1400'
    },
    {
        id: 3,
        month: 'February 2022',
        totalRevenue: '12000',
        amountPerArticle: '1200'
    },
    {
        id: 2,
        month: 'January 2022',
        totalRevenue: '16000',
        amountPerArticle: '1600'
    }
]


const Payoffs = () => {

    const { wpAuth } = useAuth();
    const { setLoader } = useLayout()
    const [open, setOpen] = useState<boolean>(false)
    const wpAuthToken = wpAuth?.token;
    const navigate = useNavigate();
    const [month, setMonth] = useState<any>(new Date());
    const [revenue, setRevenue] = useState<any>();
    const [amount, setAmount] = useState<any>();
    const [articleCount, setArticleCount] = useState<any>();

    useEffect(() => {
        calculateAmountPerArticle()
    }, [month, revenue, articleCount])

    const getTotalArticleOfMonth = async (after: any, before: any) => {
        const response = await getPostListByMonthApi({ wpAuthToken, after, before });
        if (response && response.status === 200) {
            setArticleCount(response.data.length)
        }
    }

    const calculateAmountPerArticle = () => {
        if (revenue !== null && articleCount > 0) {
            const amount: any = (revenue - (revenue * 10) / 100) / articleCount
            setAmount(amount);
        } else {
            setAmount(0)
        }
    }

    const onMonthChange = (month: any) => {
        const now = new Date(month);
        const after = new Date(now.getFullYear(), now.getMonth(), 2).toISOString();
        const before = new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString();
        getTotalArticleOfMonth(after, before)
        setMonth(month);
    }

    const onEdit = async (row: any) => {
        setLoader(false)
        setOpen(true);
    }

    const onDelete = async (row: any) => {
        setLoader(true)
    }

    const onShowPaymentList = (row: any) => {
        if (row.id) {
            navigate(`/settings/payoffs/${row.id}`)
        }
    }

    const onCloseModal = () => {
        setOpen(false);
    }

    const onSubmit = () => {
        let payload = {
            'month': month,
            'revenue': revenue,
            'amount': amount
        }
        console.log("payoff payload===>", payload)
    }

    return (
        <div>
            <div className='d-flex justify-content-between align-items-center mb-5'>
                <div>
                    <h1 className='fs-2hx fw-bold text-dark mb-0'>Payoffs</h1>
                </div>
                <button type='button' className='btn btn-secondary' onClick={() => {
                    setOpen(true);
                }}>
                    Add Payoff
                </button>
            </div>

            <Modal
                show={open}
                onHide={onCloseModal}
                centered
            >
                <div className="modal-content bg-gray-200">
                    <div className="modal-header">
                        <h2 className="fw-bolder">Add Payoff</h2>
                        <button type='button' className="btn btn-icon btn-sm btn-active-icon-primary" onClick={onCloseModal}>
                            <span className="svg-icon svg-icon-1">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mh-50px">
                                    <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="currentColor"></rect>
                                    <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="currentColor"></rect>
                                </svg>
                            </span>
                        </button>
                    </div>
                    <div className="modal-body py-0">
                        <form className="form">
                            <div className="fv-row mb-5">
                                <label className="reqired fs-5 fw-semibold mb-2">Month</label>
                                <div className='row'>
                                    <div className="col-12">
                                        <DatePicker
                                            value={month}
                                            onChange={(month: any) => { onMonthChange(month) }}
                                        />
                                        {/* <select
                                            className="form-select form-control"
                                            {...formik.getFieldProps('month')}
                                        >
                                            <option value="january">January</option>
                                            <option value="february">February</option>
                                            <option value="march">March</option>
                                            <option value="april">April</option>
                                            <option value="may">May</option>
                                            <option value="june">June</option>
                                            <option value="july">July</option>
                                            <option value="august">August</option>
                                            <option value="september">September</option>
                                            <option value="october">October</option>
                                            <option value="november">November</option>
                                            <option value="december">December</option>
                                        </select>
                                        <div className="fv-plugins-message-container invalid-feedback">
                                        </div> */}
                                    </div>
                                    {/* <div className="col-6">
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Year"
                                            {...formik.getFieldProps('year')}
                                        />
                                        <div className="fv-plugins-message-container invalid-feedback">
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                            <div className="fv-row mb-5">
                                <label className="requred fs-5 fw-semibold mb-2">Total Revenue</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Total Revenue"
                                    name='revenue'
                                    value={revenue}
                                    onChange={e => { setRevenue(e.target.value) }}
                                />
                                <div className="fv-plugins-message-container invalid-feedback">
                                </div>
                            </div>
                            <div className="fv-row">
                                <label className="fs-5 fw-semibold mb-2">Amount (Per Article)</label>
                                <label className="fs-6 mb-2">(Total revenue - margin) / Total No. of Articles</label>
                                <input
                                    type="number"
                                    disabled
                                    className="form-control"
                                    placeholder="Amount"
                                    value={amount}
                                    name='amount'
                                />
                                <div className="fv-plugins-message-container invalid-feedback">
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type='button' className="btn btn-secondary btn-sm" onClick={onSubmit}>
                            Submit
                        </button>
                    </div>
                </div>
            </Modal>

            <PayoffsTable
                onEditRow={onEdit}
                onDeleteRow={onDelete}
                onShowPaymentList={onShowPaymentList}
                data={data}
            />
        </div>
    )
}

export default Payoffs

