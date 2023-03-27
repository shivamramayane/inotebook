import React, { useState } from "react";
import Notecontext from "./Notecontext";

const Notestate =(props)=>{
    const host = "http://localhost:5000"
   const notesInitial=[]
    const [notes,setNotes]=useState(notesInitial)

    const getnotes = async () => {
        // API Call 
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          }
        });
        const json = await response.json()
        setNotes(json)
      }
   //add note
     const addnote = async (title, description, tag) => {
            // TODO: API Call 
            const response = await fetch(`${host}/api/notes/addnote`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
              },
              body: JSON.stringify({title, description, tag})
            });
            const note = await response.json();
        setNotes(notes.concat(note))
    }

   //delete note
    const deletenote = async (id) => {
        // API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          }
        });
        const json = response.json();
        console.log(json)
       
    const newNotes = notes.filter((note)=>{return note._id!==id})
    setNotes(newNotes)  
    }
   
   // edit note
     const editnote = async (id, title, description, tag) => {
        // API Call 
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({title, description, tag})
        });
        const json = await response.json();
        console.log(json)
         let newNotes = JSON.parse(JSON.stringify(notes))
     //logic to edit in
    for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if(element._id===id){
          newNotes[index].title=title;
          newNotes[index].description=description;
          newNotes[index].tag=tag;
          break;
        }
     
       } 
       setNotes(newNotes);
}
    return (
     <Notecontext.Provider value={{notes,setNotes,addnote,deletenote,editnote,getnotes}}>
        {props.children} 
     </Notecontext.Provider>   
    )
}



export default Notestate;