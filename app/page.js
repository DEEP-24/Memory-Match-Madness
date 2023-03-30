import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import "~/styles/MainPage.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div className="container">
        <div className="Logo">
          <span>Memory Match Madness</span>
        </div>
        <div className="categories">
          <ul>
            <span>Choose Your Category</span>
            <li>
              <Link href="/animals">Animals</Link>
            </li>
            <li>
              <Link href="/flowers">Flowers</Link>
            </li>
            <li>
              <Link href="/fruits">Fruits</Link>
            </li>
            <li>
              <Link href="/sports">Sports</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
