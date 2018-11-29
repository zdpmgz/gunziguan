/**
 * Created by Administrator on 2017/8/11.
 */
$(function(){
    var wellWidth = 100;
    //1、首先要生成棍子 ，用插入一个节点的方式 棍子的距离就是它与屏幕左边的left值
    //$(".well-box").append('<div class="well" style="width: 100px ; left:0px"></div>');
    //$(".well-box").append('<div class="well" style="width: 100px ; left:300px"></div>');
    //要生成随机的柱子
    //第一根随机的柱子 它的left值为0 先要声明一个变量 以便后面计算生成的随机柱子的left值
    $(".well-box").append('<div class="well" style="width: '+wellWidth+'px ; left:0px"></div>');
    //第二根随机柱子 这里要用到取随机的函数 并且第二根柱子的left值=第一根柱子的width+第二根柱子与第一根柱子的间距
    //第二根柱子的最大间距与棍子的最长距离是一致的，所以要获取棍子的最大距离，最大距离为=放棍子的盒子到t顶部的最顶端的距离
    //offset()函数用于设置或返回当前匹配元素相对于当前文档的偏移，也就是相对于当前文档的坐标。该函数只对可见元素有效。
    var max = $(".container").offset().top;
    //第二根柱子的最小间距也要设置，防止两个柱子重叠
    var min = 80;
    //生成第二个柱子 第二根柱子的left值=第一根柱子的width+第二根柱子与第一根柱子的间距
    var end2 =  wellWidth +(Math.random()*( max - min)) + min;
    $(".well-box").append('<div class="well" style="width: '+wellWidth+'px ; left:'+end2+'px"></div>');
    //同理生成第三根柱子 第三根柱子的left值=第二根柱子的left值+第二根柱子与第三根柱子的间距；
    var end3 = end2 + wellWidth + (Math.random()*( max - min)) + min;
    $(".well-box").append('<div class="well" style="width:'+wellWidth+'px ; left:'+end3+'px"> </div>');
    //同理生成第四根柱子 第三根柱子的left值=第三根柱子的left值+第四根柱子与第三根柱子的间距；
    var end4 = end3 + wellWidth +(Math.random()*(max-min)) + min;
    $(".well-box").append('<div class="well" style="width:'+wellWidth+'px ;left:'+end4+'px"></div>');
    //2.点击按钮棍子要长出来
    //按下按钮棍子长出来，控制的是棍子的width（因为棍子在最后是要倒下来的），棍子的最大距离就是到顶部的距离，
    //首先要获取到棍子到顶部的距离
    //mousedown 事件仅需要按键被按下，而不需要松开即可发生。当鼠标按下没有松开的时候，棍子继续生长
    //所以结合这两个事件我们需要进行一个判断
   var stop = true;//声明一个变量判断棍子是生长还停止状态 true 为生长 false 为 停止
        var stickW = $(".stick").offset().top;//获取棍子的最大长度（也就是柱子间距的最大值）
        $(".btnClick").mousedown(function(){
            if(stop == true){
            $(".stick").animate({"width":stickW+"px"},2000)
            }
        });
        //mouseup 事件仅需要按键被按下之后松开即可发生。当鼠标松开后棍子停止生长并倒下来（倒下来之后在按按钮会继续生长）
        //要给棍子的状态赋值为flsae，停止生长
        $(".btnClick").mouseup(function(){
            if(stop == true){
            $(".stick").addClass("stickDown");
            $(".stick").stop();//动画停止
                stop = false;//赋值为false，停止生长
        //3.棍子倒下小人从站立变成跑步的姿势，并且隔一段时间跑动起来
                moveman()
        }
        });
             var num = 0 ;//表示当前小人所在的柱子
         function moveman(){
        setTimeout(function(){//添加定时函数
            var stickK = $(".stick").width();//获取当前棍子的宽度
                 //棍子倒下小人从站立变成跑步的姿势
                 $(".man img").attr("src","img/stick.gif");
                 //要在棍子倒下隔一段时间小人跑动起来 这里需要添加一个定时器（setTimeout）
                 $(".man img").animate({"left":stickK +"px"}, 1000 ,function(){
                     //小人挑战失败的情况
                     // 1小于两个柱子之间的间距 或者 2大于两个柱子之间的间距+后面柱子的宽度
                     //两个柱子之间的间距=后一个柱子的left值-前一个柱子的left值-他的宽度
                     var juli = $(".well").eq(num+1).offset().left - wellWidth;//表示两个柱子之间的间距
                     if(stickK < juli || stickK >(wellWidth + juli)){
                         alert("挑战失败了哦");
                         //挑战失败的函数
                         }
                     //两个柱子之间的距离 = 后一个柱子的left值 - 前一个柱子的left值-柱子的宽度
                     else{
                         //挑战成功的函数
                         //小人要站立起来  棍子要消失的
                         //小人跑动起来，它移动的距离是它与左边的left值

                         $(".man img").attr("src","img/stick_stand.png").css("left","0px").hide();
                         $(".stick").removeClass("stickDown").width("0px");
                         //小人跑动起来，装柱子的盒子整体要往左边移动，从视觉上是移到了左边屏幕的外边，实际上移动的是后一根柱子的
                         //left值，因为向左移动所以要取-值
                         var next = $(".well").eq(num+1).css("left");//css获得的left值后面自带“px”所以next的后面不用加“px”
                         $(".well-box").animate({"left" :"-"+next}, 100 ,function(){
                             $(".man img").show();
                             stop = true;//重新赋值为true，在跑下一个柱子，按钮按下重新生长柱子
                             num++;//成功跑完一个柱子后跑下一个柱子
                             if(num == 3 ){
                                 stop = false;//当跑到最后一个柱子的时候就不能在跑了，要让按钮不能按了（就是按了棍子也不长了）
                                 alert("恭喜你成功通过第一关")
                             }

                         })

                     }
                 });
             });

         }


































});//加载函数的结束符