/**
 * Created by pitt on 18/7/28.
 */




apiready = function () {
    vCont = new Vue({
        el: '#app',
        data:{
            user: $api.getStorage('mine')?$api.getStorage('mine'):null,
            servers:$api.getStorage("url_now")?$api.getStorage("url_now"):null,
            version:null,
            size:0
        },
        mounted: function() {
            // this.getData();

        },
        methods: {
            getData:function(){
                var that = this;
                getMine(function (res) {
                    that.user=res
                });
                that.servers = $api.getStorage("url_now")?$api.getStorage("url_now"):null;
            }
        }
    });
    vCont.getData();
    xiala(function () {
        vCont.getData();
    });
    api.addEventListener({name:'setting'},function(){
        vCont.getData();
    });
    vCont.version=api.appVersion;
    fnGetCacheSize();
};


//字节数转换 /1 是避免js计算小数尾数含0
function sizes(s){
    if(s>(1024*1024)){
        return (s / (1024*1024)).toFixed(3)/1 + 'MB'
    }else if(s>1024){
        return (s / 1024).toFixed(3)/1 + 'KB'
    }else{
        return s + 'B'
    }
}

//获取缓存方法
function fnGetCacheSize() {
    api.getCacheSize(function (ret) {
        vCont.size = sizes(ret.size);
    });
}
//清除缓存方法
function clearCache() {
    api.showProgress({
        title: '清除缓存中...'
    });
    api.clearCache(function () {
        setTimeout(function () {
            api.hideProgress();
            fnGetCacheSize();
        }, 500)
    });
}