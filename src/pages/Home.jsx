import React, {useEffect , useState} from 'react'
import Container from '../components'
import appwriteService from '../appwrite/config_1'
import PostCard from '../components'

function Home() {
    const [posts, setPost] = useState(null)

    useEffect = (() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPost(posts.documents)
            }
        })
    } , [])

    if (posts.length === 0) {
        return (
            <div className = "w-full py-8 mt-4 text-center" >
                <Container>
                    <div className = "flex flex-wrap">
                        <div className = "p-2 w-full">
                            <h1 className = "text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    else{
        <div className = 'w-full py-8'>
            <Container>
                {posts.map((post) => (
                    <div key={post.$id}> 
                        <PostCard {...post}/>
                    </div>
                ))}
            </Container>
        </div>
    }
  
}

export default Home
