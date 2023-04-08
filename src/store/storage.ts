// 本地存储
export const storageStore = {
    // 本地存储
    set: function (name: string, value: any, day?: any) {
        // 设置
        let d = new Date()
        let time = 0
        let paramsDay = typeof day === 'undefined' || !day ? 1 : day // 时间,默认存储1天
        time = d.setHours(d.getHours() + 24 * paramsDay) // 毫秒
        localStorage.setItem(
            name,
            JSON.stringify(
                {
                    data: value,
                    time
                }
            )
        )
    },
    get: function (name: string) {
        // 获取 
        let data = localStorage.getItem(name)
        if (!data) {
            return null
        }
        let obj = JSON.parse(data)
        if (new Date().getTime() > obj.time) {
            // 过期
            localStorage.removeItem(name)
            return null
        } else {
            return obj.data
        }
        // return obj.data
    },
    clear: function (name: string) {
        // 清空
        if (name) {
            // 删除键为name的缓存
            localStorage.removeItem(name)
        } else {
            // 清空全部
            localStorage.clear()
        }
    },
}

// class Storage {
//     // localStorage.setItem("MY_TOKEN", JSON.stringify(payload));
//     set(key: string, value: any) {
//         if (typeof value === 'object') {
//             value = JSON.stringify(value)
//         }
//         localStorage.setItem(key, value)
//     }

//     get(key: string) {
//         // JSON.parse(localStorage.getItem("MY_TOKEN"))
//         // 如果是json字符串格式，就返回,如果不能转为js对象 就返回原数据
//         const value: string | any = localStorage.getItem(key)
//         try {
//             return JSON.parse(value)
//         } catch (error) {
//             return value
//         }
//     }

//     remove(key: string) {
//         localStorage.removeItem(key)
//     }
// }

// export const storageStore = new Storage()