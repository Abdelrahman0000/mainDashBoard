import React, { useState, useRef,useEffect } from 'react';
import './AddProject.css'


import { useMutation , useQueryClient,useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

export default function UpdateFaq({ faq }) {
  const [questionEn, setQuestionEn] = useState('');
  const [questionAr, setQuestionAr] = useState('');
  const [answerEn, setAnswerEn] = useState('');
  const [answerAr, setAnswerAr] = useState('');

  useEffect(() => {
    if (faq) {
    
      setQuestionEn(faq?.question_en || '');
      setQuestionAr(faq?.question_ar || '');
      setAnswerEn(faq?.answer_en || '');
      setAnswerAr(faq?.answer_ar|| '');
    }
  }, [faq]);



  const queryClient = useQueryClient();


  const navigate = useNavigate();

  const mutation = useMutation(
    async () => {

      
      const formData = new FormData();
     
      formData.append('question_en', questionEn);
      formData.append('question_ar', questionAr);
      formData.append('answer_en', answerEn);
      formData.append('answer_ar', answerAr);
  
    formData.append('faq_id', faq.id);

      const response = await fetch('https://bluedana.mass-fluence.com/api/update-faq', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Faq addition failed');
      }
  
      // Optionally refetch data after mutation for updated list
      await queryClient.invalidateQueries('Faq');
    },
    {
      onSuccess: () => {
        window.alert('Modified successfully! ');
        // Clear input fields after successful submission
       
       

        navigate('/admin/faq/detail');

      },
    }
  );
  
  const handleSubmit = (event) => {
    event.preventDefault();
    mutation.mutate(); // Trigger the mutation
  };





console.log(faq)
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
        <label className='btn-container'> <button type="submit">{mutation.isLoading ? 'Editing in Progress...' : 'Edit faq'}</button> </label>
      </form>
    </div>
  );
}
