import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HomeSec1, HomeIntro, AboutIntro, AboutSec1, AboutSecTwo, AboutSecThr, ConstructionIntro, Constructionsec1, ConstructionsecTwo, InteriorIntro, InteriorSec1, InteriorSecTwo, InteriorSecThr, InteriorSecFour , InteriorForm, InteriorSingleForm,BrandsPage, ProjectIntro, AddProject ,DashProjectDetail, UpdateProject, AddProduct, DashProductDetail, UpdateProduct, ContactForm, ContactSingleForm, HomeSliderSec1, AddSliderInHome, UpdateSlideInHome, FaqsIntro, Addfaq, DashfaqDetail, UpdateFaq, ProductIntro, NewsIntro, AddNews, UpdateNews, DashNewsDetail, ContactIntro} from './DashPages';
import LogIn from './DashPages/LogIn/LogIn';
import DashHome from './DashPages/Home/DashHome';
import Sidebar from './Dashcomponent/Sidebar/Sidebar';
import TopBar from './Dashcomponent/TopBar/TopBar';
import NotFound from './DashPages/NotFound/NotFound';

const queryClient = new QueryClient();

function AdminContent() {
  const [email, setEmail] = useState('');
  const [showSidebar, setShowSidebar] = useState(true);

  const [contactform, setContactForm] = useState(null);
  const [singleform, setSingleForm] = useState(null);
  const [projId, setProjId] = useState(null);
  const [slide,setSlide]=useState(null);

  const [news, setNews] = useState(null);
  const [faq, setFaq] = useState(null);
  const [product, setProduct] = useState(null);
  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('email', email);
  }, [email]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1189) {
        setShowSidebar(false);
      } else {
        setShowSidebar(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if(email===''){
    return(
   
       <Routes>
       <Route path="*" element={ <LogIn setEmail={setEmail} />} />
       </Routes>
    )
  }
  return (
    <div className="dashboard">
     
      {email && <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />}
      {email && <TopBar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />}
      <div className={`${email ? `Pages ${showSidebar ? '' : 'page-big-sec'}` : ''}`}>
        <Routes>
          <Route path="/" element={email ? <DashHome showSidebar={showSidebar} /> : <LogIn setEmail={setEmail} />} />
          
         
          <Route path="/brand" element={<BrandsPage/>} />


          <Route path="/news/update_news" element={<UpdateNews news={news}/>} />
          <Route path="/news/detail" element={<DashNewsDetail setNews={setNews}/>} />
          <Route path="/news/add_news" element={<AddNews/>} />
          <Route path="/news/intro" element={<NewsIntro/>} />

          <Route path="/faq/update_faq" element={<UpdateFaq faq={faq}/>} />
          <Route path="/faq/detail" element={<DashfaqDetail setFaq={setFaq}/>} />
          <Route path="/faq/add_faq" element={<Addfaq/>} />
          <Route path="/faqs/intro" element={<FaqsIntro/>} />


          <Route path="/contact/form/:id" element={< ContactSingleForm contactform={contactform}/>} />
          <Route path="/contact/form/" element={<ContactForm setContactForm={setContactForm} />} />
          <Route path="/contact/intro" element={<ContactIntro/>} />

          <Route path="/product/upload_product" element={<UpdateProduct product={product} />} />
          <Route path="/product/detail" element={<DashProductDetail setProduct={setProduct}/>} />
          <Route path="/product/add_product" element={<AddProduct/>} />
          <Route path="/product/intro" element={<ProductIntro/>} />

          <Route path="/project/update_project" element={<UpdateProject projId={projId} />} />
          <Route path="/project/add_project" element={<AddProject/>} />
          <Route path="/project/detail" element={<DashProjectDetail setProjId={setProjId}/>} />
          <Route path="/project/intro" element={<ProjectIntro/>} />

          <Route path="/interior/form/:id" element={< InteriorSingleForm singleform={singleform}/>} />
          <Route path="/interior/form" element={<InteriorForm setSingleForm={setSingleForm}/>} />
          <Route path="/interior/sec4" element={<InteriorSecFour/>} />
          <Route path="/interior/sec3" element={<InteriorSecThr/>} />
          <Route path="/interior/sec2" element={<InteriorSecTwo/>} />
          <Route path="/interior/sec1" element={<InteriorSec1/>} />
          <Route path="/interior/intro" element={<InteriorIntro/>} />

          <Route path="/construction/sec2" element={<ConstructionsecTwo/>} />
          <Route path="/construction/sec1" element={<Constructionsec1/>} />
          <Route path="/construction/intro" element={<ConstructionIntro />} />
        
          <Route path="/about/sec3" element={<AboutSecThr />} />
          <Route path="/about/sec2" element={<AboutSecTwo />} />
          <Route path="/about/sec1" element={<AboutSec1 />} />
          <Route path="/about/intro" element={<AboutIntro />} />

          <Route path="/home/intro" element={<HomeIntro />} />
          <Route path="/home/sec1" element={<HomeSec1 />} />
          <Route path="/home/sec1/slider" element={<HomeSliderSec1 setSlide={setSlide} />} />
          <Route path="/home/sec1/slider/add_slide" element={<AddSliderInHome />} />
          <Route path="/home/sec1/slider/update_slide" element={<UpdateSlideInHome slide={slide} />} />
          {/* <Route path="/*" element={email ? <NotFound /> : <LogIn setEmail={setEmail} />} />
   */}
        </Routes>
      </div>
    </div>
  );
}

function App() {
  

  return (
    <QueryClientProvider client={queryClient}>
       
      <Router>
        <Routes>
          <Route path="/admin/*" element={<AdminContent  />} />
          
        </Routes>
      </Router>
   
    </QueryClientProvider>
  );
}

export default App;


