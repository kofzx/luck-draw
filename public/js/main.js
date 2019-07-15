var mainCardWrapper = document.querySelector(".main-card"),
    cardBags = document.querySelectorAll(".card-bag"),
    openButtons = document.querySelectorAll(".card-bag__button"),
    cardImagePath = './images/card.png',
    tips = '',
    maxCardsLen = 4,
    i,
    len,
    curOpenButtonIndex = 0,
    randResult = [],
    cookie = new Cookie();
var args = urlArgs(),
    _q = args.q || '',
    q = JSON.parse(_q),
    cardBagList = q.cardBagList,
    randList = q.randList;
// 渲染卡包数量
function renderBag() {
    for (i = 0, len = cardBags.length; i < len; i++) {
        var item = cardBags[i],
            span = item.querySelector("span"),
            openButton = item.querySelector(".card-bag__button");
        span.innerText = cardBagList[i].nums;
        openButton.setAttribute('data-nums', cardBagList[i].nums);
        openButton.setAttribute('data-cards', cardBagList[i].cards);
    }
}
// 更新提示
function updateTips(newTips) {
    tips = newTips || '请开始你的翻牌';
    var tipsDom = document.querySelector(".tips");
    tipsDom.innerText = tips;
}
function resetTips() {
    updateTips('请开始你的翻牌');
}
// 为开启按钮绑定点击事件
function bindOpenButtonEvent() {
    for (i = 0, len = openButtons.length; i < len; i++) {
        (function(i){
            openButtons[i].addEventListener('click', function (e) {
                var nums = this.getAttribute('data-nums'),
                    cards = this.getAttribute('data-cards'),
                    index = this.getAttribute('data-index'),
                    emptyHtmlString = "<div class=\"main-card__empty\">暂无卡牌~</div>",
                    htmlString = "";
                resetTips();
                if (hasFlip()) {
                    if (parseInt(index) !== parseInt(curOpenButtonIndex)) {
                        updateTips('请翻完当前所有牌');
                    }
                    curOpenButtonIndex = index;
                    return;
                }
                if (parseInt(nums) > 0) {
                    for (i = 0; i < cards; i++) {
                        var randBonus = randList[Math.floor(Math.random() * maxCardsLen)];
                        htmlString += "<div class=\"main-card__item\" data-type=\"card\">\n" +
                            "\t\t\t\t<div class=\"front\">\n" +
                            "\t\t\t\t\t<img class=\"card-bg\" src=\"" + cardImagePath + "\" alt=\"\">\n" +
                            "\t\t\t\t</div>\n" +
                            "\t\t\t\t<div class=\"end\">\n" +
                            "\t\t\t\t\t<p>" + randBonus + "</p>\n" +
                            "\t\t\t\t</div>\n" +
                            "\t\t\t</div>";
                    }
                    for (i = 0; i < maxCardsLen - cards; i++) {
                        htmlString += "<div class=\"main-card__item--empty\"></div>";
                    }
                } else {
                    htmlString = emptyHtmlString;
                }
                mainCardWrapper.innerHTML = htmlString;
            });
        })(i);
    }
}
// 判断当前组是否有已翻得卡牌
function hasFlip() {
    var cardItems = mainCardWrapper.querySelectorAll(".main-card__item.main-card__item--flip");
    return cardItems.length > 0;
}
// 绑定卡牌事件
function bindCardEvent() {
    mainCardWrapper.addEventListener('click', function (e) {
        resetTips();
       var thisClick = e.target;
       // 点击了卡牌
       if (thisClick.getAttribute('data-type') === 'card') {
           thisClick.setAttribute('class', 'main-card__item main-card__item--flip');
           pushFlipText(thisClick);
           if (checkCardFlipAll()) {
                setTimeout(function () {
                    updateCardBagList();
                    if (checkBagAll()) {
                        cookie.set('randResult', JSON.stringify(randResult));
                        updateTips('翻牌结束，去看看记录吧~');
                    }
                    mainCardWrapper.innerHTML = "<div class=\"main-card__success\">翻牌完成~</div>";
                },1000);
           }
       }
    });
}
function pushFlipText(clickDom) {
    var clickChild = clickDom.querySelector(".end p"),
        clickText = clickChild.innerText;
    if (clickChild.getAttribute('class') !== 'selected') {
        var obj = {},
            now = formatTime(new Date());
        obj.bonus = clickText;
        obj.time = now;
        randResult.push(obj);
    }
    clickChild.setAttribute('class', 'selected');
}
// 检测一组卡牌是否全翻
function  checkCardFlipAll() {
    var cardItems = mainCardWrapper.querySelectorAll(".main-card__item");
    return [].every.call(cardItems,function (value) {
        return value.getAttribute('class') === 'main-card__item main-card__item--flip';
    });
}
// 检测卡包是否全翻完
function checkBagAll() {
    return cardBagList.every(function (value) {
        return value.nums === 0;
    });
}
// 更新卡包数量
function updateCardBagList() {
    var cardItems = mainCardWrapper.querySelectorAll(".main-card__item"),
        len = cardItems.length;
    switch (len) {
        case 1:
            cardBagList[0].nums -= 1;
            break;
        case 2:
            cardBagList[1].nums -= 1;
            break;
        case 3:
            cardBagList[2].nums -= 1;
            break;
        case 4:
            cardBagList[3].nums -= 1;
            break;    
    }
    renderBag();
}
function triggerFirstOpenButton() {
    openButtons[0].click();
}
function onRecord() {
    if (cookie.get('randResult')) {
        location = "list.html";
    } else {
        updateTips('翻完所有牌才能查看记录哦~');
    }
}
window.onload = function () {
    updateTips();
    if (!cookie.get('randResult')) {
        renderBag();
    }
    bindOpenButtonEvent();
    bindCardEvent();
    triggerFirstOpenButton();
};
