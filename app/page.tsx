
import Image from "next/image";
import ProjectList from "./components/ProjectList";
import ActivityList from "./components/ActivityList";
import NowPlaying from "./components/NowPlaying";
import alfiansaherikgans from './assets/erikganz.jpg';

export default function Home() {
  return (
    <>
      <div className="flex flex-col h-full mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 space-y-10 pb-8">
        <div className="inter p-5 flex-1 flex flex-row justify-center items-center gap-56">
          <div>
            <h1 className="text-lg font-semibold">
              Hey, I&apos;m Alfiansah Erik Sugiarto — an full stack dev.
            </h1>
            <h1 className="text-md font-semibold text-gray-500">
              Crafting Seamless Solutions in Cyberspace,
              <br />
              Bridging the World of Full Stack Web Development.
            </h1>
          </div>
          <div>
            <Image
              src={alfiansaherikgans}
              alt="Alfiansah Erik"
              className="w-24 h-24 rounded-full"
            />
          </div>
        </div>
        <section id="all-section" className="justify-center items-center">
          <div className="grid grid-cols-2">
            <div className="bg-white rounded-lg px-2 py-4 mt-10 border border-gray-200 relative lg:min-w-[430px] ml-8">
              <h2 className="absolute -top-3 left-5 bg-white border border-gray-200 rounded-full px-4 text-xs text-gray-600 font-bold mb-4">
                Projects
              </h2>
              <ProjectList />
            </div>
            <div className="bg-white rounded-lg p-6 mt-10 border border-gray-200 relative lg:min-w-[200px] ml-16">
              <h2 className="absolute -top-3 left-5 bg-white border border-gray-200 rounded-full px-4 text-xs text-gray-600 font-bold mb-4">
                Activity
              </h2>
              <ActivityList />
            </div>
            <div className="bg-white rounded-lg p-6 mt-10 border border-gray-200 relative lg:min-w-[200px] ml-8">
              <h2 className="absolute -top-3 left-5 bg-white border border-gray-200 rounded-full px-4 text-xs text-gray-600 font-bold mb-4">
                On Work
              </h2>
              <div className="flex flex-col justify-center items-center">
                <div>
                  <h1 className="text-sm text-center font-bold text-gray-500">
                    Not working anything now.
                  </h1>
                </div>
                <p className="text-xs text-center text-gray-500">
                  I&apos;m currently not working on any projects.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 mt-10 border border-gray-200 relative lg:min-w-[200px] ml-8">
              <h2 className="absolute -top-3 left-5 bg-white border border-gray-200 rounded-full px-4 text-xs text-gray-600 font-bold mb-4">
                Music
              </h2>
              <ul className="list-none p-0">
                <li className="hover:bg-gray-100 rounded-xl">
                  <h3 className="text-xs font-semibold text-gray-500">
                    <NowPlaying />
                  </h3>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}