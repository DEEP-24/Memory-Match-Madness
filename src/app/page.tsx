/* eslint-disable @next/next/no-img-element */

export default function Home() {
  return (
    <div className="h-full flex items-center justify-center relative">
      <div className="relative flex flex-col items-center gap-12">
        <div className="space-y-6">
          <h1 className="text-center text-6xl">Memory Match Madness</h1>
          <p className="text-sm max-w-3xl text-center text-gray-400">
            Put your memory skills to the test and match the cards to win! Enjoy a fun and challenging experience with
            our engaging memory matching game - the perfect way to train your brain and have some fun!
          </p>
        </div>
        <div className="grid grid-cols-4 gap-12">
          <button className="border rounded-lg h-64 w-48 shadow-sm shadow-gray-100 overflow-hidden">
            <img
              className="h-full w-full object-cover rounded-lg hover:scale-105 transition-transform duration-300"
              src="/assets/category-animals.png"
              alt="category-1"
            />
          </button>
          <button className="border rounded-lg  h-64 w-48 shadow-sm shadow-stone-100">
            <img
              className="h-full w-full object-cover rounded-lg hover:scale-105 transition-transform duration-300"
              src="/assets/category-flowers.jpg"
              alt="category-2"
            />
          </button>
          <button className="border rounded-lg  h-64 w-48 shadow-sm shadow-gray-100">
            <img
              className="h-full w-full object-cover  rounded-lg hover:scale-105 transition-transform duration-300"
              src="/assets/category-fruits.jpg"
              alt="category-3"
            />
          </button>
          <button className="border rounded-lg  h-64 w-48 shadow-sm shadow-gray-100">
            <img
              className="h-full w-full object-cover  rounded-lg hover:scale-105 transition-transform duration-300"
              src="/assets/category-sports.jpg"
              alt="category-4"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
