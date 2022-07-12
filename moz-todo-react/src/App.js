import React, { useState, useRef, useEffect } from "react"; //导入React库，组件状态工具，组件引用工具，useEffect函数工具
import Todo from "./components/Todo"; //引入自定义待办事项Todo组件
import Form from "./components/Form"; //引入自定义表单Form组件
import FilterButton from "./components/FilterButton"; //引入自定义过滤按钮FilterButton组件
import { nanoid } from "nanoid"; //引入nanoid组件用于给相应的对象赋予唯一标识码

//usePrevious()函数用于记录过去的状态，用useRef()引用对象来记录，并且这种看似多此一举的返回方式有利于异步执行。
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

// 用于过滤出符合条件的对象：对于所有对象返回true，从而选中所有对象，对于completed对象则返回completed属性为true的对象，Active类似。
const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

// 用object.keys()函数从对象数组中取出关键字，组成过滤条件的名字数组
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks); //useState(initialState)返回一个state和更新state的函数
  const [filter, setFilter] = useState("All"); //用useState()设置过滤按钮
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter} //将setFilter()传入FilterButton中的props，供组件用该函数来切换过滤按钮状态
    />
  ));

  // 切换完成状态函数：更具传入的id，切换相应的对象的完成状态
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  // 删除函数：根据传入的id删除相应的任务
  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => task.id !== id);
    setTasks(remainingTasks);
  }

  // task清单：先通过FILTER_MAP和filter()函数过滤出符合条件的对象然后将对象数据填充到Todo组件返回
  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  //添加task函数：给表单添加新的task，每个task有唯一标识id，name,completed。
  function addTask(name) {
    // alert(name);
    const newTask = { id: "id-" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  }

  //获取taskList的长度，用于显示在表单中。
  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  // 编辑task函数：传入需要编辑的task的id和新名字
  function editTask(id, newName) {
    const editedTasklist = tasks.map((task) => {
      if (task.id === id) {
        return { task, name: newName };
      }
      return task;
    });
    setTasks(editedTasklist);
  }

  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length); //记录过去的任务数量
  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      //如果现在的任务数量减少了，表示刚刚删除了任务，因此focus到显示任务标题上
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);
  ///////////////////////////////////////  APP组件返回的页面
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">{filterList}</div>
      <h2 id="list-heading" tabIndex={-1} ref={listHeadingRef}>
        {headingText}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}
// 导出APP组件，供其他组件使用
export default App;
