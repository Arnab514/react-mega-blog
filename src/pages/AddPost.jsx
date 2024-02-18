import React from 'react'
import {Container} from '../components'
import {PostForm}  from '../components'

function AddPost() {
  return (
    <div className='py-8 h-screen'>
        <Container>
            <PostForm />
        </Container>
    </div>
  )
}

export default AddPost