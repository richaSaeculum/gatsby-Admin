import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { useLayout } from '../../../../../_metronic/layout/core';

import { addPaymentDetailsApi, fileUploadApi, getPaymentDetailsApi, validateIFSC } from '../../../../api';

import ConfirmationModal from '../../../../components/modal/ConfirmationModal';

import { PaymentInitValues } from './_payment';

import './style.scss'

const paymentDetailsSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  address: Yup.string().required('Address is required'),
  aadharcard: Yup.mixed().when("isEdit", {
    is: false,
    then: Yup.mixed().required('Aadharcard is required')
  }),
  pancard: Yup.mixed().when("isEdit", {
    is: false,
    then: Yup.mixed().required('Pancard is required')
  }),
  isUpi: Yup.boolean(),
  isEdit: Yup.boolean(),
  bankAccNo: Yup.string().when("isUpi", {
    is: false,
    then: Yup.string().required('Bank account number is required')
  }),
  ifsc: Yup.string().when("isUpi", {
    is: false,
    then: Yup.string().test(
      "ifsc",
      "IFSC Code must be of length 11",
      (value) => value?.length === 11
    ).matches(
      /^[A-Za-z]{4}[a-zA-Z0-9]{7}$/,
      "First 4 characters must be alphabets and last 7 characters must be numbers"
    ).required('IFSC code is required')
  }),
  bankName: Yup.string().when("isUpi", {
    is: false,
    then: Yup.string().required('Please enter correct ifsc number')
  }),
  upi: Yup.string().when("isUpi", {
    is: true,
    then: Yup.string().required('UPI ID is required')
  }),
})


const Payment = () => {

  const { setLoader } = useLayout();
  const [imgUrl, setImgUrl] = useState<any>({});
  // const [formValues, setFormValues] = useState<any>(PaymentInitValues);
  const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false)
  const [confirmationInfo, setConfirmationInfo] = useState<any>();
  const [initialValues, setInitialValues] = useState<any>(PaymentInitValues);
  const ref = useRef(false);

  useEffect(() => {
    getPaymentDetails();
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

  async function getPaymentDetails() {
    const res = await getPaymentDetailsApi()
    if (res && res.status === 200) {
      let data = res.data[0];
      setInitialValues({
        name: data.user_pay_name,
        address: data.user_pay_address,
        bankAccNo: data.user_pay_account === null ? '' : data.user_pay_account,
        aadharcard: "",
        pancard: "",
        ifsc: data.user_pay_ifsc === null ? '' : data.user_pay_ifsc,
        bankName: data.user_pay_bank === null ? '' : data.user_pay_bank,
        upi: data.user_pay_upi === null ? '' : data.user_pay_upi,
        isUpi: data.user_pay_type === 'bank-transfer' ? false : true,
        isEdit: true,
      })
      setImgUrl({
        aadharcard: data.user_pay_aadhar,
        pancard: data.user_pay_pan
      })
    } else {
      setInitialValues(PaymentInitValues)
      setImgUrl({})
    }
  }

  const checkFileTypeAndSize = (e: ChangeEvent<HTMLInputElement>, formAction: any) => {
    const { name, files } = e.target;
    let isValid: boolean = true;

    if (files && files?.length > 0) {
      let imageType = files[0].name.slice(files[0].name.lastIndexOf('.') + 1);
      if (!['png', 'jpg', 'pdf', 'jpeg'].includes(imageType)) {
        formAction.setFieldError(name, 'Please select .png, .jpg, .jpeg, .pdf file');
        isValid = false;
      } else if (files[0].size > 200000) {   // file size limit smaller than 200kb
        formAction.setFieldError(name, 'Image is too large');
        isValid = false;
      }
    }
    return isValid;
  }

  const handleFileUpload = async (e: any, formAction: any) => {
    let valid = checkFileTypeAndSize(e, formAction);
    if (valid) {
      formAction.setFieldValue(e.target.name, e.target.value);
      const imgPayload = new FormData();
      imgPayload.append('file', e.target.files[0])
      const res = await fileUploadApi({ payload: imgPayload });
      if (res && res.status === 200) {
        let a = {
          ...imgUrl,
          [e.target.name]: res.data.file_path
        }
        setImgUrl(a);
      }
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
      user_pay_type: values.isUpi ? "upi" : "bank-transfer",
      user_pay_name: values.name,
      user_pay_address: values.address,
      user_pay_account: values.isUpi ? null : values.bankAccNo,
      user_pay_ifsc: values.isUpi ? null : values.ifsc,
      user_pay_bank: values.isUpi ? null : values.bankName,
      aadhar_image: imgUrl.aadharcard,
      pan_image: imgUrl.pancard,
      user_pay_upi: values.isUpi ? values.upi : ""
    }
    return payload;
  }

  const submitForm = async (info: any) => {
    const { formActions: { setSubmitting }, values } = info
    setSubmitting(true);
    setLoader(true)
    let payload = generatePayload(values);
    try {
      let response = await addPaymentDetailsApi({ payload })
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

  const checkIfsc = async (e: any, formAction: any) => {
    if (e.target.value.length == 11) {
      const res: any = await validateIFSC({ ifsc: e.target.value })
      if (res && res.status === 200) {
        formAction.setFieldValue("bankName", res.data.BANK)
      }
    } else {
      formAction.setFieldValue("bankName", "")
    }
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
          {props => (<form onSubmit={props.handleSubmit} className="form fv-plugins-bootstrap5 fv-plugins-framework" action="#">
            <div className="fv-row mb-7 fv-plugins-icon-container">
              <label className="fs-3 fw-semibold form-label">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name here"
                {...props.getFieldProps('name')}
              />
              {props.touched.name && props.errors.name && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>{props.errors.name}</div>
                </div>
              )}
            </div>
            <div className="fv-row mb-7">
              <label className="fs-3 fw-semibold form-label mt-3">Address</label>
              <textarea
                className="form-control"
                placeholder='Enter your address here'
                {...props.getFieldProps('address')}
              ></textarea>
              {props.touched.address && props.errors.address && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>{props.errors.address}</div>
                </div>
              )}
            </div>
            <div className="row row-cols-1 row-cols-sm-2 rol-cols-md-1 row-cols-lg-2">
              <div className="col">
                <div className="fv-row mb-7 fv-plugins-icon-container">
                  <label className="fs-3 fw-semibold form-label">Aadhar Card</label>
                  <input
                    name="aadharcard"
                    className="form-control"
                    type="file"
                    value={props.values.aadharcard}
                    onBlur={props.handleBlur}
                    onChange={(event) => { handleFileUpload(event, props) }}
                  />
                  {props.touched.aadharcard && props.errors.aadharcard && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{props.errors.aadharcard}</div>
                    </div>
                  )}
                  {(props.values.isEdit || props.values.aadharcard) && <img src={imgUrl.aadharcard} alt="" className='img-fluid img-thumb mt-2' />}
                </div>
              </div>
              <div className="col">
                <div className="fv-row mb-7 fv-plugins-icon-container">
                  <label className="fs-3 fw-semibold form-label">Pan Card</label>
                  <input
                    name="pancard"
                    className="form-control"
                    type="file"
                    value={props.values.pancard}
                    onBlur={props.handleBlur}
                    onChange={(event) => { handleFileUpload(event, props); }}
                  />
                  {props.touched.pancard && props.errors.pancard && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{props.errors.pancard}</div>
                    </div>
                  )}
                  {(props.values.isEdit || props.values.pancard) && <img src={imgUrl.pancard} alt="" className='img-fluid img-thumb mt-2' />}
                </div>
              </div>

            </div>
            <div className="fv-row mb-7">
              <div className=' d-flex gap-3 align-items-center mb-3'>
                <label className="fs-3 fw-semibold form-label">UPI ID</label>
                <div className='form-check form-check-custom form-check-solid form-switch'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    checked={props.values.isUpi}
                    {...props.getFieldProps('isUpi')}
                  />
                </div>
              </div>
              {
                props.values.isUpi && (
                  <>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter your UPI ID here"
                      {...props.getFieldProps('upi')}
                    />
                    {props.touched.upi && props.errors.upi && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{props.errors.upi}</div>
                      </div>
                    )}

                  </>
                )
              }
            </div>
            {
              !props.values.isUpi && (
                <>
                  <div className="fv-row mb-7">
                    <label className="fs-3 fw-semibold form-label">Bank Account Number</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter your bank account number here"
                      {...props.getFieldProps('bankAccNo')}
                    />
                    {props.touched.bankAccNo && props.errors.bankAccNo && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{props.errors.bankAccNo}</div>
                      </div>
                    )}
                  </div>
                  <div className="row row-cols-1 row-cols-sm-2 rol-cols-md-1 row-cols-lg-2">
                    <div className="col">
                      <div className="fv-row mb-7 fv-plugins-icon-container">
                        <label className="fs-3 fw-semibold form-label">IFSC Code</label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Enter IFSC code here"
                          name={'ifsc'}
                          value={props.values.ifsc}
                          onChange={e => { props.handleChange(e); checkIfsc(e, props) }}
                        // {...props.getFieldProps('ifsc')}
                        />
                        {props.touched.ifsc && props.errors.ifsc && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>{props.errors.ifsc}</div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col">
                      <div className="fv-row mb-7 fv-plugins-icon-container">
                        <label className="fs-3 fw-semibold form-label">Bank Name</label>
                        <input
                          className="form-control"
                          type="text"
                          readOnly
                          value={props.values.bankName}
                        // {...props.getFieldProps('bankName')}
                        />
                        {props.touched.bankName && props.errors.bankName && (
                          <div className='fv-plugins-message-container '>
                            <div className='fv-help-block'>{props.errors.bankName}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )
            }
            <div className="d-flex justify-content-start">
              <button type="submit" className="btn btn-secondary">Submit</button>
              {/* <button type="reset" className="btn btn-light me-3">Reset</button> */}
            </div>
            <div>
            </div>
          </form>)}
        </Formik>
      </div>
    </>
  )
}

export default Payment
