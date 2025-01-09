"use client";
import { useGlobalContext } from "@/context/globalContext";
import React from "react";
import { Separator } from "@/Components/ui/separator";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface EmploymentTypeProps {
  "Full Time": string;
  "Part Time": string;
  Contract: boolean;
  Internship: boolean;
  Temporary: boolean;
}

function JobTitle() {
  const {
    handleTitleChange,
    jobTitle,
    activeEmploymentTypes,
    setActiveEmploymentTypes,
  } = useGlobalContext();

  const [employmentTypes, setEmploymentTypes] =
    React.useState<EmploymentTypeProps>({
      "Full Time": "",
      "Part Time": "",
      Contract: false,
      Internship: false,
      Temporary: false,
    });

  const handleEmploymentTypeChange = (type: keyof EmploymentTypeProps) => {
    setEmploymentTypes((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <div className="p-6 flex flex-col gap-4 bg-background border border-border rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex-1">
          <h3 className="text-lg font-semibold">Job Title</h3>
          <Label
            htmlFor="jobTitle"
            className="text-sm text-muted-foreground mt-2"
          >
            A job title is a specific designation of a post in an organization.
          </Label>
        </div>
        <Input
          type="text"
          id="jobTitle"
          value={jobTitle}
          onChange={handleTitleChange}
          className="flex-1 w-full mt-2"
          placeholder="Enter Job Title"
        />
      </div>
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex-1">
          <h3 className="text-lg font-semibold">Employment Type</h3>
          <Label
            htmlFor="employmentType"
            className="text-sm text-muted-foreground mt-2"
          >
            Select the type of Employment
          </Label>
          <div className="flex-1 flex flex-col gap-2">
            {Object.entries(employmentTypes).map(([type, value]) => (
              <div key={type}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobTitle;
