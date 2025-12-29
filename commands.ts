/**
 * Chat Command Handlers
 */

player.onChat("start", function () {
    typingGame.startGame(1);
});

player.onChat("start1", function () {
    typingGame.startGame(1);
});

player.onChat("start2", function () {
    typingGame.startGame(2);
});

player.onChat("start3", function () {
    typingGame.startGame(3);
});

player.onChat("stop", function () {
    typingGame.endGame();
});

player.onChat("score", function () {
    typingGame.showScore();
});

player.onChat("help", function () {
    player.say("--- Typing Monster Battle ---");
    player.say("start : Easy mode");
    player.say("start2 : Normal mode");
    player.say("start3 : Hard mode");
    player.say("stop : End game");
    player.say("score : Show score");
});

// Easy mode answers
player.onChat("a", function () { typingGame.checkAnswer("a"); });
player.onChat("i", function () { typingGame.checkAnswer("i"); });
player.onChat("u", function () { typingGame.checkAnswer("u"); });
player.onChat("e", function () { typingGame.checkAnswer("e"); });
player.onChat("o", function () { typingGame.checkAnswer("o"); });
player.onChat("ka", function () { typingGame.checkAnswer("ka"); });
player.onChat("ki", function () { typingGame.checkAnswer("ki"); });
player.onChat("ku", function () { typingGame.checkAnswer("ku"); });
player.onChat("ke", function () { typingGame.checkAnswer("ke"); });
player.onChat("ko", function () { typingGame.checkAnswer("ko"); });

// Normal mode answers
player.onChat("inu", function () { typingGame.checkAnswer("inu"); });
player.onChat("neko", function () { typingGame.checkAnswer("neko"); });
player.onChat("saru", function () { typingGame.checkAnswer("saru"); });
player.onChat("tori", function () { typingGame.checkAnswer("tori"); });
player.onChat("uma", function () { typingGame.checkAnswer("uma"); });
player.onChat("kuma", function () { typingGame.checkAnswer("kuma"); });
player.onChat("risu", function () { typingGame.checkAnswer("risu"); });
player.onChat("sora", function () { typingGame.checkAnswer("sora"); });
player.onChat("yama", function () { typingGame.checkAnswer("yama"); });
player.onChat("umi", function () { typingGame.checkAnswer("umi"); });

// Hard mode answers
player.onChat("zonbi", function () { typingGame.checkAnswer("zonbi"); });
player.onChat("suraimu", function () { typingGame.checkAnswer("suraimu"); });
player.onChat("ringo", function () { typingGame.checkAnswer("ringo"); });
player.onChat("mikan", function () { typingGame.checkAnswer("mikan"); });
player.onChat("banana", function () { typingGame.checkAnswer("banana"); });
player.onChat("sakana", function () { typingGame.checkAnswer("sakana"); });
player.onChat("himawari", function () { typingGame.checkAnswer("himawari"); });
player.onChat("tanpopo", function () { typingGame.checkAnswer("tanpopo"); });
player.onChat("tonbo", function () { typingGame.checkAnswer("tonbo"); });
player.onChat("semi", function () { typingGame.checkAnswer("semi"); });
