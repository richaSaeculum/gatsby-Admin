import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import '../style.scss'
import RichTextEditor, { EditorValue, ToolbarConfig } from 'react-rte';

import Tabledata from '../list/articletable/sample_article.json'
import Editor from './editor/Editor';
import { getCategoriesListApi, getSinglePostApi } from '../../../api';
import { useLayout } from '../../../../_metronic/layout/core';
import axios from 'axios';
import { useAuth } from '../../auth';
import MultiSelect from '../../../components/modal/MultiSelect';


const AddArticle = () => {

  const param = useParams()
  const { setLoader } = useLayout();
  const { wpAuth } = useAuth()
  const wpAuthToken = wpAuth?.token;

  const [category, setCategory] = useState<number | undefined>();
  const [categoryList, setCategoryList] = useState<any>();
  const [title, setTitle] = useState<string | undefined>('');
  const [keyword, setKeyword] = useState<string | undefined>('');
  const [content, setContent] = useState<EditorValue>(RichTextEditor.createEmptyValue())
  const [seoScore, setSeoScore] = useState<number | undefined>();
  const [seoTips, setSeoTips] = useState<string | undefined>('');

  useEffect(() => {
    getCategories();
    const { id } = param;
    if (id) {
      editId(id)
    }
  }, [])

  const getCategories = async () => {
    setLoader(true)
    let response = await getCategoriesListApi({ wpAuthToken });
    if (response && response.status === 200) {
      let arr = response.data;
      console.log(arr)
      arr = arr.map((item:any) => ({ label: item.name, value: item.id }))
      setCategoryList(arr)
      setLoader(false)
    }
  }

  const editId = async (id: string) => {
    let article: any = Tabledata.data.find(item => item.id.toString() === id);
    setCategory(article?.category)
    setTitle(article?.title)
    setKeyword(article?.keyword.toString())
    setContent(RichTextEditor.createValueFromString(article?.content, 'html'))
    setSeoScore(article?.seoScore)
    setSeoTips(article?.seoTips)
  }

  const onChange = (e: ChangeEvent<any>) => {
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

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const keywordArr = keyword?.split(',').filter(a => a !== ' ').map(b => b.trim());
    const data = {
      title: title,
      category: category,
      keyword: keywordArr,
      seoScore: seoScore,
      seoTips: seoTips,
      content: content.toString('html')
    }

    let payload = {
      // date: new Date().toUTCString(),
      // date_gmt: new Date().toUTCString(),
      status: 'draft', // draft or pending review
      password: '', // not needed
      title: 'Post Create Testing',
      content: "<h1>the post content </h1>",
      author: 2,
      excerpt: "<h1>the post content </h1>", //not needed
      featured_media: 1,
      comment_status: 'closed',
      ping_status: 'closed',
      format: 'quote',
      meta: [],
      sticky: false,
      template: '',
      categories: [],
      tags: [],
    }
    const headers = {
      Authorization: `Bearer ${wpAuthToken}`
      // Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZ2F0c2J5LnNhZWN1bHVtc29sdXRpb25zLmNvbSIsImlhdCI6MTY1OTAwNjMyMiwibmJmIjoxNjU5MDA2MzIyLCJleHAiOjE2NTk2MTExMjIsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.VGl_YnAnkKD_merAIXGB8NGnawf1lEiQvRpbMG0Onco`
    }
    let res = await axios.post('https://gatsby.saeculumsolutions.com/wp-json/wp/v2/posts', payload, { headers })
    console.log("final blog", res)
  }

  return (
    <>
      <div className="card-header d-flex justify-content-between align-items-center mb-7">
        <h1 className='mb-0'>Title</h1>
        <button type='button' className='btn btn-secondary'>Preview</button>
      </div>
      <form>
        <div className="row mb-3">
          <label className="col-sm-2 fs-4 col-form-label" htmlFor="Category">Category</label>
          <div className='col-sm-10'>
            <MultiSelect
              options={categoryList}
              onChange={onChange}
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
            <button type="button" className="btn btn-secondary" onClick={onSubmit}>Submit</button> &nbsp;
            <button type="button" className="btn btn-light">Save as Draft</button>
            <Link to={'/articles/list'}> <button type="button" className="btn btn-light">Cancel</button></Link>
          </div>
        </div>
      </form>
    </>
  )
}

export default AddArticle


