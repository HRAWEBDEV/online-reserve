import { addClass } from '@/utils/addClass';
import { type ListViewOptions } from '../utils/listViewOptions';
import Hotel from './Hotel';

type TProps = {
 listViewMode: ListViewOptions;
};

export default function Hotels({ listViewMode }: TProps) {
 return (
  <section
   className={`grid gap-4 mb-20 ${addClass(
    listViewMode === 'grid',
    ' md:grid-cols-2 lg:grid-cols-3'
   )} content-start`}
  >
   {Array.from({ length: 20 }, (_, i) => i).map((item) => (
    <Hotel key={item} listViewMode={listViewMode} />
   ))}
  </section>
 );
}
