import React from 'react'
// import { KTSVG } from '../../../../../../_metronic/helpers'
import { KTSVG } from '../../../../../_metronic/helpers'

import './statuscard.style.css'


type Props = {
    className: string
    faIcon: string
    title: string
    bgColor?: string
    titleColor?: string
    value: string
    valueColor?: string
    layout?: string
    summery?: string
}

const StatusCard: React.FC<Props> = ({
    className,
    faIcon,
    bgColor = 'white',
    title,
    titleColor,
    value,
    valueColor,
    layout = 'col-xl-3 col-md-6',
    summery = ''
}) => {
    return (
        <div className={`${layout}`}>
            <div className={`card bg-${bgColor} ${className} statuscard h-100`}>
                <div className='card-body d-flex align-items-center gap-9 h-100'>
                    {/* <KTSVG path={svgIcon} className={`svg-icon-${iconColor} svg-icon-3x ms-n1`} /> */}
                    <i className={`fa-solid fa-3x ${faIcon}`} ></i>
                    <div>
                        <div className={`text-${titleColor} fs-3 fw-semibold mb-2`}>{title}</div>
                        <div className={`fw-bold text-${valueColor} fs-1`}>{value}</div>
                        <div className=''>{summery} </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StatusCard 
