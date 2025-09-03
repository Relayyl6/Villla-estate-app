import { Account, Avatars, Client, OAuthProvider, Databases, Query } from "react-native-appwrite"
import * as linking from "expo-linking"
import * as WebBrowser from 'expo-web-browser';



export const appwriteConfig = {
    platform: 'com.yemuel.villa',
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
    agentCollectionId: process.env.EXPO_PUBLIC_APPWRITE_AGENT_COLLECTION_ID,
    galleryCollectionId: process.env.EXPO_PUBLIC_APPWRITE_GALLERY_COLLECTION_ID,
    reviewCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEW_COLLECTION_ID,
    propertycollectionId: process.env.EXPO_PUBLIC_APPWRITE_PROPERTY_COLLECTION_ID
}

export const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint!)
    .setProject(appwriteConfig.projectId!)
    .setPlatform(appwriteConfig.platform!);

export const avatar = new Avatars(client);
export const account = new Account(client);
export const database = new Databases(client);

export async function login() {
    try {
        const redirectUri = linking.createURL('/');
        const response = await account.createOAuth2Token(
            OAuthProvider.Google,
            redirectUri,
        )

        if (!response) throw new Error("Failed to login (Receive response when creating token)")

        const browserResult = await WebBrowser.openAuthSessionAsync(
            response.toString(),
            redirectUri,
        )

        if (browserResult.type !== "success") throw new Error("Failed to login(Opening a new browser window to seek authentication)");

        const url = new URL(browserResult.url);

        const secret = url.searchParams.get('secret')?.toString();
        const userId = url.searchParams.get('userId')?.toString();

        if (!secret || !userId) throw new Error("Failed to login(Get secret and userId from the query parameter");

        const session = await account.createSession(userId, secret)

        if (!session) throw new Error("Failed to create session");

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function logout() {
    try {
        await account.deleteSession('current');
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function getCurrentUser() {
    try {
        const user = await account.get();
        // console.log("Fetched User:", JSON.stringify(user, null, 2))
        console.log("User name", user.name);
        if (user.$id) {
            // const userAvatar = await avatar.getInitialsURL(user.name); // this returns an object ArrayBuffer]
            // Convert Arraybuffer to base64 data URI
            // console.log("userAvatar", userAvatar)
            // console.log("userAvatarType", Object.prototype.toString.call(userAvatar));
            // const avatarString = userAvatar.toString();
            // console.log(avatarString)
            // // const avatarData = arrayBufferToBase64(userAvatar)
            // // console.log("User Avatar URL:", avatarData);
            // console.log("getCurrentUser result", JSON.stringify(result, null, 2));
            return user;
            // console.log(user)
            // return user
        }
    } catch (error) {
        console.error("getCurrentUser Error",error);
        return null;
    }
}

export async function getLatestProperties({ limit }: { limit: number }) {
    try {
        const result = await database.listDocuments(
            appwriteConfig.databaseId!,
            appwriteConfig.propertycollectionId!,
            [
                Query.orderAsc('$createdAt'),
                Query.limit(limit),
            ]
        )
        return result.documents
    } catch (error) {
        console.error(error)
        return ""
    }
}

export async function getProperties({
    filter,
    query,
    limit,
}: {
    filter: string;
    query: string;
    limit?: number;
}) {
    try {
        const buildQuery = [Query.orderDesc('$createdAt')]

        if (filter && filter !== "All") {
            buildQuery.push(Query.equal('type', filter))
        }
        // If filter exists is not All, then make up an array that will be
        // [
        //      Query.orderDesc('$createdAt'),
        //      Query.equal('type', filter),
        // ]
        if (query) {
            buildQuery.push(Query.or([
                Query.search('name', query),
                Query.search('address', query),
                Query.search('type', query),
            ]))
        }
        // if query exists
        // it becomes
        // [
        //      Query.orderDesc('$createdAt'),
        //      Query.equal('type', filter),
        //      Query.or([
        //          Query.search('name', query),
        //          Query.search('address', query),
        //          Query.search('type', query),
        //      ])
        //      Query.limit(limit) // if adding limit
        // ]
        if (limit) {
            buildQuery.push(Query.limit(limit))
        }

        const result = await database.listDocuments(
            appwriteConfig.databaseId!,
            appwriteConfig.propertycollectionId!,
            buildQuery
        )
        return result.documents;
    } catch (error) {
        console.log(error)
        return '';
    }
}

export const getPropertiesPage = async ({ propertyId }: { propertyId: string }) => {
    try {
        const property = await database.getDocument(
            appwriteConfig.databaseId!,
            appwriteConfig.propertycollectionId!,
            propertyId,
        )

        console.log(property);

        return property
    } catch (error) {
        console.error(error);
        return null
    }
}