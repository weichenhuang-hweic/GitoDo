import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className='bg-gray-100'>
        <hr className='sm:mx-10'></hr>
      </div>
      <div className='border-gray-300 w-screen sm:flex-row flex-col flex items-center bg-gray-100 sm:px-16 px-2 pb-10 pt-5 mb-0 justify-start'>
        <div className='text-sm py-2'><h1>© 2021 GitoDo</h1></div>
        <div className='sm:flex-grow'/>
        <div className='sm:ml-5 text-md text-blue-600 hover:underline py-2'><Link href='/'>GitoDo</Link></div>
        <div className='sm:ml-5 text-md text-blue-600 hover:underline py-2'><Link href='/'>Contact us</Link></div>
        <div className='sm:ml-5 text-md text-blue-600 hover:underline py-2'><Link href='/'>Tutorial</Link></div>
        <div className='sm:ml-5 text-md text-blue-600 hover:underline py-2'><Link href='/'>About</Link></div>
      </div>
    </div>
  )
}