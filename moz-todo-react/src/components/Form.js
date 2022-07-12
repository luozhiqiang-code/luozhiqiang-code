import React, { useState } from "react";

function Form(props) {
  const [name, setName] = useState("");
  //输入框一改变就将其中的值设置为task的name
  function handleChange(e) {
    setName(e.target.value);
  }

  //阻止表单提交向服务器发送请求，检查输入是否为空，再根据输入的name添加新任务
  function handleSubmit(e) {
    e.preventDefault();
    if (!name) {
      alert("The task name is empty, please key in a task name!");
      return;
    }
    props.addTask(name);
    setName("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange} //监控输入框状态
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}

export default Form;
