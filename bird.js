

function bird (type,audioContext){
  if (! audioContext){
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioContext();
  }

  var presets = generatePresets();

  // Create Oscillators
  var carrierOsc = audioContext.createOscillator();
  var modOsc = audioContext.createOscillator();
  var amOsc = audioContext.createOscillator();

  var modOscGain = audioContext.createGain();
  var amOscGain = audioContext.createGain();

  var mainGain = audioContext.createGain();

  // Connect the various Oscillators and Gains
  modOsc.connect(modOscGain);
  amOsc.connect(amOscGain);

  // Create the AM/FM structures
  var fm = new fmSynth(audioContext, carrierOsc, modOscGain);
  var am = new amSynth(audioContext, fm, amOscGain);

  // Create control envelopes
  var mainEnv = new paramEAD(audioContext, mainGain.gain);
  var mGainEnv = new paramEAD(audioContext,  modOscGain.gain);
  var amGainEnv = new paramEAD(audioContext, amOscGain.gain);
  var modEnv = new paramEAD(audioContext, modOsc.frequency);
  var amEvn = new paramEAD(audioContext, amOsc.frequency);

  params = presets[type] || presets["lesser-spotted-grinchwarbler"];

  // Initialize based on type
  var maxAttackDecayTime = 0.9; //seconds
  var freqMultiplier = 7000;
  var freqOffset = 300;
  var envFreqMultiplier = 3000;

  carrierOsc.frequency.value = freqOffset + freqMultiplier*params[0];//ifrq;
  mainEnv.attackTime = maxAttackDecayTime*params[1]; //atk;
  mainEnv.decayTime = maxAttackDecayTime*params[2]; //dcy;

  modEnv.max = envFreqMultiplier*params[3]; //fmod1;
  modEnv.attackTime = maxAttackDecayTime*params[4]; //atkf1;
  modEnv.decayTime = maxAttackDecayTime*params[5]; //dcyf1;

  amEvn.max = envFreqMultiplier*params[6]; //fmod2;
  amEvn.attackTime = maxAttackDecayTime*params[7]; //atkf2;
  amEvn.decayTime = maxAttackDecayTime*params[8]; //dcyf2;

  mGainEnv.max = params[9];//amod1;
  mGainEnv.attackTime = maxAttackDecayTime*params[10]; //atka1;
  mGainEnv.decayTime = maxAttackDecayTime*params[11]; //dcya1;

  amGainEnv.max = params[12]; //amod2;
  amGainEnv.attackTime = maxAttackDecayTime*params[13]; //atka2;
  amGainEnv.decayTime = maxAttackDecayTime*params[14]; //dcya2;


  // Connect the AM output to destination
  am.connect(mainGain);
  mainGain.connect(audioContext.destination);

  // Start the Oscillators
  mainGain.gain.value = 0;
  carrierOsc.start(0);
  modOsc.start(0);
  amOsc.start(0);

  this.chirp = function (){
    console.log('chirrrrp');
    mainEnv.trigger();
    modEnv.trigger();
    amEvn.trigger();
    mGainEnv.trigger();
    amGainEnv.trigger();
  };

  this.connect = function(output){
    mainGain.disconnect();
    mainGain.connect(output);
  };

}

function fmSynth(audioContext, carrier, modulator, modGain){

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
    carrier.disconnect();
    carrier.connect(audioNode);
  };
}

function amSynth(audioContext, node1, node2){

  var amGain = audioContext.createGain();

  node1.connect(amGain);
  node2.connect(amGain.gain);

  this.connect = function(audioNode){
    amGain.disconnect();
    amGain.connect(audioNode);
  };
}


function paramEAD(audioContext, param, attackTime, decayTime, min, max){

  /* 0.001 - 60dB Drop
  e(-n) = 0.001; - Decay Rate of setTargetAtTime.
  n = 6.90776;
  */
  var t60multiplier = 1.90776;
  var FADE_OUT_TIME = 1;

  this.attackTime = attackTime || 0.9;
  this.decayTime = decayTime || 0.9;

  this.min = min || 0;
  this.max = max || 3000;

  this.trigger = function(){
    var value = param.value;
    param.cancelScheduledValues(audioContext.currentTime);
    param.setValueAtTime(this.min, audioContext.currentTime);
    param.setTargetAtTime(this.max, audioContext.currentTime, this.attackTime);
    param.setTargetAtTime(this.min, audioContext.currentTime+(this.attackTime/t60multiplier), this.decayTime);
    param.setValueAtTime(this.min, audioContext.currentTime+ (this.attackTime/t60multiplier) + (this.decayTime/t60multiplier) + FADE_OUT_TIME) ;
  };
}


function generatePresets(){
  presets = {};
  // ifrq, atk, dcy
  // fmod1, atkf1, dckf1
  // fmod2, atkf2, dckf2
  // amod1, atka1, dcya1
  // amod2, atka2, dcya2
  presets["lesser-spotted-grinchwarbler"] = [0.55102, 0.591837, 0.187755,
                                                                    0.0716327, 0.0204082, 0.346939,
                                                                    0.0204082,  0.55102, 0.122449,
                                                                    0.632653, 1, 0.612245,
                                                                    0.346939, 0.816327, 0.653061];
  return  presets;
}
