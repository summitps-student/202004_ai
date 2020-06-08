var bot = require("./bot"); //Don't change this
bot.hostURL = 'http://TEACHERWORKSPACENAME-TEACHERUSERNAME.c9users.io'; //Put the server url/IP adress here!
bot.key = "BOTKEYHERE"; //Set your bot key to this string!

/* TEST CODE */
bot.testHostURL = 'http://127.0.0.1:8080'; //Put the server url/IP adress here!
//  bot.testHostURL = 'http://STUDENTWORKSPACENAME-STUDENTUSERNAME.c9users.io';  //  stay tuned for this!
bot.testKey = "testrun"; //Do Not Change This Key!
bot.isTest = true;
/* End Test Code */
/***************************************************/
//Write your code in this function!!!
bot.direction = function(game) {
    
    /* ~~~ Determines and Organizes Data About The Game ~~~ */
    var enemyBots = [];
    var enemyBases = [];
    var myDir = "none";

    var dirs = ["north", "east", "south", "west"];

    for (let i = 0; i < game.players.length; i++) { //Adds all other bots to the enemyBots array.
        if (game.players[i].id != game.myBot.id) {
            enemyBases.push(game.bases[i]); //Adds all other bases to the enemyBases array
            enemyBots.push(game.players[i]);
        }
    }
    var mostFlower = game.flowers[0];
    for (var i = 0; i < game.flowers.length; i++) {
        if (mostFlower.pollen < game.flowers[i].pollen) {
            mostFlower = game.flowers[i];
        }
    }
    
        var stepsToBase = bot.findDistance(game.myBot.pos, game.myBase.pos);
    var turnsLeft = game.totalTurns - game.turn;
    
    /* ~~ This code decides what to do ~~ */
    var task = "flower"

    if (game.myBot.pollen >= 200) {
        task = "myBase";
    }
    else if (stepsToBase * game.players.length >= turnsLeft) {
        task = "myBase";
    }
    
    /* ~~This code decides how to do it ~~ */
    if (task == "none") {
        console.log("Going random!")
        myDir = dirs[Math.floor(Math.random() * 4)];
    }
    else if (task == "flower") {
        console.log("Going to flower with the most pollen!")
        myDir = bot.nextStep(game.myBot.pos, mostFlower.pos);
    } 
    else if (task == "myBase") {
        myDir = bot.nextStep(game.myBot.pos, game.myBase.pos);
    } 
    return myDir;
} //DO NOT CHANGE ANYTHING BELOW THIS LINE
bot();
