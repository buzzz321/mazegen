
function MazeGen() {
	this.R = 0;
	this.C = 1;
}

MazeGen.prototype.init = function() {
	this.map = [		
		{ 'coord': [1,5], 'type': 1 },
		{ 'coord': [2,5], 'type': 1 },
		{ 'coord': [3,5], 'type': 1 },
		{ 'coord': [4,5], 'type': 2 },
		{ 'coord': [4,4], 'type': 3 },
		{ 'coord': [5,4], 'type': 1 },
		{ 'coord': [6,4], 'type': 4 },
		{ 'coord': [6,3], 'type': 5 },
		{ 'coord': [7,4], 'type': 1 },
		{ 'coord': [8,4], 'type': 6 },
		{ 'coord': [8,5], 'type': 7 },
		{ 'coord': [8,6], 'type': 8 },
		{ 'coord': [7,6], 'type': 1 },
		{ 'coord': [6,6], 'type': 1 },
		{ 'coord': [5,6], 'type': 1 },
		{ 'coord': [4,6], 'type': 9 }];

	return this.map;
}

// Rotate an object around an arbitrary axis in object space
MazeGen.prototype.rotateAroundObjectAxis = function(object, axis, radians) {
    var rotObjectMatrix = new THREE.Matrix4();
    
    rotObjectMatrix.makeRotationAxis(axis.normalize(), radians);
    object.matrix.multiply(rotObjectMatrix);      // post-multiply
    object.rotation.setEulerFromRotationMatrix(object.matrix);

    return object;
}

MazeGen.prototype.genwall = function( x_start, y_start, size, type ) {
	var walls = [];
    var yAxis = new THREE.Vector3(0,1,0);
    //----------------------------------- width, height, widthSegments, heightSegments
	var plane = new THREE.PlaneGeometry( size/2, size, 1, 1 );
	var color = new THREE.Color( 0x090909 );
	var material = new THREE.MeshLambertMaterial( {color: color } );


    var mesh = new THREE.Mesh( plane, material );

    mesh = this.rotateAroundObjectAxis( mesh, yAxis, -Math.PI/2);

    mesh.position.x = x_start - size/4;
    mesh.position.y = y_start;
    mesh.position.z = 1;

    console.log( 'wall_x=', mesh.position.x, ' wall_y=', mesh.position.y);
    return mesh;
}

MazeGen.prototype.gen3dmap = function( width, height ) {
	var map3d = [];
	var tile_size = 50;
	var index = 0;
	var plane = new THREE.PlaneGeometry( tile_size, tile_size, 1, 1 );
	var color = new THREE.Color( 0xA9A9A9 );
	var material = new THREE.MeshLambertMaterial( {color: color } );
	var xAxis = new THREE.Vector3(1,0,0);
    
	for( index = 0; index < this.map.length; index += 1 ){
		var mesh = new THREE.Mesh( plane, material );

        mesh = this.rotateAroundObjectAxis( mesh, xAxis, Math.PI/2);
		mesh.position.x = this.map[index].coord[this.C] * tile_size;
		mesh.position.z = this.map[index].coord[this.R] * tile_size;
		mesh.position.y = width / 2;

        console.log( 'x=     ', mesh.position.x, ' y=     ', mesh.position.y, ' z=     ', mesh.position.z);
		map3d.push( mesh );
        //if ( index === 0){
        //    map3d.push( this.genwall( mesh.position.x, mesh.position.y, tile_size, 1));
        //}
				
	}

	return map3d;
}
