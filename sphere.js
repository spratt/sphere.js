/* sphere.js by Simon Pratt
 * see LICENSE file
 * 
 * Note that much of this code started with the "Getting Started"
 * tutorial for three.js available at:
 * http://www.aerotwist.com/tutorials/getting-started-with-three-js/
 */
var sphere = (function(sphere, undefined) {
	// default configuration
	var RADIUS = 1;
	var WIDTH = 1400;
	var HEIGHT = 900;
	var ASPECT = WIDTH / HEIGHT;
	var VIEW_ANGLE = 45;
	var SEGMENTS = 256;
	var RINGS = 256;
	
	// shared variables
	var _scene, _camera, _renderer;
	
	// private helper functions
	var $ = $ || function(id_with_hash) {
		if(id_with_hash[0] !== '#')
			throw new Error('Fake jquery can only load elements by ID');
		return document.getElementById(id_with_hash.substring(1));
	};
	var log = function(s) {
		console.log('sphere.js: ' + s);
	};

	// public methods
	var updateAspectRatio = function() {
		ASPECT = WIDTH / HEIGHT;
	};
	sphere.setWidth = function(newWidth) {
		WIDTH = newWidth;
		updateAspectRatio();
	};
	sphere.setHeight = function(newHeight) {
		HEIGHT = newHeight;
		updateAspectRatio();
	};
	
	sphere.init = function() {
		// get the DOM element to attach to
		var container = $('#container');

		// create renderer, scene, and camera
		_renderer = new THREE.WebGLRenderer();
		_scene = new THREE.Scene();
		sphere.createCamera();

		// attach the render-supplied DOM element
		container.appendChild(_renderer.domElement);

		// announce state
		log('initialized');
		
		// create a new mesh with sphere geometry
		var unit_sphere = new THREE.Mesh(

			new THREE.SphereGeometry(
				RADIUS,
				SEGMENTS,
				RINGS),

			new THREE.MeshLambertMaterial({
				color: 0xCCCCCC,
				opacity: 0.2,
				transparent: true
			})
			
		);

		// add the sphere to the scene
		_scene.add(unit_sphere);

		// announce state
		log('sphere added to scene');

		// add soft white ambient light
		var light = new THREE.AmbientLight( 0x202020 );
		//_scene.add( light );
		
		// create a point light
		var pointLight = new THREE.PointLight(0x404040);

		// set its position
		pointLight.position.x = 10;
		pointLight.position.y = 50;
		pointLight.position.z = 130;

		// add to the scene
		_scene.add(pointLight);

		// announce state
		log('lighting added to scene');
	};

	sphere.createCamera = function() {
		var NEAR = 0.1;
		var FAR = 10000;
		var lat = 0;
		var lon = 0;
		var d = 3;
		
		_camera =
			new THREE.PerspectiveCamera(
				VIEW_ANGLE,
				ASPECT,
				NEAR,
				FAR);

		// the camera starts at 0,0,0
		// so pull it back
		_camera.position.z = d;

		// add the camera to the scene
		_scene.add(_camera);


		sphere.moveCamera = function(lat_d,lon_d,d_d) {
			lat_d = lat_d || 0;
			lon_d = lon_d || 0;
			d_d = d_d || 0;

			lat += lat_d;
			lon += lon_d;
			d += d_d;

			var lat_rads = THREE.Math.degToRad(lat);
			var lon_rads = THREE.Math.degToRad(lon);

			log('camera lat: ' + lat);
			log('camera lon: ' + lon);

			// forget lat for now
			_camera.position.z = Math.cos(lon_rads)*d;
			_camera.position.x = Math.sin(lon_rads)*d;

			log('camera x: ' + _camera.position.x);
			log('camera y: ' + _camera.position.y);
			log('camera z: ' + _camera.position.z);

			_camera.rotation.y = lon_rads;

			sphere.draw();
		};

		sphere.moveCamera();
	};

	var updateCameraAspect = function() {
		_camera.aspect = ASPECT;
		_camera.updateProjectionMatrix();
	};

	sphere.addCircle = function(params) {
		params = params || {};
		var lat = params.lat;
		var lon = params.lon;
		var radius = params.radius || 0.000001;
		var color = params.color || 0xFF0000;
		var opacity = params.opacity || 0.9;
		
		var half_theta = Math.asin(radius);
		var d = Math.cos(half_theta);

		log('radius: ' + radius);
		log('d: ' + d);

		// actually add circle
		var circle = new THREE.Mesh(
			new THREE.CircleGeometry(
				radius,
				SEGMENTS),
			new THREE.MeshLambertMaterial({
				color: color,
				opacity: opacity,
				transparent: true,
				depthTest: false
			})
		);
		circle.position.z = d;

		_scene.add(circle);

		return circle;
	};

	sphere.draw = function() {
		_renderer.setSize(WIDTH, HEIGHT);
		updateCameraAspect();
		_renderer.render(_scene, _camera);
	};

	sphere.main = function() {
		sphere.init();

		// controls
		document.addEventListener('keydown',function(e) {
			log('caught keyboard event with keyCode: ' + e.keyCode);
			switch(e.keyCode) {
			case 81:
				sphere.moveCamera(0,10,0);
				break;
			case 69:
				sphere.moveCamera(0,-10,0);
				break;
			}
		});

		// testing
		var r = -0.1;
		var epsilon = 0.1;
		var circle = null;
		var changeCircle = function() {
			r += epsilon;
			if(r > 1)
				return;
			if(circle !== null)
				_scene.remove(circle);
			circle = sphere.addCircle({
				radius: r
			});
			sphere.draw();
			setTimeout(changeCircle,1000);
		};
		setTimeout(changeCircle,1);
	};
	window.addEventListener('DOMContentLoaded',sphere.main);

	// return modified sphere object
	return sphere;
})(sphere || {});