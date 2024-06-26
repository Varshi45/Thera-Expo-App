import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.mtv.thera",
  projectId: "666c19250024755fb613",
  databaseId: "666c1b4100362e08a5c8",
  userCollectionId: "666c1b6c000955c9998f",
  postCollectionId: "666c1c78003e336fe5bf",
  storageId: "666c1f25001150c9a017",
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw new Error("Account creation failed");

    const avatarUrl = avatars.getInitials(username);

    const session = await account.createEmailPasswordSession(email, password);
    if (!session) throw new Error("Session creation failed");

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      },
      [], // read permissions
      [`user:${newAccount.$id}`] // write permissions
    );

    return newUser;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const signIn = async (email, password) => {
  try {
    // await account.deleteSession("current");
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) {
      throw new Error("No user found");
    }

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) {
      throw new Error("No user found");
    }

    return currentUser.documents[0];
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId
    );

    if (!posts) {
      throw new Error("No posts found");
    }

    return posts.documents;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.orderDesc("$createdAt", Query.limit(5))]
    );

    if (!posts) {
      throw new Error("No posts found");
    }

    return posts.documents;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export const searchPosts = async (query) => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.search("title", query)]
    );

    if (!posts) {
      throw new Error("No posts found");
    }

    return posts.documents;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export const getPostsByUser = async (userId) => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.equal("creator", userId)]
    );

    if (!posts) {
      throw new Error("No posts found");
    }

    return posts.documents;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export const getFilePreview = async (fileId, type) => {
  let fileUrl;

  try {
    if (type == "image") {
      fileUrl = await storage.getFileView(
        appwriteConfig.storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    } else if (type == "video") {
      fileUrl = await storage.getFileView(appwriteConfig.storageId, fileId);
    } else {
      throw new Error("invalud file type");
    }
    if (!fileUrl) throw new Error("file not found");

    return fileUrl;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export const uploadFile = async (file, type) => {
  if (!file) return null;

  const { mimeType, ...rest } = file;
  const asset = {
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
  };

  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);

    return fileUrl;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export const createVideo = async (form) => {
  try {
    const [thumbanailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);

    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      ID.unique(),
      {
        title: form.title,
        prompt: form.prompt,
        thumbnail: thumbanailUrl,
        video: videoUrl,
        creator: form.creator,
      },
      [], // read permissions
      [`user:${form.creator}`] // write permissions
    );

    return newPost;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};
