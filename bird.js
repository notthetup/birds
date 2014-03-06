

function bird (audioContext, type){

  if (!audioContext) {
    console.error('AudioContext is required!');
    return;
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
  var modEnv = new paramEAD(audioContext, modOsc.frequency);
  var amEvn = new paramEAD(audioContext, amOsc.frequency);
  var mGainEnv = new paramEAD(audioContext,  modOscGain.gain);
  var amGainEnv = new paramEAD(audioContext, amOscGain.gain);

  params = presets[type] || presets["lesser-spotted-grinchwarbler"];

  // Initialize based on type
  var maxAttackDecayTime = 0.9; //seconds
  var freqMultiplier = 7000;
  var freqOffset = 300;
  var envFreqMultiplier = 3000;

  // Connect the AM output to destination
  am.connect(mainGain);
  mainGain.connect(audioContext.destination);

  this.update = function(params) {

    //  console.log(params);

    fm.modulatorGain.gain.value = freqOffset + freqMultiplier * params.ifrq;
    carrierOsc.frequency.value = freqOffset + freqMultiplier * params.ifrq;
    mainEnv.attackTime = maxAttackDecayTime*params.atk;
    mainEnv.decayTime = maxAttackDecayTime*params.dcy;

    modEnv.max = envFreqMultiplier*params.fmod1;
    modEnv.attackTime = maxAttackDecayTime*params.atkf1;
    modEnv.decayTime = maxAttackDecayTime*params.dcyf1;

    amEvn.max = envFreqMultiplier*params.fmod2;
    amEvn.attackTime = maxAttackDecayTime*params.atkf2;
    amEvn.decayTime = maxAttackDecayTime*params.dcyf2;

    mGainEnv.max = params.amod1;
    mGainEnv.attackTime = maxAttackDecayTime*params.atka1;
    mGainEnv.decayTime = maxAttackDecayTime*params.dcya1;

    amGainEnv.max = params.amod2;
    amGainEnv.attackTime = maxAttackDecayTime*params.atka2;
    amGainEnv.decayTime = maxAttackDecayTime*params.dcya2;

  };

  this.chirp = function (time){
    // Start the Oscillators
    if (carrierOsc.playbackState == carrierOsc.UNSCHEDULED_STATE){
      mainGain.gain.value = 0;
      carrierOsc.start(0);
      modOsc.start(0);
      amOsc.start(0);
    }

    console.log('chirrrrp');
    mainEnv.trigger(time);
    modEnv.trigger(time);
    amEvn.trigger(time);
    mGainEnv.trigger(time);
    amGainEnv.trigger(time);
  };

  this.connect = function(output){
    mainGain.disconnect();
    mainGain.connect(output);
  };


  this.update(params);

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
  this.max = max || 1;

  this.trigger = function(time){
    var startTime = audioContext.currentTime + (time || 0);
    //console.log(startTime);
    var value = param.value;
    param.cancelScheduledValues(startTime);
    param.setValueAtTime(this.min, startTime);
    param.setTargetAtTime(this.max, startTime, this.attackTime);
    param.setTargetAtTime(this.min, startTime + (this.attackTime/t60multiplier), this.decayTime);
    param.setValueAtTime(this.min, startTime + (this.attackTime/t60multiplier) + (this.decayTime/t60multiplier) + FADE_OUT_TIME) ;
  };
}


function generatePresets(){
  presets = {};

  presets["lesser-spotted-grinchwarbler"] = {
    "ifrq": 0.55102,
    "atk": 0.591837,
    "dcy": 0.187755,
    "fmod1": 0.0716327,
    "atkf1": 0.0204082,
    "dcyf1": 0.346939,
    "fmod2": 0.0204082,
    "atkf2": 0.55102,
    "dcyf2": 0.122449,
    "amod1": 0.632653,
    "atka1": 1,
    "dcya1": 0.612245,
    "amod2": 0.346939,
    "atka2": 0.816327,
    "dcya2": 0.653061
  };

  return  presets;
}
