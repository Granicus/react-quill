// import React, { Component } from 'react'
// import PropTypes from 'prop-types'
// import ReactDOMServer from 'react-dom/server'
// import { defaultColors, defaultItems } from './utils'

var React = require('react')
var Component = React.Component
var PropTypes = require('prop-types')
var ReactDOMServer = require('react-dom/server')
var Utils = require('./utils')
var defaultColors = Utils.defaultColors
var defaultItems = Utils.defaultItems


class QuillToolbar extends Component {
	constructor(props) {
		super(props)
		this.getClassName = this.getClassName.bind(this)
		this.renderGroup = this.renderGroup.bind(this)
		this.renderChoiceItem = this.renderChoiceItem.bind(this)
		this.renderChoices = this.renderChoices.bind(this)
		this.renderButton = this.renderButton.bind(this)
		this.renderAction = this.renderAction.bind(this)
		this.renderItem = this.renderItem.bind(this)
	}

  getClassName() {
    return `quill-toolbar ${this.props.className || ''}`
  }

  renderGroup(item, key) {
    return (
      <span
        key={ item.label || key }
        className={ 'ql-formats' }
      >
        { item.items.map(this.renderItem) }
      </span>
    )
  }

  renderChoiceItem(item, key) {
    return (
      <option
        key={ item.label || item.value || key }
        value={ item.value }
      >
        { item.label }
      </option>
    )
  }

  renderChoices(item, key) {
    var attrs = {
      key: item.label || key,
      title: item.label,
      className: `ql-${item.type}`
    }

    const choiceItems = item.items.map((item, key) => {
      if (item.selected) {
        attrs.defaultValue = item.value;
      }
      return this.renderChoiceItem(item, key);
    })

    return <select {...attrs}>{ choiceItems }</select>
  }

  renderButton(item, key) {
    return (
      <button
        type='button'
        key={ item.label || item.value || key }
        value={ item.value }
        className={ `ql-${item.type}` }
        title={ item.label }
      >
       { item.children }
      </button>
    )
  }

  renderAction(item, key) {
    return (
      <span
        key={ item.label || item.value || key }
        className={ `ql-${item.type}`}
        title={ item.title }
      >
        { item.children }
      </span>
    )
  }

  renderItem(item, key) {
    switch (item.type) {
      case 'group':
        return this.renderGroup(item, key)
      case 'font':
      case 'header':
      case 'align':
      case 'size':
      case 'color':
      case 'background':
        return this.renderChoices(item, key)
      case 'bold':
      case 'italic':
      case 'underline':
      case 'strike':
      case 'link':
      case 'list':
      case 'bullet':
      case 'ordered':
      case 'indent':
      case 'image':
      case 'video':
        return this.renderButton(item, key)
      default:
        return this.renderAction(item, key)
    }
  }

  render() {
    const { style } = this.props
    const children = this.props.items.map(this.renderItem)
    const __html = children.map(ReactDOMServer.renderToStaticMarkup).join('')
    return (
      <div
        className={ this.getClassName() }
        style={ style }
        dangerouslySetInnerHTML={ { __html } }
      ></div>
    )
  }
}


QuillToolbar.displayName = 'QuillToolbar'

QuillToolbar.propTypes = {
	id:        PropTypes.string,
  className: PropTypes.string,
  items:     PropTypes.array
}
QuillToolbar.defaultItems = defaultItems
QuillToolbar.defaultColors = defaultColors
QuillToolbar.defaultProps = {
	items: defaultItems
}
export default QuillToolbar
