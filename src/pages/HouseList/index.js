import React, { Component } from 'react'
import { Flex, ListView } from 'antd-mobile'
import './index.scss'
import axios from 'axios';

const dataSource = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2,   // 将数据进行比较
});

export default class HouseList extends Component {

    state = {
        dataSource,
        houselist: [],
        pageNum: 1,       // 起始数
        pageSize: 7,      // 每页几条
        isLoading: true,
        hasMore: true
    }

    componentDidMount() {
        this.getHouseList()
    }
    getHouseList = async () => {
        let { pageNum, pageSize, houselist } = this.state
        let res = await axios.get("/city/house_list", { params: { pageNum, pageSize } })
        if (res.data.houseList.length === 0) {
            return this.setState({
                hasMore: false
            })
        }
        setTimeout(() => {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows([...houselist, ...res.data.houseList]),   // 数据添加到实例中
                houselist: [...houselist, ...res.data.houseList],
                pageNum: pageNum + 1,
                isLoading: false,
                hasMore: true
            })
        },750)
        
    }

    onEndReached = () => {
        console.log('又开始渲染数据了')
        this.state.isLoading && this.getHouseList()
    }

    render() {
        const row = (rowData, sectionID, rowID) => {
            return (
                <div className="item pd10 bb-eee" key={rowData.id}>
                    <Flex>
                        <div className="left">
                            <img src={rowData.img} alt="" />
                        </div>
                        <Flex className="right pd0-10" direction="column" align="start" justify="between">
                            <p className="aline">{rowData.name}</p>
                            <p className="color-666 fs-12">{rowData.describe}</p>
                            <div>
                                <span className="red mr10 fs-14">{rowData.price}</span>
                                <span className="color-666 fs-12">{rowData.unitPrice}</span>
                            </div>
                        </Flex>
                    </Flex>
                </div>
            )
        }
        return (
            <ListView
                dataSource={this.state.dataSource}  // 初始化数据 必须是ListView.DataSource实例
                renderFooter={() => (<div style={{ textAlign: 'center' }}>{this.state.hasMore ? 'Loading...' : '老铁没数据了'}</div>)}
                renderRow={row}       // 渲染每一项
                className="houselist"
                pageSize={4}        // 下一次渲染的行数
                useBodyScroll
                onScroll={() => this.setState({ isLoading: true })}
                // scrollRenderAheadDistance={100}      // 一个行接近屏幕范围多少像素之内的时候，就开始渲染这一行
                onEndReached={this.onEndReached}      // 再次获取数据
                onEndReachedThreshold={10}          // 距离底部临界值, 触发 onEndReached
            />
        )
    }
}