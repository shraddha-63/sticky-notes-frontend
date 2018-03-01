import React,{Component} from 'react';
import './PageOne.css';
import {ActionBar,NotesList,WorkingSpace} from '../../components';
import axios from 'axios';

const baseUrl = process.env.NODE_ENV === "production"?
                  "https://stickynotesbackend.herokuapp.com"
                  :
                  ""

//console.log(process.env.NODE_ENV)
//console.log(baseUrl)

class PageOne extends Component{

  constructor(props){ 
    super(props)
    this.state ={
      notes:[],
      editData:{},
      editDataWithId:{},
      createId: new Set(),
      searchNote:[]
    }
  }

  componentDidMount =()=>{
    axios.get(baseUrl+'/notes')
     .then(res=>{
       console.log(res.data)
        this.setState({
        notes:res.data
     })

   })
   .catch(err=>{
     console.log(err)
   })
   

    setInterval(()=>{
     
      const {notes,editData,editDataWithId,createId} = this.state;      
      const createWithId = [...createId]
      let y = [];

      createWithId.map((data)=>{ 
        y.push({'id':data}) 
      })
      
      let filterEditData = notes.filter(id1 => y.some( 
        id2 => id1.id === id2.id
        )
      );

      if(filterEditData.length > 0){
        this.setState({editDataWithId: filterEditData[0]})
      }

      // console.log(editDataWithId,'updateappi')
      
      this.updateApi(editDataWithId)
    },3000)
  }

  saveApi =(notes)=>{
    axios.post(baseUrl+'/save',notes)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  updateApi =(activeNote)=>{
    console.log('update start '+ JSON.stringify(activeNote))
    axios.post(baseUrl+'/edit',{activeNote})
    .then(response=>{
      console.log(response.data)
      // this.setState({
      //   notes:response.data
      // })
    })
    .catch(error =>{
      console.log(error)
    })  

  }

  deleteApi = (deleteNote) =>{
    console.log('delete note',deleteNote)
     axios.post(baseUrl+'/delete',deleteNote)
     .then(response=>{
       console.log(response.data)
      //  this.setState({
      //    notes:response.data
      //  })
     })
     .catch(error =>{
       console.log(error)
     })
  }

  
  handleFinalData=(data)=>{
    const {createId} = this.state
    if(data.id == null){
      //console.log(data.id)
      const noteWithId = {...data,id:Date.now()}      
      
      this.setState({
        notes:[noteWithId,...this.state.notes],
        editData:noteWithId
      },this.saveApi(noteWithId))
      return
    } 
          
    createId.add(data.id)
    this.setState({
      notes: this.state.notes.map((x)=>{
        if(data.id == x.id){
          return data
        }
        return x
      })
    })
  
  }

  handleEdit=(data)=>{
    this.setState({editData: data})  
  }

  addCallback=()=>{
    this.setState({
      editData:{}
    })
  }
  handleDelete =()=>{
    const { editData,notes} = this.state;
    const afterNoteDeleted = notes.filter((res)=>{
      return res.id !== editData.id
    })
  
    this.setState({
      notes:afterNoteDeleted,
      editData:{}
    },this.deleteApi(editData))
  }
  searchCallback =(searchNote)=>{
    console.log(searchNote,'serachNOte')
    this.setState({searchNote:searchNote
    //editData:{}
  })

  }

    render(){
      const { notes, editData,searchNote } = this.state

        return (
            <div className="container" >
              <div className ="top">
                <ActionBar notes={notes}  searchCallback={this.searchCallback}  
                addCallback ={this.addCallback} deleteCallback={this.handleDelete} />
              </div>
              <div className="main" >
                <NotesList notes={searchNote.length > 0 ? searchNote : notes} editCallBack ={this.handleEdit} />
                <WorkingSpace editNotes={editData} finalSubmitData ={this.handleFinalData} notes={ notes}  />
              </div>
            </div>
        )       
    }
}

export  default PageOne;