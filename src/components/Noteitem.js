import React, { useContext } from 'react'
import Notecontext from "../context/notes/Notecontext"
const Noteitem = (props) => {
    const context=useContext(Notecontext)
    const {deletenote}=context;
    const {note,updatenote}=props;
  return (
    <div className="col-md-3"> 
    <div className="card my-3 bg-transparent border border-2"> 
        <div className ="card-body text-light ">
        <h5 className ="card-title text-light ">{note.title}</h5>
        <p className ="card-text">{note.description}</p> 
        <i className="fa-regular text-light fa-trash-can mx-2" onClick={()=>{deletenote(note._id);
        props.showAlert("deleted successfully","deleted")}}></i>
        <i className="fa-regular text-light  fa-pen-to-square mx-2" onClick={()=>{updatenote(note);}}></i>
        </div>
    </div>
</div>
   
  )
}

export default Noteitem