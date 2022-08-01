import React, { useEffect, useState } from 'react'
import CategoryTable from './categorytable/CategoryTable'
import { Modal } from 'react-bootstrap'
import { useAuth } from '../../../auth'
import { addCategoryApi, deleteCategoryApi, getCategoriesListApi, getSingleCategoryApi, updateCategoryApi } from '../../../../api'
import { useLayout } from '../../../../../_metronic/layout/core'


const Category = () => {

    const { wpAuth } = useAuth();
    const { setLoader } = useLayout()
    const [categories, setCategories] = useState();
    const [open, setOpen] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [title, setTitle] = useState<string | ''>('')
    const [wpAuthtoken, setWpAuthToken] = useState<string | ''>('')
    const [category, setCategory] = useState<any>(null);

    useEffect(() => {
        // console.log(wpAuth.token)
        if (wpAuth && wpAuth.token) {
            setWpAuthToken(wpAuth.token)
        }
    }, [])

    const onEdit = async (row: any) => {
        setLoader(true)
        const res = await getSingleCategoryApi({ id: row.id })
        // console.log(res)
        if (res && res.status === 200) {
            setTitle(res.data.name)
            setOpen(true)
            setCategory(res.data)
            setLoader(false)
        }
    }

    useEffect(() => {
        setLoader(true)
        getCategories()
    }, [])

    const getCategories = async () => {
        const res = await getCategoriesListApi();
        if (res && res.status === 200) {
            res.data.pop();
            setCategories(res.data);
            setLoader(false)
        }
    }
    const onSubmit = async () => {
        if (title == '') { setIsError(true); return }
        let payload, response;

        if (category && category.id) {
            payload = { ...category, name: title, slug: title.toLowerCase() }
            response = await updateCategoryApi({ wpAuthtoken, payload })
        } else {
            payload = {
                discription: '',
                name: title,
                slug: title.toLocaleLowerCase(),
                meta: [],
                parent: 0,
            }
            response = await addCategoryApi({ wpAuthtoken, payload });
        }

        if (response && response.statusText === 'Success') {
            getCategories();
            setCategory(null)
            setTitle('');
            setOpen(false);
        }
        setIsError(false);
    }

    const onDelete = async (row: any) => {
        setLoader(true)
        const res = await deleteCategoryApi({ id: row.id, wpAuthtoken })
        if (res && res.status === 200 && res.data.deleted) {
            getCategories()
        }
    }

    const onCloseModal = () => {
        setOpen(false);
        setIsError(false);
    }

    return (
        <div>

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
                        <h2 className="fw-bolder">Add Category</h2>
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
                                        onChange={e => { setTitle(e.target.value); }}
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
                        <button type='button' className="btn btn-secondary btn-sm" onClick={onSubmit}>
                            Submit
                        </button>
                    </div>
                </div>
            </Modal>

            <CategoryTable
                onEditRow={onEdit}
                onDeleteRow={onDelete}
                data={categories}
            />
        </div>
    )
}

export default Category


// function toKebabCase(str: string) {
//     return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => '-' + chr).trim();
// }
