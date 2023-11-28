import React, { useState, useRef } from 'react';
import './AddProject.css';

import { useMutation , useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

export default function Addfaq() {
 
  const [questionEn, setQuestionEn] = useState('');
  const [questionAr, setQuestionAr] = useState('');
  const [answerEn, setAnswerEn] = useState('');
  const [answerAr, setAnswerAr] = useState('');


  const queryClient = useQueryClient();



  const navigate = useNavigate();

  const mutation = useMutation(
    async () => {

    
      const formData = new FormData();
    
      formData.append('question_en', questionEn);
      formData.append('question_ar', questionAr);
      formData.append('answer_en', answerEn);
      formData.append('answer_ar', answerAr);
    

      const response = await fetch('https://bluedana.mass-fluence.com/api/add-faq', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('faq addition failed');
      }
  
      // Optionally refetch data after mutation for updated list
      await queryClient.invalidateQueries('projects');
    },
    {
      onSuccess: () => {
        window.alert('faq added successfully!');
        // Clear input fields after successful submission
        
       

        navigate('/admin/faq/detail');

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
            <p>Question in ar</p>
            <textarea type="text" value={questionAr} onChange={(e) => setQuestionAr(e.target.value)} required />
          </label>
          <label>
            <p>Question in en</p>
            <textarea type="text" value={questionEn} onChange={(e) => setQuestionEn(e.target.value)} required />
          </label>
        </div>
        <div className="my-row">
          <label>
            <p>Answer in ar</p>
            <textarea type="text" value={answerAr} onChange={(e) => setAnswerAr(e.target.value)} required />
          </label>
          <label>
            <p>Answer in en</p>
            <textarea type="text" value={answerEn} onChange={(e) => setAnswerEn(e.target.value)} required />
          </label>
        </div>
       
        <label className='btn-container'> <button type="submit">{mutation.isLoading ? 'Adding...' : 'Add faq'}</button> </label>
      </form>
    </div>
  );
}
