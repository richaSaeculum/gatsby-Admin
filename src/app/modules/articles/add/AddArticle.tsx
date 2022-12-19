import { FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { decode } from 'html-entities';
import Select from 'react-select';

import { useLayout } from '../../../../_metronic/layout/core';
import { useAuth } from '../../auth';

import ConfirmationModal from '../../../components/modal/ConfirmationModal';

import { addPostApi, getCategoriesListApi, getSinglePostApi, updatePostApi } from '../../../api';

import Editor from './editor/Editor';

import '../style.scss';
import { ArticleStatusType } from '../../../constants/articles/article_status_type';

const customStyles = {
  menu: (provided: any, state: any) => ({
    ...provided,
    color: '#2B2B40',
    backgroundColor: '#ffffff',
    border: '1px solid #313B54',
    // borderColor: state.isSelected ? '#313B54' : '#313B54',
    borderRadius: '0.475rem',
    zIndex: '9000'
  }),

  control: (provided: any, state: any) => ({
    ...provided,
    border: '1px solid #313B54',
    boxShadow: 'none',
    minHeight: 'initial',
    padding: '6px 8px'
  }),

  container: (provided: any, state: any) => ({
    ...provided,
    color: '#2B2B40',
    borderRadius: '0.475rem',
    boxShadow: 'none',
    minHeight: 'initial'
  }),

  valueContainer: (provided: any, state: any) => ({
    ...provided,
    padding: '0px'
  }),

  dropdownIndicator: (provided: any, state: any) => ({
    ...provided,
    padding: '0px 8px',
  }),

  clearIndicator: (provided: any, state: any) => ({
    ...provided,
    padding: '0px 8px'
  }),

  indicatorSeparator: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: '#313B54'
  }),

  input: (provided: any, state: any) => ({
    ...provided,
    margin: '0px',
    fontSize: '16px'
  }),
}

const AddArticle = () => {

  const param = useParams()
  const { setLoader } = useLayout();
  const { auth } = useAuth()
  const navigate = useNavigate();

  const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false)
  const [confirmationInfo, setConfirmationInfo] = useState<any>()

  const [category, setCategory] = useState<any>();
  const [categoryList, setCategoryList] = useState<any>();
  const [title, setTitle] = useState<string | undefined>('');
  const [keyword, setKeyword] = useState<string | undefined>('');
  const [content, setContent] = useState<any>()
  const [seoScore, setSeoScore] = useState<number | undefined>();
  const [seoTips, setSeoTips] = useState<string | undefined>('');
  const [id, setId] = useState<string>();
  const ref = useRef(false);
  const [titleError, setTitleError] = useState<Boolean>(false);
  const [contentError, setContentError] = useState<Boolean>(false);
  const [view, setView] = useState<boolean>(false);

  useEffect(() => {
    if (!ref.current) {
      ref.current = true;
      return
    }
    if (!confirmationOpen) {
      setConfirmationOpen(!confirmationOpen);
    }
  }, [confirmationInfo])

  useEffect(() => {
    getCategories();
  }, [])

  useEffect(() => {
    const { id } = param;
    if (id) {
      editId(id);
      setId(id);
    }
  }, [])

  const getCategories = async () => {
    setLoader(true);
    let response: any = await getCategoriesListApi({ page: 1, limit: 100 });
    if (response && response.status === 200) {
      let arr = response.data.categories;
      arr = arr.map((item: any) => ({ label: item.name, value: item.id }))
      setCategoryList(arr);
    }
    setLoader(false);
  }

  const editId = async (id: any) => {
    let response: any = await getSinglePostApi({ id });
    if (response && response.status === 200) {
      const { content, id, title, status, categories } = response.data;
      if (status !== ArticleStatusType.DRAFT && status !== ArticleStatusType.REJECT) {
        setView(true);
      }
      let arr: any = [];
      //set category array from embed data in wp
      categories.forEach((item: any) => {
        arr.push({ label: item.category, value: item.categoryId });
      })
      setCategory(arr);
      setTitle(decode(title));
      setContent(content);
      // setContent(content.rendered);
    }
  }

  const confirmationCallback = (success: boolean, info: any) => {
    setConfirmationOpen(false);
    if (success && info.action === 'confirmation') {
      setLoader(true);
      submitForm(info);
    } else if (info.action === 'alert') {
      setConfirmationOpen(!confirmationOpen);
      setLoader(false);
      navigate('/articles/list');
    } else if (info.action === 'error') {
      setConfirmationOpen(!confirmationOpen);
      setLoader(false);
    }
  }

  const toggleModal = (info?: any) => {
    setConfirmationInfo(info);
    setConfirmationOpen(!confirmationOpen);
  }

  const onChange = (e: any) => {
    const { name, value } = e.target;
    if (name == 'title' && value !== '') {
      setTitleError(false)
    }

    if (name == 'content' && value !== '<p><br></p>') {
      setContentError(false)
    }

    switch (name) {
      case 'category':
        setCategory(value);
        break;
      case 'title':
        setTitle(value);
        break;
      case 'keyword':
        setKeyword(value);
        break;
      case 'content':
        setContent(value);
        break;
      case 'seoScore':
        setSeoScore(parseInt(value));
        break;
      case 'seoTips':
        setSeoTips(value);
        break;
      default:
        break;
    }
  }

  const handleSubmit = async (e: FormEvent, status: any) => {
    e.preventDefault();
    let valid = true
    if (title == '') {
      setTitleError(true);
      valid = false;
    }
    if (content.toString('html') === "<p><br></p>") {
      setContentError(true)
      valid = false
    }
    if (valid) {
      let info = { action: 'confirmation', message: 'Are You Sure To Save?', status: status }
      toggleModal(info);
    }
  }

  const submitForm = async (info: any) => {
    const keywordArr = keyword?.split(',').filter(a => a !== ' ').map(b => b.trim());
    let payload = generatePayload(info);
    let response;
    if (id) {
      response = await updatePostApi({ id, payload });
      if (response && response.status === 200) {
        const info = { action: 'alert', message: 'Article successfully updated' }
        toggleModal(info);
        return
      } else {
        const info = { action: 'error', message: response.message };
        toggleModal(info);
      }
    } else {
      response = await addPostApi({ payload });
      if (response && response.status === 200) {
        const info = { action: 'alert', message: 'Article successfully added' }
        toggleModal(info);
        return
      } else {
        const info = { action: 'error', message: response.message };
        toggleModal(info);
      }
    }
  }

  const generatePayload = (info: any) => {

    // let payload = {
    //   // date: new Date().toUTCString(),
    //   // date_gmt: new Date().toUTCString(),
    //   id: id ? id : undefined,
    //   status: 'draft', // draft or pending review
    //   password: '', // not needed
    //   title: title,
    //   content: content.toString('html'),
    //   author: 1,
    //   excerpt: "", //not needed
    //   featured_media: 1,
    //   comment_status: 'closed',
    //   ping_status: 'closed',
    //   format: 'quote',
    //   meta: [],
    //   sticky: false,
    //   template: '',
    //   categories: category.map((item: any) => item.value),
    //   tags: [],
    // }

    let payload = {
      title: title,
      excerpt: "Test post excerpt",
      content: content.toString('html'),
      categories: category?.map((item: any) => item.value),
      status: info.status
    }
    return payload
  }

  const onPreviewClick = () => {
    navigate(`/articles/preview/${id}`);
  }

  return (
    <>
      {confirmationOpen && <ConfirmationModal
        open={confirmationOpen}
        confirmationInfo={confirmationInfo}
        onClose={() => { setConfirmationOpen(false); navigate('/articles/list'); }}
        handleConfirmationMessage={confirmationCallback}
      />}
      <div className="card-header d-flex justify-content-between align-items-center mb-7">
        <h1 className='mb-0'>Title</h1>
        {id && <button type='button' className='btn btn-secondary' onClick={onPreviewClick}>Preview</button>}
      </div>
      <form>
        <div className="row mb-3">
          <label className="col-sm-2 fs-4 col-form-label" htmlFor="Category">Category</label>
          <div className='col-sm-10'>
            <Select
              isMulti
              value={category}
              options={categoryList}
              onChange={value => onChange({ target: { name: 'category', value: value } })}
              styles={customStyles}
              isDisabled={view}
            />
          </div>
        </div>
        {/* <div className="row mb-3">
          <label className="col-sm-2 fs-4 col-form-label" htmlFor="Category">Category</label>
          <div className='col-sm-10'>
            <select name='category' className="form-select" id="Category" value={category} onChange={onChange}>
              {
                categoryList && categoryList?.map((item: any, index: number) => <option key={index} value={item.id}>{item.name}</option>)
              }
            </select>
          </div>
        </div> */}
        <div className="row mb-3">
          <label htmlFor="title" className="col-sm-2 fs-4 col-form-label">Title</label>
          <div className="col-sm-10">
            <input name='title'
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={onChange}
              disabled={view}
            />
            {titleError && (<div className='fv-plugins-message-container'>
              <div className='fv-help-block'>Title is required</div>
            </div>)}
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="keyword" className="col-sm-2 fs-4 col-form-label">Keyword</label>
          <div className="col-sm-10">
            <input
              name='keyword'
              type="text"
              className="form-control"
              id="keyword"
              value={keyword}
              onChange={onChange}
              disabled={view}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="content" className="col-sm-2 fs-4 col-form-label">Content</label>
          <div className="col-sm-10">
            <Editor value={content} onChange={onChange} disabled={view} />
            {contentError && (<div className='fv-plugins-message-container'>
              <div className='fv-help-block'>Content is required</div>
            </div>)}
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="seoScore" className="col-sm-2 fs-4 col-form-label">SEO Score</label>
          <div className="col-sm-10">
            <input name='seoScore' type="number" className="form-control" id="seoScore" value={seoScore} onChange={onChange} />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="seoTips" className="col-sm-2 fs-4 col-form-label">SEO Tips</label>
          <div className="col-sm-10">
            <textarea name='seoTips' className="form-control" id="seoTips" value={seoTips} onChange={onChange} />
          </div>
        </div>
        <div className="row mt-8">
          <div className="col-sm-2 fs-4 col-form-label"></div>
          <div className="col-sm-10">
            {
              !view && (
                <>
                  <button type="button" className="btn btn-secondary" onClick={(e) => handleSubmit(e, ArticleStatusType.PENDING)}>Submit</button> &nbsp;
                  <button type="button" className="btn btn-light" onClick={(e) => handleSubmit(e, ArticleStatusType.DRAFT)} >Save as Draft</button>
                </>
              )
            }
            <button type="button" className="btn btn-light" onClick={() => { navigate(-1) }}>{!view ? 'Cancel' : 'Back'}</button>
          </div>
        </div>
      </form>
    </>
  )
}

export default AddArticle


