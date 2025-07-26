import { CreateUserParams, SignInParams } from "@/type";
import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    platform: "com.jas.fastfood",
    databaseId: "6884117d00079e061c2c",
    userCollectionId: '688411c6001e9c2f7a0e',
}

export const client = new Client();
client.setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
const avatars = new Avatars(client);

export const createUser = async ({email, password, name}: CreateUserParams) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, name);
        if(!newAccount) {
            throw new Error("Failed to create user account");
        }
        await signIn({email, password})

        const avatarUrl = avatars.getInitialsURL(name);
        const newUser = await databases.createDocument(appwriteConfig.databaseId, appwriteConfig.userCollectionId, ID.unique(), {email, name, accountId: newAccount.$id, avatar: avatarUrl})
        return newUser;
    } catch (error: any) {
        throw new Error(error.message);
        
    }
}

export const signIn = async ({email, password}: SignInParams) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        
    } catch (error: any) {
        throw new Error(error.message);
        
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) throw new Error("No user is currently signed in");

        const currentUser = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.userCollectionId, [
            Query.equal("accountId", currentAccount.$id)])
        if (!currentUser) throw new Error("No user data found");
        
        return currentUser.documents[0];
    } catch (error: any) {
        throw new Error(error.message);
        
    }
}