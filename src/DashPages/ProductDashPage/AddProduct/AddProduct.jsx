import React, { useState, useRef } from 'react';
import './AddProject.css';

import { useMutation , useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [productType, setProductType] = useState('1'); // Default to 'furniture' project type
  const [titleEn, setTitleEn] = useState('');
  const [titleAr, setTitleAr] = useState('');
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
      formData.append('product_type', productType);
      formData.append('title_en', titleEn);
      formData.append('title_ar', titleAr);
      formData.append('text_en', textEn);
      formData.append('text_ar', textAr);
      formData.append('image', selectedFile);

      const response = await fetch('https://bluedana.mass-fluence.com/api/add-product', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Product addition failed');
      }
  
      // Optionally refetch data after mutation for updated list
      await queryClient.invalidateQueries('projects');
    },
    {
      onSuccess: () => {
        window.alert('Product added successfully!');
        // Clear input fields after successful submission
        
       

        navigate('/admin/product/detail');

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
            <p>Title in ar</p>
            <textarea type="text" value={titleAr} onChange={(e) => setTitleAr(e.target.value)} required />
          </label>
          <label>
            <p>Title in en</p>
            <textarea type="text" value={titleEn} onChange={(e) => setTitleEn(e.target.value)} required />
          </label>
        </div>
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
        <div className="my-row" style={{justifyContent:'center'}}>
          <div className="select-item">
            <label htmlFor="productType">Project Type</label>
            <select id="productType" value={productType} onChange={(e) => setProductType(e.target.value)} required>
              <option value="1">furniture</option>
              <option value="2">agenda</option>
              <option value="3">clutches</option>
            </select>
          </div>
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
        <label className='btn-container'> <button type="submit">{mutation.isLoading ? 'Adding...' : 'Add product'}</button> </label>
      </form>
    </div>
  );
}
