/* eslint-disable jsx-a11y/anchor-is-valid */
import { Dispatch, ReactElement, SetStateAction, useState } from 'react';

import { decode } from 'html-entities';
import clsx from 'clsx';

import ConfirmationModal from '../../../../components/modal/ConfirmationModal';
import Pagination from '../../../../components/pagination/Pagination';
import { KTSVG } from '../../../../../_metronic/helpers';

type PaginationConfig = {
  totalPage: number
  handlePageChange: (page: number) => void
  totalArticle: number
  limitNo: number
  setLimitNo: Dispatch<SetStateAction<number>>
}

type Props = {
  onEditRow: (row: any) => void
  onDeleteRow: (row: any) => void
  onViewRow: (row: any) => void
  paginationConfig: PaginationConfig
  data?: any
}

const ArticleTable = ({ onEditRow, onDeleteRow, onViewRow, data, paginationConfig }: Props) => {

  const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false);
  const [deleteRow, setDeleteRow] = useState<any>();
  const confirmationInfo = {
    action: 'confirmation',
    message: 'Do you want to delete this post?'
  }

  const confirmationCallback = (success: boolean) => {
    if (success) {
      onDeleteRow(deleteRow);
      setConfirmationOpen(false);
    } else {
      setConfirmationOpen(!confirmationOpen);
    }
  }

  const actionClick = (row: any, confirmation: boolean) => {
    if (confirmation) {
      toggleModal(row);
    }
  }

  const toggleModal = (row?: any) => {
    setConfirmationOpen(!confirmationOpen);
    setDeleteRow(row);
  }

  const renderTablerow = () => {
    let arr: Array<ReactElement> = [];
    data?.forEach((row: any, index: number) => {
      arr.push(<tr key={index + 1}>
        <td>
          <span className='fw-semibold d-block fs-7'>
            {/* {index + 1} */}
            {row.rowNo}
          </span>
        </td>
        <td>
          <a href='#' className='text-dark fw-bold fs-6'>
            {decode(row.title.rendered)}
          </a>
        </td>
        <td>
          <span className='fw-semibold d-block fs-7 mw-100'>
            <ul className='list-unstyled mb-0'>
              {row.categoryName && row.categoryName.map((item: string, index: number) => (<li key={item + index}>{item}</li>))}
            </ul>
          </span>
        </td>
        <td>
          <span className={clsx('badge text-capitalize', {
            'badge-light-success': row.status === 'publish',
            'badge-light-primary': row.status === 'draft',
            'badge-light-warning': row.status === 'pending',
            'badge-light-danger': row.status === 'rejected',
          })}>
            {row.status}
          </span>
        </td>
        <td>
          <span className='fw-semibold d-block fs-7'>
            {/* {row.views} */}
            -
          </span>
        </td>
        <td>
          <span className='fw-semibold d-block fs-7'>
            {/* {row.ctr} */}
            -
          </span>
        </td>
        <td className='text-end d-flex'>

          <div className='d-flex justify-content-end flex-shrink-0'>
            {/* View Icon */}
            <button
              className='btn btn-icon btn-light-info btn-active-color-info btn-active-icon-gray-100 btn-sm me-1' // btn-active-light-info
              onClick={() => { onViewRow(row) }}
            >
              <KTSVG
                path='/media/icons/duotune/general/view.svg'
                className='svg-icon-3'
              />
            </button>
            {/* Edit Icon btn-bg-light btn-active-color-primary */}
            <button
              // className='btn btn-icon btn-light-primary btn-active-color-primary btn-active-icon-gray-100 btn-sm me-1' // btn-active-light-primary 
              className='btn btn-active-icon-gray-100 btn-icon btn-light-twitter btn-sm me-1' // btn-active-light-primary 
              onClick={() => { onEditRow(row) }}
              disabled={(row.status === 'pending' || row.status === 'publish')}
            >
              <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
            </button>
            {/* Delete Icon */}
            < button
              className='btn btn-icon btn-light-danger btn-active-color-danger btn-active-icon-gray-100 btn-sm' // btn-active-light-danger
              onClick={() => { actionClick(row, true) }}
              disabled={row.status === 'publish'}
            >
              <KTSVG
                path='/media/icons/duotune/general/gen027.svg'
                className='svg-icon-3'
              />
            </button>
          </div>

          {/* <a
            href='#'
            className='btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4 me-2'
          >
            View
          </a> */}
          {/* <button
            className={clsx('btn btn-secondary btn-sm px-4 me-2', {
              'disabled': row.status !== 'draft'
            })}
            onClick={() => { onEditRow(row) }}
          >
            Edit
          </button> */}
          {/* <button
            className={clsx('btn btn-secondary btn-sm px-4 me-2')}
            onClick={() => { onEditRow(row) }}
          >
            {row.status === 'draft' ? "Edit" : "View"}
          </button>

          <button
            className='btn btn-light  btn-sm px-4'
            onClick={() => { actionClick(row, true) }}
          >
            Delete
          </button> */}
        </td>
      </tr >)
    })

    return arr
  }

  const handlePageClick = (a: any) => {
    paginationConfig.handlePageChange(a.selected + 1);
  }

  return (
    <>
      {confirmationOpen && <ConfirmationModal
        open={confirmationOpen}
        confirmationInfo={confirmationInfo}
        onClose={() => { setConfirmationOpen(false) }}
        handleConfirmationMessage={confirmationCallback}
      />}
      <div className={`card`}>
        <div className='card-body py-3'>
          <div className='table-responsive'>
            {/* begin::Table */}
            <table className='table align-middle gs-0 gy-4'>
              {/* begin::Table head */}
              <thead>
                <tr className='fw-bold text-muted'>
                  <th className='rounded-start'>No.</th>
                  <th className='min-w-100'>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Views</th>
                  <th>CTR</th>
                  <th className='text-center'>Actions</th>
                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>
                {renderTablerow()}
              </tbody>
              {/* end::Table body */}
            </table>
            {/* end::Table */}
          </div>
          {/* end::Table container */}
          <div className="card-footer d-flex justify-content-between align-items-center flex-wrap">
            <select
              value={paginationConfig.limitNo}
              onChange={(e: any) => { paginationConfig?.setLimitNo(e.target.value); }}
              className="form-control form-select form-control-sm font-weight-bold mr-4 border-0 bg-light"
              style={{ width: '75px' }}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
            <div className="d-flex align-items-center py-3">
              <Pagination
                handlePageClick={handlePageClick}
                totalPage={paginationConfig.totalPage}
              />
              <span className="text-muted ms-2">Displaying {(paginationConfig.limitNo > paginationConfig.totalArticle) ? paginationConfig.totalArticle : paginationConfig.limitNo} of {paginationConfig.totalArticle} records</span>
            </div>
          </div>
        </div>
        {/* begin::Body */}
      </div>
    </>
  )
}

export default ArticleTable 
