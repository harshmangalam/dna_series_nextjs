import { useRouter } from "next/router";
import axios from "axios";

export default function About({ about }) {
  const router = useRouter();

  return (
    <div className="min-h-screen py-6  bg-primary-1 text-white">
      <h3 className="my-5 text-4xl text-center">About Us</h3>
      <div className="flex justify-center my-6">
        <p className="text-justify max-w-2xl px-4 text-lg text-gray-400">
          {about?.aboutPage
            ? about.aboutPage
            : "If you'd like to completely disable Preflight — perhaps because you're integrating Tailwind into an existing project or because you'd like to provide your own base styles — all you need to do is set preflight to If you'd like to completely disable Preflight — perhaps because you're integrating Tailwind into an existing project or because you'd like to provide your own base styles — all you need to do is set preflight to If you'd like to completely disable Preflight — perhaps because you're integrating Tailwind into an existing project or because you'd like to provide your own base styles — all you need to do is set preflight to If you'd like to completely disable Preflight — perhaps because you're integrating Tailwind into an existing project or because you'd like to provide your own base styles — all you need to do is set preflight to If you'd like to completely disable Preflight — perhaps because you're integrating Tailwind into an existing project or because you'd like to provide your own base styles — all you need to do is set preflight to If you'd like to completely disable Preflight — perhaps because you're integrating Tailwind into an existing project or because you'd like to provide your own base styles — all you need to do is set preflight to If you'd like to completely disable Preflight — perhaps because you're integrating Tailwind into an existing project or because you'd like to provide your own base styles — all you need to do is set preflight to If you'd like to completely disable Preflight — perhaps because you're integrating Tailwind into an existing project or because you'd like to provide your own base styles — all you need to do is set preflight to"}
        </p>
      </div>
    </div>
  );
}

export const getStaticProps = async ({ _, res }) => {
  try {
    const result = await axios.get("/website/about");
    console.log(result.data);
    return {
      props: {
        about: result.data.data,
      },
    };
  } catch (err) {
    res.writeHead(307, { Location: "/" }).end();
  }
};