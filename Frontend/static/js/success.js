// var vconsole = new VConsole();

var pic1 = [
    "./static/pictures/3-2.png",
    "./static/pictures/3-3.png",
    "./static/pictures/3-4.png",
    "./static/pictures/3-5.png",
    "./static/pictures/3-6.png",
    "./static/pictures/3-7.png",
    "./static/pictures/3-8.png"
];
var pic2 = [
    "./static/pictures/3-9.png",
    "./static/pictures/3-10.png",
    "./static/pictures/3-11.png",
    "./static/pictures/3-12.png",
    "./static/pictures/3-13.png",
    "./static/pictures/3-14.png",
    "./static/pictures/3-15.png"
]
var text = [
    "岁月如水，祝你此刻和未来一直拥有乌黑亮丽的秀发，赶快登上列车，去往不秃的远方吧。",
    "满绩号的列车即将启动，赶快带上你满满的活力，和小伙伴们冲击满绩叭！！",
    "暴富号来啦！！妈妈再也不用担心我月底没钱了，登上暴富号，未来天天暴富！！！",
    "还在苦难霉运？速速登上超越号，获得幸运女神的眷顾，前往超越次元的幸运之地叭！",
    "红彤彤的箭矢已拉开弓弦！脱单号即将出发，前往爱情海的彼岸。请无论单身与否，带上你的伴侣or一颗真心登上列车收获幸福。",
    "炎炎夏日不敢穿性感火辣的衣服！赶紧登上暴瘦号！！一起燃烧卡路里，最后对镜子前的自己说一句，怪美的！？",
    "吃鸡号的汽笛已经响起！带上你的朋友伙伴，开黑五连坐，未来天天吃鸡，大吉大利！"
]

var style = [
    "hair", "mark", "rich", "pass", "love", "thin", "chicken"
]

//随机生成0-6的数字（用于随机生成图片）
function randomNumber(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
var randomNum = randomNumber(7);
var data = {
    "code": randomNum
}
var img = new Image();
img.src = "./static/pictures/3-1.png";
img.onload = function () {
    $(".success-pic").css("background-image", "url(" + pic1[randomNum] + ")")
    $(".success-text").css("background-image", "url(" + pic2[randomNum] + ")")
    $(".introduction").text(text[randomNum]);
    $(".buttons").css("display", "flex")
}
$(function () {

    //微信分享
    wxshare();

    //活动时间检查
    var time = checkTime();
    if (time != 0) {
        $(".err-box").show();
        $(".err-text").html("活动时间<br>2019/5/28	到 2019/5/31");
        $("#write-information").attr("disabled", true);
        $("#reselect").attr("disabled", true);
    }
    $(".err-button").click(function () {
        $(".err-box").hide();
    })

    $("#write-information").click(function () {
        return false;
    })

    //更改div样式
    $(".success-pic").addClass(style[randomNum]);

    //传列车号
    //要改的函数 2
    ticketShow(savename, data, function (res) {
        console.log(res);
        if (res.errcode == 0) {
            $("#write-information").click(function () {
                return true;
            })
        } else {
            //改成提示框
            $(".err-box").show();
            $(".err-text").html("");
            $(".err-text").html("服务器繁忙~请重试噢~");
        }
    })

    $("#write-information").click(function () {
        window.location.href = "./passenger.html";
    })
    $("#reselect").click(function (e) {
        e.preventDefault();
        history.back(-1);
        $(".svg").remove()
        ctx.clearRect(0, 0, width * 2, height * 2);
    })
})