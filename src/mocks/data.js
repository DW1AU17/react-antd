import Mock from 'mockjs'
import houseImg0 from '../assets/houseImg/london.png'
import houseImg1 from '../assets/houseImg/Berlin.png'
import houseImg2 from '../assets/houseImg/Paris.png'
import houseImg3 from '../assets/houseImg/Toronto.png'
// const Mock = require('mockjs')
let Random = Mock.Random

// home页数据
let data = Mock.mock({
    'list|4': [{
        'id|+1': 1,
        'name|+1': ['首页', '消息', '必看好房', '我的'],
        'icon|+1': ['icon-home', 'icon-xiaoxi1', 'icon-loufang', 'icon-wode'],
        'path|+1': ['/home', '/home/msg', '/home/house', '/home/mine']
    }]
})

// citylist页数据
let cityIndex = []
for (let i = 65; i < 91; i++) {
    cityIndex.push(String.fromCharCode(i));
}

let cityList = {}
for (let i = 0; i < 26; i++) {
    cityList[cityIndex[i]] = []
    for (let k = 0; k < Math.ceil(Math.random() * 3); k++) {
        cityList[cityIndex[i]].push(Mock.mock({
            name: Random.city(),
            value: Random.id()
        }))
    }
}

// houselist房源列表页数据
let houseList = []
for (let i = 0; i < 30; i++) {
    houseList.push(Mock.mock({
        id: Random.id(),
        name: Random.cparagraph(1, 3),
        'describe|1': ["4室8厅/50m/难/凯旋门公寓","2室3厅/33m/难/多伦多总统套房","9室6厅/149m/难/地中海","2室9厅/311m/难/林肯公园隔壁小区"],
        price: Random.natural(120, 350) + '万',
        unitPrice: Random.natural(8000, 100000) + '元/m',
        'img|1': [houseImg0, houseImg1, houseImg2, houseImg3]
    }))
}


export {
    data,
    cityIndex,
    cityList,
    houseList
}

