/**
 * 問題データと出題ロジック
 */
namespace questions {

    // モンスター名を取得
    export function getMonsterName(index: number): string {
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

    // かんたんモード：ひらがな1文字
    export function setEasyQuestion(index: number): void {
        if (index === 0) { gameState.currentHiragana = "あ"; gameState.currentRomaji = "a"; }
        else if (index === 1) { gameState.currentHiragana = "い"; gameState.currentRomaji = "i"; }
        else if (index === 2) { gameState.currentHiragana = "う"; gameState.currentRomaji = "u"; }
        else if (index === 3) { gameState.currentHiragana = "え"; gameState.currentRomaji = "e"; }
        else if (index === 4) { gameState.currentHiragana = "お"; gameState.currentRomaji = "o"; }
        else if (index === 5) { gameState.currentHiragana = "か"; gameState.currentRomaji = "ka"; }
        else if (index === 6) { gameState.currentHiragana = "き"; gameState.currentRomaji = "ki"; }
        else if (index === 7) { gameState.currentHiragana = "く"; gameState.currentRomaji = "ku"; }
        else if (index === 8) { gameState.currentHiragana = "け"; gameState.currentRomaji = "ke"; }
        else { gameState.currentHiragana = "こ"; gameState.currentRomaji = "ko"; }
    }

    // ふつうモード：簡単な単語
    export function setNormalQuestion(index: number): void {
        if (index === 0) { gameState.currentHiragana = "いぬ"; gameState.currentRomaji = "inu"; }
        else if (index === 1) { gameState.currentHiragana = "ねこ"; gameState.currentRomaji = "neko"; }
        else if (index === 2) { gameState.currentHiragana = "さる"; gameState.currentRomaji = "saru"; }
        else if (index === 3) { gameState.currentHiragana = "とり"; gameState.currentRomaji = "tori"; }
        else if (index === 4) { gameState.currentHiragana = "うま"; gameState.currentRomaji = "uma"; }
        else if (index === 5) { gameState.currentHiragana = "くま"; gameState.currentRomaji = "kuma"; }
        else if (index === 6) { gameState.currentHiragana = "りす"; gameState.currentRomaji = "risu"; }
        else if (index === 7) { gameState.currentHiragana = "そら"; gameState.currentRomaji = "sora"; }
        else if (index === 8) { gameState.currentHiragana = "やま"; gameState.currentRomaji = "yama"; }
        else { gameState.currentHiragana = "うみ"; gameState.currentRomaji = "umi"; }
    }

    // むずかしいモード：長い単語
    export function setHardQuestion(index: number): void {
        if (index === 0) { gameState.currentHiragana = "ぞんび"; gameState.currentRomaji = "zonbi"; }
        else if (index === 1) { gameState.currentHiragana = "すらいむ"; gameState.currentRomaji = "suraimu"; }
        else if (index === 2) { gameState.currentHiragana = "りんご"; gameState.currentRomaji = "ringo"; }
        else if (index === 3) { gameState.currentHiragana = "みかん"; gameState.currentRomaji = "mikan"; }
        else if (index === 4) { gameState.currentHiragana = "ばなな"; gameState.currentRomaji = "banana"; }
        else if (index === 5) { gameState.currentHiragana = "さかな"; gameState.currentRomaji = "sakana"; }
        else if (index === 6) { gameState.currentHiragana = "ひまわり"; gameState.currentRomaji = "himawari"; }
        else if (index === 7) { gameState.currentHiragana = "たんぽぽ"; gameState.currentRomaji = "tanpopo"; }
        else if (index === 8) { gameState.currentHiragana = "とんぼ"; gameState.currentRomaji = "tonbo"; }
        else { gameState.currentHiragana = "せみ"; gameState.currentRomaji = "semi"; }
    }

    // 次の問題を出題
    export function nextQuestion(): void {
        if (!gameState.isPlaying) return;

        // 入力待ちフラグをリセット
        gameState.waitingForAnswer = false;

        let questionIndex = Math.randomRange(0, 9);
        
        if (gameState.difficulty === 1) {
            setEasyQuestion(questionIndex);
        } else if (gameState.difficulty === 2) {
            setNormalQuestion(questionIndex);
        } else {
            setHardQuestion(questionIndex);
        }

        let monsterName = getMonsterName(Math.randomRange(0, 9));

        // 問題表示
        player.say("");
        player.say(monsterName + " が現れた!");
        player.say("[" + gameState.currentHiragana + "] を入力!");

        // 入力待ちフラグをON
        gameState.waitingForAnswer = true;
    }
}
