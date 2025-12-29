/**
 * Game State Management
 */
namespace gameState {
    export let isPlaying: boolean = false;
    export let score: number = 0;
    export let combo: number = 0;
    export let maxCombo: number = 0;
    export let correctCount: number = 0;
    export let wrongCount: number = 0;
    export let currentHiragana: string = "";
    export let currentRomaji: string = "";
    export let difficulty: number = 1;
    export let monstersDefeated: number = 0;
    export let waitingForAnswer: boolean = false;

    export function reset(): void {
        score = 0;
        combo = 0;
        maxCombo = 0;
        correctCount = 0;
        wrongCount = 0;
        monstersDefeated = 0;
        currentHiragana = "";
        currentRomaji = "";
        waitingForAnswer = false;
    }
}
