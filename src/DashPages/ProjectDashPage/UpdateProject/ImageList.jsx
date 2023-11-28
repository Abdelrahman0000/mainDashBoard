import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';


const addImageList = async (ImageListData) => {
  try {
    const response = await axios.post(`https://bluedana.mass-fluence.com/api/add-image-to-project`, ImageListData);
    return response.data;
  } catch (error) {
    console.error("Error adding ImageList:", error);
    throw error;
  }
};
const deleteImageList = async (ImageListId) => {
  try {
    const response = await axios.post(
      `https://bluedana.mass-fluence.com/api/delete-image-to-project`,{ 'image_id': ImageListId });
    return response.data;
  } catch (error) {
    // Handle error here, e.g., log it or show a notification
    console.error("Error deleting ImageList:", error);
    throw error;
  }
};

// const deleteBrand = async (brandId) => {
//   const response = await axios.post(`${BASE_URL}/delete-brand`, { brand_id: brandId });
  
//   return response.data;
// };

const ImageListPage = ({ImageList,id}) => {
  const queryClient = useQueryClient();
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const imageUrl = selectedFile ? URL.createObjectURL(selectedFile) : '';
  const mutation = useMutation(addImageList, {
    onSuccess: () => {
      queryClient.invalidateQueries('ImageList');
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

  const handleaddImageList = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('project_id', id);

    mutation.mutate(formData);
  };



console.log(ImageList, id);
  return (
    <div className="brands-page home">
      <h1>All Image List</h1>
     
     
      {ImageList && ImageList.length === 0 && <p>No ImageList available.</p>}
      {ImageList && ImageList.length > 0 && (
        <table className="ImageList-table">
          <thead>
            <tr>
              
              <th>Image</th>
              
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {ImageList.map((Image) => (
              <tr key={Image.id}>
                
                <td>
                  <img src={Image.image} alt={`ImageList${Image.id}`} className="brand-image" />
                </td>
             
                <td>
                <button type="button" onClick={() => deleteImageList(Image.id)}>
        Delete
      </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h2>Add New Image</h2>
      <form onSubmit={handleaddImageList}>
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
        <div className="btn-choose" style={{marginBottom:'20px'}}>
        <button type="button" onClick={handleImageChangeClick}> 
          Choose image
        </button>
        </div>
        </div>
      
        <label className='btn-container'>
        <button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? 'Adding...' : 'Add Image to ImageList'}
          
        </button>
        </label>
      </form>
    </div>
  );
};

export default ImageListPage;
