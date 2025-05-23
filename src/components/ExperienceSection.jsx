import React, { useState } from "react";
import "../styles/ExperienceSection.css";

function ExperienceSection() {
  const [experienceList, setExperienceList] = useState([]);
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    responsibilities: "",
    from: "",
    until: "",
  });
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.company.trim()) newErrors.company = "Company is required";
    if (!formData.position.trim()) newErrors.position = "Position is required";
    if (!formData.responsibilities.trim())
      newErrors.responsibilities = "Responsibilities are required";
    if (!formData.from.trim()) newErrors.from = "Start date required";
    if (!formData.until.trim()) newErrors.until = "End date required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (isEditing) {
      const updatedList = [...experienceList];
      updatedList[editIndex] = formData;
      setExperienceList(updatedList);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setExperienceList([...experienceList, formData]);
    }

    setFormData({
      company: "",
      position: "",
      responsibilities: "",
      from: "",
      until: "",
    });
  };

  const handleEdit = (index) => {
    setFormData(experienceList[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = experienceList.filter((_, i) => i !== index);
    setExperienceList(updated);
  };

  return (
    <div className="experience-section cv-section">
      <h2>Practical Experience</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Company Name:</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="e.g. Google"
          />
          {errors.company && <span className="error">{errors.company}</span>}
        </div>

        <div>
          <label>Position Title:</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="e.g. Software Engineer"
          />
          {errors.position && <span className="error">{errors.position}</span>}
        </div>

        <div>
          <label>Main Responsibilities:</label>
          <textarea
            name="responsibilities"
            value={formData.responsibilities}
            onChange={handleChange}
            placeholder="e.g. Developed web applications using React"
          />
          {errors.responsibilities && (
            <span className="error">{errors.responsibilities}</span>
          )}
        </div>

        <div>
          <label>From:</label>
          <input
            type="text"
            name="from"
            value={formData.from}
            onChange={handleChange}
            placeholder="e.g. Jan 2021"
          />
          {errors.from && <span className="error">{errors.from}</span>}
        </div>

        <div>
          <label>Until:</label>
          <input
            type="text"
            name="until"
            value={formData.until}
            onChange={handleChange}
            placeholder="e.g. Dec 2023"
          />
          {errors.until && <span className="error">{errors.until}</span>}
        </div>

        <button type="submit">{isEditing ? "Update" : "Add"}</button>
      </form>

      <ul>
        {experienceList.map((exp, index) => (
          <li key={index}>
            <p>
              <strong>Company:</strong> {exp.company}
            </p>
            <p>
              <strong>Position:</strong> {exp.position}
            </p>
            <p>
              <strong>Responsibilities:</strong> {exp.responsibilities}
            </p>
            <p>
              <strong>From:</strong> {exp.from} <strong>Until:</strong>{" "}
              {exp.until}
            </p>
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button className="delete-btn" onClick={() => handleDelete(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExperienceSection;
