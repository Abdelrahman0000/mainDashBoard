import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import './BrandHome.css';


const fetchfaqs = async () => {
  const response = await axios.get(`https://bluedana.mass-fluence.com/api/faqs`);
  return response.data;
};


const deletefaq = async (faqId) => {
  const response = await axios.post(`https://bluedana.mass-fluence.com/api/delete-faq`, {
    faq_id: faqId,
  });
  return response.data;
};

const DashfaqDetail = ({setFaq}) => {
  const { isLoading, isError, data, refetch } = useQuery('faqs', fetchfaqs);
  const mutation = useMutation(deletefaq);

const proj= data?.data?.faqs;

const handleEditfaq = (item) => {
  setFaq(item)
};
console.log(proj);
const handleDeletefaq = async (faqId) => {
  try {
    await mutation.mutateAsync(faqId);
    // After deletion, refetch the faq data to reflect the changes
    refetch();
  } catch (error) {
    console.error('Error deleting faq:', error);
  }
};
console.log(proj);
  return (
    <div className="brands-page proj-dash home">
      <h1>All faq</h1>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading data</p>}
      {proj && proj.length === 0 && <p>No faq available.</p>}
      {proj && proj.length > 0 && (
        <table className="proj-table">
          <thead>
            <tr>
              
              <th>Question</th>
              
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {proj.map((brand) => (
              <tr key={brand.id}>
                
                <td>
                 <p className="quit"> {brand.question_en} </p>
                </td>
               
                <td>
                  <button className='edtit-me'>
                    <Link to={`/admin/faq/update_faq`} onClick={() => handleEditfaq(brand)}>
                      Edit
                    </Link>
                  </button>
                  <button onClick={() => handleDeletefaq(brand.id)}>Delete</button>
                </td>
               
              </tr>
            ))}
          </tbody>
        </table>
      )}

<label className='btn-container'>
        <button type="submit" >
          <Link to={'/admin/faq/add_faq'}>
         Add faq
          </Link>
        </button>
        </label>
    </div>
  );
};

export default DashfaqDetail;
