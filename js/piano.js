
const synth = new Tone.MonoSynth({
    "oscillator" : {
        "type" : "sine"
},
"envelope" : {
    "attack" : 0.1
}
}).toMaster();

const keys = document.getElementsByClassName('key');
Array.from(keys).forEach(function(key) {
    key.addEventListener('mousedown', function() {
        console.log(this.dataset.note);
        synth.triggerAttackRelease(this.dataset.note, "8n");
    });
});

let currentKey = null;
const allKeys =  document.querySelectorAll("[data-note]");
const notePlayedText = document.getElementById('notePlayed');
const pattern = new Tone.Pattern(function(time, note){
    synth.triggerAttackRelease(note, "4n");
    
    allKeys.forEach(function(item){
        item.classList.remove('active');
    });            
    
    currentKey = document.querySelectorAll("[data-note='"+note+"']");
    currentKey.forEach(function(item){
        item.classList.add('active');
        notePlayedText.innerHTML = note;
        console.log(item);
        
    });
}, ["F3", "F#3", "G3", "C4"], "up");

let patternPlay = false;
const playButton = document.getElementById('play');
playButton.addEventListener('click', function() {
    if (patternPlay) {
        patternPlay = false;
        pattern.stop();
        allKeys.forEach(function(item){
            item.classList.remove('active');
        });   
    } else {
        patternPlay = true;
        Tone.Transport.start(0);
        pattern.start(0);
    }
});
