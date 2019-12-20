import React, { Component } from 'react'
import axios from 'axios'
import { TabBar } from 'antd-mobile'
import { Route } from 'react-router-dom'
import Index from '../Index'
import Msg from '../Msg'
import HouseList from '../HouseList'
import Mine from '../Mine'
import './index.scss'

export default class Home extends Component {
    state = {
        selectedTab: this.props.location.pathname,
        tabBarList: []
    }
    componentDidMount() {
        this.getTabBarList()
    }
    // 获取标签栏的数据
    getTabBarList = () => {
        axios.get('/home/tabbar_list').then(res => {
            this.setState({
                tabBarList: res.data.data.list
            })
        })
    }
    // 渲染标签栏
    renderTabBarList() {
        return this.state.tabBarList.map(item => (
            <TabBar.Item
                title={item.name}
                key={item.id}
                icon={<i className={`iconfont ${item.icon}`} />}
                selectedIcon={<i className={`iconfont ${item.icon}`} />}
                selected={this.state.selectedTab === item.path}
                onPress={() => {
                    this.props.history.push(item.path)
                    this.setState({
                        selectedTab: item.path,
                    });
                }}
            />
        ))
    }

    render() {
        return (
            <div className="home" style={{height: '100%'}}>
                <Route exact path="/home" component={Index} />  
                <Route path="/home/msg" component={Msg} />
                <Route path="/home/house" component={HouseList} />
                <Route path="/home/mine" component={Mine} />
                {/* 底部标签栏 */}
                <div className="tab-bar">
                    <TabBar
                        unselectedTintColor="#949494"
                        tintColor="#33A3F4"
                        barTintColor="white"
                    >
                        {this.renderTabBarList()}
                    </TabBar>
                </div>

            </div>
        )
    }
}