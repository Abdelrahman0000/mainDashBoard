import React, { useState, useRef,useEffect } from 'react';
import './AddProject.css'


import { useMutation , useQueryClient,useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

export default function UpdateSlideInHome({ slide}) {
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
  
  useEffect(() => {
    if (slide) {
    
      setTextEn(slide?.text_en || '');
      setTextAr(slide?.text_ar || '');
    }
  }, [slide]);

  const image2Url = selectedFile ? URL.createObjectURL(selectedFile) : (slide ? slide.image :  '');









  const queryClient = useQueryClient();


  const navigate = useNavigate();

  const mutation = useMutation(
    async () => {

      
      const formData = new FormData();
     
      if (selectedFile) {
        formData.append('image', selectedFile);
      }

    formData.append('text_en', textEn);
    formData.append('text_ar', textAr);
  
    formData.append('slider_id', slide.id);

      const response = await fetch('https://bluedana.mass-fluence.com/api/update-slider', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Slide addition failed');
      }
  
      // Optionally refetch data after mutation for updated list
      await queryClient.invalidateQueries('Slider');
    },
    {
      onSuccess: () => {
        window.alert('Modified successfully! ');
        // Clear input fields after successful submission
       
       

        navigate('/admin/home/sec1/slider');

      },
    }
  );
  
  const handleSubmit = (event) => {
    event.preventDefault();
    mutation.mutate(); // Trigger the mutation
  };





console.log(slide)
  return (
    <div className={`home add-proj`}>
      <form onSubmit={handleSubmit}>
      
        <div className="my-row">
          <label>
            <p>Text in ar</p>
            <textarea type="text" value={textAr} onChange={(e) => setTextAr(e.target.value)}  />
          </label>
          <label>
            <p>Text in en</p>
            <textarea type="text" value={textEn} onChange={(e) => setTextEn(e.target.value)}  />
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
        <label className='btn-container'> <button type="submit">{mutation.isLoading ? 'Editing in Progress...' : 'Edit slide'}</button> </label>
      </form>
    </div>
  );
}
