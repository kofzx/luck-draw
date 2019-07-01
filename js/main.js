var mainCardWrapper = document.querySelector(".main-card"),
    cardBags = document.querySelectorAll(".card-bag"),
    openButtons = document.querySelectorAll(".card-bag__button"),
    cardImagePath = './images/card.png',
    maxCardsLen = 4,
    i,
    len;
// var qString = JSON.parse(decodeURIComponent(getQueryString())),
//     cardBagList = qString.cardBagList;
// console.log(qString);
// 初始卡包数量
function initBag() {
    for (i = 0, len = cardBags.length; i < len; i++) {
        var item = cardBags[i],
            span = item.querySelector("span"),
            openButton = item.querySelector(".card-bag__button");
        span.innerText = cardBagList[i].nums;
        openButton.setAttribute('data-nums', cardBagList[i].nums);
        openButton.setAttribute('data-cards', cardBagList[i].cards);
    }
}
// 为开启按钮绑定点击事件
function bindOpenButtonEvent() {
    for (i = 0, len = openButtons.length; i < len; i++) {
        openButtons[i].addEventListener('click', function (e) {
            var nums = this.getAttribute('data-nums'),
                cards = this.getAttribute('data-cards'),
                emptyHtmlString = "<div class=\"main-card__empty\">暂无卡牌~</div>",
                htmlString = "";
            if (parseInt(nums) > 0) {
                for (i = 0; i < cards; i++) {
                    htmlString += "<div class=\"main-card__item\" data-type=\"card\"><img class=\"card-bg\" src=\"" + cardImagePath + "\" alt=\"\"></div>";
                }
                for (i = 0; i < maxCardsLen - cards; i++) {
                    htmlString += "<div class=\"main-card__item--empty\"><img class=\"card-bg\" src=\"" + cardImagePath + "\" alt=\"\"></div>";
                }
            } else {
                htmlString = emptyHtmlString;
            }
            mainCardWrapper.innerHTML = htmlString;
        });
    }
}
// 绑定卡牌事件
function bindCardEvent() {
    mainCardWrapper.addEventListener('click', function (e) {
       var thisClick = e.target;
       // 点击了卡牌
       if (thisClick.getAttribute('data-type') === 'card') {
            console.log(thisClick);
           thisClick.setAttribute('class', 'main-card__item main-card__item--flip');
       }
    });
}
function triggerFirstOpenButton() {
    openButtons[0].click();
}
window.onload = function () {
    // initBag();
    // bindOpenButtonEvent();
    bindCardEvent();
    // triggerFirstOpenButton();
};
