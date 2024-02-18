import React from 'react'
import { Link } from 'react-router-dom'
import appwriteService from '../appwrite/config_1'

function PostCard({$id, title, featuredImage, status, userId, currentUser}) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="max-w-sm h-full flex flex-col justify-around  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className='flex max-w-lg h-3/5 justify-center p-2'>
          <img className="rounded-lg " src={appwriteService.getFilePreview(featuredImage)} alt={title} />
        </div>
        <div className="p-5 h-1/4 ">
          <h5 className="mb-2 text-md font-medium tracking-tight text-gray-900 dark:text-white">{`${title.length > 25 ? title.substring(0, 25) + '...' : title}`}</h5>
          <div className='flex justify-between items-center'>
            <div>
              <span className={`${status == 'active' ? 'dark:bg-green-900 dark:text-green-300' : 'dark:bg-red-900 dark:text-red-300'} inline-flex items-center  text-xs font-medium px-2.5 py-0.5 rounded-full capitalize`}>
                <span className={`w-2 h-2 me-1 ${status == 'active' ? 'bg-green-500' : 'bg-red-500'}  rounded-full`}></span>
                {status}
              </span>
            </div>

            <div>
              {userId == currentUser ? (
                <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  <span className="w-2 h-2 me-1 bg-blue-500 rounded-full"></span>
                  Owner
                </span>
              ) : null}

            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PostCard



{/* <Link to = {`/posts/${$id}`}>
        <div className = 'w-full bg-gray-100 rounded-xl p-4'>
            <div className = 'w-full justify-center mb-4'>
                src = {appwriteService.getFilePreview(featuredImage)} 
                alt = {title}
                <img className = 'rounded-xl'/> 
            </div>
            <h2 className = 'text-xl font-bold'> {title} </h2>
        </div>
    </Link> */}