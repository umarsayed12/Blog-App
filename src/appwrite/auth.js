
import { Client, Account, ID } from "appwrite";
import config from '../config/config'
export class Authentication {
    client = new Client()
    account;

    constructor(){
        this.client.setEndpoint(config.appwriteURL).setProject(config.appwriteProjectId)
        this.account = new Account(this.client)

    }

    async register({email,password,username}){
        try {
            const newAccount = await this.account.create(ID.unique(),email,password,username)
            if(newAccount){
                this.login({email,password})
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
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            throw error;
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

