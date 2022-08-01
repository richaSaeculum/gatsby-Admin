import React from 'react'
import StatusCard from '../statuscard/StatusCard'

const StatusCardGroup = () => {
  return (
      <div className='row'>
          <StatusCard
              className='card-xl-stretch mb-5 mb-xl-8'
              faIcon='fa-dollar-sign'
              bgColor='secondary'
              value='$5000'
              title='Wallet'
              valueColor='white'
              titleColor='white'
          />
          <StatusCard
              className='card-xl-stretch mb-5 mb-xl-8'
              faIcon='fa-chart-simple'
              value='500'
              title='Total Earned'
              valueColor='dark'
              titleColor='dark'
          />
          <StatusCard
              className='card-xl-stretch mb-5 mb-xl-8'
              faIcon='fa-file'
              value='Transaction Name - $100'
              title='Last Transaction'
              valueColor='dark'
              titleColor='dark'
              layout='col-xl-6 col-md-12'
              summery='8th June - 10:30PM'
          />
      </div>
  )
}

export default StatusCardGroup
