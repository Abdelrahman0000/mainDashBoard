import React, { useState, useRef } from 'react';
import './AddProject.css'
import { useMutation , useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

export default function AddProject() {
  const [mainImage, setMainImage] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [projectNameEn, setProjectNameEn] = useState('');
  const [projectNameAr, setProjectNameAr] = useState('');
  const [projectType, setProjectType] = useState(1); // Default to 'previous' project type
  const [titleEn, setTitleEn] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [textEn, setTextEn] = useState('');
  const [textAr, setTextAr] = useState('');
  const [clientEn, setClientEn] = useState('');
  const [clientAr, setClientAr] = useState('');
  const [locationEn, setLocationEn] = useState('');
  const [locationAr, setLocationAr] = useState('');
  const [date, setDate] = useState('');
  const [durationEn, setDurationEn] = useState('');
  const [durationAr, setDurationAr] = useState('');
  const [areaEn, setAreaEn] = useState('');
  const [areaAr, setAreaAr] = useState('');
  const [consultantAr, setConsultantAr] = useState('');
  const [consultantEn, setConsultantEn] = useState('');


  const fileInputRef2 = useRef(null); // Create a separate ref for the second file input
 
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    setMainImage(event.target.files[0]);
  };

  const handleFile2Change = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleImageChangeClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImage2ChangeClick = () => {
    if (fileInputRef2.current) {
      fileInputRef2.current.click();
    }
  };
  
  const imageUrl = mainImage? URL.createObjectURL(mainImage) : '';
  const image2Url = selectedFile ? URL.createObjectURL(selectedFile) : '';
  const queryClient = useQueryClient();


  const navigate = useNavigate();

  const mutation = useMutation(
    async () => {

      const formData = new FormData();
      formData.append('main_image', mainImage);
      formData.append('project_name_en', projectNameEn);
      formData.append('project_name_ar', projectNameAr);
      formData.append('project_type', projectType);
      formData.append('title_en', titleEn);
      formData.append('title_ar', titleAr);
      formData.append('text_en', textEn);
      formData.append('text_ar', textAr);
      
      formData.append('image', selectedFile);
      formData.append('client_en', clientEn);
      formData.append('client_ar', clientAr);
      formData.append('location_en', locationEn);
      formData.append('location_ar', locationAr);
      formData.append('date', date);
      formData.append('duration_en', durationEn);
      formData.append('duration_ar', durationAr);
      formData.append('area_en', areaEn);
      formData.append('area_ar', areaAr);
  
      formData.append('consultant_en', consultantEn);
      formData.append('consultant_ar', consultantAr);

      const response = await fetch('https://bluedana.mass-fluence.com/api/add-project', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Project addition failed');
      }
  
      // Optionally refetch data after mutation for updated list
      await queryClient.invalidateQueries('projects');
    },
    {
      onSuccess: () => {
        window.alert('Project added successfully!');
        // Clear input fields after successful submission
        setMainImage(null);
       

        navigate('/admin/project/detail');

      },
    }
  );
  
  const handleSubmit = (event) => {
    event.preventDefault();
    mutation.mutate(); // Trigger the mutation
  };

  return (
    <div className={`home add-proj`}>
      <form onSubmit={handleSubmit}>
      <div className="my-row">
          <label>
            <p>project Name in ar</p>
            <textarea type="text" value={projectNameEn}  onChange={(e) => setProjectNameEn(e.target.value)} required />
          </label>
          <label>
            <p>project Name in en</p>
            <textarea type="text" value={projectNameAr}  onChange={(e) => setProjectNameAr(e.target.value)} required />
            </label>
        </div>
        <div className="my-row">
          <label>
            <p>Title in ar</p>
            <textarea type="text" value={titleAr}  onChange={(e) => setTitleAr(e.target.value)} required />
          </label>
          <label>
            <p>Title in en</p>
            <textarea type="text" value={titleEn}  onChange={(e) => setTitleEn(e.target.value)} required />
          </label>
        </div>
        <div className="my-row">
          <label>
            <p>Text in ar</p>
            <textarea type="text" value={textAr}  onChange={(e) => setTextAr(e.target.value)} required />
          </label>
          <label>
            <p>Text in en</p>
            <textarea type="text" value={textEn}  onChange={(e) => setTextEn(e.target.value)} required />
          </label>
        </div>
        <div className="my-row">
          <label>
            <p>Client in ar</p>
            <textarea type="text" value={clientAr}  onChange={(e) => setClientAr(e.target.value)} required />
          </label>
          <label>
            <p>Client in en</p>
            <textarea type="text" value={clientEn}  onChange={(e) => setClientEn(e.target.value)} required />
          </label>
        </div>

        <div className="my-row">
          <label>
            <p>Location in ar</p>
            <textarea type="text" value={locationAr}  onChange={(e) => setLocationAr(e.target.value)} required />
          </label>
          <label>
            <p>Location in en</p>
            <textarea type="text" value={locationEn}  onChange={(e) => setLocationEn(e.target.value)} required />
          </label>
        </div>
        <div className="my-row">
          <label>
            <p>Duration in ar</p>
            <textarea type="text" value={durationAr}  onChange={(e) => setDurationAr(e.target.value)} required />
          </label>
          <label>
            <p>Duration in en</p>
            <textarea type="text" value={durationEn}  onChange={(e) => setDurationEn(e.target.value)} required />
          </label>
        </div>
        <div className="my-row">
          <label>
            <p>Area in ar</p>
            <textarea type="text" value={areaAr}  onChange={(e) => setAreaAr(e.target.value)} required />
          </label>
          <label>
            <p>Area in en</p>
            <textarea type="text" value={areaEn}  onChange={(e) => setAreaEn(e.target.value)} required />
          </label>
        </div>
        <div className="my-row">
          <label>
            <p>Consultant in ar</p>
            <textarea type="text" value={consultantAr}  onChange={(e) => setConsultantAr(e.target.value)} required />
          </label>
          <label>
            <p>Consultant in en</p>
            <textarea type="text" value={consultantEn}  onChange={(e) => setConsultantEn(e.target.value)} required />
          </label>
        </div>

       <div className="my-row">
       <div className="select-date">
  <label htmlFor="date" style={{ color: '#2A63AB' }}>Date</label>
  <input
    type="date"
    id="date"
    value={date}
    onChange={(e) => setDate(e.target.value)}
    style={{ borderColor: '#2A63AB', color: '#2A63AB' }}
    required
  />
</div>
<div className="select-item">
  <label htmlFor="projectType">Project Type</label>
  <select id="projectType" value={projectType} onChange={(e) => setProjectType(e.target.value)} required>
    <option value="1">Previous</option>
    <option value="2">Current</option>
    <option value="3">Ongoing</option>
  </select>
</div>
       </div>
        <div className="my-row">
            <div className="box">
              <div className="image">{imageUrl && <img src={imageUrl} alt="" />}</div>

              <label className='btn-container in-img'>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className='my-img-btn'
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                />
                <button type="button" onClick={handleImageChangeClick}>
                Choose Main Image
                </button>
              </label>
            </div>
            <div className="box">
              <div className="image">{image2Url && <img src={image2Url} alt="" />}</div>

              <label className='btn-container in-img'>
              <input
  type="file"
  accept="image/*"
  onChange={handleFile2Change}
  className='my-img-btn'
  style={{ display: 'none' }}
  ref={fileInputRef2}
/>
                <button type="button" onClick={handleImage2ChangeClick}>
                  Change img
                </button>
              </label>
            </div>
          </div>
        

          <label className='btn-container'> <button type="submit">  {mutation.isLoading ? 'Adding...' : 'Add Project'}</button> </label>
      </form>
    </div>
  );
}
