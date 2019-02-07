
vCont = new Vue({
    el: '#app',
    data:{
        setTab2:0,
        menu:[
            '真人娱乐',
            '棋牌游戏',
            '彩票游戏',
            '电子游戏',
            '体育专区',
            '捕鱼游戏',
            '优惠活动',
            '澳门金沙酒店',
            '帮助中心',
            '在线客服',
            '个人中心'
        ],
    },
    computed:{

    },
    components:{
    },
    methods: {
        togNav:function (i) {
            api.sendEvent({name:'home_menu',extra:i});
            api.closeFrame();
        }
    }
});


apiready = function () {
    vCont.setTab2 = api.pageParam.id?api.pageParam.id:vCont.setTab2;
    setTimeout(function () {
        $('#pop_menu').addClass('open');
    },20)
};

// apiready();
