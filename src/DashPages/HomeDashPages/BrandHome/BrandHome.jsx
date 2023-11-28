import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import './BrandHome.css'
const BASE_URL = 'https://bluedana.mass-fluence.com/api';

const fetchBrands = async () => {
  const response = await axios.get(`${BASE_URL}/all-brands`);
  return response.data;
};

const addBrand = async (brandData) => {
  const response = await axios.post(`${BASE_URL}/add-brand`, brandData);
  return response.data;
};

const deleteBrand = async (brandId) => {
  const response = await axios.post(`${BASE_URL}/delete-brand`, { brand_id: brandId });
  
  return response.data;
};

const BrandsPage = () => {
  const queryClient = useQueryClient();
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const imageUrl = selectedFile ? URL.createObjectURL(selectedFile) : '';
  const mutation = useMutation(addBrand, {
    onSuccess: () => {
      queryClient.invalidateQueries('brands');
    },
  });
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleImageChangeClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAddBrand = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('page', event.target.page.value);

    mutation.mutate(formData);
  };


  
  const { isLoading, isError, data } = useQuery('brands', fetchBrands);

const brands= data?.data;

console.log(brands);
  return (
    <div className="brands-page home">
      <h1>All Brands</h1>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading data</p>}
      {brands && brands.length === 0 && <p>No brands available.</p>}
      {brands && brands.length > 0 && (
        <table className="brands-table">
          <thead>
            <tr>
              
              <th>Image</th>
              <th>Page</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand) => (
              <tr key={brand.id}>
                
                <td>
                  <img src={brand.image} alt={`Brand ${brand.id}`} className="brand-image" />
                </td>
                <td>{brand.page === 1 ? 'Homepage' : 'Services'}</td>
                <td>
                  <button onClick={() => deleteBrand(brand.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h2>Add New Brand</h2>
      <form onSubmit={handleAddBrand}>
        <div>
          <div className="image-logo">{imageUrl && <img src={imageUrl} alt="" />}</div>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="my-img-btn"
          style={{ display: 'none' }}
          ref={fileInputRef}
        />
        <div className="btn-choose">
        <button type="button" onClick={handleImageChangeClick}>
          Choose image
        </button>
        </div>
        </div>
        <div className='select-item'>
          <label htmlFor="page">Page:</label>
          <select id="page" name="page" required>
            <option value="1">Homepage</option>
            <option value="2">Services</option>
          </select>
        </div>
        <label className='btn-container'>
        <button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? 'Adding...' : 'Add Brand'}
          
        </button>
        </label>
      </form>
    </div>
  );
};

export default BrandsPage;
