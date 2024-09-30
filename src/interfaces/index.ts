export interface IUser {
  _id: string;
  name: string;
  email: string;
  clerkUserID: string;
  isAdmin: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  profilePic: string;
}

export interface IMedia {
  _id: string;
  name: string;
  url: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}
