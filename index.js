// back-end
// Node 环境是封装的V8引擎，和Chrome 环境比较相似
// 都可以使用ES6的一些语法，不同点在于包管理工具不同，Node 有更多的API， 比如读写文件的 IO接口
// Node 是 common.js， 使用 require， exports 
// JS 环境是 ES6 module， 使用 import， export
// express 是 node 的一个库，可以驱动服务器
const express = require('express');
const app = express();

// 把 public 设为EXPRESS 的静态资源，可以访问
app.use(express.static('./public'));
app.use('/jsonp', (req, res, next) => {
    // 获取url 中的参数
    const method = req.query.method;
    const callbackName = req.query.callback;
    const args = JSON.parse(req.query.args);
    let result = 0;
    if (method === 'sum') {
        // exports[method] 就是 sum function
        const sum = exports[method];
        result = sum.call(this, args);
        // 设定服务端返回的数据是 js 文件，所以前端拿到结果之后会调用 window.eval() 自动执行
        res.type('.js');
        // url 中callback 方法和数据作为callback 的参数返回前端，前端直接执行
        res.send(callbackName + '(' + JSON.stringify(result) + ')');
    } else {
        res.status(400);
        res.send('args not match the right formate');
    }
});

app.listen(8080, () => {
    console.log('The server is running at http://localhost:8080"');
});

// 相当于 ES6 module 的 export const sum = function()
exports.sum = function(args) {
    return args.a + args.b;
}