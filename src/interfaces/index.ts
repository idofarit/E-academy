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

export interface ICourse {
  _id: string;
  title: string;
  subTitle: string;
  price: number;
  category: string;
  coverImage: string;
  promoVideo: string;
  description: string;
  sections: any[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
