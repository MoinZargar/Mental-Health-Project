import React from 'react'
import Container from '../Container/Container'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LogoutBtn } from './LogoutBtn.jsx'
import { FaBars } from 'react-icons/fa'
import { useState } from 'react'
function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Sentiment",
      slug: "/sentiment",
      active: authStatus,
  },
  {
    name: "Tests",
    slug: "/tests",
    active: authStatus,
 },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  
  ]

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    
    <header className='py-3 shadow bg-gray-800 text-white'>
   
      <nav className='flex items-center justify-between mr-12'>

        <div className='flex items-center'>
          
          <div className='text-xl font-bold ml-5'>Mental Health</div>
        </div>

       
        <div className='md:hidden'>
          <button onClick={toggleMenu} className='text-xl'>
            <FaBars />
          </button>
        </div>

        <div className='hidden md:flex  space-x-6 items-center  '>
          <ul className='flex '>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='px-4 py-2 ml-6 duration-200 hover:bg-blue-600 rounded-full'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
          </ul>
          {authStatus && (
            <ul className='flex items-center'>
              <li>
                <LogoutBtn className='px-4 py-2  duration-200 hover:bg-blue-600 rounded-full' />
              </li>
            </ul>
          )}
        </div>

        {/* Responsive navigation for mobile screens */}
        {menuOpen && (
          <div className='md:hidden absolute top-16 right-0 bg-gray-800 p-4 space-y-2'>
            {navItems.map((item) =>
              item.active ? (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.slug);
                    toggleMenu();
                  }}
                  className='w-full px-4 py-2 text-left hover:bg-blue-600 rounded-full'
                >
                  {item.name}
                </button>
              ) : null
            )}
            {authStatus && (
              <button onClick={toggleMenu}>
                <LogoutBtn className='w-full px-4 py-2  text-left' />
              </button>
            )}
          </div>
        )}

      </nav>
    
  </header>

  );
}

export default Header