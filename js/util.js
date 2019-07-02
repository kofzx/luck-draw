function getQuerys() {
    var queryString = document.location.search.slice(1),
        paramsArray = queryString.split("&"),
        result = [];
    paramsArray.forEach(function (item) {
        var arr = item.split("="),
            key = arr[0],
            value = arr[1],
            obj = {};
        obj[key] = value;
        result.push(obj);
    });
    return result;
}
function _getQueryString(queryList) {
    var qString = '';
    for (var i = 0, len = queryList.length; i< len; i++) {
        var item = queryList[i];
        if (item.hasOwnProperty("q")) {
            qString = item.q;
            break;
        }
    }
    return qString;
}
function getQueryString() {
    return _getQueryString(getQuerys());
}
function formatTime(d) {
    var year = d.getFullYear(),
        month = formatNumber(d.getMonth() + 1),
        date = formatNumber(d.getDate()),
        hour = formatNumber(d.getHours()),
        minute = formatNumber(d.getMinutes());
    return [year, month, date].join("-") + "\0" + [hour, minute].join(":");
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
        arr = cookie.split(";");
    for (var i = 0, len = arr.length; i < len; i++) {
        var item = arr[i],
            _arr = item.split("="),
            _key = _arr[0],
            _value = _arr[1];
        if (key === _key) {
            return _value;
        }
    }
    return false;
};