
const T60_MULTIPLIER = 6.90776;
const FREQ_MULTIPLIER = 7000;
const FREQ_OFFSET = 300;
const MAX_ATTACK_DECAY_TIME = 0.9;
const ENVELOPE_FREQ_MULTIPLIER = 3000;

export const PRESETS = {
  "lesser-spotted-grinchwarbler": {
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
  },

  "speckled-throated-spew": {
    "ifrq": 0.183673,
    "atk": 0.591837,
    "dcy": 0.387755,
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
  },

  //triple-tailed-tree-troubler 0.387755 0.0204082 0.204082 0.367347 0.571429 0.734694 0.918367 1 0.77551 0.571429 0.367347 0.22449 0.0204082 0.183673 0.44898
  "triple-tailed-tree-troubler" : {
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
  },

  //long-toed-mudhopper 0.163265 0.22449 0.183673 0.00306122 0.122449 1 0.0612245 1 0.77551 0.979592 0.204082 0.734694 1 0.142857 0.612245
  "long-toed-mudhopper" : {
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
  },

  //yellow-yiffled-yaffle 0.0204082 0.367347 0.183673 0.0612245 0 1 0.285714 0.22449 0.489796 0.367347 0.387755 0.734694 0.204082 0.428571 0.142857
  "yellow-yiffled-yaffle" : {
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
  },

  //pointy-beaked-beetlefiend 0.428571 0.204082 0.489796 0.0204082 0.795918 0.591837 0.285714 0.22449 0.489796 0.204082 0.836735 0.734694 0.77551 0.428571 0.142857
  "pointy-beaked-beetlefiend" : {
    "ifrq": 0.388571,
    "atk": 0.204082,
    "dcy": 0.309796,
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
  },

  //african-boojuboolubala 0.306122 0.959184 0.0408163 1 0 0.591837 0.285714 0.22449 0.489796 0.204082 0.836735 0.734694 0.77551 0.428571 0.142857
  "african-boojuboolubala" :  {
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
  },

  //common-muckoink 0.0204082 0.8 0.0816327 0.0204082 0.001 0.99 0.0204082 0.01 1 1 0.142857 0.734694 1 0.0612245 0.530612
  "common-muckoink": {
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
  }
}

export class Bird {
  constructor(audioContext) {
    this.audioContext = audioContext
    this.am = new BirdAM(audioContext);
    this.fm = new BirdFM(audioContext);
    this.outputGain = new GainNode(audioContext);
    this.fm.connect(this.am.getMixerNode());
    this.am.connect(this.outputGain);
    this.started = false;

    this.mainEnvelope = new EnvelopeADSR(audioContext, this.outputGain.gain);
    this.fmFrequencyEnvelope = new EnvelopeADSR(audioContext, this.fm.getModulatorFrequency());
    this.amFrequencyEnvelope = new EnvelopeADSR(audioContext, this.am.getModulatorFrequency());
    this.fmGainEnvelope = new EnvelopeADSR(audioContext, this.fm.getModulatorGain());
    this.amGainEnvelope = new EnvelopeADSR(audioContext, this.am.getModulatorGain());
  }

  connect(destination) {
    this.outputGain.connect(destination)
  }

  disconnect() {
    this.outputGain.disconnect()
  }

  setup(parameters) {
    console.log(JSON.stringify(parameters, null, '\t' ));
    this.setFrequency(parameters.ifrq)

    this.mainEnvelope.attackTime = MAX_ATTACK_DECAY_TIME*parameters.atk;
    this.mainEnvelope.decayTime = MAX_ATTACK_DECAY_TIME*parameters.dcy;

    this.fmFrequencyEnvelope.maxValue = ENVELOPE_FREQ_MULTIPLIER*parameters.fmod1;
    this.fmFrequencyEnvelope.attackTime = MAX_ATTACK_DECAY_TIME*parameters.atkf1;
    this.fmFrequencyEnvelope.decayTime = MAX_ATTACK_DECAY_TIME*parameters.dcyf1;

    this.amFrequencyEnvelope.maxValue = ENVELOPE_FREQ_MULTIPLIER*parameters.fmod2;
    this.amFrequencyEnvelope.attackTime = MAX_ATTACK_DECAY_TIME*parameters.atkf2;
    this.amFrequencyEnvelope.decayTime = MAX_ATTACK_DECAY_TIME*parameters.dcyf2;

    this.fmGainEnvelope.maxValue = parameters.amod1;
    this.fmGainEnvelope.attackTime = MAX_ATTACK_DECAY_TIME*parameters.atka1;
    this.fmGainEnvelope.decayTime = MAX_ATTACK_DECAY_TIME*parameters.dcya1;

    this.amGainEnvelope.maxValue = -parameters.amod2;
    this.amGainEnvelope.attackTime = MAX_ATTACK_DECAY_TIME*parameters.atka2;
    this.amGainEnvelope.decayTime = MAX_ATTACK_DECAY_TIME*parameters.dcya2;

  }

  setFrequency(frequency) {
    const val = FREQ_OFFSET+FREQ_MULTIPLIER*frequency;
    this.fm.setCarrierFrequencyValue(val);
  }

  chirp(startTime) {
    // Start the Oscillators
    if (!this.started) {
      this.outputGain.gain.value = 0;
      this.fm.start(0);
      this.am.start(0);
      this.started = true;
    }

    this.mainEnvelope.trigger(startTime);
    this.fmFrequencyEnvelope.trigger(startTime);
    this.amFrequencyEnvelope.trigger(startTime);
    this.fmGainEnvelope.trigger(startTime);
    this.amGainEnvelope.trigger(startTime);
  }
}

class BirdAM {
  constructor(audioContext) {
    this.modulatorOsc = new OscillatorNode(audioContext);
    this.modulatorOscGain = new GainNode(audioContext);
    this.modulatorGain = new GainNode(audioContext);

    this.modulatorOsc.connect(this.modulatorOscGain);
    this.modulatorOscGain.connect(this.modulatorGain.gain);

    this.modulatorGain.gain.value = 1;
  }

  connect(destination) {
    this.modulatorGain.connect(destination)
  }

  start(time) {
    this.modulatorOsc.start(time);
  }

  disconnect() {
    this.modulatorGain.disconnect()
  }

  getModulatorFrequency() {
    return this.modulatorOsc.frequency;
  }

  getModulatorGain() {
    return this.modulatorOscGain.gain;
  }

  getMixerNode() {
    return this.modulatorGain;
  }
}


class BirdFM {
  constructor(audioContext) {
    this.modulatorOsc = new OscillatorNode(audioContext);
    this.modulatorOscGain = new GainNode(audioContext);
    this.modulatorGain = new GainNode(audioContext);
    this.carrierOsc = new OscillatorNode(audioContext);

    this.modulatorOsc.connect(this.modulatorOscGain);
    this.modulatorOscGain.connect(this.modulatorGain);
    this.modulatorGain.connect(this.carrierOsc.frequency);

    this.modulatorGain.gain.value = 300;
  }

  connect(destination) {
    this.carrierOsc.connect(destination)
  }

  disconnect() {
    this.carrierOsc.disconnect()
  }

  start(time) {
    this.carrierOsc.start(time);
    this.modulatorOsc.start(time);
  }

  getModulatorFrequency() {
    return this.modulatorOsc.frequency;
  }

  getModulatorGain() {
    return this.modulatorOscGain.gain;
  }

  setCarrierFrequencyValue(frequency) {
    this.modulatorGain.gain.value = frequency;
    this.carrierOsc.frequency.value = frequency
  }
}

class EnvelopeADSR {
  constructor(audioContext, parameter, attackTime = 0.9, decayTime = 0.9, minVal = 0, maxVal = 1) {
    this.audioContext = audioContext
    this.parameter = parameter
    this.attackTime = attackTime
    this.decayTime = decayTime
    this.minValue = minVal
    this.maxValue = maxVal
    this.oneSampleDelay = 1.0 / this.audioContext.sampleRate
  }

  trigger(startTime) {
    var startTime = startTime || this.audioContext.currentTime;
    this.parameter.cancelScheduledValues(startTime);
    this.parameter.setValueAtTime(this.minValue, startTime);
    this.parameter.setTargetAtTime(this.maxValue, startTime, this.attackTime / T60_MULTIPLIER);
    this.parameter.setTargetAtTime(this.minValue, startTime + this.attackTime + this.oneSampleDelay, this.decayTime / T60_MULTIPLIER);
  }
}