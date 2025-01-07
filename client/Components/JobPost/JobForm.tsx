"use client";
import React from "react";

function JobForm() {
  const sections = ["About", "Job Details", "Skills", "Location", "Summary"];
  const [currentSection, setCurrentSection] = React.useState(sections[0]);

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
  };

  return (
    <div className="w-full flex gap-6">
      <div className="self-start w-[10rem] flex flex-col bg-white rounded-md shadow-sm overflow-hidden">
        {sections.map((section, index) => (
          <button
            className={`pl-4 relative flex self-start items-center gap-2 font-medium
            ${currentSection === section ? "text-[#7263f3]" : "text-gray-500"}
          `}
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center border border-gray-400/60 justify-center text-gray-500 ${
                currentSection === section ? "bg-[#7263f3] text-white" : ""
              }`}
            >
              {index + 1}
            </span>
            {section}
            {currentSection === section && (
              <span className="w-1 h-full absolute left-0 top-0 bg-[#7263f3] rounded-full"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default JobForm;
