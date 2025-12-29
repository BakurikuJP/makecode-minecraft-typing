/**
 * タイピングモンスターバトル
 * メインゲームロジック
 */

//% block="タイピングゲーム"
//% color="#e74c3c"
//% icon="\uf11b"
namespace typingGame {

    /**
     * ゲームを開始する
     * @param level 難易度（1:かんたん, 2:ふつう, 3:むずかしい）
     */
    //% block="タイピングゲームを開始 難易度 %level"
    //% level.min=1 level.max=3 level.defl=1
    //% weight=100
    export function startGame(level: number): void {
        if (gameState.isPlaying) {
            player.say("ゲームはすでに始まっているよ!");
            return;
        }

        // 初期化
        if (level < 1) level = 1;
        if (level > 3) level = 3;
        gameState.difficulty = level;
        gameState.reset();
        gameState.isPlaying = true;

        // 開始メッセージ
        let diffName = "かんたん";
        if (gameState.difficulty === 2) diffName = "ふつう";
        if (gameState.difficulty === 3) diffName = "むずかしい";
        
        player.say("====================");
        player.say("タイピングモンスターバトル");
        player.say("====================");
        player.say("難易度: " + diffName);
        player.say("ローマ字を入力してね!");

        // 最初の問題（少し待ってから）
        loops.pause(2000);
        questions.nextQuestion();
    }

    /**
     * ゲームを終了する
     */
    //% block="タイピングゲームを終了"
    //% weight=90
    export function endGame(): void {
        if (!gameState.isPlaying) return;

        gameState.isPlaying = false;
        gameState.waitingForAnswer = false;

        // 結果発表
        player.say("====================");
        player.say("ゲーム終了!");
        player.say("====================");
        player.say("倒したモンスター: " + gameState.monstersDefeated + "匹");
        player.say("正解数: " + gameState.correctCount);
        player.say("間違い: " + gameState.wrongCount);
        player.say("最大コンボ: " + gameState.maxCombo);
        player.say("合計スコア: " + gameState.score + "点");

        // 評価
        let rating = "";
        if (gameState.score >= 1000) {
            rating = "スーパータイピングマスター!";
        } else if (gameState.score >= 500) {
            rating = "タイピングマスター!";
        } else if (gameState.score >= 200) {
            rating = "なかなかやるね!";
        } else {
            rating = "もっとがんばろう!";
        }
        player.say(rating);
    }

    /**
     * 答えをチェックする
     * @param answer プレイヤーの入力
     */
    //% block="答えをチェック %answer"
    //% weight=80
    export function checkAnswer(answer: string): void {
        // ゲーム中でなければ無視
        if (!gameState.isPlaying) return;
        // 入力待ちでなければ無視
        if (!gameState.waitingForAnswer) return;
        // 現在の答えがなければ無視
        if (gameState.currentRomaji === "") return;

        // 入力待ちフラグをOFF（重複チェック防止）
        gameState.waitingForAnswer = false;

        if (answer === gameState.currentRomaji) {
            // 正解！
            gameState.combo++;
            gameState.correctCount++;
            gameState.monstersDefeated++;

            if (gameState.combo > gameState.maxCombo) {
                gameState.maxCombo = gameState.combo;
            }

            // スコア計算
            let baseScore = gameState.difficulty * 10;
            let comboBonus = gameState.combo * 5;
            let totalPoints = baseScore + comboBonus;
            gameState.score += totalPoints;

            // 正解メッセージ
            player.say(">> 正解! +" + totalPoints + "点");

            if (gameState.combo >= 3) {
                player.say(">> " + gameState.combo + "コンボ!");
            }

            // 次の問題（少し待ってから）
            loops.pause(1000);
            questions.nextQuestion();

        } else {
            // 不正解
            gameState.combo = 0;
            gameState.wrongCount++;

            player.say("zannen... kotae wa " + gameState.currentRomaji);
            
            // 入力待ちを再度ON
            gameState.waitingForAnswer = true;
        }
    }

    /**
     * 現在のスコアを表示
     */
    //% block="スコアを表示"
    //% weight=70
    export function showScore(): void {
        player.say("--- 現在のスコア ---");
        player.say("スコア: " + gameState.score + "点");
        player.say("正解: " + gameState.correctCount);
        player.say("コンボ: " + gameState.combo);
    }
}
