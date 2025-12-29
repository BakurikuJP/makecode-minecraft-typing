/**
 * Typing Monster Battle - Main Game Logic
 */

//% block="Typing Game"
//% color="#e74c3c"
//% icon="\uf11b"
namespace typingGame {

    //% block="Start typing game level %level"
    //% level.min=1 level.max=3 level.defl=1
    //% weight=100
    export function startGame(level: number): void {
        if (gameState.isPlaying) {
            player.say("Game already started!");
            return;
        }

        if (level < 1) level = 1;
        if (level > 3) level = 3;
        gameState.difficulty = level;
        gameState.reset();
        gameState.isPlaying = true;

        let diffName = "Easy";
        if (gameState.difficulty === 2) diffName = "Normal";
        if (gameState.difficulty === 3) diffName = "Hard";
        
        player.say("====================");
        player.say("Typing Monster Battle");
        player.say("====================");
        player.say("Level: " + diffName);
        player.say("Type the romaji!");

        loops.pause(2000);
        questions.nextQuestion();
    }

    //% block="End typing game"
    //% weight=90
    export function endGame(): void {
        if (!gameState.isPlaying) return;

        gameState.isPlaying = false;
        gameState.waitingForAnswer = false;

        player.say("====================");
        player.say("Game Over!");
        player.say("====================");
        player.say("Monsters: " + gameState.monstersDefeated);
        player.say("Correct: " + gameState.correctCount);
        player.say("Wrong: " + gameState.wrongCount);
        player.say("Max Combo: " + gameState.maxCombo);
        player.say("Score: " + gameState.score);

        let rating = "";
        if (gameState.score >= 1000) {
            rating = "Super Typing Master!";
        } else if (gameState.score >= 500) {
            rating = "Typing Master!";
        } else if (gameState.score >= 200) {
            rating = "Good job!";
        } else {
            rating = "Keep trying!";
        }
        player.say(rating);
    }

    //% block="Check answer %answer"
    //% weight=80
    export function checkAnswer(answer: string): void {
        if (!gameState.isPlaying) return;
        if (!gameState.waitingForAnswer) return;
        if (gameState.currentRomaji === "") return;

        gameState.waitingForAnswer = false;

        if (answer === gameState.currentRomaji) {
            gameState.combo++;
            gameState.correctCount++;
            gameState.monstersDefeated++;

            if (gameState.combo > gameState.maxCombo) {
                gameState.maxCombo = gameState.combo;
            }

            let baseScore = gameState.difficulty * 10;
            let comboBonus = gameState.combo * 5;
            let totalPoints = baseScore + comboBonus;
            gameState.score += totalPoints;

            player.say("Correct! +" + totalPoints);

            if (gameState.combo >= 3) {
                player.say(gameState.combo + " Combo!");
            }

            loops.pause(1000);
            questions.nextQuestion();

        } else {
            gameState.combo = 0;
            gameState.wrongCount++;

            player.say("Wrong! Answer: " + gameState.currentRomaji);
            
            gameState.waitingForAnswer = true;
        }
    }

    //% block="Show score"
    //% weight=70
    export function showScore(): void {
        player.say("--- Score ---");
        player.say("Score: " + gameState.score);
        player.say("Correct: " + gameState.correctCount);
        player.say("Combo: " + gameState.combo);
    }
}
