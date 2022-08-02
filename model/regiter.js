module.exports = class User extends require('./model') {
    /**
     * 用户登录
     * @param {string} username 登录账号
     * @param {string} password 登录密码
     */
    //insert into user

    /**
     * 
     * @param {string} username 
     * @returns 注册信息
     */
    static isRegistered(username) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT username FROM `user` WHERE username = ?'
            this.query(sql, username).then(results => {
                console.log(123456)
                resolve(results)
            }).catch(err => {
                console.log('获取注册列表失败：' + err.message)
                reject(err)
            })
        })
    }

    static signUp(username, password) {
        return new Promise((resolve, reject) => {
            let sql = 'insert into user (username,password) values (?,?)'
            this.query(sql, [username,password]).then(results => {
                resolve(results)
            }).catch(err => {
                console.log('注册失败：' + err.message)
                reject(err)
            })
        })
    }
}