/**
 * 标签数据模型
 */
module.exports = class Tab extends require('./model') {
    /**
     * 获取指定文章的标签列表
     */

 static getListByArticleId(id) {
     return new Promise((resolve, reject) => {
            
            let sql = 'SELECT id,`name` FROM tabs WHERE article_id = ?'
            this.query(sql, id).then(results => {
                console.log(`tab的${id}`)
                console.log(results)
                resolve(results)
            }).catch(err => {
                console.log(`获取指定文章的标签列表失败：${err.message}`)
                reject(err)
            })
        })
 } 
 static addtab(name,article_id) {
    return new Promise((resolve, reject) => {
        let sql = 'INSERT INTO tabs (`name`,`article_id`) VALUES (?,?)'
        this.query(sql, [name, article_id]).then(results => {
            console.log(sql)
            resolve(results.insertId)
        }).catch(err => {
            console.log(`新增类目失败：${err.message}`)
            reject(err)
        })
    })
}
    static deletetabbyId(id) {
        return new Promise((resolve, reject) => {
            let sql = 'delete from tabs where id = ?'
            this.query(sql,id).then(results => {
                resolve(results.affectedRows)
            }).catch(err => {
                console.log(`删除指定得文章标签：${err.message}`)
                reject(err)
            })
        })
    }
}