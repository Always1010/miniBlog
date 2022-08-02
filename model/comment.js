/**
 * 评论数据模型
 */
module.exports = class Log extends require('./model') {
     //region
    /**
     * 获取日志列表
     */
    // static getComment(start, size) {
    //     return new Promise((resolve, reject) => {
    //         let sql = 'SELECT handle,`time`,ip FROM `log` ORDER BY `time` DESC LIMIT ?,?'
    //         this.query(sql, [start, size]).then(results => {
    //             resolve(results)
    //         }).catch(err => {
    //             console.log(`获取日志列表失败：${err.message}`)
    //             reject(err)
    //         })
    //     })
    // }
    // /**
    //  * 获取日志总条目数
    //  */
    // static getCount() {
    //     return new Promise((resolve, reject) => {
    //         let sql = 'SELECT COUNT(1) as count FROM `log`'
    //         this.query(sql).then(results => {
    //             resolve(results[0].count)
    //         }).catch(err => {
    //             console.log(`获取日志总条目数失败：${err.message}`)
    //             reject(err)
    //         })
    //     })
    // }

    // /**
    //  * 日志添加
    //  */
    // static add(log) {
    //     return new Promise((resolve, reject) => {
    //         let sql = 'INSERT INTO `log` SET ?'
    //         this.query(sql, log).then(results => {
    //             resolve(results.affectedRows)
    //         }).catch(err => {
    //             console.log(`日志添加失败：${err.message}`)
    //             reject(err)
    //         })
    //     })
    // }

    
    // static sendComment(fid,ctime,user_id,artilce_id,ctext,rid) {
    //     return new Promise((resolve, reject) => {
    //         let sql = 'insert into user comment (Fid,Ctime,user_id,artilce_id,Ctxt,Rid) values (?,?,?,?,?,?)'
    //         this.query(sql, [fid,ctime,user_id,artilce_id,ctext,rid]).then(results => {
    //             resolve(results)
    //         }).catch(err => {
    //             console.log('评论失败：' + err.message)
    //             reject(err)
    //         })
    //     })
    // }
    //end region
    /**
     * 
     * @param {*} Fid 
     * @param {*} Ctime 
     * @param {*} user_id 
     * @param {*} artilce_id 
     * @param {*} Ctxt 
     * @param {*} Rid 
     * @returns 
     */
    static sendComment(Fid,Ctime,user_id,artilce_id,Ctxt,Rid,isroot) {
        return new Promise((resolve, reject) => {
            if(isroot)
            {
                console.log('model_为root')
                let sql = 'INSERT INTO comment (ctime,user_id,article_id,ctxt) VALUES (?,?,?,?)'
            //let sql = 'INSERT INTO comment (Fid,Ctime,user_id,Ctxt,Rid) VALUES (?,?,?,?,?);'
            //this.query(sql, [Fid,Ctime,user_id,Ctxt,Rid]).then(results => {
            this.query(sql, [Ctime,user_id,artilce_id,Ctxt]).then(results => {
                resolve(results.insertId)
            }).catch(err => {
                console.log(`发送评论失败1：${err.message}`)
                reject(err)
            })
            }else{
                console.log('model_非root')
                var rid=0;
                let sql = 'INSERT INTO comment (FID,ctime,user_id,article_id,ctxt,Rid,ridr) VALUES (?,?,?,?,?,?,?)'
            //let sql = 'INSERT INTO comment (Fid,Ctime,user_id,Ctxt,Rid) VALUES (?,?,?,?,?);'
            //this.query(sql, [Fid,Ctime,user_id,Ctxt,Rid]).then(results => {
            this.query(sql, [Fid,Ctime,user_id,artilce_id,Ctxt,Rid,rid]).then(results => {
                resolve(results.insertId)
            }).catch(err => {
                console.log(`发送评论失败2：${err.message}`)
                reject(err)
            })
        }
    }
            
    )}
 
    static updateComment(Cid) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE blog.comment SET Rid=?,FID=? WHERE CID=? and ridr=1'
            //let sql = 'INSERT INTO comment (Fid,Ctime,user_id,Ctxt,Rid) VALUES (?,?,?,?,?);'
            //this.query(sql, [Fid,Ctime,user_id,Ctxt,Rid]).then(results => {
            this.query(sql, [Cid,Cid,Cid]).then(results => {
                resolve(results.insertId)
            }).catch(err => {
                console.log(`更新评论失败：${err.message}`)
                reject(err)
            })
        })
    }

    static getComments(artilce_id) {
        return new Promise((resolve, reject) => {
            //console.log(159753)
            let sql = 'SELECT CID ,Ctxt,Fid ,Rid ,Uid ,RUid,Uname ,RUname ,Ctime from comments_view WHERE article_id  = ?;'
            //console.log(159753)
            this.query(sql, [artilce_id]).then(results => {
                //console.log(159753)
                resolve(results)
                //console.log(results)
            }).catch(err => {
                console.log(`获取评论失败：${err.message}`)
                reject(err)
            })
        })
    }

    static delComments(CID) {
        return new Promise((resolve, reject) => {
            console.log('收到删除请求')
            let sql = 'DELETE FROM blog.comment WHERE CID = ?;'
            //console.log(159753)
            this.query(sql, [CID]).then(results => {
                console.log(159753)
                resolve(results.affectedRows)
                console.log(results)
            }).catch(err => {
                console.log(`删除评论失败：${err.message}`)
                reject(err)
            })
        })
    }
}