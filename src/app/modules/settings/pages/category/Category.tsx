import { ChangeEvent, useEffect, useState } from 'react';

import { Modal } from 'react-bootstrap';

import { useLayout } from '../../../../../_metronic/layout/core';
import { useAuth } from '../../../auth';

import { addCategoryApi, deleteCategoryApi, getCategoriesListApi, getSingleCategoryApi, updateCategoryApi } from '../../../../api';

import ConfirmationModal from '../../../../components/modal/ConfirmationModal';
import CategoryTable from './categorytable/CategoryTable';

const Category = () => {

  const { auth } = useAuth();
  const { setLoader } = useLayout();
  const [categories, setCategories] = useState();
  const [open, setOpen] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [title, setTitle] = useState<string | ''>('');
  const [category, setCategory] = useState<any>(null);
  const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false);
  const [confirmationInfo, setConfirmationInfo] = useState<any>();
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    getCategories({ page: currentPage });
  }, [])

  const confirmationCallback = (success: boolean, info: any) => {
    if (success && info.action === 'confirmation') {
      setConfirmationOpen(false);
      onCloseModal();
      getCategories({ page: currentPage });
      setCategory(null);
    } else if (info.action === 'alert') {
      setConfirmationOpen(false);
      onCloseModal();
      getCategories({ page: currentPage });
      setCategory(null);
    } else if (info.action === 'error') {
      setConfirmationOpen(false);
    }
  }

  const toggleModal = (info?: any) => {
    setConfirmationInfo(info);
    setConfirmationOpen(!confirmationOpen);
  }

  const getCategories = async ({ page }: any) => {
    setLoader(true);
    let limit = 5;
    const response = await getCategoriesListApi({ token: auth?.token, page, limit });
    if (response && response.status === 200) {
      setTotalPage(parseInt(response.data.categoriesPageCount))
      let a = response?.data?.categories.map((item: any, index: any) => { return ({ ...item, rowNo: (page - 1) * limit + index + 1 }) })
      setCategories(a);
      setLoader(false);
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value != null) {
      setIsError(false);
      setTitle(e.target.value);
    } else {
      setIsError(true);
    }
  }

  const handleSubmit = async () => {
    setLoader(true);
    if (title == '') { setIsError(true); return }
    let payload = { name: title }, response: any;
    if (category && category.id) {
      response = await updateCategoryApi({ token: auth?.token, payload, id: category.id });
      if (response && response.status === 200) {
        const info = { action: 'alert', message: 'Category successfully updated' }
        toggleModal(info);
      } else if (response && response.status === 500) {
        const info = { action: 'error', message: 'Category with same name is already exists' }
        toggleModal(info);
      } else {
        const info = { action: 'error', message: response.message };
        toggleModal(info);
      }
    } else {
      response = await addCategoryApi({ token: auth?.token, payload });
      if (response && response.status === 200) {
        const info = { action: 'alert', message: 'Category successfully added ' }
        toggleModal(info);
      } else if (response && response.status === 500) {
        const info = { action: 'error', message: 'Category with same name is already exists' }
        toggleModal(info);
      } else {
        const info = { action: 'error', message: response.message };
        toggleModal(info);
      }
    }
    setIsError(false);
    setLoader(false);
  }

  const onEdit = async (row: any) => {
    setLoader(true);
    const res = await getSingleCategoryApi({ token: auth?.token, id: row.id });
    if (res && res.status === 200) {
      setEditId(res.data.id);
      setTitle(res.data.name);
      setOpen(true);
      setCategory(res.data);
      setLoader(false);
    }
  }

  const onDelete = async (row: any) => {
    setLoader(true);
    const res = await deleteCategoryApi({ token: auth?.token, id: row.id });
    if (res && res.status === 200 && res.data.deleted) {
      getCategories({ page: currentPage });
    }
  }

  const onCloseModal = () => {
    setOpen(false);
    setIsError(false);
    setTitle('');
    setEditId(null);
    setLoader(false);
  }

  const handlePageChange = async (selectedPage: number) => {
    // return
    await getCategories({ page: selectedPage });
    setCurrentPage(selectedPage);
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
        <div>
          <h1 className='fs-2hx fw-bold text-dark mb-0'>Category</h1>
        </div>
        <button type='button' className='btn btn-secondary' onClick={() => {
          setOpen(true);
          setCategory(null);
          setTitle('');
        }}>
          Add Category
        </button>
      </div>

      <Modal
        show={open}
        onHide={onCloseModal}
        centered
      >
        <div className="modal-content bg-gray-200">
          <div className="modal-header">
            <h2 className="fw-bolder">{editId ? 'Update' : 'Add'} Category</h2>
            <button type='button' className="btn btn-icon btn-sm btn-active-icon-primary" onClick={onCloseModal}>
              <span className="svg-icon svg-icon-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mh-50px">
                  <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="currentColor"></rect>
                  <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="currentColor"></rect>
                </svg>
              </span>
            </button>
          </div>
          <div className="modal-body scroll-y mx-3">
            <form className="form" onSubmit={e => e.preventDefault()}>
              <div className="row">
                <label htmlFor="title" className="col-sm-3 fs-5 col-form-label">Category</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    autoFocus
                    className="form-control"
                    placeholder="Enter your name here"
                    value={title}
                    onChange={handleChange}
                  />
                  {
                    isError && <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>Category is required</div>
                    </div>
                  }
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type='button' className="btn btn-secondary btn-sm" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </Modal>

      <CategoryTable
        onEditRow={onEdit}
        onDeleteRow={onDelete}
        data={categories}
        paginationConfig={{ totalPage, handlePageChange }}
      />
    </>
  )
}

export default Category


// function toKebabCase(str: string) {
//     return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => '-' + chr).trim();
// }
