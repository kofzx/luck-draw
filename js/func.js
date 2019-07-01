function createCardBag(options) {
    var nums = options.nums || 0,
        cards = options.cards || 0,
        iconFontClass = options.iconFontClass || '',
        descText = options.descText || '',
        buttonText = options.buttonText || '开启',
        dom = document.createElement('div'),
        htmlString = "<p><i class=\"iconfont {iconFontClass}\"></i></p>\n" +
            "\t\t\t\t<p class=\"card-bag__desc\">{descText} <span>{nums}</span></p>\n" +
            "\t\t\t\t<div data-nums=\"{nums}\" data-cards=\"{cards}\" class=\"card-bag__button\">{buttonText}</div>";

        htmlString = htmlString.replace(/{nums}/g, nums);
        htmlString = htmlString.replace(/{cards}/g, cards);
        htmlString = htmlString.replace(/{iconFontClass}/g, iconFontClass);
        htmlString = htmlString.replace(/{descText}/g, descText);
        htmlString = htmlString.replace(/{buttonText}/g, buttonText);
    dom.setAttribute('class', 'card-bag');
    dom.innerHTML = htmlString;
    return dom;
}