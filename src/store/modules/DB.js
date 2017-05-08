// import setGlobalVars from "indexeddbshim";
// GLOBAL.window = GLOBAL;
// setGlobalVars();
const READONLY = "readonly";
const READWRITE = "readwrite";

const STORE_MESSAGES = "messages";
let DB = null;
let WebSQLDB = null;
try {
    // throw new Error("不使用indexeddb");
    let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
    // let indexedDB = window.shimIndexedDB;
    let request = indexedDB.open("DB", 2);
    request.onsuccess = ({ target }) => {
        DB = target.result;
        // 清除一天前的消息
        console.log("清除一天前的消息");
        let now = new Date().getTime();
        let objectStore = DB.transaction([STORE_MESSAGES], READWRITE, 0).objectStore(STORE_MESSAGES);
        let index = objectStore.index("timestamp");
        let range = IDBKeyRange.upperBound(now - 1000 * 60 * 60 * 24);
        console.log(range);
        index.openCursor(range).onsuccess = ({ target }) => {
            let cursor = target.result;
            if (cursor) {
                console.log(cursor);
                cursor.delete();
                cursor.continue();
            }
        }
        index.openCursor(range).onerror = (e) => {
            console.log(e);
        }

    }
    request.onerror = () => {
        console.log("创建失败");
    }
    request.onupgradeneeded = ({ target }) => {
        DB = target.result;
        //版本变化时删除原数据
        try {
            DB.deleteObjectStore(STORE_MESSAGES);
        } catch (e) {
            // alert(e);
        }
        var objectStore;
        objectStore = DB.createObjectStore(STORE_MESSAGES, { keyPath: "id" });
        objectStore.createIndex("timestamp", "timestamp", { unique: false });
        objectStore.createIndex("user", ["from", "to"], { unique: false });
        objectStore.createIndex("from", "from", { unique: false });
        objectStore.createIndex("to", "to", { unique: false });
    }
} catch (e) {
    console.log(e);
    WebSQLDB = openDatabase("DB", "1.0", "", 10 * 1024 * 1024);
    // 创建表
    WebSQLDB.transaction(function(tx) {
        var sql = "create table if not exists " + STORE_MESSAGES + " (_id TEXT,_from TEXT,_to TEXT,message TEXT,timestamp INTEGER,msgType TEXT,hasRead INTEGER,type TEXT,ext TEXT)";
        console.log(sql);
        tx.executeSql(sql, [], function(tx, res) {
            console.log("创建成功");
        }, function(tx, res) {
            console.log(res);
        });
    });

    // 只保留一天的聊天记录
    WebSQLDB.transaction(function(tx) {
        let now = new Date().getTime();
        var sql = "delete from " + STORE_MESSAGES + " where timestamp <= " +(now - 1000 * 60 * 60 * 24);
        console.log(sql);
        tx.executeSql(sql, [], function(tx, res) {
            console.log("清除成功");
        }, function(tx, res) {
            console.log("清除失败");
        });
    });
}

var state = {

};
var mutations = {

};
var actions = {
    /**
     * [add description] 添加数据
     * @param {[type]} state                state
     * @param {[type]} options.storeName   数据库对象名
     * @param {[type]} options.data        插入的数据
     * @param {[type]} options.success     插入成功回调
     * @param {[type]} options.error       插入失败回调
     */
    add(state, { storeName, data, success, error }) {
        try {
            if (DB) {
                let trans = DB.transaction([storeName], READWRITE, 0);
                let objectStore = trans.objectStore(storeName);
                let req;
                if (Array.isArray(data)) {
                    for (d of data) {
                        req = objectStore.put(d);
                    }
                } else {
                    if (typeof data === "object") {
                        req = objectStore.put(data);
                    }
                }
                req.onsuccess = () => {
                    if (success) { success() }
                }
                req.onsuccess = () => {
                    if (error) { error() }
                }
            } else {
                if (Array.isArray(data)) {
                    for (d of data) {
                        d.hasRead = d.hasRead ? 11 : 10;
                        d.ext = JSON.stringify(d.ext ? d.ext : {});
                        var sql = "insert into " + STORE_MESSAGES + " (_id,_from,_to,message,timestamp,msgType,hasRead,type,ext) values('" + d.id + "','" + d.from + "','" + d.to + "','" + d.message + "'," + d.timestamp + ",'" + d.msgType + "'," + d.hasRead + ",'" + d.type + "','" + d.ext + "')";
                        console.log(sql);
                        WebSQLDB.transaction(function(tx) {
                            tx.executeSql(sql, [], function(tx, res) {},
                                function(tx, res) {
                                    console.log(res);
                                });
                        });
                    }
                } else {
                    if (typeof data === "object") {
                        var d = data;
                        d.hasRead = d.hasRead ? 11 : 10;
                        d.ext = JSON.stringify(d.ext ? d.ext : {});
                        var sql = "insert into " + STORE_MESSAGES + " (_id,_from,_to,message,timestamp,msgType,hasRead,type,ext) values('" + d.id + "','" + d.from + "','" + d.to + "','" + d.message + "'," + d.timestamp + ",'" + d.msgType + "'," + d.hasRead + ",'" + d.type + "','" + d.ext + "')";
                        console.log(sql);
                        WebSQLDB.transaction(function(tx) {
                            tx.executeSql(sql, [], function(tx, res) {},
                                function(tx, res) {
                                    console.log(res);
                                });
                        });
                    }
                }
            }
        } catch (e) {
            console.warn("保存异常", e);
        }
    },
    get(state, { storeName, name1, name2 }) {
        let promise = new Promise((resolve, reject) => {
            try {
                if (DB) {
                    let data = [];
                    let canRet = 0;
                    var ret = function() {
                        if (++canRet == 2) {
                            resolve(data);
                        }
                    }
                    let trans = DB.transaction([storeName], READONLY, 0);
                    let objectStore = trans.objectStore(storeName);
                    var index = objectStore.index("user");
                    var range1 = IDBKeyRange.only([name1, name2]);
                    index.openCursor(range1).onsuccess = ({ target }) => {
                        let cursor = target.result;
                        if (cursor) {
                            data.push(cursor.value);
                            cursor.continue();
                        } else {
                            ret();
                        }
                    }
                    var range2 = IDBKeyRange.only([name2, name1]);
                    index.openCursor(range2).onsuccess = ({ target }) => {
                        let cursor = target.result;
                        if (cursor) {
                            data.push(cursor.value);
                            cursor.continue();
                        } else {
                            ret();
                        }
                    }
                } else {
                    WebSQLDB.transaction(function(tx) {
                        var sql = "select * from " + STORE_MESSAGES + " as m where m._to = " + name1 + " or m._from = " + name1;
                        console.log(sql);
                        tx.executeSql(sql, [], function(tx, res) {
                                var data = [];
                                var len = res.rows.length;
                                for (var i = 0; i < len; i++) {
                                    var item = res.rows.item(i);
                                    data.push({
                                        id: item._id,
                                        from: item._from,
                                        to: item._to,
                                        message: item.message,
                                        timestamp: item.timestamp,
                                        msgType: item.msgType,
                                        hasRead: (item.hasRead - 10) ? true : false,
                                        type: item.type,
                                        ext: JSON.parse(item.ext)
                                    });
                                }
                                resolve(data);
                            },
                            function(tx, res) {
                                console.log(res);
                                resolve([]);
                            });
                    });
                }
            } catch (e) {
                resolve([]);
                console.warn("查询异常", e);
            }
        });
        return promise;
    },
    getGroup(state, { storeName, name }) {
        let promise = new Promise((resolve, reject) => {
            try {
                if (DB) {
                    let data = [];
                    let trans = DB.transaction([storeName], READONLY, 0);
                    let objectStore = trans.objectStore(storeName);
                    var index = objectStore.index("to");
                    var range1 = IDBKeyRange.only(name);
                    index.openCursor(range1).onsuccess = ({ target }) => {
                        let cursor = target.result;
                        if (cursor) {
                            data.push(cursor.value);
                            cursor.continue();
                        } else {
                            resolve(data);
                        }
                    }
                } else {
                    WebSQLDB.transaction(function(tx) {
                        var sql = "select * from " + storeName + " as m where m._to = " + name;
                        console.log(sql);
                        tx.executeSql(sql, [], function(tx, res) {
                                var data = [];
                                var len = res.rows.length;
                                for (var i = 0; i < len; i++) {
                                    var item = res.rows.item(i);
                                    data.push({
                                        id: item._id,
                                        from: item._from,
                                        to: item._to,
                                        message: item.message,
                                        timestamp: item.timestamp,
                                        msgType: item.msgType,
                                        hasRead: (item.hasRead - 10) ? true : false,
                                        type: item.type,
                                        ext: JSON.parse(item.ext)
                                    });
                                }
                                resolve(data);
                            },
                            function(tx, res) {
                                console.log(res);
                                resolve([]);
                            });
                    });
                }
            } catch (e) {
                resolve([]);
                console.warn("查询异常", e);
            }
        });
        return promise;
    },
    delete(state, { storeName, name }) {
        let promise = new Promise((resolve, reject) => {
            try {
                if (DB) {
                    let data = [];

                    let canRet = 0;
                    let ret = function() {
                        if (++canRet == 2) {
                            resolve("success");
                        }
                    }
                    let trans = DB.transaction([storeName], READWRITE, 0);
                    let objectStore = trans.objectStore(storeName);

                    var index1 = objectStore.index("to");
                    var range1 = IDBKeyRange.only(name);

                    index1.openCursor(range1).onsuccess = ({ target }) => {
                        let cursor = target.result;
                        if (cursor) {
                            // objectStore.delete(cursor.value.id);
                            cursor.delete();
                            cursor.continue();
                        } else {
                            ret();
                        }
                    };

                    var index2 = objectStore.index("from");
                    var range2 = IDBKeyRange.only(name);

                    index2.openCursor(range2).onsuccess = ({ target }) => {
                        let cursor = target.result;
                        if (cursor) {
                            // objectStore.delete(cursor.value.id);
                            cursor.delete();
                            cursor.continue();
                        } else {
                            ret();
                        }
                    };

                } else {
                    WebSQLDB.transaction(function(tx) {
                        var sql = "delete from " + storeName + " where _to = " + name + " or _from = " + name;
                        console.log(sql);
                        tx.executeSql(sql, [], function(tx, res) {
                                resolve("success");
                            },
                            function(tx, res) {
                                console.log(res);
                                resolve("error");
                            });
                    });
                }
            } catch (e) {
                reject(e);
                console.warn("查询异常", e);
            }
        });
        return promise;
    }
};
var getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}
