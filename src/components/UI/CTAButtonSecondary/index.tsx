import React from 'react'
import { Link } from 'react-router'
import { CTAButtonProps } from '../../../types'


const CTAButtonSecondary: React.FC<CTAButtonProps> = ({
    content, linkTo 
}) => {
  return (
    <Link to={ linkTo }>
         <button className="bg-transparent border border-white text-white px-6 py-3 rounded-3xl hover:bg-gray-300 hover:text-gray-900 hover:scale-75 transition delay-75">
          { content }
        </button>
    </Link>
  )
}

export default CTAButtonSecondary