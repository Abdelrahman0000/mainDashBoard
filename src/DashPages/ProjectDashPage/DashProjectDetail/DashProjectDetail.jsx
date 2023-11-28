import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import './BrandHome.css';

const fetchproj = async () => {
  const response = await axios.get(`https://bluedana.mass-fluence.com/api/all-projects-dashboard`);
  return response.data;
};


const deleteProject = async (projectId) => {
  const response = await axios.post(`https://bluedana.mass-fluence.com/api/delete-project`, {
    project_id: projectId,
  });
  return response.data;
};
const DashProjectDetail = ({setProjId}) => { 
  const { isLoading, isError, data, refetch } = useQuery('proj', fetchproj);
const mutation = useMutation(deleteProject);

const proj= data?.data;

const handleAddProjID = (item) => {
  console.log(item)
  setProjId(item)
};

const handleDeleteProj = async (projectId) => {
  try {
    await mutation.mutateAsync(projectId);
    // After deletion, refetch the project data to reflect the changes
    refetch();
  } catch (error) {
    console.error('Error deleting project:', error);
  }
};
console.log(proj);
  return (
    <div className="brands-page proj-dash home">
      <h1>All project</h1>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading data</p>}
      {proj && proj.length === 0 && <p>No proj available.</p>}
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
                <td>{brand.project_type === 1 ? 'pervious' : brand.project_type === 2 ?'current':'ongoing'}</td>
                <td>
                  <button onClick={() => handleDeleteProj(brand.id)}>Delete</button>
                  <button className='edtit-me'>
                    <Link to={`/admin/project/update_project`} onClick={() => handleAddProjID(brand.id)}>
                      Edit
                    </Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

<label className='btn-container'>
        <button type="submit" >
          <Link to={'/admin/project/add_project'}>
         Add Project
          </Link>
        </button>
        </label>
    </div>
  );
};

export default DashProjectDetail;
