
function MazeGen() {
	this.R = 0;
	this.C = 1;
    this.xstart = 50;
    this.ystart = 50;
    this.tile_size = 300;
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


MazeGen.prototype.genwall = function( x_start, y_start, size, type ) {
	var walls = [];
    //----------------------------------- width, height, widthSegments, heightSegments
	var plane = new THREE.PlaneGeometry( size/2, size, 1, 1 );
	var color = new THREE.Color( 0x090909 );
	var material = new THREE.MeshLambertMaterial( {color: color, ambient:  color } );


    var mesh = new THREE.Mesh( plane, material );

    mesh.rotation.y = -Math.PI/2;

    mesh.position.x = x_start - size/4;
    mesh.position.y = y_start;
    mesh.position.z = 1;

    console.log( 'wall_x=', mesh.position.x, ' wall_y=', mesh.position.y);
    return mesh;
}

MazeGen.prototype.gen3dmap = function( width, height ) {
	var map3d = [];
	var index = 0;
	var cube = new THREE.CubeGeometry( this.tile_size, this.tile_size, 5, 1, 1, 1 );
	var color = new THREE.Color( 0xA9A9A9 );
	var material = new THREE.MeshLambertMaterial( {color: color, ambient:  color } );
    
	for( index = 0; index < this.map.length; index += 1 ){
		var mesh = new THREE.Mesh( cube, material );
        
        mesh.rotation.x = Math.PI/2;
		mesh.position.x = this.map[index].coord[this.C] * this.xstart;
		mesh.position.z = this.map[index].coord[this.R] * this.ystart + 100;
		mesh.position.y = 20;

        console.log( '->x=     ', mesh.position.x, ' y=     ', mesh.position.y, ' z=     ', mesh.position.z);
		map3d.push( mesh );
        //if ( index === 0){
        //    map3d.push( this.genwall( mesh.position.x, mesh.position.y, this.tile_size, 1));
        //}
		
	}

	return map3d;
}
