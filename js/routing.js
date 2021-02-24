export default {
    //사이트에 최초 접속시 URL 관리
    init() {
        // 인터넷 익스플로어 감지해서 강제로 MS Edge로 열기
        if (window.navigator.userAgent.match(/MSIE|Internet Explorer|Trident/i)) {
            window.location = "microsoft-edge:" + window.location.href;
        }

        let path = getParameterByName('p');
        // path에 잘못된 값이 들어가는 경우
        if (path === "/" || path === "" || path.split('/')[2] === "" || path.split('/')[2] === undefined) {
            let userLanguage = navigator.language.slice(0, 2); //ko-KR -> ko
            history.replaceState({}, null, "./?p=/" + userLanguage + "/main/");
        }

    },
    // URL을 해당 언어로 변경한다
    changeLanguage(language) {
        // history.pushState({}, null, "./?p=/" + language + "/");
        window.location.href = "./?p=/" + language + "/" + getParameterByName('p').split('/')[2] + window.location.hash;
    },

}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}