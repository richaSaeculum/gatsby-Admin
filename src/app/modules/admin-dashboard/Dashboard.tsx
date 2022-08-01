import React, { FC, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ArticleTable from './components/articletable/ArticleTable'
import ListCard from './components/listcard/ListCard'
import StatusCard from './components/statuscard/StatusCard'
import StatusCardGroup from './components/statuscardgroup/StatusCardGroup'

export type listDataType = {
  text: string,
  count: string
}

const listData: Array<listDataType> = [
  {
    text: 'lorem ipsum 1',
    count: '100k+ searches'
  },
  {
    text: 'lorem ipsum 2',
    count: '100k+ searches'
  },
  {
    text: 'lorem ipsum 3',
    count: '100k+ searches'
  },
  {
    text: 'lorem ipsum 4',
    count: '100k+ searches'
  },
  {
    text: 'lorem ipsum 5',
    count: '100k+ searches'
  }, {
    text: 'lorem ipsum 6',
    count: '100k+ searches'
  },
  {
    text: 'lorem ipsum 7',
    count: '100k+ searches'
  },
]

const listData2: Array<listDataType> = [
  {
    text: 'lorem ipsum 1',
    count: '100k+ searches'
  },
  {
    text: 'lorem ipsum 2',
    count: '100k+ searches'
  },
  {
    text: 'lorem ipsum 3',
    count: '100k+ searches'
  },
  {
    text: 'lorem ipsum 4',
    count: '100k+ searches'
  },
  {
    text: 'lorem ipsum 5',
    count: '100k+ searches'
  }, {
    text: 'lorem ipsum 6',
    count: '100k+ searches'
  },
  {
    text: 'lorem ipsum 7',
    count: '100k+ searches'
  },
]

const Dashboard: FC = () => {

  return (
    <>
      <StatusCardGroup />

      <div className='row my-6'>
        <div className='col-md-6'>
          <ListCard
            title={'Top Trends'}
            data={listData}
          />
        </div>
        <div className='col-md-6'>
          <ListCard
            title={'Top Earners'}
            data={listData2}
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
          <ArticleTable />
        </div>
      </div>
    </>
  )
}

export default Dashboard
