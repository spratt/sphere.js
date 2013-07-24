/* sphere.js by Simon Pratt
 * see LICENSE file
 */
var sphere = (function(sphere, undefined) {
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
		// set the scene size
		var WIDTH = 400,
		HEIGHT = 300;

		// set some camera attributes
		var VIEW_ANGLE = 45,
		ASPECT = WIDTH / HEIGHT,
		NEAR = 0.1,
		FAR = 10000;

		// get the DOM element to attach to
		var container = $('#container');

		// create a WebGL renderer, camera
		// and a scene
		var renderer = new THREE.WebGLRenderer();
		var camera =
			new THREE.PerspectiveCamera(
				VIEW_ANGLE,
				ASPECT,
				NEAR,
				FAR);

		var scene = new THREE.Scene();

		// add the camera to the scene
		scene.add(camera);

		// the camera starts at 0,0,0
		// so pull it back
		camera.position.z = 300;

		// start the renderer
		renderer.setSize(WIDTH, HEIGHT);

		// attach the render-supplied DOM element
		container.appendChild(renderer.domElement);

		// announce state
		log('initialized');

		/* DRAW A SPHERE FOR TEST PURPOSES */

		// set up the sphere vars
		var radius = 50,
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
		scene.add(sphere);

		// announce state
		log('sphere added to scene');

		/* add lighting */

		// create a point light
		var pointLight =
			new THREE.PointLight(0xFFFFFF);

		// set its position
		pointLight.position.x = 10;
		pointLight.position.y = 50;
		pointLight.position.z = 130;

		// add to the scene
		scene.add(pointLight);

		// announce state
		log('lighting added to scene');

		/* draw */
		renderer.render(scene, camera); 
	};

	sphere.main = function() {
		sphere.init();
	};
	window.addEventListener('DOMContentLoaded',sphere.main);

	// return modified sphere object
	return sphere;
})(sphere || {});