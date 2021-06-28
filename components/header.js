import Link from 'next/link';
import Avatar from './NavBarComponent/avatar';
import NavAdd from './NavBarComponent/navAdd';
import Search from './NavBarComponent/search';
import styles from '../styles/Home.module.css';

export default function Header() {
  const glass = {
    'backdropFilter': 'blur(8px)',
  }
  return (
    <div>
      <nav className={styles.header + ' fixed flex mx-auto items-center flex-wrap bg-white px-3 py-1 shadow-lg sm:mb-5 inset-x-0 top-0 z-10'} style={glass}>
        <Link href='/main'>
          <a className='inline-flex items-center p-2 mr-4 '>
            <img src='/logo.jpeg' width='100' height='40'></img>
          </a>
        </Link>
        <Link href='/main'>
          <a className='inline-flex items-center p-0.5 pt-1 mr-3 border-b-2 border-transparent hover:border-black transition-all'>
            <span className='text-l text-black font-semibold tracking-wide'>
              Task
            </span>
          </a>
        </Link>
        <Link href='/main/branch'>
          <a className='inline-flex items-center p-0.5 pt-1 mr-3 border-b-2 border-transparent hover:border-black transition-all'>
            <span className='text-l text-black font-semibold tracking-wide'>
              Branch
            </span>
          </a>
        </Link>
        <div className="flex-grow lg:flex-shrink" />
        <Search></Search>
        <NavAdd></NavAdd>
        <Avatar></Avatar>
      </nav>
    </div>
  )
}