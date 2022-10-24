const mysql = require('mysql')

/**
 * 注意数据库移植时，可能需对此处作必要修改
 */
/**
 * 数据模型的基类
 * 封装了数据库操作
 */
module.exports = class Model {
    // 连接对象
    
    static conn;

    /**
     * 数据库连接方法
     */
    static connection() {
        Model.conn = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: '2333',
			database: 'blog'
        })
        Model.conn.connect(err => {
            if (err) {
                console.log(`数据库连接失败：${err.message}`)
            }
        })
    }

    /**
     * 关闭数据库连接
     */
    static end() {
        if (null != Model.conn) {
            Model.conn.end()
        }
    }

    /**
     * 通用查询方法
     * @param {string} sql 要执行的SQL语句
     * @param {Array} params 给SQL语句的占位符进行赋值的参数数组
     */
    static query(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.connection()

            Model.conn.query(sql, params, (err, results) => {
                console.log(sql)
                if(err){
                    reject(err)
                }else{
                    resolve(results)
                }
            })

            this.end()
        })
    }
}