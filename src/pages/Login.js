import React, { useState } from 'react'
import 'antd/dist/antd.css'
import { Card, Input, Button, Spin, message } from 'antd'
import { UserOutlined, KeyOutlined } from '@ant-design/icons'
import '../static/Login.css'
import axios from 'axios'
import { baseUrl } from '../config/apiUrl'
import qs from 'qs'

function Login(props) {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const checkLogin = () => {
        setIsLoading(true)
        if(!username) {
            message.error('用户名不能为空！')
            return false
        } else if(!password) {
            message.error('密码不能为空！')
            return false
        }
        let dataProps = {
            userName: username,
            password: password
        }
        axios({
            method: 'post',
            url: `${baseUrl}/checkLogin`,
            data: qs.stringify(dataProps),
            withCredentials: true
        }).then((res) => {
            setIsLoading(false)
            if(res.data.success) {
                localStorage.setItem('openId', res.data.data)
                props.history.push('/index')
            } else {
                message.error('用户名或密码错误')
            }
            console.log(res)
        })
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }
    return (
        <div className="login-div">
            <Spin tip="Loading..." spinning={isLoading}>
                <Card title="Blog Admin System" bordered={true} style={{width: 400}}>
                    <Input
                        id="username"
                        size="large"
                        placeholder="Enter you username"
                        prefix={<UserOutlined style={{color: 'rgba(0,0,0,25)'}}/>}
                        onChange={(e)=>{setUserName(e.target.value)}}
                    />
                    <br/><br/>
                    <Input.Password
                        id="password"
                        size="large"
                        placeholder="Enter your password"
                        prefix={<KeyOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    <br/><br/>
                    <Button type="primary" size="large" block onClick={checkLogin}> Login in </Button>
                </Card>
            </Spin>
        </div>
    )
}

export default Login