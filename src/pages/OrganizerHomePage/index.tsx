import { Organizer } from '../../types'
import { useAuth } from '../../context/AuthContext'
import { AddRounded } from '@mui/icons-material';
import ActionButtonPrimary from '../../components/UI/ActionButtonPrimary';
import { useState } from 'react';
import CreateWorkshopForm from '../../components/CreateWorkshopForm';

const OrgHomePage = () => {
  const { user } = useAuth();
  const organizer: Organizer = user as Organizer;

  const [showPublishWorkshopForm, setShowPublishWorkshopForm] = useState(false);

  // console.log("Auth: ", isAuthenticated);
  return (
    <div className='my-8 mx-4'>

     { showPublishWorkshopForm && <CreateWorkshopForm 
        isOpen={showPublishWorkshopForm}
        onClose={() => setShowPublishWorkshopForm(false)}
      />}

      <div className='p-5 rounded-xl bg-primary text-white'>
        <h1 className='text-2xl'>
          Hello <span className="font-bold">{organizer.name}</span> admin,
        </h1>
        <p className=''>Welcome to your dashboard</p>
      </div>


      <div className="flex items-center justify-between">
      <h1 className="my-16 text-primary">Your Workshops</h1>

        <ActionButtonPrimary 
          content='Publish Workshop'
          icon={<AddRounded />}
          action={() => {
            console.log("Open modal: ", showPublishWorkshopForm)
            setShowPublishWorkshopForm(true)}}
        />
      </div>
    </div>
  )
}

export default OrgHomePage