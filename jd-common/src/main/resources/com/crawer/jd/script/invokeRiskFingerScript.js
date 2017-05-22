function invokeItem(riskId,userAgent,language) {
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
    var fp=getFingureEncrypted();
    var t={
        fp: fp,
        o: "passport.com.crawer.jd.com/new/login.aspx",
        oid: "",
        p: "s",
        pin: "",
        t: riskId
    };
    var r={
        fp:fp,
        g:JSON.stringify(getFingure()),
        a:JSON.stringify(t)
    };
    return r;
}
