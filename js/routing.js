export default {
    //사이트에 최초 접속시 URL 변경
    init() {
        // url에 언어에 대한 데이터가 없으면 리다이렉트
        if (getParameterByName('p') === "/" || getParameterByName('p') === "") {
            let userLanguage = navigator.language.slice(0, 2); //ko-KR -> ko
            history.replaceState({}, null, "./?p=/" + userLanguage + "/");
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