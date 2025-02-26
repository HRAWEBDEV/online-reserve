import Logo from './Logo';
import Menu from './Menu';
import Profile from './Profile';

export default function Header() {
 return (
  <header className='bg-primary-dark text-primary-foreground'>
   <div className='container py-2 flex items-center justify-between gap-4'>
    <Logo />
    <Menu />
    <Profile />
   </div>
  </header>
 );
}
