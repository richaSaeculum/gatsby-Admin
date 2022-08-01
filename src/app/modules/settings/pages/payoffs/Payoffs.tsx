import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useAuth } from '../../../auth'
import { } from '../../../../api'
import { useLayout } from '../../../../../_metronic/layout/core'
import PayoffsTable from './payoffstable/PayoffsTable'

const data = [
    {
        month: 'July 2022',
        totalRevenue: '11000',
        amountPerArticle: '1100'
    },
    {
        month: 'June 2022',
        totalRevenue: '5000',
        amountPerArticle: '500'
    },
    {
        month: 'May 2022',
        totalRevenue: '17000',
        amountPerArticle: '1700'
    },
    {
        month: 'April 2022',
        totalRevenue: '10000',
        amountPerArticle: '100'
    },
    {
        month: 'March 2022',
        totalRevenue: '14000',
        amountPerArticle: '1400'
    },
    {
        month: 'February 2022',
        totalRevenue: '12000',
        amountPerArticle: '1200'
    },
    {
        month: 'January 2022',
        totalRevenue: '16000',
        amountPerArticle: '1600'
    }
]


const Payoffs = () => {

    const { setLoader } = useLayout()
    const [open, setOpen] = useState<boolean>(false)

    const onEdit = async (row: any) => {
        setLoader(false)
        setOpen(true);
    }

    const onSubmit = async () => {
        setOpen(false);
    }

    const onDelete = async (row: any) => {
        setLoader(true)
    }

    const onCloseModal = () => {
        setOpen(false);
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
                        <form className="form" onSubmit={e => e.preventDefault()}>
                            <div className="fv-row mb-5">
                                <label className="required fs-5 fw-semibold mb-2">Month</label>
                                <div className='row'>
                                    <div className="col-6">
                                        <select className="form-select form-control">
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
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <input type="text" className="form-control" placeholder="Month" name="month" />
                                        <div className="fv-plugins-message-container invalid-feedback">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="fv-row mb-5">
                                <label className="required fs-5 fw-semibold mb-2">Total Revenue</label>
                                <input type="text" className="form-control" placeholder="Total Revenue" name="name" />
                                <div className="fv-plugins-message-container invalid-feedback">
                                </div>
                            </div>
                            <div className="fv-row">
                                <label className="required fs-5 fw-semibold mb-2">Amount (Per Article)</label>
                                <input type="text" className="form-control" placeholder="Amount" name="name" />
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
                data={data}
            />
        </div>
    )
}

export default Payoffs

