import React, {useContext,useEffect,useRef,useState} from 'react'
import Notecontext from "../context/notes/Notecontext"
import Addnote from './Addnote';
import Noteitem from './Noteitem';
import {useNavigate} from 'react-router-dom';

const Notes = (props) => {
    const context = useContext(Notecontext);
    const navigate = useNavigate();
    const {notes, getnotes,editnote} = context;
    const [note, setnote] = useState({id:"",etitle:"",edescription:"",etag:""})
    useEffect(() => {
        if(localStorage.getItem('token')){
        getnotes();
        }
        else{
            navigate("/login", {replace:true});
        }
         // eslint-disable-next-line
    }, [])
    const updatenote=(currentnote)=>{
    ref.current.click();
    setnote({id:currentnote._id,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag});
  
}
    const ref = useRef(null);
    const refclose = useRef(null);

    const handleonclick=(e)=>{
        editnote(note.id,note.etitle,note.edescription,note.etag);
        refclose.current.click();
        props.showAlert("update note successfully","success");
    }
    const onchange=(e)=>{
     setnote({...note,[e.target.name]:e.target.value})
    }
    return (
        <>
        <Addnote showAlert={props.showAlert}/>
        <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" minLength={5} required value={note.etitle} aria-describedby="emailHelp" onChange={onchange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" minLength={5} required name="edescription" value={note.edescription} onChange={onchange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onchange} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 ||note.edescription.length<5 }  onClick={handleonclick} type="button" className="btn btn-primary">Update Note</button>
      </div>
    </div>
  </div>
</div>
        <div className="row my-3  ">
            <h2 className='text-light'>Your Note</h2> 
            <div  className='container mx-2 text-dark'>
            {notes.length===0 && " please add notes on your account"}
            </div>
            {notes.map((note)=>{
                return <Noteitem key={note._id} updatenote={updatenote} showAlert={props.showAlert}note={note}/>  
            })}
            </div>
            </>
    )
}

export default Notes