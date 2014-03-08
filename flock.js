function flock(ac , num){
	if (!ac) {
		console.error('AudioContext is required!');
		return;
	}

	var CHIRP_SPREAD = 1.5;
	var FREQ_SPREAD = 0.3;

	var birds = [];

	var flockPanner = ac.createPanner();

	for (var i = 0; i < num; i++){
		b = new bird(ac);
		b.connect(flockPanner);
		birds.push(b);
	}

	var defaultFreq = birds[0].frequency;

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
			bird.frequency = defaultFreq+(Math.random()*FREQ_SPREAD);
			bird.position = randomizeVector(self.position, self.positionSpread);
			bird.orientation = randomizeVector(self.orientation, self.orientationSpread);
			bird.chirp(ac.currentTime + (Math.random()*CHIRP_SPREAD));
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
