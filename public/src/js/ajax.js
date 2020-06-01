'use strict';
import i18next from 'i18next';

function Ajax() {
    let ajax = {}

    let methods = {
        get: 'GET',
        put: 'PUT',
        del: 'DELETE',
        post: 'POST',
    };

    for (let key in methods) {
        ajax[key] = function (url, params, options) {
            return request(methods[key], url, params, false, options);
        };
    }

    //创建自带加载效果的ajax
    ajax.loadable = {};
    for (let key in methods) {
        ajax.loadable[key] = function (url, params, options) {
            return request(methods[key], url, params, true, options);
        };
    }

    ajax.prefix = '/api';//所有的请求链接前加上api
    ajax.$loading = '$loading';

    ajax.beforeSend = function (props) {
    }

    ajax.signData = ajax.processData = function (props) {
        return props.params;
    }

    function onForbidden() {
        window.$alert(i18next.t('confirm.forbidden'), () => {
            window.location.hash = '';
        });
    }

    ajax.onSessionExpired = function (error, props) {
        let {method, url, params, loading, onSuccess, onError, onSessionExpired, options} = props;
        if (!window.unlock) return onError(error);
        //当Session过期之后显示解锁对话框
        window.unlock.show(function () {
            //解锁之后重新发送AJAX请求
            sendRequest(method, url, params, loading, onSuccess, onError, window.unlock.logout, options);
        });
    }
  

    function request(method, url, params, loading, options) {
        return new Promise(function (resolve, reject) {        
            sendRequest(method, url, params, loading, resolve, reject, ajax.onSessionExpired, options);
        });
    }

    window.$feedback = window.$feedback || function () {};

    function getLoading(options) {
        if (options.loadingName && window[options.loadingName]) {
            return window[options.loadingName];
        }
        if (options.context && options.context.loading) {
            return options.context.loading;
        }
        return window[ajax.$loading];
    }

    function sendRequest(method, url, params, loading, onSuccess, onError, onSessionExpired, options) {
        var _opts = {method, url, params, loading, onSuccess, onError, onSessionExpired, options};
        !options && (options = {});
        //启用加载效果
        var loadingComponent = null;
        if (loading && getLoading(options)) {
            loadingComponent = getLoading(options);
            loadingComponent.start();
        }

        let beforeSendPromise = ajax.beforeSend({method, url, params, options});
        if (!beforeSendPromise || !beforeSendPromise.then) {
            beforeSendPromise = Promise.resolve();
        }
        return beforeSendPromise.then(() => {
            params = stringifyParams(ajax.processData({method, url, params, options}), method);
            params = ajax.signData({method, url, params, options});
            if (method === 'GET') {
                url = `${url}?${params}`;
                params = undefined;
            }
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (this.readyState !== 4) return;
                //关闭加载效果
                if (loadingComponent) {
                    loadingComponent.finish();
                }

                if (this.status === 200) {
                    let res;
                    if(options.json === false) {
                        res = {
                            result: true,
                            data: this.response || this.responseText
                        }
                    } else {
                        res = JSON.parse(this.response || this.responseText || '{}');
                    }
                    if (res.result) {
                        //result存在并且为true
                        if (res.confirmMsg) {
                            delete res.result;
                            onSuccess(res);
                        } else {
                            if (res.warnMsg) {
                                window.$feedback(res.warnMsg, 'warning');
                            }
                            onSuccess(res.data);
                        }
                    } else if (res.result === false) {
                        //result存在并且为false
                        onError(res);
                        if (options && options.autoPopupErrorMsg === false) {
                            return;
                        }
                        window.$feedback(res.errorMsg);
                    } else {
                        //res.result === undefined
                        onSuccess(res);
                    }
                } else {
                    let error = {
                        errorCode: this.status,
                        errorMsg: this.statusText
                    };
                    if (this.status === 401 || this.status === 406) {
                        onSessionExpired(error, _opts);
                    } else if (this.status === 403) {
                        onForbidden();
                        onError('403 Forbidden');
                    } else if (this.status === 412) {
                        onError('412 Precondition');
                        let respon = JSON.parse(this.response || this.responseText);
                        window.$feedback(respon);
                    } else {
                        onError(error);
                        window.$feedback(`${error.errorCode} ${error.errorMsg}`);
                    }

                }
            };
            //xhr.responseType = 'json';
            xhr.open(method, `${ajax.prefix}${url}`);
            xhr.setRequestHeader('token', window.localStorage.getItem('token') || '');
            xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            if (options.headers) {
                for (let [k, v] of Object.entries(options.headers)) {
                    xhr.setRequestHeader(k, v);
                }
            }
            xhr.send(params);
        }).catch(e => {
            onError(e);
        });
    }

    function stringifyParams(params, method) {
        //如果调用方已经将参数序列化成字符串，直接返回
        if (typeof params === 'string') return params;
        //对于非GET请求，直接序列化该参数对象
        //requestBody为undefined时，将其转为空字符串，避免IE下出现错误：invalid JSON, only supports object and array
        if (method !== 'GET') return JSON.stringify(params) || '';
        //对于GET请求，将参数拼成key1=val1&key2=val2的格式
        let array = [];
        for (let key in params) {
            array.push(`${key}=${encodeURIComponent(params[key] === null || params[key] === undefined ? '' : (params[key] instanceof Array ? params[key].join(',') : params[key]))}`);
        }
        array.push(`_v=${Math.floor(Math.random() * 1000000)}`)
        return array.join('&');
    }

    ajax.sendRequest = sendRequest;
    
    return ajax;
}

let ajax = Ajax();
ajax.Ajax = Ajax;

export default ajax;
