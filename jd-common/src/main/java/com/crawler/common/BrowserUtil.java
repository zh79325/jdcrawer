package com.crawler.common;

import com.teamdev.jxbrowser.chromium.Browser;
import com.teamdev.jxbrowser.chromium.BrowserKeyEvent;
import com.teamdev.jxbrowser.chromium.BrowserMouseEvent;
import com.teamdev.jxbrowser.chromium.dom.By;
import com.teamdev.jxbrowser.chromium.dom.DOMDocument;
import com.teamdev.jxbrowser.chromium.dom.DOMElement;
import com.teamdev.jxbrowser.chromium.dom.internal.InputElement;
import com.teamdev.jxbrowser.chromium.swing.BrowserView;
import org.apache.commons.lang3.StringUtils;

import javax.swing.*;
import java.awt.*;

import static com.teamdev.jxbrowser.chromium.BrowserMouseEvent.*;
import static com.teamdev.jxbrowser.chromium.BrowserMouseEvent.MouseButtonType;
import static com.teamdev.jxbrowser.chromium.BrowserMouseEvent.MouseEventType.*;
import static com.teamdev.jxbrowser.chromium.BrowserMouseEvent.MouseScrollType.*;

/**
 * Author     : zh_zhou@Ctrip.com
 * Copyright  : Ctrip Copyright (c) 2017
 * Company    : Ctrip
 * Create at  : 2017/6/1 23:47
 * Description:
 */
public class BrowserUtil {

    public static boolean hasDocument(Browser browser){
        DOMDocument document = browser.getDocument();
        DOMElement documentElement = document.getDocumentElement();
        return documentElement!=null;
    }
    public static BrowserView showBrowser(Browser browser) {
        BrowserView view = new BrowserView(browser);

        JPanel panel = new JPanel(new BorderLayout());
        panel.add(view, BorderLayout.CENTER);

        JFrame frame = new JFrame();
        frame.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        frame.add(panel, BorderLayout.CENTER);
        frame.setSize(700, 500);
        frame.setLocationRelativeTo(null);
        frame.setVisible(true);
        return view;
    }

    public static String getValue(DOMDocument document, String id) {
        DOMElement element = document.findElement(By.id(id));
        if (element == null) {
            return null;
        }
        String txt = ((InputElement) element).getValue();
        if (StringUtils.isEmpty(txt)) {
            return null;
        }
        return txt;
    }

    public  static void forwardMouseScrollEvent(Browser browser,
                                                       int unitsToScroll,
                                                       int x,
                                                       int y) {
        BrowserMouseEvent.BrowserMouseEventBuilder builder = new BrowserMouseEvent.BrowserMouseEventBuilder();
        builder.setEventType(MOUSE_WHEEL)
                .setX(x)
                .setY(y)
                .setGlobalX(0)
                .setGlobalY(0)
                .setScrollBarPixelsPerLine(25)
                .setScrollType(WHEEL_BLOCK_SCROLL)
                .setUnitsToScroll(unitsToScroll);
        browser.forwardMouseEvent(builder.build());
    }
    private static void forwardMousePressEvent(Browser browser,
                                               MouseButtonType buttonType,
                                               int x,
                                               int y,
                                               int globalX,
                                               int globalY) {
        BrowserMouseEventBuilder builder = new BrowserMouseEventBuilder();
        builder.setEventType(MOUSE_PRESSED)
                .setButtonType(buttonType)
                .setX(x)
                .setY(y)
                .setGlobalX(globalX)
                .setGlobalY(globalY)
                .setClickCount(1)
                .setModifiers(new BrowserKeyEvent.KeyModifiersBuilder().mouseButton().build());
        browser.forwardMouseEvent(builder.build());
    }

    private static void forwardMouseReleaseEvent(Browser browser,
                                                 MouseButtonType buttonType,
                                                 int x,
                                                 int y,
                                                 int globalX,
                                                 int globalY) {
        BrowserMouseEventBuilder builder = new BrowserMouseEventBuilder();
        builder.setEventType(MOUSE_RELEASED)
                .setButtonType(buttonType)
                .setX(x)
                .setY(y)
                .setGlobalX(globalX)
                .setGlobalY(globalY)
                .setClickCount(1)
                .setModifiers(BrowserKeyEvent.KeyModifiers.NO_MODIFIERS);
        browser.forwardMouseEvent(builder.build());
    }

    public static void forwardMouseClickEvent(Browser browser,
                                               MouseButtonType buttonType,
                                               int x,
                                               int y,
                                               int globalX,
                                               int globalY) {
        forwardMousePressEvent(browser, buttonType, x, y, globalX, globalY);
        forwardMouseReleaseEvent(browser, buttonType, x, y, globalX, globalY);
    }

}
