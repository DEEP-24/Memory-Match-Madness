'use client';
/* eslint-disable @next/next/no-img-element */
import { Dialog } from '~/src/components/Dialog';
import * as React from 'react';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [gameCategory, setGameCategory] = React.useState('');

  const router = useRouter();

  return (
    <>
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
            <button
              className="border rounded-lg h-64 w-48 shadow-sm shadow-gray-100 overflow-hidden"
              onClick={() => {
                setOpenDialog(true);
                setGameCategory('animals');
              }}
            >
              <img
                className="h-full w-full object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                src="/assets/category-animals.png"
                alt="category-1"
              />
            </button>
            <button
              className="border rounded-lg  h-64 w-48 shadow-sm shadow-stone-100"
              onClick={() => {
                setOpenDialog(true);
                setGameCategory('flowers');
              }}
            >
              <img
                className="h-full w-full object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                src="/assets/category-flowers.jpg"
                alt="category-2"
              />
            </button>
            <button
              className="border rounded-lg  h-64 w-48 shadow-sm shadow-gray-100"
              onClick={() => {
                setOpenDialog(true);
                setGameCategory('fruits');
              }}
            >
              <img
                className="h-full w-full object-cover  rounded-lg hover:scale-105 transition-transform duration-300"
                src="/assets/category-fruits.jpg"
                alt="category-3"
              />
            </button>
            <button
              className="border rounded-lg  h-64 w-48 shadow-sm shadow-gray-100"
              onClick={() => {
                setOpenDialog(true);
                setGameCategory('sports');
              }}
            >
              <img
                className="h-full w-full object-cover  rounded-lg hover:scale-105 transition-transform duration-300"
                src="/assets/category-sports.jpg"
                alt="category-4"
              />
            </button>
          </div>
        </div>
      </div>

      <Dialog title="Start game" open={openDialog} setOpen={setOpenDialog}>
        <div className="p-4">
          <ol className="list-decimal">
            <li className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
              The game is played with a set of cards that are displayed on the screen.
            </li>

            <li className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
              The goal of the game is to find all the matching pairs of cards.
            </li>
            <li className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
              To do this, the player selects two cards at a time and turns them face-up.
            </li>
            <li className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
              If the two cards have matching symbols, the player keeps the cards and earns points.
            </li>
            <li className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
              If the cards do not match, they get turned back and the player tries again.
            </li>
            <li className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
              The game ends when all the matching pairs of cards have been found.
            </li>
          </ol>

          <hr className="my-4" />

          <button
            className="text-violet11 hover:bg-violet-200 flex items-center gap-2 text-sm justify-center rounded-sm bg-violet-100 px-3 py-1.5 ml-auto transition-all"
            onClick={() => router.push(gameCategory)}
          >
            <span>Start Game</span>
            <ArrowRightIcon />
          </button>
        </div>
      </Dialog>
    </>
  );
}
