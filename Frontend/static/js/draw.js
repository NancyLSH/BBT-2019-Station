//禁用微信橡皮筋功能
document.body.addEventListener('touchmove', function (e) {
    e.preventDefault();
}, {
    passive: false
});

const height = document.documentElement.clientHeight;
const width = document.documentElement.clientWidth;
$("#canvas").css("position", "absolute");
$("#canvas").css("top", 0.28 * height);
$("#canvas").css("left", 0.066 * width);
var color = "#F7A44F";
var img = new Image();
var draw = false;
img.src = "./static/pictures/2-1.png";
img.onload = function () {
    $(".svg").css("display", "block");
    setTimeout(function () {
        $(".svg").css("display", "none");
    }, 6000)
    listenToUser(canvas);
}
var colors = [
    "orange", "yellow", "green", "blue1", "blue2"
];

$(function () {

    //微信分享
    wxshare();

    //活动时间检查
    var time = checkTime();
    if (time != 0) {
        $(".err-box").show();
        $(".err-text").html("活动时间<br>2019/5/28	到 2019/5/31");
        $("#finish").attr("disabled", true);
    }
    $(".err-button").click(function () {
        $(".err-box").hide();
    })

    $(".svg").on("touchstart", function () {
        $(".svg").css("display", "none");
        // listenToUser(canvas);
    })
    $("#canvas").on("touchstart", function () {
        $(".svg").css("display", "none");
    })
    $("#finish").click(function () {
        // var canvas = document.getElementById("canvas");
        var dataurl = canvas.toDataURL();
        var data = {
            "dataurl": dataurl
        }
        if (draw == false) {
            $(".err-box").show();
            $(".err-text").html("");
            $(".err-text").html("你还没有画画噢");
        } else {
            //函数要改 1
            ticketShow(canvas_, data, function (res) {
                if (res.errcode == 0) {
                    window.location.href = "./success.html";
                }else{
                    window.location.href = "./success.html";
                }
            })
        }
    })
    $("#repaint").click(function (e) {
        e.preventDefault();
        ctx.clearRect(0, 0, width * 2, height * 2);
        draw = false;
        listenToUser(canvas)
    })

    $("#orange").addClass("select");
    $("#orange").click(function () {
        color = "#F7A44F";
        clear();
        $("#orange").addClass("select");
    })
    $("#yellow").click(function () {
        color = "#F7ED4F";
        clear();
        $("#yellow").addClass("select");
    })
    $("#green").click(function () {
        color = "#C0F54E";
        clear();
        $("#green").addClass("select");
    })
    $("#blue1").click(function () {
        color = "#4DF3E5";
        clear();
        $("#blue1").addClass("select");
    })
    $("#blue2").click(function () {
        color = "#4C68F1";
        clear();
        $("#blue2").addClass("select");
    })
})

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.height = 0.41 * height;
canvas.width = width * 0.93;

ctx.beginPath();

function listenToUser(canvas) {
    let painting = false;
    let lastPoint = {
        "x": undefined,
        "y": undefined
    };

    if (document.body.ontouchstart !== undefined) { //两个表达式的类型不相同
        canvas.ontouchstart = function (e) {
            painting = true;
            draw = true;
            let x = e.touches[0].clientX - 0.066 * width;
            let y = e.touches[0].clientY - 0.28 * height;
            console.log(x);
            console.log(y);
            ctx.strokeStyle = color;
            lastPoint = {
                "x": x,
                "y": y
            };
            ctx.save();
            drawCircle(x, y, 0);
        };
        canvas.ontouchmove = function (e) {
            if (painting) {
                let x = e.touches[0].clientX - 0.066 * width;
                let y = e.touches[0].clientY - 0.28 * height;
                let newPoint = {
                    "x": x,
                    "y": y
                };
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
                lastPoint = newPoint;
            }
        };

        canvas.ontouchend = function () {
            painting = false;
            draw = true;
            canvas.ontouchstart = function () {};
        }
    } else {
        canvas.onmousedown = function (e) {
            painting = true;
            let x = e.clientX;
            let y = e.clientY;
            lastPoint = {
                "x": x,
                "y": y
            };
            ctx.save();
            drawCircle(x, y, 0);
        };
        canvas.onmousemove = function (e) {
            if (painting) {
                let x = e.clientX;
                let y = e.clientY;
                let newPoint = {
                    "x": x,
                    "y": y
                };
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
                lastPoint = newPoint;
            }
        };

        canvas.onmouseup = function () {
            painting = false;
            canvas.onmousedown = function () {}
        };

        canvas.mouseleave = function () {
            painting = false;
            canvas.onmousedown = function () {}
        }
    }
}

function drawCircle(x, y, radius) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}

function clear() {
    for (var i = 0; i < 5; i++) {
        $("#" + colors[i]).removeClass("select");
    }
}
