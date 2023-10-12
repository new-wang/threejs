<!--
 * @Author: new-wang
 * @Date: 2023-10-12 15:45:39
 * @LastEditors: new-wang
 * @LastEditTime: 2023-10-12 17:16:24
 * @Description: Mesh 面重合渲染测试
-->
<template>
    <div>
        <div id="geometry"></div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { Scene,Mesh,PlaneGeometry,MeshLambertMaterial,DoubleSide,AmbientLight,PerspectiveCamera,WebGLRenderer,AxesHelper } from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const width = window.innerWidth;
const height = window.innerHeight;

const scene = new Scene();
const geometry = new PlaneGeometry(250,250);
const material = new MeshLambertMaterial({
    color: 0x00ffff,
    side: DoubleSide
})
const mesh = new Mesh(geometry,material)

const geometry2 = new PlaneGeometry(300,300);
const material2 = new MeshLambertMaterial({
    color: 0xff6666,
    side: DoubleSide
})
const mesh2 = new Mesh(geometry2,material2)

// 环境光
const ambient = new AmbientLight(0xffffff, 0.4);
scene.add(ambient);

// 相机
const camera = new PerspectiveCamera(100,width/height,0.1,3000)
camera.position.set(500, 500, 500)
camera.lookAt(0, 0, 0)

// 1、
// 两个面重合会出现闪烁问题
// 解决：两个矩形Mesh拉开距离  
// 适当偏移，解决深度冲突，偏移尺寸相对模型尺寸比较小，视觉上两个平面近似还是重合效果
// mesh2.position.z = -1;


//1、 间隙很小，深度冲突
// 当两个面间隙很小，也可能出现深度冲突。从纯理论的角度，
// 你能分清0和0.0000...0000001的大小，但是实际上，电脑GPU精度是有限的

// 2、透视投影相机对距离影响（深度冲突）

// 第一步：设置两个Mesh平面的距离相差0.1，课件中案例源码你可以看到，没有深度冲突导致的模型闪烁问题
// mesh2.position.z = 0;
// mesh2.position.z = 0.1;
// camera.position.set(292, 223, 185);

// 第二步：改变相机.position属性，你会发现当相机距离三维模型较远的时候，两个面也可能出现深度冲突，
// 当然你也可以通过相机控件OrbitControls缩放功能，改变相机与模型的距离，进行观察
// camera.position.set(292*5, 223*5, 185*5)
// 透视投影相机的投影规律是远小近大，和人眼观察世界一样，
// 模型距离相机越远，模型渲染的效果越小，两个mesh之间的间距同样也会变小。
// 当两个Mesh和相机距离远到一定程度，两个模型的距离也会无限接近0

// 3、webgl渲染器设置对数深度缓冲区
// 两个矩形平面距离比较近，相差0.1
mesh2.position.z = 0;
mesh2.position.z = 0.1;
camera.position.set(292*5, 223*5, 185*5);
// 当一个三维场景中有一些面距离比较近，有深度冲突，
// 你可以尝试设置webgl渲染器设置对数深度缓冲区logarithmicDepthBuffer: true来优化或解决。
// logarithmicDepthBuffer: true作用简单来说，就是两个面间距比较小的时候，
// 让threejs更容易区分两个面，谁在前，谁在后

//* */ 有一点要注意，当两个面间隙过小，或者重合，你设置webgl渲染器对数深度缓冲区也是无效的


scene.add(mesh);
scene.add(mesh2);

//渲染
const renderer = new WebGLRenderer({
    antialias:true,//锯齿属性
    logarithmicDepthBuffer: true
})
renderer.setSize(width,height)
renderer.render(scene,camera)
renderer.setPixelRatio(window.devicePixelRatio);//像素比
renderer.setClearColor(0x444444,1);//背景颜色
renderer.render(scene,camera)

// 相机控件
const controls = new OrbitControls(camera,renderer.domElement)
controls.addEventListener('change', function () {
    renderer.render(scene, camera); //执行渲染操作
});
// controls.target.set(500,500,500)
// controls.target.set(292*5, 223*5, 185*5)
// controls.update();//更新一下
// 坐标系
const axesHelper = new AxesHelper(500)
scene.add(axesHelper)

onMounted(()=>{
    document.getElementById('geometry').appendChild(renderer.domElement);
    
})

</script>

<style lang="scss" scoped>

</style>
<!--
 *                        _oo0oo_
 *                       o8888888o
 *                       88" . "88
 *                       (| -_- |)
 *                       0\  =  /0
 *                     ___/`---'\___
 *                   .' \\|     |// '.
 *                  / \\|||  :  |||// \
 *                 / _||||| -:- |||||- \
 *                |   | \\\  - /// |   |
 *                | \_|  ''\---/''  |_/ |
 *                \  .-\__  '-'  ___/-. /
 *              ___'. .'  /--.--\  `. .'___
 *           ."" '<  `.___\_<|>_/___.' >' "".
 *          | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *          \  \ `_.   \_ __\ /__ _/   .-` /  /
 *      =====`-.____`.___ \_____/___.-`___.-'=====
 *                        `=---='
 * 
 * 
 *      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * 
 *            佛祖保佑     永不宕机     永无BUG
 -->
<!--
 *                        .::::.
 *                      .::::::::.
 *                     :::::::::::
 *                  ..:::::::::::'
 *               '::::::::::::'
 *                 .::::::::::
 *            '::::::::::::::..
 *                 ..::::::::::::.
 *               ``::::::::::::::::
 *                ::::``:::::::::'        .:::.
 *               ::::'   ':::::'       .::::::::.
 *             .::::'      ::::     .:::::::'::::.
 *            .:::'       :::::  .:::::::::' ':::::.
 *           .::'        :::::.:::::::::'      ':::::.
 *          .::'         ::::::::::::::'         ``::::.
 *      ...:::           ::::::::::::'              ``::.
 *     ````':.          ':::::::::'                  ::::..
 *                        '.:::::'                    ':'````..
 -->