import type { Metadata } from "next";
import getAllUsers from "@/lib/getAllUsers"
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Users'
}

console.log('Hello')

export default async function UsersPage() {
  const usersData: Promise<User[]> = getAllUsers()
  const users = await usersData
  const content = (
    <section>
      <h2>
        <Link href='/'>Back to Home</Link>
      </h2>
      <br />
      {users.map(user => (<div key={user.id}>
        <p >
          <Link href={`/users/${user.id}`}>
            {user.name}
          </Link>
          <br />
        </p>
      </div>))}
    </section>
  )
  return content
}
