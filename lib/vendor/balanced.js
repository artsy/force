// Balanced.js 0.0.2
/*
Copyright (c) 2012 Balanced

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

-----

Copyright (c) 2012 Balanced
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
(function(ctx) {
    "use strict";

//////////////////////////////////////////////////
// Compiled from src/balanced.js
//////////////////////////////////////////////////

var cc = {
    isCardNumberValid:function (cardNumber) {
        if (!cardNumber) {
            return false;
        }
        cardNumber = (cardNumber + '').replace(/\D+/g, '').split('').reverse();
        if (!cardNumber.length || cardNumber.length < 12) {
            return false;
        }
        var total = 0, i;
        for (i = 0; i < cardNumber.length; i++) {
            cardNumber[i] = parseInt(cardNumber[i], 10);
            total += i % 2 ? 2 * cardNumber[i] - (cardNumber[i] > 4 ? 9 : 0) : cardNumber[i];
        }
        return (total % 10) === 0;
    },
    cardType:function (cardNumber) {
        var p = {};
        p['51'] = p['52'] = p['53'] = p['54'] = p['55'] = 'Mastercard';
        p['34'] = p['37'] = 'American Express';
        p['4'] = 'VISA';
        p['6'] = 'Discover Card';

        if (cardNumber) {
            for (var k in p) {
                if (cardNumber.indexOf(k) === 0) {
                    return p[k];
                }
            }
        }
        return null;
    },
    isSecurityCodeValid:function (cardNumber, securityCode) {
        var cardType = cc.cardType(cardNumber);
        if (!cardType) {
            return false;
        }
        var requiredLength = (cardType === 'American Express' ? 4 : 3);
        return securityCode && securityCode.toString().replace(/\D+/g, '').length === requiredLength;
    },
    isExpiryValid:function (expiryMonth, expiryYear) {
        if (!expiryMonth || !expiryYear) {
            return false;
        }
        expiryMonth = parseInt(expiryMonth, 10);
        expiryYear = parseInt(expiryYear, 10);
        if (isNaN(expiryMonth) || isNaN(expiryYear) || expiryMonth > 12 || expiryMonth < 1) {
            return false;
        }
        var today = new Date();
        return !(today.getFullYear() > expiryYear ||
            (today.getFullYear() === expiryYear && today.getMonth() >= expiryMonth));
    },
    validate:function (cardData) {
        if (cardData.card_number) {
            cardData.card_number = cardData.card_number.toString().trim()
        }
        var cardNumber = cardData.card_number,
            securityCode = cardData.security_code,
            expiryMonth = cardData.expiration_month,
            expiryYear = cardData.expiration_year;
        var errors = {};
        if (!cc.isCardNumberValid(cardNumber)) {
            errors.card_number = '"' + cardNumber + '" is not a valid credit card number';
        }
        if (typeof securityCode !== 'undefined' && securityCode !== null && !cc.isSecurityCodeValid(cardNumber, securityCode)) {
            errors.security_code = '"' + securityCode + '" is not a valid credit card security code';
        }
        if (!cc.isExpiryValid(expiryMonth, expiryYear)) {
            //  inconsistent
            errors.expiry = '"' + expiryMonth + '-' + expiryYear + '" is not a valid credit card expiry date';
            //  consistent
            errors.expiration = '"' + expiryMonth + '-' + expiryYear + '" is not a valid credit card expiration date';
        }
        return errors;
    },
    create:function (data, callback) {
        if (!data) {
            noDataError(callback);
            return;
        }
        if (!_marketplace_uri) {
            noDataError(callback, 'You need to call balanced.init first');
            return;
        }
        var requiredKeys = ['card_number', 'expiration_month',
            'expiration_year'];
        var errors = validate(data, requiredKeys, cc.validate);
        var ec = 0;
        for (var p in errors) {
            ec++;
            break;
        }
        if (ec > 0) {
            callback({
                error:errors,
                status:400
            });
        } else {
            var uri = _marketplace_uri + '/cards';
            var payload = preparePayload(data);
            sendWhenReady(uri, payload, callback);
        }
    }
};

var em = {
    validate:function (emailAddress) {
        var match = emailAddress &&
            emailAddress.match(/[a-z0-9!#$%&'*+\/=?\^_`{|}~\-]+(?:\.[a-z0-9!#$%&'*+\/=?\^_`{|}~\-]+)*@(?:[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?/i);
        return match && match.toString() === emailAddress;
    }
};

var ba = {
    types: ['savings', 'checking'],
    validate:function (accountData) {
        var noun = ('routing_number' in accountData) ? 'routing_number' : 'bank_code';
        var bankCode = accountData[noun];
        var errors = {};
        if (!ba.validateRoutingNumber(bankCode)) {
            errors[noun] = '"' + bankCode + '" is not a valid ' + noun.replace('_', ' ');
        }
        if ('type' in accountData && !ba.validateType(accountData.type)) {
            errors.type = '"' + accountData.type + '" must be one of: "' + ba.types.join('", "') + '"';
        }
        return errors;
    },
    validateRoutingNumber:function (routingNumber) {
        if (!routingNumber) {
            return false;
        }
        routingNumber = routingNumber.match(/\d+/g);

        if (!routingNumber) {
            return false;
        }

        routingNumber = routingNumber.join('');

        if (!routingNumber || routingNumber.length != 9) {
            return false;
        }

        var a = routingNumber.toString().split('');
        var d = [];
        for (var i = 0; i < a.length; i++) {
            d.push(parseInt(a[i], 10));
        }
        return d[8] === (
                7 * (d[0] + d[3] + d[6]) +
                3 * (d[1] + d[4] + d[7]) +
                9 * (d[2] + d[5])
            ) % 10;
    },
    lookupRoutingNumber:function (routingNumber, callback) {
        if (!_marketplace_uri) {
            noDataError(callback, 'You need to call balanced.init first');
            return;
        }
        if (!routingNumber) {
            noDataError(callback);
            return;
        }
        var uri = ROUTING_NUMBER_URI + routingNumber;
        sendWhenReady(uri, null, callback, 'GET');
    },
    validateType: function (type) {
        if (!type) {
            return true;
        }
        return ba.types.indexOf(type) >= 0;
    },
    create:function (data, callback) {
        if (!data) {
            noDataError(callback);
            return;
        }
        if (!_marketplace_uri) {
            noDataError(callback, 'You need to call balanced.init first');
            return;
        }
        var requiredKeys = ['name', 'account_number', 'bank_code'];
        if (data && 'routing_number' in data) {
            requiredKeys = ['name', 'account_number', 'routing_number'];
        }
        var errors = validate(data, requiredKeys, ba.validate);
        var ec = 0;
        for (var p in errors) {
            ec++;
            break;
        }
        if (ec > 0) {
            callback({
                error:errors,
                status:400
            });
        } else {
            var uri = _marketplace_uri + '/bank_accounts';
            var payload = preparePayload(data);
            sendWhenReady(uri, payload, callback);
        }
    }
};

ctx.balanced = {
    init:function (marketplace_uri, params) {
        params = params || {};
        if ('server' in params) {
            server = params.server;
            proxy = server + '/proxy';
        }
        if ('debug' in params) {
            debug = params.debug;
            proxy = server + '/devproxy';
        }
        try {
            _marketplace_uri = new RegExp(MARKETPLACE_URI_REGEX).exec(marketplace_uri)[0];
        } catch (e) {
            throw 'Invalid marketplace uri "' + marketplace_uri + '"';
        }

        createProxy(params.mock);
    },
    card:cc, bankAccount:ba, emailAddress:em
};

var server = 'https://js.balancedpayments.com',
    proxy = server + '/proxy',
    debug = 0,
    _marketplace_uri,
    MARKETPLACE_URI_REGEX = '/v1/marketplaces/(\\w|-)+',
    ROUTING_NUMBER_URI = '/v1/bank_accounts/routing_numbers/',
    validate = function (details, requiredKeys, validationMethod) {
        var errors = {};

        validateData(requiredKeys, details, errors);
        var additionalErrors = validationMethod(details);
        for (var k in additionalErrors) {
            errors[k] = additionalErrors[k];
        }
        return errors;
    },
    noDataError = function (callback, message) {
        var m = (message) ? message : 'No data supplied';
        if (!callback) {
            throw m;
        } else {
            callback({
                error:[m],
                status:400
            });
        }
    };


//////////////////////////////////////////////////
// Compiled from src/utils.js
//////////////////////////////////////////////////

var loadScript = function (scriptUri, callback) {
    var el = document.createElement('script');
    el.setAttribute('type', 'text/javascript');
    el.setAttribute('src', scriptUri);
    if (callback) {
        // most browsers
        el.onload = callback;
        // IE 6 & 7
        el.onreadystatechange = function () {
            if (this.readyState == 'complete') {
                callback();
            }
        };
    }
    document.getElementsByTagName('head')[0].appendChild(el);
};

//  this is for shitty versions of IE
if (typeof JSON === 'undefined' || typeof JSON.stringify !== 'function' || typeof JSON.parse !== 'function') {
    loadScript(server + '/v1/json2.min.js');
}

//  XD Communication stuff begins here.
var frame = null,
    frameName = null,
    messageQueue = [],
    callbackQueue = [],
    timeoutQueue = [],
    callCount = 0,
    callbackInitialized = false,
    windowProxy,
    capabilities = {
        system_timezone:-(new Date()).getTimezoneOffset() / 60,
        user_agent:navigator.userAgent,
        language:navigator.language,
        kp: 0,
        cli: 0,
        loaded: (new Date) * 1,
        screen_width: screen.width,
        screen_length: screen.height,
        hist: window.history.length,
        cookie: (function () {
            var cookie = document.cookie.match(/__b=([a-zA-Z0-9\-!\.]+)/);
            if(!cookie) {
                cookie = (new Date) * 1 + '.' + Math.random().toString().substr(2) + '.0!0';
            }else{
                cookie = cookie[1];
            }
            cookie = cookie.split('!');
            var cookie_parts = cookie[0].split('.');
            if(cookie_parts.length < 3) {
                cookie_parts[1] = Math.random().toString().substr(2);
                cookie_parts[2] = 0;
            }
            cookie_parts[2]++;
            cookie = cookie_parts.join('.') + '!' + cookie[1];
            var cookie_date = new Date;
            cookie_date.setDate(cookie_date.getDate() + 365);
            document.cookie='__b=' + cookie + ' ;expires='+cookie_date.toUTCString();

            return cookie;
        })()
    };

var initIFrame = function () {
    frame = null;
    var body = document.getElementsByTagName("body")[0],
        iframe = document.createElement("iframe");
    var frameName = "balancedFrame" + (new Date()).getTime();
    var src = proxy + "#" + encodeURIComponent(window.location.href);
    var attributes = {
        src:src,
        name:frameName,
        id:frameName,
        frameborder:0,
        scrolling:'no',
        allowtransparency:'true',
        width:0,
        height:0,
        style:'position:absolute;top:0;left:0;width:0;height:0'
    };
    for (var key in attributes) {
        iframe.setAttribute(key, attributes[key]);
    }
    var onLoad = function () {
        frame = window.frames[frameName];
        processMessages();
    };
    if (iframe.attachEvent) {
        iframe.attachEvent("onload", onLoad);
    } else {
        iframe.onload = onLoad;
    }
    body.appendChild(iframe);
};

var processMessages = function () {
    var messageQueueLength = messageQueue.length;
    if (!frame || !messageQueueLength) {
        return;
    }
    function processMessage(data) {
        var message = data.message,
            messageId = message.id;
        callbackQueue[messageId] = data.callback;
        XD.postMessage(message, proxy, proxy, frame);
        timeoutQueue[messageId] = window.setTimeout(function () {
            callbackQueue[messageId]({
                status:504,
                error:{
                    message:'There was a timeout processing your operation'
                }
            });
            delete callbackQueue[messageId];
            delete timeoutQueue[messageId];
        }, 60 * 1000);
    }

    for (var counter = 0; counter < messageQueueLength; ++counter) {
        var data = messageQueue[counter];
        processMessage(data);
    }
    messageQueue = [];
};

var receiveMessage = function (response) {
    var messageId = response.id;
    var data = response.response;
    try {
        data = JSON.parse(data);
    } catch (e) {

    }
    data.status = parseInt(data.status, 10);
    callbackQueue[messageId](data);
    window.clearTimeout(timeoutQueue[messageId]);
    delete callbackQueue[messageId];
    delete timeoutQueue[messageId];
};

var validateData = function (requiredKeys, data, errors) {
    for (var i = 0; i < requiredKeys.length; i++) {
        var key = requiredKeys[i];
        if (!data || !(key in data) || !data[key]) {
            errors[key] = 'Missing field';
        }
    }
};

var preparePayload = function (unencryptedDict) {
    //  blend
    capabilities.submitted = (new Date) * 1;
    capabilities.scrollX = window.scrollX;
    capabilities.scrollY = window.scrollY;
    for (var k in capabilities) {
        if (!(k in unencryptedDict)) {
            unencryptedDict[k] = capabilities[k];
        }
    }
    return JSON.stringify(unencryptedDict);
};

var sendWhenReady = function (uri, data, callback, method) {
    method = method || 'POST';
    messageQueue.push({
        message:{
            id:callCount++,
            uri:uri,
            params:data,
            method:method
        },
        callback:callback
    });
    processMessages();
};

function addEvent(obj, type, fn) {
    if (obj.addEventListener)
        obj.addEventListener(type, fn, false);
    else if (obj.attachEvent) {
        obj["e" + type + fn] = fn;
        obj[type + fn] = function () {
            obj["e" + type + fn](window.event);
        };
        obj.attachEvent("on" + type, obj[type + fn]);
    }
}

var shifted = false;

function icl(e) {
    e = (e) ? e : window.event;
    var shifton = false;
    if (e.shiftKey) {
        shifton = e.shiftKey;
    } else if (e.modifiers) {
        shifton = !!(e.modifiers & 4);
    }
    if (shifton) {
        shifted = true;
    }
    return shifted;
}

addEvent(window, 'keydown', function (e) {
    if (!capabilities.cl) {
        capabilities.cl = icl(e);
    }
    capabilities.kp++;
});
addEvent(window, 'paste', function () {
    capabilities.ps = !0;
});
addEvent(window, 'click', function () {
    capabilities.cli++;
});

var createProxy = function (proxy) {
    if (!proxy) {
        windowProxy = XD;
    } else {
        windowProxy = proxy;
    }

    messageQueue = [];
    callbackQueue = {};
    timeoutQueue = {};

    var setupIframe = function () {
        initIFrame();
        if (!callbackInitialized) {
            XD.receiveMessage(receiveMessage, server);
            callbackInitialized = true;
        }
    };

    if (!frameName || !document.getElementById(frameName)) {
        if (typeof document !== "undefined" && document && document.body) {
            setupIframe();
        } else {
            if (typeof window !== "undefined" && window && !callbackInitialized) {
                if (window.addEventListener) {
                    window.addEventListener("load", setupIframe, false);
                } else {
                    window.attachEvent("onload", setupIframe);
                }
            }
        }
    }
};

var countDict = function (dict) {
    var i = 0;
    for (var k in dict) {
        i++;
    }
    return i;
};

if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    };
}


//////////////////////////////////////////////////
// Compiled from lib/xd.js
//////////////////////////////////////////////////

var XD = (function () {
    'use strict';
    var deserialize = function (data) {
        for (var decoded = {}, keyPairs = data.split("&"), keyPairLength = keyPairs.length, c = null, d = null, i = 0; i < keyPairLength; ++i) {
            d = keyPairs[i].split("=");
            d[0] = decodeURIComponent(d[0]);
            d[1] = decodeURIComponent(d[1]);
            for (var f = d[0], c = [], g = -1;
                 (g = f.indexOf("[")) !== -1;) c.push(f.substr(g, f.indexOf("]") - g + 1)), f = f.substr(f.indexOf("]") + 1);
            if (c.length === 0) decoded[d[0]] = d[1];
            else {
                g = d[0].substr(0, d[0].indexOf("["));
                typeof decoded[g] === "undefined" && (decoded[g] = {});
                for (var f = decoded[g], t = c.length, p = 0; p < t - 1; ++p) g = c[p].substr(1, c[p].length - 2), typeof f[g] === "undefined" && (f[g] = {}), f = f[g];
                c = c[t - 1];
                g = c.substr(1, c.length - 2);
                f[g] = d[1]
            }
        }
        return decoded
    };
    var serialize = function (data, prefix) {
        var encoded = [],
            key;
        for (key in data) if (data.hasOwnProperty(key)) {
            var objectKey = prefix ? prefix + "[" + key + "]" : key,
                value = data[key];
            encoded.push(typeof value == "object" ? serialize(value, objectKey) : encodeURIComponent(objectKey) + "=" + encodeURIComponent(value))
        }
        return encoded.join("&");
    };
    return {
        receiveMessage:function (callback, origin) {
            if (typeof window === "undefined") {
                return;
            }
            if (window.postMessage) {
                var attachedCallback = function (response) {
                    if (response.origin.toLowerCase() !== origin.toLowerCase()) {
                        return false;
                    }
                    callback(deserialize(response.data))
                };
                if (window.addEventListener) {
                    window.addEventListener("message", attachedCallback, false)
                } else {
                    window.attachEvent("onmessage", attachedCallback);
                }
            } else {
                var currentHash = window.location.hash;
                setInterval(function () {
                    var newHash = window.location.hash,
                        hashIdentifier = /^#?\d+&/;
                    if (newHash !== currentHash && hashIdentifier.test(newHash)) {
                        currentHash = newHash;
                        window.location.hash = "";
                        callback(deserialize(newHash.replace(hashIdentifier, "")));
                    }
                }, 100);
            }
        },
        postMessage:function (messageToSend, callback, iframeSrc, iframe) {
            if (typeof window === "undefined") {
                return;
            }
            messageToSend = serialize(messageToSend);
            if (typeof window.postMessage === "undefined") {
                var url = iframeSrc + '#' + +new Date + Math.floor(Math.random() * 1000) + "&" + messageToSend;
                iframe.location.href = url;
            } else {
                iframe.postMessage(messageToSend, callback);
            }
        }
    };
})();

    window.balanced = balanced;

})(this);
