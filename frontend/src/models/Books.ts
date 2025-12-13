export interface Book {
  id: number
  title: string
  description: string
  genre: string
  isBorrowed: boolean
  author: {
    id: number
    name: string
  }
}