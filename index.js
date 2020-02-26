// back-end
const express = require('express');
const app = express();

app.use(express.static('./public'));
app.use('/jsonp', (req, res, next) => {
    const method = req.query.method;
    const callbackName = req.query.callback;
    const args = JSON.parse(req.query.args);
    let result = 0;
    if (method === 'sum') {
        const sum = exports[method];
        result = sum.call(this, args);
        res.type('.js');
        res.send(callbackName + '(' + JSON.stringify(result) + ')');
    } else {
        res.status(400);
        res.send('args not match the right formate');
    }
});

app.listen(8080, () => {
    console.log('The server is running at http://localhost:8080"');
});

exports.sum = function(args) {
    return args.a + args.b;
}