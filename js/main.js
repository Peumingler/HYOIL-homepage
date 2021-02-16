import gethtml from '/js/ajax.js';

//쿼리스트링 파싱을 위한 함수
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

gethtml('hyoil.html').then(e => console.log());

/*라우팅*/
const HOME = { template: `<div style="z-index: -1;">
<video src="./static/videos/hyoil_intro_cn.mp4" type="video/ogg" poster="./static/images/image_bg.png" loop controls autoplay muted>브라우저가 지원하지 않는 기능입니다.</video>
</div>` };
const HYOIL = { template: '<p>HYOIL</p>' };
const HEALO = { template: '<p>HEALO</p>' };
const AIEPS = { template: '<p>AIEPS</p>' };
const KLCA = { template: '<p>KLCA</p>' };
const CONTACT = { template: '<p>CONTACT</p>' };

const routes = {
    '/': HOME,
    '/hyoil': HYOIL,
    '/healo': HEALO,
    '/aieps': AIEPS,
    '/klca': KLCA,
    '/contact': CONTACT
}

window.onload = function() {
    //사이드 메뉴 버튼
    var navbarBtn = new Vue({
        el: '#menuBtn',
        data: {
            isActive: false,
        },
        methods: {
            clicked: function() {
                this.toggle();
                sideMenu.toggle(); //사이드 메뉴 토글
            },
            toggle: function() {
                this.isActive = ~this.isActive;
            }
        }
    });

    //사이드 메뉴 관련
    var sideMenu = new Vue({
        el: '#sidemenu',
        data: {
            isActive: false, //active 클래스 활성화 여부
        },
        methods: {
            toggle: function() {
                this.isActive = ~this.isActive;
            }
        }
    });


    //본문 관련
    var article = new Vue({
        el: '#article',
        data: {
            currentRoute: getParameterByName('p')
        },
        computed: {
            ArticleViewComponent() {
                return routes[this.currentRoute];
            }
        },
        render(h) {
            return h(this.ArticleViewComponent);
        }
    });
}