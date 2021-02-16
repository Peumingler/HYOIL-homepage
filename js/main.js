import gethtml from '/js/ajax.js';

//쿼리스트링 파싱을 위한 함수
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

/*라우팅*/
let routes = {
    '/': { template: '' },
    '/hyoil': { template: '' },
    '/healo': { template: '' },
    '/aieps': { template: '' },
    '/klca': { template: '' },
    '/contact': { template: '' }
}

window.onload = async function() {
    for (const key in routes) {
        routes[key].template = await gethtml(key.slice(1));
    }
    //사이드 메뉴 버튼
    const SideMenuBtn = Vue.createApp({
        data() {
            return {
                isActive: false
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
}