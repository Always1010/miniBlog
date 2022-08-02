/**
 * 权限子应用
 */
module.exports = {
    /**
     * 从session中读取用户
     */
    getUser: (req, res, next) => {
        // 从session中读取数据
       class Runoob {
            constructor(name, url) {
              this.name = name;
              this.url = url;
            }
          }

        req.user = req.session.user
        console.log(req.user)
       // console.log(typeof req.user)
        //console.log(String(req.user))
       if (req.user != null)
        {
            
        }
        else {
            req.user = new Runoob()
            req.user.id=-1
            
        }
       /* if (req.user.id!=undefined)
        { }
        else
        {
            req.user.id='-1'
        }*/
        next()
    },
    /**
     * 是否允许用户进入后台管理页
     */
    allowToAdmin:(req,res,next)=>{
        let user = req.session.user
        if(user){
            req.user = user
            next()
        }else{
            res.redirect('/login')
        }
    }
}