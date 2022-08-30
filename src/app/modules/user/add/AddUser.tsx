import React, { useEffect, useRef, useState } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { useAuth } from '../../auth'
import { addUserApi, getSingleUsersListApi, updateUserApi } from '../../../api'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useLayout } from '../../../../_metronic/layout/core'
import ConfirmationModal from '../../../components/modal/ConfirmationModal'

const userDetailsSchema = Yup.object().shape({
  id: Yup.string(),
  username: Yup.string().required('Userame is required'),
  email: Yup.string().email("Invalid email address format").required('Email is required'),
  firstName: Yup.string(),
  lastName: Yup.string(),
  website: Yup.string(),
  role: Yup.string(),
  password: Yup.string().when("id", {
    is: undefined,
    then: Yup.string().required('Password is required')
  }),
})

interface UserFormFieldsTypes {
  id: string | undefined
  username: string
  email: string
  firstName: string
  lastName: string
  website?: string
  role: string,
  password: string
}

const UserInitValues: UserFormFieldsTypes = {
  id: undefined,
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  website: '',
  role: 'author',
  password: '',
}

const AddUser = () => {

  const param = useParams()
  const { wpAuth, auth } = useAuth();
  const navigate = useNavigate();
  const wpAuthToken = wpAuth?.token;
  const { setLoader } = useLayout();
  const [initialValues, setInitialValues] = useState<any>(UserInitValues);
  const [editForm, setEditForm] = useState<boolean>(false)
  const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false)
  const [confirmationInfo, setConfirmationInfo] = useState<any>()
  const ref = useRef(false)

  useEffect(() => {
    const { id } = param;
    if (id) {
      editId(id)
    }
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

  const editId = async (id: any) => {
    setLoader(true);
    setEditForm(true);
    const response = await getSingleUsersListApi({ token: auth?.token, id })
    if (response && response.status === 200) {
      const { user_name, user_email, user_first_name, user_last_name, user_role, user_website, wp_user_id } = response.data
      setLoader(false);
      let editData = {
        username: user_name,
        email: user_email,
        firstName: user_first_name,
        lastName: user_last_name,
        website: user_website === null ? "" : user_website,
        role: user_role,
        id: wp_user_id,
        password: ""
      }
      setInitialValues(editData)
    }
  }

  const confirmationCallback = (success: boolean, info: any) => {
    setConfirmationOpen(false)
    if (success && info.action === 'confirmation') {
      submitForm(confirmationInfo)
    } else if (info.action === 'alert') {
      setConfirmationOpen(!confirmationOpen)
      navigate('/users/list')
      // info.formActions.resetForm();
    } else if (info.action === 'error') {
      setConfirmationOpen(false)
    }
  }

  const toggleModal = (info?: any) => {
    console.log(confirmationOpen, 'in toggle')
    setConfirmationInfo(info)
    setConfirmationOpen(!confirmationOpen)
  }

  const submitForm = async (info: any) => {
    const { formActions: { setSubmitting, resetForm }, values } = info
    setSubmitting(true);
    setLoader(true)
    let payload = generatePayload(values);
    let response: any;
    try {
      if (values.id) {
        //edit user API call (POST)
        response = await updateUserApi({ token: auth?.token, payload, id: values.id });
        if (response && response.status === 200) {
          const info = { action: 'alert', message: 'User successfully updated' }
          toggleModal(info);
          return
        } else {
          const info = { action: 'error', message: response.message };
          toggleModal(info);
        }
      } else {
        //add user API call (POST)
        response = await addUserApi({ payload });
        if (response && response.status === 200) {
          const info = { action: 'alert', message: 'User successfully added' }
          toggleModal(info);
          return
        } else {
          const info = { action: 'error', message: response.message };
          toggleModal(info);
        }
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false);
      setLoader(false)
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
    toggleModal(info)
  }

  // const formik = useFormik<UserFormFieldsTypes>({
  //   initialValues: initialValues,
  //   validationSchema: userDetailsSchema,
  //   onSubmit: async (values: any, { setSubmitting, resetForm }: any) => {
  //     setSubmitting(true);
  //     setLoader(true)
  //     let payload = generatePayload(values);
  //     let response;
  //     try {
  //       if (values.id) {
  //         //edit user API call (POST)
  //         response = await updateUserApi({ wpAuthToken, payload })
  //       } else {
  //         //add user API call (POST)
  //         response = await addUserApi({ wpAuthToken, payload })
  //         if (response && response.statusText === 'Success') {
  //           console.log("success", response)
  //           navigate('/users/list')
  //         }
  //       }
  //     } catch (error) {
  //       console.log(error)
  //     } finally {
  //       setSubmitting(false);
  //       resetForm();
  //       setLoader(false)
  //     }
  //   }
  // })

  const generatePayload = (values: any) => {
    let payload;
    if (values.id) {
      payload = {
        user_first_name: values.firstName,
        user_last_name: values.lastName,
        user_website: values.website
      }
    } else {
      payload = {
        user_email: values.email,
        user_first_name: values.firstName,
        user_last_name: values.lastName,
        user_password: values.password,
        user_name: values.username,
        user_role: values.role,
        user_website: values.website
      }
    }

    // let payload = {
    //   'id': values.id ? values.id : '',
    //   "username": values.username,
    //   "first_name": values.firstName,
    //   "last_name": values.lastName,
    //   "email": values.email,
    //   "url": values.website,
    //   "description": '',
    //   "locale": 'en_US',
    //   "nickname": '',
    //   "roles": values.role,
    //   "meta": [],
    //   "password": values.password
    // }
    // if (values.id !== undefined) {
    //   delete payload.password
    // }

    return payload
  }

  return (
    <>
      {confirmationOpen && <ConfirmationModal
        open={confirmationOpen}
        confirmationInfo={confirmationInfo}
        onClose={() => { setConfirmationOpen(false) }}
        handleConfirmationMessage={confirmationCallback}
      />}
      <Formik
        initialValues={initialValues}
        validationSchema={userDetailsSchema}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {props => (<form onSubmit={props.handleSubmit} className="form fv-plugins-bootstrap5 fv-plugins-framework" action="#">
          <div className="fv-row mb-7">
            <label className="fs-3 fw-semibold form-label mt-3 required">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name here"
              disabled={editForm}
              {...props.getFieldProps('username')}
            />
            {props.touched.username && props.errors.username && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>{props.errors.username}</div>
              </div>
            )}
          </div>
          <div className="fv-row mb-7">
            <label className="fs-3 fw-semibold form-label mt-3 required">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your name here"
              disabled={editForm}
              {...props.getFieldProps('email')}
            />
            {props.touched.email && props.errors.email && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>{props.errors.email}</div>
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
                  {...props.getFieldProps('firstName')}
                />
                {props.touched.firstName && props.errors.firstName && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{props.errors.firstName}</div>
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
                  {...props.getFieldProps('lastName')}
                />
                {props.touched.lastName && props.errors.lastName && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{props.errors.lastName}</div>
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
              {...props.getFieldProps('website')}
            />
            {props.touched.website && props.errors.website && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>{props.errors.website}</div>
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
                {...props.getFieldProps('allowNotification')}
              />
              <label className="form-check-label">Send the new user an email about their account.</label>
            </div>
          </div>
        </div> */}
          <div className="fv-row mb-7">
            <label className="fs-3 fw-semibold form-label mt-3">User Role</label>
            <select
              disabled={editForm}
              className='form-select'
              {...props.getFieldProps('role')}
            >
              <option value="subscriber">Subscriber</option>
              <option value="contributer">Contributer</option>
              <option value="author">Author</option>
              <option value="editor">Editor</option>
              <option value="administrator">Administrator</option>
            </select>
            {props.touched.role && props.errors.role && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>{props.errors.role}</div>
              </div>
            )}
          </div>
          {!editForm && (<div className="fv-row mb-7">
            <label className="fs-3 fw-semibold form-label mt-3 required">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your name here"
              {...props.getFieldProps('password')}
            />
            {props.touched.password && props.errors.password && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>{props.errors.password}</div>
              </div>
            )}
          </div>)}
          {/* <div className="fv-row mb-7">
          <div className='form-check form-check-custom form-check-solid'>
            <input
              className='form-check-input'
              type='checkbox'
              {...props.getFieldProps('allowNotification')}
            />
            <label className="form-check-label">Send the new user an email about their account.</label>
          </div>
        </div> */}
          <div className="d-flex justify-content-start gap-3">
            <button type="submit" className="btn btn-secondary">Submit</button>
            <Link to={'/users/list'}> <button type="button" className="btn btn-light">Cancel</button></Link>
          </div>
        </form>)}
      </Formik>
    </>
  )
}

export default AddUser
