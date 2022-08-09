import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLayout } from '../../../../_metronic/layout/core'
import {  deletePostApi, getPostListApi } from '../../../api'
import { useAuth } from '../../auth'
import ArticleTable from './articletable/ArticleTable'

const ArticleList = () => {

  const { wpAuth } = useAuth();
  const wpAuthToken = wpAuth?.token
  const { setLoader } = useLayout()
  const [articleData, setArticleData] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    getAllPost();
  }, [])

  const getAllPost = async () => {
    setLoader(true)
    let response = await getPostListApi({ wpAuthToken });
    if (response && response.status === 200) {
      let a = response?.data.map((item: any) => { return ({ ...item, categoryName: getCategoryNameForDisplay(item) }) })
      setArticleData(a)
      setLoader(false)
    }
  }

  const getCategoryNameForDisplay = (item: any) => {
    if (item._embedded.hasOwnProperty('wp:term')) {
      let arr: any = [];
      if (item._embedded['wp:term'].length > 0) {
        item._embedded['wp:term'][0].forEach((item: any) => arr.push(item.name))
      }
      return arr
    }
  }

  const onDeleteRow = async (row: any) => {
    setLoader(true)
    let response = await deletePostApi({wpAuthToken, id: row.id});
    if (response && response.status === 200 && response.data.deleted){
      getAllPost();
    }
  }

  const onEditRow = (row: any) => {
    if (row.id) {
      navigate(`/articles/edit-article/${row.id}`);
    }
  }

  return (
    <>
      <div>
        <div className='d-flex justify-content-between align-items-center mb-5'>
          <div>
            <h1 className='fs-2hx fw-bold text-dark mb-0'>Articles</h1>
          </div>
          <div className='d-flex justify-content-between align-items-center gap-3'>
            <Link to={'/articles/add-article'}>
              <button type='button' className='btn btn-secondary'>
                Add Article
              </button>
            </Link>
            <button type='button' className='btn btn-secondary'>
              Filter
            </button>
          </div>
        </div>

        <ArticleTable
          onEditRow={onEditRow}
          onDeleteRow={onDeleteRow}
          data={articleData}
        />
      </div>
    </>
  )
}

export default ArticleList
