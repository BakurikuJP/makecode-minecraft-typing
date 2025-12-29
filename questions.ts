/**
 * Question Data
 */
namespace questions {

    export function getMonsterName(index: number): string {
        if (index === 0) return "Slime";
        if (index === 1) return "Zombie";
        if (index === 2) return "Skeleton";
        if (index === 3) return "Creeper";
        if (index === 4) return "Spider";
        if (index === 5) return "Enderman";
        if (index === 6) return "Blaze";
        if (index === 7) return "Ghast";
        if (index === 8) return "Witch";
        return "Phantom";
    }

    export function setEasyQuestion(index: number): void {
        if (index === 0) { gameState.currentHiragana = "a"; gameState.currentRomaji = "a"; }
        else if (index === 1) { gameState.currentHiragana = "i"; gameState.currentRomaji = "i"; }
        else if (index === 2) { gameState.currentHiragana = "u"; gameState.currentRomaji = "u"; }
        else if (index === 3) { gameState.currentHiragana = "e"; gameState.currentRomaji = "e"; }
        else if (index === 4) { gameState.currentHiragana = "o"; gameState.currentRomaji = "o"; }
        else if (index === 5) { gameState.currentHiragana = "ka"; gameState.currentRomaji = "ka"; }
        else if (index === 6) { gameState.currentHiragana = "ki"; gameState.currentRomaji = "ki"; }
        else if (index === 7) { gameState.currentHiragana = "ku"; gameState.currentRomaji = "ku"; }
        else if (index === 8) { gameState.currentHiragana = "ke"; gameState.currentRomaji = "ke"; }
        else { gameState.currentHiragana = "ko"; gameState.currentRomaji = "ko"; }
    }

    export function setNormalQuestion(index: number): void {
        if (index === 0) { gameState.currentHiragana = "inu"; gameState.currentRomaji = "inu"; }
        else if (index === 1) { gameState.currentHiragana = "neko"; gameState.currentRomaji = "neko"; }
        else if (index === 2) { gameState.currentHiragana = "saru"; gameState.currentRomaji = "saru"; }
        else if (index === 3) { gameState.currentHiragana = "tori"; gameState.currentRomaji = "tori"; }
        else if (index === 4) { gameState.currentHiragana = "uma"; gameState.currentRomaji = "uma"; }
        else if (index === 5) { gameState.currentHiragana = "kuma"; gameState.currentRomaji = "kuma"; }
        else if (index === 6) { gameState.currentHiragana = "risu"; gameState.currentRomaji = "risu"; }
        else if (index === 7) { gameState.currentHiragana = "sora"; gameState.currentRomaji = "sora"; }
        else if (index === 8) { gameState.currentHiragana = "yama"; gameState.currentRomaji = "yama"; }
        else { gameState.currentHiragana = "umi"; gameState.currentRomaji = "umi"; }
    }

    export function setHardQuestion(index: number): void {
        if (index === 0) { gameState.currentHiragana = "zonbi"; gameState.currentRomaji = "zonbi"; }
        else if (index === 1) { gameState.currentHiragana = "suraimu"; gameState.currentRomaji = "suraimu"; }
        else if (index === 2) { gameState.currentHiragana = "ringo"; gameState.currentRomaji = "ringo"; }
        else if (index === 3) { gameState.currentHiragana = "mikan"; gameState.currentRomaji = "mikan"; }
        else if (index === 4) { gameState.currentHiragana = "banana"; gameState.currentRomaji = "banana"; }
        else if (index === 5) { gameState.currentHiragana = "sakana"; gameState.currentRomaji = "sakana"; }
        else if (index === 6) { gameState.currentHiragana = "himawari"; gameState.currentRomaji = "himawari"; }
        else if (index === 7) { gameState.currentHiragana = "tanpopo"; gameState.currentRomaji = "tanpopo"; }
        else if (index === 8) { gameState.currentHiragana = "tonbo"; gameState.currentRomaji = "tonbo"; }
        else { gameState.currentHiragana = "semi"; gameState.currentRomaji = "semi"; }
    }

    export function nextQuestion(): void {
        if (!gameState.isPlaying) return;

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

        player.say("");
        player.say(monsterName + " appeared!");
        player.say("Type: " + gameState.currentHiragana);

        gameState.waitingForAnswer = true;
    }
}
