import { Client, Databases, ID } from "appwrite";
import conf from "../../conf";

class DbService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
  }

  async sendMessage(message) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        message
      );
    } catch (error) {
      console.log("appwrite sendMEssage :: ", error);
    }
  }

  async getMessages() {
    try {
      return this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId
      );
    } catch (error) {}
  }

 
  async deleteMessage(messageId) {
    try {
      return this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        messageId
      )
    } catch (error) {
      console.log("error deleting message APPWRITE" , error);
    }
  }

}

const dbServices = new DbService();

export default dbServices;
