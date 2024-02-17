import React from 'react'
import blog_icon from '../../public/blog_icon.svg'

function Logo({size = '10'}) {
  return (
    <img src = {blog_icon} className={` h-${size} mr-3 `} alt="Flowbite Logo"/>
  )
}

export default Logo
