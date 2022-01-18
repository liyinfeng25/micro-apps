import React from 'react';
import actions from './actions'
import './App.css';

function App() {

  React.useEffect(() => {
    actions.onGlobalStateChange(state => {
      console.log('子应用 ===>', state);
      // const { token } = state;
      // 未登录 - 返回主页
      // if (!token) {
      //   this.$message.error("未检测到登录信息！");
      //   return this.$router.push("/");
      // }
    }, true);
  }, [])
  

  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          基于 create-react-app 构建的 react demo 示例
        </a>
      </header>
    </div>
  );
}

export default App;
