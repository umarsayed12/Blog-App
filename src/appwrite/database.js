import { Client, Databases, Storage, ID, Query } from "appwrite";
import config from "../config/config";

export class Services {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteURL)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // Handle Post Services

  async createPost({
    title,
    slug,
    content,
    featuredImage,
    status,
    userId,
    username,
  }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
          username,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      throw error;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("File not found!");
    }
  }

  async getAllPost(queries = [Query.equal("status", "Active")]) {
    // List All those which are Active.
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries
      );
    } catch (error) {
      throw error;
    }
  }

  // File Upload ki services

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(config.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async getFilePreview(fileId) {
    return this.bucket.getFileView(config.appwriteBucketId, fileId);
  }

  async downloadFile(fileId) {
    try {
      return await this.bucket.downloadFile(fileId);
    } catch (error) {
      throw error;
    }
  }
}

const services = new Services();

export default services;
