import { Organizer } from '../../types'
import { useAuth } from '../../context/AuthContext'

const OrgHomePage = () => {
  const { user } = useAuth();
  const organizer: Organizer = user as Organizer;

  // console.log("Auth: ", isAuthenticated);
  return (
    <div>

      <div className='p-5 rounded-xl bg-primary text-white my-8 mx-4'>
        <h1 className='text-2xl'>
          Hello <span className="font-bold">{organizer.name}</span> admin,
        </h1>
        <p className=''>Welcome to your dashboard</p>
        </div>
    </div>
  )
}

export default OrgHomePage