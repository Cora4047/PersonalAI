// =============================================
//                 BASE STUFF
// =============================================
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

// SELF EXPLANATORY...
const names = [
    "vienna",
    "v",
    "vienneta",
    "big v"
];

// =============================================
//             INTERFACE STUFF
// =============================================

let phase = 0;
let zoff = 0;
let circles = [];

function setup() {
    createCanvas(window.screen.width, window.screen.height);

    let totalCircles = 10;

    for (let i = 0; i < totalCircles; i++) {
        circles.push({ noiseOffset: random(1000), scale: random(2, 5) });
    }

    stroke(255);
    strokeWeight(2);
    noFill();
}

function draw() {
    background(0);
    translate(width / 2, height / 2);

    for (let i = 0; i < circles.length; i++) {
        let c = circles[i];
        beginShape();

        let minRadius = 10 + i * 15;
        let maxRadius = 140 + i * 15;

        for (let a = 0; a < TWO_PI; a += radians(0.5)) {
            let xoff = map(cos(a + phase), -1, 1, 0, c.scale);
            let yoff = map(sin(a + phase), -1, 1, 0, c.scale);
            let r = map(noise(xoff + c.noiseOffset, yoff + c.noiseOffset, zoff - 10), 0, 1, minRadius, maxRadius);
            let x = r * cos(a);
            let y = r * sin(a);
            vertex(x, y);
        }
        endShape(CLOSE);
    }

    phase += 0.003;
    zoff += 0.01;
}



// =============================================
//             ACTUAL VOICE STUFF
// =============================================
const recognition = new SpeechRecognition();

recognition.continuous = true; // temp
recognition.lang = "en-GB" || "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const startBtn = document.querySelector("button")
const test = document.querySelector("p")

startBtn.onclick = () => {
    recognition.start();
    console.log("starting audio input!")
}

recognition.onresult = (event) => {
    const inp = event.results[0][0].transcript;
    console.log("Caught input!");
    console.log(`Result: ${inp}`)
    console.log(`Confidence: ${event.results[0][0].confidence}`);

    if (inp == "What is the time?") {
        console.log("the time is...");
    }
}

recognition.onspeechend = () => {
    recognition.stop();
}

recognition.onnomatch = (event) => {
    console.log("Not understood!");
}

recognition.onerror = (event) => {
    console.log(`Error occurred: ${event.error}`);
}

