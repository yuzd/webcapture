var emPensize = 1;
var emDrawType = 2;
var emTrackColor = 3;
var emEditBorderColor = 4;
var emTransparent = 5;
var emWindowAware = 6;
var emSetSaveName = 8;
var emSetMagnifierBkColor = 9;
var emSetMagnifierLogoText = 10;
var emSetWatermarkPictureType = 20;
var emSetWatermarkPicturePath = 21;
var emSetWatermarkTextType = 22;
var emSetWatermarkTextValue = 23;
var emSetMosaicType = 24;

function rgb2value(d, c, a) {
    return d | c << 8 | a << 16
}
var captureObjSelf = null;

function onpluginLoaded() {
    captureObjSelf.pluginLoaded()
}
function NiuniuCaptureObject() {
    var a = this;
    captureObjSelf = this;
    this.PenSize = 2;
    this.DrawType = 0;
    this.TrackColor = rgb2value(255, 0, 0);
    this.EditBorderColor = rgb2value(255, 0, 0);
    this.Transparent = 240;
    this.WindowAware = 1;
    this.MosaicType = 1;
    this.SaveName = "Ctrip-截图保存";
    this.MagnifierLogoText = "Ctrip截图";
    this.WatermarkPictureType = 3;
    this.WatermarkPicturePath = "";
    this.WatermartTextType = 1;
    this.WatermartTextValue = "";
    this.NiuniuAuthKey = "";
    this.FinishedCallback = null;
    this.PluginLoadedCallback = null;
    this.IsNeedCrx = function() {
        var b = a.IsRealChrome();
        var c = a.GetChromeMainVersion();
        if (b && c > 41) {
            return true
        }
        return false
    };
    this.LoadPlugin = function() {
        var b = $("#capturecontainer");
        if (b.length < 1) {
            $("body").append('<div id="capturecontainer" style="height:0px;width:0px;"></div>');
            b = $("#capturecontainer")
        }
        b.html("");
        b.html('<object id="niuniuCapture" type="application/x-niuniucaptureZBJY" width="0" height="0"><param name="onload" value="onpluginLoaded" /></object>')
    };
    this.niuniuCapture = function() {
        return document.getElementById("niuniuCapture")
    };
    this.addEvent = function(d, b, c) {
        if (d.attachEvent) {
            d.attachEvent("on" + b, c)
        } else {
            d.addEventListener(b, c, false)
        }
    };
    this.pluginValid = function() {
        try {
            if (a.niuniuCapture().valid) {
                return true
            }
        } catch (b) {}
        return false
    };
    this.OnCaptureFinished = function(c, g, d, b, e, f) {
        a.OnCaptureFinishedEx(1, c, g, d, b, "", e, f)
    };
    this.OnCaptureFinishedEx = function(e, c, i, d, b, g, f, h) {
        if (a.FinishedCallback != null) {
            a.FinishedCallback(e, c, i, d, b, g, f, h)
        } else {
            alert("截图完成的事件未绑定，将不能对图片进行处理，请指定FinishedCallback回调函数")
        }
    };
    this.pluginLoaded = function() {
        if (!a.pluginValid()) {
            if (a.PluginLoadedCallback != null) {
                a.PluginLoadedCallback(false)
            }
            return false
        }
        a.niuniuCapture().InitCapture(a.NiuniuAuthKey);
        a.niuniuCapture().InitParam(emPensize, a.PenSize);
        a.niuniuCapture().InitParam(emDrawType, a.DrawType);
        a.niuniuCapture().InitParam(emTrackColor, a.TrackColor);
        a.niuniuCapture().InitParam(emEditBorderColor, a.EditBorderColor);
        a.niuniuCapture().InitParam(emTransparent, a.Transparent);
        a.niuniuCapture().InitParam(emSetSaveName, a.SaveName);
        a.niuniuCapture().InitParam(emSetMagnifierLogoText, a.MagnifierLogoText);
        a.niuniuCapture().InitParam(emSetMosaicType, a.MosaicType);
        a.addEvent(a.niuniuCapture(), "CaptureFinishedEx", a.OnCaptureFinishedEx);
        a.addEvent(a.niuniuCapture(), "CaptureFinished", a.OnCaptureFinished);
        if (a.PluginLoadedCallback != null) {
            a.PluginLoadedCallback(true)
        }
    };
    this.SetWatermarkPicture = function(b) {
        a.WatermarkPicturePath = b;
        if (!a.pluginValid()) {
            return
        }
        a.niuniuCapture().InitParam(emSetWatermarkPicturePath, a.WatermarkPicturePath)
    };
    this.SetWatermarkText = function(b) {
        a.WatermarkTextValue = b;
        if (!a.pluginValid()) {
            return
        }
        a.niuniuCapture().InitParam(emSetWatermarkTextValue, a.WatermarkTextValue)
    };
    this.SavePicture = function(b) {
        if (a.pluginValid()) {
            a.niuniuCapture().SavePicture(b)
        }
    };
    this.GetCursorPosition = function() {
        if (a.pluginValid()) {
            var b = a.niuniuCapture().GetCursorPosition();
            return b
        }
        return ""
    };
    this.NewCaptureParamObject = function(g, e, d, c, i, f, b) {
        var h = new Object();
        h.IsGBK = 0;
        h.AuthKey = a.NiuniuAuthKey;
        h.Pensize = a.PenSize;
        h.DrawType = a.DrawType;
        h.TrackColor = a.TrackColor;
        h.EditBorderColor = a.EditBorderColor;
        h.Transparent = a.Transparent;
        h.SetSaveName = a.SaveName;
        h.SetMagnifierLogoText = a.MagnifierLogoText;
        h.SetWatermarkPictureType = 3;
        h.SetWatermarkPicturePath = a.WatermarkPicturePath;
        h.SetWatermarkTextType = 1;
        h.SetWatermarkTextValue = a.WatermarkTextValue;
        h.MosaicType = a.MosaicType;
        h.DefaultPath = g;
        h.HideCurrentWindow = e;
        h.AutoCaptureFlag = d;
        h.x = c;
        h.y = i;
        h.Width = f;
        h.Height = b;
        return h
    };
    this.BindChromeCallback = function() {
        document.addEventListener("NiuniuCaptureEventCallBack", function(c) {
            var b = c.detail;
            if (b.Result == -2) {
                a.OnCaptureFinishedEx(-1, 0, 0, 0, 0, "", "", "")
            }
            if (b.Result != -1) {
                a.OnCaptureFinishedEx(b.Type, b.x, b.y, b.Width, b.Height, b.Info, b.Content, b.LocalPath)
            } else {
                alert("出错：" + b.Info)
            }
        })
    };
    this.IsRealChrome = function() {
        try {
            var b = window.navigator.userAgent.toLowerCase();
            var c = b.indexOf("qqbrowser") != -1;
            if (c) {
                return false
            }
            var f = b.indexOf("chrome") != -1;
            if (f) {
                if (chrome && chrome.runtime) {
                    return true
                }
            }
            return false
        } catch (d) {}
        return false
    };
    this.GetChromeMainVersion = function() {
        var b = navigator.userAgent.toLowerCase();
        var c = "" + (/chrome\/((\d|\.)+)/i.test(b) && RegExp["$1"]);
        if (c != "false") {
            return parseInt(c)
        }
        return 0
    };
    this.DoCaptureForChrome = function(b, g, k, j, i, d, n) {
        var f = a.NewCaptureParamObject(b, g, k, j, i, d, n);
        try {
            var o = $.toJSON(f);
            var m = "NiuniuCaptureEvent_ZB";
            var c = $("#" + m);
            if (c.length < 1) {
                return false
            }
            var l = document.createEvent("CustomEvent");
            l.initCustomEvent(m, true, false, o);
            document.dispatchEvent(l);
            return true
        } catch (h) {}
        return false
    };
    this.DoCapture = function(e, f, d, c, h, g, b) {
        if (a.IsNeedCrx()) {
            return a.DoCaptureForChrome(e, f, d, parseInt(c), parseInt(h), parseInt(g), parseInt(b))
        }
        if (!a.pluginValid()) {
            return false
        }
        a.niuniuCapture().Capture(e, f, d, c, h, g, b);
        return true
    };
    this.InitNiuniuCapture = function() {
        if (!a.IsNeedCrx()) {
            a.LoadPlugin()
        } else {
            a.BindChromeCallback()
        }
    }
};