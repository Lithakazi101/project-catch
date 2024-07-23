import React from "react";

export function UserBtn({onClick}){
  return (
    <div>
      <button onClick={onClick} className="rounded border border-neutral-700 p-10 active:cursor-grabbing">User</button>
    </div>
  )
}

export function AdminBtn({onClick}){
  return (
<div>
  <button onClick={onClick} className="rounded border border-neutral-800 p-10 active:cursor-grabbing"> Admin</button>
</div>
  )
}


