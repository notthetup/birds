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

    modOsc.connect(modOscGain);
    amOsc.connect(amOscGain);

    var carrierEnv = new paramEAD(audioContext, 0.9, 0.9, carrierOsc.frequency, 300, 3000);
    var modEnv = new paramEAD(audioContext, 0.9, 0.9, modOsc.frequency, 500, 3000);
    var amEvn = new paramEAD(audioContext, 0.9, 0.9, amOsc.frequency, 100, 3000);

    var fm = new fmSynth(audioContext, carrierOsc, modOscGain);
    var am = new amSynth(audioContext, fm, amOscGain);
    am.connect(audioContext.destination);

    window.setInterval(function (){
      console.log(carrierOsc.frequency.value);
    }, 200);


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
        carrierEnv.trigger();
        modEnv.trigger();
        amEvn.trigger();
      });

    });

    console.log("world");
