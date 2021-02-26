import Link from "next/link";
// import Feature from "../components/Feature2/Feature2";
import Posters from "../components/Posters/Posters";
import VideoFeatures from "../components/Videos/VideoFeatures";
import axios from "axios"

export default function Home({website}) {
  const title = website?.data?.headerTitle || "PLAYING ONLINE GAMES "
  const headerImg = website?.data?.headerImg ||"home1.png"
  return (
    <div>
      <div className="bg-primary-1">
        <section
          style={{ minHeight: "90vh" }}
          className="lg:max-w-7xl lg:m-auto flex flex-col lg:flex-row lg:items-center lg:justify-between lg:space-x-6 space-y-8 lg:space-y-0 py-10 lg:py-0"
        >
          <div className="flex flex-col space-y-8 lg:max-w-lg max-w-sm m-auto">
            <h1 className="text-3xl lg:text-5xl font-semibold">
              <span className="text-white">{title}</span>
             
            </h1>
            <p className="text-white text-lg font-mono">
             {website?.data?.headerPara}
            </p>
            <Link href="/register">
              <a className="w-56 text-white text-center uppercase text-lg bg-pink-600 lg:px-4 lg:py-3  rounded-md hover:bg-pink-800 py-2">
                Get Started
              </a>
            </Link>
          </div>

          <div className="lg:w-96 h-96 ">
            <img src={headerImg} className="h-full w-full" />
          </div>
        </section>

        {/* <Feature /> */}
        <VideoFeatures />
        <Posters />
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  try {
    const res = await axios.get("/website")
    return {
      props:{
        website:res.data
      }
    }
    
  } catch (error) {
    console.log(error)
  }
}