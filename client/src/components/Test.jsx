import React from "react"
import "./styles.css"

export default function Test(){
  return (
    <div className="test">
        <div class="container">
            <input className="input" name="text" type="text" required=""/>
            <label className="label">Username</label>
        </div>
    </div>
  )
};

