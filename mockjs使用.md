##  使用 mock.js 模拟 axios请求 本地数据

1. 安装 `npm i mockjs axios`
        `npm i axios-mock-adapter`  配置器: 把两者关联

2. 创建数据文件: list.js
    - 引入 `import Mock from 'mockjs'`
    - 初始化数据 `let list = []`
    - 数据添加随机值 list.push(Mock.mock({  `可通过遍历生成`
                            id: Mock.Random.guid(),       // 随机id
                            title: Mock.Random.first(),   // 随机标题
                            ...      
                            (`通过Mock.Random工具, 生成各种随机数据`)
                        }))
    - 导出 `export default list`

3. 创建模拟接口文件: mock.js
    - 引入 `import axios from 'axios'`
           `import Mock from 'mockjs'`
           `import MockAdapter from 'axios-mock-adapter'`
           `import List from './list'`  => 数据也引入

      export default { start() {} }
    - start() {                             // 初始化函数
        let mock = new MockAdapter(axios)   // 创建实例 (关联两者)
        `模拟get请求`
        mock.onGet('/todo/list').reply(() => { })
        `模拟post请求`
        mock.onPost('/todo/list').reply(() => { })
        ...
    }
    - 在模拟的函数中 返回 `promise对象`
    mock.onGet('/todo/list').reply(config => {   -->  config (前端传递的值) 是json字符串 
        ...,                        -->  ( 根据传参 ) 处理list数据
        return new Promise((resolve, reject) => {
            resolve([200, {        --> 返回的状态码
                list: dealList      --> 返回的新数据
            }])
        })
    })

    - 导出这个对象 
    export default {
        start() {
            ...
        }
    }

4. 全局加载mock
    - 在`main.js`文件中
    - `import Mock from './mock/mock'`   -> 全局加载mock
    - `Mock.start() `  ->  初始化函数, 本地设定接口,就可以在全局使用了

5. 调用axios , 发送请求

axios.get('/list/todo', {params})