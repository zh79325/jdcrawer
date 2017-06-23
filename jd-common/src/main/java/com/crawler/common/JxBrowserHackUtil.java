package com.crawler.common;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.util.Enumeration;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;
import java.util.zip.ZipOutputStream;

/**
 * Author     : zh_zhou@Ctrip.com
 * Copyright  : Ctrip Copyright (c) 2017
 * Company    : Ctrip
 * Create at  : 2017/6/1 23:12
 * Description:
 */
public class JxBrowserHackUtil {

    static boolean hacked = true;

    public static void hack() throws Exception {
        if (hacked) {
            return;
        }
        hacked = true;
        TestClassLoader classLoader = new TestClassLoader();
        Thread.currentThread().setContextClassLoader(classLoader);
        classLoader.loadClass("com.teamdev.jxbrowser.chromium.ay");
        String classPath = System.getProperty("java.class.path");
        String[] paths = classPath.split(";");

        for (int i = 0; i < paths.length; i++) {
            String path = paths[i];
            String name = FilenameUtils.getName(path);
            if (!name.toLowerCase().endsWith("jar")) {
                continue;
            }
            if (!hasFile(path, "com/teamdev/jxbrowser/chromium/ay.class")) {
                continue;
            }

            File hackedJar = new File("tmp/jar/" + name);
            File srcJar = new File(path);
            if (!hackedJar.getParentFile().exists()) {
                hackedJar.getParentFile().mkdirs();
            }
            if (hackedJar.exists()) {
                FileUtils.deleteQuietly(hackedJar);
            }
            InputStream is = JxBrowserHackUtil.class.getClassLoader().getResourceAsStream("ay.class");

            replaceJar(srcJar, hackedJar, "com/teamdev/jxbrowser/chromium/ay.class", is);
            paths[i] = hackedJar.getAbsolutePath();

            break;
        }

        String newPath = "";
        for (String path : paths) {
            if (!StringUtils.isEmpty(newPath)) {
                newPath += ";";
            }
            newPath += path;
        }
        System.setProperty("java.class.path", newPath);
//        SimpleDateFormat df = ay.a;
//        MySimpleDateFormat mySimpleDateFormat = new MySimpleDateFormat(df);
//        setFinalStatic(ay.class.getField("a"), mySimpleDateFormat);
        System.setProperty("teamdev.license.info", "true");
    }

    private static void replaceJar(File srcJar, File hackedJar, String path, InputStream is) throws IOException {
        ZipFile zipFile = new ZipFile(srcJar);
        final ZipOutputStream zos = new ZipOutputStream(new FileOutputStream(hackedJar));
        for(Enumeration e = zipFile.entries(); e.hasMoreElements(); ) {
            ZipEntry entryIn = (ZipEntry) e.nextElement();
            if (entryIn.getName().equalsIgnoreCase(path)) {
                zos.putNextEntry(new ZipEntry(path));
                byte[]buf=IOUtils.toByteArray(is);
                zos.write(buf, 0,   buf.length);
                zos.closeEntry();
                break;
            }


        }
        zos.close();
    }

    static boolean hasFile(String jar, String path) {
        boolean has = false;
        InputStream input = null;
        try {
            ZipFile zipFile = new ZipFile(jar);

            Enumeration<? extends ZipEntry> entries = zipFile.entries();

            while (entries.hasMoreElements()) {
                ZipEntry entry = entries.nextElement();
                String name = entry.getName();
                if (name.equals(path)) {
                    has = true;
                    break;
                }
            }
        } catch (Exception e) {

        }
        return has;

    }

    static class TestClassLoader extends ClassLoader {
        @Override
        public Class<?> loadClass(String name) throws ClassNotFoundException {
            if (name.equals("com.teamdev.jxbrowser.chromium.ay")) {
                InputStream is = null, is2 = null;
                try {
                    is = JxBrowserHackUtil.class.getClassLoader().getResourceAsStream("ay.class");
                    is2 = JxBrowserHackUtil.class.getClassLoader().getResourceAsStream("com/teamdev/jxbrowser/chromium/ay.class");
                    byte[] bytes = IOUtils.toByteArray(is);
                    Class<?> c = defineClass(name, bytes, 0, bytes.length);
                    resolveClass(c);
                    return c;
                } catch (IOException e) {
                    throw new ClassNotFoundException("", e);
                } finally {
                    IOUtils.closeQuietly(is);
                }
            }
            return getParent().loadClass(name);
        }
    }

    public static void setFinalStatic(Field field, Object newValue) throws Exception {
        field.setAccessible(true);

        Field modifiersField = Field.class.getDeclaredField("modifiers");
        modifiersField.setAccessible(true);
        modifiersField.setInt(field, field.getModifiers() & ~Modifier.FINAL);

        field.set(null, newValue);
    }

}
