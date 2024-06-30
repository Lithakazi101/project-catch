import React from "react";

export function UserBtn({onClick}){
  return (
    <div>
      <button onClick={onClick}>User</button>
    </div>
  )
}

export function AdminBtn({onClick}){
  return (
<div>
  <button onClick={onClick}> Admin</button>
</div>
  )
}


