import React from "react"; //导入React库
import ReactDOM from "react-dom"; //导入ReactDOM库
import "./index.css"; //导入css文件
import App from "./App"; //导入自定义APP组件
import reportWebVitals from "./reportWebVitals"; //优化加载性能的组件

// index.js作为最终的js,将渲染需要的组件和内容导入此处汇总。最后由reactDOM渲染至index.html页面的相应位置。
reportWebVitals();
// 定义数据，用于传输至页面组件中显示，模拟从数据库汇总提取数据。
const DATA = [
  { id: "todo-0", name: "Eat", completed: true },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Repeat", completed: false },
];

// React的DOM将DATA数据导入APP的props,然后将APP标签挂到index.html页面的root标签里面，最后渲染整个页面。
ReactDOM.render(<App tasks={DATA} />, document.getElementById("root"));
