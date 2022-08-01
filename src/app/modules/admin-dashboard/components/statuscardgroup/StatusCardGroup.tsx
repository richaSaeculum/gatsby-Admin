import React from 'react'
import StatusCard from '../statuscard/StatusCard'

const StatusCardGroup = () => {
  return (
      <div className='row'>
          <StatusCard
              className='card-xl-stretch mb-5 mb-xl-8'
              faIcon='fa-chart-simple'
              bgColor='secondary'
              value='$50,000'
              title='Highest Earnings'
              valueColor='white'
              titleColor='white'
          />
          <StatusCard
              className='card-xl-stretch mb-5 mb-xl-8'
              faIcon='fa-file'
              value='500'
              title='Total Articles'
              valueColor='dark'
              titleColor='dark'
          />
          <StatusCard
              className='card-xl-stretch mb-5 mb-xl-8'
              faIcon='fa-dollar-sign'
              value='$200'
              title='Earnings'
              valueColor='dark'
              titleColor='dark'
          />
          <StatusCard
              className='card-xl-stretch mb-5 mb-xl-8'
              faIcon='fa-file'
              value='300'
              title='Articles'
              valueColor='dark'
              titleColor='dark'
          />
      </div>
  )
}

export default StatusCardGroup
