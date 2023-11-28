import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import './BrandHome.css';


const fetchProducts = async () => {
  const response = await axios.get(`https://bluedana.mass-fluence.com/api/home-page`);
  return response.data;
};


const deleteProduct = async (slideId) => {
  const response = await axios.post(`https://bluedana.mass-fluence.com/api/delete-slider`, {
    slider_id: slideId,
  });
  return response.data;
};

const HomeSliderSec1 = ({setSlide}) => {
  const { isLoading, isError, data, refetch } = useQuery('products', fetchProducts);
  const mutation = useMutation(deleteProduct);


const handleEditProduct = (item) => {
  setSlide(item)
};

const handleDeleteProduct = async (slideId) => {
  try {
    await mutation.mutateAsync(slideId);
    // After deletion, refetch the product data to reflect the changes
    refetch();
  } catch (error) {
    console.error('Error deleting Slider:', error);
  }
};

const sliders =data?.data?.sliders;
console.log(sliders);
  return (
    <div className="brands-page proj-dash home">
      <h1>All Sliders</h1>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading data</p>}
      {sliders && sliders.length === 0 && <p>No Sliders available.</p>}
      {sliders && sliders.length > 0 && (
        <table className="proj-table">
          <thead>
            <tr>
              
              <th>Image</th>
              
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sliders.map((brand) => (
              <tr key={brand.id}>
                
                <td>
                  <img src={brand.image} alt={`Brand ${brand.id}`} className="brand-image" />
                </td>
                
                <td>
                  <button className='edtit-me'>
                    <Link to={`/admin/home/sec1/slider/update_slide`} onClick={() => handleEditProduct(brand)}>
                      Edit
                    </Link>
                  </button>
                  <button onClick={() => handleDeleteProduct(brand.id)}>Delete</button>
                </td>
               
              </tr>
            ))}
          </tbody>
        </table>
      )}

<label className='btn-container'>
        <button type="submit" >
          <Link to={'/admin/home/sec1/slider/add_slide'}>
         Add Slide
          </Link>
        </button>
        </label>
    </div>
  );
};

export default HomeSliderSec1;
