



apiready = function () {
    vCont = new Vue({
        el: '#app',
        data:{
            titSet:1,
            title:['系统公告','站内消息','我的留言'],
            num:[null,null,null],
        },
        methods: {
            getData:function(){
                var that = this;
                ys.ajax('api/my/countNoReadMessage','get',{},function (data) {
                    if(data.resCode==1){
                        that.num[1]=data.resObj.messageCount;
                        that.num[2]=data.resObj.problemCount;
                    }
                })
            },
            togNav:function (i) {
                this.titSet=i;
                api.setFrameGroupIndex({
                    name: 'msgGroup',
                    index: i
                });
            },
        },
        mounted: function() {
        }
    });

    vCont.getData();
    api.openFrameGroup({
        name: 'msgGroup',
        scrollEnabled: true,
        rect: {
            x: 0,
            y: headerH*1.8
        },
        preload: 3,
        index: 1,
        frames: [{
            "name": "news",
            "url": "news.html",
            "bounces": true
        },{
            "name": "m_site",
            "url": "m_site.html",
            "bounces": true
        },{
            "name": "m_me",
            "url": "m_me.html",
            "bounces": true
        }]
    }, function (ret, err) {
        vCont.titSet = ret.index;
    });

    api.addEventListener({name:'msg_num'},function (ret) {
        vCont.getData()
    });

};
