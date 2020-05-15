import React, { Component } from 'react'
import {IoIosArrowDown, IoIosArrowUp, IoMdCheckmark} from 'react-icons/io'
import './styles.css'


export default class Dropdown extends Component {
  constructor(props){
    super(props)
    this.state = {
      isOpen: false,
      title: this.props.title,
      options: this.props.options.map(o => { return {label: o, selected: false}}),
      wrapperRef: null
    }

    this.setWrapperRef = this.setWrapperRef.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef = node => {
    this.setState({...this.state, wrapperRef: node})
  }

  handleClickOutside = e => {
    const { wrapperRef } = this.state
    if (wrapperRef && !wrapperRef.contains(e.target)) {
      this.setState({...this.state, isOpen: false})
    }
  }

  toggleDropdown = () => {
    this.setState({...this.state, isOpen: !this.state.isOpen})
  }

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
  }

  renderOptions = () => {
    const {options} = this.state
    return (
      <div>
        {
          options.map((o, i) => {
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
    const{isOpen, title} = this.state
    return (
      <div ref={this.setWrapperRef} className='wrapper-dropdown'>
        <div onClick={this.toggleDropdown}>
          {title}
          {isOpen ? <IoIosArrowDown style={{float: 'right'}}/> : <IoIosArrowUp style={{float: 'right'}}/>}
        </div>
        { isOpen ? 
            <ul className='wrapper-list'>
              {this.renderOptions()}
            </ul>
          : null
        }
      </div>
    )
  }
}

