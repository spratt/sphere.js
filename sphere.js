/* sphere.js by Simon Pratt
 * see LICENSE file
 */
var sphere = (function(sphere, undefined) {
	// configuration
	var WIDTH = 900;
	var HEIGHT = 900;
	
	var VIEW_ANGLE = 45;
	var ASPECT = WIDTH / HEIGHT;
	var NEAR = 0.1;
	var FAR = 10000;
	
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
	sphere.init = function() {

		// get the DOM element to attach to
		var container = $('#container');

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

		// start the renderer
		_renderer.setSize(WIDTH, HEIGHT);

		// attach the render-supplied DOM element
		container.appendChild(_renderer.domElement);

		// announce state
		log('initialized');
	};

	sphere.addSphere = function() {
		// set up the sphere vars
		var radius = 1,
		segments = 16,
		rings = 16;

		// create the sphere's material
		var sphereMaterial = new THREE.MeshLambertMaterial({
			color: 0xCC0000
		});

		// create a new mesh with
		// sphere geometry - we will cover
		// the sphereMaterial next!
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
	};

	sphere.addLighting = function() {
		// create a point light
		var pointLight = new THREE.PointLight(0xFFFFFF);

		// set its position
		pointLight.position.x = 10;
		pointLight.position.y = 50;
		pointLight.position.z = 130;

		// add to the scene
		_scene.add(pointLight);

		// announce state
		log('lighting added to scene');
	};

	sphere.draw = function() {
		_renderer.render(_scene, _camera);
	};

	sphere.main = function() {
		sphere.init();
		sphere.addSphere();
		sphere.addLighting();
		sphere.draw();
	};
	window.addEventListener('DOMContentLoaded',sphere.main);

	// return modified sphere object
	return sphere;
})(sphere || {});