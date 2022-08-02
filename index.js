/**
 * 入口模块
 */



const express = require('express')
const session = require('cookie-session')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
var mutipart= require('connect-multiparty');
 
var mutipartMiddeware = mutipart();


// 创建主应用
const app = express()

// 上传配置
console.log(1)
const upload = multer({
    dest: './static/upload', // 上传文件的存储目录
    limits: {
        fileSize: 1024 * 1024 * 2 // 单个文件大小限制在2M以内
    }
})

// 模板引擎的设置
app.set('view engine', 'html')
app.set('views', `./views/`)
app.engine('html', require('ejs').renderFile)

// 静态资源配置
app.use(express.static('./static/'))

// POST请求处理
app.use(express.urlencoded({ extended: true }))

// SESSION配置
app.use(session({
    keys: ['secret'],
    maxAge: 1000 * 60 * 30
}))

// SESSION延期
app.use((req, res, next) => {
    req.session.nowInMinutes = Math.floor(Date.now() / 60e3)
    next()
})

// 调用首页子应用
app.use(/\/(index)?/, require('./router/index'))
// 调用文章子应用
app.use('/article', require('./router/article'))
// 调用搜索子应用
app.use('/search', require('./router/search'))
// 调用登录子应用
app.use('/login', require('./router/login'))
// 调用注册子应用
app.use('/regiter', require('./router/regiter'))
// 调用评论子应用
app.use('/comment', require('./router/comment'))
// 进入后台的权限验证
app.use('/admin/?*', require('./middleware/auth').allowToAdmin)
app.use('/user/?*', require('./middleware/auth').allowToAdmin)

// 上传操作wget -qO- https://gitee.com/Suwingser/MCSManager-installer/raw/master/install.sh | bash 作者：海石花HaiZiohHue https://www.bilibili.com/read/cv14757188?from=search&spm_id_from=333.337.0.0 出处：bilibili
app.post('/admin/*', upload.single('upload'), (req, res, next) => {
    // 上传成功后的文件对象
    let { file } = req
    if (file) {
        //  file.originalname ==> 文件的原名称
        let extname = path.extname(file.originalname)
        // file.path ==> 上传后的文件路径
        fs.renameSync(file.path, file.path + extname)
        // file.filename ==> 上传后的文件名
        req.uploadUrl = '/upload/' + file.filename + extname
    }
    next()
})
app.post('/user/article/add1', (req, res) => {
    console.log(req.body.title)
    console.log(req.body.category_id)
    console.log(req.body.conn)
   

})
app.post('/user/*', upload.single('upload'), (req, res, next) => {
    // 上传成功后的文件对象
    let { file } = req
    if (file) {
        //  file.originalname ==> 文件的原名称
        let extname = path.extname(file.originalname)
        // file.path ==> 上传后的文件路径
        fs.renameSync(file.path, file.path + extname)
        // file.filename ==> 上传后的文件名
        req.uploadUrl = '/upload/' + file.filename + extname
    }
    next()
})

app.post('/login/send', (req, res) => {
    console.log(req.body.title)
    console.log(req.body.password)
    console.log(req.body.Email)
    console.log(req.body.birth)
    console.log(req.body.age)
    console.log(req.body.phone)
    console.log(req.body.old)
   
    res.send("1")
})


app.use(/\/user\/(index)?/, require('./router/user/index'))
//调用后台文章管理
app.use('/user/article', require('./router/user/article'))
//调用后台类目管理
app.use('/user/category', require('./router/user/category'))
//调用后台日志管理
app.use('/user/log', require('./router/user/log'))
//调用后台账户管理
app.use('/user/account', require('./router/user/account'))
//调用后台首页


app.use(/\/admin\/(index)?/, require('./router/admin/index'))
// 调用后台文章管理
app.use('/admin/article', require('./router/admin/article'))
// 调用后台类目管理
app.use('/admin/category', require('./router/admin/category'))
// 调用后台日志管理
app.use('/admin/log', require('./router/admin/log'))
// 调用后台账户管理
app.use('/admin/account', require('./router/admin/account'))

// 退出
app.get('/user/logout', (req, res) => {
    req.session.user = null
    res.render('login', { msg: '退出成功' })
})
/*app.post('/upload', upload.single('fileUpload'), function (req, res, next) {
    const { file } = req; fs.readFile(file.path, function (err, data)
    {
        fs.writeFile(`${UPLOAD_PATH}/${file.originalname}`, data, function (err)
        {
            if (err) res.json({ err })
            res.json({ msg: '上传成功' });
        });
    })
})*/
app.post('/upload', mutipartMiddeware, function (req, res) {
    //这里打印可以看到接收到文件的信息。
    
    /*//do something
    * 成功接受到浏览器传来的文件。我们可以在这里写对文件的一系列操作。例如重命名，修改文件储存路径 。等等。
    *
    * */
    //给浏览器返回一个成功提示。
    res.send('upload success!');
})
console.log(1)
// 监听服务器S
app.listen(10188)


