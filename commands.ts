/**
 * チャットコマンドハンドラー
 * プレイヤーのチャット入力を処理
 */

// ========================================
// システムコマンド
// ========================================

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
    player.say("--- タイピングモンスターバトル ---");
    player.say("start : かんたんモードで開始");
    player.say("start2 : ふつうモード");
    player.say("start3 : むずかしいモード");
    player.say("stop : ゲーム終了");
    player.say("score : スコア確認");
    player.say("-----------------------------");
});

// ========================================
// 答え入力用コマンド
// かんたんモード（あ〜こ）
// ========================================

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

// ========================================
// ふつうモード（単語）
// ========================================

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

// ========================================
// むずかしいモード（長い単語）
// ========================================

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
