import React, { Component } from 'react'
import axios from 'axios'
import { List, AutoSizer } from 'react-virtualized'
import './index.scss'
import NavHeader from '../../components/NavHeader/index.jsx'

export default class CityList extends Component {
    state = {
        cityIndex: [],
        cityList: [],
        cityLoading: true,
        activeIndex: 0
    }

    async componentDidMount() {
        await this.getCityInfo()    // 获取城市数据

        // 第八步: 再得到数据后 计算总高
        this.listRef.current.measureAllRows()
    }
    // 第一步: 获取数据
    getCityInfo = async () => {
        let res = await axios.get("/city/select_info")
        let { cityIndex, cityList } = res.data
        this.setState({
            cityIndex,
            cityList
        })
    }
    // 第二步: 渲染每一项
    rowRenderer = ({ index, key, style }) => {
        let { cityIndex, cityList } = this.state
        let letter = cityIndex[index]
        let list = cityList[letter]
        return (
            <div key={key} style={style} className="city-letter">
                <div className="title">{letter}</div>
                {list.map(item => (
                    <div className="item" key={item.value}>
                        {item.name}
                    </div>
                ))}
            </div>
        )
    }
    // 第三步: 动态计算每一项的高度
    calcHeight = ({ index }) => {
        let { cityIndex, cityList } = this.state
        let list = cityList[cityIndex[index]]
        return 36 + 50 * list.length
    }

    // 第六步: 滚动时改变右侧活动项
    onRowsRendered = ({ startIndex }) => {
        let { activeIndex } = this.state
        if (activeIndex === startIndex) return 
        this.setState({
            activeIndex: startIndex
        })
    }

    // 第五步： 渲染右侧城市导航
    renderCityIndex = () => {
        let { cityIndex, activeIndex } = this.state
        return cityIndex.map((item,index) => (
            <li 
                key={item} 
                className={index === activeIndex ? 'active' :''}
                onClick={() => this.toScrollCurrentIndex(index)}
            >{ item }</li>
        ))
    }

    listRef = React.createRef()
    // 第七步: 点击右侧滚动到当前位置
    toScrollCurrentIndex = (index) => {
        // 1. 要操作List组件, 用到ref, 获取List组件的实例
        // 2. 操作实例的 scrollToRow 方法 (Public Methods)    
        this.listRef.current.scrollToRow(index)
        // 注意: bug:  因为没有事先计算高度, 点击后跳转的位置会不准确
        //       解决: 在数据加载完后调用 实例的 measureAllRows 方法
    } 

    render() {
        let { cityIndex } = this.state
        return (
            <div className="citylist">
                <NavHeader>城市列表</NavHeader>
                {/* 第四步: 使用AutoSizer高阶组件, 默认情况List组件中的是不支持宽度和高度设置100%的 */}
                <AutoSizer>                                  
                    {({ height, width }) => (
                        <List
                            ref={this.listRef}                     // 第7步
                            width={width}
                            height={height}
                            rowCount={cityIndex.length}            // 第0步
                            rowHeight={this.calcHeight}            // 第3步
                            rowRenderer={this.rowRenderer}         // 第2步
                            onRowsRendered={this.onRowsRendered}   // 第6步
                            scrollToAlignment="start"              // 第8步, 滚动到头部位置 (因为默认是展示到页面区域中)
                        />
                    )}
                </AutoSizer>
                {/* 第五步： 渲染右侧的字母导航 */}
                <ul className="city-number">{this.renderCityIndex()}</ul>          
            </div>
        )
    }

}