/**
 * タイピングモンスターバトル
 * ローマ字を入力してモンスターを倒そう！
 * 対象：小学校低学年
 */

//% block="タイピングゲーム"
//% color="#e74c3c"
//% icon="\uf11b"
namespace typingGame {

    // ========================================
    // ゲーム状態
    // ========================================

    let isPlaying: boolean = false;
    let score: number = 0;
    let combo: number = 0;
    let maxCombo: number = 0;
    let correctCount: number = 0;
    let wrongCount: number = 0;
    let currentHiragana: string = "";
    let currentRomaji: string = "";
    let difficulty: number = 1;
    let monstersDefeated: number = 0;
    let questionIndex: number = 0;

    // ========================================
    // ゲーム開始・終了
    // ========================================

    /**
     * ゲームを開始する
     * @param level 難易度（1:かんたん, 2:ふつう, 3:むずかしい）
     */
    //% block="タイピングゲームを開始 難易度 %level"
    //% level.min=1 level.max=3 level.defl=1
    //% weight=100
    export function startGame(level: number): void {
        if (isPlaying) {
            player.say("ゲームはすでに始まっているよ！");
            return;
        }

        // 初期化
        if (level < 1) level = 1;
        if (level > 3) level = 3;
        difficulty = level;
        score = 0;
        combo = 0;
        maxCombo = 0;
        correctCount = 0;
        wrongCount = 0;
        monstersDefeated = 0;
        isPlaying = true;

        // 開始メッセージ
        let diffName = "かんたん";
        if (difficulty === 2) diffName = "ふつう";
        if (difficulty === 3) diffName = "むずかしい";
        
        player.say("━━━━━━━━━━━━━━━━━━━━");
        player.say("タイピングモンスターバトル");
        player.say("━━━━━━━━━━━━━━━━━━━━");
        player.say("難易度: " + diffName);
        player.say("そのままローマ字を入力してね！");

        // 最初の問題
        loops.pause(1000);
        nextQuestion();
    }

    /**
     * ゲームを終了する
     */
    //% block="タイピングゲームを終了"
    //% weight=90
    export function endGame(): void {
        if (!isPlaying) return;

        isPlaying = false;

        // 結果発表
        player.say("━━━━━━━━━━━━━━━━━━━━");
        player.say("ゲーム終了！");
        player.say("━━━━━━━━━━━━━━━━━━━━");
        player.say("倒したモンスター: " + monstersDefeated + "匹");
        player.say("正解数: " + correctCount);
        player.say("間違い: " + wrongCount);
        player.say("最大コンボ: " + maxCombo);
        player.say("合計スコア: " + score + "点");
        player.say("━━━━━━━━━━━━━━━━━━━━");

        // 評価
        let rating = "";
        if (score >= 1000) {
            rating = "スーパータイピングマスター！";
        } else if (score >= 500) {
            rating = "タイピングマスター！";
        } else if (score >= 200) {
            rating = "なかなかやるね！";
        } else {
            rating = "もっとがんばろう！";
        }
        player.say(rating);
    }

    // ========================================
    // 問題出題
    // ========================================

    function nextQuestion(): void {
        if (!isPlaying) return;

        // 難易度に応じた問題を選択
        questionIndex = Math.randomRange(0, 9);
        
        if (difficulty === 1) {
            setEasyQuestion(questionIndex);
        } else if (difficulty === 2) {
            setNormalQuestion(questionIndex);
        } else {
            setHardQuestion(questionIndex);
        }

        // ランダムなモンスターを選択
        let monsterName = getMonsterName(Math.randomRange(0, 9));

        // 問題表示
        player.say("");
        player.say(monsterName + "が現れた！");
        player.say("「" + currentHiragana + "」を入力！");
    }

    function setEasyQuestion(index: number): void {
        if (index === 0) { currentHiragana = "あ"; currentRomaji = "a"; }
        else if (index === 1) { currentHiragana = "い"; currentRomaji = "i"; }
        else if (index === 2) { currentHiragana = "う"; currentRomaji = "u"; }
        else if (index === 3) { currentHiragana = "え"; currentRomaji = "e"; }
        else if (index === 4) { currentHiragana = "お"; currentRomaji = "o"; }
        else if (index === 5) { currentHiragana = "か"; currentRomaji = "ka"; }
        else if (index === 6) { currentHiragana = "き"; currentRomaji = "ki"; }
        else if (index === 7) { currentHiragana = "く"; currentRomaji = "ku"; }
        else if (index === 8) { currentHiragana = "け"; currentRomaji = "ke"; }
        else { currentHiragana = "こ"; currentRomaji = "ko"; }
    }

    function setNormalQuestion(index: number): void {
        if (index === 0) { currentHiragana = "いぬ"; currentRomaji = "inu"; }
        else if (index === 1) { currentHiragana = "ねこ"; currentRomaji = "neko"; }
        else if (index === 2) { currentHiragana = "さる"; currentRomaji = "saru"; }
        else if (index === 3) { currentHiragana = "とり"; currentRomaji = "tori"; }
        else if (index === 4) { currentHiragana = "うま"; currentRomaji = "uma"; }
        else if (index === 5) { currentHiragana = "くま"; currentRomaji = "kuma"; }
        else if (index === 6) { currentHiragana = "りす"; currentRomaji = "risu"; }
        else if (index === 7) { currentHiragana = "そら"; currentRomaji = "sora"; }
        else if (index === 8) { currentHiragana = "やま"; currentRomaji = "yama"; }
        else { currentHiragana = "うみ"; currentRomaji = "umi"; }
    }

    function setHardQuestion(index: number): void {
        if (index === 0) { currentHiragana = "ぞんび"; currentRomaji = "zonbi"; }
        else if (index === 1) { currentHiragana = "すらいむ"; currentRomaji = "suraimu"; }
        else if (index === 2) { currentHiragana = "りんご"; currentRomaji = "ringo"; }
        else if (index === 3) { currentHiragana = "みかん"; currentRomaji = "mikan"; }
        else if (index === 4) { currentHiragana = "ばなな"; currentRomaji = "banana"; }
        else if (index === 5) { currentHiragana = "さかな"; currentRomaji = "sakana"; }
        else if (index === 6) { currentHiragana = "ひまわり"; currentRomaji = "himawari"; }
        else if (index === 7) { currentHiragana = "たんぽぽ"; currentRomaji = "tanpopo"; }
        else if (index === 8) { currentHiragana = "とんぼ"; currentRomaji = "tonbo"; }
        else { currentHiragana = "せみ"; currentRomaji = "semi"; }
    }

    function getMonsterName(index: number): string {
        if (index === 0) return "スライム";
        if (index === 1) return "ゾンビ";
        if (index === 2) return "スケルトン";
        if (index === 3) return "クリーパー";
        if (index === 4) return "クモ";
        if (index === 5) return "エンダーマン";
        if (index === 6) return "ブレイズ";
        if (index === 7) return "ガスト";
        if (index === 8) return "ウィッチ";
        return "ファントム";
    }

    // ========================================
    // 入力判定
    // ========================================

    /**
     * 答えをチェックする
     * @param answer プレイヤーの入力
     */
    //% block="答えをチェック %answer"
    //% weight=80
    export function checkAnswer(answer: string): void {
        if (!isPlaying) return;
        if (currentRomaji === "") return;

        if (answer === currentRomaji) {
            // 正解！
            combo++;
            correctCount++;
            monstersDefeated++;

            if (combo > maxCombo) {
                maxCombo = combo;
            }

            // スコア計算（コンボボーナス付き）
            let baseScore = difficulty * 10;
            let comboBonus = combo * 5;
            let totalPoints = baseScore + comboBonus;
            score += totalPoints;

            // 正解メッセージ
            player.say("正解！ +" + totalPoints + "点");

            if (combo >= 3) {
                player.say(combo + "コンボ！");
            }
            if (combo === 5) {
                player.say("すごい！5コンボ達成！");
            } else if (combo === 10) {
                player.say("最高！10コンボ達成！");
            }

            // 次の問題
            loops.pause(500);
            nextQuestion();

        } else {
            // 不正解
            combo = 0;
            wrongCount++;

            player.say("ざんねん... 正解は「" + currentRomaji + "」");
        }
    }

    // ========================================
    // スコア確認
    // ========================================

    /**
     * 現在のスコアを表示
     */
    //% block="スコアを表示"
    //% weight=70
    export function showScore(): void {
        player.say("━━━ 現在のスコア ━━━");
        player.say("スコア: " + score + "点");
        player.say("正解: " + correctCount);
        player.say("コンボ: " + combo);
    }
}

// ========================================
// チャットコマンドイベント
// ========================================

// ゲーム開始コマンド
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

// ゲーム終了コマンド
player.onChat("stop", function () {
    typingGame.endGame();
});

// スコア確認
player.onChat("score", function () {
    typingGame.showScore();
});

// ヘルプ
player.onChat("help", function () {
    player.say("━━━ タイピングモンスターバトル ━━━");
    player.say("start : かんたんモードで開始");
    player.say("start2 : ふつうモード");
    player.say("start3 : むずかしいモード");
    player.say("stop : ゲーム終了");
    player.say("score : スコア確認");
    player.say("━━━━━━━━━━━━━━━━━━━━");
});

// ========================================
// 全ての答えを直接入力できるように登録
// ========================================

// かんたんモード（あ〜こ）
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

// ふつうモード（単語）
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

// むずかしいモード（長い単語）
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
