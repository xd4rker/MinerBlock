(function () {

    'use strict';
    
    var utils;

    function initPopupPage() {
        utils = chrome.extension.getBackgroundPage().utils;

        // Check if current domain is whitelisted
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if(!tabs) {
                return;
            }
            let ctab = tabs[0];
            let domain = utils.getRootDomain(ctab.url);
            let wlistStatus = utils.checkWhiteList(domain, chrome.extension.getBackgroundPage().mbSettings['mbWhiteList']);

            if(wlistStatus) {
                setWlistStatus(true);
                
            } else {
                setWlistStatus(false);
                // Check mb status
                utils.getOption('mbRunStatus', function(value) {
                    setBtnStatus(value);
                    chrome.extension.getBackgroundPage().updateIcon(value);
                    let mbTabstmp = chrome.extension.getBackgroundPage().mbTabs;

                    if(ctab.id in mbTabstmp) {
                        document.getElementById('blockedNum').innerText = mbTabstmp[ctab.id].length;
                    } else {
                        document.getElementById('blockedNum').innerText = 0;
                    }

                });
            }

        });

        document.getElementById('startButton').addEventListener('click', function (e) {
            chrome.runtime.sendMessage({action: 'mbStart'}, utils.noop);
            setBtnStatus(true);
            chrome.extension.getBackgroundPage().updateIcon(true);
            refreshCurrentTab();
        });

        document.getElementById('pauseButton').addEventListener('click', function (e) {
            chrome.runtime.sendMessage({action: 'mbPause'}, utils.noop);
            setBtnStatus(false);
            chrome.extension.getBackgroundPage().updateIcon(false);
            refreshCurrentTab();
        });

        document.getElementById('settingsBtn').addEventListener('click', function (e) {
            chrome.tabs.create({
                url: chrome.extension.getURL('options.html')
            });
            window.close();
        });

        document.getElementById('addWlist').addEventListener('click', function (e) {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                if(!tabs) {
                    return;
                }
                let ctab = tabs[0];
                chrome.runtime.sendMessage({action: 'addWlist', tab : ctab}, utils.noop);
                chrome.tabs.reload(ctab.tabId);
                window.close();
            });
        });

        document.getElementById('removeWlist').addEventListener('click', function (e) {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                if(!tabs) {
                    return;
                }
                let ctab = tabs[0];
                chrome.runtime.sendMessage({action: 'removeWlist', tab : ctab}, utils.noop);
                chrome.tabs.reload(ctab.tabId);
                window.close();
            });
        });

    }

    function refreshCurrentTab() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if(!tabs) {
                return;
            }
            chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
            window.close();
        });
    }

    function setWlistStatus(status) {
        document.getElementById('addWlist').style.display = (status === true) ? 'none' : '';
        document.getElementById('removeWlist').style.display = (status === true) ? '' : 'none';
        document.getElementById('hideWl').style.display = (status === true) ? 'none' : '';
    }

    function setBtnStatus(status) {
        document.getElementById('pauseButton').style.display = (status === true) ? '' : 'none';
        document.getElementById('startButton').style.display = (status === true) ? 'none' : '';
        document.getElementById('hidePs').style.display = (status === true) ? '' : 'none';
    }

    function loopEls(className, callback) {
        Array.prototype.forEach.call(document.getElementsByClassName(className), callback);
    }

    document.addEventListener('DOMContentLoaded', function () {
        initPopupPage();
    });

}());