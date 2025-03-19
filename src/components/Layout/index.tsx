import { LayoutProps } from '../../types'
import Header from '../LoggedInHeader'
import SideBar from '../SideBar'

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="flex h-screen">
          {/* Sidebar (Hidden on mobile, visible on larger screens) */}
          <div className="lg:block lg:w-64">
            <SideBar />
          </div>
    
          {/* Main Content Area */}
          <div className="flex flex-col flex-1">
            {/* Header */}
            <Header />
    
            {/* Page Content */}
            <main className="flex-1 p-1 bg-gray-200">{children}</main>
          </div>
        </div>
  )
}

export default Layout