import React,{Component} from 'react'
import './ActionBar.css'
class ActionBar extends Component{

    onClickNew=()=>{    
        this.props.addCallback()
        //console.log('efewfewfew')
    }

    onClickDelete=()=>{       
       this.props.deleteCallback()
    }

    onChangeInput = (e) =>{
        const textToSearch = e.target.value
        const { notes,searchCallback } = this.props

       let searchNote = notes.filter((x)=>{
            if(x.title.startsWith(textToSearch) || x.description.startsWith(textToSearch)){
                return x  
            }
            else if(x.title.includes(textToSearch) || x.description.includes(textToSearch)){
                 return x
            }
        })
        
        searchCallback(searchNote)
    }
  
    render(){
        const {notes} = this.props
        return (
            <div className='bar' >
                
               <div className='logo'>StickyNotes</div>

                <div className='action-button create-button' onClick={this.onClickNew}>
                  <i class="fa fa-plus" aria-hidden="true"></i>
                </div>
                <div className='action-button delete-button' onClick={this.onClickDelete}>
                  <i class="fa fa-trash" aria-hidden="true"></i>
                </div>
            
               <input type='text'  onChange={this.onChangeInput} placeholder="Search Your Note Here..." className='search-input'/>

            </div>
        )       
    }
}

export  default ActionBar;