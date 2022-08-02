/**
 * 评论子应用
 */
 const express = require('express')
 //const Comment = require('../model/comment')
 const Comment = require('../middleware/comment')
 //const log = require('../middleware/log')
 const log = require('../middleware/log')
 
 // 文章子应用
 const commentApp = express()
 

// regiterApp.post('/', (req, res, next) => {
//     console.log('发送评论【】')
//     let { username, password } = req.body
//     Regiter.isRegistered(username).then(result => {
//         if (result) {
            
//         } else {
//             res.render('regiter', { msg: '注册失败！用户名重复' })
//         }
//     }).catch(err => {
//         next(err)
//     })
//  })

 //fan
// articleApp.post('/sendComment', [Comment.sendComment, Comment.getComment], (req, res) => {

commentApp.get('/get/:id', Comment.getComm
, (req, res) => {
    console.log(`收到send请求`)
    //let { comment }=req
    //({ comment } = req);
    if (req.insertId) {
//        res.render('admin/article/add', { user: user, categories: categories, code: 1 })
        res.send(req)
    } else {
//        res.render('admin/article/add', { user: user, categories: categories, code: 2 })
        res.send(req)}
})
commentApp.post('/send', Comment.send,(req, res,next) => {
    
    req.log = {
        username:req.body.user,
        time: new Date(),
        handle: '发表评论',
        ip: req.ip.split(':')[3]
    }
    console.log(req.log)
    log.add(req, res, next)
    res.send("1")
})
commentApp.post('/del', Comment.del,(req, res) => {
    
    if (req.affectedRows > 0) {
        res.json({ code: 1, msg: '删除成功' })
    } else {
        res.json({ colde: 2, msg: '删除失败' })
    }
})
// articleApp.post('/edit', article.edit, (req, res) => {
//     if (req.affectedRows > 0) {
//         res.render('admin/alert', { code: true, title: '成功提示', message: '文章编辑成功', url: '/admin/article/' })
//     } else {
//         res.render('admin/alert', { code: true, title: '失败提示', message: '文章编辑失败', url: '/admin/article/edit/' + req.body.id })
//     }
// })

// 添加文章
// articleApp.post('/add', [article.add, category.getList], (req, res) => {
//     let { user, categories } = req
//     if (req.insertId) {
//         res.render('admin/article/add', { user: user, categories: categories, code: 1 })
//     } else {
//         res.render('admin/article/add', { user: user, categories: categories, code: 2 })
//     }
// })

// commentApp.post('/send', (req, res, next) => {
//     let { Fid,Ctime,user_id,artilce_id,Ctxt,Rid } = req.body
//     let comment = {
//         Fid:Fid,
//         Ctime:Ctime,
//         user_id:user_id,
//         artilce_id:artilce_id,
//         Ctxt:Ctxt,
//         Rid:Rid,
//     }
//     console.log(comment)
//     Comment.sendComment(Fid,Ctime,user_id,artilce_id,Ctxt,Rid).then(results => {
//         req.insertId = results
//        // next()
//        res.send("post成功")
//     }).catch(err => {
//         next(err)
//     })
//  })

 module.exports = commentApp