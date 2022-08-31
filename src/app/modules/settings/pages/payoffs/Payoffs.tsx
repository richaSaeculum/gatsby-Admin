import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useAuth } from '../../../auth'
import { addPayoffApi, getPayoffAllApi, getPayoffsByMonthApi, getPayoutMarginApi, getPostListByMonthApi } from '../../../../api'
import { useLayout } from '../../../../../_metronic/layout/core'
import PayoffsTable from './payoffstable/PayoffsTable'
import { useNavigate } from 'react-router-dom'
import DatePicker from '../../../../components/datepicker/DatePicker'
import moment from 'moment'
import ConfirmationModal from '../../../../components/modal/ConfirmationModal'


const Payoffs = () => {

  const { auth } = useAuth();
  const { setLoader } = useLayout()
  const [open, setOpen] = useState<boolean>(false)
  const navigate = useNavigate();
  const [month, setMonth] = useState<any>(new Date());
  const [revenue, setRevenue] = useState<any>(0);
  const [amount, setAmount] = useState<any>();
  const [articleCount, setArticleCount] = useState<any>();
  const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false);
  const [confirmationInfo, setConfirmationInfo] = useState<any>();
  const [margin, setMargin] = useState<number>(0)

  const [payoffsList, setPayoffsList] = useState<any>();

  const getPayofflist = async () => {
    const res = await getPayoffAllApi({ token: auth?.token })
    if (res && res.status === 200) {
      setPayoffsList(res.data);
    }
  }
  useEffect(() => {
    getPayofflist();
  }, [])

  useEffect(() => {
    calculateAmountPerArticle();
  }, [month, revenue, articleCount])

  const getTotalArticleOfMonth = async (after: any, before: any) => {
    const response = await getPostListByMonthApi({ token: auth?.token, after, before, status: 'publish' });
    if (response && response.status === 200) {
      setArticleCount(response.data.articlesCount);
    }
  }

  const calculateAmountPerArticle = () => {
    if (revenue !== null && articleCount > 0 && margin != 0) {
      const amount: any = (revenue - (revenue * margin) / 100) / articleCount;
      setAmount(amount);
    } else {
      setAmount(0);
    }
  }

  const confirmationCallback = (success: boolean, info: any) => {
    if (success && info.action === 'confirmation') {
      setConfirmationOpen(false);
      onCloseModal();
      submitForm();
    } else if (info.action === 'alert') {
      setConfirmationOpen(false);
    } else if (info.action === 'error') {
      setConfirmationOpen(false);
    } else {
      setConfirmationOpen(false);
    }
  }

  const toggleModal = (info?: any) => {
    setConfirmationInfo(info);
    setConfirmationOpen(!confirmationOpen);
  }

  const onMonthChange = (month: any) => {
    const now = new Date(month);
    // const after = new Date(now.getFullYear(), now.getMonth(), 2).toISOString();
    // const before = new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString();
    const previousMonthLastDate = moment(now).subtract(1, 'months').endOf('month').format('YYYY-MM-DD');
    const nextMonthFirstDate = moment(now).add(1, 'months').startOf('month').format('YYYY-MM-DD');

    getTotalArticleOfMonth(previousMonthLastDate, nextMonthFirstDate);
    setMonth(month);
  }

  const onEditRow = async (row: any) => {
    setLoader(false)
    setOpen(true);
  }

  const onDeleteRow = async (row: any) => {
    setLoader(false);
  }

  const onShowPaymentList = (row: any) => {
    if (row.month && row.yaer) {
      navigate(`/settings/payoffs/${row.month}-${row.yaer}`);
    }
  }

  const onCloseModal = () => {
    setOpen(false);
  }

  const submitForm = async () => {
    let response: any;
    let payload = {
      "month": moment(month).format("M"),
      "year": moment(month).format("YYYY"),
      "total_revenue": revenue,
      "amount_per_article": amount
    }

    if (false) {
      // response = await updateCategoryApi({ token: auth?.token, payload, id: category.id });
      // if (response && response.status === 200) {
      //   const info = { action: 'alert', message: 'Category successfully updated' }
      //   toggleModal(info);
      //   return
      // } else if (response && response.status === 500) {
      //   const info = { action: 'error', message: 'Category with same name is already exists' }
      //   toggleModal(info);
      //   return
      // } else {
      //   const info = { action: 'error', message: response.message };
      //   toggleModal(info);
      // }
    } else {
      response = await addPayoffApi({ token: auth?.token, payload });
      if (response && response.status === 200) {
        const info = { action: 'alert', message: 'Payoff successfully added ' }
        toggleModal(info);
        return
      } else {
        const info = { action: 'error', message: response.message };
        toggleModal(info);
      }
    }
  }

  const handleSubmit = async () => {
    let valid = true;
    if (typeof revenue == 'undefined' || revenue < 1) {
      let info = { action: 'alert', message: 'Please enter correct revenue.' }
      toggleModal(info);
      valid = false;
    }

    if (valid) {
      let info = { action: 'confirmation', message: 'Are You Sure To Save?' }
      toggleModal(info);
    }
  }

  const onPayoffModalOpen = async () => {
    setOpen(true);
    onMonthChange(month);
    const res = await getPayoutMarginApi({ token: auth?.token });
    if (res && res.status === 200) {
      setMargin(res.data.payout_margin)
    }
  }

  return (
    <>
      {confirmationOpen && <ConfirmationModal
        open={confirmationOpen}
        confirmationInfo={confirmationInfo}
        onClose={() => { setConfirmationOpen(false) }}
        handleConfirmationMessage={confirmationCallback}
      />}
      <div className='d-flex justify-content-between align-items-center mb-5'>
        <div>
          <h1 className='fs-2hx fw-bold text-dark mb-0'>Payoffs</h1>
        </div>
        <button type='button' className='btn btn-secondary' onClick={onPayoffModalOpen}>
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
                    {
                      articleCount < 1 && (<div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>There are 0 article in selected month</div>
                      </div>)
                    }
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
            <button type='button' className="btn btn-secondary btn-sm" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </Modal>

      <PayoffsTable
        onEditRow={onEditRow}
        onDeleteRow={onDeleteRow}
        onShowPaymentList={onShowPaymentList}
        data={payoffsList}
      />
    </>
  )
}

export default Payoffs

