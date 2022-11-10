import { useEffect, useState } from 'react';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { useLayout } from '../../../../../_metronic/layout/core';

import { getPaymentDetailsApi } from '../../../../api';

import ConfirmationModal from '../../../../components/modal/ConfirmationModal';

// import { ConfigurationInitValues } from './_configuration';

const paymentDetailsSchema = Yup.object().shape({
  b_payment_type: Yup.string().required('Payment type is required'),
  b_fixed_amount: Yup.number().when("b_payment_type", {
    is: 'fixed_variable',
    then: Yup.number().required('Please enter correct amount')
  }),

  s_article_count: Yup.number().required('Article count is required'),
  s_views: Yup.number().required('Views is required'),
  s_seo_score: Yup.number().max(100, 'SEO Score is less than 100').required('SEO Score is required'),
  s_payment_type: Yup.string().required('Payment type is required'),
  s_fixed_amount: Yup.number().when("s_payment_type", {
    is: 'fixed_variable',
    then: Yup.number().required('Please enter correct amount')
  }),

  g_article_count: Yup.number().required('Article count is required'),
  g_views: Yup.number().required('Views is required'),
  g_seo_score: Yup.number().max(100, 'SEO Score is less than 100').required('SEO Score is required'),
  g_payment_type: Yup.string().required('Payment type is required'),
  g_fixed_amount: Yup.number().when("g_payment_type", {
    is: 'fixed_variable',
    then: Yup.number().required('Please enter correct amount')
  }),

  var_social: Yup.number().max(100, 'Social media margin is less than 100').required('Social media margin is required'),
  var_organic: Yup.number().max(100, 'Organic margin is less than 100').required('Organic margin is required'),
  var_paid: Yup.number().max(100, 'Campaign margin is less than 100').required('Campaign margin is required'),

})


const Configuration = () => {

  const { setLoader } = useLayout();
  const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false)
  const [confirmationInfo, setConfirmationInfo] = useState<any>();
  const [initialValues, setInitialValues] = useState<any>();

  useEffect(() => {
    // getPaymentDetails();
  }, [])


  // useEffect(() => {
  //   if (!ref.current) {
  //     ref.current = true
  //     return
  //   }
  //   if (!confirmationOpen) {
  //     setConfirmationOpen(!confirmationOpen)
  //   }
  // }, [confirmationInfo])

  async function getPaymentDetails() {
    const res = await getPaymentDetailsApi()
    if (res && res.status === 200) {
      let data = res.data[0];
      setInitialValues({
        name: data.user_pay_name
      })
    } else {
      setInitialValues({
        name: ''
      })
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
    let payload = [
      {
        "tier_id": 1,
        "tier_name": "bronze",
        "tier_pageviews": null,
        "tier_seo_score": null,
        "tier_article": null,
        "tier_fixed_pay": values.b_payment_type === 'fixed_variable' ? values.b_fixed_amount : null,
        "tier_paid_pay_rate": values.var_paid,
        "tier_organic_pay_rate": values.var_organic,
        "tier_social_pay_rate": values.var_social,
      },
      {
        "tier_id": 2,
        "tier_name": "silver",
        "tier_pageviews": values.s_views,
        "tier_seo_score": values.s_seo_score,
        "tier_article": values.s_article_count,
        "tier_fixed_pay": values.s_payment_type === 'fixed_variable' ? values.s_fixed_amount : null,
        "tier_paid_pay_rate": values.var_paid,
        "tier_organic_pay_rate": values.var_organic,
        "tier_social_pay_rate": values.var_social,
      },
      {
        "tier_id": 3,
        "tier_name": "gold",
        "tier_pageviews": values.g_views,
        "tier_seo_score": values.g_seo_score,
        "tier_article": values.g_article_count,
        "tier_fixed_pay": values.g_payment_type === 'fixed_variable' ? values.g_fixed_amount : null,
        "tier_paid_pay_rate": values.var_paid,
        "tier_organic_pay_rate": values.var_organic,
        "tier_social_pay_rate": values.var_social,
      }
    ]
    return payload;
  }

  const submitForm = async (info: any) => {
    const { formActions: { setSubmitting }, values } = info
    setSubmitting(true);
    setLoader(true)
    let payload = generatePayload(values);
    try {
      let response: any = {} // add api call
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
      getPaymentDetails();
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

        <Formik
          initialValues={initialValues}
          validationSchema={paymentDetailsSchema}
          enableReinitialize={true}
          onSubmit={handleSubmit}
        >
          {props => (
            <>
              <form onSubmit={props.handleSubmit} className="form fv-plugins-bootstrap5 fv-plugins-framework" action="#">
                {/* Bronze level */}
                <div className='card mb-4'>
                  <div className="card-header min-h-65px">
                    <div className='card-title m-0'>
                      <h3>Bronze Level</h3>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row row-cols-1 row-cols-sm-4 rol-cols-md-5 row-cols-lg-5">
                      {/* <div className="col">
                        <div className="fv-row mb-7 fv-plugins-icon-container">
                          <label className="fs-4 fw-semibold form-label">Article Count</label>
                          <input
                            className="form-control"
                            type="text"
                            {...props.getFieldProps('b_article_count')}
                          />
                          {props.touched.b_article_count && props.errors.b_article_count && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>{props.errors.b_article_count}</div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        <div className="fv-row mb-7 fv-plugins-icon-container">
                          <label className="fs-4 fw-semibold form-label">Views</label>
                          <input
                            className="form-control"
                            type="text"
                            {...props.getFieldProps('b_views')}
                          />
                          {props.touched.b_views && props.errors.b_views && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>{props.errors.b_views}</div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        <div className="fv-row mb-7 fv-plugins-icon-container">
                          <label className="fs-4 fw-semibold form-label">SEO Score(%)</label>
                          <input
                            className="form-control"
                            type="text"
                            {...props.getFieldProps('b_seo_score')}
                          />
                          {props.touched.b_seo_score && props.errors.b_seo_score && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>{props.errors.b_seo_score}</div>
                            </div>
                          )}
                        </div>
                      </div> */}
                      <div className="col">
                        <div className="fv-row mb-7 fv-plugins-icon-container">
                          <label className="fs-4 fw-semibold form-label">Payment Type</label>
                          <select
                            className="form-select"
                            {...props.getFieldProps('b_payment_type')}
                          >
                            <option value="variable">Variable</option>
                            <option value="fixed_variable">Fixed + Variable</option>
                          </select>
                          {props.touched.b_payment_type && props.errors.b_payment_type && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>{props.errors.b_payment_type}</div>
                            </div>
                          )}
                        </div>
                      </div>
                      {
                        props.values.b_payment_type === 'fixed_variable' && (<div className="col">
                          <div className="fv-row mb-7 fv-plugins-icon-container">
                            <label className="fs-4 fw-semibold form-label">Fixed Pay Amount</label>
                            <input
                              className="form-control"
                              type="text"
                              {...props.getFieldProps('b_fixed_amount')}
                            />
                            {props.touched.b_fixed_amount && props.errors.b_fixed_amount && (
                              <div className='fv-plugins-message-container'>
                                <div className='fv-help-block'>{props.errors.b_fixed_amount}</div>
                              </div>
                            )}
                          </div>
                        </div>)
                      }
                    </div>
                  </div>
                </div>
                {/* Silver Level */}
                <div className='card mb-4'>
                  <div className="card-header min-h-65px">
                    <div className='card-title m-0'>
                      <h3>Silver Level</h3>
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
                            {...props.getFieldProps('s_article_count')}
                          />
                          {props.touched.s_article_count && props.errors.s_article_count && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>{props.errors.s_article_count}</div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        <div className="fv-row mb-7 fv-plugins-icon-container">
                          <label className="fs-4 fw-semibold form-label">Views</label>
                          <input
                            className="form-control"
                            type="text"
                            {...props.getFieldProps('s_views')}
                          />
                          {props.touched.s_views && props.errors.s_views && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>{props.errors.s_views}</div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        <div className="fv-row mb-7 fv-plugins-icon-container">
                          <label className="fs-4 fw-semibold form-label">SEO Score(%)</label>
                          <input
                            className="form-control"
                            type="text"
                            {...props.getFieldProps('s_seo_score')}
                          />
                          {props.touched.s_seo_score && props.errors.s_seo_score && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>{props.errors.s_seo_score}</div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        <div className="fv-row mb-7 fv-plugins-icon-container">
                          <label className="fs-4 fw-semibold form-label">Payment Type</label>
                          <select
                            className="form-select"
                            {...props.getFieldProps('s_payment_type')}
                          >
                            <option value="variable">Variable</option>
                            <option value="fixed_variable">Fixed + Variable</option>
                          </select>
                          {props.touched.s_payment_type && props.errors.s_payment_type && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>{props.errors.s_payment_type}</div>
                            </div>
                          )}
                        </div>
                      </div>
                      {
                        props.values.s_payment_type === 'fixed_variable' && (<div className="col">
                          <div className="fv-row mb-7 fv-plugins-icon-container">
                            <label className="fs-4 fw-semibold form-label">Fixed Pay Amount</label>
                            <input
                              className="form-control"
                              type="text"
                              {...props.getFieldProps('s_fixed_amount')}
                            />
                            {props.touched.s_fixed_amount && props.errors.s_fixed_amount && (
                              <div className='fv-plugins-message-container'>
                                <div className='fv-help-block'>{props.errors.s_fixed_amount}</div>
                              </div>
                            )}
                          </div>
                        </div>)
                      }
                    </div>
                  </div>
                </div>
                {/* Gold Level */}
                <div className='card mb-4'>
                  <div className="card-header min-h-65px">
                    <div className='card-title m-0'>
                      <h3>Gold Level</h3>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row row-cols-1 row-cols-sm-4 rol-cols-md-5 row-cols-lg-5">
                      <div className="col">
                        <div className="fv-row mb-7 fv-plugins-icon-container">
                          <label className="fs-4 fw-semibold form-label">Article Count</label>
                          <input
                            className="form-control"
                            type="text"
                            {...props.getFieldProps('g_article_count')}
                          />
                          {props.touched.g_article_count && props.errors.g_article_count && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>{props.errors.g_article_count}</div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        <div className="fv-row mb-7 fv-plugins-icon-container">
                          <label className="fs-4 fw-semibold form-label">Views</label>
                          <input
                            className="form-control"
                            type="text"
                            {...props.getFieldProps('g_views')}
                          />
                          {props.touched.g_views && props.errors.g_views && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>{props.errors.g_views}</div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        <div className="fv-row mb-7 fv-plugins-icon-container">
                          <label className="fs-4 fw-semibold form-label">SEO Score(%)</label>
                          <input
                            className="form-control"
                            type="text"
                            {...props.getFieldProps('g_seo_score')}
                          />
                          {props.touched.g_seo_score && props.errors.g_seo_score && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>{props.errors.g_seo_score}</div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        <div className="fv-row mb-7 fv-plugins-icon-container">
                          <label className="fs-4 fw-semibold form-label">Payment Type</label>
                          <select
                            className="form-select"
                            {...props.getFieldProps('g_payment_type')}
                          >
                            <option value="variable">Variable</option>
                            <option value="fixed_variable">Fixed + Variable</option>
                          </select>
                          {props.touched.g_payment_type && props.errors.g_payment_type && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>{props.errors.g_payment_type}</div>
                            </div>
                          )}
                        </div>
                      </div>
                      {
                        props.values.g_payment_type === 'fixed_variable' && (<div className="col">
                          <div className="fv-row mb-7 fv-plugins-icon-container">
                            <label className="fs-4 fw-semibold form-label">Fixed Pay Amount</label>
                            <input
                              className="form-control"
                              type="text"
                              {...props.getFieldProps('g_fixed_amount')}
                            />
                            {props.touched.g_fixed_amount && props.errors.g_fixed_amount && (
                              <div className='fv-plugins-message-container'>
                                <div className='fv-help-block'>{props.errors.g_fixed_amount}</div>
                              </div>
                            )}
                          </div>
                        </div>)
                      }
                    </div>
                  </div>
                </div>
                {/* Variable config */}
                <div className='card mb-4'>
                  <div className="card-header min-h-65px">
                    <div className='card-title m-0'>
                      <h3>Variable Pay Configuration</h3>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row row-cols-1 row-cols-sm-4 rol-cols-md-5 row-cols-lg-5">
                      <div className="col">
                        <div className="fv-row mb-7 fv-plugins-icon-container">
                          <label className="fs-4 fw-semibold form-label">Social Media Margin(%)</label>
                          <input
                            className="form-control"
                            type="text"
                            {...props.getFieldProps('var_social')}
                          />
                          {props.touched.var_social && props.errors.var_social && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>{props.errors.var_social}</div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        <div className="fv-row mb-7 fv-plugins-icon-container">
                          <label className="fs-4 fw-semibold form-label">Campaign Margin(%)</label>
                          <input
                            className="form-control"
                            type="text"
                            {...props.getFieldProps('var_paid')}
                          />
                          {props.touched.var_paid && props.errors.var_paid && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>{props.errors.var_paid}</div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        <div className="fv-row mb-7 fv-plugins-icon-container">
                          <label className="fs-4 fw-semibold form-label">Organic Margin(%)</label>
                          <input
                            className="form-control"
                            type="text"
                            {...props.getFieldProps('var_organic')}
                          />
                          {props.touched.var_organic && props.errors.var_organic && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>{props.errors.var_organic}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-start">
                  <button type="submit" className="btn btn-secondary">Submit</button>
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
