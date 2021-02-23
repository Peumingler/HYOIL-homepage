import KrJson from "../template/ko/language_ko.js";
import EnJson from "../template/en/language_en.js";
import ZhJson from "../template/zh/language_zh.js"; //중국어

export default {
    // URL상의 언어에 따라 메뉴 데이터를 가져온다.
    getMenuJson() {
        return new Promise((resolve, reject) => {
            let currentLanguage = getParameterByName('p').split('/')[1];
            switch (currentLanguage) {
                case KrJson.languageName:
                    resolve(KrJson);
                    break;
                case EnJson.languageName:
                    resolve(EnJson);
                    break;
                case ZhJson.languageName:
                    resolve(ZhJson);
                    break;
                default:
                    resolve(KrJson);
            }
        });
    },
}

//쿼리스트링 파싱을 위한 함수
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}