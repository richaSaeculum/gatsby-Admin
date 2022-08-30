import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLayout } from '../../../../_metronic/layout/core'
import { deletePostApi, getDashboardApi, getPostListApi } from '../../../api'
import { useAuth } from '../../auth'
import ArticleTable from './articletable/ArticleTable'

const ArticleList = () => {

  const { auth } = useAuth();
  const { wpAuth } = useAuth();
  const wpAuthToken = wpAuth?.token
  const { setLoader } = useLayout()
  const [articleData, setArticleData] = useState<any>();
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const navigate = useNavigate();

  useEffect(() => {
    getAllPost({ page: currentPage });
  }, [])

  const getAllPost = async ({ page }: any) => {
    setLoader(true);
    let limit = 5;
    let response = await getPostListApi({ token: auth?.token, page, limit });
    if (response && response.status === 200) {
      setTotalPage(parseInt(response.data.pageCount))
      let a = response?.data?.articles.map((item: any, index: any) => { return ({ ...item, categoryName: getCategoryNameForDisplay(item), rowNo: (page - 1) * limit + index + 1 }) })
      setArticleData(a)
      setLoader(false)
    }
  }

  function getCategoryNameForDisplay(item: any) {
    if (item._embedded.hasOwnProperty('wp:term')) {
      let arr: any = [];
      if (item._embedded['wp:term'].length > 0) {
        item._embedded['wp:term'][0].forEach((item: any) => arr.push(item.name));
      }
      return arr
    }
  }

  const onDeleteRow = async (row: any) => {
    setLoader(true)
    let response = await deletePostApi({ token: auth?.token, id: row.id });
    if (response && response.status === 200) {
      getAllPost({ page: currentPage });
    }
  }

  const onEditRow = (row: any) => {
    if (row.id) {
      navigate(`/articles/edit-article/${row.id}`);
    }
  }

  const handlePageChange = async (selectedPage: number) => {
    // return
    await getAllPost({ page: selectedPage });
    setCurrentPage(selectedPage);
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

        {articleData?.length > 0 ? <ArticleTable
          onEditRow={onEditRow}
          onDeleteRow={onDeleteRow}
          data={articleData}
          paginationConfig={{ totalPage, handlePageChange }}
        /> :
          <div className={`card`}>
            <div className='card-body py-3'>
              <h4 className='mb-0 text-center'>No record found</h4>
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default ArticleList
