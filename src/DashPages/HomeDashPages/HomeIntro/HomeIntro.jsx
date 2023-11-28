import React, { useState, useRef , useEffect} from 'react';
import './Home.css';
import { useQuery } from 'react-query';

export default function HomeIntro() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [titleAr, setTitleAr] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [textAr, setTextAr] = useState('');
  const [textEn, setTextEn] = useState('');
  const fileInputRef = useRef(null);

  const fetchData = async () => {
    const response = await fetch("https://bluedana.mass-fluence.com/api/home-page");
    const data = await response.json();
    return data;
  };

  const { isLoading, isError, data } = useQuery("apiData", fetchData);
  const Back = data?.data?.background;


  useEffect(() => {
    if (Back) {
      setTitleAr(Back?.text1_ar || ''); // Use empty string as fallback if placeholder value is null
      setTitleEn(Back?.text1_en || '');
      setTextAr(Back?.text2_ar || '');
      setTextEn(Back?.text2_en || '');
    }
  }, [Back]);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile({ file, previewUrl: reader.result });
      };
  
      if (file.type.startsWith('image/')) {
        reader.readAsDataURL(file);
      } else if (file.type.startsWith('video/')) {
        reader.readAsArrayBuffer(file);
      } else {
        // Handle unsupported file types (if necessary)
      }
    }
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

  const imageUrl = selectedFile ? URL.createObjectURL(selectedFile) : (Back ? Back.image : '');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    if (selectedFile) {
      formData.append('image', selectedFile);
    }
    formData.append('text1_ar', titleAr);
    formData.append('text1_en', titleEn);
    formData.append('text2_ar', textAr);
    formData.append('text2_en', textEn);

    try {
      await fetch('https://bluedana.mass-fluence.com/api/update-background-homepage', {
        method: 'POST',
        body: formData,
      });
      window.alert('Update successful!');
    } catch (error) {
      console.error('Error updating home intro:', error);
      console.error('Error updating background:', error);
    }
  };










  return (
    <div className={`home`}>
     {Back&&    <form onSubmit={handleSubmit}>
        <div className="my-row">
          <label>
            <p>Title in ar</p>
            <textarea type="text" value={titleAr} placeholder={Back?.text1_ar} onChange={handleTitleArChange} />
          </label>
          <label>
            <p>Title in en</p>
            <textarea type="text" value={titleEn} placeholder={Back?.text1_en} onChange={handleTitleEnChange} />
          </label>
        </div>

        <div className="my-row">
          <label>
            <p>Text in ar</p>
            <textarea type="text" value={textAr} placeholder={Back?.text2_ar} onChange={handleTextArChange} />
          </label>
          <label>
            <p>Text in en</p>
            <textarea type="text" value={textEn} placeholder={Back?.text2_en} onChange={handleTextEnChange} />
          </label>
        </div>

        <div className="box">
            <div className="image">{imageUrl && <img src={imageUrl} alt="" />}</div>

            <label className='btn-container in-img'>
             
<input
  type="file"
  accept="image/*,video/*" // Accept both image and video files
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
