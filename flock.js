function flock(ac , num, type){
	if (!ac) {
		console.error('AudioContext is required!');
		return;
	}

	if (type === "triple-tailed-tree-troubler"){
		console.log("The triple-tailed-tree-troubler model causes a horrible feedback as a flock. Will debug later");
		return null;
	}

	var CHIRP_SPREAD = 1.5;
	var FREQ_SPREAD = 0.15;
	var ENV_SPREAD = 0.3;

	var birds = [];

	var flockPanner = ac.createPanner();
	flockPanner.panningModel = "equalpower";
	flockPanner.distanceModel = "exponential";
	flockPanner.refDistance = 0.3;


	for (var i = 0; i < num; i++){
		b = new bird(ac, type);
		b.connect(flockPanner);
		birds.push(b);
	}

	var defaultFreq = birds[0].frequency;
	var defaultAttack = birds[0].mainEnvelope.attackTime;
	var defaultDecay = birds[0].mainEnvelope.decayTime;

	this.position = {x:0, y:0, z: 0};
	this.orientation = {x:0, y:0, z: 0};
	this.velocity = {x:0, y:0, z: 0};

	this.positionSpread = 0.5;
	this.orientationSpread = 0.5;


	flockPanner.connect(ac.destination);

	this.connect = function(audioNode){
		flockPanner.connect(audioNode);
	};

	this.chirp = function(time){
		self = this;
		flockPanner.setVelocity(this.velocity.x, this.velocity.y, this.velocity.z);
		birds.forEach(function(bird){
			bird.frequency = defaultFreq+((Math.random()-0.5)*FREQ_SPREAD);
			bird.mainEnvelope.attackTime = defaultAttack+((Math.random()-0.5)*ENV_SPREAD);
			bird.mainEnvelope.decayTime = defaultDecay+((Math.random()-0.5)*ENV_SPREAD);
			bird.position = randomizeVector(self.position, self.positionSpread);
			bird.orientation = randomizeVector(self.orientation, self.orientationSpread);
			bird.chirp(ac.currentTime + ((Math.random()-0.5)*CHIRP_SPREAD));
		});
	};

	function randomizeVector(inputVector, spread){
		var outputVector = inputVector;
		outputVector.x  += Math.random()*spread;
		outputVector.y  += Math.random()*spread;
		outputVector.x  += Math.random()*spread;
		return outputVector;
	}

	function rnd_snd() {
		return (Math.random()*2-1)+(Math.random()*2-1)+(Math.random()*2-1);
	}
}
