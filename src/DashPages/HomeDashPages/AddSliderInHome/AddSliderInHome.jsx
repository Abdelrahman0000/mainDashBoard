import React, { useState, useRef } from 'react';
import './AddProject.css';

import { useMutation , useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

export default function AddSliderInHome() {
  const [selectedFile, setSelectedFile] = useState(null);
 
  const [textEn, setTextEn] = useState('');
  const [textAr, setTextAr] = useState('');

  const fileInputRef2 = useRef(null);

  const handleFile2Change = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleImage2ChangeClick = () => {
    if (fileInputRef2.current) {
      fileInputRef2.current.click();
    }
  };

  const image2Url = selectedFile ? URL.createObjectURL(selectedFile) : '';
  const queryClient = useQueryClient();



  const navigate = useNavigate();

  const mutation = useMutation(
    async () => {

    
      const formData = new FormData();
     
      formData.append('text_en', textEn);
      formData.append('text_ar', textAr);
      formData.append('image', selectedFile);

      const response = await fetch('https://bluedana.mass-fluence.com/api/add-slider', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Slider addition failed');
      }
  
      // Optionally refetch data after mutation for updated list
      await queryClient.invalidateQueries('slider');
    },
    {
      onSuccess: () => {
        window.alert('Slider added successfully!');
        // Clear input fields after successful submission
        
       

        navigate('/admin/home/sec1/slider');

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
            <p>Text in ar</p>
            <textarea type="text" value={textAr} onChange={(e) => setTextAr(e.target.value)} required />
          </label>
          <label>
            <p>Text in en</p>
            <textarea type="text" value={textEn} onChange={(e) => setTextEn(e.target.value)} required />
          </label>
        </div>
       
        <div className="my-row" >
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
        <label className='btn-container'> <button type="submit">{mutation.isLoading ? 'Adding...' : 'Add Slide'}</button> </label>
      </form>
    </div>
  );
}
