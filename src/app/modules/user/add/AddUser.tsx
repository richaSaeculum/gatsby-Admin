import React, { useEffect, useState } from 'react'

import { UserFormFieldsTypes, UserInitValues } from './_user'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useAuth } from '../../auth'
import { addUserApi, getSingleUsersListApi, updateUserApi } from '../../../api'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useLayout } from '../../../../_metronic/layout/core'

const userDetailsSchema = Yup.object().shape({
  username: Yup.string().required('Userame is required'),
  email: Yup.string().email("Invalid email address format").required('Email is required'),
  firstName: Yup.string(),
  lastName: Yup.string(),
  website: Yup.string(),
  allowNotification: Yup.boolean(),
  role: Yup.string(),
  password: Yup.string().required('Password is required')
})

const AddUser = () => {

  const param = useParams()
  const { wpAuth } = useAuth();
  const navigate = useNavigate();
  const wpAuthToken = wpAuth?.token;
  const { setLoader } = useLayout();
  const [initialValues, setInitialValues] = useState<any>(UserInitValues)

  useEffect(() => {
    const { id } = param;
    if (id) {
      editId(id)
    }
  }, [])

  const editId = async (id: any) => {
    setLoader(true);
    const response = await getSingleUsersListApi({ wpAuthToken, id })
    if (response && response.status === 200) {
      setLoader(false);
      console.log(response.data)
    }
  }

  const formik = useFormik<UserFormFieldsTypes>({
    initialValues: initialValues,
    validationSchema: userDetailsSchema,
    onSubmit: async (values: any, { setSubmitting, resetForm }: any) => {
      setSubmitting(true);
      setLoader(true)
      let payload = generatePayload(values);
      let response;
      try {
        if (values.id) {
          //edit user API call (POST)
          response = await updateUserApi({ wpAuthToken, payload })
        } else {
          //add user API call (POST)
          response = await addUserApi({ wpAuthToken, payload })
          if (response && response.statusText === 'Success') {
            console.log("success", response)
            navigate('/users/list')
          }
        }
      } catch (error) {
        console.log(error)
      } finally {
        setSubmitting(false);
        resetForm();
        setLoader(false)
      }
    }
  })

  const generatePayload = (values: any) => {
    let data = {
      'id': values.id ? values.id : '',
      "username": values.username,
      "first_name": values.firstName,
      "last_name": values.lastName,
      "email": values.email,
      "url": values.website,
      "description": '',
      "locale": 'en_US',
      "nickname": '',
      "roles": values.role,
      "meta": [],
      "password": values.password
    }
    return data
  }

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="form fv-plugins-bootstrap5 fv-plugins-framework" action="#">
        <div className="fv-row mb-7">
          <label className="fs-3 fw-semibold form-label mt-3 required">Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your name here"
            {...formik.getFieldProps('username')}
          />
          {formik.touched.username && formik.errors.username && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>{formik.errors.username}</div>
            </div>
          )}
        </div>
        <div className="fv-row mb-7">
          <label className="fs-3 fw-semibold form-label mt-3 required">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your name here"
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>{formik.errors.email}</div>
            </div>
          )}
        </div>
        <div className="row row-cols-1 row-cols-sm-2 rol-cols-md-1 row-cols-lg-2">
          <div className="col">
            <div className="fv-row mb-7 fv-plugins-icon-container">
              <label className="fs-3 fw-semibold form-label mt-3">First Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name here"
                {...formik.getFieldProps('firstName')}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>{formik.errors.firstName}</div>
                </div>
              )}
            </div>
          </div>
          <div className="col">
            <div className="fv-row mb-7">
              <label className="fs-3 fw-semibold form-label mt-3">Last Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name here"
                {...formik.getFieldProps('lastName')}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>{formik.errors.lastName}</div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="fv-row mb-7">
          <label className="fs-3 fw-semibold form-label mt-3">Website</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your name here"
            {...formik.getFieldProps('website')}
          />
          {formik.touched.website && formik.errors.website && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>{formik.errors.website}</div>
            </div>
          )}
        </div>
        {/* <div className="row mb-0">
          <label className="col-lg-2 col-form-label fw-bold fs-3">Allow Notification</label>
          <div className="col-lg-10 d-flex align-items-center">
            <div className='form-check form-check-custom form-check-solid'>
              <input
                className='form-check-input'
                type='checkbox'
                {...formik.getFieldProps('allowNotification')}
              />
              <label className="form-check-label">Send the new user an email about their account.</label>
            </div>
          </div>
        </div> */}
        <div className="fv-row mb-7">
          <label className="fs-3 fw-semibold form-label mt-3">User Role</label>
          <select
            className='form-select'
            {...formik.getFieldProps('role')}
          >
            <option value="subscriber">Subscriber</option>
            <option value="contributer">Contributer</option>
            <option value="author">Author</option>
            <option value="editor">Editor</option>
            <option value="administrator">Administrator</option>
          </select>
          {formik.touched.role && formik.errors.role && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>{formik.errors.role}</div>
            </div>
          )}
        </div>
        <div className="fv-row mb-7">
          <label className="fs-3 fw-semibold form-label mt-3 required">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter your name here"
            {...formik.getFieldProps('password')}
          />
          {formik.touched.password && formik.errors.password && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>{formik.errors.password}</div>
            </div>
          )}
        </div>
        {/* <div className="fv-row mb-7">
          <div className='form-check form-check-custom form-check-solid'>
            <input
              className='form-check-input'
              type='checkbox'
              {...formik.getFieldProps('allowNotification')}
            />
            <label className="form-check-label">Send the new user an email about their account.</label>
          </div>
        </div> */}
        <div className="d-flex justify-content-start gap-3">
          <button type="submit" className="btn btn-secondary">Submit</button>
          <Link to={'/users/list'}> <button type="button" className="btn btn-light">Cancel</button></Link>
        </div>
      </form>
    </div>
  )
}

export default AddUser
