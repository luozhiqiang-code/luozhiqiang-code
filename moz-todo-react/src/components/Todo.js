import React, { useEffect, useRef, useState } from "react";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function Todo(props) {
  const [isEditing, setEditing] = useState(false); //isEditing用于表示是否在编辑状态
  const [newName, setNewName] = useState(""); //newName表示编辑后的新名字
  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);

  //编辑输入框一旦改变就将值设置为newName
  function handleChange(e) {
    setNewName(e.target.value);
  }

  //表单提交后，组织表单请求，并修改新名字然后清空newName变量,更改是否编辑状态
  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }
  //对于编辑状态下的待办事项，外观不同。所以用两个不同的表单表示。
  // 编辑表单
  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input
          id={props.id}
          className="todo-text"
          type="text"
          value={newName}
          onChange={handleChange}
          ref={editFieldRef}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}
        >
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  );
  // 视图(编辑完)表单
  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn"
          onClick={() => setEditing(true)}
          ref={editButtonRef}
        >
          Edit <span className="visually-hidden">{props.name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => props.deleteTask(props.id)}
        >
          Delete <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </div>
  );

  const wasEditing = usePrevious(isEditing); //wasEditing记录过去是否处于编辑状态，用于判断编辑到完成编辑转换的过程
  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    }
    if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);

  // 更具是否在编辑状态来选择渲染那一个表单
  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}
