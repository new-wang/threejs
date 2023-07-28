<!--
 * @Author: new-wang
 * @Date: 2023-07-12 15:46:01
 * @LastEditors: new-wang
 * @LastEditTime: 2023-07-25 17:08:34
 * @Description: 层级模型的学习
-->
<template>
    <div>
        <div id="geometry"></div>
    </div>
</template>

<script setup>
/**
 * 1、Group层级模型
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
    Euler,Color, BackSide, FrontSide,Group
} from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const width = window.innerWidth;
const height = window.innerHeight;

const scene = new Scene()

// 长方体
const geometry = new BoxGeometry(50,100,50)

// 使用受光照影响的材质，几何体BufferGeometry需要定义顶点法线数据
const material = new MeshLambertMaterial({
    color:0xff0000,
    linewidth: 1,
    linecap: 'round', //ignored by WebGLRenderer
	linejoin:  'round',
    side:DoubleSide,
    // wireframe:true,//线条模式渲染mesh对应的三角形数据
})

const group = new Group()

const mesh1 = new Mesh(geometry,material);
const mesh2 = new Mesh(geometry,material)
mesh2.translateX(100);

//把mesh1型插入到组group中，mesh1作为group的子对象
// group.add(mesh1);
//把mesh2型插入到组group中，mesh2作为group的子对象
// group.add(mesh2);
group.add(mesh1,mesh2)

// 父对象旋转缩放平移变换，子对象跟着变化
//沿着Y轴平移mesh1和mesh2的父对象，mesh1和mesh2跟着平移
group.translateY(100);
//父对象缩放，子对象跟着缩放
group.scale.set(2,2,2);
//父对象旋转，子对象跟着旋转
group.rotateY(Math.PI/6)

//threejs默认mesh也可以添加子对象,mesh基类也是Object3D
// mesh1.add(mesh2);

// 模型命名 .name属性
// group.name = '小区房子';
// mesh1.name='一号楼'

//把group插入到场景中作为场景子对象
// scene.add(group);

console.log(group);
console.log(scene);


// 批量创建多个长方体表示高层楼
//所有高层楼的父对象
const group1 = new Group()
group1.name = "高层";
for (let i = 0; i < 5; i++) {
    const geometry = new BoxGeometry(20, 60, 10);
    const material = new MeshLambertMaterial({
        color: 0x00ffff
    });
    const mesh = new Mesh(geometry, material);
    mesh.position.x = i * 30; // 网格模型mesh沿着x轴方向阵列
    group1.add(mesh); //添加到组对象group1
    mesh.name = i + 1 + '号楼';
    // console.log('mesh.name',mesh.name);
}
group1.position.y = 30;

const group2 = new Group();
group2.name = "洋房";
// 批量创建多个长方体表示洋房
for (let i = 0; i < 5; i++) {
    const geometry = new BoxGeometry(20, 30, 10);
    const material = new MeshLambertMaterial({
        color: 0x00ffff
    });
    const mesh = new Mesh(geometry, material);
    mesh.position.x = i * 30;
    group2.add(mesh); //添加到组对象group2
    mesh.name = i + 6 + '号楼';
}
group2.position.z = 50;
group2.position.y = 15;


const model = new Group();
model.name='小区房子';
model.add(group1, group2);
model.position.set(-50,0,-25);

scene.add(model);


// 递归遍历方法.traverse()
// 递归遍历model包含所有的模型节点
model.traverse(function(obj) {
    console.log('所有模型节点的名称',obj.name);
    // obj.isMesh：if判断模型对象obj是不是网格模型'Mesh'
    if (obj.isMesh) {//判断条件也可以是obj.type === 'Mesh'
        obj.material.color.set(0xffff00);
    }
});

// 查找某个具体的模型.getObjectByName()
// 返回名.name为"4号楼"对应的对象
const nameNode = scene.getObjectByName("4号楼");
nameNode.material.color.set(0xff0000);


// 平行光
const directionalLight = new DirectionalLight(0xffffff, 1);
directionalLight.position.set(40, 40, 400);
// directionalLight.target = mesh;
directionalLight.target = group;
scene.add(directionalLight);

// 相机
const camera = new PerspectiveCamera(100,width/height,0.1,2000)
camera.position.set(500, 500, 500)
camera.lookAt(0, 0, 0)

// 坐标辅助控件
const axesHelper = new AxesHelper(500)
scene.add(axesHelper)

// 渲染
const renderer = new WebGLRenderer({
    antialias:true
})
renderer.setSize(width,height)
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x444444,1)
renderer.render(scene,camera)


// 相机辅助控件
const controls = new OrbitControls(camera,renderer.domElement)
controls.addEventListener('change', function () {
    renderer.render(scene, camera); //执行渲染操作
});


// 渲染循环
function render() {

    // mesh.rotateY(0.01)

    renderer.render(scene, camera); //执行渲染操作
    requestAnimationFrame(render);//请求再次执行渲染函数render，渲染下一帧
}
render();

onMounted(()=>{
    document.getElementById('geometry').appendChild(renderer.domElement);
})
</script>

<style lang="scss" scoped>

</style>