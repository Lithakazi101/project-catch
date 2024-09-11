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

export const ContactButton =({onClick}) =>{

    return(
        <div>
            <button onClick={onClick}>Contact</button>
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