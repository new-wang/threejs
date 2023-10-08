<!--
 * @Author: new-wang
 * @Date: 2023-07-12 15:46:01
 * @LastEditors: new-wang
 * @LastEditTime: 2023-10-08 16:47:40
 * @Description: pbr材质
-->
<template>
    <div>
        <div id="geometry"></div>
    </div>
</template>

<script setup>
/**
 * 1、pbr材质简介
 * 2、pbr材质金属度和粗糙度
 * 3、环境贴图.envMap（金属效果）
 * 4、环境贴图2
 * 5、MeshPhysicalMaterial清漆层
 * 6、物理材质透光率
 * 7、三维软件导出PBR材质属性
 *      实际开发的时候PBR材质的属性，很多时候是可以在三维建模软件中设置的，
 *      然后通过gltf导出即可，这样就不用在threejs代码设置。
 *      通常美术对三维场景渲染的了解也比大部分前端程序员多的多，
 *      只要美术在三维建模软件设置好并导出包含pbr材质属性的gltf即可
 * 
 */
import { onMounted } from 'vue';
import { Scene,BoxGeometry,MeshBasicMaterial,
    MeshPhongMaterial,AmbientLight,DirectionalLight,
    Mesh,PerspectiveCamera, WebGLRenderer, AxesHelper,
    SphereGeometry,CylinderGeometry,PlaneGeometry,
    CircleGeometry,DoubleSide, BufferGeometry,BufferAttribute, 
    PointsMaterial,Points,LineBasicMaterial,Line,
    LineLoop,LineSegments,Vector3, MeshLambertMaterial,
    Euler,Color, BackSide, FrontSide,Group, sRGBEncoding, MeshStandardMaterial, CubeTextureLoader,
    IcosahedronGeometry,MeshPhysicalMaterial
} from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 引入GLTFLoader
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// import model from './model.js'

import matFolder from './matFolder.js'
 
const width = window.innerWidth;
const height = window.innerHeight;
var urlDuck = 'https://a.amap.com/jsapi_demos/static/gltf/Duck.gltf';

const scene = new Scene()

// const geometry = new BoxGeometry(50,100,50)


// const loader = new GLTFLoader();
// loader.load(urlDuck,function(gltf){
//     gltf.scene.scale.set(50,50,50)
//     scene.add(gltf.scene)
// })
// console.log(scene);


// 加载环境贴图
const textureCube = new CubeTextureLoader()
.setPath('./textures/cubeMaps/')
.load(['posx.jpg','negx.jpg','posy.jpg','negy.jpg','posz.jpg','negz.jpg'])

const geometry = new IcosahedronGeometry(15,8)
// MeshStandardMaterial => MeshPhysicalMaterial
const material = new MeshPhysicalMaterial({
    metalness:1.0,//金属度属性，
    roughness:0.1, //表面粗糙度
    envMap: textureCube, //设置pbr材质环境贴图
    envMapIntensity:1.0, // 环境贴图反射率：控制环境贴图对mesh表面影响程度
    
    clearcoat:1.0, //物体表面清漆层或者说透明涂层的厚度
    clearcoatRoughness: 0.1,//透明涂层表面的粗糙度
    transmission:1.0, //玻璃材质透光率
    ior:1.5
})

const mesh = new Mesh(geometry,material)
scene.add(mesh)

scene.background = textureCube;
scene.environment = textureCube;

// const mesh = new Mesh(geometry,material)

// scene.add(mesh);


// GUI可视化调试PBR材质属性
const obj = {
    color: mesh.material.color, // 材质颜色
};
// 材质颜色color
matFolder.addColor(obj, 'color').onChange(function (value) {
    mesh.material.color.set(value);
}).name('材质颜色')
matFolder.add(mesh.material,'metalness',0,1).name('金属度');
matFolder.add(mesh.material,'roughness',0,1).name('金属粗糙度');
matFolder.add(mesh.material,'clearcoat',0,1).name('清漆厚度');
matFolder.add(mesh.material,'clearcoatRoughness',0,1).name('清漆粗糙度');
matFolder.add(mesh.material,'envMapIntensity',0,10).name('环境贴图影响程度');//环境贴图对Mesh表面影响程度
matFolder.add(mesh.material,'transmission',0,2).name('透光率');
matFolder.add(mesh.material,'ior',0,10).name('折射率');


// 平行光
const directionalLight = new DirectionalLight(0xffffff, 2);
directionalLight.position.set(200, 200, 200);
// directionalLight.target = mesh;
// directionalLight.target = group;
scene.add(directionalLight);

// 相机
const camera = new PerspectiveCamera(120,width/height,0.1,2000)
camera.position.set(100,100,100)
camera.lookAt(0, 0, 0)

// 坐标辅助控件
// const axesHelper = new AxesHelper(500)
// scene.add(axesHelper)

// 渲染
const renderer = new WebGLRenderer({
    antialias:true
})
renderer.setSize(width,height)
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x444444,1)
renderer.render(scene,camera)

// 设置编码方式和gltf贴图保持一致，解决渲染颜色偏差问题
// 新版本不用
// 注意！最新版本属性名字有改变。渲染器属性名.outputEncoding已经变更为.outputColorSpace
// renderer.outputEncoding = sRGBEncoding;


// 注意！！！最新版本，纹理对象属性名.encoding已经变更为.colorSpace。
// texture.colorSpace  = THREE.SRGBColorSpace;//设置为SRGB颜色空间

// 单独加载的颜色贴图设置.encoding = THREE.sRGBEncoding
// //解决加载gltf格式模型颜色偏差问题
// renderer.outputEncoding = THREE.sRGBEncoding;
// const texture = new THREE.TextureLoader().load('./earth.jpg');
// // 和webgl渲染器renderer.outputEncoding一致
// texture.encoding = THREE.sRGBEncoding;


// 相机辅助控件
const controls = new OrbitControls(camera,renderer.domElement)
controls.addEventListener('change', function () {
    renderer.render(scene, camera); //执行渲染操作
});
// controls.target.set(x,y,z)
// controls.update()

// 渲染循环
function render() {

    // mesh.rotateY(0.01)
    // 相机位置
    // console.log('camera.position',camera.position)

    // controls.target 对应 相机观察目标 camera.lookAt()
    // console.log('controls.target',controls.target);

    renderer.render(scene, camera); //执行渲染操作
    requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
}
render();

onMounted(()=>{
    document.getElementById('geometry').appendChild(renderer.domElement);
})
</script>

<style lang="scss" scoped>

</style>