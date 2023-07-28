<!--
 * @Author: new-wang
 * @Date: 2023-07-12 15:46:01
 * @LastEditors: new-wang
 * @LastEditTime: 2023-07-25 15:17:12
 * @Description: 
-->
<template>
    <div>
        <div id="geometry"></div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { Scene,BoxGeometry,MeshBasicMaterial,
    MeshPhongMaterial,AmbientLight,DirectionalLight,
    Mesh,PerspectiveCamera, WebGLRenderer, AxesHelper,
    SphereGeometry,CylinderGeometry,PlaneGeometry,
    CircleGeometry,DoubleSide, BufferGeometry,BufferAttribute, 
    PointsMaterial,Points,LineBasicMaterial,Line,
    LineLoop,LineSegments,Vector3, MeshLambertMaterial,
    Euler,Color, BackSide, FrontSide
} from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const width = window.innerWidth;
const height = window.innerHeight;

const scene = new Scene()

// threejs的长方体BoxGeometry、球体SphereGeometry
// 等几何体都是基于BufferGeometry (opens new window)类构建的，
// BufferGeometry是一个没有任何形状的空几何体，
// 你可以通过BufferGeometry自定义任何几何形状，
// 具体一点说就是定义顶点数据

// 创建一个空的几何体对象
const geometry = new BufferGeometry()

// 通过js类型化数组定义几何体顶点数据
// const vertices = new Float32Array([
//     0, 0, 0, //顶点1坐标
//     50, 0, 0, //顶点2坐标
//     0, 100, 0, //顶点3坐标
//     0, 0, 10, //顶点4坐标
//     0, 0, 100, //顶点5坐标
//     50, 0, 10, //顶点6坐标
// ])

// 矩形几何体顶点坐标 
// 注意三角形的正反面问题：保证矩形平面两个三角形的正面是一样的，
// 也就是从一个方向观察，两个三角形都是逆时针或顺时针。
const vertices = new Float32Array([
    0, 0, 0, //顶点1坐标
    80, 0, 0, //顶点2坐标
    80, 80, 0, //顶点3坐标

    // 0, 0, 0, //顶点4坐标   和顶点1位置相同
    // 80, 80, 0, //顶点5坐标  和顶点3位置相同
    0, 80, 0, //顶点6坐标
]);

// js类型化数组Uint16Array创建顶点索引.index数据
const indexes = new Uint16Array([
    // 下面索引值对应顶点位置数据中的顶点坐标
    0, 1, 2, 0, 2, 3,
])

// 矩形平面，无索引，两个三角形，6个顶点
// 每个顶点的法线数据和顶点位置数据一一对应
// const normals = new Float32Array([
//     0, 0, 1, //顶点1法线( 法向量 )
//     0, 0, 1, //顶点2法线
//     0, 0, 1, //顶点3法线
//     0, 0, 1, //顶点4法线
//     0, 0, 1, //顶点5法线
//     0, 0, 1, //顶点6法线
// ]);

// 矩形平面，有索引，两个三角形，有2个顶点重合，有4个顶点
// 每个顶点的法线数据和顶点位置数据一一对应
const normals = new Float32Array([
    0, 0, 1, //顶点1法线( 法向量 )
    0, 0, 1, //顶点2法线
    0, 0, 1, //顶点3法线
    0, 0, 1, //顶点4法线
]);

// 通过threejs的属性缓冲区对象
// BufferAttribute (opens new window)表示threejs几何体顶点数据。
// 创建属性缓冲区对象
//3个为一组，表示一个顶点的xyz坐标
const attribue = new BufferAttribute(vertices,3)

// 有了数据，开始设置顶点数据
// 设置几何体attributes属性的位置属性
geometry.attributes.position = attribue;

// 索引数据赋值给几何体的index属性
geometry.index = new BufferAttribute(indexes, 1); //1个为一组

// 设置几何体的顶点法线属性.attributes.normal
geometry.attributes.normal = new BufferAttribute(normals, 3); 


// 点渲染模式
// const material = new PointsMaterial({
//     color:0xffff00,
//     size:10.0, //点对象像素尺寸
//     // side: DoubleSide
// })
// const points = new Points(geometry, material); //点模型对象
// scene.add(points) //渲染为点

// 线材质对象
// const material = new LineBasicMaterial({
//     color:0xff0000,
//     linewidth: 1,
//     linecap: 'round', //ignored by WebGLRenderer
// 	linejoin:  'round'
// })
// const points = [];
// points.push( new Vector3( - 10, 0, 0 ) );
// points.push( new Vector3( 0, 10, 0 ) );
// points.push( new Vector3( 10, 0, 0 ) );
// geometry.setFromPoints(points)

// 矩形平面
// const geometry2 = new PlaneGeometry(50,150)
//矩形几何体PlaneGeometry的参数3,4表示细分数，默认是1,1
// const geometry = new THREE.PlaneGeometry(100,50,1,1);
// 把一个矩形分为2份，每个矩形2个三角形，总共就是4个三角形
// const geometry2 = new PlaneGeometry(100,50,2,1);
// 把一个矩形分为4份，每个矩形2个三角形，总共就是8个三角形
// const geometry2 = new PlaneGeometry(100,50,2,2);

// 长方体
const geometry3 = new BoxGeometry(50,100,50)

// 球体SphereGeometry参数2、3分别代表宽、高度两个方向上的细分数，默认32,16，具体多少以你所用版本为准
// const geometry4 = new SphereGeometry( 50, 32, 16 );
// 如果球体细分数比较低，表面就不会那么光滑
// const geometry4 = new SphereGeometry( 50, 8, 8 );

// 查看几何体顶点位置和索引数据
// console.log('几何体',geometry2);
// console.log('顶点位置数据',geometry2.attributes.position);
// console.log('顶点索引数据',geometry2.index);


// 使用受光照影响的材质，几何体BufferGeometry需要定义顶点法线数据
const material = new MeshLambertMaterial({
    color:0xff0000,
    linewidth: 1,
    linecap: 'round', //ignored by WebGLRenderer
	linejoin:  'round',
    side:DoubleSide,
    wireframe:true,//线条模式渲染mesh对应的三角形数据
})

// 创建线模型对象
// const line = new Line(geometry, material);
// 闭合线条
// const line = new LineLoop(geometry, material); 
//非连续的线条
// const line = new LineSegments(geometry, material);
// scene.add(line)

const mesh = new Mesh(geometry3,material);
scene.add(mesh) //会渲染为面

// 平行光
const directionalLight = new DirectionalLight(0xffffff, 1);
directionalLight.position.set(40, 40, 400);
directionalLight.target = mesh;
scene.add(directionalLight);

const camera = new PerspectiveCamera(100,width/height,0.1,2000)
camera.position.set(500, 500, 500)
camera.lookAt(0, 0, 0)

const axesHelper = new AxesHelper(500)
scene.add(axesHelper)


const renderer = new WebGLRenderer({
    antialias:true
})
renderer.setSize(width,height)
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x444444,1)
renderer.render(scene,camera)



const controls = new OrbitControls(camera,renderer.domElement)
controls.addEventListener('change', function () {
    renderer.render(scene, camera); //执行渲染操作
});


// // 创建一个颜色对象
// const color = new Color();//默认是纯白色0xffffff。
// console.log('查看颜色对象结构',color);//可以查看rgb的值

// 查看Color对象设置0x00ff00对应的的.r、.g、.b值
const color = new Color(0x00ff00);
console.log('查看颜色对象结构',color);


// 重置模型材质的颜色
material.color.set(0x00ffff);

// 要使用平面PlaneGeometry测试
// 材质面属性.side
// material.side = BackSide; //背面可以看到
// material.side = DoubleSide; //双面可见
// material.side = FrontSide; //默认 单面可见

// console.log('material.side',material.side);

// 查看模型对象
console.log('mesh',mesh);
// 访问模型材质,并设置材质的颜色属性
mesh.material.color.set(0xffff00);
// 访问模型几何体,并平移几何体顶点数据
mesh.geometry.translate(0,100,0);

const mesh2 = mesh.clone()
scene.add(mesh2);
mesh2.position.x = 100;
mesh2.material.color.set(0xff00ff);

mesh2.geometry = mesh.geometry.clone();
mesh2.material = mesh.material.clone();
// 改变mesh2颜色，不会改变mesh的颜色
mesh2.material.color.set(0xff0000);

// 渲染循环
function render() {
    // 几何体绕着x轴旋转45度
    // geometry4.rotateX(Math.PI / 4);

    // geometry3.rotateX(Math.PI / 40);
    // 几何体沿着x轴平移50
    // geometry.translate(50, 0, 0);
    // 几何体xyz三个方向都放大2倍
    // geometry.scale(2, 2, 2);

    mesh.rotateY(0.01)
    mesh2.rotation.copy(mesh.rotation);

    renderer.render(scene, camera); //执行渲染操作
    requestAnimationFrame(render);//请求再次执行渲染函数render，渲染下一帧
}
render();


// 创建一个欧拉对象，表示绕着xyz轴分别旋转45度，0度，90度
const Euler1 = new Euler( Math.PI/4,0, Math.PI/2);

// 克隆
const v2 = Euler1.clone()
console.log(v2)


// 复制
const v1 = new Vector3(1, 2, 3);
const v3 = new Vector3(4, 5, 6);
//读取v1.x、v1.y、v1.z的赋值给v3.x、v3.y、v3.z
v3.copy(v1);
console.log(v3);

// 通过属性设置欧拉对象的三个分量值
// const Euler = new THREE.Euler();
// Euler.x = Math.PI/4;
// Euler.y = Math.PI/2;
// Euler.z = Math.PI/4;

// console.log(Euler1)

// //绕y轴的角度设置为60度
// mesh.rotation.y += Math.PI/3;
// //绕y轴的角度增加60度
// mesh.rotation.y += Math.PI/3;

// //绕y轴的角度减去60度
// mesh.rotation.y -= Math.PI/3;


// const axis = new Vector3(0,1,0);//向量axis
// mesh.rotateOnAxis(axis,Math.PI/8); //绕axis轴旋转π/8



// 三维向量Vector3 与 模型位置
// const v3 = new Vector3(0,0,0);
// console.log('v3', v3);
// v3.set(10,0,0);//set方法设置向量的值
// v3.x = 100;//访问x、y或z属性改变某个分量的值
// console.log(v3)
// console.log('position',mesh.position)
// mesh.position.set(80,2,10);

// 等价于mesh.position = mesh.position + 100;
// mesh.translateX(100);//沿着x轴正方向平移距离100

// 沿着Z轴负方向平移距离50
// mesh.translateZ(-50);

//向量Vector3对象表示方向
// const axis = new Vector3(1, 1, 1);
// axis.normalize(); //向量归一化
// //沿着axis轴表示方向平移100
// mesh.translateOnAxis(axis, 200);

// x轴方向放大2倍
// mesh.scale.x = 2.0;

// 网格模型xyz方向分别缩放0.5,1.5,2倍
// mesh.scale.set(0.5, 1.5, 2)

onMounted(()=>{
    document.getElementById('geometry').appendChild(renderer.domElement);
})
</script>

<style lang="scss" scoped>

</style>