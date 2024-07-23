import { useState } from "react";
import UsersList from "../../../config/firebase";

export const KanBan = ()=>{
    return (
       <div className="h-screen w-full bg-neutral-100 text-neutral-800">
        <Board/>
       </div>
    )
}

const Board = ()=> {
    const [cards, setCards] = useState([]);
    return (<div className="flex h-full w-full gap-3 overflow-scroll p-12">
        <Column1 title='Visitors'
         column='visitor'
         headingColor="text-neutral-500"
         cards={cards}
         setCards={setCards}
         />
        <Column2 title='Contacted'
         column='contacted'
         headingColor="text-neutral-500"
         cards={cards}
         setCards={setCards}
         />
          <Column3 title='On Holiday'
         column='on holiday'
         headingColor="text-neutral-500"
         cards={cards}
         setCards={setCards}
         />
          <Column4 title='Frequent Visitor'
         column='frequent visitor'
         headingColor="text-neutral-500"
         cards={cards}
         setCards={setCards}
         />
    </div>)
}

const Column1 = ({title, headingColor, column,cards, setCards}) =>{
const [active, setActive] = useState(false);

    return (
    <div className="w-56 shrink-0">
        <div className="mb-3 flex items-center justify-between">
            <h3 className={`font-medium ${headingColor}`}>{title}</h3>
            
        </div>
        <div className={`h-full w-full transition-colors ${active ? "bg-neutral-800/50" : "bg-neutral-800/0"}`}>
            <UsersList/>
            </div>

    </div>)
}

const Column2 = ({title, headingColor, column,cards, setCards}) =>{
    const [active, setActive] = useState(false);
    return (
        <div className="w-56 shrink-0">
            <div className="mb-3 flex items-center justify-between">
                <h3 className={`font-medium ${headingColor}`}>{title}</h3>
                
            </div>
            <div className={`h-full w-full transition-colors ${active ? "bg-neutral-800/50" : "bg-neutral-800/0"}`}>
               
                </div>
    
        </div>)
}
const Column3 = ({title, headingColor, column,cards, setCards}) =>{
    const [active, setActive] = useState(false);
    return (
        <div className="w-56 shrink-0">
            <div className="mb-3 flex items-center justify-between">
                <h3 className={`font-medium ${headingColor}`}>{title}</h3>
                
            </div>
            <div className={`h-full w-full transition-colors ${active ? "bg-neutral-800/50" : "bg-neutral-800/0"}`}>
               
                </div>
    
        </div>)
}
const Column4 = ({title, headingColor, column,cards, setCards}) =>{
    const [active, setActive] = useState(false);
    return (
        <div className="w-56 shrink-0">
            <div className="mb-3 flex items-center justify-between">
                <h3 className={`font-medium ${headingColor}`}>{title}</h3>
                
            </div>
            <div className={`h-full w-full transition-colors ${active ? "bg-neutral-800/50" : "bg-neutral-800/0"}`}>
               
                </div>
    
        </div>)
}
