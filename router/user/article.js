/**
 * 后台文章管理
 */
const express = require('express')
const article = require('../../middleware/article')
const category = require('../../middleware/category')
const Auth = require('../../middleware/auth')
const Comment = require('../../middleware/comment')
const log = require('../../middleware/log')
const articleApp = express()

// 加载列表页
articleApp.get('/', article.getCount, (req, res, next) => {
    let { articleCount } = req

    let size = 30 // 每页显示5条
    req.page = {}
    req.page.count = articleCount
    req.page.total = Math.ceil(req.page.count / size)
    req.page.p = req.query.p ? req.query.p : 1
    req.page.p = req.page.p > req.page.total ? req.page.total : req.page.p
    req.page.p = req.page.p < 1 ? 1 : req.page.p

    res.start = (req.page.p - 1) * size
    res.size = size

    next()

}, [article.getPage, category.getList], (req, res) => {
    let { user, pageList, page, categories } = req
    let { category_id, hot } = req.query

    page.list = pageList
    res.render('user/article/index', { user: user, page: page, categories: categories, category_id: category_id, hot: hot })
})

// 设置热门推荐
articleApp.get('/sethot', article.setHot, (req, res) => {
    if (req.affectedRows > 0) {
        res.json({ code: 1, msg: '设置成功' })
    } else {
        res.json({ code: 0, msg: '设置失败' })
    }
})

// 显示添加博文页
articleApp.get('/add', category.getList, (req, res) => {
    let { user, categories } = req
    res.render('user/article/add', { user: user, categories: categories, code: '' })
})

// ckeditor 上传
articleApp.post('/ckeditor', (req, res) => {
    if (req.uploadUrl) {
        res.json({
            uploaded: true,
            url: req.uploadUrl
        })
    } else {
        res.json({
            uploaded: false,
            err: { message: '上传失败' }
        })
    }
})

// 添加文章
articleApp.post('/add', [Auth.getUser,article.add, category.getList], (req, res,next) => {
    let { user, categories } = req
    if (req.insertId) {

            req.log = {
                username:req.user.username,
                time: new Date(),
                handle: '发布文章',
                ip: req.ip.split(':')[3]
            }
            log.add(req, res, next)
        
        res.render('user/article/add', { user: user, categories: categories, code: 1 })
    } else {
        res.render('user/article/add', { user: user, categories: categories, code: 2 })
    }
})

// 删除文章
articleApp.get('/del', article.del, (req, res) => {
    if (req.affectedRows > 0) {
        res.json({ code: 1, msg: '删除成功' })
    } else {
        res.json({ colde: 2, msg: '删除失败' })
    }
})

// 文章编辑
articleApp.get('/edit/:id', [category.getList, article.getArticleById], (req, res) => {
    let { user, categories, article } = req
    res.render('user/article/edit', { user: user, categories: categories, article: article, code: '' })
})

articleApp.post('/edit', article.edit, (req, res) => {
    if (req.affectedRows > 0) {
        res.render('user/alert', { code: true, title: '成功提示', message: '文章编辑成功', url: '/user/article/' })
    } else {
        res.render('user/alert', { code: true, title: '失败提示', message: '文章编辑失败', url: '/user/article/edit/' + req.body.id })
    }
})


// 加载评论管理
articleApp.get('/concomm',Auth.getUser, category.getList, article.user_getlist, Comment.getComm,(req, res) => {
   
    let { articles, comments, user ,categories} = req
     console.log("收到")
    //console.log(req.articles)
    //console.log(req.comments)
    let { id } = req.query
    //console.log(req.user)
    /****article={id,title}*******/
    /****comments={CID ,Ctxt,Fid ,Rid ,Uid ,RUid,Uname ,RUname ,Ctime}*******/

    //let { category_id, hot } = req.query

    //page.list = pageList
    res.render('user/concomm', { articles:articles,categories: categories,comments:comments,user:user,id:id })
    //res.send()
    console.log(article)
    //console.log(comments)
})

module.exports = articleApp