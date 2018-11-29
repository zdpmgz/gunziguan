/**
 * Created by Administrator on 2017/8/9.
 */
/*
$(document).ready(function(){
    console.log(11111)
});
*/
$(function(){
    //生成柱子
    //思路：设置柱子的宽度，一次加入柱子放到盒子里面
    var wellWidth = 100; //(全局变量)   //柱子的宽度暂时不写宽度，后面要计算
    //定义一个函数封装
    function initWell(){
//生成固定的柱子 理解柱子之间的不同间距 取决于柱子left值
    /*$(".well-box").append('<div class="well" style="width: 100px; left:0px"></div>');//第一根柱子
    //第二根柱子
    $(".well-box").append('<div class="well" style="width: 100px; left:300px"></div>');
    //第三根柱子
    $(".well-box").append('<div class="well" style="width: 100px; left:700px"></div>');
    //第四根柱子
    $(".well-box").append('<div class="well" style="width: 100px; left:1000px"></div>');*/
    //生成随机的柱子
    //第1根柱子
        //首先要清除原来的柱子，在清除原来的柱子
        $(".well-box").empty();

    $(".well-box").append('<div class="well" style="width:'+wellWidth+'px;left:0px"></div>');
    //第2根柱子 left=柱子的宽度+ 1--2之间的间距 两个棍子的最大值=棍子的最大长度（下面的柱子到顶部的距离）
    var max = $(".container").offset().top;
    //柱子间的最小间距 防止柱子重叠
    var min = 120;
    //柱子间的随机间距
    Math.random() * (max-min);
    //第二根柱子的left值
    var end2 = wellWidth + parseInt(Math.random() * (max-min)) + min;//第一根与第二根的柱子最小值是180px
    //生成第二根柱子
    $(".well-box").append('<div class="well" style="width:'+wellWidth+'px;left:'+end2+'px"></div>');
    //生成第三根柱子 left=第二根柱子的left值+柱子的宽度+2--3之间的间距
    var end3 = end2 + wellWidth + parseInt(Math.random() * (max-min))+min;
    $(".well-box").append('<div class="well" style="width:'+wellWidth+'px;left:'+end3+'px"></div>');
    //生成第四根柱子 left=第三根柱子的left值+柱子的宽度+3--4之间的间距
    var end4 = end3 + wellWidth + parseInt(Math.random() * (max-min))+min;
    $(".well-box").append('<div class="well" style="width:'+wellWidth+'px;left:'+end4+'px"></div>');
    $(".well").css("background","#ef3388");
    $(".stick").css("background","#ef3388");
        //优化柱子会跑出屏幕外的距离
        //var all = ("body").width();//把body的宽度赋给
        //$(".well-box").width(all);


    }//封装函数的结束符
    initWell();//调用函数
    var s =$(".well").eq(3).css("left");
    console.log(s);
    var all = $("body").width();
    console.log(all);
    var t = parseInt(s);
    if(t+100 > all){
        initWell();//调用函数
    }
    //调用函数
    initWell();

    //第二步：鼠标按下中间按钮不动时，棍子长出来，松开按钮 棍子停止生长 英雄小人开始闯关
    var stop = true;

    //鼠标按下不动时，棍子长出来
    $(".btnClick").mousedown(function(){
        if(stop == true){

            //按下时鼠标时棍子长出来，控制的是棍子的宽度，最大width是放内容的盒子与顶部的距离
            var stickH = $(".container").offset().top;
            //棍子出来是自定义动画
            $(".stick").animate({"width":stickH+"px"},1000);
        }

    });
    //鼠标松开，棍子停止生长
    $(".btnClick").mouseup(function(){
        if(stop == true){
            //棍子停止生长
            $(".stick").stop();
            //给stop的赋值为false，他就不满足 stop==true的条件 ，解决棍子倒下又一次按按钮生长的问题
            stop = false;
            //棍子停止生长添加样式，让棍子倒下来
            $(".stick").addClass("stickDown");
            //小人要跑动起来 函数
            moveMan()
        }


    });
    //第三步:小人跑动起来的函数
    var num = 0;//表示存放的是小人在第几个柱子上
    function moveMan(){
        //获取棍子的宽度
        //为了展示的效果合理，加一个定时器，等待一段时间子在跑动
        setTimeout(function(){
            var stickW= $(".stick").width();//获取当前棍子的width
            $(".man img").attr("src","img/stick.gif");
            //让小人跑动起来 跑动的距离 = 获取棍子的宽度 改变小人的left值
            $(".man img").animate({"left":stickW+"px"},1000 ,function(){
                //2-1判断小人挑战是成功还是失败
                //2-1-1挑战失败 棍子的宽度小于两个之间的距离或者大于（两个柱子间的距离+柱子的宽度）
                //两个柱子之间的距离 = 后一个柱子的left值 - 前一个柱子的left值-柱子的宽度
                var juli = $(".well").eq(num+1).offset().left-wellWidth;//
                if(stickW < juli || stickW >(juli+wellWidth)){


                    //挑战失败的函数
                    fail();

                }else{
                    //跑下一个柱子
                    //1把小人换成站立的图片 吧它的left值设为0px 并隐藏起来
                    $(".man img").attr("src","img/stick_stand.png").css("left","0px").hide();
                    //2把棍子初始化
                    $(".stick").removeClass("stickDown").width("0px");
                    //3.把装柱子的盒子整体往左边移，从视觉上隐藏到左边屏幕的外面 装柱子的盒子往左边的距离=
                    // 后一个柱子的left值（取负值）
                       var next = $(".well").eq(num+1).css("left");//后一个盒子的left值
                          console.log(next);      //用css（）获取的属性值是有px的
                    $(".well-box").animate({"left":"-"+next}, 500,function(){



                    //4.把小人显示出来
                    $(".man img").show();
                    //5把stop的值赋值为true 然、让按下按钮 棍子重新长出来
                      stop = true;
                    //6跑下一个柱子
                    num++;
                    //7跑到最后一个柱子的时候，也就是索引号为3的时候，小人本关挑战成功
                    if(num == 3){
                        //把按钮变成不能按的，避免棍子在长出来
                        stop = false;
                        //调用成功的函数
                        success();
                    }
                })
        }
        });

        },1000);
        /*1.把站立的小人图片换成跑动的图片*/
        //$(".man img").attr("src","img/stick.gif");
    }


    //第四步 小人挑战失败调用的函数
    function fail(){
        //1、小人掉下去
        $(".man img").addClass("rotate");
        //、为了优化视觉效果，避免感觉直接没有的问题，加一个定时器
        setTimeout(function(){
            $(".man img").hide();
            //2把棍子初始化 放入定时器中增加效果
            $(".stick").removeClass("stickDown").width("0px");
            //3显示提示弹框
            $(".dialog").show();
            //4.给弹框添加内容
            $(".dialog .name").html(failText[parseInt(Math.random()*20)]);//添加文本数组 随机数产生

            //5给弹框添加按钮   <a href="javascript:void(0)</a> 禁止a链接跳转 添加文本 .html()括号中间要用单引号（’‘）
            $(".dialog .dialog-btn").html('<a href="javascript:void(0);" class="play-agin">再试一次</a>');
        },1000)

    }
    //第四-1步 设置小人失败的文本提示
    var failText = [//数组的方式淡出失败提示框
        '志在峰巅的攀登者，不会陶醉在沿途的某个脚印之中。',
        '海浪为劈风斩浪的航船饯行，为随波逐流的轻舟送葬。',
        '人生最重要的一点是，永远不要迷失自己。',
        '一个人承受孤独的能力有多大，他的能力就有多大。',
        '实力塑造性格，性格决定命运。',
        '普通人成功并非靠天赋，而是靠把寻常的天资发挥到不寻常的高度。',
        '对于强者，要关注他们的灵魂，对于弱者，他关注他们的生存。',
        '积极的人在每一次忧患中都看到一个机会，而消极的人则在每个机会都看到某种忧患。',
        '成功不是将来才有的，而是从决定去做的那一刻起，持续累积而成。',
        '当你感到悲哀痛苦时，最好是去学些什么东西。学习会使你永远立于不败之地。',
        '有的人一生默默无闻，有的人一生轰轰烈烈，甚至千古流芳，为什么会这样？因为默默无闻的人只是满足于现状，而不去想怎么轰轰烈烈过一生，不要求自己，去做，去行动，怎么能够成功？',
        '人生最可怜的就是：我们总是梦想着天边的一座奇妙的玫瑰园，而不去欣赏今天就开在我们窗口的玫瑰。',
        '在人生的道路上，即使一切都失去了，只要一息尚存，你就没有丝毫理由绝望。因为失去的一切，又可能在新的层次上复得。',
        '没有一劳永逸的开始；也没有无法拯救的结束。人生中，你需要把握的是：该开始的，要义无反顾地开始；该结束的，就干净利落地结束。',
        '生命的奖赏远在旅途终点，而非起点附近。我不知道要走多少步才能达到目标，踏上第一千步的时候，仍然可能遭到失败。但我不会因此放弃，我会坚持不懈，直至成功！',
        '不要认为只要付出就一定会有回报，这是错误的。学会有效地工作，这是经营自己强项的重要课程。',
        '苦心人天不负，卧薪尝胆，三千越甲可吞吴。有志者事竞成，破釜沉舟，百二秦川终属楚。',
        '生命本身是一个过程，成功与失败只是人生过程中一些小小的片段，若果把生命与成功或失败联系在一起，生命将失去本身该有的意义。',
        '我们不要哀叹生活的不幸，诅咒命运的不公。在命运面前，我们要做强者，掐住命运的咽喉，叩问命运，改变命运。',
        '努力和效果之间，永远有这样一段距离。成功和失败的唯一区别是，你能不能坚持挺过这段无法估计的距离。'
    ];

    //第五步，小人挑战成功的函数
    function success(){
        //1、弹框显示出来
        $(".dialog").show();

        //2、给弹框添加文本内容、
        $(".dialog .name").html(sucText[parseInt(Math.random()*20)]);

        //3、给弹框添加按钮 重玩一次 下一关
        $(".dialog .dialog-btn").html('<a href="javascript:void(0);" class="play-agin">重玩一次</a>' +
            '<a href="javascript:void(0);" class="go-next">下一关</a>');











    }

//第五-1步，设置小人成功文本提示的内容
    var sucText = [
        '勇敢坚毅真正之才智乃刚毅之志向。 —— 拿破仑',
        '志向不过是记忆的奴隶，生气勃勃地降生，但却很难成长。 —— 莎士比亚',
        '骏马是跑出来的，强兵是打出来的。',
        '只有登上山顶，才能看到那边的风光。',
        '如果惧怕前面跌宕的山岩，生命就永远只能是死水一潭。',
        '平时没有跑发卫千米，占时就难以进行一百米的冲刺。',
        '梯子的梯阶从来不是用来搁脚的，它只是让人们的脚放上一段时间，以便让别一只脚能够再往上登。',
        '没有激流就称不上勇进，没有山峰则谈不上攀登。',
        '真正的才智是刚毅的志向。 —— 拿破仑',
        '山路曲折盘旋，但毕竟朝着顶峰延伸。',
        '只有创造，才是真正的享受，只有拚搏，才是充实的生活。',
        '敢于向黑暗宣战的人，心里必须充满光明。',
        '种子牢记着雨滴献身的叮嘱，增强了冒尖的勇气。',
        '自然界没有风风雨雨，大地就不会春华秋实。',
        '只会幻想而不行动的人，永远也体会不到收获果实时的喜悦。',
        '勤奋是你生命的密码，能译出你一部壮丽的史诗。',
        '对于攀登者来说，失掉往昔的足迹并不可惜，迷失了继续前时的方向却很危险。',
        '奋斗者在汗水汇集的江河里，将事业之舟驶到了理想的彼岸。',
        '忙于采集的蜜蜂，无暇在人前高谈阔论。',
        '勇士搏出惊涛骇流而不沉沦，懦夫在风平浪静也会溺水。'
    ];



    //第六步 定义刷新函数 再点击再试一次 重玩一次 下一关 调用函数
    function shuaXin(){
        //1、弹框隐藏了 按钮变成可以点击长出棍子
        $(".dialog").hide();
        stop = true;
        //2、小人初始化
        $(".man img").attr("src","img/stick_stand.png").css("left","0px").removeClass("rotate");
        //3、棍子要初始化
        $(".stick").removeClass("stickDown").width("0px");
        //4、放柱子的盒子也要初始化、
        $(".well-box").css("left","0px");
        //5、跑到第几根柱子初始化
        num = 0;
        //6、背景除初始化、
        //移除它原来的背景
        var suijishu = Math.ceil(Math.random()*19+1);//上取整也可以
        $("body").removeClass();

        $("body").addClass("bg"+suijishu);
        initWell();


    }

    //第七步  点击重玩一次 再试一次 调用函数
    $(".play-agin").live("click",function(){
        shuaXin();//除了调用刷新的函数外
        //把小人要显示出来
       $(".man img").show()
    });

    //第八步

    $(".go-next").live("click",function(){
        shuaXin();//除了调用刷新的函数外
        //改变关卡数
        var leave = 1;
        leave = leave+1; //每点击一次关卡数 关卡增一次
        $(".play-title").text("关卡"+leave);

    });



















});//加载函数的结束符