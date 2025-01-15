"use client";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import MyJob from "@/Components/JobItem/MyJob";
import { useGlobalContext } from "@/context/globalContext";
import { useJobsContext } from "@/context/jobsContext";
import { Job } from "@/types/types";
import { useRouter } from "next/navigation";
import React from "react";

function page() {
  const { jobs, userJobs } = useJobsContext();
  const { isAuthenticated, loading, userProfile } = useGlobalContext();

  const [activeTab, setActiveTab] = React.useState("posts");

  const userId = userProfile?.id;
  const router = useRouter();

  // Redirect to login if not authenticated

  const likedJobs = jobs.filter((job: Job) => {
    return job.applicants.includes(userId);
  });

  if (loading) {
    return null;
  }

  // console.log("userJobs", userJobs)

  return (
    <div>
      <Header />
      <div className="mt-8 w-[90%] mx-auto flex flex-col">
        <div className="self-center flex items-center gap-6">
          <button
            className={`border border-gray-400 px-8 py-2 rounded-full font-medium ${
              activeTab === "posts"
                ? "border-transparent bg-[#7263f3] text-white"
                : "border-gray-300"
            }`}
            onClick={() => setActiveTab("posts")}
          >
            My Job Posts
          </button>
          <button
            className={`border border-gray-400 px-8 py-2 rounded-full font-medium ${
              activeTab === "likes"
                ? "border-transparent bg-[#7263f3] text-white"
                : "border-gray-400"
            }`}
            onClick={() => setActiveTab("likes")}
          >
            Liked Jobs
          </button>
        </div>
        {activeTab === "posts" && userJobs.length === 0 && (
          <div className="mt-8 flex items-center">
            <p className="text-2xl font-bold">No Job Posts found</p>
          </div>
        )}

        {activeTab === "likes" && likedJobs.length === 0 && (
          <div className="mt-8 flex items-center">
            <p className="text-2xl font-bold">No Liked Jobs found</p>
          </div>
        )}

        <div className="my-8 grid grid-cols-2 gap-4">
          {activeTab === "posts" &&
            userJobs.map((job: Job) => <MyJob key={job._id} job={job} />)}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default page;
