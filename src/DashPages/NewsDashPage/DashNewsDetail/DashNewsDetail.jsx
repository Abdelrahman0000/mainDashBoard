import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import './BrandHome.css';


const fetchnews = async () => {
  const response = await axios.get(`https://bluedana.mass-fluence.com/api/news`);
  return response.data;
};


const deletenews = async (newsId) => {
  const response = await axios.post(`https://bluedana.mass-fluence.com/api/delete-news`, {
    news_id: newsId,
  });
  return response.data;
};

const DashNewsDetail = ({setNews}) => {
  const { isLoading, isError, data, refetch } = useQuery('news', fetchnews);
  const mutation = useMutation(deletenews);

const proj= data?.data?.news;

const handleEditnews = (item) => {
  setNews(item)
};

const handleDeletenews = async (newsId) => {
  try {
    await mutation.mutateAsync(newsId);
    // After deletion, refetch the news data to reflect the changes
    refetch();
  } catch (error) {
    console.error('Error deleting news:', error);
  }
};
console.log(proj);
  return (
    <div className="brands-page proj-dash home">
      <h1>All news</h1>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading data</p>}
      {proj && proj.length === 0 && <p>No news available.</p>}
      {proj && proj.length > 0 && (
        <table className="proj-table">
          <thead>
            <tr>
              
              <th>News</th>
              
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {proj.map((brand) => (
              <tr key={brand.id}>
                
                <td>
                 <p className="quit" style={{textAlign:'center'}}>{brand.title_en.slice(0, 100)}...</p>
                </td>
              
                <td>
                  <button className='edtit-me'>
                    <Link to={`/admin/news/update_news`} onClick={() => handleEditnews(brand)}>
                      Edit
                    </Link>
                  </button>
                  <button onClick={() => handleDeletenews(brand.id)}>Delete</button>
                </td>
               
              </tr>
            ))}
          </tbody>
        </table>
      )}

<label className='btn-container'>
        <button type="submit" >
          <Link to={'/admin/news/add_news'}>
         Add news
          </Link>
        </button>
        </label>
    </div>
  );
};

export default DashNewsDetail;
