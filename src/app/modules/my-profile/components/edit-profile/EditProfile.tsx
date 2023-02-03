import React, { useState, useEffect } from 'react'
import { toAbsoluteUrl } from '../../../../../_metronic/helpers'
import * as Yup from 'yup'
import { Formik, } from 'formik'
import { fileUploadApi } from '../../../../api'
import Utils from '../../../../Utils'
import { useAuth } from '../../../auth'

const initialValues = {
  id: '',
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  website: '',
  facebook: '',
  instagram: '',
  twitter: '',
  linkedin: '',
  role: '',
  bio: '',
}

const profileDetailsSchema = Yup.object().shape({
  id: Yup.string(),
  username: Yup.string(),
  email: Yup.string().email("Invalid email address format"),
  firstName: Yup.string().required('Firstname is required'),
  lastName: Yup.string().required('Lastname is required'),
  website: Yup.string().nullable(),
  facebook: Yup.string(),
  instagram: Yup.string(),
  twitter: Yup.string(),
  linkedin: Yup.string(),
  role: Yup.string(),
  bio: Yup.string(),
})

const EditProfile: React.FC = () => {
  const [data, setData] = useState<any>(initialValues);
  const [imgUrl, setImgUrl] = useState<any>({});
  const [avtarError, setAvtarError] = useState<string>("");

  const { currentUser } = useAuth();

  useEffect(() => {
    setData({
      ...data,
      id: currentUser?.user?.user_id,
      username: currentUser?.user?.user_name,
      email: currentUser?.user?.user_email,
      firstName: currentUser?.user?.user_first_name,
      lastName: currentUser?.user?.user_last_name,
      website: currentUser?.user?.user_website ? currentUser?.user?.user_website : '',
      userimage: currentUser?.user?.user_image,
      bio: '',
      role: currentUser?.user?.user_role,
      facebook: '',
      instagram: '',
      twitter: '',
      linkedin: '',
    })
  }, [])

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any, actions: any) => {
    console.log(values, "values");

    let social = [
      {
        type: "twitter",
        username: values.twitter
      },
      {
        type: "linkedin",
        username: values.linkedin
      },
      {
        type: "instagram",
        username: values.instagram
      },
      {
        type: "facebook",
        username: values.facebook
      }
    ]

    console.log(social, "social")

    // submitForm(info)
    // toggleModal(info)
  }

  const fileChange = (event: any) => {
    const file = event.target.files && event.target.files[0];
    let validators = {
      allowedExtensions: ['png', 'jpg', 'pdf', 'jpeg'],
      maxFileSize: 1,
    }
    // validate file extar validations
    const error: any = Utils.Common.imageFileValidators(file, validators)
    if (error) {
      // SHOW ERROR
      let errMsg: any = {
        "minsize": `File is too small. file size must not be smaller than ${error?.error?.required} mb.`,
        "maxsize": `File is too large. file size must not be larger than ${error?.error?.required} mb.`,
        "extention": `Please upload with an allowed file types. Allowed file types: ${error?.error?.required}.`,
      }
      setAvtarError(errMsg[error.type])
      return;
    } else {
      setAvtarError("")
    }

    uploadFile(file);
  }

  async function uploadFile(file: any) {
    const imgPayload = new FormData();
    imgPayload.append('file', file);
    let a = {
      ...imgUrl,
      "avatar": "https://c.ndtvimg.com/2023-01/v93ipjco_flights-grounded-us_625x300_11_January_23.jpg"
    }
    setImgUrl({ ...a });
    return
    const res = await fileUploadApi({ payload: imgPayload });
    console.log(res)
    if (res && res.status === 200) {
      let a = {
        ...imgUrl,
        "avatar": res.data.file_path
      }
      setImgUrl(a);
    }
  }

  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#kt_account_profile_details'
        aria-expanded='true'
        aria-controls='kt_account_profile_details'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Profile Details</h3>
        </div>
      </div>

      <div id='kt_account_profile_details' className='collapse show'>
        <Formik
          initialValues={data}
          validationSchema={profileDetailsSchema}
          enableReinitialize={true}
          onSubmit={handleSubmit}>
          {props => (<form onSubmit={props.handleSubmit} noValidate className='form'>
            <div className='card-body border-top p-9'>
              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>Avatar</label>
                <div className='col-lg-8'>
                  {/* <div
                    className='image-input image-input-outline'
                    data-kt-image-input='true'
                    style={{ backgroundImage: `url(${toAbsoluteUrl('/media/avatars/blank.png')})` }}
                  >
                    <div
                      className='image-input-wrapper w-125px h-125px'
                      style={{ backgroundImage: `url(${toAbsoluteUrl("/media/avatars/blank.png")})` }}
                    ></div>
                  </div> */}

                  <div className="position-relative">
                    <div
                      className='image-input image-input-outline'
                      data-kt-image-input='true'
                      style={{ backgroundImage: `url(${toAbsoluteUrl('/media/avatars/blank.png')})` }}
                    >
                      <div className={`image-input ${!imgUrl.avatar && "image-input-empty"}`} data-kt-image-input="true">

                        <div className="image-input-wrapper w-125px h-125px" style={{
                          backgroundImage: `url(${imgUrl.avatar ? imgUrl.avatar : toAbsoluteUrl("/media/avatars/blank.png")})`
                        }}>
                        </div>

                        <label className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="change">
                          <i className="bi bi-pencil-fill fs-7"></i>
                          <input type="file" name="profile_avatar" onChange={fileChange} />
                          <input type="hidden" name="avatar_remove" />
                        </label>

                        <span className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" onClick={() => { setImgUrl({}) }} data-kt-image-input-action="remove">
                          <i className="bi bi-x fs-2"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{avtarError}</div>
                  </div>
                </div>
              </div>

              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label required fw-bold fs-6'>Full Name</label>

                <div className='col-lg-8'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <input
                        type='text'
                        className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                        placeholder='First name'
                        {...props.getFieldProps('firstName')}
                      />
                      {props.touched.firstName && props.errors.firstName && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{props.errors.firstName}</div>
                        </div>
                      )}
                    </div>

                    <div className='col-lg-6 fv-row'>
                      <input
                        type='text'
                        className='form-control form-control-lg form-control-solid'
                        placeholder='Last name'
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
              </div>

              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>
                  <span className='required'>Email</span>
                </label>

                <div className='col-lg-8 fv-row'>
                  <input
                    type='text'
                    disabled={true}
                    className='form-control form-control-lg form-control-solid'
                    placeholder='Email'
                    {...props.getFieldProps('email')}
                  />
                  {props.touched.email && props.errors.email && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{props.errors.email}</div>
                    </div>
                  )}
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>
                  <span className='required'>Username</span>
                </label>

                <div className='col-lg-8 fv-row'>
                  <input
                    type='text'
                    disabled={true}
                    className='form-control form-control-lg form-control-solid'
                    placeholder='Username'
                    {...props.getFieldProps('username')}
                  />
                  {props.touched.username && props.errors.username && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{props.errors.username}</div>
                    </div>
                  )}
                </div>
              </div>

              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>
                  <span className=''>Website</span>
                </label>

                <div className='col-lg-8 fv-row'>
                  <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    placeholder='Website'
                    {...props.getFieldProps('website')}
                  />
                  {props.touched.website && props.errors.website && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{props.errors.website}</div>
                    </div>
                  )}
                </div>
              </div>

              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>
                  <span className=''>Bio</span>
                </label>

                <div className='col-lg-8 fv-row'>
                  <textarea
                    className='form-control  form-control-solid mb-3'
                    rows={3}
                    data-kt-element='input'
                    placeholder='Type here...'
                    {...props.getFieldProps('bio')}
                  ></textarea>
                </div>
              </div>

              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>
                  <span className=''>Social Media</span>
                </label>

                <div className='col-lg-8 fv-row'>
                  <div className='row'>
                    <div className='col-12 fv-row mb-6'>
                      <div className="input-group input-group-solid">
                        <div className="input-group-prepend w-50px">
                          <div className='input-group-text justify-content-center' style={{
                            background: "#f0f0f0fe",
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                          }}>
                            <span><i className="fab fa-facebook-f"></i></span>
                          </div>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=''
                          {...props.getFieldProps('facebook')}
                        />
                      </div>
                    </div>
                    <div className='col-12 fv-row mb-6'>
                      <div className="input-group input-group-solid">
                        <div className="input-group-prepend w-50px">
                          <div className='input-group-text justify-content-center' style={{
                            background: "#f0f0f0fe",
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                          }}>
                            <span><i className="fab fa-instagram"></i></span>
                          </div>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=''
                          {...props.getFieldProps('instagram')}
                        />
                      </div>
                    </div>
                    <div className='col-12 fv-row mb-6'>
                      <div className="input-group input-group-solid">
                        <div className="input-group-prepend w-50px">
                          <div className='input-group-text justify-content-center' style={{
                            background: "#f0f0f0fe",
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                          }}>
                            <span><i className="fab fa-twitter"></i></span>
                          </div>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=''
                          {...props.getFieldProps('twitter')}
                        />
                      </div>
                    </div>
                    <div className='col-12 fv-row mb-6'>
                      <div className="input-group input-group-solid">
                        <div className="input-group-prepend w-50px">
                          <div className='input-group-text justify-content-center' style={{
                            background: "#f0f0f0fe",
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                          }}>
                            <span><i className="fab fa-linkedin"></i></span>
                          </div>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=''
                          {...props.getFieldProps('linkedin')}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='card-footer d-flex justify-content-end py-6 px-9'>
              <button type='submit' className='btn btn-primary' disabled={loading}>
                {!loading && 'Save Changes'}
                {loading && (
                  <span className='indicator-progress' style={{ display: 'block' }}>
                    Please wait...{' '}
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </button>
            </div>
          </form>)}
        </Formik>
      </div>
    </div>
  )
}

export { EditProfile }
