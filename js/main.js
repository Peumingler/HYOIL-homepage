import gethtml from "./ajax.js";

window.onload = async function() {
    //라우팅 template 로드
    for (const key in routes) {
        if (key === '/') { continue; } //root일 경우 패스
        routes[key].template = await gethtml(key.slice(1) + ".html");
    }


    /*Vue 관련 코드들*/
    //사이드 메뉴 버튼
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
    const SideMenu = Vue.createApp({
        data() {
            return {
                isActive: false, //active 클래스 활성화 여부
            }
        },
        methods: {
            toggle() {
                this.isActive = ~this.isActive;
            }
        }
    }).mount('#sidemenu');

    // 본문 관련
    const Article = Vue.createApp({
        data() {
            return {
                currentRoute: getParameterByName('p'),
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

    moveToHash();
}

/*라우팅*/
let routes = {
    '/': { template: `<div style="z-index: -1;">
    <video src="./static/videos/hyoil_intro_cn.mp4" type="video/ogg" poster="./static/images/image_bg.png" loop controls autoplay muted>브라우저가 지원하지 않는 기능입니다.</video>
</div>` },
    '/hyoil': { template: '' },
    '/healo': { template: '' },
    '/aieps': { template: '' },
    '/klca': { template: '' },
    '/contact': { template: '' }
}

//쿼리스트링 파싱을 위한 함수
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function moveToHash() {
    let hash = window.location.hash.substr(1);;
    if (hash) {
        document.getElementById(hash).scrollIntoView({ behavior: "smooth" });
    }
}