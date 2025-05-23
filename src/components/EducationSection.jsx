import React, { useState } from "react";
import "../styles/EducationSection.css";

function EducationSection() {
  const [educationList, setEducationList] = useState([]);
  const [formData, setFormData] = useState({
    school: "",
    title: "",
    date: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.school.trim()) newErrors.school = "School name is required";
    if (!formData.title.trim()) newErrors.title = "Title of study is required";
    if (!formData.date.trim()) newErrors.date = "Date is required";
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
      const updatedList = [...educationList];
      updatedList[editIndex] = formData;
      setEducationList(updatedList);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setEducationList([...educationList, formData]);
    }

    setFormData({ school: "", title: "", date: "" });
  };

  const handleEdit = (index) => {
    setFormData(educationList[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = educationList.filter((_, i) => i !== index);
    setEducationList(updated);
  };

  return (
    <div className="education-section cv-section">
      <h2>Education</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>School Name:</label>
          <input
            type="text"
            name="school"
            value={formData.school}
            onChange={handleChange}
            placeholder="e.g. Harvard University"
          />
          {errors.school && <span className="error">{errors.school}</span>}
        </div>

        <div>
          <label>Title of Study:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. BSc in Computer Science"
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>

        <div>
          <label>Date of Study:</label>
          <input
            type="text"
            name="date"
            value={formData.date}
            onChange={handleChange}
            placeholder="e.g. 2020 - 2024"
          />
          {errors.date && <span className="error">{errors.date}</span>}
        </div>

        <button type="submit">{isEditing ? "Update" : "Add"}</button>
      </form>

      <ul>
        {educationList.map((edu, index) => (
          <li key={index}>
            <p>
              <strong>School:</strong> {edu.school}
            </p>
            <p>
              <strong>Title:</strong> {edu.title}
            </p>
            <p>
              <strong>Date:</strong> {edu.date}
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

export default EducationSection;
