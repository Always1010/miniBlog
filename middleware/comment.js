const Comment = require('../model/comment')

/**
 * 文章类目中间件
 */
module.exports = {


    // send: (req, res, next) => {
    //     let { title, content, hot, category_id } = req.body
    //     let comment = {
    //         title: title,
    //         content: content,
    //         hot: hot ? 1 : 0,
    //         category_id: category_id,
    //         thumbnail: req.uploadUrl ? req.uploadUrl : null
    //     }

    //     Article.add(article).then(results => {
    //         req.insertId = results
    //         next()
    //     }).catch(err => {
    //         next(err)
    //     })
    // },
    
        // function formateDate(date) {
        //     const arr = date.split('T');
        //     const d = arr[0];
        //     const darr = d.split('-');
        
        //     const t = arr[1];
        //     const tarr = t.split('.000');
        //     const marr = tarr[0].split(':');
        
        //     const dd =
        //       parseInt(darr[0]) +
        //       '-' +
        //       parseInt(darr[1]) +
        //       '-' +
        //       parseInt(darr[2]) +
        //       ' ' +
        //       parseInt(marr[0]) +
        //       ':' +
        //       parseInt(marr[1]) +
        //       ':' +
        //       parseInt(marr[2]);
        //     return dd;
        // }
        
        // function timestampToTime(timestamp) {

        //     var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    
        //     Y = date.getFullYear() + '-';
    
        //     M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    
        //     D = date.getDate() + ' ';
    
        //     h = date.getHours() + ':';
    
        //     m = date.getMinutes() + ':';
    
        //     s = date.getSeconds();
    
        //     return Y+M+D+h+m+s;
    
        // }
    
  send: (req, res, next) => {
        let {user_id,conn,article_id1,ctime,isroot,isfather,root,father} = req.body
        //Ctime=timestampToTime(ctime)


         Ctime=new Date()
    //     console.log(req.body.user_id)
    //     console.log(req.body.conn)
    // console.log(req.body.article_id1)
    // console.log(Ctime)
    // console.log(req.body.isroot)
    // console.log(req.body.isfather)
    // console.log(req.body.root)
    // console.log(req.body.father)




        // let comment = {
        //     Fid:Fid,
        //     Ctime:Ctime,
        //     user_id:user_id,
        //     artilce_id:artilce_id,
        //     Ctxt:Ctxt,
        //     Rid:Rid
        // }

        // app.post('/comment/send1', (req, res) => {
        //     console.log(req.body.user)
        //     console.log(req.body.conn)
        //     console.log(req.body.article_id)
        //     console.log(req.body.Ctime)
        //     console.log(req.body.isroot)
        //     console.log(req.body.isfather)
        //     console.log(req.body.root)
        //     console.log(req.body.father)
        //     res.send("1")
        // }


        // Fid,Ctime,user_id,artilce_id,Ctxt,Rid,isroot
        //console.log(comment)
        //Ctime=timestampToTime(ctime)
        console.log(isroot)
        console.log(typeof(JSON.parse(isroot)))
        isroot = JSON.parse(isroot)
      
        if(isroot){
            console.log(isroot)
            console.log('为root评论')
            Comment.sendComment(father,Ctime,user_id,article_id1,conn,root,isroot).then(results => {
                req.insertId = results
                if(req.insertId){
                    Comment.updateComment(req.insertId).then(results => {
                        req.insertId = results
                        next()
                    }
                    ).catch(err => {
                        next(err)
                    })
                }
                next()
            }
            ).catch(err => {
                next(err)
            })
        }else{
            console.log(isroot)
            console.log('非root评论')
            Comment.sendComment(father,Ctime,user_id,article_id1,conn,root,isroot).then(results => {
                req.insertId = results
                next()
            }
            ).catch(err => {
                next(err)
            })
          }
    }
    ,
     getComm: (req, res, next) => {
                //console.log("123456")
                let id = req.query.id
                console.log("参数id"+id)
                if(id===undefined){ id=0}
                Comment.getComments(id).then(results => {

                    req.comments = results
                    //console.log(results[0])
                    //res.send();
                    next()
                }).catch(err => {
                    //res.send('777')
                    next(err)
                })
            }
            ,
    del:(req, res, next) => {
        
        let {CID} = req.body

        console.log("CID:"+CID)

        Comment.delComments(CID).then(results => {
            req.affectedRows=results
            //console.log(results)
            //res.send();
            next()
        }).catch(err => {
            //res.send('777')
            next(err)
        })
    }

}