import React from "react";
import "../styles/CvContainer.css";
import GeneralInfoForm from "./GeneralInfoForm";
import EducationSection from "./EducationSection";
import ExperienceSection from "./ExperienceSection";

const CvContainer = () => {
  return (
    <>

      <h1 className="cv-title">My CV Builder</h1>
      <div className="cv-container">
        <GeneralInfoForm />
        <EducationSection />
        <ExperienceSection />
      </div>
    </>
  );
};

export default CvContainer;
