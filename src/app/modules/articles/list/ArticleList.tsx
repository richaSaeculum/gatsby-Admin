import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLayout } from '../../../../_metronic/layout/core'
import { deletePostApi, getPostListApi, updatePostStatusApi } from '../../../api'
import { LocalStorageKeys } from '../../../constants/localstorage'
import { UserType } from '../../../constants/user/user_type'
import { getItem, removeItem, setItem } from '../../../Utils/storage'
import { useAuth } from '../../auth'
import ArticleTable from './articletable/ArticleTable'

const ArticleList = () => {
  let p = getItem(LocalStorageKeys.ARTCILE_PAGE);

  const { auth } = useAuth();
  const { setLoader } = useLayout()
  const [articleData, setArticleData] = useState<any>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [totalArticle, setTotalArticle] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(p || 1);
  const [limitNo, setLimitNo] = useState<number>(10);

  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPage(currentPage);
    getAllPost({ page: currentPage });
    removeItem(LocalStorageKeys.ARTCILE_PAGE);
  }, [])

  useEffect(() => {
    getAllPost({ page: currentPage });
  }, [limitNo])

  const getAllPost = async ({ page }: any) => {
    setLoader(true);
    try {
      let response = await getPostListApi({ page, limit: limitNo });
      if (response && response.status === 200) {
        setTotalPage(parseInt(response.data.pageCount));
        setTotalArticle(parseInt(response.data.totalCount))
        // let a = response?.data?.articles.map((item: any, index: any) => { return ({ ...item, categoryName: getCategoryNameForDisplay(item), rowNo: (page - 1) * limitNo + index + 1 }) })
        let a = response?.data?.articles.map((item: any, index: any) => { return ({ ...item, rowNo: (page - 1) * limitNo + index + 1 }) })
        setArticleData(a);
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoader(false);
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
    setItem(LocalStorageKeys.ARTCILE_PAGE, currentPage)
    navigate(`/articles/edit-article/${row.id}`);
  }

  const onViewRow = (row: any) => {
    setItem(LocalStorageKeys.ARTCILE_PAGE, currentPage)
    navigate(`/articles/preview/${row.id}`);
  }

  const handlePageChange = async (selectedPage: number) => {
    // return
    await getAllPost({ page: selectedPage });
    setItem(LocalStorageKeys.ARTCILE_PAGE, selectedPage);
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
    } 
  }

  return (
    <>
      <div>
        <div className='d-flex justify-content-between align-items-center mb-5'>
          <div>
            {/* <h1 className='fs-2hx fw-bold text-dark mb-0'>Articles</h1> */}
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
          paginationConfig={{ currentPage, totalPage, handlePageChange, totalArticle, limitNo, setLimitNo }}
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
