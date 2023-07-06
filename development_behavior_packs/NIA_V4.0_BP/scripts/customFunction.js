import {world} from '@minecraft/server';
import {ActionFormData,ModalFormData,MessageFormData} from '@minecraft/server-ui'
//一些自定义函数的注册

export function log(info) {
    console.warn(info)
}


/**
 * 将Msg消息广播至整个游戏
 * @param {string} Msg
 */
export function Broadcast(Msg) {
    world.sendMessage(Msg)
    // world.getDimension("overworld").runCommandAsync(`tellraw @a {\"rawtext\":[{\"text\":\"${Msg}\"}]}`);
}

/**
 * 将Msg消息发送至名为PlayerName的玩家
 * @param {string} Msg
 * @param {string} PlayerName
 */
export function Tell(Msg,PlayerName) {
    world.getDimension("overworld").runCommandAsync(`tellraw @a[name="${PlayerName}"] {\"rawtext\":[{\"text\":\"${Msg}\"}]}`);
}

/**
 * 运行指令
 * @param {string} Cmd
 */
export function RunCmd(Cmd) {
    world.getDimension("overworld").runCommandAsync(`${Cmd}`);
}

/**
 * 将名为showName的scoreboardName计分板添加至游戏
 * @param {string} scoreboardName
 * @param {string} showName
 */
export function AddScoreboard(scoreboardName,showName) {
    if (world.scoreboard.getObjective(scoreboardName) == null) {
        world.scoreboard.addObjective(scoreboardName,showName);
        Broadcast(`§e>> 计分板${scoreboardName}已被添加！`)
    } else {
        Broadcast(`§c>> 添加错误，计分板${scoreboardName}已存在！`)
    }
}


export function GetTime() {
    //创建一个Date对象
    let nowTime = new Date()
    let addedTime = new Date(nowTime.getTime() + 28800000);
    //获取年份
    let year = addedTime.getFullYear ();
    //获取月份（0-11，0代表1月）
    let month = addedTime.getMonth () + 1;
    if (month < 10) {
        month = "0" + month
    }
    //获取日期（1-31）
    let date = addedTime.getDate ();
    if (date < 10) {
        date = "0" + date
    }
    //获取小时（0-23）
    let hour = addedTime.getHours ();
    if (hour < 10) {
        hour = "0" + hour
    }
    //获取分钟（0-59）
    let minute = addedTime.getMinutes ();
    if (minute < 10) {
        minute = "0" + minute
    }
    //获取秒数（0-59）
    let second = addedTime.getSeconds ();
    if (second < 10) {
        second = "0" + second
    }
    let timeStr = year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second
    return timeStr
}



export function GetScore(scoreboardName,targets) {
    let Participants = world.scoreboard.getObjective(scoreboardName).getParticipants();
    let hasResult = false;
    for (let i = 0; i < Participants.length; i++) {
        if (Participants[i].displayName == targets) {
            return world.scoreboard.getObjective(scoreboardName).getScore(Participants[i]);
        }
    }
    if(!hasResult) {
        return false;
    }
}


// function getNumberInNormalDistribution(mean,std_dev){
//     return mean+(uniform2NormalDistribution()*std_dev);
// }

// function uniform2NormalDistribution(){
//     var sum=0.0;
//     for(var i=0; i<12; i++){
//         sum=sum+Math.random();
//     }
//     return sum-6.0;
// }

function randomNormalDistribution(){
    var u=0.0, v=0.0, w=0.0, c=0.0;
    do{
        //获得两个（-1,1）的独立随机变量
        u=Math.random()*2-1.0;
        v=Math.random()*2-1.0;
        w=u*u+v*v;
    }while(w==0.0||w>=1.0)
    //这里就是 Box-Muller转换
    c=Math.sqrt((-2*Math.log(w))/w);
    //返回2个标准正态分布的随机数，封装进一个数组返回
    //当然，因为这个函数运行较快，也可以扔掉一个
    //return [u*c,v*c];
    return u*c;
}

export function getNumberInNormalDistribution(mean,std_dev){
    return mean+(randomNormalDistribution()*std_dev);
}
