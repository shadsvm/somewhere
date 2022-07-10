export interface Post{
  id: string,
  urls: string[],
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
