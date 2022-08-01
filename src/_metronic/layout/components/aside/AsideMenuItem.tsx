import {FC} from 'react'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router'
import {checkIsActive, KTSVG, WithChildren} from '../../../helpers'
import {useLayout} from '../../core'

type Props = {
  to: string
  title: string
  icon?: string
  fontIcon?: string
  hasBullet?: boolean
}

const AsideMenuItem: FC<Props & WithChildren> = ({
  children,
  to,
  title,
  icon,
  fontIcon,
  hasBullet = false,
}) => {
  const {pathname} = useLocation()
  const isActive = checkIsActive(pathname, to)
  const {config} = useLayout()
  const {aside} = config

  return (
    <div className='menu-item  menu-state-title-primary'>
      <Link className={'menu-link without-sub'} to={to}>
        {hasBullet && (
          <span className='menu-bullet'>
            <span className='bullet bullet-dot'></span>
          </span>
        )}
        {icon && aside.menuIcon === 'svg' && (
          <span className='menu-icon'>
            <KTSVG path={icon} className='svg-icon-2' />
          </span>
        )}
        {fontIcon && aside.menuIcon === 'font' && <i className={clsx('bi fs-3', fontIcon)}></i>}
        <span className={clsx('menu-title', { 'text-primary': isActive } )}>{title}</span>
      </Link>
      {children}
    </div>
  )
}

export {AsideMenuItem}
