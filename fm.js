console.log("hello");

window.AudioContext = window.AudioContext || window.webkitAudioContext;

function fmSynth(audioContext, carrierFrequency, modulatorFrequency, modGain){
  // this.modulator.frequency
  // this.carrier.frequency
  // this.modulatorGain.gain

  this.carrier = audioContext.createOscillator();
  this.modulator = audioContext.createOscillator();
  this.modulatorGain = audioContext.createGainNode();

  this.carrier.frequency.value = carrierFrequency || 400;
  this.modulator.frequency.value = modulatorFrequency || 500;
  this.modulatorGain.gain.value = modGain || 300;


  this.modulator.connect(this.modulatorGain);
  this.modulatorGain.connect(this.carrier.frequency);
  //this.carrier.connect(audioContext.destination);

  this.connect = function(audioNode){
    this.carrier.connect(audioNode);
  };

  this.start = function(time){
    this.modulator.start(time);
    this.carrier.start(time);
  };

  this.stop = function(time){
    this.modulator.stop(time);
    this.carrier.stop(time);
  };
}

function amSynth(audioContext, node1, node2){

this.node1 = node1;
this.node2 = node2;

var amGain = audioContext.createGain();

this.node1.connect(amGain);
amGain.connect(audioContext.destination);
this.node2.connect(amGain.gain);

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

  this.min = min || 0;
  this.min = max || 3000;

  var t60multiplier = 6.90776;

  this.trigger = function(){
    param.cancelScheduledValues(audioContext.currentTime);
    param.setTargetAtTime(this.max, audioContext.currentTime, this.attackTimeT60);
    param.setTargetAtTime(this.min, audioContext.currentTime+(this.attackTimeT60/6.90776), this.decayTimeT60);
  };
}



var audioContext = new AudioContext();
var fm = new fmSynth(audioContext);
var env = new paramEAD(audioContext, 0.9, 0.9, fm.modulator.frequency, 0, 3000);

var fm = new fmSynth(audioContext);
var osOsc = audioContext.createOscillator();
var osOscGain = audioContext.createGain();
osOsc.connect(osOscGain);
var am = new amSynth(audioContext, fm, osOscGain);

// osOsc.freqeuency
// osOscGain.gain

window.addEventListener("load",  function(){
  var playButton=document.getElementById("playButton");
  var carrierSlider=document.getElementById("carrierSlider");
  var modSlider=document.getElementById("modulatorSlider");
  var gainSlider=document.getElementById("modGain");
  var trigButton=document.getElementById("triggerButton");

  playButton.addEventListener('click', function (){
    fm.start(0);
    osOsc.start(0);
  });

  carrierSlider.addEventListener('change', function(){
    fm.carrier.frequency.value = carrierSlider.value;
  });

  modSlider.addEventListener('change', function(){
    fm.modulator.frequency.value = modSlider.value;
  });

  gainSlider.addEventListener('change', function(){
    osOsc.frequency.value = gainSlider.value;
  });

  trigButton.addEventListener('click', function (){
    env.trigger();
  });

});

console.log("world");
