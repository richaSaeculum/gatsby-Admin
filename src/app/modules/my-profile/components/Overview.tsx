/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../auth'

export function Overview() {

  const { currentUser } = useAuth();

  return (
    <>
      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Profile Details</h3>
          </div>

          <Link to='/my-profile/edit' className='btn btn-primary align-self-center'>
            Edit Profile
          </Link>
        </div>

        <div className='card-body p-9'>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Full Name</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{currentUser?.user?.user_first_name + " " + currentUser?.user?.user_last_name}</span>
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Email</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{currentUser?.user?.user_email} </span>
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Username</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{currentUser?.user?.user_name} </span>
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Role</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{currentUser?.user?.user_role}</span>
            </div>
          </div>

          {/* <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              Contact Phone
              <i
                className='fas fa-exclamation-circle ms-1 fs-7'
                data-bs-toggle='tooltip'
                title='Phone number must be active'
              ></i>
            </label>

            <div className='col-lg-8 d-flex align-items-center'>
              <span className='fw-bolder fs-6 me-2'>044 3276 454 935</span>

              <span className='badge badge-success'>Verified</span>
            </div>
          </div> */}
        </div>
      </div>
    </>
  )
}
