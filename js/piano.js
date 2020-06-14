
const synth = new Tone.MonoSynth({
    "oscillator" : {
        "type" : "sine"
},
"envelope" : {
    "attack" : 0.1
}
}).toMaster();

const sequenceOfNotes = ["F3", "A3", "C4", "A3", "G3", "A3", "D4", "B3", "G3"];
const sequenceList = document.getElementById('sequenceList');
const keys = document.getElementsByClassName('key');

Array.from(keys).forEach(function(key) {
    key.addEventListener('mousedown', function() {
        console.log(this.dataset.note);
        synth.triggerAttackRelease(this.dataset.note, "8n");
    });
});

sequenceOfNotes.forEach(function(note, index){
    sequenceList.innerHTML += '<span id="seq_'+index+'">' + note + '</span> ';
});

let currentKey = null;
const allKeys =  document.querySelectorAll("[data-note]");
const sequenceListNotes = document.querySelectorAll("#sequenceList span");

const pattern = new Tone.Pattern(function(time, note){
    synth.triggerAttackRelease(note, "4n");
    sequenceListNotes.forEach(function(item){
        item.classList.remove('seq_bold');
    });
    let currentNote = document.getElementById('seq_' + this.index);
    currentNote.classList.add('seq_bold');
    console.log(this.index);
    allKeys.forEach(function(item){
        item.classList.remove('active');
    });            
    
    currentKey = document.querySelectorAll("[data-note='"+note+"']");
    currentKey.forEach(function(item){
        item.classList.add('active');
        console.log(item);
        
    });
}, sequenceOfNotes, "up");

let patternPlay = false;
const playButton = document.getElementById('playBtn');
playButton.addEventListener('click', function() {
    if (patternPlay) {
        patternPlay = false;
        pattern.stop();
        this.innerHTML = 'Play';
        
        allKeys.forEach(function(item){
            item.classList.remove('active');
        });
        
        sequenceListNotes.forEach(function(item){
            item.classList.remove('seq_bold');
        });
        this.classList.remove('stop');
        this.classList.add('play');
    } else {
        this.innerHTML = 'Stop';
        patternPlay = true;
        Tone.Transport.start(0);
        pattern.start(0);
        this.classList.add('stop');
        this.classList.remove('play');
    }
});
