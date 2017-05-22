/**
 * Created by zh_zhou on 2017/5/22.
 */
var tdencrypt = function (d) {
    d = encodeURIComponent(d);
    var f = "",
        h, m, e, l, p, a, c = 0;
    do
        h = d.charCodeAt(c++),
            m = d.charCodeAt(c++),
            e = d.charCodeAt(c++),
            l = h >> 2,
            h = (h & 3) << 4 | m >> 4,
            p = (m & 15) << 2 | e >> 6,
            a = e & 63,
            isNaN(m) ? p = a = 64 : isNaN(e) && (a = 64),
            f = f + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(l) + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(h) + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(p) + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(a);
    while (c < d.length);
    return f + "/"
}