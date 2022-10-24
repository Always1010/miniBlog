/**
 * 用户数据模型
 */
module.exports = class User extends require('./model') {
    /**
     * 用户登录
     * @param {string} username 登录账号
     * @param {string} password 登录密码
     */
    static login(username, password) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,username FROM `user` WHERE username = ? AND PASSWORD = ?'
            this.query(sql, [username, password]).then(results => {
                console.log('yes.here')
                resolve(results[0])
            }).catch(err => {
                console.log('登录失败：' + err.message)
                reject(err)
            })
        })
    }
    static sendon(user, password, EMAIL, birth, phone, age,oldname) {
        return new Promise((resolve, reject) => {
            let sql = 'update user set username=?,password=?,Uemail=?,Uage=?,Uphone=? where user.username=?'
            this.query(sql, [user, password, EMAIL,  age, phone,oldname]).then(results => {
                resolve(results[0])

            }).catch(err => {
                console.log('登录失败：' + err.message)
                reject(err)
            })
        })}
    
     // 最后一次登录的时间
     
    static lastLoginTime() {
        return new Promise((resolve, reject) => {
            let sql = "SELECT `time` FROM `log` WHERE handle = '登录' ORDER BY `time` DESC LIMIT 1"
            this.query(sql).then(results => {
                resolve(results[0].time)
            }).catch(err => {
                console.log('登录失败：' + err.message)
                reject(err)
            })
        })
    }

    


    static getuser(id) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM blog.user WHERE id=?"
            this.query(sql,[id]).then(results => {
                resolve(results)
            }).catch(err => {
                console.log('获取个人信息失败：' + err.message)
                reject(err)
            })
        })
    }


    static up(phone,oldname) {
        return new Promise((resolve, reject) => {
            let sql = 'update user set Uphone=? where user.username=?'
            this.query(sql, [phone,oldname]).then(results => {
                resolve(results)
                console.log("成功")
            }).catch(err => {
                console.log('登录失败：' + err.message)
                reject(err)
            })
        })}
}