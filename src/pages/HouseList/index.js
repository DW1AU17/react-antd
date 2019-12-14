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
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows([...houselist, ...res.data.houseList]),
            houselist: [...houselist, ...res.data.houseList],
            pageNum: pageNum + 1,
            isLoading: false,
            hasMore: true
        })
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
                dataSource={this.state.dataSource}
                renderFooter={() => (<div style={{ textAlign: 'center' }}>{this.state.hasMore ? 'Loading...' : '老铁没数据了'}</div>)}
                renderRow={row}
                className="houselist"
                pageSize={4}
                useBodyScroll
                onScroll={() => this.setState({ isLoading: true })}
                scrollRenderAheadDistance={100}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={10}
            />
        )
    }
}