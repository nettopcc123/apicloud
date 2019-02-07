/**
 * Created by pitt on 18/7/28.
 */

function urlCallback(k) {
    // console.log(k);
    vCont.items=k;
    $api.setStorage("url_all",k);
    $('.butterbar').removeClass('active');
}



apiready = function () {
    vCont = new Vue({
        el: '#app',
        data:{
            setTab: $api.getStorage("url_now")?$api.getStorage("url_now").id:1,
            newUrl: null,
            items: $api.getStorage("url_all")?$api.getStorage("url_all"):null,
            testNum:0,
            isTest: false
        },
        computed:{

        },
        components:{

        },
        mounted: function() {
            // this.getData();

            this.isTestUser()
        },
        destroyed :function(){

        },
        methods: {
            getData:function(t){
                $('.butterbar').addClass('active');

                var usr = t?ys.xurl+'app/api/js_online_test.js':ys.xurl+'app/api/js_online.js';

                $.ajax(usr,{
                    type:  'get',
                    cache:  false,
                    crossDomain:true,
                    dataType: 'jsonp',
                    contentType: "application/x-www-form-urlencoded"
                })

            },

            setUrl:function (it) {
                this.setTab = it.id;
                $api.setStorage("url_now",it);
                api.sendEvent({name:'setting'});
                ys.toast('已切换到'+it.name);
            },
            openTest:function () {
                this.testNum +=1;
                // ys.toast(this.testNum);
                if(this.testNum==20){
                    this.getData(1);
                }
                // console.log(this.testNum)
            },
            isTestUser:function () {
                var user = $api.getStorage('mine')?$api.getStorage('mine'):null;
                this.isTest =  user && user.userName.indexOf('test')>-1 || user && user.userName.indexOf('leron')>-1
            }
        }
    });
    vCont.getData();
    xiala(function () {
        vCont.getData();
    });
};

function compileStr(code){
    var c=String.fromCharCode(code.charCodeAt(0)+code.length);
    for(var i=1;i<code.length;i++){
        c+=String.fromCharCode(code.charCodeAt(i)+code.charCodeAt(i-1));
    }
    return escape(c);
}

//字符串进行解密
function uncompileStr(code){
    code=unescape(code);
    var c=String.fromCharCode(code.charCodeAt(0)-code.length);
    for(var i=1;i<code.length;i++){
        c+=String.fromCharCode(code.charCodeAt(i)-c.charCodeAt(i-1));
    }
    return c;
}
// apiready();