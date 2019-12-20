import React from 'react'
import { Button, WhiteSpace, WingBlank } from 'antd-mobile';

export default class Demo extends React.Component {
    render() {
        return (
            <WingBlank>
                <WhiteSpace /><Button type="primary" onClick={() => this.props.history.push('/login')}>登录</Button><WhiteSpace />
            </WingBlank>
        );
    }
}
