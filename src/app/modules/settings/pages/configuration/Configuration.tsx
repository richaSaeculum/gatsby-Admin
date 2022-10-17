import { useEffect, useState, useRef } from 'react';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { useLayout } from '../../../../../_metronic/layout/core';
import { useAuth } from '../../../auth';

import { getTierConfigApi, updateTierApi } from '../../../../api';

import ConfirmationModal from '../../../../components/modal/ConfirmationModal';

import { BronzeInitValues, GoldInitValues, SilverInitValues } from './_configuration';

// let digRegex = /^\d*[0-9]\d*$/
const bronzeFormSchema = Yup.object().shape({
  type: Yup.string().required('Payment type is required'),
  fixedPay: Yup.number().when("type", {
    is: 'fixed_and_variable',
    then: Yup.number().required('Please enter correct amount').nullable(true)
  }),
  socialPayRate: Yup.number().max(100, 'Social media margin is less than 100').required('Social media margin is required'),
  organicPayRate: Yup.number().max(100, 'Organic margin is less than 100').required('Organic margin is required'),
  paidPayRate: Yup.number().max(100, 'Campaign margin is less than 100').required('Campaign margin is required'),
  // socialPayRate: Yup.string().matches(digRegex, 'it should only a number').required('Social media margin is required').test('leng', 'must be less than 100', (val: any) => Number(val) < 100),
})

const silverFormSchema = Yup.object().shape({
  article: Yup.number().required('Article count is required'),
  pageViews: Yup.number().required('Views is required'),
  seoScore: Yup.number().max(100, 'SEO Score is less than 100').required('SEO Score is required'),
  type: Yup.string().required('Payment type is required'),
  fixedPay: Yup.number().when("type", {
    is: 'fixed_and_variable',
    then: Yup.number().required('Please enter correct amount').nullable(true)
  }),
  socialPayRate: Yup.number().max(100, 'Social media margin is less than 100').required('Social media margin is required'),
  organicPayRate: Yup.number().max(100, 'Organic margin is less than 100').required('Organic margin is required'),
  paidPayRate: Yup.number().max(100, 'Campaign margin is less than 100').required('Campaign margin is required'),
})

const goldFormSchema = Yup.object().shape({
  article: Yup.number().required('Article count is required'),
  pageViews: Yup.number().required('Views is required'),
  seoScore: Yup.number().max(100, 'SEO Score is less than 100').required('SEO Score is required'),
  type: Yup.string().required('Payment type is required'),
  fixedPay: Yup.number().when("type", {
    is: 'fixed_and_variable',
    then: Yup.number().required('Please enter correct amount').nullable(true)
  }),
  socialPayRate: Yup.number().max(100, 'Social media margin is less than 100').required('Social media margin is required'),
  organicPayRate: Yup.number().max(100, 'Organic margin is less than 100').required('Organic margin is required'),
  paidPayRate: Yup.number().max(100, 'Campaign margin is less than 100').required('Campaign margin is required'),
})


const Configuration = () => {

  const { auth } = useAuth();
  const { setLoader } = useLayout();
  const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false)
  const [confirmationInfo, setConfirmationInfo] = useState<any>();
  const [bronzeInitialValues, setBronzeInitialValues] = useState<any>(BronzeInitValues);
  const [silverInitialValues, setSilverInitialValues] = useState<any>(SilverInitValues);
  const [goldInitialValues, setGoldInitialValues] = useState<any>(GoldInitValues);
  const ref = useRef(false)

  useEffect(() => {
    getTierConfigDetails();
  }, [])

  useEffect(() => {
    if (!ref.current) {
      ref.current = true
      return
    }
    if (!confirmationOpen) {
      setConfirmationOpen(!confirmationOpen)
    }
  }, [confirmationInfo])

  async function getTierConfigDetails() {
    setLoader(true);
    try {
      const res = await getTierConfigApi({ token: auth?.token })
      if (res && res.status === 200) {
        let data = res.data;
        let bronze = data.find((item: any) => item.name === 'bronze');
        let silver = data.find((item: any) => item.name === 'silver');
        let gold = data.find((item: any) => item.name === 'gold');
        setBronzeInitialValues({
          id: bronze.id,
          name: bronze.name,
          type: bronze.type,
          fixedPay: bronze.type === 'fixed_and_variable' ? bronze.fixedPay : '',
          socialPayRate: bronze.socialPayRate,
          organicPayRate: bronze.organicPayRate,
          paidPayRate: bronze.paidPayRate,
        });
        setSilverInitialValues({
          id: silver.id,
          name: silver.name,
          article: silver.article,
          pageViews: silver.pageViews,
          seoScore: silver.seoScore,
          type: silver.type,
          fixedPay: silver.fixedPay,
          socialPayRate: silver.socialPayRate,
          organicPayRate: silver.organicPayRate,
          paidPayRate: silver.paidPayRate,
        });
        setGoldInitialValues({
          id: gold.id,
          name: gold.name,
          article: gold.article,
          pageViews: gold.pageViews,
          seoScore: gold.seoScore,
          type: gold.type,
          fixedPay: gold.fixedPay,
          socialPayRate: gold.socialPayRate,
          organicPayRate: gold.organicPayRate,
          paidPayRate: gold.paidPayRate,
        })
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoader(false)
    }
  }


  const confirmationCallback = (success: boolean, info: any) => {
    setConfirmationOpen(false)
    if (success && info.action === 'confirmation') {
      submitForm(confirmationInfo)
    } else if (info.action === 'alert') {
      setConfirmationOpen(!confirmationOpen)
    } else if (info.action === 'error') {
      setConfirmationOpen(false)
    }
  }

  const toggleModal = (info?: any) => {
    setConfirmationInfo(info)
    setConfirmationOpen(!confirmationOpen)
  }

  const generatePayload = (values: any) => {
    let payload = {
      id: values.id,
      name: values.name,
      article: values.article,
      pageViews: values.pageViews,
      seoScore: values.seoScore,
      type: values.type,
      fixedPay: values.type === 'fixed_and_variable' ? values.fixedPay : null,
      socialPayRate: values.socialPayRate,
      organicPayRate: values.organicPayRate,
      paidPayRate: values.paidPayRate,
    }
    return payload;
  }

  const submitForm = async (info: any) => {
    const { formActions: { setSubmitting }, values } = info
    setSubmitting(true);
    setLoader(true)
    let payload: any = generatePayload(values);
    try {
      let response: any = await updateTierApi({ token: auth?.token, id: payload?.id, payload })// add api call
      if (response && response.status === 200) {
        const info = { action: 'alert', message: 'Payment details successfully added' }
        toggleModal(info);
        return
      } else {
        const info = { action: 'error', message: response.message };
        toggleModal(info);
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false);
      getTierConfigDetails();
      setLoader(false);
    }
  }

  const handleSubmit = async (values: any, actions: any) => {
    let info = {
      action: 'confirmation',
      message: 'Are You Sure To Save?',
      formActions: actions,
      values: values
    }
    // submitForm(info)
    toggleModal(info);
  }

  return (
    <>
      <div>
        {/* <div className="card-header d-flex justify-content-between align-items-center">
          <h1 className='mb-0'>Payment</h1>
          <button type='button' className='btn btn-secondary'>Preview</button>
        </div> */}
        {confirmationOpen && <ConfirmationModal
          open={confirmationOpen}
          confirmationInfo={confirmationInfo}
          onClose={() => { setConfirmationOpen(false) }}
          handleConfirmationMessage={confirmationCallback}
        />}

        {/* BRONZE LEVEL */}
        <Formik
          initialValues={bronzeInitialValues}
          validationSchema={bronzeFormSchema}
          enableReinitialize={true}
          onSubmit={handleSubmit}
        >
          {props => (
            <>
              <form onSubmit={props.handleSubmit} className="form fv-plugins-bootstrap5 fv-plugins-framework" action="#">
                {/* Bronze level */}
                <div className='card mb-4'>
                  <div className="card-header min-h-65px d-flex">
                    <div className='card-title m-0'>
                      <h3>Bronze Level</h3>
                    </div>
                    <div className="d-flex justify-content-end align-items-center">
                      <button type="submit" className="btn btn-secondary" disabled={!props.isValid}>Submit</button>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row row-cols-1 row-cols-sm-4 rol-cols-md-5 row-cols-lg-5">
                      <div className="col">
                        <div className="fv-row mb-7 fv-plugins-icon-container">
                          <label className="fs-4 fw-semibold form-label">Payment Type</label>
                          <select
                            className="form-select"
                            {...props.getFieldProps('type')}
                          >
                            <option value="variable">Variable</option>
                            <option value="fixed_and_variable">Fixed + Variable</option>
                          </select>
                          {props.touched.type && props.errors.type && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>{props.errors.type}</div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        <div className="fv-row mb-7 fv-plugins-icon-container">
                          <label className="fs-4 fw-semibold form-label">Social Media Margin(%)</label>
                          <input
                            className="form-control"
                            type="number"
                            {...props.getFieldProps('socialPayRate')}
                          />
                          {props.touched.socialPayRate && props.errors.socialPayRate && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>{props.errors.socialPayRate}</div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        <div className="fv-row mb-7 fv-plugins-icon-container">
                          <label className="fs-4 fw-semibold form-label">Campaign Margin(%)</label>
                          <input
                            className="form-control"
                            type="number"
                            {...props.getFieldProps('paidPayRate')}
                          />
                          {props.touched.paidPayRate && props.errors.paidPayRate && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>{props.errors.paidPayRate}</div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        <div className="fv-row mb-7 fv-plugins-icon-container">
                          <label className="fs-4 fw-semibold form-label">Organic Margin(%)</label>
                          <input
                            className="form-control"
                            type="number"
                            {...props.getFieldProps('organicPayRate')}
                          />
                          {props.touched.organicPayRate && props.errors.organicPayRate && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>{props.errors.organicPayRate}</div>
                            </div>
                          )}
                        </div>
                      </div>
                      {
                        props.values.type === 'fixed_and_variable' && (<div className="col">
                          <div className="fv-row mb-7 fv-plugins-icon-container">
                            <label className="fs-4 fw-semibold form-label">Fixed Pay Amount</label>
                            <input
                              className="form-control"
                              type="number"
                              {...props.getFieldProps('fixedPay')}
                            />
                            {props.touched.fixedPay && props.errors.fixedPay && (
                              <div className='fv-plugins-message-container'>
                                <div className='fv-help-block'>{props.errors.fixedPay}</div>
                              </div>
                            )}
                          </div>
                        </div>)
                      }
                    </div>
                  </div>
                </div>
              </form>
            </>
          )}
        </Formik>

        {/* SILVER LEVEL */}
        <Formik
          initialValues={silverInitialValues}
          validationSchema={silverFormSchema}
          enableReinitialize={true}
          onSubmit={handleSubmit}
        >
          {props => (
            <>
              <form onSubmit={props.handleSubmit} className="form fv-plugins-bootstrap5 fv-plugins-framework" action="#">
                <div className='card mb-4'>
                  <div className="card-header min-h-65px d-flex">
                    <div className='card-title m-0'>
                      <h3>Silver Level</h3>
                    </div>
                    <div className="d-flex justify-content-end align-items-center">
                      <button type="submit" className="btn btn-secondary">Submit</button>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row row-cols-1 row-cols-sm-4 rol-cols-md-5 row-cols-lg-5">
                      <div className="col">
                        <div className="fv-row mb-7 fv-plugins-icon-container">
                          <label className="fs-4 fw-semibold form-label">Article Count</label>
                          <input
                            className="form-control"
                            type="number"
                            {...props.getFieldProps('article')}
                          />
                          {props.touched.article && props.errors.article && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>{props.errors.article}</div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        <div className="fv-row mb-7 fv-plugins-icon-container">
                          <label className="fs-4 fw-semibold form-label">Views</label>
                          <input
                            className="form-control"
                            type="number"
                            {...props.getFieldProps('pageViews')}
                          />
                          {props.touched.pageViews && props.errors.pageViews && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>{props.errors.pageViews}</div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        <div className="fv-row mb-7 fv-plugins-icon-container">
                          <label className="fs-4 fw-semibold form-label">SEO Score(%)</label>
                          <input
                            className="form-control"
                            type="number"
                            {...props.getFieldProps('seoScore')}
                          />
                          {props.touched.seoScore && props.errors.seoScore && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>{props.errors.seoScore}</div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        <div className="fv-row mb-7 fv-plugins-icon-container">
                          <label className="fs-4 fw-semibold form-label">Payment Type</label>
                          <select
                            className="form-select"
                            {...props.getFieldProps('type')}
                          >
                            <option value="variable">Variable</option>
                            <option value="fixed_and_variable">Fixed + Variable</option>
                          </select>
                          {props.touched.type && props.errors.type && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>{props.errors.type}</div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        <div className="fv-row mb-7 fv-plugins-icon-container">
                          <label className="fs-4 fw-semibold form-label">Social Media Margin(%)</label>
                          <input
                            className="form-control"
                            type="number"
                            {...props.getFieldProps('socialPayRate')}
                          />
                          {props.touched.socialPayRate && props.errors.socialPayRate && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>{props.errors.socialPayRate}</div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        <div className="fv-row mb-7 fv-plugins-icon-container">
                          <label className="fs-4 fw-semibold form-label">Campaign Margin(%)</label>
                          <input
                            className="form-control"
                            type="number"
                            {...props.getFieldProps('paidPayRate')}
                          />
                          {props.touched.paidPayRate && props.errors.paidPayRate && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>{props.errors.paidPayRate}</div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        <div className="fv-row mb-7 fv-plugins-icon-container">
                          <label className="fs-4 fw-semibold form-label">Organic Margin(%)</label>
                          <input
                            className="form-control"
                            type="number"
                            {...props.getFieldProps('organicPayRate')}
                          />
                          {props.touched.organicPayRate && props.errors.organicPayRate && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>{props.errors.organicPayRate}</div>
                            </div>
                          )}
                        </div>
                      </div>
                      {
                        props.values.type === 'fixed_and_variable' && (<div className="col">
                          <div className="fv-row mb-7 fv-plugins-icon-container">
                            <label className="fs-4 fw-semibold form-label">Fixed Pay Amount</label>
                            <input
                              className="form-control"
                              type="number"
                              {...props.getFieldProps('fixedPay')}
                            />
                            {props.touched.fixedPay && props.errors.fixedPay && (
                              <div className='fv-plugins-message-container'>
                                <div className='fv-help-block'>{props.errors.fixedPay}</div>
                              </div>
                            )}
                          </div>
                        </div>)
                      }
                    </div>
                  </div>
                </div>
              </form>
            </>
          )}
        </Formik>

        {/* GOLD LEVEL */}
        <Formik
          initialValues={goldInitialValues}
          validationSchema={goldFormSchema}
          enableReinitialize={true}
          onSubmit={handleSubmit}
        >
          {props => (
            <>
              <form onSubmit={props.handleSubmit} className="form fv-plugins-bootstrap5 fv-plugins-framework" action="#">
                <div className='card mb-4'>
                  <div className="card-header min-h-65px d-flex">
                    <div className='card-title m-0'>
                      <h3>Gold Level</h3>
                    </div>
                    <div className="d-flex justify-content-end align-items-center">
                      <button type="submit" className="btn btn-secondary">Submit</button>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row row-cols-1 row-cols-sm-4 rol-cols-md-5 row-cols-lg-5">
                      <div className="col">
                        <div className="fv-row mb-7 fv-plugins-icon-container">
                          <label className="fs-4 fw-semibold form-label">Article Count</label>
                          <input
                            className="form-control"
                            type="number"
                            {...props.getFieldProps('article')}
                          />
                          {props.touched.article && props.errors.article && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>{props.errors.article}</div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        <div className="fv-row mb-7 fv-plugins-icon-container">
                          <label className="fs-4 fw-semibold form-label">Views</label>
                          <input
                            className="form-control"
                            type="number"
                            {...props.getFieldProps('pageViews')}
                          />
                          {props.touched.pageViews && props.errors.pageViews && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>{props.errors.pageViews}</div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        <div className="fv-row mb-7 fv-plugins-icon-container">
                          <label className="fs-4 fw-semibold form-label">SEO Score(%)</label>
                          <input
                            className="form-control"
                            type="number"
                            {...props.getFieldProps('seoScore')}
                          />
                          {props.touched.seoScore && props.errors.seoScore && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>{props.errors.seoScore}</div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        <div className="fv-row mb-7 fv-plugins-icon-container">
                          <label className="fs-4 fw-semibold form-label">Payment Type</label>
                          <select
                            className="form-select"
                            {...props.getFieldProps('type')}
                          >
                            <option value="variable">Variable</option>
                            <option value="fixed_and_variable">Fixed + Variable</option>
                          </select>
                          {props.touched.type && props.errors.type && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>{props.errors.type}</div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        <div className="fv-row mb-7 fv-plugins-icon-container">
                          <label className="fs-4 fw-semibold form-label">Social Media Margin(%)</label>
                          <input
                            className="form-control"
                            type="number"
                            {...props.getFieldProps('socialPayRate')}
                          />
                          {props.touched.socialPayRate && props.errors.socialPayRate && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>{props.errors.socialPayRate}</div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        <div className="fv-row mb-7 fv-plugins-icon-container">
                          <label className="fs-4 fw-semibold form-label">Campaign Margin(%)</label>
                          <input
                            className="form-control"
                            type="number"
                            {...props.getFieldProps('paidPayRate')}
                          />
                          {props.touched.paidPayRate && props.errors.paidPayRate && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>{props.errors.paidPayRate}</div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        <div className="fv-row mb-7 fv-plugins-icon-container">
                          <label className="fs-4 fw-semibold form-label">Organic Margin(%)</label>
                          <input
                            className="form-control"
                            type="number"
                            {...props.getFieldProps('organicPayRate')}
                          />
                          {props.touched.organicPayRate && props.errors.organicPayRate && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>{props.errors.organicPayRate}</div>
                            </div>
                          )}
                        </div>
                      </div>
                      {
                        props.values.type === 'fixed_and_variable' && (<div className="col">
                          <div className="fv-row mb-7 fv-plugins-icon-container">
                            <label className="fs-4 fw-semibold form-label">Fixed Pay Amount</label>
                            <input
                              className="form-control"
                              type="number"
                              {...props.getFieldProps('fixedPay')}
                            />
                            {props.touched.fixedPay && props.errors.fixedPay && (
                              <div className='fv-plugins-message-container'>
                                <div className='fv-help-block'>{props.errors.fixedPay}</div>
                              </div>
                            )}
                          </div>
                        </div>)
                      }
                    </div>
                  </div>
                </div>
              </form>
            </>
          )}
        </Formik>

      </div>

    </>
  )
}

export default Configuration
