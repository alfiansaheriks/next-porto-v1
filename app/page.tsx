import Image from "next/image";
import ProjectList from "./components/ProjectList";
import ActivityList from "./components/ActivityList";
import NowPlaying from "./components/NowPlaying";
import alfiansaherikgans from "./assets/erikganz.jpg";

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
                <div className="flex flex-col items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    className="text-gray-500 flex items-center justify-center mt-8"
                  >
                    <path
                      fill="currentColor"
                      d="M4.825 12.025L8.7 15.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-4.6-4.6q-.15-.15-.213-.325T2.426 12t.063-.375t.212-.325l2.875-2.875l-3.5-3.5q-.3-.3-.3-.712t.3-.713t.713-.3t.712.3l17 17q.3.3.3.7t-.3.7t-.712.3t-.713-.3L7 9.85zm12.9 2.825q-.3-.3-.3-.712t.3-.713l1.45-1.45L15.3 8.1q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.6 4.6q.15.15.213.325t.062.375t-.062.375t-.213.325l-2.175 2.175q-.3.3-.7.288t-.7-.313"
                    />
                  </svg>
                  <h1 className="text-sm text-center font-bold text-gray-500">
                    Not Working
                  </h1>
                </div>
                <p className="text-xs text-center text-gray-500 mt-2">
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
