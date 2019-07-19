var input = new Array();
var judge = new Array();
var inputbox = [
    "passager-name1", "passager-name2", "passager-name3", "destination", "message"
];
var errmsg = [
    "errmsg_passenger1", "errmsg_passenger2", "errmsg_passenger3", "errmsg_destination", "errmsg_comment"
];
var checkdisplay = [
    "passager1", "passager2", "passager3", "destination","message"
]
var img = new Image();
img.src = "./static/pictures/4-1.png";
img.onload = function () {
    $(".containerr").css("display", "flex")
}
$(function () {

    //微信分享
    wxshare();

    $(".tip").attr("disabled", true);
    $(".arrow").attr("disabled", true);

    //活动时间检查
    var time = checkTime();
    if (time != 0) {
        $(".err-box").show();
        $(".err-text").html("活动时间<br>2019/5/28	到 2019/5/31");
        $("#update-ticket").attr("disabled", true);
    }
    $(".err-button").click(function () {
        $(".err-box").hide();
    })

    $("#add1").click(function () {
        if (block("passager2") == true) {
            $("#passager3").show();
            $("#add1").hide();
            $(".tip").hide();
            $(".arrow").hide();
        } else {
            $("#passager2").show();
        }
    })
    $("#reduce2").click(function () {
        $("#add1").show();
        $("#add2").show();
        $(".tip").show();
        $(".arrow").show();
        $("#passager2").hide();
        $("#passager-name2").val("");
    });
    $("#reduce3").click(function () {
        $("#passager3").hide();
        $("#passager-name3").val("");
        $("#add1").show();
        $("#add2").show();
        $(".tip").show();
        $(".arrow").show();
    })
    show(update, function (res) {
        var res1 = typechange(res);
        if (res1.errcode == 0) {
            $("#passager-name1").val(res1.passenger1);
            $("#passager-name2").val(res1.passenger2);
            $("#passager-name3").val(res1.passenger3);
            $("#destination").val(res1.destination);
            $("#message").val(res1.comment);
        } else {
            console.log("fails to get data.");
        }
    })
    $("#update-ticket").click(function () {
        //乘客信息填写
        for (var i = 0; i < 5; i++) {
            input[i] = getval(inputbox[i]);
            console.log("loop")
        }
        for (var i = 0; i < 5; i++) {
            judge[i] = checkinput(checkdisplay[i], inputbox[i], errmsg[i], input[i]);
            console.log(judge[i])
            console.log("loop again")
        }

        // judge[4] = message(inputbox[4], errmsg[4], input[4]);


        //向后台传数据
        if (judge[0] && judge[1] && judge[2] && judge[3] && judge[4]) {
            var data = {
                "passenger1": input[0],
                "passenger2": input[1],
                "passenger3": input[2],
                "destination": input[3],
                "comment": input[4],
            }
            ticketShow(modify, data, function (res) {
                if (!res.errcode) {
                    window.location.href = 'ticket.html';
                } else {
                    $('#errmsg_back').html(res.errmsg);
                }
            })
        }
    })

})