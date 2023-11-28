import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from 'react-query';

export default function InteriorSec1() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [textAr, setTextAr] = useState('');
  const [textEn, setTextEn] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [descriptionAr, setDescriptionAr] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');

  const fileInputRef = useRef(null);

  const fetchData = async () => {
    const response = await fetch("https://bluedana.mass-fluence.com/api/interiors");
    const data = await response.json();
    return data;
  };

  const { isLoading, isError, data } = useQuery("apiData", fetchData);
 
const Interiordata=data?.data?.interiors;

  useEffect(() => {
    if (Interiordata) {


      setTextAr(Interiordata?.text_ar|| '');
      setTextEn(Interiordata?.text_en || '');
      setTitleAr(Interiordata?.sec1_text1_ar|| '');
      setTitleEn(Interiordata?.sec1_text1_en || '');
      setDescriptionAr(Interiordata?.sec1_text2_ar || '');
      setDescriptionEn(Interiordata?.sec1_text2_en || '');
    }
  }, [Interiordata]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleTextArChange = (event) => {
    setTextAr(event.target.value);
  };

  const handleTextEnChange = (event) => {
    setTextEn(event.target.value);
  };
  const handleTitleArChange = (event) => {
    setTitleAr(event.target.value);
  };

  const handleTitleEnChange = (event) => {
    setTitleEn(event.target.value);
  };

  const handleDescriptionArChange = (event) => {
    setDescriptionAr(event.target.value);
  };

  const handleDescriptionEnChange = (event) => {
    setDescriptionEn(event.target.value);
  };

  const handleImageChangeClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const imageUrl = selectedFile ? URL.createObjectURL(selectedFile) : (Interiordata ? Interiordata.sec1_image : '');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('text_ar', textAr);
    formData.append('text_en', textEn);
    formData.append('sec1_text1_ar', titleAr);
    formData.append('sec1_text1_en', titleEn);
    formData.append('sec1_text2_ar', descriptionAr);
    formData.append('sec1_text2_en', descriptionEn);
    if (selectedFile) {
      formData.append('sec1_image', selectedFile);
    }

    try {
      await fetch('https://bluedana.mass-fluence.com/api/update-interiors', {
        method: 'POST',
        body: formData,
      });
      window.alert('Update successful!');
    } catch (error) {
      console.error('Error updating interior section 1:', error);
    }
  };
console.log(Interiordata)
  return (
    <div className={`home`}>
      {Interiordata && (
        <form onSubmit={handleSubmit}>
 <div className="my-row">
            <label>
              <p>Text in ar</p>
              <textarea type="text" value={textAr} placeholder={Interiordata?.text_ar} onChange={handleTextArChange} />
            </label>
            <label>
              <p>Text in en</p>
              <textarea type="text" value={textEn} placeholder={Interiordata?.text_en} onChange={handleTextEnChange} />
            </label>
          </div>

          <div className="my-row">
            <label>
              <p>Title in ar</p>
              <textarea type="text" value={titleAr} placeholder={Interiordata?.text1_ar} onChange={handleTitleArChange} />
            </label>
            <label>
              <p>Title in en</p>
              <textarea type="text" value={titleEn} placeholder={Interiordata?.text1_en} onChange={handleTitleEnChange} />
            </label>
          </div>

          <div className="my-row">
            <label>
              <p>Description in ar</p>
              <textarea type="text" value={descriptionAr} placeholder={Interiordata?.text2_ar} onChange={handleDescriptionArChange} />
            </label>
            <label>
              <p>Description in en</p>
              <textarea type="text" value={descriptionEn} placeholder={Interiordata?.text2_en} onChange={handleDescriptionEnChange} />
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

            <label className='btn-container'>
              <button type="submit">Update</button>
            </label>
          </div>
        </form>
      )}
    </div>
  );
}
