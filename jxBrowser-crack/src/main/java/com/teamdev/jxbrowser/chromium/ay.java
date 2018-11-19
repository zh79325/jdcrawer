package com.teamdev.jxbrowser.chromium;

/**
 * Author     : zh79325@163.com
 * Copyright  :
 * Company    :
 * Create at  : 2017/6/22 18:39
 * Description:
 */

import crack.MySimpleDateFormat;

import java.text.MessageFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.Locale;

public class ay {
    public static final SimpleDateFormat a;
    protected String b;
    protected String c;
    private az d;
    private long e = 0L;
    private ax f = null;

    protected ay(String var1, String var2, az var3) {
        this.c = var1;
        this.b = var2;
        this.d = var3;
    }

    public final synchronized void b() {
        try {
            try {
                Date var1;
                long var2 = (var1 = new Date()).getTime();
                if (this.e == 0L || var2 - this.e >= 86400000L) {
                    String var4 = null;
                    ba var5 = null;
                    Iterator var6 = this.d.a().iterator();

                    while (var6.hasNext()) {
                        try {
                            var5 = (ba) var6.next();
                            String var7 = MessageFormat.format(ax.d("p93g9dnjhp3v7wc8kkv5gf5wts2fxu4lrkegxm"), new Object[]{this.c, var5.b()});
                            this.a(var7);
                            ax var14;
                            if (!(var14 = var5.a()).b()) {
                                throw a(this.c, ax.d("-1koxh9ny992ac6ta5sop8ylctlxlppcydnte"));
                            }

                            this.a(var14, var1, true);
                            this.f = var5.a();
                        } catch (RuntimeException var10) {
                            var4 = var10.getMessage();
                            this.a((Throwable) var10);
                        }
                    }

                    if (this.f == null) {
                        int var15;
                        if (var4 != null && (var15 = var4.indexOf(": ")) != -1) {
                            var4 = var4.substring(var15 + 2);
                        }

                        StringBuffer var13;
                        (var13 = new StringBuffer()).append(ax.d("-1h5z6hxxos0zbox3xolmba48qlwwd7x6uwuq"));
                        var13.append(' ');
                        if (var5 != null) {
                            var13.append(var5.b());
                            var13.append(" - ");
                        }

                        if (var4 != null) {
                            var13.append(var4);
                        }

                        throw a(this.c, var13.toString());
                    } else {
                        this.a(MessageFormat.format(ax.d("-2q85h5qltpmyrcjwru3sej0uxscy"), new Object[]{this.c}));
                        this.e = var2;
                    }
                }
            } catch (RuntimeException var11) {
                this.a((Throwable) var11);
                throw var11;
            } catch (Error var12) {
                this.a((Throwable) var12);
                throw var12;
            }
        }catch (Exception ex){
            System.out.println(ex);
        }
    }

    protected void a(ax var1, Date var2, boolean var3) {
        String var4 = var1.a(ax.d("1q7n272qd84"));
        String var5 = var1.a(ax.d("19fxiwileni"));
        String var6 = var1.a(ax.d("iagms4wv805n13wj3"));
        String var7 = var1.a(ax.d("36xzg4lboedkeoqf811"));
        Date var8 = this.b(var1);
        c(var1);
        String var9 = var1.a(ax.d("36xzg4lboedkelo46lr"));
        String var10 = var1.a(ax.d("5j1bhimjm9oboxe6h14nh47"));
        String var11 = var1.b(ax.d("mwlw9w46mxsl96fjodecolv9odg7e7"));
        long var12 = var8 != null?var8.getTime():0L;
        Date var18 = this.a(var1);
        if(var7.equals(ax.d("-24jl5nttfop484gi"))) {
            bd var14 = new bd(var4, this.b, var8);
            bc var20 = new bc(var14, new bb[]{new be("ecjgpw1257bg77iav"), new be("-5fz9u9b1d9n77sjezuuai80ktm4k8yjirbsplio9m6yt0"), new bf(), new bg("-6bspffqi914xs2ut3d0ieleutxmzj0t4zx"), new bg("ws9f9lj0luj1n2woe9gkorn")});
            String var15;
            boolean var16 = (var15 = var9.toLowerCase()).contains(ax.d("-wl8msznmkuqk"));
            boolean var22 = var15.contains(ax.d("-2ky68kd0oyfkualsija98isgr"));
            if(var16 || var22) {
                var20.b();
            }

            if(var20.a(var2)) {
                String var19 = b(var4, var20.a());
                throw a(this.c, var19);
            }
        }

        this.a(ax.d("-fx8zfkfilg7q65z9rg5h0o0ijk") + var4);
        this.a(ax.d("-167tchxq4gzzfmthz9d865k9y0ulaxxi8") + var5);
        this.a(ax.d("-65a0ibucyq8yra7nbat84f74w") + var6);
        this.a(ax.d("-fx8zfqjxqhmbqr30hhe34xcbfk") + var7);
        if(var10 != null) {
            this.a(ax.d("-959y3b7csqivsggnhg7uok7zdrrznrixf5xqftd6cmx9c") + var10);
        }

        this.a(ax.d("e1d5mpyagfb433m5qissnmbqgvialnk") + a(var18));
        this.a(ax.d("e1d5mp53qy18l2b0dpetgwio6nsn6sg") + (var8 != null?a(var8):ax.d("1js3qp8y")));
        this.a(ax.d("-fx8zfqjxqhmbqr30hlp1429bs0") + var9);
        this.a(ax.d("-fx8zg44ytfet74z7tml7k25n1c") + a(var2));
        if(!this.c.equals(var4)) {
            throw a(this.c, ax.d("1v35k8qx4wmssyw4qti519lbpqfktq"));
        } else if(var3 && !var5.startsWith(this.b)) {
            throw a(this.c, ax.d("iot24yas8cuw44n62hrb3zbbn2hxxfnkivget9kl2amnhmkrqcg") + this.b + ax.d("-20x74pe1ewn8x0ps") + var5 + '.');
        } else {
            if(var10 != null) {
                try {
                    Class.forName(var11);
                } catch (ClassNotFoundException var17) {
                    throw a(this.c, ax.d("lifgy671svju3mpdy4x1uivfkfwfz332tp0qxyulqcleoi59pc8h0g") + var10);
                }
            }

            if(var8 != null && var2.getTime() >= var12) {
                String var21 = b(var4, a(var8));
                throw a(this.c, var21);
            }
        }
    }

    private static String b(String var0, String var1) {
        String var2 = ax.d("106h6jqri8vfn4xt2wa9sbhgl5rnhh3du04mc0w680mjnte4i53d33ecsbskh6ao");
        String var3 = ax.d("azgyw1uv8z3saevtpfuscjdn1ovhfuu8n3jcmkf01xm2gtfd40infk");
        String var4 = ax.d("-3ncn8aicc2tbpmjxfwwzof0i3ezah5oyp6m1zjekiv2w5wgbzacrmz6jsuhpa7ei8x3cp07edzsjmyg7hv8wb3x7f5");
        String var5 = ax.d("akw704qofn7v1xjbtj0y8hcj5ykls9dqjo3srlctsslkmwsepp5ab81713y1f3m1kyh5drsi5sfytatyrted9e74");
        String var6 = ax.d("-42bz4x20xc7k8uu2jb5yxlj02nrezdb5hyfic308dkykwip5639q9kkb9z3363ag14vbispaagrneyq7cbsx4bbc2ya0z4a7uqgv0odekbap0sd9ce5u71bxshaj6m0wwlg488g0u92wafuelor2qazv10uikxik1x0ymfdn30j46oefr6g4tjl");
        return var2 + var1 + var3 + var0 + var4 + var0.toLowerCase() + var5 + var0 + var6;
    }

    protected void a(String var1) {
        System.out.println(var1);
    }

    private void a(Throwable var1) {
        try {
            this.a(var1.getMessage());
        } catch (Exception var2) {
            System.out.println(var1.getMessage());
        }

        for(var1 = var1; var1 != null; var1 = var1.getCause()) {
            var1.setStackTrace(new StackTraceElement[0]);
        }

    }

    private static String a(Date var0) {
        return SimpleDateFormat.getDateInstance(2).format(var0);
    }

    public static RuntimeException a(String var0, String var1) {
        var0 = MessageFormat.format(ax.d("-4njllqpr2n2m62h303cst4lers4j13jyuqjklo6u2i743"), new Object[]{var0, var1});
        return new RuntimeException(var0);
    }

    private Date a(ax var1) {
        String var3;
        if((var3 = var1.a(ax.d("1m81b2vpljtfnxmoxaelbol"))) == null) {
            throw a(this.c, ax.d("86te4jjcjrfpf5hiittrs2noi8xih2kw8qbdkkxc5toub15ciaq0t12hkni4pfb6dvvacmoc03ucl"));
        } else {
            try {
                return a.parse(var3);
            } catch (ParseException var2) {
                throw a(this.c, ax.d("-benuth93s2hx673qi3yqnuqt9z5k2zctv3l2og3efiyr6mx3lf2gdco4np4b1c") + var3);
            }
        }
    }

    private Date b(ax var1) {
        String var3;
        if((var3 = var1.a(ax.d("28lqbdq6yls9p1vraqtfplx"))) == null) {
            throw a(this.c, ax.d("86te4furtvk2113ylh2tuqu6j8d2bxwiaq6f6i873lq9d4bjn95lxc12ka8prybplz15qe10dx9ph"));
        } else if(var3.toUpperCase().equals(ax.d("1js3qp8y"))) {
            return null;
        } else {
            try {
                return a.parse(var3);
            } catch (ParseException var2) {
                throw a(this.c, ax.d("-benuth93s2hx673qi3yqnuqt9z5k2zctv3l2p9a3wsu97y2get1n35qeverpwg") + var3);
            }
        }
    }

    private static Date c(ax var0) {
        try {
            String var2;
            return (var2 = var0.a(ax.d("-1kmye09ftyxuehndrac3s0nt019y7bospggr"))) != null?a.parse(var2):null;
        } catch (ParseException var1) {
            return null;
        }
    }

    static {
        a = new MySimpleDateFormat(ax.d("-1f7zk41inyuazbev"), Locale.ENGLISH);
    }
}
