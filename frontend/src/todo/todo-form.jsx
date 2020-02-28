import React, { Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Grid from '../template/grid'
import IconButton from '../template/icon-button'
import { changeDescription, search, add, clearForm } from './todoActions'

class TodoForm extends Component {
    constructor(props) {
        super(props)
        this.keyHandler = this.keyHandler.bind(this)
    }

    componentWillMount() {
        this.props.search()
    }

    keyHandler(e) {
        const { add, search, clearForm, description } = this.props 
        
        if(e.key === 'Enter') {
            e.shiftKey ? search() : add(description)
        } else if (e.key === 'Escape') {
            clearForm()
        }
    }

    render() {
        return (
            <div role='form' className='todoForm'>
                <Grid cols='12 9 10'>
                    <input type="text" className='form-control'
                            placeholder='Adicione uma tarefa'
                            onChange={this.props.changeDescription}
                            onKeyUp={this.keyHandler}
                            value={this.props.description}/>
                </Grid>
    
                <Grid cols='12 3 2'>
                    <IconButton style='primary' icon='plus'
                                onClick={() => this.props.add(this.props.description)}>
                    </IconButton>
    
                    <IconButton style='info' icon='search'
                                onClick={this.props.search}>
                    </IconButton>
    
                    <IconButton style='default' icon='close'
                                onClick={this.props.clearForm}>
                    </IconButton>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({ description: state.todo.description })
const mapDispatchToProps = dispatch => bindActionCreators({ add, changeDescription, search, clearForm }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm)