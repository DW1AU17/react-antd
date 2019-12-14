import React from 'react'
import { NavBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import styles from './index.module.scss'

function NavHeader({ history, children }) {
    return (
        <NavBar
            className={styles.navHeader}
            mode="light"
            icon={<i className="iconfont icon-icon_arrow_left" />}
            onLeftClick={() => history.go(-1)}
        >{children}</NavBar>
    )
    
}
// 如果是lei组件 , 直接写在静态方法中
NavHeader.propTypes = {
    children: PropTypes.string.isRequired
}

export default withRouter(NavHeader)



