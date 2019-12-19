import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { data, cityIndex, cityList, houseList, token } from './data'

export default {
    start() {
        let mock = new MockAdapter(axios)
        mock.onGet('/home/tabbar_list').reply(() => {
            return new Promise((resolve) => {
                resolve([200,{ data }])
            })
        })
        mock.onGet('/city/select_info').reply(() => {
            return new Promise((resolve) => {
                resolve([200,{ cityIndex, cityList }])
            })
        })
        mock.onGet('/city/house_list').reply(config => {
            let {pageNum, pageSize} = config.params
            return new Promise(resolve => {
                resolve([200, { houseList: houseList.slice(pageSize * pageNum - pageSize, pageNum * pageSize) }])
            })
        })
        mock.onGet('/user/login').reply(config => {
            let { username, password } = config.params
            return new Promise(resolve => {
                if (username === 'adu' && password === '0117') {
                    resolve([200, { token }])
                } else {
                    resolve([202, {msg: '账号或者密码错误'}])
                }

            })
        })
    }
}