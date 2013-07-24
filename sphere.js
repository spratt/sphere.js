/* sphere.js by Simon Pratt
 * see LICENSE file
 * 
 * Note that much of this code started with the "Getting Started"
 * tutorial for three.js available at:
 * http://www.aerotwist.com/tutorials/getting-started-with-three-js/
 */
var sphere = (function(sphere, undefined) {
	// default configuration
	var WIDTH = 900;
	var HEIGHT = 900;
	var ASPECT = WIDTH / HEIGHT;
	var VIEW_ANGLE = 45;
	
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
	sphere.setViewAngle = function(newAngle) {
		VIEW_ANGLE = newAngle;
	};
	
	sphere.init = function() {
		// get the DOM element to attach to
		var container = $('#container');
		
		var NEAR = 0.1;
		var FAR = 10000;

		// create a WebGL renderer, camera
		// and a scene
		_renderer = new THREE.WebGLRenderer();
		_camera =
			new THREE.PerspectiveCamera(
				VIEW_ANGLE,
				ASPECT,
				NEAR,
				FAR);

		_scene = new THREE.Scene();

		// add the camera to the scene
		_scene.add(_camera);

		// the camera starts at 0,0,0
		// so pull it back
		_camera.position.z = 3;

		// attach the render-supplied DOM element
		container.appendChild(_renderer.domElement);

		// announce state
		log('initialized');
		
		// set up the sphere vars
		var radius = 1,
		segments = 16,
		rings = 16;

		// create the sphere's material
		var sphereMaterial = new THREE.MeshLambertMaterial({
			color: 0xCCCCCC,
			opacity: 0.5
		});

		// create a new mesh with sphere geometry
		var sphere = new THREE.Mesh(

			new THREE.SphereGeometry(
				radius,
				segments,
				rings),
			
			sphereMaterial);

		// add the sphere to the scene
		_scene.add(sphere);

		// announce state
		log('sphere added to scene');

		// add soft white ambient light
		var light = new THREE.AmbientLight( 0x202020 );
		_scene.add( light );
		
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

	var updateCameraAspect = function() {
		_camera.aspect = ASPECT;
		_camera.updateProjectionMatrix();
	};

	sphere.draw = function() {
		_renderer.setSize(WIDTH, HEIGHT);
		updateCameraAspect();
		_renderer.render(_scene, _camera);
	};

	sphere.main = function() {
		sphere.init();
		sphere.draw();
	};
	window.addEventListener('DOMContentLoaded',sphere.main);

	// return modified sphere object
	return sphere;
})(sphere || {});