import React, { ReactElement } from 'react';
import './earnerscard.style.css'

type Props = {
	data: any,
	title: string
}

const EarnersCard = ({ data, title }: Props) => {
	const renderList = () => {
		const list: Array<ReactElement> = [];
		data?.topEarnersList?.forEach((row: any, index: any) =>
			list.push(
				<li key={index} className="list-group-item bg-transparent d-flex justify-content-between align-items-center p-5">
					<span>
						<span className='fs-3 fw-bold'>{index + 1}. &nbsp;</span>
						<span className='fs-4 fw-semibold'>{row.title}</span>
					</span>
					<small className='fw-bold fs-7'>{row.amount}</small>
				</li>)
		)
		return list;
	}

	return (
		<>
			<div>
				<h1 className='fs-2hx fw-bold text-dark mb-9'>{title}</h1>
			</div>
			<div className="card custom-shadow">
				<div className="card-body">
					<ul className="list-group list-group-flush">
						{renderList()}
						{/* <li className="list-group-item d-flex justify-content-between align-items-center py-5">
                            <span>
                                <span className='fs-3 fw-bold'>1. &nbsp;</span>
                                <span className='fs-4 fw-semibold'>A second item</span>
                            </span>
                            <small className='fw-bold'>100k+ searches</small>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center py-5">
                            <span>
                                <span className='fs-3 fw-bold'>1. &nbsp;</span>
                                <span className='fs-4 fw-semibold'>A second item</span>
                            </span>
                            <small className='fw-bold'>100k+ searches</small>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center py-5">
                            <span>
                                <span className='fs-3 fw-bold'>1. &nbsp;</span>
                                <span className='fs-4 fw-semibold'>A second item</span>
                            </span>
                            <small className='fw-bold'>100k+ searches</small>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center py-5">
                            <span>
                                <span className='fs-3 fw-bold'>1. &nbsp;</span>
                                <span className='fs-4 fw-semibold'>A second item</span>
                            </span>
                            <small className='fw-bold'>100k+ searches</small>
                        </li> */}
					</ul>
				</div>
			</div>

		</>
	)
}

export default EarnersCard
