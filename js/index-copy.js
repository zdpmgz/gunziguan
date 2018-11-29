/**
 * Created by Administrator on 2017/8/11.
 */
//引入加载函数
$(document).ready(function(){
    //隐藏说明框
    $(".gameDialog").hide();
    //1、点击游戏说明按钮，提示说明框出来
    $("#game-info").click(function(){
        $(".gameDialog").show();
    });
    //2、点击返回按钮，提示说明框消失
    $(".close").click(function(){
        $(".gameDialog").hide();
    })
















})//加载函数的结束符