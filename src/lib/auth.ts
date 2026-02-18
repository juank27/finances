import { getServerSession } from 'next-auth/next'

const authOptions = {
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup'
  }
}

export async function auth() {
  return await getServerSession(authOptions)
}