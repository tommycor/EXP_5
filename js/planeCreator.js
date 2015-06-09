function createPlane3D(depth, width,margin, height){
	// first create all the individual vertices
	var geometry = new THREE.Geometry();
	for (var z = 0 ; z < depth ; z++) {
		for (var x = 0 ; x < width ; x++) {
			var y = Math.random()*height;
			var vertex = new THREE.Vector3(x*margin - Math.random()*margin, y,z*margin - Math.random()*margin);
			// var vertex = new THREE.Vector3(x*margin - Math.random()*margin, 0,z*margin - Math.random()*margin);
			vertex.displacement = y;
			geometry.vertices.push(vertex);
		}
	}

	console.log("depth : "+depth*margin);
	console.log("width : "+width*margin);


	for (var z = 0 ; z < depth-1 ; z++) {
		for (var x = 0 ; x < width-1 ; x++) {
			//a,b,c and d are the index of the interesting vertices
			var a = x + z*width;
			var b = (x+1) + (z * width);
			var c = x + ((z+1) * width);
			var d = (x+1) + ((z+1) * width);

			var face1 = new THREE.Face3(b, a, c);
			var face2 = new THREE.Face3(c ,d, b);

			geometry.faces.push(face2);
		}
	}
	
    geometry.computeFaceNormals(true);
    geometry.computeVertexNormals(true);

    var mat = new THREE.MeshBasicMaterial({
        wireframe: true,
        color: 'white'
	});
    

    var plane = new THREE.Mesh(geometry,mat);
    plane.name = 'field';

    // var edges = THREE.EdgesHelper(groundMesh,0x000000);

    // scene.add(edges);

    return plane;
}