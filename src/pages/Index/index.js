import React, { Component } from 'react'
import { Flex, Button, WhiteSpace } from 'antd-mobile'
import "./index.scss"

function Dome() {
    return (
        <div style={{marginTop: '100px'}}>
            这是一个demo组件
        </div>
    )
}


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
                <Button type="primary" onClick={() => this.props.history.push('/hook')}>Hook 页面</Button><WhiteSpace />
            </div>
        )
    }
}