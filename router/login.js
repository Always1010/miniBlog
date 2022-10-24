/**
 * 登录子应用
 */
const express = require('express')
const User = require('../model/user')
const log = require('../middleware/log')
const user = require('../middleware/user')

// 文章子应用
const loginApp = express()

// 加载登录页
loginApp.get('/', (req, res) => {
    res.render('login', { msg: '0' })
})
loginApp.post('/send', (req,res, next) => {
    console.log("bug")
    console.log(req.body)
    User.up(req.body.phone,req.body.old).then(result => {
        if (result) {
            res.send("删除成功")
            console.log("suss")
        } else {
            //res.render('login', { msg: 1 })
            res.send("000")
        }
    }).catch(err => {
        next(err)
    })
})
// 实现登录操作
loginApp.post('/', (req, res, next) => {
    let { username, password } = req.body
    User.login(username, password).then(result => {
        if (result) {
            req.log = {
                username:username,
                time: new Date(),
                handle: '登录',
                ip: req.ip.split(':')[3]
            }
            log.add(req, res, next)
           // console.log(username)
            // session存储（key=value）
            req.session.user = result
            res.redirect('/')
        } else {
            console.log('yes')
            res.render('login', { msg: 1 })
        }
    }).catch(err => {
       
        next(err)
    })
})

module.exports = loginApp