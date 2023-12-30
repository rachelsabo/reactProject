import { useState } from "react";


const ComboBoxComp = (props) => {

    return (
        <label>
            {props.type}: {"  "}
            <select   onChange={e => props.callBack(e.target.value)} >
            <option defaultValue hidden>{'ALL'}</option>
                {
                    props.items.map(item=> (<option key={item.id}>{item.name?item.name: item.FirstName}</option>))
                }
            </select>
        </label>
    );
  };
  
  export default ComboBoxComp;