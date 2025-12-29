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
    // 問題データ（ローマ字 - 小学校低学年向け）
    // ========================================

    // かんたん：1〜3文字のローマ字
    const EASY_WORDS: string[][] = [
        ["あ", "a"],
        ["い", "i"],
        ["う", "u"],
        ["え", "e"],
        ["お", "o"],
        ["か", "ka"],
        ["き", "ki"],
        ["く", "ku"],
        ["け", "ke"],
        ["こ", "ko"],
        ["さ", "sa"],
        ["し", "si"],
        ["す", "su"],
        ["せ", "se"],
        ["そ", "so"],
        ["た", "ta"],
        ["て", "te"],
        ["と", "to"],
        ["な", "na"],
        ["に", "ni"],
        ["ぬ", "nu"],
        ["ね", "ne"],
        ["の", "no"],
        ["は", "ha"],
        ["ひ", "hi"],
        ["ふ", "hu"],
        ["へ", "he"],
        ["ほ", "ho"],
        ["ま", "ma"],
        ["み", "mi"],
        ["む", "mu"],
        ["め", "me"],
        ["も", "mo"],
        ["や", "ya"],
        ["ゆ", "yu"],
        ["よ", "yo"],
        ["ら", "ra"],
        ["り", "ri"],
        ["る", "ru"],
        ["れ", "re"],
        ["ろ", "ro"],
        ["わ", "wa"],
        ["を", "wo"],
        ["ん", "n"]
    ];

    // ふつう：簡単な単語
    const NORMAL_WORDS: string[][] = [
        ["いぬ", "inu"],
        ["ねこ", "neko"],
        ["さる", "saru"],
        ["とり", "tori"],
        ["うま", "uma"],
        ["くま", "kuma"],
        ["りす", "risu"],
        ["さかな", "sakana"],
        ["あり", "ari"],
        ["はち", "hati"],
        ["かに", "kani"],
        ["えび", "ebi"],
        ["たこ", "tako"],
        ["いか", "ika"],
        ["りんご", "ringo"],
        ["みかん", "mikan"],
        ["ばなな", "banana"],
        ["もも", "momo"],
        ["ぶどう", "budou"],
        ["すいか", "suika"],
        ["そら", "sora"],
        ["うみ", "umi"],
        ["やま", "yama"],
        ["かわ", "kawa"],
        ["くも", "kumo"],
        ["ほし", "hosi"],
        ["つき", "tuki"],
        ["ひ", "hi"],
        ["あめ", "ame"],
        ["ゆき", "yuki"]
    ];

    // むずかしい：少し長い単語
    const HARD_WORDS: string[][] = [
        ["ぞんび", "zonbi"],
        ["すけるとん", "sukeruton"],
        ["くりーぱー", "kuri-pa-"],
        ["えんだーまん", "enda-man"],
        ["ぶれいず", "bureizu"],
        ["すらいむ", "suraimu"],
        ["まいんくらふと", "mainkurahuto"],
        ["だいやもんど", "daiyamondo"],
        ["てれぽーと", "terepoo-to"],
        ["えんちゃんと", "entyanto"],
        ["とうもろこし", "toumorokosi"],
        ["ひまわり", "himawari"],
        ["たんぽぽ", "tanpopo"],
        ["ちょうちょ", "tyoutyo"],
        ["かぶとむし", "kabutomusi"],
        ["くわがたむし", "kuwagatamusi"],
        ["せみ", "semi"],
        ["とんぼ", "tonbo"],
        ["かまきり", "kamakiri"],
        ["ばった", "batta"]
    ];

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
    let difficulty: number = 1; // 1:かんたん, 2:ふつう, 3:むずかしい
    let timeRemaining: number = 60;
    let gameTimerId: number = 0;
    let monstersDefeated: number = 0;

    // モンスター名リスト
    const MONSTER_NAMES: string[] = [
        "スライム",
        "ゾンビ",
        "スケルトン",
        "クリーパー",
        "クモ",
        "エンダーマン",
        "ブレイズ",
        "ガスト",
        "ウィッチ",
        "ファントム"
    ];

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
        difficulty = Math.clamp(1, 3, level);
        score = 0;
        combo = 0;
        maxCombo = 0;
        correctCount = 0;
        wrongCount = 0;
        monstersDefeated = 0;
        timeRemaining = 60;
        isPlaying = true;

        // 開始メッセージ
        const diffName = difficulty === 1 ? "かんたん" : difficulty === 2 ? "ふつう" : "むずかしい";
        player.say("§6━━━━━━━━━━━━━━━━━━━━");
        player.say("§e✨ タイピングモンスターバトル ✨");
        player.say("§6━━━━━━━━━━━━━━━━━━━━");
        player.say("§a難易度: §f" + diffName);
        player.say("§a制限時間: §f60秒");
        player.say("§7ローマ字を入力してモンスターを倒そう！");
        player.say("");

        // タイマー開始
        startTimer();

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
        player.say("");
        player.say("§6━━━━━━━━━━━━━━━━━━━━");
        player.say("§e🎉 ゲーム終了！ 🎉");
        player.say("§6━━━━━━━━━━━━━━━━━━━━");
        player.say("§a倒したモンスター: §f" + monstersDefeated + "匹");
        player.say("§a正解数: §f" + correctCount);
        player.say("§c間違い: §f" + wrongCount);
        player.say("§d最大コンボ: §f" + maxCombo);
        player.say("§e★ 合計スコア: §f" + score + "点");
        player.say("§6━━━━━━━━━━━━━━━━━━━━");

        // 評価
        let rating = "";
        if (score >= 1000) {
            rating = "§6✨ スーパータイピングマスター！ ✨";
        } else if (score >= 500) {
            rating = "§e⭐ タイピングマスター！ ⭐";
        } else if (score >= 200) {
            rating = "§a🌟 なかなかやるね！ 🌟";
        } else {
            rating = "§b💪 もっとがんばろう！ 💪";
        }
        player.say(rating);
    }

    // ========================================
    // タイマー
    // ========================================

    function startTimer(): void {
        loops.forever(function () {
            if (!isPlaying) return;

            loops.pause(1000);
            timeRemaining--;

            // 残り時間通知
            if (timeRemaining === 30) {
                player.say("§e⏰ 残り30秒！");
            } else if (timeRemaining === 10) {
                player.say("§c⏰ 残り10秒！がんばれ！");
            } else if (timeRemaining === 5) {
                player.say("§c⏰ 5...");
            } else if (timeRemaining === 4) {
                player.say("§c4...");
            } else if (timeRemaining === 3) {
                player.say("§c3...");
            } else if (timeRemaining === 2) {
                player.say("§c2...");
            } else if (timeRemaining === 1) {
                player.say("§c1...");
            }

            if (timeRemaining <= 0) {
                endGame();
            }
        });
    }

    // ========================================
    // 問題出題
    // ========================================

    function getWordList(): string[][] {
        if (difficulty === 1) return EASY_WORDS;
        if (difficulty === 2) return NORMAL_WORDS;
        return HARD_WORDS;
    }

    function nextQuestion(): void {
        if (!isPlaying) return;

        const wordList = getWordList();
        const index = Math.floor(Math.random() * wordList.length);
        const word = wordList[index];

        currentHiragana = word[0];
        currentRomaji = word[1];

        // ランダムなモンスターを選択
        const monsterIndex = Math.floor(Math.random() * MONSTER_NAMES.length);
        const monsterName = MONSTER_NAMES[monsterIndex];

        // 問題表示
        player.say("");
        player.say("§c🐉 " + monsterName + "が現れた！");
        player.say("§f「§e" + currentHiragana + "§f」をローマ字で入力しよう！");
        player.say("§7(ヒント: " + currentRomaji.charAt(0) + "...)");
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

        // 大文字小文字を無視して比較
        const normalizedAnswer = answer.toLowerCase().trim();
        const normalizedCorrect = currentRomaji.toLowerCase();

        if (normalizedAnswer === normalizedCorrect) {
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
            player.say("§a✔ 正解！ +" + totalPoints + "点");

            if (combo >= 3) {
                player.say("§d🔥 " + combo + "コンボ！");
            }
            if (combo === 5) {
                player.say("§e⭐ すごい！5コンボ達成！");
            } else if (combo === 10) {
                player.say("§6✨ 最高！10コンボ達成！ ✨");
            }

            // 次の問題
            loops.pause(500);
            nextQuestion();

        } else {
            // 不正解
            combo = 0;
            wrongCount++;

            player.say("§c✖ ざんねん... 正解は「§f" + currentRomaji + "§c」");
            player.say("§7もう一度チャレンジ！");
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
        player.say("§6━━━ 現在のスコア ━━━");
        player.say("§eスコア: §f" + score + "点");
        player.say("§a正解: §f" + correctCount);
        player.say("§dコンボ: §f" + combo);
        player.say("§c残り時間: §f" + timeRemaining + "秒");
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
    player.say("§6━━━ タイピングモンスターバトル ━━━");
    player.say("§a/start §7: かんたんモードで開始");
    player.say("§a/start1 §7: かんたんモード");
    player.say("§a/start2 §7: ふつうモード");
    player.say("§a/start3 §7: むずかしいモード");
    player.say("§a/stop §7: ゲーム終了");
    player.say("§a/score §7: スコア確認");
    player.say("§6━━━━━━━━━━━━━━━━━━━━");
});

// 入力判定用イベント
player.onChat("*", function (msg: string) {
    // ゲームコマンド以外の入力を判定
    const commands = ["start", "start1", "start2", "start3", "stop", "score", "help"];
    if (commands.indexOf(msg) === -1) {
        typingGame.checkAnswer(msg);
    }
});
