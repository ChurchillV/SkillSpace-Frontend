import React from 'react'
import { ActionButtonProps } from '../../../types'

const ActionButtonPrimary: React.FC<ActionButtonProps> = ({
    content, action, icon
}) => {
  return (
    <button
        onClick={() => action()}
        className="btn-primary">
        <span className="">{ icon }</span>
        <span className="">{ content }</span>
    </button>
  )
}

export default ActionButtonPrimary