import { Client, Account, ID } from "appwrite";
import conf from "../../conf";

class AuthServices {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async signUp({ userName, email, password }) {
   
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        userName
      );
     return userAccount;
    } catch (error) {
      console.log("appwrite : signUp", error);
    }
  }

  async login({ email, password }) {
    try {
      const session = await this.account.createEmailSession(email, password);
      return session;
    } catch (error) {
      console.log("appwrite : login", error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
    }

    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite serive :: logout :: error", error);
    }
  }
}

const authServices = new AuthServices();
export default authServices;
