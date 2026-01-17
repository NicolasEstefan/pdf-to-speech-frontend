import { Outlet } from 'react-router-dom'
import GenerationsList from '../components/generations/GenerationsList'
import { IconLayoutSidebarFilled, IconX } from '@tabler/icons-react'
import SignInWithGoogleButton from '../components/SignInWithGoogleButton'
import { useState } from 'react'
import Button from '../components/common/Button'

export default function Layout() {
  const [showSideBar, setShowSidebar] = useState(false)

  const handleButtonClick = () => {
    setShowSidebar((previous) => !previous)
  }

  return (
    <div className='relative flex flex-col  md:grid md:grid-cols-[20%_80%] h-screen w-full bg-purple-50'>
      <div
        className={`${!showSideBar && 'hidden'} fixed bg-black inset-0 opacity-40`}
      />
      <div
        className={`fixed ${showSideBar ? 'left-0' : '-left-full'} transition-all md:relative flex flex-col items-end gap-2 md:left-0 p-6 w-full h-screen col-1`}
      >
        <Button className='p-3 md:hidden' onClick={() => setShowSidebar(false)}>
          <IconX stroke={2} width={32} height={32} />
        </Button>
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
