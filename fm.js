console.log("hello");

window.AudioContext = window.AudioContext || window.webkitAudioContext;
var FADE_OUT_TIME = 1;

function fmSynth(audioContext, carrier, modulator, modGain){
  // this.modulatorGain.gain

  if (!carrier.hasOwnProperty('frequency')){
    throw {
      name: "Carrier has no frequency property",
      message: "Attempt to access an inexistant 'frequency' property of the carrier AudioNode " + carrier,
      toString: function () {
        return this.name + ": " + this.message;
      }
    };
  }

  carrier = carrier || audioContext.createOscillator();
  modulator = modulator || audioContext.createOscillator();
  this.modulatorGain = audioContext.createGainNode();

  this.modulatorGain.gain.value = modGain || 300;

  modulator.connect(this.modulatorGain);
  this.modulatorGain.connect(carrier.frequency);

  this.connect = function(audioNode){
    carrier.connect(audioNode);
  };
}

function amSynth(audioContext, node1, node2){

  var amGain = audioContext.createGain();

  node1.connect(amGain);
  node2.connect(amGain.gain);

  this.connect = function(audioNode){
    amGain.connect(audioNode);
  };
}



function paramEAD(audioContext, attackTimeT60, decayTimeT60, param, min, max){

  /* 0.001 - 60dB Drop
      e(-n) = 0.001; - Decay Rate of setTargetAtTime.
      n = 6.90776;
      */

      this.attackTimeT60 = attackTimeT60 || 0.9;
      this.decayTimeT60 = decayTimeT60 || 0.9;

      console.log("a = " + this.attackTimeT60 + "  b = " + this.decayTimeT60);


      this.min = min || 0;
      this.max = max || 3000;

      var t60multiplier = 1.90776;

      this.trigger = function(){
        var value = param.value;
        param.cancelScheduledValues(audioContext.currentTime);
        param.setValueAtTime(this.min, audioContext.currentTime);
        param.setTargetAtTime(this.max, audioContext.currentTime, this.attackTimeT60);
        param.setTargetAtTime(this.min, audioContext.currentTime+(this.attackTimeT60/t60multiplier), this.decayTimeT60);
        param.setValueAtTime(this.min, audioContext.currentTime+ (this.attackTimeT60/t60multiplier) + (this.decayTimeT60/t60multiplier) + FADE_OUT_TIME) ;
      };
    }



    var audioContext = new AudioContext();

    //carrierOsc.frequency
    //modOsc.frequency
    //amOsc.frequency

    //modOscGain.gain
    //amOscGain.gain


    var carrierOsc = audioContext.createOscillator();
    var modOsc = audioContext.createOscillator();
    var amOsc = audioContext.createOscillator();

    var modOscGain = audioContext.createGain();
    var amOscGain = audioContext.createGain();

    var mainGain = audioContext.createGain();

    modOsc.connect(modOscGain);
    amOsc.connect(amOscGain);


    // Envelopes
    // 0-1 -> * 0.9
    //modOscGain.gain -$0-amp1
    //modOsc.frequency -$0-frq1
    //amOscGain.gain -$0-amp2
    //amOsc.frequency -$0-frq2

    // Inputs
    //carrierOsc.frequency $0-ifrq
    //mainEnv.attackTimeT60
    //mainEnv.decayTimeT60

    //modEnv.attackTimeT60
    //modEnv.decayTimeT60
    //modEnv.max

    //modEnv.attackTimeT60
    //modEnv.decayTimeT60
    //modEnv.max

    //amEvn.attackTimeT60
    //amEvn.decayTimeT60
    //amEvn.max

    //mGainEnv.attackTimeT60
    //mGainEnv.decayTimeT60
    //mGainEnv.max

    //amGainEnv.attackTimeT60
    //amGainEnv.decayTimeT60
    //amGainEnv.max

    //lesser-spotted-grinchwarbler
    var ifrq = 0.55102;// ifrq
    var atk = 0.591837;//  atk
    var dcy = 0.187755;//  dcy
    var fmod1 = 0.0716327;// fmod1
    var atkf1 = 0.0204082;// atkf1
    var dcyf1 = 0.346939;//  dcyf1
    var fmod2 = 0.0204082;// fmod2
    var atkf2 = 0.55102;// atkf2
    var dcyf2 = 0.122449;//  dcyf2
    var amod1 = 0.632653;//  amod1
    var atka1 = 1;// atka1
    var dcya1 = 0.612245;//  dcya1
    var amod2 = 0.346939;//  amod2
    var atka2 = 0.816327;//  atka2
    var dcya2 = 0.653061;//  dcya2

    carrierOsc.frequency.value = ifrq*7000+300;
    var mainEnv = new paramEAD(audioContext, 0.9*atk, 0.9*dcy, mainGain.gain, 0, 1);
    var mGainEnv = new paramEAD(audioContext, 0.9*atka1, 0.9*dcya1, modOscGain.gain, 0, 1*amod1);
    var amGainEnv = new paramEAD(audioContext, 0.9*atka2, 0.9*dcya2, amOscGain.gain, 0, 1*amod2);
    var modEnv = new paramEAD(audioContext, 0.9*atkf1, 0.9*dcyf1, modOsc.frequency, 0, 3000*fmod1);
    var amEvn = new paramEAD(audioContext, 0.9*atkf2, 0.9*dcyf2, amOsc.frequency, 0, 3000*fmod2);


    var fm = new fmSynth(audioContext, carrierOsc, modOscGain, ifrq*7000+300);
    var am = new amSynth(audioContext, fm, amOscGain);
    am.connect(mainGain);
    mainGain.connect(audioContext.destination);
    mainGain.gain.value = 0.1;

    window.addEventListener("load",  function(){
      var playButton=document.getElementById("playButton");
      var carrierSlider=document.getElementById("carrierSlider");
      var modSlider=document.getElementById("modulatorSlider");
      var gainSlider=document.getElementById("modGain");
      var trigButton=document.getElementById("triggerButton");

      playButton.addEventListener('click', function (){
        carrierOsc.start(0);
        modOsc.start(0);
        amOsc.start(0);
      });

      carrierSlider.addEventListener('change', function(){
        //carrierOsc.frequency.value = carrierSlider.value;
      });

      modSlider.addEventListener('change', function(){
        //modOsc.frequency.value = modSlider.value;
      });

      gainSlider.addEventListener('change', function(){
        //amOsc.frequency.value = gainSlider.value;
      });

      trigButton.addEventListener('click', function (){
        mainEnv.trigger();
        modEnv.trigger();
        amEvn.trigger();
        mGainEnv.trigger();
        amGainEnv.trigger();
      });

    });

console.log("world");
