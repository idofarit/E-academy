"use server";

import UserModel from "@/models/user-model";
import { currentUser } from "@clerk/nextjs/server";

export const saveCurrentUserToMongoDB = async () => {
  try {
    const clerkUserdata = await currentUser();
    const mongoDbUserPayload = {
      name: clerkUserdata?.firstName + " " + clerkUserdata?.lastName,
      email: clerkUserdata?.emailAddresses[0].emailAddress,
      clerkUserID: clerkUserdata?.id,
      profilePic: clerkUserdata?.imageUrl,
      isAdmin: false,
      isAcive: true,
    };

    const newUser = new UserModel(mongoDbUserPayload);
    await newUser.save();

    return {
      success: true,
      message: "User Saved to mongoDB",
      data: JSON.parse(JSON.stringify(newUser)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getCurrentUserFromMongoDB = async () => {
  try {
    const clerkUserdata = await currentUser();

    // check if user already exists

    const user = await UserModel.findOne({ clerkUserID: clerkUserdata?.id });
    if (user)
      return {
        success: true,
        data: JSON.parse(JSON.stringify(user)),
      };

    const saveUserResponse = await saveCurrentUserToMongoDB();
    if (saveUserResponse) {
      return {
        success: true,
        data: saveUserResponse.data,
      };
    }

    return {
      success: false,
      message: "User not found in MongoDb",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
