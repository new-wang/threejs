<!--
 * @Author: new-wang
 * @Date: 2023-07-12 15:46:01
 * @LastEditors: new-wang
 * @LastEditTime: 2023-07-28 17:09:54
 * @Description: 顶点UV坐标、纹理贴图
-->
<template>
    <div>
        <div id="geometry"></div>

        <!-- <img src="./ear.jpg" alt=""> -->
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
    Euler,Color, BackSide, FrontSide,Group, TextureLoader, RepeatWrapping, GridHelper
} from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const width = window.innerWidth;
const height = window.innerHeight;

const scene = new Scene()

const geometry = new PlaneGeometry(200,20)

// const geometry = new CircleGeometry(200,100) //圆形
// const geometry = new BoxGeometry(100,100,100)
// const geometry = new SphereGeometry(150,25,25)


// console.log('position',geometry.attributes.position);
// console.log('uv',geometry.attributes.uv);

// const geometry = new BufferGeometry();
// const vertices = new Float32Array([
//     0,0,0, //顶点1坐标
//     160,0,0, //顶点2坐标
//     160,80,0, //顶点3坐标
//     0,80,0, //顶点4坐标
// ])

// const attribue = new BufferAttribute(vertices,3)
// geometry.attributes.position = attribue

// const indexs = new Uint16Array([
//     0,1,2,0,2,3,
// ])
// geometry.index = new BufferAttribute(indexs,1)

// const normals = new Float32Array([
//     0, 0, 1, //顶点1法线( 法向量 )
//     0, 0, 1, //顶点2法线
//     0, 0, 1, //顶点3法线
//     0, 0, 1, //顶点4法线
// ]);

// geometry.attributes.normal = new BufferAttribute(normals, 3); 

// /**纹理坐标0~1之间随意定义*/
// const uvs = new Float32Array([
//     0, 0, //图片左下角
//     1, 0, //图片右下角
//     1, 1, //图片右上角
//     0, 1, //图片左上角
// ]);

// // 获取纹理贴图四分之一
// // const uvs = new Float32Array([
// //     0, 0, 
// //     0.5, 0, 
// //     0.5, 0.5, 
// //     0, 0.5, 
// // ]);

// // 设置几何体attributes属性的位置normal属性
// geometry.attributes.uv = new BufferAttribute(uvs, 2); //2个为一组,表示一个顶点的纹理坐标


// 模拟地面
// const geometry = new PlaneGeometry(2000,2000)



// 纹理贴图加载器TextureLoader
const texLoader = new TextureLoader()
// // .load()方法加载图像，返回一个纹理对象Texture
// // const texture = texLoader.load('./cizhuan.jpg');
// // src\views\three\ear.jpg

// const texture = texLoader.load('./cizhuan2.jpg');

// // 设置阵列模式
// texture.wrapS = RepeatWrapping;
// texture.wrapT = RepeatWrapping;

// // uv两个方向纹理重复数量
// texture.repeat.set(10,10)

// const texture = texLoader.load('./zw.png');

const texture = texLoader.load('./123.jpg');
// 纹理对象的偏移属性 Vector2(x,y)  二维向量
// texture.offset.x = 0.5
// texture.offset.y = 0.5
texture.wrapS = RepeatWrapping//改变包裹或者说映射方式
// texture.repeat.x = 10;

// 使用受光照影响的材质，几何体BufferGeometry需要定义顶点法线数据
const material = new MeshLambertMaterial({
    // color:0xff0000,
    map:texture,
    // transparent:true,//贴图为png时 背景透明的不显示
    // linewidth: 1,
    // linecap: 'round', //ignored by WebGLRenderer
	// linejoin:  'round',
    // side:DoubleSide,
    // wireframe:true,//线条模式渲染mesh对应的三角形数据
})

const mesh = new Mesh(geometry,material)

// 绕x周旋转90度
mesh.rotateX(-Math.PI/2)

mesh.position.y = 1

scene.add(mesh)


const size = 300;
const divisions = 20;
// 辅助网格线
const gridHelper = new GridHelper(size,divisions,0x00ffff,0x004444)
scene.add(gridHelper)
gridHelper.position.y = -1;



const amtLight = new AmbientLight(0xffffff, 0.6)

scene.add(amtLight)


// 平行光
// const directionalLight = new DirectionalLight(0xffffff, 1);
// directionalLight.position.set(40, 40, 400);
// // directionalLight.target = mesh;
// // directionalLight.target = group;
// scene.add(directionalLight);

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
    // 设置纹理动画：偏移量
    texture.offset.x += 0.01;

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