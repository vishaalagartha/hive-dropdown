import React, { Component } from 'react'
import {IoIosArrowDown, IoIosArrowUp, IoMdCheckmark} from 'react-icons/io'
import './styles.css'


export default class Dropdown extends Component {
  constructor(props){
    super(props)
    this.state = {
      isOpen: false,
      title: this.props.title,
      options: this.props.options.map(o => { return {label: o, selected: false, show: true}}),
      query: '',
      wrapperRef: null
    }

    this.setWrapperRef = this.setWrapperRef.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
  }

  /* Functionality to handle click outside using a wrapper reference */
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  /* Set wrapper reference */ 
  setWrapperRef = node => {
    this.setState({...this.state, wrapperRef: node})
  }

  /* If clicks are outside wrapper reference, close the dropdown */
  handleClickOutside = e => {
    const { wrapperRef } = this.state
    if (wrapperRef && !wrapperRef.contains(e.target)) {
      this.setState({...this.state, isOpen: false})
    }
  }

  /* Parent's callback */
  handleDropdownValueChange = () => {
    const selectedOptions = this.state.options.filter(o => o.selected)
                                              .map(o => o.label)
    this.props.onValueChange(selectedOptions)
  }

  /* Toggle the dropdown */
  toggleDropdown = (fromIcon, e) => {
    const {search} = this.props
    const {isOpen} = this.state
    // If search is enabled, only close
    // when user clicks on arrow icon
    if(search){
      if(isOpen && fromIcon){
        e.stopPropagation()
        this.setState({...this.state, isOpen: false})
      }
      else{
        this.setState({...this.state, isOpen: true})
      }

    }
    // If search is disabled, flip state whenever user
    // clicks inside dropdown label
    else{
      this.setState({...this.state, isOpen: !isOpen})
    }
  }

  /* Modify selected items */
  toggleSelect = i => {
    const {options} = this.state
    const {multiselect} = this.props

    // If multiselect, toggle current selected value
    if(multiselect){
      options[i].selected = !options[i].selected
      this.setState({...this.state, options})
    }
    // If single select, make all options to be inactive except for selected one
    else{
      // No need to reselect already chosen one
      if(options[i].selected) return

      const newOptions = options.map(o => {
        return {...o, selected: false}
      })
      newOptions[i].selected = true
      this.setState({...this.state, options: newOptions, title: newOptions[i].label})
    }
    this.handleDropdownValueChange()
  }

  /* Set all options to selected */
  selectAll = () => {
    const newOptions = this.state.options.map(o => {
      return {...o, selected: true}
    })
    this.setState({...this.state, options: newOptions})
    this.handleDropdownValueChange()
  }

  /* Set all options to be deselected */
  deselectAll = () => {
    const newOptions = this.state.options.map(o => {
      return {...o, selected: false}
    })
    this.setState({...this.state, options: newOptions})
    this.handleDropdownValueChange()
  }

  /* Handle search queries */
  handleSearch = e => {
    const query = e.target.value
    const newOptions = this.state.options.map(o => {
      // Check if query substring is inside the option label
      if(o.label.toUpperCase().indexOf(query.toUpperCase())>-1){
        return {...o, show: true}
      }
      else {
        return {...o, show: false}
      }

    })
    this.setState({...this.state, query, options: newOptions})
  }

  /* Helper function to render options */
  renderOptions = () => {
    const {options} = this.state
    return (
      <div>
        {
          options.filter(o => o.show).map((o, i) => {
            return (
              <li key={i} onClick={() => this.toggleSelect(i)} className={o.selected ? 'active' : null}>
                <label style={o.selected ? {fontWeight: 'bold'} : null}>{o.label}</label>
                {o.selected ?
                  <IoMdCheckmark style={{display: 'inline-block'}}/>
                  :
                  null
                }
              </li>
            )
          })
        }  
      </div>
    )
  }


  render() {
    const {search, multiselect, selectAll} = this.props
    const{isOpen, title, query} = this.state
    return (
      <div ref={this.setWrapperRef} className='wrapper-dropdown'>
        <div onClick={() => this.toggleDropdown(false)}>
          { search && isOpen ?
            <input placeholder='Search...' size='20' value={query} onChange={this.handleSearch}/>
            :
            title
          }
          {isOpen ? <IoIosArrowDown className='icon-right' onClick={(e) => this.toggleDropdown(true, e)}/> : <IoIosArrowUp className='icon-right'/>}
        </div>
        { isOpen ? 
            <ul style={multiselect ? {marginTop: '80px'} : null} className='wrapper-list'>
              {this.renderOptions()}
            </ul>
          : null
        }
          { isOpen && multiselect  && selectAll ?
            <ul className='options'>
              <li onClick={this.selectAll}><label>Select All</label></li>
              <li onClick={this.deselectAll}><label>Deselect All</label></li>
            </ul>
            : null
          }
      </div>
    )
  }
}

