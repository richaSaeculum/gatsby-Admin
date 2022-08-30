import React, { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLayout } from '../../../_metronic/layout/core'
import { getDashboardApi, getPostListApi, getPostOfCurrentMonthApi } from '../../api'
import { useAuth } from '../auth'
import ArticleTable from './components/articletable/ArticleTable'
import EarnersCard from './components/earnerscard/EarnersCard'
import TreandsCard from './components/trendscard/TrendsCard'
import StatusCard from './components/statuscard/StatusCard'

const Dashboard: FC = () => {

  const { auth } = useAuth();
  const { setLoader } = useLayout();
  const [articleList, setArticleList] = useState<any>();
  const [dashboard, setDashboard] = useState<any>();
  const [postCount, setPostCount] = useState<any>();
  const [totalPost, setTotalPost] = useState<any>();

  const getData = async () => {
    try {
      setLoader(true);
      const res = await getDashboardApi({ token: auth?.token });
      if (res && res.status === 200) {
        setDashboard(res.data);
      }
      const response = await getPostListApi({ token: auth?.token });
      if (response && response.status === 200) {
        setArticleList(response.data.articles);
        setTotalPost(response.data['articles-count'])
      }

      const currentRes = await getPostOfCurrentMonthApi({ token: auth?.token })
      if (currentRes && currentRes.status === 200) {
        setPostCount(currentRes.data['articles-count'])
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <>
      <div className='row'>
        <StatusCard
          className='card-xl-stretch mb-5 mb-xl-8'
          faIcon='fa-chart-simple'
          bgColor='secondary'
          value={dashboard?.getEarnings?.highest_earnings}
          title='Highest Earnings'
          valueColor='white'
          titleColor='white'
        />
        <StatusCard
          className='card-xl-stretch mb-5 mb-xl-8'
          faIcon='fa-file'
          value={totalPost}
          title='Total Articles'
          valueColor='dark'
          titleColor='dark'
        />
        <StatusCard
          className='card-xl-stretch mb-5 mb-xl-8'
          faIcon='fa-dollar-sign'
          value={dashboard?.getEarnings?.total_earnings}
          title='Earnings'
          valueColor='dark'
          titleColor='dark'
        />
        <StatusCard
          className='card-xl-stretch mb-5 mb-xl-8'
          faIcon='fa-file'
          value={postCount}
          title='Articles'
          valueColor='dark'
          titleColor='dark'
        />
      </div>

      <div className='row my-6'>
        <div className='col-md-6'>
          <TreandsCard
            title={'Top Trends'}
            data={articleList}
          />
        </div>
        <div className='col-md-6'>
          <EarnersCard
            title={'Top Earners'}
            data={dashboard}
          />
        </div>
      </div>

      <div className='row'>
        <div className='col-12'>
          <div className='d-flex justify-content-between align-items-center my-5 '>
            <div>
              <h1 className='fs-2hx fw-bold text-dark'>Top Articles</h1>
            </div>
            <Link to={'/articles/add-article'}>
              <button type='button' className='btn btn-secondary'>
                Add Article
              </button>
            </Link>
          </div>
          <ArticleTable
            data={articleList}
          />
        </div>
      </div>
    </>
  )
}

export default Dashboard
