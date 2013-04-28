var camera, scene, renderer;
var map3d, mazegen, ball;
var lookAtX;
var lookAtY;
var lookAtZ;
var dz;
var rotX;
var keyboard;
var first_elem;


init();
animate();

function init() {
	var index = 0;
    rotX = 0;
    
    keyboard = new THREEx.KeyboardState();
    
    scene = new THREE.Scene();
    scene.add(camera);
    
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );   
    
	ball = new THREE.SphereGeometry(5);
    var material = new THREE.MeshLambertMaterial( {color: 0xFF0000, ambient:  0xFF0000} );		  
    mazegen = new MazeGen();

    mazegen.init();
    map3d = mazegen.gen3dmap( window.innerWidth , window.innerHeight );
    first_elem = map3d[0];
	for ( index = 0; index < map3d.length; index += 1 ) {
        scene.add( map3d[index] );
        console.log('added');
	}

    console.log( 'S->x=     ', first_elem.position.x, ' y=     ', first_elem.position.y, ' z=     ', first_elem.position.z);
    console.log('scale=', first_elem.scale);

    dz = 140;
    var light = new THREE.AmbientLight( 0xFFFFFF ); //PointLight( 0xFFFFFF );
	scene.add( light );


    camera.position.x =  first_elem.position.x + mazegen.tile_size / 4;
    camera.position.y =  first_elem.position.y + 10 + 0;
    camera.position.z = 150;
    
    lookAtX =  first_elem.position.x + mazegen.tile_size / 4;
    lookAtY =  first_elem.position.x + 1;
    lookAtZ = 600;

    var axis = new THREE.AxisHelper(50);

    axis.position.x = lookAtX;
    axis.position.y = lookAtY;
    axis.position.z = lookAtZ;

    scene.add ( axis );

    
    console.log('C->x=     ', camera.position.x, ' y=     ', camera.position.y, ' z=     ', camera.position.z);
    console.log('L->x=     ', lookAtX, ' y=     ', lookAtY, ' z=     ', lookAtZ);
    camera.lookAt(new THREE.Vector3( lookAtX, lookAtY, lookAtZ ));//296
    ball = new THREE.Mesh( ball, material );
    
    ball.position.x = lookAtX;
    ball.position.y = lookAtY + 2;
    ball.position.z = lookAtZ + 2;
    
    scene.add( ball );
    
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	
	document.body.appendChild( renderer.domElement );
    $(renderer.domElement).mousemove(function(event) {
        var msg = "M ";
        msg += event.pageX + ", " + event.pageY;
        $("#mouse").html(msg);
});
	
}

function animate() {
	
	// note: three.js includes requestAnimationFrame shim
	requestAnimationFrame( animate );

    if( keyboard.pressed("p") ) dz += 1.0;
    if( keyboard.pressed("ö") ) dz -= 1.0;

    if (dz > 600) {
        dz = 140;
    }
    
    ball.position.z = -20 + dz;
    camera.position.z = -20 + dz;
    camera.lookAt(new THREE.Vector3( lookAtX, lookAtY , lookAtZ + dz));
    //camera.rotation.z += 0.01;
    //camera.rotation.y += 0.01;

	//first_elem.rotation.x += 0.01;
	//first_elem.rotation.y += 0.02;
	$("#pos").html("C " + camera.position.x + ", " + camera.position.y + ", " + camera.position.z);
	renderer.render( scene, camera );
	
}

