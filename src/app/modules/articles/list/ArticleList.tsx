import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLayout } from '../../../../_metronic/layout/core'
import { deletePostApi, getPostListApi, updatePostStatusApi } from '../../../api'
import { UserType } from '../../../constants/user/user_type'
import { useAuth } from '../../auth'
import ArticleTable from './articletable/ArticleTable'

const ArticleList = () => {

  const { auth } = useAuth();
  const { setLoader } = useLayout()
  const [articleData, setArticleData] = useState<any>();
  const [totalPage, setTotalPage] = useState<number>(0);
  const [totalArticle, setTotalArticle] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limitNo, setLimitNo] = useState<number>(5);

  const navigate = useNavigate();

  useEffect(() => {
    getAllPost({ page: 1 });
  }, [limitNo])

  const getAllPost = async ({ page }: any) => {
    setLoader(true);
    let response = await getPostListApi({ page, limit: limitNo });
    if (response && response.status === 200) {
      setTotalPage(parseInt(response.data.pageCount));
      setTotalArticle(parseInt(response.data.totalCount))
      // let a = response?.data?.articles.map((item: any, index: any) => { return ({ ...item, categoryName: getCategoryNameForDisplay(item), rowNo: (page - 1) * limitNo + index + 1 }) })
      let a = response?.data?.articles.map((item: any, index: any) => { return ({ ...item, rowNo: (page - 1) * limitNo + index + 1 }) })
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
    let response = await deletePostApi({ id: row.id });
    if (response && response.status === 200) {
      getAllPost({ page: currentPage });
    }
  }

  const onEditRow = (row: any) => {
    navigate(`/articles/edit-article/${row.id}`);
  }

  const onViewRow = (row: any) => {
    navigate(`/articles/preview/${row.id}`);
  }

  const handlePageChange = async (selectedPage: number) => {
    // return
    await getAllPost({ page: selectedPage });
    setCurrentPage(selectedPage);
  }

  const handlePostStatus = async (a: any) => {
    setLoader(true)
    try {
      let payload = { id: a.data.id, status: a.type }
      let response = await updatePostStatusApi({ payload })
      if (response && response.status === 200) {
        getAllPost({ page: currentPage });
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoader(false)
    }
  }

  return (
    <>
      <div>
        <div className='d-flex justify-content-between align-items-center mb-5'>
          <div>
            <h1 className='fs-2hx fw-bold text-dark mb-0'>Articles</h1>
          </div>
          {auth?.user?.user_role === UserType.AUTHOR && (<div className='d-flex justify-content-between align-items-center gap-3'>
            <Link to={'/articles/add-article'}>
              <button type='button' className='btn btn-secondary'>
                Add Article
              </button>
            </Link>
            {/* <button type='button' className='btn btn-secondary'>
              Filter
            </button> */}
          </div>)}
        </div>

        {articleData?.length > 0 ? <ArticleTable
          onEditRow={onEditRow}
          onDeleteRow={onDeleteRow}
          onViewRow={onViewRow}
          handlePostStatus={handlePostStatus}
          data={articleData}
          paginationConfig={{ totalPage, handlePageChange, totalArticle, limitNo, setLimitNo }}
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
