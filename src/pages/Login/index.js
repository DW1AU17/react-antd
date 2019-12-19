import React, { Component } from 'react'
import NavHeader from '../../components/NavHeader'
import styles from './index.module.scss'
import { WingBlank, WhiteSpace } from 'antd-mobile'

import { withFormik, Form, Field, ErrorMessage } from 'formik'
// withFormik 高阶组件: 为组件提供状态, 方法, 校验规则
// Form 组件 : withFormik提供方法 handleSubmit , handleReset
// Field 组件 (代替input标签): 自动连接formik, 使用name属性和formik状态进行匹配
// ErrorMessage 组件 : 呈现错误提示

// 导入表单校验schema
import * as Yup from 'yup'


class Login extends Component {
    render() {
        return (
            <div className={styles.login}>
                <NavHeader>登录页面</NavHeader>
                {/* 登录表单 */}
                <WingBlank>
                    <Form>
                        <div className={styles.formItem}>
                            <Field 
                                name="username"
                                placeholder="请输入用户名"
                                className={styles.input}
                            />
                            <ErrorMessage name="username" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formItem}>
                            <Field 
                                name="password"
                                placeholder="请输入密码"
                                className={styles.input}
                            />
                            <ErrorMessage name="password" component="div" className={styles.error} />
                        </div>
                        <button className={styles.submit} type="submit">登 录</button>

                    </Form>


                </WingBlank>
            </div>
        )
    }
}

// 验证规则：
const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/
const REG_PWD = /^[a-zA-Z_\d]{5,12}$/

Login = withFormik({
    // 1. 给表单提供状态 (相当于组件中的state)
    mapPropsToValues: () => ({username: '', password: ''}),
    // 2. 校验规则, 根据 name属性
    validationSchema: Yup.object().shape({
        username: Yup.string()             // 类型
            .required('账号为必填项')       // (未填时提示)
            .matches(REG_UNAME, '长度为5到8位，只能出现数字、字母、下划线'),    // (输入时格式不对时,提示验证规则)
        password: Yup.string()
            .required('密码为必填项')
            .matches(REG_PWD, '长度为5到12位，只能出现数字、字母、下划线')
    }),
    // 3. 提交表单 (Form组件提供方法)
    handleSubmit: (values, {props}) => {
        // 相当于拿到 state, props
        console.log(values, props)
    }




})(Login)

export default Login