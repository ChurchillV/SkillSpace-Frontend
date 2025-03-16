import OrgHeader from '../../components/OrgHeader'
import { Organizer } from '../../types'
import { useAuth } from '../../context/AuthContext'

const OrgHomePage = () => {
  const { isAuthenticated } = useAuth();
  const organizer: Organizer = JSON.parse(localStorage.getItem(import.meta.env.VITE_LOCALSTORAGE_PROFILE) as string)
  console.log(organizer);
  console.log("Auth: ", isAuthenticated);
  return (
    <div>
      <OrgHeader />

      <div className='p-5 rounded-xl bg-secondary text-primary'>
              <h1 className='font-extrabold text-2xl'>
                Hello {organizer.name} admin,
              </h1>
              <p className='font-semibold'>Welcome to your dashboard</p>
            </div>
    </div>
  )
}

export default OrgHomePage