import React from 'react'
import { Link } from 'react-router'
import { CTAButtonProps } from '../../../types'

const CTAButtonPrimary: React.FC<CTAButtonProps> = ({
    content, linkTo 
}) => {
  return (
    <Link to={ linkTo }>
        <button className="relative lg:px-6 lg:py-3 px-4 py-3 font-bold text-gray-900 rounded-3xl bg-gray-900 hover:scale-75 transition delay-75 group w-full">
            <span className="absolute inset-0 border-2 rounded-3xl bg-gradient-to-t from-gray-100 via-white to-white animate-pulse group-hover:animate-none"></span>
            <span className="relative z-10">{ content }</span>
        </button>
    </Link>
  )
}

export default CTAButtonPrimary