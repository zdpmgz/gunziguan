/**
 * Created by Administrator on 2017/8/9.
 */
$(document).ready(function(){
    //console.log(1111)
    //隐藏说明框
    $(".gameDialog").hide();
    //点击游戏说明框按钮，游戏说明框出来
    $("#game-info").click(function(){
        $(".gameDialog").show()
    });
    //点击返回按钮,游戏说明框隐藏
    $(".close").click(function(){
        $(".gameDialog").hide()
    });
    $(".dialog-btn .name").click(function(){
        $(".dialog").hide()
    })















})//加载函数的结束符