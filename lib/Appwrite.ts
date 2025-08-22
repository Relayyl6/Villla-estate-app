import { Account, Avatars, Client, OAuthProvider } from "react-native-appwrite"
import * as linking from "expo-linking"
import * as WebBrowser from 'expo-web-browser';


export const appwriteConfig = {
    platform: 'com.yemuel.restate',
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
}

export const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint!)
    .setProject(appwriteConfig.projectId!)
    .setPlatform(appwriteConfig.platform!);

export const avatar = new Avatars(client);
export const account = new Account(client);

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
        console.log("Fetched User:", JSON.stringify(user, null, 2))
        console.log("User name", user.name);
        if (user.$id) {
            const userAvatar = await avatar.getInitials(user.name || 'guest'); // this returns an object ArrayBuffer]
            // Convert Arraybuffer to base64 data URI
            console.log("userAvatar", userAvatar)
            console.log("userAvatarType", Object.prototype.toString.call(userAvatar));
            const avatarString = userAvatar.toString();
            console.log(avatarString)
            // const avatarData = arrayBufferToBase64(userAvatar)
            // console.log("User Avatar URL:", avatarData);
            const result = {
                ...user,
                avatar: userAvatar.toString(),
            }
            console.log("getCurrentUser result", JSON.stringify(result, null, 2));
            return result
        
            // console.log(user)
            // return user
        }
    } catch (error) {
        console.error("getCurrentUser Error",error);
        return null;
    }
}


export const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return `data:image/png;base64,${btoa(binary)}`;
}
