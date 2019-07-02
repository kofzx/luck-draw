var mainCardWrapper = document.querySelector(".main-card"),
    cardBags = document.querySelectorAll(".card-bag"),
    openButtons = document.querySelectorAll(".card-bag__button"),
    cardImagePath = './images/card.png',
    tips = '',
    maxCardsLen = 4,
    i,
    len,
    randResult = [],
    cookie = new Cookie();
var qString = JSON.parse(decodeURIComponent(getQueryString())),
    cardBagList = qString.cardBagList,
    randList = qString.randList;
console.log(qString);
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
// 为开启按钮绑定点击事件
function bindOpenButtonEvent() {
    var clickSameCount = 0;
    for (i = 0, len = openButtons.length; i < len; i++) {
        (function(i){
            openButtons[i].addEventListener('click', function (e) {
                var nums = this.getAttribute('data-nums'),
                    cards = this.getAttribute('data-cards'),
                    index = this.getAttribute('data-index'),
                    emptyHtmlString = "<div class=\"main-card__empty\">暂无卡牌~</div>",
                    htmlString = "";
                if (hasFlip()) {
                    return;
                }
                if (parseInt(index) === i) {
                    console.log(clickSameCount);
                    if (clickSameCount > 0) {
                        return;
                    }
                    clickSameCount++;
                } else {
                    clickSameCount = 0;
                }
                if (parseInt(nums) > 0) {
                    var randGroup = [];
                    for (i = 0; i < cards; i++) {
                        var randBonus = randList[Math.floor(Math.random() * maxCardsLen)];
                        randGroup.push(randBonus);
                        htmlString += "<div class=\"main-card__item\" data-type=\"card\">\n" +
                            "\t\t\t\t<div class=\"front\">\n" +
                            "\t\t\t\t\t<img class=\"card-bg\" src=\"" + cardImagePath + "\" alt=\"\">\n" +
                            "\t\t\t\t</div>\n" +
                            "\t\t\t\t<div class=\"end\">\n" +
                            "\t\t\t\t\t<p>" + randBonus + "</p>\n" +
                            "\t\t\t\t</div>\n" +
                            "\t\t\t</div>";
                    }
                    randResult = randResult.concat(randGroup);
                    console.log(randResult);
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
       var thisClick = e.target;
       // 点击了卡牌
       if (thisClick.getAttribute('data-type') === 'card') {
           thisClick.setAttribute('class', 'main-card__item main-card__item--flip');
           if (checkCardFlipAll()) {
                setTimeout(function () {
                    updateCardBagList();
                    if (checkBagAll()) {
                        updateTips('翻牌结束，去看看记录吧~');
                    }
                    mainCardWrapper.innerHTML = "<div class=\"main-card__success\">翻牌完成~</div>";
                },1000);
           }
       }
    });
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
window.onload = function () {
    updateTips();
    renderBag();
    bindOpenButtonEvent();
    bindCardEvent();
    triggerFirstOpenButton();
};
