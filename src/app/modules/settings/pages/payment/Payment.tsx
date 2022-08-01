import React, { ChangeEvent, FormEvent, useState } from 'react'
import { PaymentFormFieldsTypes, PaymentInitValues as initialValues } from './_payment'
import * as Yup from 'yup'

import { useFormik } from 'formik'

const paymentDetailsSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  address: Yup.string().required('Address is required'),
  aadharcard: Yup.mixed().required('Aadharcard is required'),
  pancard: Yup.mixed().required('Pancard is required'),
  isUpi: Yup.boolean(),
  bankAccNo: Yup.string().when("isUpi", {
    is: false,
    then: Yup.string().required('Bank account number is required')
  }),
  ifsc: Yup.string().when("isUpi", {
    is: false,
    then: Yup.string().required('Bank account number is required')
  }),
  bankName: Yup.string().when("isUpi", {
    is: false,
    then: Yup.string().required('Bank account number is required')
  }),
  upi: Yup.string().when("isUpi", {
    is: true,
    then: Yup.string().required('UPI ID is required')
  }),
})


const Payment = () => {

  const [data, setData] = useState<PaymentFormFieldsTypes>(initialValues);
  const [preview, setPreview] = useState<boolean>(false);

  const formik = useFormik<PaymentFormFieldsTypes>({
    initialValues: initialValues,
    validationSchema: paymentDetailsSchema,
    onSubmit: (values: any) => {
      console.log(values)
      setPreview(true)
      setData({ ...values })
    }
  })

  const checkFileTypeAndSize = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    let isValid: boolean = true;

    if (files && files?.length > 0) {
      let imageType = files[0].name.slice(files[0].name.lastIndexOf('.') + 1);
      if (!['png', 'jpg', 'pdf', 'jpeg'].includes(imageType)) {
        formik.setFieldError(name, 'Please select .png, .jpg, .jpeg, .pdf file');
        isValid = false;
      } else if (files[0].size > 200000) {   // file size limit smaller than 200kb
        formik.setFieldError(name, 'Image is too large');
        isValid = false;
      }
    }
    return isValid;
  }

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    let valid = checkFileTypeAndSize(e);
    if (valid) {
      formik.setFieldValue(e.target.name, e.target.value);
    }
  }

  return (
    <>
      <div>
        {/* <div className="card-header d-flex justify-content-between align-items-center">
          <h1 className='mb-0'>Payment</h1>
          <button type='button' className='btn btn-secondary'>Preview</button>
        </div> */}
        <form onSubmit={formik.handleSubmit} className="form fv-plugins-bootstrap5 fv-plugins-framework" action="#">
          <div className="fv-row mb-7 fv-plugins-icon-container">
            <label className="fs-3 fw-semibold form-label">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name here"
              {...formik.getFieldProps('name')}
            />
            {formik.touched.name && formik.errors.name && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>{formik.errors.name}</div>
              </div>
            )}
          </div>
          <div className="fv-row mb-7">
            <label className="fs-3 fw-semibold form-label mt-3">Address</label>
            <textarea
              className="form-control"
              placeholder='Enter your address here'
              {...formik.getFieldProps('address')}
            ></textarea>
            {formik.touched.address && formik.errors.address && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>{formik.errors.address}</div>
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
                  value={formik.values.aadharcard}
                  onBlur={formik.handleBlur}
                  onChange={(event) => { handleFileUpload(event) }}
                />
                {formik.touched.aadharcard && formik.errors.aadharcard && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.aadharcard}</div>
                  </div>
                )}
              </div>
            </div>
            <div className="col">
              <div className="fv-row mb-7 fv-plugins-icon-container">
                <label className="fs-3 fw-semibold form-label">Pan Card</label>
                <input
                  name="pancard"
                  className="form-control"
                  type="file"
                  value={formik.values.pancard}
                  onBlur={formik.handleBlur}
                  onChange={(event) => { handleFileUpload(event) }}
                />
                {formik.touched.pancard && formik.errors.pancard && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.pancard}</div>
                  </div>
                )}
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
                  {...formik.getFieldProps('isUpi')}
                />
              </div>
            </div>
            {
              formik.values.isUpi && (
                <>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter your UPI ID here"
                    {...formik.getFieldProps('upi')}
                  />
                  {formik.touched.upi && formik.errors.upi && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.upi}</div>
                    </div>
                  )}

                </>
              )
            }
          </div>
          {
            !formik.values.isUpi && (
              <>
                <div className="fv-row mb-7">
                  <label className="fs-3 fw-semibold form-label">Bank Account Number</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter your bank account number here"
                    {...formik.getFieldProps('bankAccNo')}
                  />
                  {formik.touched.bankAccNo && formik.errors.bankAccNo && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.bankAccNo}</div>
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
                        {...formik.getFieldProps('ifsc')}
                      />
                      {formik.touched.ifsc && formik.errors.ifsc && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.ifsc}</div>
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
                        placeholder="Enter bank name here"
                        {...formik.getFieldProps('bankName')}
                      />
                      {formik.touched.bankName && formik.errors.bankName && (
                        <div className='fv-plugins-message-container '>
                          <div className='fv-help-block'>{formik.errors.bankName}</div>
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
        </form>
        {preview && <div className='preview'>
          <ul>
            <li>{data.name}</li>
            <li>{data.address}</li>
            <li>{data.aadharcard}</li>
            <li>{data.pancard}</li>
            <li>{data.bankAccNo}</li>
            <li>{data.ifsc}</li>
            <li>{data.bankName}</li>
            <li>{data.upi}</li>
          </ul>
        </div>}
      </div>
    </>
  )
}

export default Payment
