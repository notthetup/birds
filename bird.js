

function bird (audioContext, type){

  if (!audioContext) {
    console.error('AudioContext is required!');
    return;
  }

  var freqMultiplier = 7000;
  var freqOffset = 300;
  var maxAttackDecayTime = 0.9; //seconds
  var envFreqMultiplier = 3000;

  var panner = audioContext.createPanner();
  panner.panningModel = "equalpower";
  panner.distanceModel = "exponential";
  panner.refDistance = 0.3;

  var presets = generatePresets();

  var params = presets[type] || presets["lesser-spotted-grinchwarbler"];


  var _frequency = params.ifrq;
  Object.defineProperty( this, 'frequency', {
    enumerable: true,
    set: function ( value ) {
      _frequency = value;
      fm.modulatorGain.gain.value = freqOffset + freqMultiplier * value;
      carrierOsc.frequency.value = freqOffset + freqMultiplier * value;
    },
    get: function (){
      return _frequency;
    }
  });

  var _position = {x:0, y:0, z: 0};
  Object.defineProperty( this, 'position', {
    enumerable: true,
    set: function ( value ) {
      _position = value;
      panner.setPosition(value.x, value.y, value.z);
    },
    get: function (){
      return _position;
    }
  });

  var _orientation = {x:0, y:0, z: 0};
  Object.defineProperty( this, 'orientation', {
    enumerable: true,
    set: function ( value ) {
      _orientation = value;
      panner.setOrientation(value.x, value.y, value.z);
    },
    get: function (){
      return _orientation;
    }
  });

  var _velocity = {x:0, y:0, z: 0};
  Object.defineProperty( this, 'velocity', {
    enumerable: true,
    set: function ( value ) {
      _velocity = value;
      panner.setVelocity(value.x, value.y, value.z);
    },
    get: function (){
      return _velocity;
    }
  });

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
  this.mainEnvelope = new paramEAD(audioContext, mainGain.gain);
  this.fmFrequencyEnvelope = new paramEAD(audioContext, modOsc.frequency);
  this.amFrequencyEnvelope = new paramEAD(audioContext, amOsc.frequency);
  this.fmGainEnvelope = new paramEAD(audioContext,  modOscGain.gain);
  this.amGainEnvelope = new paramEAD(audioContext, amOscGain.gain);

  // Connect the AM output to destination
  am.connect(mainGain);
  mainGain.connect(panner);
  panner.connect(audioContext.destination);



  this.applyParams = function(params) {


    //  console.log(params);

    this.frequency = params.ifrq;

    this.mainEnvelope.attackTime = maxAttackDecayTime*params.atk;
    this.mainEnvelope.decayTime = maxAttackDecayTime*params.dcy;

    this.fmFrequencyEnvelope.max = envFreqMultiplier*params.fmod1;
    this.fmFrequencyEnvelope.attackTime = maxAttackDecayTime*params.atkf1;
    this.fmFrequencyEnvelope.decayTime = maxAttackDecayTime*params.dcyf1;

    this.amFrequencyEnvelope.max = envFreqMultiplier*params.fmod2;
    this.amFrequencyEnvelope.attackTime = maxAttackDecayTime*params.atkf2;
    this.amFrequencyEnvelope.decayTime = maxAttackDecayTime*params.dcyf2;

    this.fmGainEnvelope.max = params.amod1;
    this.fmGainEnvelope.attackTime = maxAttackDecayTime*params.atka1;
    this.fmGainEnvelope.decayTime = maxAttackDecayTime*params.dcya1;

    this.amGainEnvelope.max = params.amod2;
    this.amGainEnvelope.attackTime = maxAttackDecayTime*params.atka2;
    this.amGainEnvelope.decayTime = maxAttackDecayTime*params.dcya2;

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
    this.mainEnvelope.trigger(time);
    this.fmFrequencyEnvelope.trigger(time);
    this.amFrequencyEnvelope.trigger(time);
    this.fmGainEnvelope.trigger(time);
    this.amGainEnvelope.trigger(time);
  };

  this.connect = function(output){
    panner.disconnect();
    panner.connect(output);
  };


  this.applyParams(params);

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
    var startTime = time || audioContext.currentTime;
    //console.log(startTime);
    var value = param.value;
    param.cancelScheduledValues(startTime);
    param.setValueAtTime(this.min, startTime);
    param.setTargetAtTime(this.max, startTime, this.attackTime);
    param.setTargetAtTime(this.min, startTime + (this.attackTime/t60multiplier), this.decayTime);
    //param.setValueAtTime(this.min, startTime + (this.attackTime/t60multiplier) + (this.decayTime/t60multiplier) + FADE_OUT_TIME);
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

  //speckled-throated-spew 0.183673 0.591837 0.387755 0.0104082 0.530612 0.346939 0.244898 0.55102 0.122449 0.387755 1 0.612245 0.346939 0.816327 0.653061
  presets["speckled-throated-spew"] = {
    "ifrq": 0.183673,
    "atk": 0.591837,
    "dcy": 0.127755,
    "fmod1": 0.0104082,
    "atkf1": 0.530612,
    "dcyf1": 0.346939,
    "fmod2": 0.244898,
    "atkf2": 0.55102,
    "dcyf2": 0.122449,
    "amod1": 0.387755,
    "atka1": 1,
    "dcya1": 0.612245,
    "amod2": 0.346939,
    "atka2": 0.816327,
    "dcya2": 0.653061
  };

  // ringy
  //triple-tailed-tree-troubler 0.387755 0.0204082 0.204082 0.367347 0.571429 0.734694 0.918367 1 0.77551 0.571429 0.367347 0.22449 0.0204082 0.183673 0.44898
  presets["triple-tailed-tree-troubler"] = {
    "ifrq": 0.387755,
    "atk": 0.0204082,
    "dcy": 0.204082,
    "fmod1": 0.367347,
    "atkf1": 0.571429,
    "dcyf1": 0.734694,
    "fmod2": 0.918367,
    "atkf2": 1,
    "dcyf2": 0.77551,
    "amod1": 0.571429,
    "atka1": 0.367347,
    "dcya1": 0.22449,
    "amod2": 0.0204082,
    "atka2": 0.183673,
    "dcya2": 0.44898
  };

  //long-toed-mudhopper 0.163265 0.22449 0.183673 0.00306122 0.122449 1 0.0612245 1 0.77551 0.979592 0.204082 0.734694 1 0.142857 0.612245
  presets["long-toed-mudhopper"] = {
    "ifrq": 0.163265,
    "atk": 0.22449,
    "dcy": 0.183673,
    "fmod1": 0.00306122,
    "atkf1": 0.122449,
    "dcyf1": 1,
    "fmod2": 0.0612245,
    "atkf2": 1,
    "dcyf2": 0.77551,
    "amod1": 0.979592,
    "atka1": 0.204082,
    "dcya1": 0.734694,
    "amod2": 1,
    "atka2": 0.142857,
    "dcya2": 0.612245
  };

  //yellow-yiffled-yaffle 0.0204082 0.367347 0.183673 0.0612245 0 1 0.285714 0.22449 0.489796 0.367347 0.387755 0.734694 0.204082 0.428571 0.142857
  presets["yellow-yiffled-yaffle"] = {
    "ifrq": 0.0204082,
    "atk": 0.367347,
    "dcy": 0.183673,
    "fmod1": 0.0612245,
    "atkf1": 0,
    "dcyf1": 1,
    "fmod2": 0.285714,
    "atkf2": 0.22449,
    "dcyf2": 0.489796,
    "amod1": 0.367347,
    "atka1": 0.387755,
    "dcya1": 0.734694,
    "amod2": 0.204082,
    "atka2": 0.428571,
    "dcya2": 0.142857
  };

  //pointy-beaked-beetlefiend 0.428571 0.204082 0.489796 0.0204082 0.795918 0.591837 0.285714 0.22449 0.489796 0.204082 0.836735 0.734694 0.77551 0.428571 0.142857
  presets["pointy-beaked-beetlefiend"] = {
    "ifrq": 0.428571,
    "atk": 0.204082,
    "dcy": 0.489796,
    "fmod1": 0.0204082,
    "atkf1": 0.795918,
    "dcyf1": 0.591837,
    "fmod2": 0.285714,
    "atkf2": 0.22449,
    "dcyf2": 0.489796,
    "amod1": 0.204082,
    "atka1": 0.836735,
    "dcya1": 0.734694,
    "amod2": 0.77551,
    "atka2": 0.428571,
    "dcya2": 0.142857
  };

  //african-boojuboolubala 0.306122 0.959184 0.0408163 1 0 0.591837 0.285714 0.22449 0.489796 0.204082 0.836735 0.734694 0.77551 0.428571 0.142857
  presets["african-boojuboolubala"] = {
    "ifrq": 0.306122,
    "atk": 0.959184,
    "dcy": 0.0408163,
    "fmod1": 1,
    "atkf1": 0,
    "dcyf1": 0.591837,
    "fmod2": 0.285714,
    "atkf2": 0.22449,
    "dcyf2": 0.489796,
    "amod1": 0.204082,
    "atka1": 0.836735,
    "dcya1": 0.734694,
    "amod2": 0.77551,
    "atka2": 0.428571,
    "dcya2": 0.142857
  };

  //common-muckoink 0.0204082 0.8 0.0816327 0.0204082 0.001 0.99 0.0204082 0.01 1 1 0.142857 0.734694 1 0.0612245 0.530612
  presets["common-muckoink"] = {
    "ifrq": 0.0204082,
    "atk": 0.8,
    "dcy": 0.0816327,
    "fmod1": 0.0204082,
    "atkf1": 0.001,
    "dcyf1": 0.99,
    "fmod2": 0.0204082,
    "atkf2": 0.01,
    "dcyf2": 1,
    "amod1": 1,
    "atka1": 0.142857,
    "dcya1": 0.734694,
    "amod2": 1,
    "atka2": 0.0612245,
    "dcya2": 0.530612
  };

  return  presets;
}
