package com.teamdev.jxbrowser.chromium;


import java.util.Date;

final class bd {
    private Date a;
    private String b;
    private int c;

    bd(String var1, String var2, Date var3) {
        this.b = var1;
        this.a = var3;
        int var6;
        int var7;
        if((var6 = var2.indexOf(46)) > 0) {
            var1 = var2.substring(0, var6);
            var7 = Integer.parseInt(var1);
            this.c = var7;
        } else {
            try {
                var7 = Integer.parseInt(var2);
                this.c = var7;
            } catch (Exception var5) {
                byte var4 = -1;
                this.c = var4;
            }
        }
    }

    bd(String var1, String var2, String var3) {
        this.b = var1;
        int var5 = Integer.parseInt(var2);
        this.c = var5;
        var2 = var3;
        bd var8 = this;

        Date var7;
        try {
            var7 = ay.a.parse(var2);
            var8.a = var7;
        } catch (Exception var6) {
            var7 = new Date();
            this.a = var7;
        }
    }

    final Date a() {
        return this.a;
    }

    final void a(Date var1) {
        this.a = var1;
    }

    final String b() {
        return this.b;
    }

    final int c() {
        return this.c;
    }

    public final boolean equals(Object var1) {
        if(this == var1) {
            return true;
        } else if(!(var1 instanceof bd)) {
            return false;
        } else {
            bd var2 = (bd)var1;
            if(this.c != var2.c) {
                return false;
            } else {
                if(this.a != null) {
                    if(!this.a.equals(var2.a)) {
                        return false;
                    }
                } else if(var2.a != null) {
                    return false;
                }

                if(this.b != null) {
                    if(!this.b.equals(var2.b)) {
                        return false;
                    }
                } else if(var2.b != null) {
                    return false;
                }

                return true;
            }
        }
    }

    public final int hashCode() {
        int var1 = this.a != null?this.a.hashCode():0;
        var1 = var1 * 31 + (this.b != null?this.b.hashCode():0);
        return var1 * 31 + this.c;
    }

    protected final String d() {
        return ay.a.format(this.a);
    }
}
