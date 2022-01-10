import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
// 文档描述：https://www.jianshu.com/p/9d75592edb9e
// import reportWebVitals from './reportWebVitals';

// 配置路由命名空间，确保主应用能正确加载
const BASE_NAME = window.__POWERED_BY_QIANKUN__ ? '/react_createreactapp_demo' : ''

/**
 * 渲染函数
 * 两种情况：基座生命周期钩子中运行 / 子应用单独启动时运行
 */
function render (props) {
  const { container } = props;
  ReactDOM.render(
    <React.StrictMode>
      <Router basename={BASE_NAME}>  
        <App />
      </Router>
    </React.StrictMode>,
    container ? container.querySelector('#root') : document.querySelector('#root')
  );
}

/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
 export async function bootstrap() {
  console.log("子应用 ReactMicroApp bootstraped");
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
 export async function mount(props) {
  console.log("子应用 ReactMicroApp mount", props);
  render(props);
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
 export async function unmount(props) {
  const { container } = props;
  console.log("子应用 ReactMicroApp unmount");
  ReactDOM.unmountComponentAtNode(container ? container.querySelector('#root') : document.querySelector('#root'));
}


// 独立运行时，直接挂载应用
if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
