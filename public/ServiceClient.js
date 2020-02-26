function invoke(url, method, args, callback) {
    // 创建 script，src 设置为向后端发送请求的 url， query中设置 callback, 接到后端返回的请求后，调用 callback
    // window.eval() 会自动执行器包括的 js 
    var script = document.createElement('script');
    var callbackName = '__jsonp_sum' + Math.round(Math.random() * 10000);
    window[callbackName] = (result) => {
        callback(result);
        window[callbackName] = null;
        delete window[callbackName];
        document.body.removeChild(script);

    }
    script.src = url + '?method=' + method + '&callback=' + callbackName + '&args=' + encodeURIComponent(JSON.stringify(args));
    document.body.appendChild(script);
}