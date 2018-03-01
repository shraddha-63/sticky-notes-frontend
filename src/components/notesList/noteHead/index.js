import React,{Component} from 'react';
import './NoteHead.css';
import moment from 'moment';


class NoteHead extends Component{

    editHandler =()=>{
      const { editCallback,dataNote} = this.props
      editCallback(dataNote)
    }

    render(){
        const { dataNote} = this.props
        
        return(
            <div className="note-head" onClick = {this.editHandler}>
                 <div className ="note-top">
                   <span className ="note-title">{dataNote.title}</span>
                   <span className ='note-time'>{moment(dataNote.id).fromNow()}</span>
                 </div>
                 <div className="note-description">
                 <span> {dataNote ?dataNote.description.slice(0,40):""} </span>
                 <br/>
                 <span>{dataNote ?dataNote.description.slice(40,100):""}</span>
                 </div>
                 
            </div>
        )
    }
}
export default NoteHead