interface I_User {
  username: string;
  email: string;
  profilePictureUrl: string;
  _id: string;
}

interface I_Image {
  _id: string;
  url: string;
  user: I_User;
  title: string;
  description: string;
  createdAt: string;
}
