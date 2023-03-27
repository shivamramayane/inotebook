import React,{useContext,useState} from 'react'
import Notecontext from "../context/notes/Notecontext"
const Addnote = (props) => {
    const context = useContext(Notecontext);
    const { addnote} = context;
    const [note, setnote] = useState({title:"",description:"",tag:""})
    const handleonclick=(e)=>{
        e.preventDefault();
    addnote(note.title,note.description,note.tag);
    setnote({title:"",description:"",tag:""})
    props.showAlert("add note successfully","success");
    }
    const onchange=(e)=>{
     setnote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div>  <div className="container  ">
    <h1 className=' text-light fs-1 my-2'> Add a Note </h1>
    <form>
      <div className="  mb-3 w-50 text-light fs-3 ">
        <label htmlFor="title" className="form-label">
        Title
        </label>
        <input
          type="text"
          className="form-control text-light bg-transparent border border-2"
          id="title"
          name='title'
          value={note.title}
          minLength={5} required
          aria-describedby="emailHelp"
          onChange={onchange}
        />
        <div id="emailHelp" className="form-text">
        
        </div>
      </div>
      <div className="mb-3 w-50 text-light fs-3">
        <label htmlFor="description" className="form-label">
         Description
        </label>
        <input
          type="text"
          className="form-control text-light bg-transparent border border-2"
          id="description"
          name='description'
          value={note.description}
          minLength={5} required
          onChange={onchange}
        />
      </div>
      <div className="mb-3 w-50 text-light fs-3">
        <label htmlFor="tag" className="form-label">
         Tag
        </label>
        <input
          type="text"
          className="form-control text-light bg-transparent border border-2"
          id="tag"
          name='tag'
          value={note.tag}
          minLength={5} required
          onChange={onchange}
        />
      </div>
      <button disabled={note.title.length<5 ||note.description.length<5 } type="submit" className="btn btn-outline-primary" onClick={handleonclick}>
      Add Note
      </button>
    </form>
    </div></div>
  )
}

export default Addnote