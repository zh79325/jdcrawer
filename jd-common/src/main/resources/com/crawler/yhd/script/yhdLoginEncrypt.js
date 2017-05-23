var navigator = {};
var window = {};
var Hex,ASN1,Base64;
var JSEncryptExports = {};
(function (cR) {
    var c6;
    var dM = 244837814094590;
    var c2 = ((dM & 16777215) == 15715070);

    function d4(a, b, c) {
        if (a != null) {
            if ("number" == typeof a) {
                this.fromNumber(a, b, c)
            }
            else {
                if (b == null && "string" != typeof a) {
                    this.fromString(a, 256)
                }
                else {
                    this.fromString(a, b)
                }
            }
        }
    }

    function cr() {
        return new d4(null)
    }

    function b1(g, b, c, f, d, a) {
        while (--a >= 0) {
            var e = b * this[g++] + c[f] + d;
            d = Math.floor(e / 67108864);
            c[f++] = e & 67108863
        }
        return d
    }

    function d0(f, i, j, g, b, h) {
        var d = i & 32767,
            k = i >> 15;
        while (--h >= 0) {
            var e = this[f] & 32767;
            var a = this[f++] >> 15;
            var c = k * e + a * d;
            e = d * e + ((c & 32767) << 15) + j[g] + (b & 1073741823);
            b = (e >>> 30) + (c >>> 15) + k * a + (b >>> 30);
            j[g++] = e & 1073741823
        }
        return b
    }

    function cc(f, i, j, g, b, h) {
        var d = i & 16383,
            k = i >> 14;
        while (--h >= 0) {
            var e = this[f] & 16383;
            var a = this[f++] >> 14;
            var c = k * e + a * d;
            e = d * e + ((c & 16383) << 14) + j[g] + b;
            b = (e >> 28) + (c >> 14) + k * a;
            j[g++] = e & 268435455
        }
        return b
    }
    if (c2 && (navigator.appName == "Microsoft Internet Explorer")) {
        d4.prototype.am = d0;
        c6 = 30
    }
    else {
        if (c2 && (navigator.appName != "Netscape")) {
            d4.prototype.am = b1;
            c6 = 26
        }
        else {
            d4.prototype.am = cc;
            c6 = 28
        }
    }
    d4.prototype.DB = c6;
    d4.prototype.DM = ((1 << c6) - 1);
    d4.prototype.DV = (1 << c6);
    var cz = 52;
    d4.prototype.FV = Math.pow(2, cz);
    d4.prototype.F1 = cz - c6;
    d4.prototype.F2 = 2 * c6 - cz;
    var b2 = "0123456789abcdefghijklmnopqrstuvwxyz";
    var dt = new Array();
    var co, b8;
    co = "0".charCodeAt(0);
    for (b8 = 0; b8 <= 9; ++b8) {
        dt[co++] = b8
    }
    co = "a".charCodeAt(0);
    for (b8 = 10; b8 < 36; ++b8) {
        dt[co++] = b8
    }
    co = "A".charCodeAt(0);
    for (b8 = 10; b8 < 36; ++b8) {
        dt[co++] = b8
    }

    function dO(a) {
        return b2.charAt(a)
    }

    function cC(a, b) {
        var c = dt[a.charCodeAt(b)];
        return (c == null) ? -1 : c
    }

    function cX(a) {
        for (var b = this.t - 1; b >= 0; --b) {
            a[b] = this[b]
        }
        a.t = this.t;
        a.s = this.s
    }

    function dE(a) {
        this.t = 1;
        this.s = (a < 0) ? -1 : 0;
        if (a > 0) {
            this[0] = a
        }
        else {
            if (a < -1) {
                this[0] = a + DV
            }
            else {
                this.t = 0
            }
        }
    }

    function dp(b) {
        var a = cr();
        a.fromInt(b);
        return a
    }

    function cL(c, d) {
        var f;
        if (d == 16) {
            f = 4
        }
        else {
            if (d == 8) {
                f = 3
            }
            else {
                if (d == 256) {
                    f = 8
                }
                else {
                    if (d == 2) {
                        f = 1
                    }
                    else {
                        if (d == 32) {
                            f = 5
                        }
                        else {
                            if (d == 4) {
                                f = 2
                            }
                            else {
                                this.fromRadix(c, d);
                                return
                            }
                        }
                    }
                }
            }
        }
        this.t = 0;
        this.s = 0;
        var g = c.length,
            b = false,
            a = 0;
        while (--g >= 0) {
            var e = (f == 8) ? c[g] & 255 : cC(c, g);
            if (e < 0) {
                if (c.charAt(g) == "-") {
                    b = true
                }
                continue
            }
            b = false;
            if (a == 0) {
                this[this.t++] = e
            }
            else {
                if (a + f > this.DB) {
                    this[this.t - 1] |= (e & ((1 << (this.DB - a)) - 1)) << a;
                    this[this.t++] = (e >> (this.DB - a))
                }
                else {
                    this[this.t - 1] |= e << a
                }
            }
            a += f;
            if (a >= this.DB) {
                a -= this.DB
            }
        }
        if (f == 8 && (c[0] & 128) != 0) {
            this.s = -1;
            if (a > 0) {
                this[this.t - 1] |= ((1 << (this.DB - a)) - 1) << a
            }
        }
        this.clamp();
        if (b) {
            d4.ZERO.subTo(this, this)
        }
    }

    function dX() {
        var a = this.s & this.DM;
        while (this.t > 0 && this[this.t - 1] == a) {
            --this.t
        }
    }

    function dV(d) {
        if (this.s < 0) {
            return "-" + this.negate().toString(d)
        }
        var h;
        if (d == 16) {
            h = 4
        }
        else {
            if (d == 8) {
                h = 3
            }
            else {
                if (d == 2) {
                    h = 1
                }
                else {
                    if (d == 32) {
                        h = 5
                    }
                    else {
                        if (d == 4) {
                            h = 2
                        }
                        else {
                            return this.toRadix(d)
                        }
                    }
                }
            }
        }
        var b = (1 << h) - 1,
            c, e = false,
            g = "",
            f = this.t;
        var a = this.DB - (f * this.DB) % h;
        if (f-- > 0) {
            if (a < this.DB && (c = this[f] >> a) > 0) {
                e = true;
                g = dO(c)
            }
            while (f >= 0) {
                if (a < h) {
                    c = (this[f] & ((1 << a) - 1)) << (h - a);
                    c |= this[--f] >> (a += this.DB - h)
                }
                else {
                    c = (this[f] >> (a -= h)) & b;
                    if (a <= 0) {
                        a += this.DB;
                        --f
                    }
                }
                if (c > 0) {
                    e = true
                }
                if (e) {
                    g += dO(c)
                }
            }
        }
        return e ? g : "0"
    }

    function cf() {
        var a = cr();
        d4.ZERO.subTo(this, a);
        return a
    }

    function dl() {
        return (this.s < 0) ? this.negate() : this
    }

    function dR(b) {
        var c = this.s - b.s;
        if (c != 0) {
            return c
        }
        var a = this.t;
        c = a - b.t;
        if (c != 0) {
            return (this.s < 0) ? -c : c
        }
        while (--a >= 0) {
            if ((c = this[a] - b[a]) != 0) {
                return c
            }
        }
        return 0
    }

    function dk(a) {
        var b = 1,
            c;
        if ((c = a >>> 16) != 0) {
            a = c;
            b += 16
        }
        if ((c = a >> 8) != 0) {
            a = c;
            b += 8
        }
        if ((c = a >> 4) != 0) {
            a = c;
            b += 4
        }
        if ((c = a >> 2) != 0) {
            a = c;
            b += 2
        }
        if ((c = a >> 1) != 0) {
            a = c;
            b += 1
        }
        return b
    }

    function ck() {
        if (this.t <= 0) {
            return 0
        }
        return this.DB * (this.t - 1) + dk(this[this.t - 1] ^ (this.s & this.DM))
    }

    function dv(c, a) {
        var b;
        for (b = this.t - 1; b >= 0; --b) {
            a[b + c] = this[b]
        }
        for (b = c - 1; b >= 0; --b) {
            a[b] = 0
        }
        a.t = this.t + c;
        a.s = this.s
    }

    function cU(c, a) {
        for (var b = c; b < this.t; ++b) {
            a[b - c] = this[b]
        }
        a.t = Math.max(this.t - c, 0);
        a.s = this.s
    }

    function bV(c, g) {
        var d = c % this.DB;
        var b = this.DB - d;
        var e = (1 << b) - 1;
        var h = Math.floor(c / this.DB),
            a = (this.s << d) & this.DM,
            f;
        for (f = this.t - 1; f >= 0; --f) {
            g[f + h + 1] = (this[f] >> b) | a;
            a = (this[f] & e) << d
        }
        for (f = h - 1; f >= 0; --f) {
            g[f] = 0
        }
        g[h] = a;
        g.t = this.t + h + 1;
        g.s = this.s;
        g.clamp()
    }

    function ec(c, f) {
        f.s = this.s;
        var g = Math.floor(c / this.DB);
        if (g >= this.t) {
            f.t = 0;
            return
        }
        var d = c % this.DB;
        var b = this.DB - d;
        var a = (1 << d) - 1;
        f[0] = this[g] >> d;
        for (var e = g + 1; e < this.t; ++e) {
            f[e - g - 1] |= (this[e] & a) << b;
            f[e - g] = this[e] >> d
        }
        if (d > 0) {
            f[this.t - g - 1] |= (this.s & a) << b
        }
        f.t = this.t - g;
        f.clamp()
    }

    function b7(d, c) {
        var b = 0,
            a = 0,
            e = Math.min(d.t, this.t);
        while (b < e) {
            a += this[b] - d[b];
            c[b++] = a & this.DM;
            a >>= this.DB
        }
        if (d.t < this.t) {
            a -= d.s;
            while (b < this.t) {
                a += this[b];
                c[b++] = a & this.DM;
                a >>= this.DB
            }
            a += this.s
        }
        else {
            a += this.s;
            while (b < d.t) {
                a -= d[b];
                c[b++] = a & this.DM;
                a >>= this.DB
            }
            a -= d.s
        }
        c.s = (a < 0) ? -1 : 0;
        if (a < -1) {
            c[b++] = this.DV + a
        }
        else {
            if (a > 0) {
                c[b++] = a
            }
        }
        c.t = b;
        c.clamp()
    }

    function dD(d, c) {
        var b = this.abs(),
            a = d.abs();
        var e = b.t;
        c.t = e + a.t;
        while (--e >= 0) {
            c[e] = 0
        }
        for (e = 0; e < a.t; ++e) {
            c[e + b.t] = b.am(0, a[e], c, e, 0, b.t)
        }
        c.s = 0;
        c.clamp();
        if (this.s != d.s) {
            d4.ZERO.subTo(c, c)
        }
    }

    function dm(d) {
        var b = this.abs();
        var a = d.t = 2 * b.t;
        while (--a >= 0) {
            d[a] = 0
        }
        for (a = 0; a < b.t - 1; ++a) {
            var c = b.am(a, b[a], d, 2 * a, 0, 1);
            if ((d[a + b.t] += b.am(a + 1, 2 * b[a], d, 2 * a + 1, c, b.t - a - 1)) >= b.DV) {
                d[a + b.t] -= b.DV;
                d[a + b.t + 1] = 1
            }
        }
        if (d.t > 0) {
            d[d.t - 1] += b.am(a, b[a], d, 2 * a, 0, 1)
        }
        d.s = 0;
        d.clamp()
    }

    function ee(l, r, j) {
        var d = l.abs();
        if (d.t <= 0) {
            return
        }
        var q = this.abs();
        if (q.t < d.t) {
            if (r != null) {
                r.fromInt(0)
            }
            if (j != null) {
                this.copyTo(j)
            }
            return
        }
        if (j == null) {
            j = cr()
        }
        var k = cr(),
            n = this.s,
            o = l.s;
        var e = this.DB - dk(d[d.t - 1]);
        if (e > 0) {
            d.lShiftTo(e, k);
            q.lShiftTo(e, j)
        }
        else {
            d.copyTo(k);
            q.copyTo(j)
        }
        var h = k.t;
        var m = k[h - 1];
        if (m == 0) {
            return
        }
        var i = m * (1 << this.F1) + ((h > 1) ? k[h - 2] >> this.F2 : 0);
        var a = this.FV / i,
            b = (1 << this.F1) / i,
            c = 1 << this.F2;
        var f = j.t,
            g = f - h,
            s = (r == null) ? cr() : r;
        k.dlShiftTo(g, s);
        if (j.compareTo(s) >= 0) {
            j[j.t++] = 1;
            j.subTo(s, j)
        }
        d4.ONE.dlShiftTo(h, s);
        s.subTo(k, k);
        while (k.t < h) {
            k[k.t++] = 0
        }
        while (--g >= 0) {
            var p = (j[--f] == m) ? this.DM : Math.floor(j[f] * a + (j[f - 1] + c) * b);
            if ((j[f] += k.am(0, p, j, g, 0, h)) < p) {
                k.dlShiftTo(g, s);
                j.subTo(s, j);
                while (j[f] < --p) {
                    j.subTo(s, j)
                }
            }
        }
        if (r != null) {
            j.drShiftTo(h, r);
            if (n != o) {
                d4.ZERO.subTo(r, r)
            }
        }
        j.t = h;
        j.clamp();
        if (e > 0) {
            j.rShiftTo(e, j)
        }
        if (n < 0) {
            d4.ZERO.subTo(j, j)
        }
    }

    function t(b) {
        var a = cr();
        this.abs().divRemTo(b, null, a);
        if (this.s < 0 && a.compareTo(d4.ZERO) > 0) {
            b.subTo(a, a)
        }
        return a
    }

    function b6(a) {
        this.m = a
    }

    function du(a) {
        if (a.s < 0 || a.compareTo(this.m) >= 0) {
            return a.mod(this.m)
        }
        else {
            return a
        }
    }

    function cH(a) {
        return a
    }

    function dC(a) {
        a.divRemTo(this.m, null, a)
    }

    function b0(b, c, a) {
        b.multiplyTo(c, a);
        this.reduce(a)
    }

    function dy(b, a) {
        b.squareTo(a);
        this.reduce(a)
    }
    b6.prototype.convert = du;
    b6.prototype.revert = cH;
    b6.prototype.reduce = dC;
    b6.prototype.mulTo = b0;
    b6.prototype.sqrTo = dy;

    function dg() {
        if (this.t < 1) {
            return 0
        }
        var b = this[0];
        if ((b & 1) == 0) {
            return 0
        }
        var a = b & 3;
        a = (a * (2 - (b & 15) * a)) & 15;
        a = (a * (2 - (b & 255) * a)) & 255;
        a = (a * (2 - (((b & 65535) * a) & 65535))) & 65535;
        a = (a * (2 - b * a % this.DV)) % this.DV;
        return (a > 0) ? this.DV - a : -a
    }

    function d8(a) {
        this.m = a;
        this.mp = a.invDigit();
        this.mpl = this.mp & 32767;
        this.mph = this.mp >> 15;
        this.um = (1 << (a.DB - 15)) - 1;
        this.mt2 = 2 * a.t
    }

    function ct(b) {
        var a = cr();
        b.abs().dlShiftTo(this.m.t, a);
        a.divRemTo(this.m, null, a);
        if (b.s < 0 && a.compareTo(d4.ZERO) > 0) {
            this.m.subTo(a, a)
        }
        return a
    }

    function cQ(b) {
        var a = cr();
        b.copyTo(a);
        this.reduce(a);
        return a
    }

    function z(b) {
        while (b.t <= this.mt2) {
            b[b.t++] = 0
        }
        for (var d = 0; d < this.m.t; ++d) {
            var a = b[d] & 32767;
            var c = (a * this.mpl + (((a * this.mph + (b[d] >> 15) * this.mpl) & this.um) << 15)) & b.DM;
            a = d + this.m.t;
            b[a] += this.m.am(0, c, b, d, 0, this.m.t);
            while (b[a] >= b.DV) {
                b[a] -= b.DV;
                b[++a]++
            }
        }
        b.clamp();
        b.drShiftTo(this.m.t, b);
        if (b.compareTo(this.m) >= 0) {
            b.subTo(this.m, b)
        }
    }

    function cF(b, a) {
        b.squareTo(a);
        this.reduce(a)
    }

    function dA(b, c, a) {
        b.multiplyTo(c, a);
        this.reduce(a)
    }
    d8.prototype.convert = ct;
    d8.prototype.revert = cQ;
    d8.prototype.reduce = z;
    d8.prototype.mulTo = dA;
    d8.prototype.sqrTo = cF;

    function dh() {
        return ((this.t > 0) ? (this[0] & 1) : this.s) == 0
    }

    function dQ(d, b) {
        if (d > 4294967295 || d < 1) {
            return d4.ONE
        }
        var c = cr(),
            g = cr(),
            a = b.convert(this),
            f = dk(d) - 1;
        a.copyTo(c);
        while (--f >= 0) {
            b.sqrTo(c, g);
            if ((d & (1 << f)) > 0) {
                b.mulTo(g, a, c)
            }
            else {
                var e = c;
                c = g;
                g = e
            }
        }
        return b.revert(c)
    }

    function ca(c, a) {
        var b;
        if (c < 256 || a.isEven()) {
            b = new b6(a)
        }
        else {
            b = new d8(a)
        }
        return this.exp(c, b)
    }
    d4.prototype.copyTo = cX;
    d4.prototype.fromInt = dE;
    d4.prototype.fromString = cL;
    d4.prototype.clamp = dX;
    d4.prototype.dlShiftTo = dv;
    d4.prototype.drShiftTo = cU;
    d4.prototype.lShiftTo = bV;
    d4.prototype.rShiftTo = ec;
    d4.prototype.subTo = b7;
    d4.prototype.multiplyTo = dD;
    d4.prototype.squareTo = dm;
    d4.prototype.divRemTo = ee;
    d4.prototype.invDigit = dg;
    d4.prototype.isEven = dh;
    d4.prototype.exp = dQ;
    d4.prototype.toString = dV;
    d4.prototype.negate = cf;
    d4.prototype.abs = dl;
    d4.prototype.compareTo = dR;
    d4.prototype.bitLength = ck;
    d4.prototype.mod = t;
    d4.prototype.modPowInt = ca;
    d4.ZERO = dp(0);
    d4.ONE = dp(1);

    function ds() {
        var a = cr();
        this.copyTo(a);
        return a
    }

    function cm() {
        if (this.s < 0) {
            if (this.t == 1) {
                return this[0] - this.DV
            }
            else {
                if (this.t == 0) {
                    return -1
                }
            }
        }
        else {
            if (this.t == 1) {
                return this[0]
            }
            else {
                if (this.t == 0) {
                    return 0
                }
            }
        }
        return ((this[1] & ((1 << (32 - this.DB)) - 1)) << this.DB) | this[0]
    }

    function cZ() {
        return (this.t == 0) ? this.s : (this[0] << 24) >> 24
    }

    function dG() {
        return (this.t == 0) ? this.s : (this[0] << 16) >> 16
    }

    function b4(a) {
        return Math.floor(Math.LN2 * this.DB / Math.log(a))
    }

    function cB() {
        if (this.s < 0) {
            return -1
        }
        else {
            if (this.t <= 0 || (this.t == 1 && this[0] <= 0)) {
                return 0
            }
            else {
                return 1
            }
        }
    }

    function c0(b) {
        if (b == null) {
            b = 10
        }
        if (this.signum() == 0 || b < 2 || b > 36) {
            return "0"
        }
        var f = this.chunkSize(b);
        var g = Math.pow(b, f);
        var c = dp(g),
            d = cr(),
            a = cr(),
            e = "";
        this.divRemTo(c, d, a);
        while (d.signum() > 0) {
            e = (g + a.intValue()).toString(b).substr(1) + e;
            d.divRemTo(c, d, a)
        }
        return a.intValue().toString(b) + e
    }

    function cy(a, d) {
        this.fromInt(0);
        if (d == null) {
            d = 10
        }
        var f = this.chunkSize(d);
        var e = Math.pow(d, f),
            g = false,
            i = 0,
            b = 0;
        for (var h = 0; h < a.length; ++h) {
            var c = cC(a, h);
            if (c < 0) {
                if (a.charAt(h) == "-" && this.signum() == 0) {
                    g = true
                }
                continue
            }
            b = d * b + c;
            if (++i >= f) {
                this.dMultiply(e);
                this.dAddOffset(b, 0);
                i = 0;
                b = 0
            }
        }
        if (i > 0) {
            this.dMultiply(Math.pow(d, i));
            this.dAddOffset(b, 0)
        }
        if (g) {
            d4.ZERO.subTo(this, this)
        }
    }

    function dZ(d, c, b) {
        if ("number" == typeof c) {
            if (d < 2) {
                this.fromInt(1)
            }
            else {
                this.fromNumber(d, b);
                if (!this.testBit(d - 1)) {
                    this.bitwiseTo(d4.ONE.shiftLeft(d - 1), dj, this)
                }
                if (this.isEven()) {
                    this.dAddOffset(1, 0)
                }
                while (!this.isProbablePrime(c)) {
                    this.dAddOffset(2, 0);
                    if (this.bitLength() > d) {
                        this.subTo(d4.ONE.shiftLeft(d - 1), this)
                    }
                }
            }
        }
        else {
            var a = new Array(),
                e = d & 7;
            a.length = (d >> 3) + 1;
            c.nextBytes(a);
            if (e > 0) {
                a[0] &= ((1 << e) - 1)
            }
            else {
                a[0] = 0
            }
            this.fromString(a, 256)
        }
    }

    function cw() {
        var d = this.t,
            c = new Array();
        c[0] = this.s;
        var b = this.DB - (d * this.DB) % 8,
            a, e = 0;
        if (d-- > 0) {
            if (b < this.DB && (a = this[d] >> b) != (this.s & this.DM) >> b) {
                c[e++] = a | (this.s << (this.DB - b))
            }
            while (d >= 0) {
                if (b < 8) {
                    a = (this[d] & ((1 << b) - 1)) << (8 - b);
                    a |= this[--d] >> (b += this.DB - 8)
                }
                else {
                    a = (this[d] >> (b -= 8)) & 255;
                    if (b <= 0) {
                        b += this.DB;
                        --d
                    }
                }
                if ((a & 128) != 0) {
                    a |= -256
                }
                if (e == 0 && (this.s & 128) != (a & 128)) {
                    ++e
                }
                if (e > 0 || a != this.s) {
                    c[e++] = a
                }
            }
        }
        return c
    }

    function cY(a) {
        return (this.compareTo(a) == 0)
    }

    function cJ(a) {
        return (this.compareTo(a) < 0) ? this : a
    }

    function cK(a) {
        return (this.compareTo(a) > 0) ? this : a
    }

    function bX(b, c, d) {
        var f, e, a = Math.min(b.t, this.t);
        for (f = 0; f < a; ++f) {
            d[f] = c(this[f], b[f])
        }
        if (b.t < this.t) {
            e = b.s & this.DM;
            for (f = a; f < this.t; ++f) {
                d[f] = c(this[f], e)
            }
            d.t = this.t
        }
        else {
            e = this.s & this.DM;
            for (f = a; f < b.t; ++f) {
                d[f] = c(e, b[f])
            }
            d.t = b.t
        }
        d.s = c(this.s, b.s);
        d.clamp()
    }

    function c4(b, a) {
        return b & a
    }

    function eg(b) {
        var a = cr();
        this.bitwiseTo(b, c4, a);
        return a
    }

    function dj(b, a) {
        return b | a
    }

    function df(b) {
        var a = cr();
        this.bitwiseTo(b, dj, a);
        return a
    }

    function cO(b, a) {
        return b ^ a
    }

    function cn(b) {
        var a = cr();
        this.bitwiseTo(b, cO, a);
        return a
    }

    function a6(b, a) {
        return b & ~a
    }

    function c5(b) {
        var a = cr();
        this.bitwiseTo(b, a6, a);
        return a
    }

    function cg() {
        var a = cr();
        for (var b = 0; b < this.t; ++b) {
            a[b] = this.DM & ~this[b]
        }
        a.t = this.t;
        a.s = ~this.s;
        return a
    }

    function eb(a) {
        var b = cr();
        if (a < 0) {
            this.rShiftTo(-a, b)
        }
        else {
            this.lShiftTo(a, b)
        }
        return b
    }

    function dq(a) {
        var b = cr();
        if (a < 0) {
            this.lShiftTo(-a, b)
        }
        else {
            this.rShiftTo(a, b)
        }
        return b
    }

    function eh(b) {
        if (b == 0) {
            return -1
        }
        var a = 0;
        if ((b & 65535) == 0) {
            b >>= 16;
            a += 16
        }
        if ((b & 255) == 0) {
            b >>= 8;
            a += 8
        }
        if ((b & 15) == 0) {
            b >>= 4;
            a += 4
        }
        if ((b & 3) == 0) {
            b >>= 2;
            a += 2
        }
        if ((b & 1) == 0) {
            ++a
        }
        return a
    }

    function c7() {
        for (var a = 0; a < this.t; ++a) {
            if (this[a] != 0) {
                return a * this.DB + eh(this[a])
            }
        }
        if (this.s < 0) {
            return this.t * this.DB
        }
        return -1
    }

    function cV(b) {
        var a = 0;
        while (b != 0) {
            b &= b - 1;
            ++a
        }
        return a
    }

    function d2() {
        var c = 0,
            b = this.s & this.DM;
        for (var a = 0; a < this.t; ++a) {
            c += cV(this[a] ^ b)
        }
        return c
    }

    function d6(a) {
        var b = Math.floor(a / this.DB);
        if (b >= this.t) {
            return (this.s != 0)
        }
        return ((this[b] & (1 << (a % this.DB))) != 0)
    }

    function cP(c, a) {
        var b = d4.ONE.shiftLeft(c);
        this.bitwiseTo(b, a, b);
        return b
    }

    function dz(a) {
        return this.changeBit(a, dj)
    }

    function b9(a) {
        return this.changeBit(a, a6)
    }

    function bU(a) {
        return this.changeBit(a, cO)
    }

    function cj(d, c) {
        var b = 0,
            a = 0,
            e = Math.min(d.t, this.t);
        while (b < e) {
            a += this[b] + d[b];
            c[b++] = a & this.DM;
            a >>= this.DB
        }
        if (d.t < this.t) {
            a += d.s;
            while (b < this.t) {
                a += this[b];
                c[b++] = a & this.DM;
                a >>= this.DB
            }
            a += this.s
        }
        else {
            a += this.s;
            while (b < d.t) {
                a += d[b];
                c[b++] = a & this.DM;
                a >>= this.DB
            }
            a += d.s
        }
        c.s = (a < 0) ? -1 : 0;
        if (a > 0) {
            c[b++] = a
        }
        else {
            if (a < -1) {
                c[b++] = this.DV + a
            }
        }
        c.t = b;
        c.clamp()
    }

    function cM(b) {
        var a = cr();
        this.addTo(b, a);
        return a
    }

    function dd(b) {
        var a = cr();
        this.subTo(b, a);
        return a
    }

    function bY(b) {
        var a = cr();
        this.multiplyTo(b, a);
        return a
    }

    function d1() {
        var a = cr();
        this.squareTo(a);
        return a
    }

    function cx(b) {
        var a = cr();
        this.divRemTo(b, a, null);
        return a
    }

    function b3(b) {
        var a = cr();
        this.divRemTo(b, null, a);
        return a
    }

    function c1(b) {
        var c = cr(),
            a = cr();
        this.divRemTo(b, c, a);
        return new Array(c, a)
    }

    function db(a) {
        this[this.t] = this.am(0, a - 1, this, 0, 0, this.t);
        ++this.t;
        this.clamp()
    }

    function bT(a, b) {
        if (a == 0) {
            return
        }
        while (this.t <= b) {
            this[this.t++] = 0
        }
        this[b] += a;
        while (this[b] >= this.DV) {
            this[b] -= this.DV;
            if (++b >= this.t) {
                this[this.t++] = 0
            }
            ++this[b]
        }
    }

    function da() {}

    function dT(a) {
        return a
    }

    function d5(b, c, a) {
        b.multiplyTo(c, a)
    }

    function b5(b, a) {
        b.squareTo(a)
    }
    da.prototype.convert = dT;
    da.prototype.revert = dT;
    da.prototype.mulTo = d5;
    da.prototype.sqrTo = b5;

    function dU(a) {
        return this.exp(a, new da())
    }

    function cN(b, c, d) {
        var e = Math.min(this.t + b.t, c);
        d.s = 0;
        d.t = e;
        while (e > 0) {
            d[--e] = 0
        }
        var a;
        for (a = d.t - this.t; e < a; ++e) {
            d[e + this.t] = this.am(0, b[e], d, e, 0, this.t)
        }
        for (a = Math.min(b.t, c); e < a; ++e) {
            this.am(0, b[e], d, e, 0, c - e)
        }
        d.clamp()
    }

    function dB(b, c, d) {
        --c;
        var a = d.t = this.t + b.t - c;
        d.s = 0;
        while (--a >= 0) {
            d[a] = 0
        }
        for (a = Math.max(c - this.t, 0); a < b.t; ++a) {
            d[this.t + a - c] = this.am(c - a, b[a], d, 0, 0, this.t + a - c)
        }
        d.clamp();
        d.drShiftTo(1, d)
    }

    function c3(a) {
        this.r2 = cr();
        this.q3 = cr();
        d4.ONE.dlShiftTo(2 * a.t, this.r2);
        this.mu = this.r2.divide(a);
        this.m = a
    }

    function dP(b) {
        if (b.s < 0 || b.t > 2 * this.m.t) {
            return b.mod(this.m)
        }
        else {
            if (b.compareTo(this.m) < 0) {
                return b
            }
            else {
                var a = cr();
                b.copyTo(a);
                this.reduce(a);
                return a
            }
        }
    }

    function cS(a) {
        return a
    }

    function cW(a) {
        a.drShiftTo(this.m.t - 1, this.r2);
        if (a.t > this.m.t + 1) {
            a.t = this.m.t + 1;
            a.clamp()
        }
        this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
        this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
        while (a.compareTo(this.r2) < 0) {
            a.dAddOffset(1, this.m.t + 1)
        }
        a.subTo(this.r2, a);
        while (a.compareTo(this.m) >= 0) {
            a.subTo(this.m, a)
        }
    }

    function cl(b, a) {
        b.squareTo(a);
        this.reduce(a)
    }

    function cq(b, c, a) {
        b.multiplyTo(c, a);
        this.reduce(a)
    }
    c3.prototype.convert = dP;
    c3.prototype.revert = cS;
    c3.prototype.reduce = cW;
    c3.prototype.mulTo = cq;
    c3.prototype.sqrTo = cl;

    function de(l, k) {
        var j = l.bitLength(),
            f, d = dp(1),
            n;
        if (j <= 0) {
            return d
        }
        else {
            if (j < 18) {
                f = 1
            }
            else {
                if (j < 48) {
                    f = 3
                }
                else {
                    if (j < 144) {
                        f = 4
                    }
                    else {
                        if (j < 768) {
                            f = 5
                        }
                        else {
                            f = 6
                        }
                    }
                }
            }
        }
        if (j < 8) {
            n = new b6(k)
        }
        else {
            if (k.isEven()) {
                n = new c3(k)
            }
            else {
                n = new d8(k)
            }
        }
        var h = new Array(),
            m = 3,
            e = f - 1,
            c = (1 << f) - 1;
        h[1] = n.convert(this);
        if (f > 1) {
            var i = cr();
            n.sqrTo(h[1], i);
            while (m <= c) {
                h[m] = cr();
                n.mulTo(i, h[m - 2], h[m]);
                m += 2
            }
        }
        var g = l.t - 1,
            b, a = true,
            o = cr(),
            p;
        j = dk(l[g]) - 1;
        while (g >= 0) {
            if (j >= e) {
                b = (l[g] >> (j - e)) & c
            }
            else {
                b = (l[g] & ((1 << (j + 1)) - 1)) << (e - j);
                if (g > 0) {
                    b |= l[g - 1] >> (this.DB + j - e)
                }
            }
            m = f;
            while ((b & 1) == 0) {
                b >>= 1;
                --m
            }
            if ((j -= m) < 0) {
                j += this.DB;
                --g
            }
            if (a) {
                h[b].copyTo(d);
                a = false
            }
            else {
                while (m > 1) {
                    n.sqrTo(d, o);
                    n.sqrTo(o, d);
                    m -= 2
                }
                if (m > 0) {
                    n.sqrTo(d, o)
                }
                else {
                    p = d;
                    d = o;
                    o = p
                }
                n.mulTo(o, h[b], d)
            }
            while (g >= 0 && (l[g] & (1 << j)) == 0) {
                n.sqrTo(d, o);
                p = d;
                d = o;
                o = p;
                if (--j < 0) {
                    j = this.DB - 1;
                    --g
                }
            }
        }
        return n.revert(d)
    }

    function ch(d) {
        var b = (this.s < 0) ? this.negate() : this.clone();
        var c = (d.s < 0) ? d.negate() : d.clone();
        if (b.compareTo(c) < 0) {
            var e = b;
            b = c;
            c = e
        }
        var f = b.getLowestSetBit(),
            a = c.getLowestSetBit();
        if (a < 0) {
            return b
        }
        if (f < a) {
            a = f
        }
        if (a > 0) {
            b.rShiftTo(a, b);
            c.rShiftTo(a, c)
        }
        while (b.signum() > 0) {
            if ((f = b.getLowestSetBit()) > 0) {
                b.rShiftTo(f, b)
            }
            if ((f = c.getLowestSetBit()) > 0) {
                c.rShiftTo(f, c)
            }
            if (b.compareTo(c) >= 0) {
                b.subTo(c, b);
                b.rShiftTo(1, b)
            }
            else {
                c.subTo(b, c);
                c.rShiftTo(1, c)
            }
        }
        if (a > 0) {
            c.lShiftTo(a, c)
        }
        return c
    }

    function cu(c) {
        if (c <= 0) {
            return 0
        }
        var d = this.DV % c,
            a = (this.s < 0) ? c - 1 : 0;
        if (this.t > 0) {
            if (d == 0) {
                a = this[0] % c
            }
            else {
                for (var b = this.t - 1; b >= 0; --b) {
                    a = (d * a + this[b]) % c
                }
            }
        }
        return a
    }

    function dr(d) {
        var e = d.isEven();
        if ((this.isEven() && e) || d.signum() == 0) {
            return d4.ZERO
        }
        var h = d.clone(),
            g = this.clone();
        var b = dp(1),
            c = dp(0),
            f = dp(0),
            a = dp(1);
        while (h.signum() != 0) {
            while (h.isEven()) {
                h.rShiftTo(1, h);
                if (e) {
                    if (!b.isEven() || !c.isEven()) {
                        b.addTo(this, b);
                        c.subTo(d, c)
                    }
                    b.rShiftTo(1, b)
                }
                else {
                    if (!c.isEven()) {
                        c.subTo(d, c)
                    }
                }
                c.rShiftTo(1, c)
            }
            while (g.isEven()) {
                g.rShiftTo(1, g);
                if (e) {
                    if (!f.isEven() || !a.isEven()) {
                        f.addTo(this, f);
                        a.subTo(d, a)
                    }
                    f.rShiftTo(1, f)
                }
                else {
                    if (!a.isEven()) {
                        a.subTo(d, a)
                    }
                }
                a.rShiftTo(1, a)
            }
            if (h.compareTo(g) >= 0) {
                h.subTo(g, h);
                if (e) {
                    b.subTo(f, b)
                }
                c.subTo(a, c)
            }
            else {
                g.subTo(h, g);
                if (e) {
                    f.subTo(b, f)
                }
                a.subTo(c, a)
            }
        }
        if (g.compareTo(d4.ONE) != 0) {
            return d4.ZERO
        }
        if (a.compareTo(d) >= 0) {
            return a.subtract(d)
        }
        if (a.signum() < 0) {
            a.addTo(d, a)
        }
        else {
            return a
        }
        if (a.signum() < 0) {
            return a.add(d)
        }
        else {
            return a
        }
    }
    var L = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];
    var cE = (1 << 26) / L[L.length - 1];

    function dK(d) {
        var c, b = this.abs();
        if (b.t == 1 && b[0] <= L[L.length - 1]) {
            for (c = 0; c < L.length; ++c) {
                if (b[0] == L[c]) {
                    return true
                }
            }
            return false
        }
        if (b.isEven()) {
            return false
        }
        c = 1;
        while (c < L.length) {
            var e = L[c],
                a = c + 1;
            while (a < L.length && e < cE) {
                e *= L[a++]
            }
            e = b.modInt(e);
            while (c < a) {
                if (e % L[c++] == 0) {
                    return false
                }
            }
        }
        return b.millerRabin(d)
    }

    function dJ(e) {
        var d = this.subtract(d4.ONE);
        var h = d.getLowestSetBit();
        if (h <= 0) {
            return false
        }
        var c = d.shiftRight(h);
        e = (e + 1) >> 1;
        if (e > L.length) {
            e = L.length
        }
        var g = cr();
        for (var b = 0; b < e; ++b) {
            g.fromInt(L[Math.floor(Math.random() * L.length)]);
            var f = g.modPow(c, this);
            if (f.compareTo(d4.ONE) != 0 && f.compareTo(d) != 0) {
                var a = 1;
                while (a++ < h && f.compareTo(d) != 0) {
                    f = f.modPowInt(2, this);
                    if (f.compareTo(d4.ONE) == 0) {
                        return false
                    }
                }
                if (f.compareTo(d) != 0) {
                    return false
                }
            }
        }
        return true
    }
    d4.prototype.chunkSize = b4;
    d4.prototype.toRadix = c0;
    d4.prototype.fromRadix = cy;
    d4.prototype.fromNumber = dZ;
    d4.prototype.bitwiseTo = bX;
    d4.prototype.changeBit = cP;
    d4.prototype.addTo = cj;
    d4.prototype.dMultiply = db;
    d4.prototype.dAddOffset = bT;
    d4.prototype.multiplyLowerTo = cN;
    d4.prototype.multiplyUpperTo = dB;
    d4.prototype.modInt = cu;
    d4.prototype.millerRabin = dJ;
    d4.prototype.clone = ds;
    d4.prototype.intValue = cm;
    d4.prototype.byteValue = cZ;
    d4.prototype.shortValue = dG;
    d4.prototype.signum = cB;
    d4.prototype.toByteArray = cw;
    d4.prototype.equals = cY;
    d4.prototype.min = cJ;
    d4.prototype.max = cK;
    d4.prototype.and = eg;
    d4.prototype.or = df;
    d4.prototype.xor = cn;
    d4.prototype.andNot = c5;
    d4.prototype.not = cg;
    d4.prototype.shiftLeft = eb;
    d4.prototype.shiftRight = dq;
    d4.prototype.getLowestSetBit = c7;
    d4.prototype.bitCount = d2;
    d4.prototype.testBit = d6;
    d4.prototype.setBit = dz;
    d4.prototype.clearBit = b9;
    d4.prototype.flipBit = bU;
    d4.prototype.add = cM;
    d4.prototype.subtract = dd;
    d4.prototype.multiply = bY;
    d4.prototype.divide = cx;
    d4.prototype.remainder = b3;
    d4.prototype.divideAndRemainder = c1;
    d4.prototype.modPow = de;
    d4.prototype.modInverse = dr;
    d4.prototype.pow = dU;
    d4.prototype.gcd = ch;
    d4.prototype.isProbablePrime = dK;
    d4.prototype.square = d1;

    function dc() {
        this.i = 0;
        this.j = 0;
        this.S = new Array()
    }

    function dS(c) {
        var b, a, d;
        for (b = 0; b < 256; ++b) {
            this.S[b] = b
        }
        a = 0;
        for (b = 0; b < 256; ++b) {
            a = (a + this.S[b] + c[b % c.length]) & 255;
            d = this.S[b];
            this.S[b] = this.S[a];
            this.S[a] = d
        }
        this.i = 0;
        this.j = 0
    }

    function c8() {
        var a;
        this.i = (this.i + 1) & 255;
        this.j = (this.j + this.S[this.i]) & 255;
        a = this.S[this.i];
        this.S[this.i] = this.S[this.j];
        this.S[this.j] = a;
        return this.S[(a + this.S[this.i]) & 255]
    }
    dc.prototype.init = dS;
    dc.prototype.next = c8;

    function dN() {
        return new dc()
    }
    var dL = 256;
    var cA;
    var di;
    var cp;
    if (di == null) {
        di = new Array();
        cp = 0;
        var cs;
        if (window.crypto && window.crypto.getRandomValues) {
            var d7 = new Uint32Array(256);
            window.crypto.getRandomValues(d7);
            for (cs = 0; cs < d7.length; ++cs) {
                di[cp++] = d7[cs] & 255
            }
        }
        var bZ = function (a) {
            this.count = this.count || 0;
            if (this.count >= 256 || cp >= dL) {
                if (window.removeEventListener) {
                    window.removeEventListener("mousemove", bZ)
                }
                else {
                    if (window.detachEvent) {
                        window.detachEvent("onmousemove", bZ)
                    }
                }
                return
            }
            this.count += 1;
            var b = a.x + a.y;
            di[cp++] = b & 255
        };
        if (window.addEventListener) {
            window.addEventListener("mousemove", bZ)
        }
        else {
            if (window.attachEvent) {
                window.attachEvent("onmousemove", bZ)
            }
        }
    }

    function cd() {
        if (cA == null) {
            cA = dN();
            while (cp < dL) {
                var a = Math.floor(65536 * Math.random());
                di[cp++] = a & 255
            }
            cA.init(di);
            for (cp = 0; cp < di.length; ++cp) {
                di[cp] = 0
            }
            cp = 0
        }
        return cA.next()
    }

    function ed(a) {
        var b;
        for (b = 0; b < a.length; ++b) {
            a[b] = cd()
        }
    }

    function d9() {}
    d9.prototype.nextBytes = ed;

    function dF(a, b) {
        return new d4(a, b)
    }

    function a7(d, c) {
        var b = "";
        var a = 0;
        while (a + c < d.length) {
            b += d.substring(a, a + c) + "\n";
            a += c
        }
        return b + d.substring(a, d.length)
    }

    function dH(a) {
        if (a < 16) {
            return "0" + a.toString(16)
        }
        else {
            return a.toString(16)
        }
    }

    function cb(f, c) {
        if (c < f.length + 11) {
            console.error("Message too long for RSA");
            return null
        }
        var d = new Array();
        var g = f.length - 1;
        while (g >= 0 && c > 0) {
            var b = f.charCodeAt(g--);
            if (b < 128) {
                d[--c] = b
            }
            else {
                if ((b > 127) && (b < 2048)) {
                    d[--c] = (b & 63) | 128;
                    d[--c] = (b >> 6) | 192
                }
                else {
                    d[--c] = (b & 63) | 128;
                    d[--c] = ((b >> 6) & 63) | 128;
                    d[--c] = (b >> 12) | 224
                }
            }
        }
        d[--c] = 0;
        var a = new d9();
        var e = new Array();
        while (c > 2) {
            e[0] = 0;
            while (e[0] == 0) {
                a.nextBytes(e)
            }
            d[--c] = e[0]
        }
        d[--c] = 2;
        d[--c] = 0;
        return new d4(d)
    }

    function dx() {
        this.n = null;
        this.e = 0;
        this.d = null;
        this.p = null;
        this.q = null;
        this.dmp1 = null;
        this.dmq1 = null;
        this.coeff = null
    }

    function cI(a, b) {
        if (a != null && b != null && a.length > 0 && b.length > 0) {
            this.n = dF(a, 16);
            this.e = parseInt(b, 16)
        }
        else {
            console.error("Invalid RSA public key")
        }
    }

    function cT(a) {
        return a.modPowInt(this.e, this.n)
    }

    function cv(d) {
        var b = cb(d, (this.n.bitLength() + 7) >> 3);
        if (b == null) {
            return null
        }
        var c = this.doPublic(b);
        if (c == null) {
            return null
        }
        var a = c.toString(16);
        if ((a.length & 1) == 0) {
            return a
        }
        else {
            return "0" + a
        }
    }
    dx.prototype.doPublic = cT;
    dx.prototype.setPublic = cI;
    dx.prototype.encrypt = cv;

    function cG(d, b) {
        var a = d.toByteArray();
        var f = 0;
        while (f < a.length && a[f] == 0) {
            ++f
        }
        if (a.length - f != b - 1 || a[f] != 2) {
            return null
        }
        ++f;
        while (a[f] != 0) {
            if (++f >= a.length) {
                return null
            }
        }
        var c = "";
        while (++f < a.length) {
            var e = a[f] & 255;
            if (e < 128) {
                c += String.fromCharCode(e)
            }
            else {
                if ((e > 191) && (e < 224)) {
                    c += String.fromCharCode(((e & 31) << 6) | (a[f + 1] & 63));
                    ++f
                }
                else {
                    c += String.fromCharCode(((e & 15) << 12) | ((a[f + 1] & 63) << 6) | (a[f + 2] & 63));
                    f += 2
                }
            }
        }
        return c
    }

    function dW(g, i) {
        var h = new d9();
        var c = g >> 1;
        this.e = parseInt(i, 16);
        var f = new d4(i, 16);
        for (;;) {
            for (;;) {
                this.p = new d4(g - c, 1, h);
                if (this.p.subtract(d4.ONE).gcd(f).compareTo(d4.ONE) == 0 && this.p.isProbablePrime(10)) {
                    break
                }
            }
            for (;;) {
                this.q = new d4(c, 1, h);
                if (this.q.subtract(d4.ONE).gcd(f).compareTo(d4.ONE) == 0 && this.q.isProbablePrime(10)) {
                    break
                }
            }
            if (this.p.compareTo(this.q) <= 0) {
                var a = this.p;
                this.p = this.q;
                this.q = a
            }
            var b = this.p.subtract(d4.ONE);
            var e = this.q.subtract(d4.ONE);
            var d = b.multiply(e);
            if (d.gcd(f).compareTo(d4.ONE) == 0) {
                this.n = this.p.multiply(this.q);
                this.d = f.modInverse(d);
                this.dmp1 = this.d.mod(b);
                this.dmq1 = this.d.mod(e);
                this.coeff = this.q.modInverse(this.p);
                break
            }
        }
    }

    function ef(a) {
        var c = dF(a, 16);
        var b = this.doPrivate(c);
        if (b == null) {
            return null
        }
        return cG(b, (this.n.bitLength() + 7) >> 3)
    }
    dx.prototype.generate = dW;
    dx.prototype.decrypt = ef;
    (function () {
        var a = function (h, j, i) {
            var d = new d9();
            var g = h >> 1;
            this.e = parseInt(j, 16);
            var e = new d4(j, 16);
            var k = this;
            var f = function () {
                var l = function () {
                    if (k.p.compareTo(k.q) <= 0) {
                        var o = k.p;
                        k.p = k.q;
                        k.q = o
                    }
                    var q = k.p.subtract(d4.ONE);
                    var p = k.q.subtract(d4.ONE);
                    var r = q.multiply(p);
                    if (r.gcd(e).compareTo(d4.ONE) == 0) {
                        k.n = k.p.multiply(k.q);
                        k.d = e.modInverse(r);
                        k.dmp1 = k.d.mod(q);
                        k.dmq1 = k.d.mod(p);
                        k.coeff = k.q.modInverse(k.p);
                        setTimeout(function () {
                            i()
                        }, 0)
                    }
                    else {
                        setTimeout(f, 0)
                    }
                };
                var n = function () {
                    k.q = cr();
                    k.q.fromNumberAsync(g, 1, d, function () {
                        k.q.subtract(d4.ONE).gcda(e, function (o) {
                            if (o.compareTo(d4.ONE) == 0 && k.q.isProbablePrime(10)) {
                                setTimeout(l, 0)
                            }
                            else {
                                setTimeout(n, 0)
                            }
                        })
                    })
                };
                var m = function () {
                    k.p = cr();
                    k.p.fromNumberAsync(h - g, 1, d, function () {
                        k.p.subtract(d4.ONE).gcda(e, function (o) {
                            if (o.compareTo(d4.ONE) == 0 && k.p.isProbablePrime(10)) {
                                setTimeout(n, 0)
                            }
                            else {
                                setTimeout(m, 0)
                            }
                        })
                    })
                };
                setTimeout(m, 0)
            };
            setTimeout(f, 0)
        };
        dx.prototype.generateAsync = a;
        var b = function (f, h) {
            var g = (this.s < 0) ? this.negate() : this.clone();
            var i = (f.s < 0) ? f.negate() : f.clone();
            if (g.compareTo(i) < 0) {
                var d = g;
                g = i;
                i = d
            }
            var e = g.getLowestSetBit(),
                k = i.getLowestSetBit();
            if (k < 0) {
                h(g);
                return
            }
            if (e < k) {
                k = e
            }
            if (k > 0) {
                g.rShiftTo(k, g);
                i.rShiftTo(k, i)
            }
            var j = function () {
                if ((e = g.getLowestSetBit()) > 0) {
                    g.rShiftTo(e, g)
                }
                if ((e = i.getLowestSetBit()) > 0) {
                    i.rShiftTo(e, i)
                }
                if (g.compareTo(i) >= 0) {
                    g.subTo(i, g);
                    g.rShiftTo(1, g)
                }
                else {
                    i.subTo(g, i);
                    i.rShiftTo(1, i)
                }
                if (!(g.signum() > 0)) {
                    if (k > 0) {
                        i.lShiftTo(k, i)
                    }
                    setTimeout(function () {
                        h(i)
                    }, 0)
                }
                else {
                    setTimeout(j, 0)
                }
            };
            setTimeout(j, 10)
        };
        d4.prototype.gcda = b;
        var c = function (k, f, h, i) {
            if ("number" == typeof f) {
                if (k < 2) {
                    this.fromInt(1)
                }
                else {
                    this.fromNumber(k, h);
                    if (!this.testBit(k - 1)) {
                        this.bitwiseTo(d4.ONE.shiftLeft(k - 1), dj, this)
                    }
                    if (this.isEven()) {
                        this.dAddOffset(1, 0)
                    }
                    var d = this;
                    var e = function () {
                        d.dAddOffset(2, 0);
                        if (d.bitLength() > k) {
                            d.subTo(d4.ONE.shiftLeft(k - 1), d)
                        }
                        if (d.isProbablePrime(f)) {
                            setTimeout(function () {
                                i()
                            }, 0)
                        }
                        else {
                            setTimeout(e, 0)
                        }
                    };
                    setTimeout(e, 0)
                }
            }
            else {
                var g = new Array(),
                    j = k & 7;
                g.length = (k >> 3) + 1;
                f.nextBytes(g);
                if (j > 0) {
                    g[0] &= ((1 << j) - 1)
                }
                else {
                    g[0] = 0
                }
                this.fromString(g, 256)
            }
        };
        d4.prototype.fromNumberAsync = c
    })();
    var d3 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var cD = "=";

    function dY(d) {
        var a;
        var c;
        var b = "";
        for (a = 0; a + 3 <= d.length; a += 3) {
            c = parseInt(d.substring(a, a + 3), 16);
            b += d3.charAt(c >> 6) + d3.charAt(c & 63)
        }
        if (a + 1 == d.length) {
            c = parseInt(d.substring(a, a + 1), 16);
            b += d3.charAt(c << 2)
        }
        else {
            if (a + 2 == d.length) {
                c = parseInt(d.substring(a, a + 2), 16);
                b += d3.charAt(c >> 2) + d3.charAt((c & 3) << 4)
            }
        }
        while ((b.length & 3) > 0) {
            b += cD
        }
        return b
    }

    function a8(c) {
        var b = "";
        var d;
        var e = 0;
        var a;
        for (d = 0; d < c.length; ++d) {
            if (c.charAt(d) == cD) {
                break
            }
            v = d3.indexOf(c.charAt(d));
            if (v < 0) {
                continue
            }
            if (e == 0) {
                b += dO(v >> 2);
                a = v & 3;
                e = 1
            }
            else {
                if (e == 1) {
                    b += dO((a << 2) | (v >> 4));
                    a = v & 15;
                    e = 2
                }
                else {
                    if (e == 2) {
                        b += dO(a);
                        b += dO(v >> 2);
                        a = v & 3;
                        e = 3
                    }
                    else {
                        b += dO((a << 2) | (v >> 4));
                        b += dO(v & 15);
                        e = 0
                    }
                }
            }
        }
        if (e == 1) {
            b += dO(a << 2)
        }
        return b
    }

    function ea(c) {
        var d = a8(c);
        var a;
        var b = new Array();
        for (a = 0; 2 * a < d.length; ++a) {
            b[a] = parseInt(d.substring(2 * a, 2 * a + 2), 16)
        }
        return b
    }
    var ci = ci || {};
    ci.env = ci.env || {};
    var bW = ci,
        dn = Object.prototype,
        dw = "[object Function]",
        c9 = ["toString", "valueOf"];
    ci.env.parseUA = function (g) {
        var h = function (j) {
                var i = 0;
                return parseFloat(j.replace(/\./g, function () {
                    return (i++ == 1) ? "" : "."
                }))
            },
            c = navigator,
            d = {
                ie: 0,
                opera: 0,
                gecko: 0,
                webkit: 0,
                chrome: 0,
                mobile: null,
                air: 0,
                ipad: 0,
                iphone: 0,
                ipod: 0,
                ios: null,
                android: 0,
                webos: 0,
                caja: c && c.cajaVersion,
                secure: false,
                os: null
            },
            b = g || (navigator && navigator.userAgent),
            e = window && window.location,
            a = e && e.href,
            f;
        d.secure = a && (a.toLowerCase().indexOf("https") === 0);
        if (b) {
            if ((/windows|win32/i).test(b)) {
                d.os = "windows"
            }
            else {
                if ((/macintosh/i).test(b)) {
                    d.os = "macintosh"
                }
                else {
                    if ((/rhino/i).test(b)) {
                        d.os = "rhino"
                    }
                }
            }
            if ((/KHTML/).test(b)) {
                d.webkit = 1
            }
            f = b.match(/AppleWebKit\/([^\s]*)/);
            if (f && f[1]) {
                d.webkit = h(f[1]);
                if (/ Mobile\//.test(b)) {
                    d.mobile = "Apple";
                    f = b.match(/OS ([^\s]*)/);
                    if (f && f[1]) {
                        f = h(f[1].replace("_", "."))
                    }
                    d.ios = f;
                    d.ipad = d.ipod = d.iphone = 0;
                    f = b.match(/iPad|iPod|iPhone/);
                    if (f && f[0]) {
                        d[f[0].toLowerCase()] = d.ios
                    }
                }
                else {
                    f = b.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/);
                    if (f) {
                        d.mobile = f[0]
                    }
                    if (/webOS/.test(b)) {
                        d.mobile = "WebOS";
                        f = b.match(/webOS\/([^\s]*);/);
                        if (f && f[1]) {
                            d.webos = h(f[1])
                        }
                    }
                    if (/ Android/.test(b)) {
                        d.mobile = "Android";
                        f = b.match(/Android ([^\s]*);/);
                        if (f && f[1]) {
                            d.android = h(f[1])
                        }
                    }
                }
                f = b.match(/Chrome\/([^\s]*)/);
                if (f && f[1]) {
                    d.chrome = h(f[1])
                }
                else {
                    f = b.match(/AdobeAIR\/([^\s]*)/);
                    if (f) {
                        d.air = f[0]
                    }
                }
            }
            if (!d.webkit) {
                f = b.match(/Opera[\s\/]([^\s]*)/);
                if (f && f[1]) {
                    d.opera = h(f[1]);
                    f = b.match(/Version\/([^\s]*)/);
                    if (f && f[1]) {
                        d.opera = h(f[1])
                    }
                    f = b.match(/Opera Mini[^;]*/);
                    if (f) {
                        d.mobile = f[0]
                    }
                }
                else {
                    f = b.match(/MSIE\s([^;]*)/);
                    if (f && f[1]) {
                        d.ie = h(f[1])
                    }
                    else {
                        f = b.match(/Gecko\/([^\s]*)/);
                        if (f) {
                            d.gecko = 1;
                            f = b.match(/rv:([^\s\)]*)/);
                            if (f && f[1]) {
                                d.gecko = h(f[1])
                            }
                        }
                    }
                }
            }
        }
        return d
    };
    ci.env.ua = ci.env.parseUA();
    ci.isFunction = function (a) {
        return (typeof a === "function") || dn.toString.apply(a) === dw
    };
    ci._IEEnumFix = (ci.env.ua.ie) ? function (c, d) {
        var b, e, a;
        for (b = 0; b < c9.length; b = b + 1) {
            e = c9[b];
            a = d[e];
            if (bW.isFunction(a) && a != dn[e]) {
                c[e] = a
            }
        }
    } :
        function () {};
    ci.extend = function (d, c, b) {
        if (!c || !d) {
            throw new Error("extend failed, please check that all dependencies are included.")
        }
        var a = function () {},
            e;
        a.prototype = c.prototype;
        d.prototype = new a();
        d.prototype.constructor = d;
        d.superclass = c.prototype;
        if (c.prototype.constructor == dn.constructor) {
            c.prototype.constructor = c
        }
        if (b) {
            for (e in b) {
                if (bW.hasOwnProperty(b, e)) {
                    d.prototype[e] = b[e]
                }
            }
            bW._IEEnumFix(d.prototype, b)
        }
    };
    if (typeof KJUR == "undefined" || !KJUR) {
        KJUR = {}
    }
    if (typeof KJUR.asn1 == "undefined" || !KJUR.asn1) {
        KJUR.asn1 = {}
    }
    KJUR.asn1.ASN1Util = new function () {
        this.integerToByteHex = function (b) {
            var a = b.toString(16);
            if ((a.length % 2) == 1) {
                a = "0" + a
            }
            return a
        };
        this.bigIntToMinTwosComplementsHex = function (c) {
            var e = c.toString(16);
            if (e.substr(0, 1) != "-") {
                if (e.length % 2 == 1) {
                    e = "0" + e
                }
                else {
                    if (!e.match(/^[0-7]/)) {
                        e = "00" + e
                    }
                }
            }
            else {
                var b = e.substr(1);
                var h = b.length;
                if (h % 2 == 1) {
                    h += 1
                }
                else {
                    if (!e.match(/^[0-7]/)) {
                        h += 2
                    }
                }
                var d = "";
                for (var g = 0; g < h; g++) {
                    d += "f"
                }
                var f = new d4(d, 16);
                var a = f.xor(c).add(d4.ONE);
                e = a.toString(16).replace(/^-/, "")
            }
            return e
        }
    };
    KJUR.asn1.ASN1Object = function () {
        var c = true;
        var d = null;
        var b = "00";
        var a = "00";
        var e = "";
        this.getLengthHexFromValue = function () {
            if (typeof this.hV == "undefined" || this.hV == null) {
                throw "this.hV is null or undefined."
            }
            if (this.hV.length % 2 == 1) {
                throw "value hex must be even length: n=" + e.length + ",v=" + this.hV
            }
            var f = this.hV.length / 2;
            var g = f.toString(16);
            if (g.length % 2 == 1) {
                g = "0" + g
            }
            if (f < 128) {
                return g
            }
            else {
                var h = g.length / 2;
                if (h > 15) {
                    throw "ASN.1 length too long to represent by 8x: n = " + f.toString(16)
                }
                var i = 128 + h;
                return i.toString(16) + g
            }
        };
        this.getEncodedHex = function () {
            if (this.hTLV == null || this.isModified) {
                this.hV = this.getFreshValueHex();
                this.hL = this.getLengthHexFromValue();
                this.hTLV = this.hT + this.hL + this.hV;
                this.isModified = false
            }
            return this.hTLV
        };
        this.getValueHex = function () {
            this.getEncodedHex();
            return this.hV
        };
        this.getFreshValueHex = function () {
            return ""
        }
    };
    KJUR.asn1.DERAbstractString = function (c) {
        KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
        var a = null;
        var b = null;
        this.getString = function () {
            return this.s
        };
        this.setString = function (d) {
            this.hTLV = null;
            this.isModified = true;
            this.s = d;
            this.hV = stohex(this.s)
        };
        this.setStringHex = function (d) {
            this.hTLV = null;
            this.isModified = true;
            this.s = null;
            this.hV = d
        };
        this.getFreshValueHex = function () {
            return this.hV
        };
        if (typeof c != "undefined") {
            if (typeof c.str != "undefined") {
                this.setString(c.str)
            }
            else {
                if (typeof c.hex != "undefined") {
                    this.setStringHex(c.hex)
                }
            }
        }
    };
    ci.extend(KJUR.asn1.DERAbstractString, KJUR.asn1.ASN1Object);
    KJUR.asn1.DERAbstractTime = function (c) {
        KJUR.asn1.DERAbstractTime.superclass.constructor.call(this);
        var a = null;
        var b = null;
        this.localDateToUTC = function (d) {
            utc = d.getTime() + (d.getTimezoneOffset() * 60000);
            var e = new Date(utc);
            return e
        };
        this.formatDate = function (f, d) {
            var k = this.zeroPadding;
            var e = this.localDateToUTC(f);
            var m = String(e.getFullYear());
            if (d == "utc") {
                m = m.substr(2, 2)
            }
            var g = k(String(e.getMonth() + 1), 2);
            var l = k(String(e.getDate()), 2);
            var j = k(String(e.getHours()), 2);
            var i = k(String(e.getMinutes()), 2);
            var h = k(String(e.getSeconds()), 2);
            return m + g + l + j + i + h + "Z"
        };
        this.zeroPadding = function (d, e) {
            if (d.length >= e) {
                return d
            }
            return new Array(e - d.length + 1).join("0") + d
        };
        this.getString = function () {
            return this.s
        };
        this.setString = function (d) {
            this.hTLV = null;
            this.isModified = true;
            this.s = d;
            this.hV = stohex(this.s)
        };
        this.setByDateValue = function (g, e, j, d, i, h) {
            var f = new Date(Date.UTC(g, e - 1, j, d, i, h, 0));
            this.setByDate(f)
        };
        this.getFreshValueHex = function () {
            return this.hV
        }
    };
    ci.extend(KJUR.asn1.DERAbstractTime, KJUR.asn1.ASN1Object);
    KJUR.asn1.DERAbstractStructured = function (a) {
        KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
        var b = null;
        this.setByASN1ObjectArray = function (c) {
            this.hTLV = null;
            this.isModified = true;
            this.asn1Array = c
        };
        this.appendASN1Object = function (c) {
            this.hTLV = null;
            this.isModified = true;
            this.asn1Array.push(c)
        };
        this.asn1Array = new Array();
        if (typeof a != "undefined") {
            if (typeof a.array != "undefined") {
                this.asn1Array = a.array
            }
        }
    };
    ci.extend(KJUR.asn1.DERAbstractStructured, KJUR.asn1.ASN1Object);
    KJUR.asn1.DERBoolean = function () {
        KJUR.asn1.DERBoolean.superclass.constructor.call(this);
        this.hT = "01";
        this.hTLV = "0101ff"
    };
    ci.extend(KJUR.asn1.DERBoolean, KJUR.asn1.ASN1Object);
    KJUR.asn1.DERInteger = function (a) {
        KJUR.asn1.DERInteger.superclass.constructor.call(this);
        this.hT = "02";
        this.setByBigInteger = function (b) {
            this.hTLV = null;
            this.isModified = true;
            this.hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(b)
        };
        this.setByInteger = function (c) {
            var b = new d4(String(c), 10);
            this.setByBigInteger(b)
        };
        this.setValueHex = function (b) {
            this.hV = b
        };
        this.getFreshValueHex = function () {
            return this.hV
        };
        if (typeof a != "undefined") {
            if (typeof a.bigint != "undefined") {
                this.setByBigInteger(a.bigint)
            }
            else {
                if (typeof a["int"] != "undefined") {
                    this.setByInteger(a["int"])
                }
                else {
                    if (typeof a.hex != "undefined") {
                        this.setValueHex(a.hex)
                    }
                }
            }
        }
    };
    ci.extend(KJUR.asn1.DERInteger, KJUR.asn1.ASN1Object);
    KJUR.asn1.DERBitString = function (a) {
        KJUR.asn1.DERBitString.superclass.constructor.call(this);
        this.hT = "03";
        this.setHexValueIncludingUnusedBits = function (b) {
            this.hTLV = null;
            this.isModified = true;
            this.hV = b
        };
        this.setUnusedBitsAndHexValue = function (b, c) {
            if (b < 0 || 7 < b) {
                throw "unused bits shall be from 0 to 7: u = " + b
            }
            var d = "0" + b;
            this.hTLV = null;
            this.isModified = true;
            this.hV = d + c
        };
        this.setByBinaryString = function (g) {
            g = g.replace(/0+$/, "");
            var f = 8 - g.length % 8;
            if (f == 8) {
                f = 0
            }
            for (var c = 0; c <= f; c++) {
                g += "0"
            }
            var d = "";
            for (var c = 0; c < g.length - 1; c += 8) {
                var e = g.substr(c, 8);
                var b = parseInt(e, 2).toString(16);
                if (b.length == 1) {
                    b = "0" + b
                }
                d += b
            }
            this.hTLV = null;
            this.isModified = true;
            this.hV = "0" + f + d
        };
        this.setByBooleanArray = function (c) {
            var d = "";
            for (var b = 0; b < c.length; b++) {
                if (c[b] == true) {
                    d += "1"
                }
                else {
                    d += "0"
                }
            }
            this.setByBinaryString(d)
        };
        this.newFalseArray = function (c) {
            var b = new Array(c);
            for (var d = 0; d < c; d++) {
                b[d] = false
            }
            return b
        };
        this.getFreshValueHex = function () {
            return this.hV
        };
        if (typeof a != "undefined") {
            if (typeof a.hex != "undefined") {
                this.setHexValueIncludingUnusedBits(a.hex)
            }
            else {
                if (typeof a.bin != "undefined") {
                    this.setByBinaryString(a.bin)
                }
                else {
                    if (typeof a.array != "undefined") {
                        this.setByBooleanArray(a.array)
                    }
                }
            }
        }
    };
    ci.extend(KJUR.asn1.DERBitString, KJUR.asn1.ASN1Object);
    KJUR.asn1.DEROctetString = function (a) {
        KJUR.asn1.DEROctetString.superclass.constructor.call(this, a);
        this.hT = "04"
    };
    ci.extend(KJUR.asn1.DEROctetString, KJUR.asn1.DERAbstractString);
    KJUR.asn1.DERNull = function () {
        KJUR.asn1.DERNull.superclass.constructor.call(this);
        this.hT = "05";
        this.hTLV = "0500"
    };
    ci.extend(KJUR.asn1.DERNull, KJUR.asn1.ASN1Object);
    KJUR.asn1.DERObjectIdentifier = function (c) {
        var a = function (e) {
            var d = e.toString(16);
            if (d.length == 1) {
                d = "0" + d
            }
            return d
        };
        var b = function (j) {
            var k = "";
            var f = new d4(j, 10);
            var g = f.toString(2);
            var e = 7 - g.length % 7;
            if (e == 7) {
                e = 0
            }
            var h = "";
            for (var d = 0; d < e; d++) {
                h += "0"
            }
            g = h + g;
            for (var d = 0; d < g.length - 1; d += 7) {
                var i = g.substr(d, 7);
                if (d != g.length - 7) {
                    i = "1" + i
                }
                k += a(parseInt(i, 2))
            }
            return k
        };
        KJUR.asn1.DERObjectIdentifier.superclass.constructor.call(this);
        this.hT = "06";
        this.setValueHex = function (d) {
            this.hTLV = null;
            this.isModified = true;
            this.s = null;
            this.hV = d
        };
        this.setValueOidString = function (g) {
            if (!g.match(/^[0-9.]+$/)) {
                throw "malformed oid string: " + g
            }
            var f = "";
            var d = g.split(".");
            var e = parseInt(d[0]) * 40 + parseInt(d[1]);
            f += a(e);
            d.splice(0, 2);
            for (var h = 0; h < d.length; h++) {
                f += b(d[h])
            }
            this.hTLV = null;
            this.isModified = true;
            this.s = null;
            this.hV = f
        };
        this.setValueName = function (d) {
            if (typeof KJUR.asn1.x509.OID.name2oidList[d] != "undefined") {
                var e = KJUR.asn1.x509.OID.name2oidList[d];
                this.setValueOidString(e)
            }
            else {
                throw "DERObjectIdentifier oidName undefined: " + d
            }
        };
        this.getFreshValueHex = function () {
            return this.hV
        };
        if (typeof c != "undefined") {
            if (typeof c.oid != "undefined") {
                this.setValueOidString(c.oid)
            }
            else {
                if (typeof c.hex != "undefined") {
                    this.setValueHex(c.hex)
                }
                else {
                    if (typeof c.name != "undefined") {
                        this.setValueName(c.name)
                    }
                }
            }
        }
    };
    ci.extend(KJUR.asn1.DERObjectIdentifier, KJUR.asn1.ASN1Object);
    KJUR.asn1.DERUTF8String = function (a) {
        KJUR.asn1.DERUTF8String.superclass.constructor.call(this, a);
        this.hT = "0c"
    };
    ci.extend(KJUR.asn1.DERUTF8String, KJUR.asn1.DERAbstractString);
    KJUR.asn1.DERNumericString = function (a) {
        KJUR.asn1.DERNumericString.superclass.constructor.call(this, a);
        this.hT = "12"
    };
    ci.extend(KJUR.asn1.DERNumericString, KJUR.asn1.DERAbstractString);
    KJUR.asn1.DERPrintableString = function (a) {
        KJUR.asn1.DERPrintableString.superclass.constructor.call(this, a);
        this.hT = "13"
    };
    ci.extend(KJUR.asn1.DERPrintableString, KJUR.asn1.DERAbstractString);
    KJUR.asn1.DERTeletexString = function (a) {
        KJUR.asn1.DERTeletexString.superclass.constructor.call(this, a);
        this.hT = "14"
    };
    ci.extend(KJUR.asn1.DERTeletexString, KJUR.asn1.DERAbstractString);
    KJUR.asn1.DERIA5String = function (a) {
        KJUR.asn1.DERIA5String.superclass.constructor.call(this, a);
        this.hT = "16"
    };
    ci.extend(KJUR.asn1.DERIA5String, KJUR.asn1.DERAbstractString);
    KJUR.asn1.DERUTCTime = function (a) {
        KJUR.asn1.DERUTCTime.superclass.constructor.call(this, a);
        this.hT = "17";
        this.setByDate = function (b) {
            this.hTLV = null;
            this.isModified = true;
            this.date = b;
            this.s = this.formatDate(this.date, "utc");
            this.hV = stohex(this.s)
        };
        if (typeof a != "undefined") {
            if (typeof a.str != "undefined") {
                this.setString(a.str)
            }
            else {
                if (typeof a.hex != "undefined") {
                    this.setStringHex(a.hex)
                }
                else {
                    if (typeof a.date != "undefined") {
                        this.setByDate(a.date)
                    }
                }
            }
        }
    };
    ci.extend(KJUR.asn1.DERUTCTime, KJUR.asn1.DERAbstractTime);
    KJUR.asn1.DERGeneralizedTime = function (a) {
        KJUR.asn1.DERGeneralizedTime.superclass.constructor.call(this, a);
        this.hT = "18";
        this.setByDate = function (b) {
            this.hTLV = null;
            this.isModified = true;
            this.date = b;
            this.s = this.formatDate(this.date, "gen");
            this.hV = stohex(this.s)
        };
        if (typeof a != "undefined") {
            if (typeof a.str != "undefined") {
                this.setString(a.str)
            }
            else {
                if (typeof a.hex != "undefined") {
                    this.setStringHex(a.hex)
                }
                else {
                    if (typeof a.date != "undefined") {
                        this.setByDate(a.date)
                    }
                }
            }
        }
    };
    ci.extend(KJUR.asn1.DERGeneralizedTime, KJUR.asn1.DERAbstractTime);
    KJUR.asn1.DERSequence = function (a) {
        KJUR.asn1.DERSequence.superclass.constructor.call(this, a);
        this.hT = "30";
        this.getFreshValueHex = function () {
            var d = "";
            for (var b = 0; b < this.asn1Array.length; b++) {
                var c = this.asn1Array[b];
                d += c.getEncodedHex()
            }
            this.hV = d;
            return this.hV
        }
    };
    ci.extend(KJUR.asn1.DERSequence, KJUR.asn1.DERAbstractStructured);
    KJUR.asn1.DERSet = function (a) {
        KJUR.asn1.DERSet.superclass.constructor.call(this, a);
        this.hT = "31";
        this.getFreshValueHex = function () {
            var b = new Array();
            for (var d = 0; d < this.asn1Array.length; d++) {
                var c = this.asn1Array[d];
                b.push(c.getEncodedHex())
            }
            b.sort();
            this.hV = b.join("");
            return this.hV
        }
    };
    ci.extend(KJUR.asn1.DERSet, KJUR.asn1.DERAbstractStructured);
    KJUR.asn1.DERTaggedObject = function (a) {
        KJUR.asn1.DERTaggedObject.superclass.constructor.call(this);
        this.hT = "a0";
        this.hV = "";
        this.isExplicit = true;
        this.asn1Object = null;
        this.setASN1Object = function (b, d, c) {
            this.hT = d;
            this.isExplicit = b;
            this.asn1Object = c;
            if (this.isExplicit) {
                this.hV = this.asn1Object.getEncodedHex();
                this.hTLV = null;
                this.isModified = true
            }
            else {
                this.hV = null;
                this.hTLV = c.getEncodedHex();
                this.hTLV = this.hTLV.replace(/^../, d);
                this.isModified = false
            }
        };
        this.getFreshValueHex = function () {
            return this.hV
        };
        if (typeof a != "undefined") {
            if (typeof a.tag != "undefined") {
                this.hT = a.tag
            }
            if (typeof a.explicit != "undefined") {
                this.isExplicit = a.explicit
            }
            if (typeof a.obj != "undefined") {
                this.asn1Object = a.obj;
                this.setASN1Object(this.isExplicit, this.hT, this.asn1Object)
            }
        }
    };
    ci.extend(KJUR.asn1.DERTaggedObject, KJUR.asn1.ASN1Object);
    (function (a) {
        var b = {},
            c;
        b.decode = function (g) {
            var e;
            if (c === a) {
                var d = "0123456789ABCDEF",
                    h = " \f\n\r\t\u00A0\u2028\u2029";
                c = [];
                for (e = 0; e < 16; ++e) {
                    c[d.charAt(e)] = e
                }
                d = d.toLowerCase();
                for (e = 10; e < 16; ++e) {
                    c[d.charAt(e)] = e
                }
                for (e = 0; e < h.length; ++e) {
                    c[h.charAt(e)] = -1
                }
            }
            var f = [],
                k = 0,
                i = 0;
            for (e = 0; e < g.length; ++e) {
                var j = g.charAt(e);
                if (j == "=") {
                    break
                }
                j = c[j];
                if (j == -1) {
                    continue
                }
                if (j === a) {
                    throw "Illegal character at offset " + e
                }
                k |= j;
                if (++i >= 2) {
                    f[f.length] = k;
                    k = 0;
                    i = 0
                }
                else {
                    k <<= 4
                }
            }
            if (i) {
                throw "Hex encoding incomplete: 4 bits missing"
            }
            return f
        };
        Hex = b
    })();
    (function (a) {
        var b = {},
            c;
        b.decode = function (g) {
            var d;
            if (c === a) {
                var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                    h = "= \f\n\r\t\u00A0\u2028\u2029";
                c = [];
                for (d = 0; d < 64; ++d) {
                    c[e.charAt(d)] = d
                }
                for (d = 0; d < h.length; ++d) {
                    c[h.charAt(d)] = -1
                }
            }
            var f = [];
            var k = 0,
                i = 0;
            for (d = 0; d < g.length; ++d) {
                var j = g.charAt(d);
                if (j == "=") {
                    break
                }
                j = c[j];
                if (j == -1) {
                    continue
                }
                if (j === a) {
                    throw "Illegal character at offset " + d
                }
                k |= j;
                if (++i >= 4) {
                    f[f.length] = (k >> 16);
                    f[f.length] = (k >> 8) & 255;
                    f[f.length] = k & 255;
                    k = 0;
                    i = 0
                }
                else {
                    k <<= 6
                }
            }
            switch (i) {
                case 1:
                    throw "Base64 encoding incomplete: at least 2 bits missing";
                case 2:
                    f[f.length] = (k >> 10);
                    break;
                case 3:
                    f[f.length] = (k >> 16);
                    f[f.length] = (k >> 8) & 255;
                    break
            }
            return f
        };
        b.re = /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/;
        b.unarmor = function (d) {
            var e = b.re.exec(d);
            if (e) {
                if (e[1]) {
                    d = e[1]
                }
                else {
                    if (e[2]) {
                        d = e[2]
                    }
                    else {
                        throw "RegExp out of sync"
                    }
                }
            }
            return b.decode(d)
        };
        Base64 = b
    })();
    (function (b) {
        var c = 100,
            a = "\u2026",
            d = {
                tag: function (h, g) {
                    var i = document.createElement(h);
                    i.className = g;
                    return i
                },
                text: function (g) {
                    return document.createTextNode(g)
                }
            };

        function e(h, g) {
            if (h instanceof e) {
                this.enc = h.enc;
                this.pos = h.pos
            }
            else {
                this.enc = h;
                this.pos = g
            }
        }
        e.prototype.get = function (g) {
            if (g === b) {
                g = this.pos++
            }
            if (g >= this.enc.length) {
                throw "Requesting byte offset " + g + " on a stream of length " + this.enc.length
            }
            return this.enc[g]
        };
        e.prototype.hexDigits = "0123456789ABCDEF";
        e.prototype.hexByte = function (g) {
            return this.hexDigits.charAt((g >> 4) & 15) + this.hexDigits.charAt(g & 15)
        };
        e.prototype.hexDump = function (g, k, j) {
            var h = "";
            for (var i = g; i < k; ++i) {
                h += this.hexByte(this.get(i));
                if (j !== true) {
                    switch (i & 15) {
                        case 7:
                            h += "  ";
                            break;
                        case 15:
                            h += "\n";
                            break;
                        default:
                            h += " "
                    }
                }
            }
            return h
        };
        e.prototype.parseStringISO = function (g, j) {
            var h = "";
            for (var i = g; i < j; ++i) {
                h += String.fromCharCode(this.get(i))
            }
            return h
        };
        e.prototype.parseStringUTF = function (g, k) {
            var i = "";
            for (var j = g; j < k;) {
                var h = this.get(j++);
                if (h < 128) {
                    i += String.fromCharCode(h)
                }
                else {
                    if ((h > 191) && (h < 224)) {
                        i += String.fromCharCode(((h & 31) << 6) | (this.get(j++) & 63))
                    }
                    else {
                        i += String.fromCharCode(((h & 15) << 12) | ((this.get(j++) & 63) << 6) | (this.get(j++) & 63))
                    }
                }
            }
            return i
        };
        e.prototype.parseStringBMP = function (g, k) {
            var h = "";
            for (var i = g; i < k; i += 2) {
                var l = this.get(i);
                var j = this.get(i + 1);
                h += String.fromCharCode((l << 8) + j)
            }
            return h
        };
        e.prototype.reTime = /^((?:1[89]|2\d)?\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
        e.prototype.parseTime = function (g, i) {
            var h = this.parseStringISO(g, i),
                j = this.reTime.exec(h);
            if (!j) {
                return "Unrecognized time: " + h
            }
            h = j[1] + "-" + j[2] + "-" + j[3] + " " + j[4];
            if (j[5]) {
                h += ":" + j[5];
                if (j[6]) {
                    h += ":" + j[6];
                    if (j[7]) {
                        h += "." + j[7]
                    }
                }
            }
            if (j[8]) {
                h += " UTC";
                if (j[8] != "Z") {
                    h += j[8];
                    if (j[9]) {
                        h += ":" + j[9]
                    }
                }
            }
            return h
        };
        e.prototype.parseInteger = function (g, k) {
            var l = k - g;
            if (l > 4) {
                l <<= 3;
                var i = this.get(g);
                if (i === 0) {
                    l -= 8
                }
                else {
                    while (i < 128) {
                        i <<= 1;
                        --l
                    }
                }
                return "(" + l + " bit)"
            }
            var h = 0;
            for (var j = g; j < k; ++j) {
                h = (h << 8) | this.get(j)
            }
            return h
        };
        e.prototype.parseBitString = function (o, n) {
            var j = this.get(o),
                l = ((n - o - 1) << 3) - j,
                g = "(" + l + " bit)";
            if (l <= 20) {
                var h = j;
                g += " ";
                for (var k = n - 1; k > o; --k) {
                    var i = this.get(k);
                    for (var m = h; m < 8; ++m) {
                        g += (i >> m) & 1 ? "1" : "0"
                    }
                    h = 0
                }
            }
            return g
        };
        e.prototype.parseOctetString = function (g, j) {
            var k = j - g,
                h = "(" + k + " byte) ";
            if (k > c) {
                j = g + c
            }
            for (var i = g; i < j; ++i) {
                h += this.hexByte(this.get(i))
            }
            if (k > c) {
                h += a
            }
            return h
        };
        e.prototype.parseOID = function (h, n) {
            var k = "",
                i = 0,
                j = 0;
            for (var l = h; l < n; ++l) {
                var m = this.get(l);
                i = (i << 7) | (m & 127);
                j += 7;
                if (!(m & 128)) {
                    if (k === "") {
                        var g = i < 80 ? i < 40 ? 0 : 1 : 2;
                        k = g + "." + (i - g * 40)
                    }
                    else {
                        k += "." + ((j >= 31) ? "bigint" : i)
                    }
                    i = j = 0
                }
            }
            return k
        };

        function f(h, g, i, k, j) {
            this.stream = h;
            this.header = g;
            this.length = i;
            this.tag = k;
            this.sub = j
        }
        f.prototype.typeName = function () {
            if (this.tag === b) {
                return "unknown"
            }
            var g = this.tag >> 6,
                i = (this.tag >> 5) & 1,
                h = this.tag & 31;
            switch (g) {
                case 0:
                    switch (h) {
                        case 0:
                            return "EOC";
                        case 1:
                            return "BOOLEAN";
                        case 2:
                            return "INTEGER";
                        case 3:
                            return "BIT_STRING";
                        case 4:
                            return "OCTET_STRING";
                        case 5:
                            return "NULL";
                        case 6:
                            return "OBJECT_IDENTIFIER";
                        case 7:
                            return "ObjectDescriptor";
                        case 8:
                            return "EXTERNAL";
                        case 9:
                            return "REAL";
                        case 10:
                            return "ENUMERATED";
                        case 11:
                            return "EMBEDDED_PDV";
                        case 12:
                            return "UTF8String";
                        case 16:
                            return "SEQUENCE";
                        case 17:
                            return "SET";
                        case 18:
                            return "NumericString";
                        case 19:
                            return "PrintableString";
                        case 20:
                            return "TeletexString";
                        case 21:
                            return "VideotexString";
                        case 22:
                            return "IA5String";
                        case 23:
                            return "UTCTime";
                        case 24:
                            return "GeneralizedTime";
                        case 25:
                            return "GraphicString";
                        case 26:
                            return "VisibleString";
                        case 27:
                            return "GeneralString";
                        case 28:
                            return "UniversalString";
                        case 30:
                            return "BMPString";
                        default:
                            return "Universal_" + h.toString(16)
                    }
                case 1:
                    return "Application_" + h.toString(16);
                case 2:
                    return "[" + h + "]";
                case 3:
                    return "Private_" + h.toString(16)
            }
        };
        f.prototype.reSeemsASCII = /^[ -~]+$/;
        f.prototype.content = function () {
            if (this.tag === b) {
                return null
            }
            var g = this.tag >> 6,
                j = this.tag & 31,
                h = this.posContent(),
                k = Math.abs(this.length);
            if (g !== 0) {
                if (this.sub !== null) {
                    return "(" + this.sub.length + " elem)"
                }
                var i = this.stream.parseStringISO(h, h + Math.min(k, c));
                if (this.reSeemsASCII.test(i)) {
                    return i.substring(0, 2 * c) + ((i.length > 2 * c) ? a : "")
                }
                else {
                    return this.stream.parseOctetString(h, h + k)
                }
            }
            switch (j) {
                case 1:
                    return (this.stream.get(h) === 0) ? "false" : "true";
                case 2:
                    return this.stream.parseInteger(h, h + k);
                case 3:
                    return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(h, h + k);
                case 4:
                    return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(h, h + k);
                case 6:
                    return this.stream.parseOID(h, h + k);
                case 16:
                case 17:
                    return "(" + this.sub.length + " elem)";
                case 12:
                    return this.stream.parseStringUTF(h, h + k);
                case 18:
                case 19:
                case 20:
                case 21:
                case 22:
                case 26:
                    return this.stream.parseStringISO(h, h + k);
                case 30:
                    return this.stream.parseStringBMP(h, h + k);
                case 23:
                case 24:
                    return this.stream.parseTime(h, h + k)
            }
            return null
        };
        f.prototype.toString = function () {
            return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + ((this.sub === null) ? "null" : this.sub.length) + "]"
        };
        f.prototype.print = function (h) {
            if (h === b) {
                h = ""
            }
            document.writeln(h + this);
            if (this.sub !== null) {
                h += "  ";
                for (var g = 0, i = this.sub.length; g < i; ++g) {
                    this.sub[g].print(h)
                }
            }
        };
        f.prototype.toPrettyString = function (i) {
            if (i === b) {
                i = ""
            }
            var g = i + this.typeName() + " @" + this.stream.pos;
            if (this.length >= 0) {
                g += "+"
            }
            g += this.length;
            if (this.tag & 32) {
                g += " (constructed)"
            }
            else {
                if (((this.tag == 3) || (this.tag == 4)) && (this.sub !== null)) {
                    g += " (encapsulates)"
                }
            }
            g += "\n";
            if (this.sub !== null) {
                i += "  ";
                for (var h = 0, j = this.sub.length; h < j; ++h) {
                    g += this.sub[h].toPrettyString(i)
                }
            }
            return g
        };
        f.prototype.toDOM = function () {
            var i = d.tag("div", "node");
            i.asn1 = this;
            var m = d.tag("div", "head");
            var k = this.typeName().replace(/_/g, " ");
            m.innerHTML = k;
            var o = this.content();
            if (o !== null) {
                o = String(o).replace(/</g, "&lt;");
                var p = d.tag("span", "preview");
                p.appendChild(d.text(o));
                m.appendChild(p)
            }
            i.appendChild(m);
            this.node = i;
            this.head = m;
            var l = d.tag("div", "value");
            k = "Offset: " + this.stream.pos + "<br/>";
            k += "Length: " + this.header + "+";
            if (this.length >= 0) {
                k += this.length
            }
            else {
                k += (-this.length) + " (undefined)"
            }
            if (this.tag & 32) {
                k += "<br/>(constructed)"
            }
            else {
                if (((this.tag == 3) || (this.tag == 4)) && (this.sub !== null)) {
                    k += "<br/>(encapsulates)"
                }
            }
            if (o !== null) {
                k += "<br/>Value:<br/><b>" + o + "</b>";
                if ((typeof oids === "object") && (this.tag == 6)) {
                    var h = oids[o];
                    if (h) {
                        if (h.d) {
                            k += "<br/>" + h.d
                        }
                        if (h.c) {
                            k += "<br/>" + h.c
                        }
                        if (h.w) {
                            k += "<br/>(warning!)"
                        }
                    }
                }
            }
            l.innerHTML = k;
            i.appendChild(l);
            var j = d.tag("div", "sub");
            if (this.sub !== null) {
                for (var g = 0, n = this.sub.length; g < n; ++g) {
                    j.appendChild(this.sub[g].toDOM())
                }
            }
            i.appendChild(j);
            m.onclick = function () {
                i.className = (i.className == "node collapsed") ? "node" : "node collapsed"
            };
            return i
        };
        f.prototype.posStart = function () {
            return this.stream.pos
        };
        f.prototype.posContent = function () {
            return this.stream.pos + this.header
        };
        f.prototype.posEnd = function () {
            return this.stream.pos + this.header + Math.abs(this.length)
        };
        f.prototype.fakeHover = function (g) {
            this.node.className += " hover";
            if (g) {
                this.head.className += " hover"
            }
        };
        f.prototype.fakeOut = function (g) {
            var h = / ?hover/;
            this.node.className = this.node.className.replace(h, "");
            if (g) {
                this.head.className = this.head.className.replace(h, "")
            }
        };
        f.prototype.toHexDOM_sub = function (i, j, h, g, l) {
            if (g >= l) {
                return
            }
            var k = d.tag("span", j);
            k.appendChild(d.text(h.hexDump(g, l)));
            i.appendChild(k)
        };
        f.prototype.toHexDOM = function (k) {
            var h = d.tag("span", "hex");
            if (k === b) {
                k = h
            }
            this.head.hexNode = h;
            this.head.onmouseover = function () {
                this.hexNode.className = "hexCurrent"
            };
            this.head.onmouseout = function () {
                this.hexNode.className = "hex"
            };
            h.asn1 = this;
            h.onmouseover = function () {
                var m = !k.selected;
                if (m) {
                    k.selected = this.asn1;
                    this.className = "hexCurrent"
                }
                this.asn1.fakeHover(m)
            };
            h.onmouseout = function () {
                var m = (k.selected == this.asn1);
                this.asn1.fakeOut(m);
                if (m) {
                    k.selected = null;
                    this.className = "hex"
                }
            };
            this.toHexDOM_sub(h, "tag", this.stream, this.posStart(), this.posStart() + 1);
            this.toHexDOM_sub(h, (this.length >= 0) ? "dlen" : "ulen", this.stream, this.posStart() + 1, this.posContent());
            if (this.sub === null) {
                h.appendChild(d.text(this.stream.hexDump(this.posContent(), this.posEnd())))
            }
            else {
                if (this.sub.length > 0) {
                    var g = this.sub[0];
                    var i = this.sub[this.sub.length - 1];
                    this.toHexDOM_sub(h, "intro", this.stream, this.posContent(), g.posStart());
                    for (var j = 0, l = this.sub.length; j < l; ++j) {
                        h.appendChild(this.sub[j].toHexDOM(k))
                    }
                    this.toHexDOM_sub(h, "outro", this.stream, i.posEnd(), this.posEnd())
                }
            }
            return h
        };
        f.prototype.toHexString = function (g) {
            return this.stream.hexDump(this.posStart(), this.posEnd(), true)
        };
        f.decodeLength = function (g) {
            var i = g.get(),
                j = i & 127;
            if (j == i) {
                return j
            }
            if (j > 3) {
                throw "Length over 24 bits not supported at position " + (g.pos - 1)
            }
            if (j === 0) {
                return -1
            }
            i = 0;
            for (var h = 0; h < j; ++h) {
                i = (i << 8) | g.get()
            }
            return i
        };
        f.hasContent = function (l, m, g) {
            if (l & 32) {
                return true
            }
            if ((l < 3) || (l > 4)) {
                return false
            }
            var h = new e(g);
            if (l == 3) {
                h.get()
            }
            var i = h.get();
            if ((i >> 6) & 1) {
                return false
            }
            try {
                var j = f.decodeLength(h);
                return ((h.pos - g.pos) + j == m)
            }
            catch (k) {
                return false
            }
        };
        f.decode = function (m) {
            if (!(m instanceof e)) {
                m = new e(m, 0)
            }
            var n = new e(m),
                k = m.get(),
                p = f.decodeLength(m),
                g = m.pos - n.pos,
                j = null;
            if (f.hasContent(k, p, m)) {
                var i = m.pos;
                if (k == 3) {
                    m.get()
                }
                j = [];
                if (p >= 0) {
                    var h = i + p;
                    while (m.pos < h) {
                        j[j.length] = f.decode(m)
                    }
                    if (m.pos != h) {
                        throw "Content size is not correct for container starting at offset " + i
                    }
                }
                else {
                    try {
                        for (;;) {
                            var l = f.decode(m);
                            if (l.tag === 0) {
                                break
                            }
                            j[j.length] = l
                        }
                        p = i - m.pos
                    }
                    catch (o) {
                        throw "Exception while decoding undefined length content: " + o
                    }
                }
            }
            else {
                m.pos += p
            }
            return new f(n, g, p, k, j)
        };
        f.test = function () {
            var g = [{
                value: [39],
                expected: 39
            }, {
                value: [129, 201],
                expected: 201
            }, {
                value: [131, 254, 220, 186],
                expected: 16702650
            }];
            for (var j = 0, l = g.length; j < l; ++j) {
                var h = 0,
                    i = new e(g[j].value, 0),
                    k = f.decodeLength(i);
                if (k != g[j].expected) {
                    document.write("In test[" + j + "] expected " + g[j].expected + " got " + k + "\n")
                }
            }
        };
        ASN1 = f
    })();
    ASN1.prototype.getHexStringValue = function () {
        var b = this.toHexString();
        var c = this.header * 2;
        var a = this.length * 2;
        return b.substr(c, a)
    };
    dx.prototype.parseKey = function (g) {
        try {
            var j = 0;
            var f = 0;
            var n = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/;
            var l = n.test(g) ? Hex.decode(g) : Base64.unarmor(g);
            var o = ASN1.decode(l);
            if (o.sub.length === 9) {
                j = o.sub[1].getHexStringValue();
                this.n = dF(j, 16);
                f = o.sub[2].getHexStringValue();
                this.e = parseInt(f, 16);
                var d = o.sub[3].getHexStringValue();
                this.d = dF(d, 16);
                var m = o.sub[4].getHexStringValue();
                this.p = dF(m, 16);
                var c = o.sub[5].getHexStringValue();
                this.q = dF(c, 16);
                var k = o.sub[6].getHexStringValue();
                this.dmp1 = dF(k, 16);
                var i = o.sub[7].getHexStringValue();
                this.dmq1 = dF(i, 16);
                var e = o.sub[8].getHexStringValue();
                this.coeff = dF(e, 16)
            }
            else {
                if (o.sub.length === 2) {
                    var a = o.sub[1];
                    var h = a.sub[0];
                    j = h.sub[0].getHexStringValue();
                    this.n = dF(j, 16);
                    f = h.sub[1].getHexStringValue();
                    this.e = parseInt(f, 16)
                }
                else {
                    return false
                }
            }
            return true
        }
        catch (b) {
            return false
        }
    };
    dx.prototype.getPublicBaseKey = function () {
        var c = {
            array: [new KJUR.asn1.DERObjectIdentifier({
                oid: "1.2.840.113549.1.1.1"
            }), new KJUR.asn1.DERNull()]
        };
        var b = new KJUR.asn1.DERSequence(c);
        c = {
            array: [new KJUR.asn1.DERInteger({
                bigint: this.n
            }), new KJUR.asn1.DERInteger({
                "int": this.e
            })]
        };
        var d = new KJUR.asn1.DERSequence(c);
        c = {
            hex: "00" + d.getEncodedHex()
        };
        var e = new KJUR.asn1.DERBitString(c);
        c = {
            array: [b, e]
        };
        var a = new KJUR.asn1.DERSequence(c);
        return a.getEncodedHex()
    };
    dx.prototype.getPublicBaseKeyB64 = function () {
        return dY(this.getPublicBaseKey())
    };
    dx.prototype.wordwrap = function (c, b) {
        b = b || 64;
        if (!c) {
            return c
        }
        var a = "(.{1," + b + "})( +|$\n?)|(.{1," + b + "})";
        return c.match(RegExp(a, "g")).join("\n")
    };
    dx.prototype.getPublicKey = function () {
        var a = "-----BEGIN PUBLIC KEY-----\n";
        a += this.wordwrap(this.getPublicBaseKeyB64()) + "\n";
        a += "-----END PUBLIC KEY-----";
        return a
    };
    dx.prototype.hasPublicKeyProperty = function (a) {
        a = a || {};
        return (a.hasOwnProperty("n") && a.hasOwnProperty("e"))
    };
    dx.prototype.parsePropertiesFrom = function (a) {
        this.n = a.n;
        this.e = a.e;
        if (a.hasOwnProperty("d")) {
            this.d = a.d;
            this.p = a.p;
            this.q = a.q;
            this.dmp1 = a.dmp1;
            this.dmq1 = a.dmq1;
            this.coeff = a.coeff
        }
    };
    var dI = function (a) {
        dx.call(this);
        if (a) {
            if (typeof a === "string") {
                this.parseKey(a)
            }
            else {
                if (this.hasPublicKeyProperty(a)) {
                    this.parsePropertiesFrom(a)
                }
            }
        }
    };
    dI.prototype = new dx();
    dI.prototype.constructor = dI;
    var ce = function (a) {
        a = a || {};
        this.default_key_size = parseInt(a.default_key_size) || 1024;
        this.default_public_exponent = a.default_public_exponent || "010001";
        this.log = a.log || false;
        this.key = null
    };
    ce.prototype.setKey = function (a) {
        if (this.log && this.key) {
            console.warn("A key was already set, overriding existing.")
        }
        this.key = new dI(a)
    };
    ce.prototype.setPublicKey = function (a) {
        this.setKey(a)
    };
    ce.prototype.decrypt = function (b) {
        try {
            return this.getKey().decrypt(a8(b))
        }
        catch (a) {
            return false
        }
    };
    ce.prototype.encrypt = function (b) {
        try {
            return dY(this.getKey().encrypt(b))
        }
        catch (a) {
            return false
        }
    };
    ce.prototype.getKey = function (a) {
        if (!this.key) {
            this.key = new dI();
            if (a && {}.toString.call(a) === "[object Function]") {
                this.key.generateAsync(this.default_key_size, this.default_public_exponent, a);
                return
            }
            this.key.generate(this.default_key_size, this.default_public_exponent)
        }
        return this.key
    };
    ce.prototype.getPublicKey = function () {
        return this.getKey().getPublicKey()
    };
    ce.prototype.getPublicKeyB64 = function () {
        return this.getKey().getPublicBaseKeyB64()
    };
    cR.JSEncrypt = ce
})(JSEncryptExports);
var JSEncrypt = JSEncryptExports.JSEncrypt;