import { usePathname } from 'next/navigation';
import { pathnameLookup } from '~/src/utils/functions';

export function GameHeader({ matches, turns }: { matches: number; turns: number }) {
  const pathname = usePathname();

  return (
    <div className="flex  flex-row justify-between p-2 ">
      <div className="text-white bg-blue-600 rounded-b-md flex flex-col shadow ml-2 px-6 py-2 items-center justify-center -mt-2">
        <h3 className="uppercase font-bold text-sm">Matches</h3>
        <p>{matches}</p>
      </div>
      <div className="text-white bg-blue-600 rounded-b-md flex flex-col shadow ml-2 px-6 py-2 items-center justify-center -mt-2">
        {/* @ts-expect-error */}
        <h3 className="uppercase font-bold text-sm">{pathnameLookup[pathname]}</h3>
      </div>

      <div className="text-white bg-blue-600 rounded-b-md flex flex-col shadow mr-2 px-6 py-2 items-center justify-center -mt-2">
        <h3 className="uppercase font-bold text-sm">Turns</h3>
        <p>{turns}</p>
      </div>
    </div>
  );
}
