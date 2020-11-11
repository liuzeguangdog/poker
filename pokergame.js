var compeleteCards = new Array();
var cardssequence=0;
var cardsnum=0;
var playerselectnum=0;
var mainplayernum=8;
var rounds=1;
var players=new Array();
var writer=document.getElementById("write");
document.getElementById("startgame").style.display="block";
document.getElementById("startgame").onclick=function ()
{
    this.style.display="none";
    document.getElementById("sort").style.display="block";
    document.getElementById("rounds").innerHTML="回合1/20";
};
document.getElementById("sort").onclick=function ()
{
    compeleteCards = CreatCompeleteCard();
    this.style.display="none";
    document.getElementById("deal").style.display="block";
    SortCards();
}
document.getElementById("deal").onclick=function ()
{   this.style.display="none";
    players=Creatplayers();
    setmainplayer();
    writer.innerHTML="<p>你的玩家序列号以及手牌如下:</p>"
    for(var i=0;i<8;i++)
    {
        SortCardsofplayer(players[i].cards);
    }
    Show();
    document.getElementById("section4-1").style.display="flex";

}
document.getElementById("ok").onclick=function ()
{
    document.getElementById("section4-1").style.display="none";
    var playerstring=document.getElementById("inputJS1").value;
    playerselectnum=parseInt(playerstring)-1;
    var numstring=document.getElementById("inputJS2").value;
    cardsnum=parseInt(numstring);
    inputnum1(cardsnum);
    document.getElementById("section4-2").style.display="flex";
}
document.getElementById("skip").onclick=function (){
    document.getElementById("section4-1").style.display="none";
    switchcards();
    FinalShow();
    document.getElementById("remake").style.display="block";
}
document.getElementById("remake").onclick=function (){
    if(players[mainplayernum].score==1)
        alert("恭喜你，获得本局胜利！");
    else
        alert("很遗憾，你输了!");
    clearAndRemake();
    document.getElementById("sort").style.display="block";
    document.getElementById("remake").style.display="none";
    if(rounds==20)
        alert("游戏结束");
    else
    {   rounds++;
        document.getElementById("rounds").innerHTML="回合"+rounds+"/"+20;
    }
}


function inputnum1(number){
    var html="<h2>请输入你的牌号(1-5):</h2>";
    for(var i=3;i<3+number;i++)
    {
        var st="inputJS"+i.toString();
        html+="<input id="+st+" type='text'>";
    }
    html+="<input id='submit1' type='button' value='下一步'>";
    document.getElementById("section4-2").innerHTML=html;
    document.getElementById("submit1").onclick=function ()
    {
        document.getElementById("section4-2").style.display="none";
        inputnum2(cardsnum);
        document.getElementById("section4-3").style.display="flex";
    }

}
function inputnum2(number){
    var html="<h2>请输入对方" +
        "牌号(1-5):</h2>";
    for(var i=3+number;i<3+2*number;i++)
    {
        var st="inputJS"+i.toString();
        html+="<input id="+st+" type='text'>";
    }
    html+="<input id='submit2' type='button' value='确认'>";
    document.getElementById("section4-3").innerHTML=html;
    document.getElementById("submit2").onclick=function ()
    {
        document.getElementById("section4-3").style.display="none";
        switchcards();
        FinalShow();
        document.getElementById("remake").style.display="block";
    }

}
function outputnum1(number)
{
    var numarr=new Array();
    for(var i=3;i<3+number;i++)
    {
        var st="inputJS"+i.toString();
        var x=document.getElementById(st).value;
        numarr.push(parseInt(x));
    }
    return numarr;
}
function outputnum2(number)
{
    var numarr=new Array();
    for(var i=3+number;i<3+2*number;i++)
    {
        var st="inputJS"+i.toString();
        var x=document.getElementById(st).value;
        numarr.push(parseInt(x));
    }
    return numarr;
}
function setmainplayer()
{
    mainplayernum=parseInt(Math.random()*7);
}
function Cards(number,type){
    var card = {
        number: number,
        type: type
    }
    return card;
}
function Player(number,array,score)
{
    var player={
        number:number,
        cards:array,
        score:score
    }
    return player;
}
function getplayercards()
{
    var cardsofplayer=new Array();
    for (var i = cardssequence; i < cardssequence+5; i++)
    {
        cardsofplayer.push(compeleteCards[i]);
    }
    cardssequence+=5;
    return cardsofplayer;
}
function CreatCompeleteCard() {
    var arr = new Array();
    for (var i = 3; i <= 15; i++) {
        for (var j = 1; j <= 4; j++) {
            var card = Cards(i, j);
            arr.push(card);
        }
    }
    return arr;
}
function Creatplayers(){
    var arr=new Array();
    for(var i=0;i<8;i++)
    {
        var p=Player(i,getplayercards(),0);
        arr.push(p);
    }
    return arr;
}
function SortCards() {
    if (compeleteCards.length == 52) {
        compeleteCards.sort(function(a, b) {
            return 0.5 - Math.random();
        });
    }
}
function clearAndRemake()
{
    cardssequence=0;
    cardsnum=0;
    playerselectnum=0;
    players.splice(0,players.length);
    compeleteCards.splice(0,compeleteCards.length);
    writer.innerHTML="";
    for(var i=0;i<8;i++)
    {   var st="";
        st+="player"+(i+1).toString();
        document.getElementById(st).innerHTML = "";
    }
}
function switchcards()
{

function switchcardsbyplayer(array1,array2)
{
    for (var i = 0; i < array1.length; i++) {
        var card=players[mainplayernum].cards[array1[i]-1];
        players[mainplayernum].cards[array1[i]-1]=players[playerselectnum].cards[array2[i]-1];
        players[playerselectnum].cards[array2[i]-1]=card;
    }
    SortCardsofplayer( players[playerselectnum].cards);
    SortCardsofplayer( players[mainplayernum].cards);
    writer.innerHTML +="<p>你(玩家"+(mainplayernum+1)+")与玩家"+(playerselectnum+1)+"交换了"+array1.length+"张卡牌<\p>";

}
function switchcardsbyrobot(number)
{

    var numplay = parseInt(Math.random() * 7);
    var numcards = parseInt(Math.random() * 3);
    if (numplay == number || numcards == 0) {

        writer.innerHTML += "<p>玩家" + (number + 1) + "选择了跳过<\p>";
        return;
    }
    else {
        writer.innerHTML += "<p>玩家" + (number + 1) + "与玩家" + (numplay + 1) + "交换了" + numcards + "张卡牌<\p>";
        for (var i = 0; i < numcards; i++) {
            var card = players[number].cards[i];
            players[number].cards[i] = players[numplay].cards[i];
            players[numplay].cards[i] = card;
                }
            }
}
    writer.innerHTML="";
    for(var i=0;i<8;i++)
    {   if(i==mainplayernum)
    switchcardsbyplayer(outputnum1(cardsnum), outputnum2(cardsnum));
    else
     {
    switchcardsbyrobot(i);
     }
    }
}

function SortCardsofplayer(array)
{
    array.sort(function (a,b)
    {
        return a.number-b.number;
    })
}
function judge(array) {
    var mapofnumber=new Map();
    var mapoftype=new Map();
    for(var i=0;i<array.length;i++)
    {
        if(mapofnumber.has(array[i].number))
            mapofnumber.set(array[i].number,mapofnumber.get(array[i].number)+1);
        else
            mapofnumber.set(array[i].number,1);
        if(mapoftype.has(array[i].type))
            mapoftype.set(array[i].type,mapoftype.get(array[i].type)+1);
        else
            mapoftype.set(array[i].type,1);
    }
    function isSinglePair() {
            for(var value of mapofnumber.values())
            {
                if(value>=2)
                    return true;
            }
        return false;
    }

    function isTwoPairs() {
        var paircount=0;
        for(var value of mapofnumber.values())
        {
            if(value>=2)
                paircount++;
            if(value>=4)
                paircount++;

        }
        return paircount>=2;
    }

    function isThreeOfAKind()
    {
        for(var value of mapofnumber.values())
        {
            if(value>=3)
                return true;
        }
        return false;
    }

    function isFourOfAKind()
    {
        for(var value of mapofnumber.values())
        {
            if(value>=4)
                return true;
        }
        return false;
    }

    function isAFlush()
    {
        for(var value of mapoftype.values())
        {
            if(value>=5)
                return true;
        }
        return false;
    }

    function isStraight()
    {
        for (var i = 0; i < array.length-1; i++) {
            if(array[i+1].number-array[i].number!=1)
            {
                return false;
            }
        }
        return true;

    }

    function isAFullHouse()
    {
        var flag=0;
        for(var value of mapofnumber.values())
        {
            if(value>=2)
                flag+=value;
        }
        return flag>=5;
    }
    function isStraightFlush()
    {
        return isStraight()&&isAFlush();
    }
    function  isRoyalFlush()
    {
        return isStraight()&&array[0].number==10;
    }

    if(isRoyalFlush())
        return 1;
    else if(isStraightFlush())
        return 2;
    else if(isFourOfAKind())
        return 3;
    else if(isAFullHouse())
        return 4;
    else if(isAFlush())
        return 5;
    else if(isStraight())
        return 6;
    else if(isThreeOfAKind())
        return 7;
    else if(isTwoPairs())
        return 8;
    else if(isSinglePair())
        return 9;
    else
        return 10;


}
function typeShow(type) {
    var t;
    switch(type) {
        case 1:
            t = "♠";
            break;
        case 2:
            t = "♣";
            break;
        case 3:
            t = "<font color='#FF0000'>♦</font>";
            break;
        case 4:
            t = "<font color='#FF0000'>♥</font>";
            break;
    }
    return t;
};

function numberShow(number) {
    var n = number;
    switch(number) {
        case 11:
            n = "J";
            break;
        case 12:
            n = "Q";
            break;
        case 13:
            n = "K";
            break;
        case 14:
            n = "A";
            break;
        case 15:
            n = "2";
            break;
    }
    return n;
};
function levelshow(number)
{
    var l="";
    switch(number){
        case 1:
            l="ROYAL_FLUSH";
            break;
        case 2:
            l="STRAIGHT_FLUSH";
            break;
        case 3:
            l="FOUR_OF_A_KIND";
            break;
        case 4:
            l="FULL_HOUSE";
            break;
        case 5:
            l="FLUSH";
            break;
        case 6:
            l="STRAIGHT";
            break;
        case 7:
            l="THREE_OF_A_KIND";
            break;
        case 8:
            l="TWO_PAIR";
            break;
        case 9:
            l="ONE_PAIR";
            break;
        case 10:
            l="HIGH_CARD";
            break;
    }
    return "<font color='#ffd700'>"+l+"<font>";
}
function getscore()
{
    var mapofscore=new Map();
    var maxlevel=10;
    var everylevel=0;
    for (var i = 0; i < players.length; i++) {
        everylevel=judge(players[i].cards);
        maxlevel=maxlevel>=everylevel?everylevel:maxlevel;
        mapofscore.set(i,everylevel);
    }
    for(var key of mapofscore.keys())
    {
        if(mapofscore.get(key)==maxlevel)
            players[key].score=1;
    }


}
var seed=0;
var mytimer;
function arrayToShow(array, id) {
    var html="";
    if(players[seed].score==1)
    html +="★★★"+id+":";
    else
        html+=id+":" ;
    for (var i = 0; i < array.length-1; i++) {
        html +="["+typeShow(array[i].type)+" "+numberShow(array[i].number)+"],";
    }
    html+="["+typeShow(array[array.length-1].type)+" "+numberShow(array[array.length-1].number)+"]";
    if(array.length==5)
        html+="("+levelshow(judge(array))+")";
    document.getElementById(id).innerHTML = html;
    seed++;
    if(seed==8){
        clearInterval(mytimer);
        seed=0;
    }
};
function Show(){
    arrayToShow(players[mainplayernum].cards,"player"+(mainplayernum+1).toString());

}
function FinalShow() {
    getscore();
    seed=0;
        mytimer=setInterval(function () {
        var st = "";
        st += "player" + (seed + 1).toString();
        arrayToShow(players[seed].cards, st)
    }, 500);

}
