import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from 'react-query';

export default function InteriorSecThr() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [titleAr, setTitleAr] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [textAr, setTextAr] = useState('');
  const [textEn, setTextEn] = useState('');
  const fileInputRef = useRef(null);
  const fileInputRef2 = useRef(null); // Create a separate ref for the second file input
  const fetchData = async () => {
    const response = await fetch("https://bluedana.mass-fluence.com/api/interiors");
    const data = await response.json();
    return data;
  };

  const { isLoading, isError, data } = useQuery("apiData", fetchData);
 
const Interiordata=data?.data?.interiors;

  useEffect(() => {
    if (Interiordata) {
      setTitleAr(Interiordata?.sec3_text1_ar || '');
      setTitleEn(Interiordata?.sec3_text1_en || '');
      setTextAr(Interiordata?.sec3_text2_ar || '');
      setTextEn(Interiordata?.sec3_text2_en || '');
    }
  }, [Interiordata]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFile2Change = (event) => {
    setSelectedFile2(event.target.files[0]);
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
  const handleImage2ChangeClick = () => {
    console.log(Interiordata.sec3_image2); 
    if (fileInputRef2.current) {
      fileInputRef2.current.click();
    }
  };

  const imageUrl = selectedFile ? URL.createObjectURL(selectedFile) : (Interiordata ? Interiordata.sec3_image1 : '');
  const image2Url = selectedFile2 ? URL.createObjectURL(selectedFile2) : (Interiordata ? Interiordata.sec3_image2 : '');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    if (selectedFile) {
      formData.append('sec3_image1', selectedFile);
    }
    if (selectedFile2) {
      formData.append('sec3_image2', selectedFile2);
    }
    formData.append('sec3_text1_ar', titleAr);
    formData.append('sec3_text1_en', titleEn);
    formData.append('sec3_text2_ar', textAr);
    formData.append('sec3_text2_en', textEn);

    try {
      await fetch('https://bluedana.mass-fluence.com/api/update-interiors', {
        method: 'POST',
        body: formData,
      });

      window.alert('Update successful!');
    } catch (error) {
      console.error('Error updating sec1:', error);
      window.alert('Update failed. Please try again.');
    }
  };

  console.log(Interiordata);

  return (
    <div className={`home`}>
      {Interiordata && (
        <form onSubmit={handleSubmit}>
          <div className="my-row">
            <label>
              <p>Title in ar</p>
              <textarea type="text" value={titleAr} placeholder={Interiordata?.sec3_text1_ar} onChange={handleTitleArChange} />
            </label>
            <label>
              <p>Title in en</p>
              <textarea type="text" value={titleEn} placeholder={Interiordata?.sec3_text1_en} onChange={handleTitleEnChange} />
            </label>
          </div>

          <div className="my-row">
            <label>
              <p>Text in ar</p>
              <textarea type="text" value={textAr} placeholder={Interiordata?.sec3_text2_ar} onChange={handleTextArChange} />
            </label>
            <label>
              <p>Text in en</p>
              <textarea type="text" value={textEn} placeholder={Interiordata?.sec3_text2_en} onChange={handleTextEnChange} />
            </label>
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
                  Change img
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
          <label className='btn-container'> <button type="submit">Update</button></label>
        </form>
      )}
    </div>
  );
}
