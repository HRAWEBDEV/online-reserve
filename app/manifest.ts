import { MetadataRoute } from 'next';

const manifest = (): MetadataRoute.Manifest => {
 return {
  name: 'نرم افزار رزرو آنلاین آلین',
  short_name: 'نرم افزار آلین',
  description: 'نرم افزار رزرو آنلاین',
  start_url: '/',
  display: 'standalone',
  background_color: '#fff',
  theme_color: '#0284c7',
  scope: '.',
  icons: [
   {
    src: '/app-images/android/android-launchericon-48-48.png',
    type: 'image/png',
    sizes: '48x48',
   },
   {
    src: '/app-images/android/android-launchericon-72-72.png',
    type: 'image/png',
    sizes: '72x72',
   },
   {
    src: '/app-images/android/android-launchericon-96-96.png',
    type: 'image/png',
    sizes: '96x96',
   },
   {
    src: '/app-images/android/android-launchericon-144-144.png',
    type: 'image/png',
    sizes: '144x144',
   },
   {
    src: '/app-images/android/android-launchericon-192-192.png',
    type: 'image/png',
    sizes: '192x192',
   },
   {
    src: '/app-images/android/android-launchericon-512-512.png',
    type: 'image/png',
    sizes: '512x512',
   },
  ],
 };
};

export default manifest;
