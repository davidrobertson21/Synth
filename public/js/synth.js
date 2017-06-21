var Tone = require('Tone');

let reverb = new Tone.JCReverb(0.1).toMaster();
let chorus = new Tone.Chorus(4, 2.5, 0.5).toMaster();
let filter = new Tone.Filter(500, "highpass").toMaster();
let distortion = new Tone.Distortion(100).toMaster();
let delay = new Tone.PingPongDelay("4n", 0.2).toMaster();
let pitch = new Tone.PitchShift (0)


var synth = new Tone.FMSynth().connect(distortion);
synth = synth.connect(reverb);
synth = synth.connect(chorus);
synth = synth.connect(filter);
synth = synth.connect(delay);

let arp = false;
let square = false
let octave = '4';


function setup() {
  // document.querySelectorAll('button').forEach(function(button){
  //   button.addEventListener('mousedown', function(e){
  //     console.log(e.target.textContent + octave);
  //     synth.triggerAttack(e.target.textContent + octave);
  //   })

  //   button.addEventListener('mouseup', function(e){
  //     synth.triggerRelease()
  //     console.log(synth)
  //   })
  // })
  console.log(synth)

  //SQUARE

  // document.getElementById("square").addEventListener("click", function(){
  //   square = !square;
  //   if(square){
  //     synth.modulation._oscillator._type = "square"
  //   }
  //   else{synth.modulation._oscillator._type = "sine"}
  //   });

  // });

  //DELAY
  document.getElementById("delayTime").addEventListener("change", function(e) {
    console.log(e.target.value);
    delay.delayTime = parseInt(e.target.value);
  });

  document.getElementById("delayFeedback").addEventListener("change", function(e) {
    console.log(e.target.value);
    delay.feedback = parseInt(e.target.value);
  })
  document.getElementById("delayWet").addEventListener("change", function(e) {
    console.log(e.target.value);
    delay.wet = parseInt(e.target.value);
  })

  //FILTER
  document.getElementById("filter").addEventListener("change", function(e) {
    console.log(e.target.value);
    filter.frequency = parseInt(e.target.value);
  })

  //ENVELOPE
  document.getElementById("attack").addEventListener("change", function(e) {
    console.log(e.target.value);
    synth.envelope.attack = parseInt(e.target.value);
  })
  document.getElementById("decay").addEventListener("change", function(e) {
    console.log(e.target.value);
    synth.envelope.decay = parseInt(e.target.value);
  })
  document.getElementById("sustain").addEventListener("change", function(e) {
    console.log(e.target.value);
    synth.envelope.sustain = parseInt(e.target.value);
  })
  document.getElementById("release").addEventListener("change", function(e) {
    console.log(e.target.value);
    synth.envelope.release = parseInt(e.target.value);
  })

  //DISTORTION
  document.getElementById("distortion").addEventListener("change", function(e) {
    console.log(e.target.value);
    distortion.distortion = parseInt(e.target.value);
  })

  document.getElementById("reverb").addEventListener("change", function(e) {
   // reverb.wet.input.value = parseInt(e.target.value)
    reverb.set({"roomSize": parseInt(e.target.value) / 100 });
    reverb.roomSize.value = parseInt(e.target.value) / 100
 //   console.log(parseInt(e.target.value) / 100);
    console.log(reverb);
  })

  //CHORUS
  document.getElementById("chorusFrequency").addEventListener("change", function(e) {
    chorus.frequency = parseInt(e.target.value)
  });

  document.getElementById("chorusDepth").addEventListener("change", function(e) {
    chorus.depth = parseInt(e.target.value)
  });

  document.getElementById("chorusDelayTime").addEventListener("change", function(e) {
    chorus.delayTime = parseInt(e.target.value)
  })

  //ARP
  document.getElementById("arpegiator").addEventListener("click", function(){
      arp = !arp;
      console.log(arp);
  });

  //KEYS
  document.addEventListener('keydown', function(e) {
    console.log("key down");
    const key = e.key;
    //console.log(key);
    if(key === "a" || key === "b" || key === "c" || key === "d" || key === "e" || key === "f" || key === "g") {

      if(arp){

      const letters = ["A","B","C","D","E","F", "G"]
      const numbers = [2,3,4,5]
      const randomArr = []

      for(let i = 1; i < 5; i++) {
        const randLet = letters[Math.floor(letters.length * Math.random())]
        const randNum = numbers[Math.floor(numbers.length * Math.random())]        
        randomArr.push(randLet + randNum);
      }

      console.log(randomArr);

      let pattern = new Tone.Pattern(function(time, note){
        console.log("this");
        synth.triggerAttackRelease(note, 0.25);
      }, randomArr, "random");

      pattern.start(0);
      pattern.cancel(3);
      Tone.Transport.start();
      }else {
        synth.triggerAttack(key + octave);
      }


    }

     // console.log(pattern);
     // console.log(key + octave);
     // synth.triggerAttack(key + octave);      
  
    if(key === "2" || key === "3" || key === "4" || key === "5") {
      octave = key;

    }
  });

  document.addEventListener('keyup', function(event) {
    synth.triggerRelease();    
  });


}

window.onload = setup;

/*
  Webpack makes things easier ( require etc )
  dont forget onload
  query selector is for html component (button not buttons)

*/