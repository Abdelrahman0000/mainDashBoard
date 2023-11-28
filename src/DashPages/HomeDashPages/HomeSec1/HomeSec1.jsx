import React, { useState, useRef,useEffect } from 'react';
import './Home.css';
import { useQuery } from 'react-query';

export default function HomeSec1() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [titleAr, setTitleAr] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [textAr, setTextAr] = useState('');
  const [textEn, setTextEn] = useState('');
  const [text2Ar, setText2Ar] = useState('');
  const [text2En, setText2En] = useState('');
  const fileInputRef = useRef(null);



  const fetchData = async () => {
    const response = await fetch("https://bluedana.mass-fluence.com/api/home-page");
    const data = await response.json();
    return data;
  };

  const { isLoading, isError, data } = useQuery("apiData", fetchData);
  const Company = data?.data?.sec1;




  useEffect(() => {
    if (Company) {
      setTitleAr(Company.sec1_text1_ar || ''); // Use empty string as fallback if placeholder value is null
      setTitleEn(Company.sec1_text1_en || '');
      setTextAr(Company.sec1_text2_ar || '');
      setTextEn(Company.sec1_text2_en || '');
      setText2Ar(Company.sec1_text3_ar || '');
      setText2En(Company.sec1_text3_en || '');
    }
  }, [Company]);



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

  const handleText2ArChange = (event) => {
    setText2Ar(event.target.value);
  };

  const handleText2EnChange = (event) => {
    setText2En(event.target.value);
  };

  const handleImageChangeClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const imageUrl = selectedFile ? URL.createObjectURL(selectedFile) : (Company ? Company.sec1_image1 : '');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    if (selectedFile) {
      formData.append('image', selectedFile);
    }
    formData.append('sec1_text1_ar', titleAr);
    formData.append('sec1_text1_en', titleEn);
    formData.append('sec1_text2_ar', textAr);
    formData.append('sec1_text2_en', textEn);

    formData.append('sec1_text3_ar', text2Ar);
    formData.append('sec1_text3_en', text2En);

    try {
      await fetch('https://bluedana.mass-fluence.com/api/update-sec1-homepage', {
        method: 'POST',
        body: formData,
      });
    
      window.alert('Update successful!');
    } catch (error) {
      
      console.error('Error updating sec1:', error);
      window.alert('Update failed. Please try again.');
    }
  };






console.log(Company);


  return (
    <div className={`home`}>
     {Company&&    <form onSubmit={handleSubmit}>
        <div className="my-row">
          <label>
            <p>Title in ar</p>
            <textarea type="text" value={titleAr} placeholder={Company?.sec1_text1_ar} onChange={handleTitleArChange} />
          </label>
          <label>
            <p>Title in en</p>
            <textarea type="text" value={titleEn} placeholder={Company?.sec1_text1_en} onChange={handleTitleEnChange} />
          </label>
        </div>

        <div className="my-row">
          <label>
            <p>Text in ar</p>
            <textarea type="text" value={textAr} placeholder={Company?.sec1_text2_ar} onChange={handleTextArChange} />
          </label>
          <label>
            <p>Text in en</p>
            <textarea type="text" value={textEn} placeholder={Company?.sec1_text2_en} onChange={handleTextEnChange} />
          </label>
        </div>
        <div className="my-row">
          <label>
            <p>Text2 in ar</p>
            <textarea type="text" value={text2Ar} placeholder={Company?.sec1_text3_ar} onChange={handleText2ArChange} />
          </label>
          <label>
            <p>Text2 in en</p>
            <textarea type="text" value={text2En} placeholder={Company?.sec1_text3_en} onChange={handleText2EnChange} />
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
