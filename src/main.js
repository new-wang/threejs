/*
 * @Author: new-wang
 * @Date: 2023-07-07 13:53:58
 * @LastEditors: new-wang
 * @LastEditTime: 2023-07-07 13:59:19
 * @Description: 
 */
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'


// import * as THREE from 'three'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
