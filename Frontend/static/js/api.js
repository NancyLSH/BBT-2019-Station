const host = "https://hemc.100steps.net/2019/fleeting-station-test/api/station";
const save = "/save/";
const modify = "/modify/";
const canvas_ = "/draw/";
const ticket = "/ticket/";
const update = "/update/";
const checktime = "/checkTime/";
const checkid = "/checkOpenid/";
const savename = "/getStationName/";
const returnName = "/returnStationName/";
const state = "bug867675fyvgyv";
const redirect = host + checkid;
//wx.config传的url
const index = "https://hemc.100steps.net/2019/fleeting-station-test/index.html";
//配图
const pictureurl = "https://hemc.100steps.net/2019/fleeting-station-test/static/pictures/ticket.jpg";
//分享链接（暂时指向总宣）
const link = "https://hemc.100steps.net/2019/fleeting-station/index.html";

//post 带参数请求
function ticketShow(method, data, fn) {
    $.ajax({
        type: "POST",
        url: host + method,
        data: data,
        dataType: 'JSON',
        // xhrFields: {
        withCredentials: true,
        // },
        crossDomain: true,
        // withCredentials: true,
        contentType: "application/x-www-form-urlencoded",
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        statusCode: {
            401: function () {
                window.location.href = "https://hemc.100steps.net/2018/fireman/auth.php?redirect=" + redirect + "&state=" + state
            }
        },
        success: fn,
    })
}

//post 不带参数请求
function show(method, fn) {
    $.ajax({
        type: "POST",
        url: host + method,
        // xhrFields: {
        withCredentials: true,
        // },
        crossDomain: true,
        contentType: "application/x-www-form-urlencoded",
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        statusCode: {
            401: function () {
                window.location.href = "https://hemc.100steps.net/2018/fireman/auth.php?redirect=" + redirect + "&state=" + state
            }
        },
        success: fn,
    })
}

window.onload = function(){
  $.ajax({
	type: "GET",
	url: host + "/login",
	contentType: "application/x-www-form-urlencoded",
	statusCode: {
	    401: function () {
	       window.location.href = "https://hemc.100steps.net/2018/fireman/auth.php?redirect=" + redirect + "&state=" + state             }
	}
  })	
}

 //微信授权接口跳转（redirect由后端提供）
// function weixin(redirect, state) {
//     $.ajax({
//         type: "GET",
//         url: "https://hemc.100steps.net/2018/fireman/auth.php?redirect=" + redirect + "&state=" + state,
//     })
// }

//检查是否在活动时间
function checkTime() {
    show(checktime, function (res) {
        var res1;
        if ((typeof res == 'object') && res.constructor == Object) {
            res1 = res;
        } else {
            res1 = eval("(" + res + ")");
        }
        return res1.errcode;
    })
}

// //检查是否有openid
// function checkId() {
//     show(checkid, function (res) {
//         var res1;
//         if ((typeof res == 'object') && res.constructor == Object) {
//             res1 = res;
//         } else {
//             res1 = eval("(" + res + ")");
//         }
//         if (res1.errcode == 540) {
//             // 未授权 引导用户到认证页面
//             weixin(host + checkid, state)
//           //  alert("未授权");
 //        }
 //        if (res1.errcode == 0) {
 //            return true;
 //        }
 //    })
 //}

function wxshare() {
    $.ajax({
        type: "POST",
        url: "https://hemc.100steps.net/2017/wechat/Home/Public/getJsApi",
        data: {
            url: index,
        },
        dataType: 'JSON',
        withCredentials: true,
        crossDomain: true,
        contentType: "application/x-www-form-urlencoded",
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function (res) {
            wx.config({
                debug: false,
                appId: res.appId,
                timestamp: res.timestamp,
                nonceStr: res.nonceStr,
                signature: res.signature,
                jsApiList: [
                    "updateTimelineShareData",
                    "updateAppMessageShareData"
                ]
            })
            wx.ready(function(){
                wx.updateTimelineShareData({ 
                    title: '叮—你有一张专属车票待领取！', 
                    link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: pictureurl, 
                    success: function () {
                        console.log("success")
                      // 设置成功
                    }
                })
                wx.updateAppMessageShareData({ 
                    title: '叮—你有一张专属车票待领取！', // 分享标题
                    desc: '', // 分享描述
                    link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: pictureurl, // 分享图标
                    success: function () {
                        console.log("success")
                      // 设置成功
                    }
                })
            })
        }
    })
}
