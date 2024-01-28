import {auth} from '@/auth'
import { signOut } from 'next-auth/react';

const SettingsPage = async() => {
    const session = await auth()
  return (
    <div>
      {JSON.stringify(session)}
      <form action={async() =>{
        "use server";

        await signOut()
      }}>
        <button>Sign out</button>
      </form>
    </div>
  )
}

export default SettingsPage
