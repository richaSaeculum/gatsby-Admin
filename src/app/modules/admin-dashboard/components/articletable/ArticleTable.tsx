/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { ReactElement } from 'react'
import { KTSVG, toAbsoluteUrl } from '../../../../../_metronic/helpers'
import Tabledata from './sample_article.json'
import { decode } from 'html-entities';

type Props = {
    data?: any
}

const ArticleTable = ({ data }: Props) => {

    const renderTablerow = () => {
        let arr: Array<ReactElement> = [];
        data?.forEach((row: any, index: any) => {
            arr.push(<tr key={index + 1}>
                <td>
                    <span className='fw-semibold d-block fs-7'>
                        {index + 1}
                    </span>
                </td>
                <td>
                    <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                        {decode(row.title.rendered)}
                    </a>
                </td>
                <td>
                    <span className='fw-semibold d-block fs-7'>
                        {/* {row.views} */}
                        not found
                    </span>
                </td>
                <td>
                    <span className='fw-semibold d-block fs-7'>
                        {/* {row.ctr} */}
                        not found
                    </span>
                </td>
                {/* <td className='text-end'>
                                    <a
                                        href='#'
                                        className='btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4 me-2'
                                    >
                                        View
                                    </a>
                                    <a
                                        href='#'
                                        className='btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4'
                                    >
                                        Edit
                                    </a>
                                </td> */}
            </tr>)
        })

        return arr
    }

    return (
        <div className={`card`}>
            {/* begin::Body */}
            <div className='card-body py-3'>
                {/* begin::Table container */}
                <div className='table-responsive'>
                    {/* begin::Table */}
                    <table className='table align-middle gs-0 gy-4'>
                        {/* begin::Table head */}
                        <thead>
                            <tr className='fw-bold text-muted'>
                                <th className='rounded-start'>No.</th>
                                <th className='min-w-100'>Title</th>
                                <th>Views</th>
                                <th>CTR</th>
                                {/* <th className='min-w-150px'>Rating</th> */}
                                {/* <th className='min-w-200px text-end'>Actions</th> */}
                            </tr>
                        </thead>
                        {/* end::Table head */}
                        {/* begin::Table body */}
                        <tbody>
                            {renderTablerow()}
                        </tbody>
                        {/* end::Table body */}
                    </table>
                    {/* end::Table */}
                </div>
                {/* end::Table container */}
            </div>
            {/* begin::Body */}
        </div>
    )
}

export default ArticleTable 
