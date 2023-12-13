import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./realm/UserContext";

import Home from './routes/Home';

import Signup from "./realm/Signup";
import Login from "./realm/Login";
import PrivateRoute from "./realm/Private";
import Security from "./realm/Security";
import Reset from "./realm/Reset";
import Profile from './realm/Profile';
import Contact from './realm/Contact';
import Favorite from "./realm/Favorite";

import Navbar from "./components/navbar";
import Edit from "./components/edit";
import Create from "./components/create";
import RecordList from "./components/recordList";
import UserList from "./components/userList";
import StarRating from "./components/starRating";
import Footer from './components/footer';
import Disclaimer from "./components/disclaimer";

import Data from './routes/Data'; 
import Discover from './routes/Discover';
import Feature from './routes/Feature';
import Invitation from "./routes/Invitation";  
import Safety from './routes/Safety';
import Search from './routes/Search';
import TripFinder from './routes/Trip';
import SpecialEvent from './routes/Special';
import NotFound from './routes/NotFound';
import NetworkError from "./routes/NetworkError";
// eslint-disable-next-line
import Test from './routes/Test';
import Feedback from './routes/Feedback';
function App() {
  
 return (
   <BrowserRouter>
     <UserProvider>
     <Navbar />
       <Routes>
       <Route exact path="/" element={<><Home /> <Footer/></>} />
            <Route exact path='/discover' element={<><Discover /> <Disclaimer/></>} />
            <Route exact path="/data/:id" element={<><Data /> <Disclaimer/></>} />
            <Route exact path='/specialevent' element={<><SpecialEvent/>  <Disclaimer/></>} />
            <Route exact path='/feature' element={<><Feature/>  <Disclaimer/></>} />
            <Route exact path='/search' element={<><Search />  <Disclaimer/></>} />
            <Route exact path='/tripfinder' element={<><TripFinder />  <Disclaimer/></>} /> 
            <Route exact path='/tripfinder/:venueName' element={<><TripFinder />  <Disclaimer/></>} /> 
            <Route exact path='/login' element={<><Login />  <Disclaimer/></>} />
            <Route exact path='/safety' element={<><Safety />  <Disclaimer/></>} />
            <Route exact path='/recordlist' element={<><RecordList />  <Disclaimer/></>} />
            <Route exact path="/edit/:id" element={<><Edit />  <Disclaimer/></>} />         
            <Route exact path="/create" element={<><Create />  <Disclaimer/></>} />
            <Route exact path='/invitation' element={<><Invitation />  <Disclaimer/></>} />
            <Route exact path='/rating/:id' element={<><StarRating />  <Disclaimer/></>} />  
            <Route exact path='*' element={<><NotFound />  <Disclaimer/></>} />    
            <Route exact path='/error' element={<><NetworkError />  <Disclaimer/></>} />  
            <Route exact path='/feedback' element={<><Feedback />  <Disclaimer/></>} />
            <Route exact path='/test' element={<><Test />  <Disclaimer/></>} /> 

            <Route exact path="/signup" element={<><Signup />  <Disclaimer/></>} />
            <Route exact path="/login" element={<><Login />  <Disclaimer/></>} />
            <Route element={<><PrivateRoute /></>}>
                <Route exact path='/profile/' element={<><Profile />  <Disclaimer/></>} />
                <Route exact path='/contact/' element={<><Contact />  <Disclaimer/></>} />
                <Route exact path='/userList' element={<><UserList />  <Disclaimer/></>} />
                <Route exact path='/favorite' element={<><Favorite />  <Disclaimer/></>} />
            </Route>
            <Route exact path='/security' element={<><Security />  <Disclaimer/></>} />
            <Route exact path='/reset' element={<><Reset />  <Disclaimer/></>} />
       </Routes>
     </UserProvider>
   </BrowserRouter>
 );
}
 
export default App;