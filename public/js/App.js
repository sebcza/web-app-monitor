'use strict';
 
var App = {};

App.Configuration = (function () {
    var getRoot = function () {
        return $('body').data('apiroot');
    };
    return {
        Root: getRoot
    }
}());
 
App.BusyIndicator = (function () {
 
    var counter = 0;
 
    var observeCounter = function () {
        var busyIndicator = $('#BusyIndicator');
        if (counter <= 0) {
            counter = 0;
            busyIndicator.hide();
        } else {
            busyIndicator.show();
        }
    };
 
    var pushBusy = function () {
        ++counter;
        observeCounter();
    };
 
    var popBusy = function () {
        --counter;
        observeCounter();
    };
 
    return {
        pushBusy: pushBusy,
        popBusy: popBusy
    };
}());
 
App.Api = (function () {
 
    var buildOptions = function (options) {
        options = options || {};
        options.setBusy = options.setBusy === undefined ? true : options.setBusy;
        options.dataType = options.dataType === undefined ? 'json' : options.dataType;
        options.contentType = options.contentType === undefined ? 'application/json; charset=utf-8' : options.contentType;
        options.processData = options.processData === undefined ? true : options.processData;
        return options;
    };
    var send = function (uri, method, data, options) {
        options = buildOptions(options);
        if (options.setBusy) {
            App.BusyIndicator.pushBusy();
        }
        return $.ajax({
            url:  uri,
            type: method,
            contentType: options.contentType,
            data: data || {},
            dataType: options.dataType,
            processData: options.processData
        }).fail(function (jqXHR) {
            alert(jqXHR.statusText);
        }).always(function () {
            if (options.setBusy) {
                App.BusyIndicator.popBusy();
            }
        });
    };
 
    var get = function (uri, data, options) {
        return send(uri, 'get', data, options);
    };
 
    var post = function (uri, data, options) {
        return send(uri, 'post', JSON.stringify(data), options);
    };
 
    var put = function (uri, data, options) {
        return send(uri, 'put', JSON.stringify(data), options);
    };
 
    var del = function (uri, data, options) {
        return send(uri, 'delete', data, options);
    };
 
 
    return {
        get: get,
        put: put,
        post: post,
        delete: del
    };
}());
 

 