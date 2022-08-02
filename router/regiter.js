const express = require('express')
const sql=require('../model/model')
const log = require('../middleware/log')
const regiter = express()



regiter.get('/', (req, res) => {
    console.log("1")
    res.render('regiter', { hot: 0 })
})


regiter.post('/', (req, res,next) => {
    console.log('2')
    console.log(req.body.password)
    var t=req.body.username
   /* sql.query(`select username from user`).then(function (value) {
        value.forEach(element => {
            console.log(element.username)
            if (element.username === req.body.username) {
                res.render()
            }
            
        });
    })*/
    sql.query(`insert into user(id,username,password) values(0,"${ req.body.username}","${req.body.password}")`).then(function (value) {
       
        console.log(value)

            req.log = {
                username:req.body.username,
                time: new Date(),
                handle: '注册',
                ip: req.ip.split(':')[3]
            }
            log.add(req, res, next)

        res.render('login',{msg:2})
        
    }).catch(err => {
        console.log(err)
        res.render('regiter',{hot:1})
    })
})
module.exports=regiter



// const express = require('express')
// const Regiter=require('../model/regiter')
// const log = require('../middleware/log')



// const regiterApp = express()




// /**
//  * 注册页面
//  */
//  regiterApp.get('/', (req, res) => {
//     console.log("注册页面")
//     res.render('regiter', { msg: '' })
// })

// /**
//  * 注册请求
//  */
// regiterApp.post('/', (req, res, next) => {
//    console.log('收到注册请求【】')
//    let { username, password } = req.body
//    Regiter.isRegistered(username).then(result => {
//        if (result.length===0) {
//            console.log('尝试注册')
//            Regiter.signUp(username, password).then(result => {
//                if (result) {
//                    req.log = {
//                        time: new Date(),
//                        handle: '注册',
//                        ip: req.ip.split(':')[3]
//                    }
//                    log.add(req, res, next)
//                    // session存储（key=value）
//                    req.session.user = result
//                    res.render('login',{msg: '注册成功！快快登录吧！'})
//                } 
//            })
//        } else {
//            res.render('regiter', { msg: '注册失败！用户名重复' })
//        }
//    }).catch(err => {
//        next(err)
//    })
// })

// // regiterApp.post('/', (req, res) => {
// //     console.log('收到注册请求【】')
   
// //     // Regiter.query(`insert into user values(${ req.username },${req.password}`).then(function (value) {      
// //     //         console.log(value)
// //     // }) 
// // })
// module.exports=regiterApp 