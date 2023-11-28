import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import './BrandHome.css';


const fetchProducts = async () => {
  const response = await axios.get(`https://bluedana.mass-fluence.com/api/all-products-dashboard`);
  return response.data;
};


const deleteProduct = async (productId) => {
  const response = await axios.post(`https://bluedana.mass-fluence.com/api/delete-product`, {
    product_id: productId,
  });
  return response.data;
};

const DashProductDetail = ({setProduct}) => {
  const { isLoading, isError, data, refetch } = useQuery('products', fetchProducts);
  const mutation = useMutation(deleteProduct);

const proj= data?.data;

const handleEditProduct = (item) => {
  setProduct(item)
};

const handleDeleteProduct = async (productId) => {
  try {
    await mutation.mutateAsync(productId);
    // After deletion, refetch the product data to reflect the changes
    refetch();
  } catch (error) {
    console.error('Error deleting product:', error);
  }
};
console.log(proj);
  return (
    <div className="brands-page proj-dash home">
      <h1>All product</h1>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading data</p>}
      {proj && proj.length === 0 && <p>No product available.</p>}
      {proj && proj.length > 0 && (
        <table className="proj-table">
          <thead>
            <tr>
              
              <th>Image</th>
              <th>Page</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {proj.map((brand) => (
              <tr key={brand.id}>
                
                <td>
                  <img src={brand.image} alt={`Brand ${brand.id}`} className="brand-image" />
                </td>
                <td>{brand.product_type === 1 ? 'furniture' : brand.product_type === 2 ?'agenda':'clutches'}</td>
                <td>
                  <button className='edtit-me'>
                    <Link to={`/admin/product/upload_product`} onClick={() => handleEditProduct(brand)}>
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
          <Link to={'/admin/product/add_product'}>
         Add Product
          </Link>
        </button>
        </label>
    </div>
  );
};

export default DashProductDetail;
