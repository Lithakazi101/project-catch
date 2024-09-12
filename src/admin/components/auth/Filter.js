import React, {useState} from "react"
import { colRef } from "../../../config/firebase"
import { getDocs, where, query} from "firebase/firestore"
import { useEffect } from "react"


const useFetchData = (status) => {
    const [filtered, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        setLoading(true);
        const filteredData = async() =>{
            try{
            const q = query(colRef, where('status', '==', status));
            const snapshot = await getDocs(q);
            const data = snapshot.docs.map(doc =>({...doc.data(), id: doc.id}));
           
            setFilteredData(data)
        }catch(error){
            console.error('Error retrieving data', error)
        } finally{
            setLoading(false);
        }
        };
        filteredData();
    },[status] );
    return {filtered, loading};
};
// change the name and make it universal for 
export const ContactedButton =({onClick}) =>{

    return(
        <div>
            <button onClick={onClick}>Contacted Visitors</button>
        </div>
    )
}

export const VisitorsButton =({onClick}) =>{

    return(
        <div>
            <button onClick={onClick}> Visitors</button>
        </div>
    )
}
export const FrequentVisitorButton =({onClick}) =>{

    return(
        <div>
            <button onClick={onClick}>Frequent Visitors</button>
        </div>
    )
}
export const onHolidayButton =({onClick}) =>{

    return(
        <div>
            <button onClick={onClick}>On Holiday Visitors</button>
        </div>
    )
}
const ContactedFx = () =>{
    const {filtered, loading} = useFetchData('Contacted')
    if(loading){
        return <div>loading....</div>
    }

  return(
    <div>
        {filtered.map(user => (
           
      <div key={user.id} className="user-card bg-white p-3 rounded mb-2 shadow-sm">
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </div>
    ))}
    </div>
  )

}
export default ContactedFx;

 export const FrequentVisitorFx = () =>{
    const {filtered, loading} = useFetchData('FrequentVisitor')
    if(loading){
        return <div>loading....</div>
    }

  return(
    <div>
        {filtered.map(user => (
           
      <div key={user.id} className="user-card bg-white p-3 rounded mb-2 shadow-sm">
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </div>
    ))}
    </div>
  )

}



export const OnHolidayFx = () =>{
    const {filtered, loading} = useFetchData('OnHoliday')
    if(loading){
        return <div>loading....</div>
    }

  return(
    <div>
        {filtered.map(user => (
           
      <div key={user.id} className="user-card bg-white p-3 rounded mb-2 shadow-sm">
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </div>
    ))}
    </div>
  )

}


export const VisitorsFx = () =>{
    const {filtered, loading} = useFetchData('Visitors')
    if(loading){
        return <div>loading....</div>
    }

  return(
    <div>
        {filtered.map(user => (
           
      <div key={user.id} className="user-card bg-white p-3 rounded mb-2 shadow-sm">
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </div>
    ))}
    </div>
  )
        }
