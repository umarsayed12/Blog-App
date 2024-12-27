
import { Client, Account, ID } from "appwrite";
import config from '../config/config'
export class Authentication {
    client = new Client()
    account;

    constructor(){
        this.client.setEndpoint(config.appwriteURL).setProject(config.appwriteProjectId)
        this.account = new Account(this.client)

    }

    async createAccount({email,password,username}){
        try {
            const newAccount = await this.account.create(ID.unique(),email,password,username)
            if(newAccount){
                return this.login({email,password})
            }
            else{
                return newAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            return error
        }
    }
    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
        return null;
    }

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
}

const authenticationService = new Authentication()

export default authenticationService;

