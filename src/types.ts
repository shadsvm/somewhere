export interface Post{
  id: string,
  user: string,
  city: string,
  time: string,
  title: string,
  likes: string[],
  images: images,
}

export interface Credentials {
  email: string,
  password: string
}

interface images {
  file?: string
}