function invokeItem(userAgent,language) {
    var navigator={
        'userAgent':userAgent,
        'language':language
    };
    var sss = JdJrTdRiskFinger(navigator);
    var getFingureEncrypted = function () {
        return sss.prototype.get();
    };
    var getFingure = function () {
        return sss.prototype.getData();
        ;
    };
    var r={
        encrypted:getFingureEncrypted(),
        raw:getFingure()
    };
    return r;
}
