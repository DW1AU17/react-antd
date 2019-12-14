import React, { Component } from 'react'
import { Flex } from 'antd-mobile'
import "./index.scss"

export default class Index extends Component {
    state = { visible: false };

    render() {
        return (
            <div className="index">
                <Flex className="search-header">
                    <div onClick={() => this.props.history.push('/citylist')}>
                        <span>杭州</span>
                        <i className="iconfont icon-xiasanjiaoxing"></i>
                    </div>
                    <div>
                        <i className="iconfont icon-sousuo"></i>
                        <span>你想住在哪里?</span>
                    </div>
                </Flex>
            </div>
        )
    }
}