import React,{Component} from 'react';
import './WorkingSpace.css'
class WorkingSpace extends Component{

    constructor(props){
        super(props)
          
        this.state ={
         notesText:"",
         titleText:"",
         id:null
        }
    }

    componentWillReceiveProps = (nextProps) =>{
        // console.log(nextProps.editNotes.id,this.props.editNotes.id)
        // console.log(nextProps.editNotes.id != this.props.editNotes.id)        
        if(nextProps.editNotes && nextProps.editNotes.id != this.props.editNotes.id){
            const {title,description,id} = nextProps.editNotes
            this.setState({
                titleText:title,
                notesText:description,
                id
            })
        }
        if(nextProps.editNotes.id == null || nextProps.editNotes == undefined){
            this.setState({
                titleText:'',
                notesText:'',
                id:null
            })
        }   
    }


    handleInput=(e)=>{
       const { value, name} = e.target;
       //console.log([name])
       this.setState({
           [name]:value,
       },this.handleSubmit)
      
    }


    handleSubmit=()=>{
        console.log('tetst submit')
        const { titleText,notesText,id } = this.state;  
        //console.log(titleText)        
        // if(!notesText.length || (!notesText.length && !titleText)){
        //     return
        // }       
        this.props.finalSubmitData({  title: titleText ? titleText :notesText.slice(0,20), 
            description:notesText,
            content:notesText.length,
            id:id
        })
        
    }

    render(){
        const { notesText, titleText,focus} = this.state;
        let dynamicTitle = titleText;
       
        return (
            <div className="content" >             
                <div className="title">
                   <input type="text" name ="titleText" value ={dynamicTitle} 
                   placeholder="Enter title here" className="title" onChange={this.handleInput} 
                     />
                </div>

                 <div className ="description-input">             
                   <textarea name="notesText" value={notesText} placeholder="Enter Your Notes Here....."
                   onChange={this.handleInput}></textarea>
                </div>
                {/* <div className="submit-button">
                  <input type="submit" value="Save" onClick={this.handleSubmit}/>
                </div>  */}
            </div>
        )       
    }
}

export  default WorkingSpace;