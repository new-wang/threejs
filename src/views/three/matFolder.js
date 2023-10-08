import dat from "dat.gui";

// 创建一个GUI对象
const gui = new dat.GUI();
const matFolder = gui.addFolder('pbr');
// 修改gui界面默认的style属性
gui.domElement.style.right = '0px'
gui.domElement.style.width = '500px'

 export default matFolder;