import React,{Component} from 'react';
import './NotesList.css'
import NoteHead from './noteHead'
class NotesList extends Component{

  

    render(){
        const { editCallBack,deleteCallback} = this.props
        
        return (
            <div className="list" >
              {
                  this.props.notes.map((x)=>{
                      return <NoteHead dataNote={x} key={x.id} editCallback ={editCallBack}  />
                  })
              }
            </div>
        )       
    }
}

export  default NotesList;