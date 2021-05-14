import React from "react";
import { Button, Checkbox } from "antd";
import styled from "styled-components";
import moment from "moment";
import { useDispatch } from "react-redux";
import { delete_todo, toggle_todo, edit_todo } from "../../store/actions/";

const ItemContainer = ({ after, children }) => {
  return after ? <Item>{children}</Item> : <Item after>{children}</Item>;
};

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  background-color: ${(props) => {
    return props.after ? "pink" : "beige";
  }};
  padding: 8px;
  borderradius: 5px;
`;

export const TodoItem = ({ todo, id }) => {
  const dispatch = useDispatch();

  function onChange(e) {
    console.log(`checked = ${e.target.checked} `);
    dispatch(toggle_todo(id, e.target.checked));
    console.log(todo);
  }

  const deadline = moment(todo.deadline).format("MMMM Do YYYY");
  const after = moment(todo.deadline).isAfter(moment());

  return (
    <ItemContainer after={after}>
      {/* <div
        onChange={(e) => dispatch(edit_todo(e.currentTarget.textContent))}
        contentEditable={true}
        style={{ textDecoration: todo.checked && "line-through" }}
      >
        {todo.text}
      </div> */}

      <input
        style={{ border: "none", background: "none" }}
        type="text"
        value={todo.text}
        onChange={(e) => {
          dispatch(edit_todo(id, e.target.value));
        }}
      />

      <i style={{ textDecoration: todo.checked && "line-through" }}>
        {deadline}
      </i>

      <div>
        <Checkbox
          checked={todo.checked}
          style={{ marginRight: 10 }}
          onChange={onChange}
        ></Checkbox>
        <Button type="primary" danger onClick={() => dispatch(delete_todo(id))}>
          delete
        </Button>
      </div>
    </ItemContainer>
  );
};
