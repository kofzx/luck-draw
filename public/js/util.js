function urlArgs() {
    var args = {};
    var query = location.search.substring(1);
    var pairs = query.split("&");
    for (var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('=');
        if (pos == -1) continue;
        var name = pairs[i].substring(0, pos);
        var value = pairs[i].substring(pos + 1);
        value = decodeURIComponent(value);
        args[name] = value;
    }
    return args;
}
function formatTime(d) {
    var year = d.getFullYear(),
        month = formatNumber(d.getMonth() + 1),
        date = formatNumber(d.getDate()),
        hour = formatNumber(d.getHours()),
        minute = formatNumber(d.getMinutes()),
        second = formatNumber(d.getSeconds());
    return [year, month, date].join("-") + "T" + [hour, minute,second].join(":");
}
function formatNumber(n) {
    n = n / 10 >= 1 ? n : "0" + n;
    return n;
}
function Cookie() {}
Cookie.prototype.set = function (key, value) {
    var now = new Date();
    now.setTime(now.getTime() + 1000 * 60 * 30);    // 半小时过期
    document.cookie = key + "=" + value + "; expires=" + now.toUTCString();
};
Cookie.prototype.get = function (key) {
    var cookie = document.cookie.replace(/\s/g, ""),
        pairs = cookie.split(";");
    for (var i = 0, len = pairs.length; i < len; i++) {
        var pos = pairs[i].indexOf("=");
        if (pos == -1) continue;
        var name = pairs[i].substring(0, pos);
        var value = pairs[i].substring(pos + 1);
        value = decodeURIComponent(value);
        if (key === name) {
            return value;
        }
    }
    return false;
};