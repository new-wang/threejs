<!--
 * @Author: new-wang
 * @Date: 2023-07-12 15:46:01
 * @LastEditors: new-wang
 * @LastEditTime: 2023-10-12 17:52:05
 * @Description: 加载外部三维模型gltf
-->
<template>
    <div>
        <div id="geometry"></div>

        <div id="container">
            <div id="per"></div>
        </div>
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
    Euler,Color, BackSide, FrontSide,Group, sRGBEncoding
} from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 引入GLTFLoader
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// import model from './model.js'
 
const width = window.innerWidth;
const height = window.innerHeight;

const scene = new Scene()

// 创建GLTF加载器对象
const loader = new GLTFLoader();
// console.log('loader',loader)

const model = new Group();
model.name = 'duck'

var urlCity = 'https://a.amap.com/jsapi_demos/static/gltf-online/shanghai/scene.gltf';
var urlDuck = 'https://a.amap.com/jsapi_demos/static/gltf/Duck.gltf';
var urlGltf = './gltf/untitled.gltf';
// loader.load(模型路径,加载完成函数,加载过程函数)
loader.load(urlDuck,function(gltf){
    console.log('gltf',gltf);
    gltf.scene.scale.set(5,5,5)

    // .getObjectByName()根据.name获取模型节点
    // 返回名.name为"1号楼"对应的对象
    // const nameNode = gltf.scene.getObjectByName("1号楼");
    // nameNode.material.color.set(0xff0000);//改变1号楼Mesh材质颜色

    // 递归遍历所有模型节点批量修改材质
    // gltf.scene.traverse(function(obj) {
    //     if (obj.isMesh) {//判断是否是网格模型
    //         console.log('模型节点',obj);
    //         console.log('模型节点名字',obj.name);
    //     }
    // });

    // 批量修改gltf所有Mesh的材质
    // gltf.scene.traverse(function(obj) {
    //     if (obj.isMesh) {
    //         // 重新设置材质
    //         obj.material = new THREE.MeshLambertMaterial({
    //             color:0xffffff,
    //         });
    //     }
    // });

    // .name标记材质，判断两个mesh是否共享材质
    // const mesh1 = gltf.scene.getObjectByName("1号楼");
    // mesh1.material.name = '楼房材质';//通过name标记mesh1对应材质
    // const mesh2 = gltf.scene.getObjectByName("2号楼");
    // //通过name相同，可以判断mesh1.material和mesh2.material共享了同一个材质对象
    // console.log('mesh2.material.name', mesh2.material.name);

    //用代码方式解决mesh共享材质问题
    // gltf.scene.getObjectByName("小区房子").traverse(function (obj) {
    //     if (obj.isMesh) {
    //         // .material.clone()返回一个新材质对象，和原来一样，重新赋值给.material属性
    //         obj.material = obj.material.clone();
    //     }
    // });
    // mesh1.material.color.set(0xffff00);
    // mesh2.material.color.set(0x00ff00);

    model.add(gltf.scene)
    // scene.add(gltf.scene)
    // scene.add(model)
    // console.log('scene',scene)


        // 查看gltf所有颜色贴图的.encoding值
    // gltf.scene.traverse(function(obj) {
    //     if (obj.isMesh) {
    //         if(obj.material.map){//判断是否存在贴图
    //             console.log('.encoding',obj.material.map.encoding);
    //         }
    //     }
    // });
    // // .encoding显示3001，说明是THREE.sRGBEncoding
    // console.log('.encoding',mesh.material.map.encoding);

    // 更换gltf颜色贴图
    // 注意：如果你直接给gltf模型材质设置.map属性更换贴图，
    // 会出现纹理贴图错位的问题，这主要和纹理对象Texture的翻转属性.flipY有关。
    
    // 如果更换单独加载的纹理贴图，比如颜色贴图.map，注意把纹理贴图.flipY的值设置给gltf中纹理的值false
    // 是否翻转纹理贴图
    // texture.flipY = false;
    // const mesh = gltf.scene.children[0]; //获取Mesh
    // mesh.material.map = texture;

    // 加载完成，隐藏进度条
    // document.getElementById("container").style.visibility ='hidden';
    document.getElementById("container").style.display = 'none';
    
},function (xhr) {
    // 控制台查看加载进度xhr
    // 通过加载进度xhr可以控制前端进度条进度   
    const percent = xhr.loaded / xhr.total;
    // console.log('加载进度' + percent);

    const percentDiv = document.getElementById("per");
    percentDiv.style.width = percent * 400 + "px";
    percentDiv.style.textIndent = percent * 400 + 5 + "px"; //缩进元素中的首行文本
    // Math.floor:小数加载进度取整
    percentDiv.innerHTML = Math.floor(percent * 100) + '%'; //进度百分比
})
scene.add(model)
console.log('scene',scene)

// const texture = new THREE.TextureLoader().load('./earth.jpg');
// texture.encoding = THREE.LinearEncoding;//默认值
// // THREE.LinearEncoding变量在threejs内部表示数字3000
// console.log('texture.encoding',texture.encoding);
// // 修改为THREE.sRGBEncoding，
// texture.encoding = THREE.sRGBEncoding;
// // THREE.sRGBEncoding变量在threejs内部表示数字3001
// console.log('texture.encoding',texture.encoding);



// 长方体
// const geometry = new BoxGeometry(50,100,50)

// // 使用受光照影响的材质，几何体BufferGeometry需要定义顶点法线数据
// const material = new MeshLambertMaterial({
//     color:0xff0000,
//     linewidth: 1,
//     linecap: 'round', //ignored by WebGLRenderer
// 	linejoin:  'round',
//     side:DoubleSide,
//     // wireframe:true,//线条模式渲染mesh对应的三角形数据
// })

// const mesh = new Mesh(geometry,material)

// scene.add(mesh);


// 递归遍历方法.traverse()
// 递归遍历model包含所有的模型节点
// model.traverse(function(obj) {
   
// });

// 平行光
const directionalLight = new DirectionalLight(0xffffff, 1);
directionalLight.position.set(40, 40, 400);
// directionalLight.target = mesh;
// directionalLight.target = group;
scene.add(directionalLight);

// 相机
const camera = new PerspectiveCamera(120,width/height,0.1,2000)
camera.position.set(10,10,10)
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

    const percentDiv = document.getElementById("per");// 获取进度条元素
    percentDiv.style.width = 0.8*400 + "px";//进度条元素长度
    percentDiv.style.textIndent = 0.8*400 + 5 +"px";//缩进元素中的首行文本
    percentDiv.innerHTML =  "80%";//进度百分比

})
</script>

<style lang="scss" scoped>

</style>
<style>
/* 进度条css样式 */
#container {
    position: absolute;
    width: 400px;
    height: 16px;
    top: 50%;
    left:50%;
    margin-left: -200px;
    margin-top: -8px;
    border-radius: 8px;           
    border: 1px solid #009999;          
    overflow: hidden;
}
#per {
    height: 100%;
    width: 0px;
    background: #00ffff;
    color: #fff;
    line-height: 15px;        
}
</style>