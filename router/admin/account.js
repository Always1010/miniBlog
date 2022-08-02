/**
 * 后台文章管理
 */
const express = require('express')
const User = require('../../middleware/user')
const Auth = require('../../middleware/auth')

const accountApp = express()

accountApp.get('/', Auth.getUser, User.getuserinfo, (req, res) => {
    console.log(req.userinfo[0])
    console.log("没有东西")
    console.log(req.userinfo[0].Uphone)
    console.log(req.userinfo[0].username)
    console.log(req.userinfo[0].Ubirh)
    console.log(req.userinfo[0].password)
    res.render('admin/account/index', { user: req.userinfo[0] })
})

module.exports = accountApp