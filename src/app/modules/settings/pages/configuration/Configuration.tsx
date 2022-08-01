import React, { ChangeEvent, FormEvent, useState } from 'react'

const Configuration = () => {

  const [margin, setMargin] = useState<string | ''>('10');
  const [finalMargin, setFinalMargin] = useState<string | ''>('10');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMargin(e.target.value)
  }

  const onSubmit = () => {
    setFinalMargin(margin);
    setMargin('')
  }

  return (
    <>
      <div className='d-flex justify-content-between align-items-center mb-5'>
        <h1 className='fs-2hx fw-bold text-dark mb-0'>Configuration</h1>
      </div>
      <div className='card'>
        <div className="card-body">
          <form className="form fv-plugins-bootstrap5 mb-6 fv-plugins-framework" action="#">
            <div className="fv-row mb-7">
              <label className="fs-3 fw-semibold form-label mt-3">Payout Margin (in %)</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter margin here"
                value={margin}
                onChange={handleChange}
              />
            </div>
            <div>
              <button type="button" className='btn btn-secondary' onClick={onSubmit}>Save</button>
            </div>
          </form>

          <div className='d-flex align-items-center gap-4'>
            <h3 className='text-dark mb-0'>Current Payout Margin: </h3>
            <h2 className='mb-0 fw-bold'> {finalMargin}%</h2>
          </div>
        </div>
      </div>
    </>
  )
}

export default Configuration
