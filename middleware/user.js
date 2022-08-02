/**
 * 用户中间件
 */

const User = require('../model/user')

module.exports = {
    /**
     * 最后一次登录时间
     */
    sendonmess: (req, res, next) => {
        let {title, password, Email, age, phone,old}=req.body
        User.sendon(title, password, Email,  age, phone,old).then(results => {
            req.isover = results
            console.log(req.isover)
            next()
        }).catch(err=>{
            next(err)
        })
        
    },
    lastLoginTime: (req, res, next) => {
        User.lastLoginTime().then(results=>{
            req.lastLoginTime = results
            next()
        }).catch(err=>{
            next(err)
        })
    },
    getuserinfo:(req, res, next) => {
        User.getuser(req.user.id).then(results=>{
            console.log("userinfo"+results)
            console.log(results)
            req.userinfo = results
            next()
        }).catch(err=>{
            next(err)
        })
    }
}