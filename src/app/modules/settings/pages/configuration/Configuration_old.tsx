import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { useLayout } from '../../../../../_metronic/layout/core';

import { addPayoutMarginApi, getPayoutMarginApi } from '../../../../api';

import ConfirmationModal from '../../../../components/modal/ConfirmationModal';

const Configuration = () => {

  const { setLoader } = useLayout();
  const [margin, setMargin] = useState<string | undefined>(undefined);
  const [currentMargin, setCurrentMargin] = useState<string | ''>('');
  const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false)
  const [confirmationInfo, setConfirmationInfo] = useState<any>()
  const ref = useRef(false)

  useEffect(() => {
    if (!ref.current) {
      ref.current = true
      return
    }
    if (!confirmationOpen) {
      setConfirmationOpen(!confirmationOpen)
    }
  }, [confirmationInfo])

  const getPayoutMargin = async () => {
    setLoader(true);
    try {
      const response = await getPayoutMarginApi();
      if (response && response.status === 200) {
        setCurrentMargin(response.data.payout_margin);
        setMargin(response.data?.payout_margin);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    getPayoutMargin();
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMargin(e.target.value)
  }


  const confirmationCallback = (success: boolean, info: any) => {
    setConfirmationOpen(false)
    if (success && info.action === 'confirmation') {
      submitForm(confirmationInfo);
    } else if (info.action === 'alert') {
      setConfirmationOpen(!confirmationOpen);
      getPayoutMargin();
    } else if (info.action === 'error') {
      setConfirmationOpen(false)
    }
  }


  const toggleModal = (info?: any) => {
    setConfirmationInfo(info);
    setConfirmationOpen(!confirmationOpen);
  }

  const submitForm = async (info: any) => {
    setLoader(true)
    let payload = {
      "payout_margin": margin
    }
    const response = await addPayoutMarginApi({ payload });
    if (response && response.status === 200) {
      setMargin('');
      const info = { action: 'alert', message: 'Payout margin successfully added' }
      toggleModal(info);
      return
    } else {
      const info = { action: 'error', message: response.message };
      toggleModal(info);
    }
  }


  const handleSubmit = async () => {
    let info;
    if (!margin) {
      info = {
        action: 'error',
        message: 'Please enter payout margin',
      }
      toggleModal(info);
    } else {
      info = {
        action: 'confirmation',
        message: 'Are You Sure To Save?',
      }
      toggleModal(info);
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
        <h1 className='fs-2hx fw-bold text-dark mb-0'>Configuration</h1>
      </div>
      <div className='card'>
        <div className="card-body">
          <form className="form fv-plugins-bootstrap5 mb-6 fv-plugins-framework" action="#">
            <div className="fv-row mb-7">
              <label className="fs-3 fw-semibold form-label mt-3">Payout Margin (in %)</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter margin here"
                value={margin}
                onChange={handleChange}
              />
            </div>
            <div>
              <button type="button" className='btn btn-secondary' onClick={handleSubmit}>Save</button>
            </div>
          </form>

          <div className='d-flex align-items-center gap-4'>
            <h3 className='text-dark mb-0'>Current Payout Margin: </h3>
            <h2 className='mb-0 fw-bold'> {currentMargin}%</h2>
          </div>
        </div>
      </div>
    </>
  )
}

export default Configuration
