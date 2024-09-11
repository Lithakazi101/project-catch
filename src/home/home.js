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

export function HomeBtn({onClick}){
 return(
 <div>
    <button  className="rounded border border-neutral-800 p-2 active:cursor-grabbing" onClick={onClick}>Home</button>
  </div>)
}

