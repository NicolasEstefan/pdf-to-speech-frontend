import { Outlet } from 'react-router-dom'
import GenerationsList from '../components/generations-list/GenerationsList'
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
    <div className="relative z-0 flex h-screen w-full flex-col bg-purple-50 md:grid md:grid-cols-[20%_80%]">
      <div className={`${!showSideBar && 'hidden'} fixed inset-0 z-0 bg-black opacity-40`} />
      <div
        className={`fixed ${showSideBar ? 'left-0' : '-left-full'} col-1 mt-[17%] flex h-[90%] w-full flex-col items-end gap-2 p-6 transition-all md:relative md:left-0 md:mt-0 md:h-screen`}
      >
        <GenerationsList />
      </div>
      <div className="col-2 flex flex-col gap-2">
        <div className="z-1 flex h-fit w-full justify-between px-6 py-3 md:justify-end">
          <Button onClick={handleButtonClick} className="rounded-full md:hidden">
            {showSideBar ? <IconX size={35} /> : <IconLayoutSidebarFilled size={35} />}
          </Button>
          <SignInWithGoogleButton />
        </div>
        <main className="h-full w-full">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
