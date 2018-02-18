(function (window) {

    'use strict';

    var utils = {

        noop: function() {},

        getDefaultSettings: function() {
        
            let dfSettings = {};
            dfSettings['mbShowCount'] = true;
            dfSettings['mbShowAlert'] = false;
            dfSettings['mbRunStatus'] = true;
            dfSettings['mbFilters'] = true;
            dfSettings['mbWhiteList'] = [];
            dfSettings['mbUserFilters'] = [];

            return dfSettings;
        },

        getSettings: function(callback) {
            let self = this;
            chrome.storage.local.get('mbSettings', function(res) {
                if((Object.keys(res).length) === 0) {
                    res = self.getDefaultSettings();
                    self.setSettings(res);
                    callback(res);
                } else {
                    callback(res.mbSettings);
                }
            });

        },

        setSettings: function(settings, callback) {
            callback = (callback === undefined) ? this.noop : callback;
            chrome.storage.local.set({'mbSettings' : settings}, callback);
        },

        clearSettings: function(callback) {
            callback = (callback === undefined) ? this.noop : callback;
            chrome.storage.local.clear(callback);
        },

        setOption: function(option, value, callback) {
            let self = this;
            this.getSettings(function(res) {
                res[option] = value;
                self.setSettings(res, callback);
            });
        },

        getOption: function(option, callback) {
            let self = this;
            this.getSettings(function(res) {
                if(typeof(res[option]) === 'undefined') {
                    let dfSettings = self.getDefaultSettings();
                    res[option] = dfSettings[option];
                    self.setOption(option, dfSettings[option], function() {
                        callback(dfSettings[option]);
                    });
                } else {
                    callback(res[option]);
                }
            });
        },

        cleanArray: function(arr) {
            return arr.map(function(e){
                return e.trim();
            }).filter(function(str) { 
                return /\S/.test(str);
            });
        },

        isValidFilter: function(filter) {
            return /^.*:\/\/.*\/.*?\*$/.test(filter);
        },

        getRootDomain: function(url) {
            // https://stackoverflow.com/a/23945027 (forgive my laziness -.-)
            var hostname,
                domain,
                splitArr,
                arrLen;
            if (url.indexOf("://") > -1) {
                hostname = url.split('/')[2];
            } else {
                hostname = url.split('/')[0];
            }
            hostname = hostname.split(':')[0];
            hostname = hostname.split('?')[0];

            if(/^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/.test(hostname) === true) {
                return hostname;
            }
            
            domain = hostname;
            splitArr = domain.split('.');
            arrLen = splitArr.length;
            if(arrLen > 2) {
                domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
            }
            return domain;
        },

        checkWhiteList: function(url, array) {
            if(array === null) {
                return false;
            } else {
                return (array.indexOf(url) > -1);
            }
        },

        isSpecialTab(tab) {
            return /^((chrome:)|(chrome\-extension:)|(about:)|(file:))/.test(tab.url);
        },

    };

    window.utils = utils;

}(window));