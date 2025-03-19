import React from 'react'
import { NavItemProps } from '../../types'
import { iconMap, IconMapKey } from './iconmap'
import { Link } from 'react-router'
import { useAuth } from '../../context/AuthContext'
import { cn } from '../../utils/mergeClassnames'
import { Logo } from '../Exports/export'

const SideBar = () => {
    const { role} = useAuth();
    const navbarData = role === 'user' ? [
        {
            "name": "Home",
            "icon": "Home",
            "route": "/user/home",
        }, 
        {
            "name": "My Events",
            "icon": "Event",
            "route": "/user/events",
        }, 
        {
            "name": "Settings",
            "icon": "Settings",
            "route": "/user/settings",
        }
    ] : [
        {
            "name": "Home",
            "icon": "Home",
            "route": "/org/home",
        }, 
        {
            "name": "My Events",
            "icon": "Event",
            "route": "/org/events",
        }, 
        {
            "name": "Settings",
            "icon": "Settings",
            "route": "/org/settings",
        }
    ]

  return (
    <>
        <nav className={cn(
            "bg-gray-900 text-white p-4 hidden lg:flex lg:flex-col flex-row items-center space-y-6 fixed lg:relative",
            "lg:w-64 lg:h-screen lg:flex lg:items-start lg:justify-start lg:border-r lg:border-r-tertiary",
            "bottom-0 w-full flex-row justify-around lg:flex-col shadow-md lg:shadow-none"
        )}>
            {/* Logo */}
            <div className="hidden lg:flex items-center justify-center gap-2 text-2xl font-bold">
                <img src={Logo} alt="Logo" className="w-12 h-auto"/>
                <h1>SkillSpace</h1>
            </div>
            
            {
                navbarData.map((item, index) => (
                    <NavItem 
                        key={index}
                        icon={item.icon as IconMapKey}
                        name={item.name}
                        route={item.route}
                    />
                ))
            }
        </nav>
        
        {/* Smaller screens */}
        <nav className='bg-white border-t border-t-tertiary pt-3 pb-8 flex lg:hidden justify-evenly fixed bottom-0 w-full' style={{ height: '60px' }}>
            {
                navbarData.map((item, index) => (
                    <NavItem 
                        key={index}
                        icon={item.icon as IconMapKey}
                        name={item.name}
                        route={item.route}
                    />
                ))
            }
        </nav>
    </>
  )
}

const NavItem: React.FC<NavItemProps> = ({ icon, name, route }) => {
    const IconComponent = iconMap[icon];
    const pathname = window.location.pathname;

    if(!IconComponent) {
        return null;
    }

    const styling = route === pathname ? 'nav-item-active' : 'nav-item';

    return(
        <div>
            <Link to={route}>
                <div className={styling}>
                    <IconComponent />
                    <p>{name}</p>
                </div>
            </Link>
        </div>
    )
}

export default SideBar

