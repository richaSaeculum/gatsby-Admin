import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../style.scss'
import RichTextEditor, { EditorValue, ToolbarConfig } from 'react-rte';

import Editor from './editor/Editor';
import { addPostApi, getCategoriesListApi, getSinglePostApi, updatePostApi } from '../../../api';
import { useLayout } from '../../../../_metronic/layout/core';
import { useAuth } from '../../auth';
import ConfirmationModal from '../../../components/modal/ConfirmationModal';
import Select from 'react-select'

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
  const { wpAuth } = useAuth()
  const wpAuthToken = wpAuth?.token;
  const navigate = useNavigate();

  const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false)
  const [confirmationInfo, setConfirmationInfo] = useState<any>()

  const [category, setCategory] = useState<any>();
  const [categoryList, setCategoryList] = useState<any>();
  const [title, setTitle] = useState<string | undefined>('');
  const [keyword, setKeyword] = useState<string | undefined>('');
  const [content, setContent] = useState<EditorValue>(RichTextEditor.createEmptyValue())
  const [seoScore, setSeoScore] = useState<number | undefined>();
  const [seoTips, setSeoTips] = useState<string | undefined>('');
  const [id, setId] = useState<string>();
  const ref = useRef(false);

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
    let response: any = await getCategoriesListApi({ wpAuthToken });
    if (response && response.status === 200) {
      let arr = response.data;
      arr = arr.map((item: any) => ({ label: item.name, value: item.id }))
      setCategoryList(arr);
    }
    setLoader(false);
  }

  const editId = async (id: any) => {
    let response: any = await getSinglePostApi({ id });
    if (response && response.status === 200) {
      const { content, id, title } = response.data;
      let arr: any = [];
      if (response.data._embedded.hasOwnProperty('wp:term')) {
        if (response.data._embedded['wp:term'].length > 0) {
          response.data._embedded['wp:term'][0].forEach((item: any) => {
            // uncategorized tag is not displayed when user edit articles (id=1 for uncategorized)
            if (item.id != 1)
              arr.push({ label: item.name, value: item.id });
          })
        }
      }
      setCategory(arr);
      setTitle(title.rendered);
      setContent(RichTextEditor.createValueFromString(content.rendered, 'html'));
    }
  }

  const confirmationCallback = (success: boolean, info: any) => {
    setConfirmationOpen(false);
    if (success && info.action === 'confirmation') {
      setLoader(true);
      submitForm();
    } else if (info.action === 'alert' || info.action === 'error') {
      setConfirmationOpen(!confirmationOpen);
      setLoader(false);
      navigate('articles/list');
      return
    }
  }

  const toggleModal = (info?: any) => {
    setConfirmationInfo(info);
    setConfirmationOpen(!confirmationOpen);
  }

  const onChange = (e: any) => {
    const { name, value } = e.target;

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let info = { action: 'confirmation', message: 'Are You Sure To Save?' }
    toggleModal(info);
  }

  const submitForm = async () => {
    const keywordArr = keyword?.split(',').filter(a => a !== ' ').map(b => b.trim());
    const data = {
      title: title,
      category: category,
      keyword: keywordArr,
      seoScore: seoScore,
      seoTips: seoTips,
      content: content.toString('html')
    }

    let payload = generatePayload();
    if (id) {
      let response: any = await updatePostApi({ id, payload });
      if (response && response.statusText && response.statusText === 'Success') {
        const info = { action: 'alert', message: 'Article successfully updated' }
        toggleModal(info);
        return
      } else {
        const info = { action: 'error', message: response.message };
        toggleModal(info);
      }
    } else {
      let response = await addPostApi({ payload });
      if (response && response.statusText && response.statusText === 'Success') {
        const info = { action: 'alert', message: 'Article successfully added' }
        toggleModal(info);
        return
      } else {
        const info = { action: 'error', message: response.message };
        toggleModal(info);
      }
    }
  }

  const generatePayload = () => {

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
      content: content.toString('html'),
      categories: category.map((item: any) => item.value),
    }
    console.log(payload);

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
      <div className="card-header d-flex justify-content-between align-items-center mb-7">
        <h1 className='mb-0'>Title</h1>
        <button type='button' className='btn btn-secondary'>Preview</button>
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
            <input name='title' type="text" className="form-control" id="title" value={title} onChange={onChange} />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="keyword" className="col-sm-2 fs-4 col-form-label">Keyword</label>
          <div className="col-sm-10">
            <input name='keyword' type="text" className="form-control" id="keyword" value={keyword} onChange={onChange} />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="content" className="col-sm-2 fs-4 col-form-label">Content</label>
          <div className="col-sm-10">
            <Editor value={content} onChange={onChange} />
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
            <button type="button" className="btn btn-secondary" onClick={handleSubmit}>Submit</button> &nbsp;
            <button type="button" className="btn btn-light">Save as Draft</button>
            <Link to={'/articles/list'}> <button type="button" className="btn btn-light">Cancel</button></Link>
          </div>
        </div>
      </form>
    </>
  )
}

export default AddArticle


