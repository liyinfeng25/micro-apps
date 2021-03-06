import Vue from 'vue'
import VueRouter from "vue-router";
import App from './App.vue'
import routes from './routes'

Vue.use(VueRouter);
Vue.config.productionTip = false

let router = null;
let instance =  null;

/**
 * 渲染函数
 * 两种情况：基座生命周期钩子中运行 / 子应用单独启动时运行
 */
function render (props = {}) {
  const { container } = props 
  router = new VueRouter({
    // 配置路由命名空间，确保主应用能正确加载
    base: window.__POWERED_BY_QIANKUN__ ? "/vue_cli_demo" : "/",
    mode: "history",
    routes,
  });

  console.log('==>', container)

  instance = new Vue({
    router,
    render: h => h(App),
  }).$mount(container ? container.querySelector('#app') : '#app')
}

/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
 export async function bootstrap() {
  console.log("子应用 VueMicroApp bootstraped");
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
 export async function mount(props) {
  console.log("子应用 VueMicroApp mount", props);
  render(props);
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
 export async function unmount() {
  console.log("子应用 VueMicroApp unmount");
  instance.$destroy();
  instance = null;
  router = null;
}

// 独立运行时，直接挂载应用
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}
