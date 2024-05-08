const dateFormat = require('date-fns');

exports.create = async (req, res, next) => {
    console.log(req.body);
    // var ipAddr = req.headers['x-forwarded-for'] ||
    //     req.connection.remoteAddress ||
    //     req.socket.remoteAddress ||
    //     req.connection.socket.remoteAddress;

    // var tmnCode = 'M0JI22JR';
    // var secretKey = 'AJACKJKXHDONMEKEGCWZXLGKBEOYMYRB';
    // var vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
    // var returnUrl = 'http://localhost:3001/shop';

    // var date = new Date();

    // var createDate = dateFormat.format(date, 'yyyymmddHHmmss');
    // var orderId = dateFormat.format(date, 'HHmmss');
    // var amount = req.body.amount;
    // var bankCode = 'NCB';

    // var orderInfo = req.body.orderDescription;
    // var orderType = 'billpayment';
    // var locale = '';
    // if (locale === null || locale === '') {
    //     locale = 'vn';
    // }
    // var currCode = 'VND';
    // var vnp_Params = {};
    // vnp_Params['vnp_Version'] = '2.1.0';
    // vnp_Params['vnp_Command'] = 'pay';
    // vnp_Params['vnp_TmnCode'] = tmnCode;
    // // vnp_Params['vnp_Merchant'] = ''
    // vnp_Params['vnp_Locale'] = locale;
    // vnp_Params['vnp_CurrCode'] = currCode;
    // vnp_Params['vnp_TxnRef'] = orderId;
    // vnp_Params['vnp_OrderInfo'] = orderInfo;
    // vnp_Params['vnp_OrderType'] = orderType;
    // vnp_Params['vnp_Amount'] = amount * 100;
    // vnp_Params['vnp_ReturnUrl'] = returnUrl;
    // vnp_Params['vnp_IpAddr'] = ipAddr;
    // vnp_Params['vnp_CreateDate'] = createDate;
    // if (bankCode !== null && bankCode !== '') {
    //     vnp_Params['vnp_BankCode'] = bankCode;
    // }
    // function sortObject(obj) {
    //     let sorted = {};
    //     let str = [];
    //     let key;
    //     for (key in obj) {
    //         if (obj.hasOwnProperty(key)) {
    //             str.push(encodeURIComponent(key));
    //         }
    //     }
    //     str.sort();
    //     for (key = 0; key < str.length; key++) {
    //         sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    //     }
    //     return sorted;
    // }
    // vnp_Params = sortObject(vnp_Params);

    // var querystring = require('qs');
    // var signData = querystring.stringify(vnp_Params, { encode: false });
    // var CryptoJS = require("crypto-js");
    // var hmac = CryptoJS.HmacSHA512('sha512', secretKey);
    // console.log(hmac);
    // var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
    // vnp_Params['vnp_SecureHash'] = signed;
    // vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

    // return vnpUrl;
    var ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;


    var tmnCode = 'M0JI22JR';
    var secretKey = 'AJACKJKXHDONMEKEGCWZXLGKBEOYMYRB';
    var vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
    var returnUrl = 'http://localhost:3001/shop';

    var date = new Date();

    var createDate = dateFormat.format(date, 'yyyymmddHHmmss');
    var orderId = dateFormat.format(date, 'HHmmss');
    var amount = 100000;
    var bankCode = 'NCB';

    var orderInfo = 'Thanh toan online';
    var orderType = 'billpayment';
    var locale = 'vn';
    if (locale === null || locale === '') {
        locale = 'vn';
    }
    var currCode = 'VND';
    var vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = orderInfo;
    vnp_Params['vnp_OrderType'] = orderType;
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if (bankCode !== null && bankCode !== '') {
        vnp_Params['vnp_BankCode'] = bankCode;
    }
    function sortObject(obj) {
        let sorted = {};
        let str = [];
        let key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                str.push(encodeURIComponent(key));
            }
        }
        str.sort();
        for (key = 0; key < str.length; key++) {
            sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
        }
        return sorted;
    }
    vnp_Params = sortObject(vnp_Params);

    var querystring = require('qs');
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require("crypto");
    var hmac = crypto.createHmac("sha512", secretKey);
    console.log(hmac);
    var signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
    console.log(signed);

    vnp_Params.vnp_SecureHash = signed;
    console.log(vnp_Params);
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
    const data = {
        url: vnpUrl
    }
    return res.send(data)
}