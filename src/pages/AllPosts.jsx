import React, {useEffect , useState} from 'react'
import PostCard from '../components'
import Container from '../components'
import appwriteService from '../appwrite/config_1'

function AllPosts() {
    const [posts , setPosts] = useState('')
    appwriteService.getPosts([]).then((post) => {
        if (post) {
            setPosts(posts.documents)
        }
    })
  return (
    <div>
      <Container>
        <div className = 'flex flex-wrap'>
        {posts.map((post) => (
            <div key = {post.$id}  className = 'p-2 w-1/4'>
                <PostCard key = {post.$id} post = {posts}/>
            </div>
        ))}
        </div>
      </Container>
    </div>
  )
}

export default AllPosts
