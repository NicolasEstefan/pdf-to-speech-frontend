import { Outlet } from 'react-router-dom'
import { useGetMeQuery } from '../store'
import GenerationsList from '../components/generations/GenerationsList'
import { IconLayoutSidebarFilled } from '@tabler/icons-react'
import SignInWithGoogleButton from '../components/SignInWithGoogleButton'
import { useState } from 'react'
import Button from '../components/common/Button'

export default function Layout() {
  const [showSideBar, setShowSidebar] = useState(false)
  const { isFetching, isError, data } = useGetMeQuery()

  const handleButtonClick = () => {
    setShowSidebar((previous) => !previous)
  }

  return (
    <div className='relative flex flex-col  md:grid md:grid-cols-[15%_85%] h-screen w-full bg-purple-50'>
      <div
        className={`${!showSideBar && 'hidden'} fixed bg-black inset-0 opacity-20`}
        onClick={() => setShowSidebar(false)}
      />
      <div
        className={`fixed ${showSideBar ? 'left-0' : '-left-full'} transition-all md:block md:left-0`}
      >
        <GenerationsList />
      </div>
      <div className='col-2 flex flex-col gap-2'>
        <div className='p-3 flex justify-between md:justify-end h-fit w-full'>
          <Button
            onClick={handleButtonClick}
            className='md:hidden rounded-full'
          >
            <IconLayoutSidebarFilled size={35} />
          </Button>
          <SignInWithGoogleButton />
        </div>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
