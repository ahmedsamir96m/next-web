import getUser from "@/lib/getUser"
import getUserPosts from "@/lib/getUserPosts"
import { Suspense } from "react"
import UserPosts from "./components/UserPosts"
import { Metadata } from "next"
import getAllUsers from "@/lib/getAllUsers"

type Params = {
  params: {
    userId: string
  }
}
export async function generateMetadata({ params: { userId } }: Params): Promise<Metadata> {
  const userData: Promise<User> = getUser(userId)
  const user: User = await userData;

  return {
    title: user.name,
    description: `This is the posts page of ${user.name}`
  }
}

export default async function UserPage({ params: { userId } }: Params) {
  const userData: Promise<User> = getUser(userId)
  const userPostsData: Promise<Post[]> = getUserPosts(userId)

  // const [user, userPosts] = await Promise.all([userData, userPostsData])
  const user = await userData

  return (
    <>
      <h2>{user.name}</h2>
      <br />
      <Suspense fallback={<h2 style={{ fontSize: '65px' }}>Loading...</h2>}>
        <UserPosts promise={userPostsData} />
      </Suspense>
    </>
  )
}

export async function generateStaticParams() {
  const usersData: Promise<User[]> = getAllUsers()
  const users = await usersData;

  return users.map(user => ({
    userId: user.id.toString()
  }))
}