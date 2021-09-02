import React from 'react';
import { Route,Switch } from 'react-router-dom';
// import PostListPage from './Pages/.PostListPage';
import Leftbar from './Components/Leftbar.js';
import SearchPage from './Pages/SearchPage';
import Main from './Pages/Main';
import MyReservationPage from './Pages/MyReservationPage';
import CheckReservationPage from './Pages/CheckReservationPage';
import ConfirmReservationPage from './Pages/ConfirmReservationPage';
import ReservationPage from './Pages/ReservationPage';
import HospitalReservationPage from './Pages/HospitalReservationPage';
import HospitalPage from './Pages/HospitalPage';
import ErrorPage from './Pages/ErrorPage';
import MyPostListPage from './Pages/MyPostListPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import PostListPage from './Pages/PostListPage';
import PostViewPage from './Pages/PostViewPage';
import WritePostPage from './Pages/WritePostPage';
import WriteProductPage from './Pages/WriteProductPage';
import ProductListPage from './Pages/ProductListPage';
import ProductViewPage from './Pages/ProductViewPage';
import Modify from './Components/mypage/ModInformation';
import AddPet from './Pages/AddPetPage';
import HeaderContainer from './Containers/common/HeaderContainer';
import WritePage from './Pages/WritePage';
import Test from './Pages/Test';
// import HRegisterForm from './Containers/auth/HRegisterForm.js';
import HRegisterPage from "./Pages/HRegisterPage";
import HLoginPage from './Pages/HLoginPage';
import AllProductPage from './Pages/AllProductPage.jsx';
import ProductOnSale from './Pages/ProductOnSale.jsx';
import HospitalPostListPage from './Pages/HospitalPostListPage.jsx';
import Footer from './Components/Footer.jsx'
const App = () => {
  return (
    <>
      <Route path="*" component={HeaderContainer} />
      <div className="sidebar-body">
        <Route path="*" component={Leftbar} />
        <div className="body">
          <Switch>
          {/* <Route component={PostListPage} path={['/@:username', '/']} exact /> */}
          <Route path="/login" component={LoginPage} />
          <Route path="/hlogin" component={HLoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/hregister" component={HRegisterPage} />
          <Route component={WritePage} path="/write" />
          <Route path="/test" component={Test} />
          <Route path="/" exact component={Main} />
          <Route path="/main" component={Main} />
          <Route path="/HospitalPostListPage/:hospitalName" component={HospitalPostListPage}/>
          <Route exact path="/hospital" component={SearchPage} />
          <Route path="/PostListPage" component={PostListPage} />
          <Route path="/MyPostListPage" component={MyPostListPage} />
          <Route path="/WritePostPage/:_id" component={WritePostPage} />
          <Route path="/writeproductpage" component={WriteProductPage} />
          <Route path="/ProductListPage" component={ProductListPage} />
          <Route path="/allproduct" component={AllProductPage}/>
          <Route path="/product/detail/:_id" component={ProductViewPage} />
          <Route path="/ProductOnSale" component={ProductOnSale}/>
          <Route
            path="/checkReservationPage"
            component={CheckReservationPage}
          />
          <Route path="/reservation/:_id" component={ConfirmReservationPage} />
          <Route exact path="/reservation" component={MyReservationPage} />
          <Route
            exact
            path="/hspReservation"
            component={HospitalReservationPage}
          />
          <Route path="/modify/:_id" component={Modify} />
          <Route exact path="/modify" component={Modify} />
          <Route exact path="/addPet" component={AddPet} />
          <Route path="/PostView/:_id" component={PostViewPage} />
          <Route path="/hospital/:name" component={HospitalPage} />
          <Route path="/reservationPage" component={ReservationPage} />
          <Route render={() => <ErrorPage />} />
          </Switch>
          <Route path="*" component={Footer}/>
        </div>
      </div>
    </>
  );
};
export default App;
