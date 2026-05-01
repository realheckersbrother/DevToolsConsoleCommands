// this should not be used to cheat.

const wpm = 100; // change this to your liking

const spans = document.querySelectorAll('span[unselectable="on"]');
const content = Array.from(spans).map(s => s.textContent).join('').split('');

const input = document.querySelector('input[type="text"]') || document.querySelector('.dash-letter-input') || document.activeElement;

if (content.length === 0) {
    console.error("Content not found! Make sure the race has started.");
} else {
    input.value = "";
    let i = 0;

    function a() {
        if (i >= content.length) return;

        input.focus();
        const char = content[i++];
        
        input.value += char;
        
        const options = { key: char, keyCode: char.charCodeAt(0), bubbles: true };
        
        input.dispatchEvent(new KeyboardEvent("keydown", options));
        input.dispatchEvent(new KeyboardEvent("keypress", options));
        input.dispatchEvent(new InputEvent("input", { data: char, bubbles: true }));
        input.dispatchEvent(new KeyboardEvent("keyup", options));

        const baseDelay = (60000 / wpm / 5); 
        const jitter = (Math.random() * 0.3) + 0.85;

        setTimeout(a, baseDelay * jitter);
    }

    // Give yourself a 1-second head start to click into the game
    console.log("Starting in 1s...");
    setTimeout(a, 1000);
}
