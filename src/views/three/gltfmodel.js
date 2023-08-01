/*
 * @Author: new-wang
 * @Date: 2023-08-01 11:48:11
 * @LastEditors: new-wang
 * @LastEditTime: 2023-08-01 16:37:17
 * @Description: 
 */
// import { Scene,BoxGeometry,MeshBasicMaterial,
//     MeshPhongMaterial,AmbientLight,DirectionalLight,
//     Mesh,PerspectiveCamera, WebGLRenderer, AxesHelper,
//     SphereGeometry,CylinderGeometry,PlaneGeometry,
//     CircleGeometry,DoubleSide, BufferGeometry,BufferAttribute, 
//     PointsMaterial,Points,LineBasicMaterial,Line,
//     LineLoop,LineSegments,Vector3, MeshLambertMaterial,
//     Euler,Color, BackSide, FrontSide,Group, sRGBEncoding
// } from 'three';
import * as THREE from 'three';

// 引入GLTFLoader
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// const geometry = new THREE.BoxGeometry(100,100,100)
// const material = new THREE.MeshLambertMaterial({
//     color:0x00ffff
// })
// const mesh = new THREE.Mesh(geometry,material)

// 创建GLTF加载器对象
const loader = new GLTFLoader();

const model = new Group();
// model.name = 'duck'

var urlDuck = 'https://a.amap.com/jsapi_demos/static/gltf/Duck.gltf';
loader.load(urlDuck,function(gltf){
    // console.log('gltf',gltf);
    model.add(gltf.scene)
    // scene.add(gltf.scene)
    // scene.add(model)
    // console.log('scene',scene)
})


export default model














