/**
 * Created by zh_zhou on 2017/5/23.
 */
var encrypt=function(pubKey,txts){
    var f = new JSEncrypt();
    f.setPublicKey(pubKey);
    var r={};
    for (var i = 0; i < txts.length; i++) {
        r[txts[i]]=f.encrypt(txts[i]);
    }
    return r;
}