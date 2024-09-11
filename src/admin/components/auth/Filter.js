import React, {useState} from "react"
import { colRef } from "../../../config/firebase"
import { getDocs, where, query} from "firebase/firestore"
import { useEffect } from "react"


export const Filter = ()=>{
    const [filter, setFilter] = useState({
        Visitor: [],
        Contacted: [],
        FrequentVisitor:[],
        OnHoliday:[],
    })
    useEffect = ()=>{
        const fetchOption = async () =>{
        try {
            const ChosenOption = query((colRef), where('status', '===', value));
            const querySnapshot = await getDocs(ChosenOption);
            setFilter(querySnapshot);
        }
        catch(error){
            console.log('Error in retrieving info', error)
        }
    }

}


    return(
      <div>
        <label>Filter</label>
              <select>
                <option onClick={fetchOption()} value='Visitors'>Visitors</option>
                <option onClick={fetchOption()} value="Contacted">Contacted</option>
                <option onClick={fetchOption()} value="FrequentVisitor">FrequentVisitor</option>
                <option onClick={fetchOption()} value='OnHoliday'>OnHoliday</option>
            
              </select>
      </div>
    )     
  
  }