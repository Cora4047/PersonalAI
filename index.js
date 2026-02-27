const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

// SELF EXPLANATORY...
const names = [
    "vienna",
    "v",
    "vienneta",
    "big v"
];

const recognition = new SpeechRecognition();

recognition.continuous = true; // temp
recognition.lang = "en-GB" || "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const startBtn = document.querySelector("button")

startBtn.onclick = () => {
    recognition.start();
    console.log("starting audio input!")
}

recognition.onresult = (event) => {
    const inp = event.results[0][0].transcript;
    console.log("Caught input!");
    console.log(`Result: ${inp}`)
    console.log(`Confidence: ${event.results[0][0].confidence}`);
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