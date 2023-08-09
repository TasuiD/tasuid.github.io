// 得到0~(size-1)的随机整数
function getRadomNumber(size) {
    return Math.floor(Math.random() * size);
}

/* add click event */
function bindEventWithSafty(e, obj, func) {
    if (obj.addEventListener) {
        obj.addEventListener(e, func, false);
    } else if (obj.attachEvent) {
        obj.attachEvent("on" + e, func);
    }
}

/* 得到产生随机文本的重要参数 */
function getRadomTextParameters() {
    var textTypeOpts = document.querySelectorAll(".radom-text-type:checked");
    var textType = textTypeOpts[0]?.value || "";

    var textStyleOpts = document.querySelectorAll(".radom-text-style:checked");
    var textStyle = textStyleOpts[0]?.value || "";

    var textSize = document.querySelector(".customerized-text-size-input-box").value;
    var customCharacterDB = document.getElementById("customCharacterDB").value;

    // 检查characterDB的长度是否小于textSize
    var textLength = customCharacterDB.length;
    if (textLength < textSize) {
        // 将characterDB的内容复制扩充直到长度大于textSize
        while (textLength < textSize) {
            customCharacterDB += customCharacterDB;
            textLength = customCharacterDB.length;
        }
    }

    showCharacters(textType, textStyle, textSize, customCharacterDB);
}

function showCharacters(textType, textStyle, textSize, characterDB) {
    var punctuationDB = "，，，，，，、、；。。。。！！……？？**%@";

    var characters = textStyle === "plain-radom-text"
        ? getPlainCharacters(textSize, characterDB)
        : getCharatersWithPuntuation(textSize, characterDB, punctuationDB);

    var generatedRadomText = document.querySelector(".generated-radom-text");
    generatedRadomText.innerHTML = "<p>" + characters + "</p>";
}

function getRandomCharacter(characterDB) {
    return characterDB[getRadomNumber(characterDB.length)];
}

function getPlainCharacters(textSize, characterDB) {
    var plainCharacters = "";
    for (let i = 0; i < textSize; i++) {
        plainCharacters += getRandomCharacter(characterDB);
    }
    console.log(plainCharacters);
    return plainCharacters;
}

function getCharatersWithPuntuation(textSize, characterDB, punctuationDB) {
    var characters = getRandomCharacter(characterDB);
    var punctuationProbability = 0.08; // 调整此值来改变标点符号比重
    var endPunctuationProbability = 0.2; // 调整此值来改变结束标点符号比重

    for (let i = 1; i < textSize; i++) {
        if (Math.random() < punctuationProbability && punctuationDB.indexOf(characters[i - 1]) === -1) {
            characters += getRandomCharacter(punctuationDB);
        }
        characters += getRandomCharacter(characterDB);
    }

    if (Math.random() < endPunctuationProbability) {
        var endPunctuations = ["。", "！", "？"];
        characters += endPunctuations[getRadomNumber(endPunctuations.length)];
    }
    // 当文本最后一个字符非标点符号时为其添加末尾标点
    if (punctuationDB.indexOf(characters[characters.length - 1]) === -1) {
        //console.log(characters[characters.length-1]);
        var endPunctuatoins = ["。", "！", "？"];
        characters += endPunctuatoins[getRadomNumber(endPunctuatoins.length)];

    }

    return characters;
}

window.onload = function () {
    var generateBtn = document.querySelector(".generate-btn");
    bindEventWithSafty("click", generateBtn, getRadomTextParameters);
    isCustomerizedTextSize();
};
