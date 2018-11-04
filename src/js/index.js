import * as THREE from 'three'
import 'three/examples/js/controls/OrbitControls'
export default class XD {
  constructor (domID, option) {
    debugger
    this.dom = document.getElementById(domID)
    this.option = option
    this.initScene()
  }
  initScene () {
    var scene = new THREE.Scene()
    this.scene = scene
    // create a camera, which defines where we're looking at.
    let el = this.dom
    var camera = new THREE.PerspectiveCamera(45, el.offsetWidth / el.offsetHeight, 0.1, 10000)
    this.camera = camera
    // create a render and set the size
    var renderer = new THREE.WebGLRenderer()
    this.renderer = renderer
    console.log(renderer.getClearColor())
    renderer.setClearColor(new THREE.Color('white'))
    renderer.setSize(el.offsetWidth, el.offsetHeight)
    renderer.shadowMapEnabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.gammaInput = true
    renderer.gammaOutput = true
    console.log(renderer)
    var ambient = new THREE.AmbientLight(0xffffff, 0.1)
    scene.add(ambient)
    // create the ground plane
    var material = new THREE.MeshPhongMaterial({ color: 0x808080, dithering: true })

    var geometry = new THREE.PlaneBufferGeometry(2000, 2000)

    var mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(0, -1, 0)
    mesh.rotation.x = -Math.PI * 0.5
    mesh.receiveShadow = true

    // add the plane to the scene
    scene.add(mesh)

    // create a cube
    var cubeGeometry = new THREE.BoxBufferGeometry(4, 4, 4)
    var material2 = new THREE.MeshPhongMaterial({ color: 0x4080ff, dithering: true })

    var cube = new THREE.Mesh(cubeGeometry, material2)
    cube.castShadow = true

    // position the cube
    cube.position.x = -4
    cube.position.y = 3
    cube.position.z = 0

    // add the cube to the scene
    scene.add(cube)

    var sphereGeometry = new THREE.SphereGeometry(4, 32, 32)
    var sphereMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff})
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

    // position the sphere
    sphere.position.x = 20
    sphere.position.y = 4
    sphere.position.z = 2
    sphere.castShadow = true

    // add the sphere to the scene
    scene.add(sphere)

    // position and point the camera to the center of the scene
    camera.position.x = -30
    camera.position.y = 40
    camera.position.z = 30
    camera.lookAt(scene.position)

    // add spotlight for the shadows
    var spotLight = new THREE.SpotLight(0xffffff)
    spotLight.position.set(-40, 60, -10)
    spotLight.castShadow = true

    let lightHelper = new THREE.SpotLightHelper(spotLight)
    scene.add(lightHelper)
    scene.add(spotLight)
    console.log(THREE)
    var controls = new THREE.OrbitControls(camera, renderer.domElement)
    controls.addEventListener('change', this.animate.bind(this))
    controls.minDistance = 20
    controls.maxDistance = 5000
    controls.enablePan = false
    // add the output of the renderer to the html element
    this.dom.appendChild(renderer.domElement)

    // call the render function
    renderer.render(scene, camera)
  }
  animate () {
    // requestAnimationFrame(this.animate.bind(this))
    this.renderer.render(this.scene, this.camera)
  }
}
