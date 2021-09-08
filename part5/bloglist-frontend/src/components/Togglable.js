import React, {useState, useImperativeHandle} from 'react'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: (visible ? 'none' : '')}
  const showWhenVisible = { display: (visible ? '' : 'none')}

  const toggleVisible = () => {
    if (props.customToggleVisible)
      props.customToggleVisible()
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return { toggleVisible }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisible}> {props.buttonLabel} </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisible}> close </button>
      </div>
    </div>
  )
})

export default Togglable