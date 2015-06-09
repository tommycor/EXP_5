function Wave(center, mesh, vitesse, maxAmplitude, longOnde, diameter, duration, frequence, attributes){
	this.center = center;
	this.mesh = mesh;
	this.vitesse = vitesse;
	this.maxAmplitude = maxAmplitude;
	this.longOnde = longOnde;
	this.diameter = diameter;
	this.begining = Date.now();
	this.currentTime = Date.now();
	this.duration = duration;
	this.frequence = frequence;
	this.attributes = attributes;

	// (Math.random() * 2) - 1

	this.last = [];
	for (var i=0 ; i<mesh.geometry.vertices.length ; i++)
	{
		this.last[i] = 0;
	}

	var normalized = mesh.geometry.vertices[0].setLength(12);

	this.update = function(){
		this.currentTime = (Date.now() - this.begining);

		this.facteurTime = -((this.currentTime)*(1/this.duration))+1;


		for(var i=0 ; i<mesh.geometry.vertices.length ; i++)
		{
			var distance = getDistance(this.center, mesh.geometry.vertices[i]);
			var delay = distance / this.vitesse;
			var amplitude = getAmplitude(this.maxAmplitude, distance, this.diameter);

			if(amplitude > 0){
				var mover = Math.sin((delay*this.longOnde)-((this.currentTime)/this.frequence))*amplitude*this.facteurTime;
				// mesh.geometry.vertices[i].y = (mesh.geometry.vertices[i].y - this.last[i]) + mover;
				attributes.displacement.value[i] += mover - this.last[i];
				// attributes.displacement.value[i] = mover - this.last[i];
				this.last[i] = mover;
			}
			else{
				this.last[i] = 0;
			}
		}
		// attributes.displacement.needsUpdate = true;
	}
	// attributes.displacement.needsUpdate = true;
}


function getDistance(center, target){

	var dist = {
		x: target.x - center.x ,
		y: target.y - center.y ,
		z: target.z - center.z
	}

	dist = Math.sqrt(dist.x*dist.x + dist.z*dist.z + dist.y*dist.y);
	return dist
}

function getAmplitude(maxAmplitude, distance, diametere){
	var amplitude = (distance * (-maxAmplitude/((depth*margin)/diameter))) + maxAmplitude;

	return amplitude;
}