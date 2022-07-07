export interface Post{
  id: string,
  url: string,
  user: string,
  city: string,
  title: string,
  time: string,
  likes: string[],
}

export interface Credentials {
  email: string,
  password: string
}
