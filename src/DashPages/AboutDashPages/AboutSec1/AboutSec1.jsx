import React, { useState, useRef , useEffect} from 'react';

import { useQuery } from 'react-query';

export default function AboutSec1() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [titleAr, setTitleAr] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [textAr, setTextAr] = useState('');
  const [textEn, setTextEn] = useState('');
  const fileInputRef = useRef(null);

  const fetchData = async () => {
    const response = await fetch("https://bluedana.mass-fluence.com/api/about-page");
    const data = await response.json();
    return data;
  };

  const { isLoading, isError, data } = useQuery("apiData", fetchData);
  const About = data?.data?.about;

  
  useEffect(() => {
    if (About) {
      setTitleAr(About?.sec1_text1_ar || ''); // Use empty string as fallback if placeholder value is null
      setTitleEn(About?.sec1_text1_en || '');
      setTextAr(About?.sec1_text2_ar || '');
      setTextEn(About?.sec1_text2_en || '');
    }
  }, [About]);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleTitleArChange = (event) => {
    setTitleAr(event.target.value);
  };

  const handleTitleEnChange = (event) => {
    setTitleEn(event.target.value);
  };

  const handleTextArChange = (event) => {
    setTextAr(event.target.value);
  };

  const handleTextEnChange = (event) => {
    setTextEn(event.target.value);
  };

  const handleImageChangeClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const imageUrl = selectedFile ? URL.createObjectURL(selectedFile) : (About ? About.sec1_image : '');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    if (selectedFile) {
      formData.append('sec1_image', selectedFile); 
    }
    formData.append('sec1_text1_ar', titleAr);
    formData.append('sec1_text1_en', titleEn);
    formData.append('sec1_text2_ar', textAr);
    formData.append('sec1_text2_en', textEn);
    
    
    
    try {
      await fetch('https://bluedana.mass-fluence.com/api/update-about', {
        method: 'POST',
        body: formData,
      });
    
      window.alert('Update successful!');
    } catch (error) {
      
      console.error('Error updating sec1:', error);
      window.alert('Update failed. Please try again.');
    }
  };






console.log(About);


  return (
    <div className={`home`}>
     {About&&    <form onSubmit={handleSubmit}>
        <div className="my-row">
          <label>
            <p>Title in ar</p>
            <textarea type="text" value={titleAr} placeholder={About?.sec1_text1_ar} onChange={handleTitleArChange} />
          </label>
          <label>
            <p>Title in en</p>
            <textarea type="text" value={titleEn} placeholder={About?.sec1_text1_en} onChange={handleTitleEnChange} />
          </label>
        </div>

        <div className="my-row">
          <label>
            <p>Text in ar</p>
            <textarea type="text" value={textAr} placeholder={About?.sec1_text2_ar} onChange={handleTextArChange} />
          </label>
          <label>
            <p>Text in en</p>
            <textarea type="text" value={textEn} placeholder={About?.sec1_text2_en} onChange={handleTextEnChange} />
          </label>
        </div>

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
                Change img
              </button>
             
            </label>
            
          <label className='btn-container'> <button type="submit">Update</button></label>
          </div>
      </form>}
    </div>
  );
}
