<!--
 * @Author: new-wang
 * @Date: 2023-07-07 13:56:33
 * @LastEditors: new-wang
 * @LastEditTime: 2023-10-08 16:27:08
 * @Description: 
-->
<!--
 * @Author: new-wang
 * @Date: 2023-07-07 13:56:33
 * @LastEditors: new-wang
 * @LastEditTime: 2023-07-12 14:18:25
 * @Description: threejs的学习使用
-->
<template>
    <div id="my-three">

    </div>
</template>

<script setup>
/**
 * 学习使用three.js
 * Scene 场景
 * BoxGeometry 几何体
 * MeshBasicMaterial 基础网格材质(不受光照影响)
 * PerspectiveCamera 透视相机
 * WebGLRenderer 渲染器
 */

import { Scene,BoxGeometry,MeshBasicMaterial,MeshPhongMaterial,AmbientLight,DirectionalLight,Mesh,PerspectiveCamera, WebGLRenderer, AxesHelper,SphereGeometry,CylinderGeometry,PlaneGeometry,CircleGeometry,DoubleSide } from 'three';
import { onMounted } from 'vue';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import dat from "dat.gui";


const width = window.innerWidth;
const height = window.innerHeight;

// const width = 400;
// const height = 400;

const scene = new Scene()

// 长方体
const geometry = new BoxGeometry(150,150,150)
// 球体
// const geometry = new SphereGeometry(150)
// 圆柱 CylinderGeometry
// const geometry = new CylinderGeometry(50,50,150)
// 矩形平面
// const geometry = new PlaneGeometry(50,150)
// 圆形平面
// const geometry = new CircleGeometry(150)

// 基础网格材质
// const material = new MeshBasicMaterial({
//     color: 0x0000ff, //设置材质颜色
//     transparent:true,//开启透明
//     opacity:0.5,//设置透明度
//     side: DoubleSide,  //FrontSide 材质默认只有一面可见，DoubleSide两面可见
// })

// 高光材质
const material = new MeshPhongMaterial({
    color: 0x0000ff, //设置材质颜色
    specular: 0x444444, //高光部分的颜色
    // transparent:true,//开启透明
    // opacity:0.5,//设置透明度
    shininess: 20, //高光部分的亮度，默认30
    // side: DoubleSide,  //FrontSide 材质默认只有一面可见，DoubleSide两面可见
})

//环境光:没有特定方向，整体改变场景的光照明暗
const ambient = new AmbientLight(0xffffff, 0.4);
scene.add(ambient);

// 平行光
const directionalLight = new DirectionalLight(0xffffff, 1);
// 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
directionalLight.position.set(80, 100, 50);
// 方向光指向对象网格模型mesh，可以不设置，默认的位置是0,0,0
// directionalLight.target = mesh;
scene.add(directionalLight);


const mesh = new Mesh(geometry,material)
mesh.position.set(0,0,0)

scene.add(mesh)

// for (let i = 0; i < 10; i++) {
//     const mesh = new Mesh(geometry, material); //网格模型对象Mesh
//     // 沿着x轴分布
//     mesh.position.set(i*150,0,0);
//     scene.add(mesh); //网格模型添加到场景中
// }

// for (let i = 0; i < 10; i++) {
//     for (let j = 0; j < 10; j++) {
//         const mesh = new Mesh(geometry, material); //网格模型对象Mesh
//         // 在XOZ平面上分布
//         mesh.position.set(i * 200, 0, j * 200);
//         scene.add(mesh); //网格模型添加到场景中  
//     }
// }
// for (let z = 0; z < 10; z++) {
//     for (let i = 0; i < 10; i++) {
//         for (let j = 0; j < 10; j++) {
//             const mesh = new Mesh(geometry, material); //网格模型对象Mesh
//             // 在XOZ平面上分布
//             mesh.position.set(i * 200, z * 200, j * 200);
//             scene.add(mesh); //网格模型添加到场景中  
//         }
//     }
// }


const camera = new PerspectiveCamera(100,width/height,0.1,2000)
camera.position.set(500, 500, 500)
camera.lookAt(0, 0, 0)
// camera.lookAt(mesh.position)


const renderer = new WebGLRenderer({
    antialias:true,//锯齿属性
})
renderer.setSize(width,height)
renderer.render(scene,camera)

console.log('设备像素比：',window.devicePixelRatio)
// 设置设备像素比
renderer.setPixelRatio(window.devicePixelRatio);
// 设置背景颜色
renderer.setClearColor(0x444444,1)

// 相机控件
const controls = new OrbitControls(camera,renderer.domElement)
controls.addEventListener('change', function () {
    renderer.render(scene, camera); //执行渲染操作
});
// controls.target.set(500,500,500)
// controls.update();//更新一下

// 渲染循环
// const clock = new THREE.Clock();
// function render() {
//     // const spt = clock.getDelta()*1000;//毫秒
//     // console.log('两帧渲染时间间隔(毫秒)',spt);
//     // console.log('帧率FPS',1000/spt);
//     renderer.render(scene, camera); //执行渲染操作
//     // mesh.rotateY(0.01);//每次绕y轴旋转0.01弧度
//     requestAnimationFrame(render);//请求再次执行渲染函数render，渲染下一帧
// }
// render();

const axesHelper = new AxesHelper(500)
scene.add(axesHelper)


window.onresize = function () {
    // 重置渲染器输出画布canvas尺寸
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
    camera.aspect = window.innerWidth / window.innerHeight;
    // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
    // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
    // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
    camera.updateProjectionMatrix();
};


// 创建一个GUI对象
const gui = new dat.GUI();
// 修改gui界面默认的style属性
gui.domElement.style.right = '0px'
gui.domElement.style.width = '500px'


// .add方法
// .add(控制对象，对象具体属性，其他参数)
// const obj = {
//     x: 30,
//     y: 60,
//     z: 300,
// }

// gui.add(obj, 'x', 0, 100);
// gui.add(obj, 'y', 0, 50);
// gui.add(obj, 'z', 0, 60);

// gui改变threejs光照强度测试
// 先大概给一个经验值，然后通过gui在这个大概值的基础上下浮动可视化调试
// 光照强度属性.intensity
// console.log('ambient.intensity',ambient.intensity);
// 通过GUI改变mesh.position对象的xyz属性
// gui.add(ambient, 'intensity', 0, 2.0).name('环境光强度').step(0.2);
// gui.add(directionalLight, 'intensity', 0, 2.0).name('平行光强度');

// gui改变threejs模型位置测试
// mesh.position是JavaScript对象，具有x、y、z属性,这三个属性分别表示模型的xyz坐标，
// 这就是说，gui改变mesh.position的x、y、z属性，就可以可视化改变mesh的位置。

gui.add(mesh.position, 'x', 0, 400);
gui.add(mesh.position, 'y', 0, 400);
gui.add(mesh.position, 'z', 0, 400);

// gui.add(mesh.position, 'x', 0, 400).onChange(value=>{
//     mesh.position.x = value;

//     mesh.position.y = value;
// 	// 你可以写任何你想跟着obj.x同步变化的代码
// 	// 比如mesh.position.y = value;
// })

// 数组数据
gui.add(mesh.position, 'x', [-100,0,100]).name('x坐标').onChange(function (value) {
    mesh.position.x = value;
});;
//对象数据
gui.add(mesh.position, 'x', {
    left:-100,
    center:0,
    right:100
}).name('x位置坐标').onChange(function (value) {
    mesh.position.x = value;
});

// 布尔值
const tfobj = {
    bool: false,
};
// // 改变的obj属性数据类型是布尔值，交互界面是单选框
gui.add(tfobj, 'bool').name('是否旋转');

// 渲染循环
// const clock = new THREE.Clock();
function render() {
    if (tfobj.bool) mesh.rotateY(0.02);
    // const spt = clock.getDelta()*1000;//毫秒
    // console.log('两帧渲染时间间隔(毫秒)',spt);
    // console.log('帧率FPS',1000/spt);
    renderer.render(scene, camera); //执行渲染操作
    // mesh.rotateY(0.01);//每次绕y轴旋转0.01弧度
    requestAnimationFrame(render);//请求再次执行渲染函数render，渲染下一帧
}
render();


// // 改变颜色值
// const obj = {
//     color:0x00ffff,
// };
// // .addColor()生成颜色值改变的交互界面
// gui.addColor(obj, 'color').onChange(function(value){
//     mesh.material.color.set(value);
// }).name('材质颜色')


// gui 交互分组
// 创建材质子菜单
const matFolder = gui.addFolder('材质');
matFolder.close();

// 改变颜色值
const obj = {
    color:0x00ffff,
    specular:0x00ffff
};

// .addColor()生成颜色值改变的交互界面
matFolder.addColor(obj, 'color').onChange(function(value){
    mesh.material.color.set(value);
}).name('材质颜色')
// 材质高光颜色specular
matFolder.addColor(obj, 'specular').onChange(function(value){
    material.specular.set(value);
}).name('高光颜色');


// 环境光子菜单
const ambientFolder = gui.addFolder('光源');
// 环境光强度
ambientFolder.add(ambient, 'intensity',0,2).name("环境光强度");
ambientFolder.add(directionalLight,'intensity',0,2).name('平行光强度')
ambientFolder.close();
// 嵌套子菜单
const lightPosition = ambientFolder.addFolder('平行光位置')
lightPosition.add(directionalLight.position, 'x',-400,400);
lightPosition.add(directionalLight.position, 'y',-400,400);
lightPosition.add(directionalLight.position, 'z',-400,400);


onMounted(()=>{
    document.getElementById('my-three').appendChild(renderer.domElement);
})
</script>

<style lang="scss" scoped>

</style>