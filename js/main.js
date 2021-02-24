import routing from "./routing.js";
import gethtml from "./ajax.js";
import dataControl from "./dataControl.js";

//최초접속 routing
routing.init();

/*라우팅*/
let routes = {
    '/main': { template: '' },
    '/hyoil': { template: '' },
    '/healo': { template: '' },
    '/contact': { template: '' }
};

//페이지 로드 후 hash로 이동하는 함수
function moveToHash() {
    let hash = window.location.hash.substr(1);;
    if (hash) {
        document.getElementById(hash).scrollIntoView({ behavior: "smooth" });
    }
}

window.onload = async function() {
    //라우팅 template 로드
    for (const key in routes) {
        // url에서 언어설정을 가져옴
        let language = getParameterByName('p').split('/')[1];

        // 템플릿 로드
        routes[key].template = await gethtml("/" + language + key + ".html");
    }

    /*Vue 관련 코드들*/
    // 본문 관련
    const Article = Vue.createApp({
        data() {
            return {
                currentRoute: "/" + getParameterByName('p').split('/')[2], // 예시 : /kr/hoyil 일 경우 hyoil 만 가져온다
            }
        },
        computed: {
            ArticleViewComponent() {
                return routes[this.currentRoute] || NotFoundComponent;
            }
        },
        render() {
            return Vue.h(this.ArticleViewComponent);
        }
    }).mount('#article');

    //사이드 메뉴 열고닫는 버튼
    const SideMenuBtn = Vue.createApp({
        data() {
            return {
                isActive: false //active 클래스 활성화 여부 
            }
        },
        methods: {
            clicked() {
                this.toggle();
                SideMenu.toggle();
            },
            toggle() {
                this.isActive = ~this.isActive;
            }
        }
    }).mount('#menuBtn');

    // 사이드메뉴
    let jsonData = await dataControl.getMenuJson();
    const SideMenu = Vue.createApp({
        data() {
            return {
                isActive: false, //active 클래스 활성화 여부
                menu: jsonData //언어설정
            }
        },
        methods: {
            toggle() {
                this.isActive = ~this.isActive;
            },
            changeLanguage(language) {
                console.log("language change detected");
                //url 변경
                routing.changeLanguage(language);
            }

        }
    }).mount('#sidemenu');

    // 로고
    const Logo = Vue.createApp({
        data() {
            return {
                logoLink: SideMenu.menu.logo.href //로고에 걸리는 링크 :: 언어에 따라 변경됨
            }
        }
    }).mount('#logo');

    //페이지 로드 후 hash로 이동
    moveToHash();
}

//쿼리스트링 파싱을 위한 함수
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}