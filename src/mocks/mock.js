import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { data, cityIndex, cityList, houseList } from './data'

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
    }
}