
const T60_MULTIPLIER = 6.90776;
const FREQ_MULTIPLIER = 7000;
const FREQ_OFFSET = 300;
const MAX_ATTACK_DECAY_TIME = 0.9;
const ENVELOPE_FREQ_MULTIPLIER = 3000;

export const PRESETS = {
  "lesser-spotted-grinchwarbler": {
    "frequency": 0.55102,
    "globalAttack": 0.591837,
    "globalDecay": 0.187755,
    "fmFreqMaxValue": 0.0716327,
    "fmFreqAttack": 0.0204082,
    "fmFreqDecay": 0.346939,
    "amFreqMaxValue": 0.0204082,
    "amFreqAttack": 0.55102,
    "amFreqDecay": 0.122449,
    "fmGainMaxValue": 0.632653,
    "fmGainAttack": 1,
    "fmGainDecay": 0.612245,
    "amGainMaxValue": 0.346939,
    "amGainAttack": 0.816327,
    "amGainDecay": 0.653061
  },

  "speckled-throated-spew": {
    "frequency": 0.183673,
    "globalAttack": 0.591837,
    "globalDecay": 0.387755,
    "fmFreqMaxValue": 0.0104082,
    "fmFreqAttack": 0.530612,
    "fmFreqDecay": 0.346939,
    "amFreqMaxValue": 0.244898,
    "amFreqAttack": 0.55102,
    "amFreqDecay": 0.122449,
    "fmGainMaxValue": 0.387755,
    "fmGainAttack": 1,
    "fmGainDecay": 0.612245,
    "amGainMaxValue": 0.346939,
    "amGainAttack": 0.816327,
    "amGainDecay": 0.653061
  },

  //triple-tailed-tree-troubler 0.387755 0.0204082 0.204082 0.367347 0.571429 0.734694 0.918367 1 0.77551 0.571429 0.367347 0.22449 0.0204082 0.183673 0.44898
  "triple-tailed-tree-troubler" : {
    "frequency": 0.387755,
    "globalAttack": 0.0204082,
    "globalDecay": 0.204082,
    "fmFreqMaxValue": 0.367347,
    "fmFreqAttack": 0.571429,
    "fmFreqDecay": 0.734694,
    "amFreqMaxValue": 0.918367,
    "amFreqAttack": 1,
    "amFreqDecay": 0.77551,
    "fmGainMaxValue": 0.571429,
    "fmGainAttack": 0.367347,
    "fmGainDecay": 0.22449,
    "amGainMaxValue": 0.0204082,
    "amGainAttack": 0.183673,
    "amGainDecay": 0.44898
  },

  //long-toed-mudhopper 0.163265 0.22449 0.183673 0.00306122 0.122449 1 0.0612245 1 0.77551 0.979592 0.204082 0.734694 1 0.142857 0.612245
  "long-toed-mudhopper" : {
    "frequency": 0.163265,
    "globalAttack": 0.22449,
    "globalDecay": 0.183673,
    "fmFreqMaxValue": 0.00306122,
    "fmFreqAttack": 0.122449,
    "fmFreqDecay": 1,
    "amFreqMaxValue": 0.0612245,
    "amFreqAttack": 1,
    "amFreqDecay": 0.77551,
    "fmGainMaxValue": 0.979592,
    "fmGainAttack": 0.204082,
    "fmGainDecay": 0.734694,
    "amGainMaxValue": 1,
    "amGainAttack": 0.142857,
    "amGainDecay": 0.612245
  },

  //yellow-yiffled-yaffle 0.0204082 0.367347 0.183673 0.0612245 0 1 0.285714 0.22449 0.489796 0.367347 0.387755 0.734694 0.204082 0.428571 0.142857
  "yellow-yiffled-yaffle" : {
    "frequency": 0.0204082,
    "globalAttack": 0.367347,
    "globalDecay": 0.183673,
    "fmFreqMaxValue": 0.0612245,
    "fmFreqAttack": 0,
    "fmFreqDecay": 1,
    "amFreqMaxValue": 0.285714,
    "amFreqAttack": 0.22449,
    "amFreqDecay": 0.489796,
    "fmGainMaxValue": 0.367347,
    "fmGainAttack": 0.387755,
    "fmGainDecay": 0.734694,
    "amGainMaxValue": 0.204082,
    "amGainAttack": 0.428571,
    "amGainDecay": 0.142857
  },

  //pointy-beaked-beetlefiend 0.428571 0.204082 0.489796 0.0204082 0.795918 0.591837 0.285714 0.22449 0.489796 0.204082 0.836735 0.734694 0.77551 0.428571 0.142857
  "pointy-beaked-beetlefiend" : {
    "frequency": 0.388571,
    "globalAttack": 0.204082,
    "globalDecay": 0.309796,
    "fmFreqMaxValue": 0.0204082,
    "fmFreqAttack": 0.795918,
    "fmFreqDecay": 0.591837,
    "amFreqMaxValue": 0.285714,
    "amFreqAttack": 0.22449,
    "amFreqDecay": 0.489796,
    "fmGainMaxValue": 0.204082,
    "fmGainAttack": 0.836735,
    "fmGainDecay": 0.734694,
    "amGainMaxValue": 0.77551,
    "amGainAttack": 0.428571,
    "amGainDecay": 0.142857
  },

  //african-boojuboolubala 0.306122 0.959184 0.0408163 1 0 0.591837 0.285714 0.22449 0.489796 0.204082 0.836735 0.734694 0.77551 0.428571 0.142857
  "african-boojuboolubala" :  {
    "frequency": 0.306122,
    "globalAttack": 0.959184,
    "globalDecay": 0.0408163,
    "fmFreqMaxValue": 1,
    "fmFreqAttack": 0,
    "fmFreqDecay": 0.591837,
    "amFreqMaxValue": 0.285714,
    "amFreqAttack": 0.22449,
    "amFreqDecay": 0.489796,
    "fmGainMaxValue": 0.204082,
    "fmGainAttack": 0.836735,
    "fmGainDecay": 0.734694,
    "amGainMaxValue": 0.77551,
    "amGainAttack": 0.428571,
    "amGainDecay": 0.142857
  },

  //common-muckoink 0.0204082 0.8 0.0816327 0.0204082 0.001 0.99 0.0204082 0.01 1 1 0.142857 0.734694 1 0.0612245 0.530612
  "common-muckoink": {
    "frequency": 0.0204082,
    "globalAttack": 0.8,
    "globalDecay": 0.0816327,
    "fmFreqMaxValue": 0.0204082,
    "fmFreqAttack": 0.001,
    "fmFreqDecay": 0.99,
    "amFreqMaxValue": 0.0204082,
    "amFreqAttack": 0.01,
    "amFreqDecay": 1,
    "fmGainMaxValue": 1,
    "fmGainAttack": 0.142857,
    "fmGainDecay": 0.734694,
    "amGainMaxValue": 1,
    "amGainAttack": 0.0612245,
    "amGainDecay": 0.530612
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
    this.setFrequency(parameters.frequency)

    this.mainEnvelope.attackTime = MAX_ATTACK_DECAY_TIME*parameters.globalAttack;
    this.mainEnvelope.decayTime = MAX_ATTACK_DECAY_TIME*parameters.globalDecay;

    this.fmFrequencyEnvelope.maxValue = ENVELOPE_FREQ_MULTIPLIER*parameters.fmFreqMaxValue;
    this.fmFrequencyEnvelope.attackTime = MAX_ATTACK_DECAY_TIME*parameters.fmFreqAttack;
    this.fmFrequencyEnvelope.decayTime = MAX_ATTACK_DECAY_TIME*parameters.fmFreqDecay;

    this.amFrequencyEnvelope.maxValue = ENVELOPE_FREQ_MULTIPLIER*parameters.amFreqMaxValue;
    this.amFrequencyEnvelope.attackTime = MAX_ATTACK_DECAY_TIME*parameters.amFreqAttack;
    this.amFrequencyEnvelope.decayTime = MAX_ATTACK_DECAY_TIME*parameters.amFreqDecay;

    this.fmGainEnvelope.maxValue = parameters.fmGainMaxValue;
    this.fmGainEnvelope.attackTime = MAX_ATTACK_DECAY_TIME*parameters.fmGainAttack;
    this.fmGainEnvelope.decayTime = MAX_ATTACK_DECAY_TIME*parameters.fmGainDecay;

    this.amGainEnvelope.maxValue = -parameters.amGainMaxValue;
    this.amGainEnvelope.attackTime = MAX_ATTACK_DECAY_TIME*parameters.amGainAttack;
    this.amGainEnvelope.decayTime = MAX_ATTACK_DECAY_TIME*parameters.amGainDecay;

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