window.onload = function () {
    var navbarMenu = new Vue({
        el: '#navbarMenu',
        methods: {
            change: function(content, subContent) { article.change(content, subContent) }
        }
    });

    var article = new Vue({
        el: '#article',
        data: {
            currentContent: "start", //될수 있는 경우 - start, hyoil, healo, aieps, klca
            currentSubContent: "1",
            contentList: {
                start: true,
                hyoil: false,
                healo: false,
                aieps: false,
                klca: false
            }
        },
        methods: {
            //article의 컨텐츠를 변경
            change: function (content, subContent) {
                //현재 컨텐츠와 같지 않을 경우 컨텐츠 변경
                if (this.currentContent !== content) {
                    switch (content) {
                        case "hyoil":
                            this.contentList.start = false;
                            this.contentList.hyoil = true;
                            this.contentList.healo = false;
                            this.contentList.aieps = false;
                            this.contentList.klca = false;
                            break;
                        case "healo":
                            this.contentList.start = false;
                            this.contentList.hyoil = false;
                            this.contentList.healo = true;
                            this.contentList.aieps = false;
                            this.contentList.klca = false;
                            break;
                        case "aieps":
                            this.contentList.start = false;
                            this.contentList.hyoil = false;
                            this.contentList.healo = false;
                            this.contentList.aieps = true;
                            this.contentList.klca = false;
                            break;
                        case "klca":
                            this.contentList.start = false;
                            this.contentList.hyoil = false;
                            this.contentList.healo = false;
                            this.contentList.aieps = false;
                            this.contentList.klca = true;
                            break;
                        default:
                            this.contentList.start = true;
                            this.contentList.hyoil = false;
                            this.contentList.healo = false;
                            this.contentList.aieps = false;
                            this.contentList.klca = false;
                            break;
                    }
                    this.currentContent = content;
                }

                //컨텐츠 내부에서 이동

                this.subContent = subContent;

            }
        }
    });
}