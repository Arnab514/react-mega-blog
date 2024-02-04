import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client;
    Databases;
    bucket;
    
    constructor() {
        this.client.setEndpoint(config.appwriteUrl)
                   .setProject(config.appwriteProjectId)
        this.databases = new Databases(this.client);   
        this.bucket = new Storage(this.client);   
    }

    async createPost ({title , slug , content , featuredImage , status , userId}) {
        try {
            await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } 
        catch (error) {
            console.log("APPWRITE SERVICE :: createPost :: Error" , error)
        }
    }

    async updatePost (slug , {title , content , featuredImage , status}) {
        try {
            await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } 
        catch (error) {
            console.log("APPWRITE SERVICE :: updatePost :: Error" , error)
        }
    }

    async deletePost (slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true
        } 
        catch (error) {
            console.log("APPWRITE SERVICE :: deletePost :: Error" , error)
            return false
        }
    }

    async getPost (slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true
        } 
        catch (error) {
            console.log("APPWRITE SERVICE :: getPost :: Error" , error)
            return false
        }
    }

    async getPosts (queries = [Query.equal("status" , "active")] ) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries
            )
            return true
        } 
        catch (error) {
            console.log("APPWRITE SERVICE :: getPosts :: Error" , error)
            return false
        }
    }

    //file services
    async uploadFile (file) {
        try {
            await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
            return true
        } 
        catch (error) {
            console.log("APPWRITE SERVICE :: uploadFile :: Error" , error)
            return false
        }
    }

    async uploadFile (fileId) {
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true
        } 
        catch (error) {
            console.log("APPWRITE SERVICE :: deleteFile :: Error" , error)
            return false
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId
        )
    }
}

const service = new Service()
export default service