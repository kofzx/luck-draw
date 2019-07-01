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