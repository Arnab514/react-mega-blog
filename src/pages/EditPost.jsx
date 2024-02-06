import React, {useState , useEffect} from 'react'
import { Container, PostForm } from '../components'
import { useNavigate, useParams } from 'react-router-dom'
import appwriteService from '../appwrite/config_1'

function EditPost() {
    const {slug} = useParams()
    const navigate = useNavigate()
    const [post, setPosts] = useState('')

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        }
        else{
            navigate('/')
        }
    } , [slug , navigate])

  return post ? (
    <div className = 'py-8'>
        <Container>
            <PostForm post = {post}/>
        </Container>
    </div>
  ) : null

}

export default EditPost
