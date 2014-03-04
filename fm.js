console.log("hello");

window.AudioContext = window.AudioContext || window.webkitAudioContext;

function fmSynth(audioContext, carrier, modulator, modGain){
  // this.modulatorGain.gain

  if (!carrier.hasOwnProperty('frequency')){
    throw {
      name: "Carrier has no frequency property",
      message: "Attempt to access an inexistant 'frequency' property of the carrier AudioNode " + carrier,
      toString: function () {
        return this.name + ": " + this.message;
      }
    }
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
  amGain.connect(audioContext.destination);
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

      this.min = min || 0;
      this.max = max || 3000;

      var t60multiplier = 6.90776;

      this.trigger = function(){
        var value = param.value;
        param.cancelScheduledValues(audioContext.currentTime);
        param.setValueAtTime(this.min,audioContext.currentTime);
        param.setTargetAtTime(this.max, audioContext.currentTime, this.attackTimeT60);
        param.setTargetAtTime(this.min, audioContext.currentTime+(this.attackTimeT60/6.90776), this.decayTimeT60);
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


    var mainEnv = new paramEAD(audioContext, 0.9, 0.9, mainGain.frequency, 0, 3000);
    var modEnv = new paramEAD(audioContext, 0.9, 0.9, modOsc.frequency, 0, 3000);
    var amEvn = new paramEAD(audioContext, 0.9, 0.9, amOsc.frequency, 0, 3000);
    var mGainEnv = new paramEAD(audioContext, 0.9, 0.9, modOscGain.gain, 0, 1);
    var amGainEnv = new paramEAD(audioContext, 0.9, 0.9, amOscGain.gain, 0, 1);

    var fm = new fmSynth(audioContext, carrierOsc, modOscGain);
    var am = new amSynth(audioContext, fm, amOscGain);
    am.connect(mainGain);
    mainGain.connect(audioContext.destination);


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
        carrierOsc.frequency.value = carrierSlider.value;
      });

      modSlider.addEventListener('change', function(){
        modOsc.frequency.value = modSlider.value;
      });

      gainSlider.addEventListener('change', function(){
        amOsc.frequency.value = gainSlider.value;
      });

      trigButton.addEventListener('click', function (){
        modEnv.trigger();
        amEvn.trigger();
        mGainEnv.trigger();
        amGainEnv.trigger();
      });

    });

console.log("world");
