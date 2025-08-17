import './assets/global.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import DefaultLayout from "./layout/defaultLayout";
import Home from './page/home/home';
import Product from './page/shop/product';
import Category from './page/shop/category';
import Register from './page/register/register';
import Dashboard from './page/user/dashboard';
import Cart from './page/cart/cart';
import PrivateRoute from './common/privateRoute';
import Order from './page/order/order';
import Blogs from './page/blog/blogs';
import Blog from './page/blog/blog';
import Page from './page/page/page';
import Promo from './page/shop/promo';
import Shop from './page/shop/shop';
import Contact from './page/contact/contact';
import Brand from './page/shop/brand';
import brands from './page/shop/brands';
import Help from './page/help/help';
import Country from './page/shop/country';
import ClientOrders from './page/user/orders';
import ClientOrder from './page/user/order';
import ScrollToTop from './common/scrollToTop';
import ProductsByType from './page/shop/products_by_type';
import UserWishList from './page/user/userWishList';
import RewardWoint from './page/user/rewardPoints';
import SharedWishList from './page/wishlist/sharedWishlist';
import ForgetPasswordRequest from './page/forget_password/forgetPasswordRequest';
import ResetPassword from './page/forget_password/resetPassword';
import ParrainageMaker from './page/user/parrainage/parrainageMaker';
import PageViewsTracking from './common/pageViewsTracking';
import SearchResult from './page/search/searchResult';
import {PaymentKo, PaymentOk} from './page/orderPayement/paymentStatus';
import WheelOfFortune from "./page/wheelOfFortune/wheelOfFortune";
import WheelOfFortuneHome from "./page/wheelOfFortune/home/home";

function App() {

  return (


    <Router>

      <DefaultLayout>

      <ScrollToTop />

      <PageViewsTracking />

      <Switch>

      <Route path="/" exact component={Home}  />

      <Route path="/wheel-of-fortune-home" exact component={WheelOfFortuneHome}  />

      <Route path="/wheel-of-fortune" exact component={WheelOfFortune}  />

      <Route path="/register" component={Register}  />

      <Route path="/cart" component={Cart}  />

      <Route path="/order" component={Order}  />


      {/* SHOP */}

      <Route path="/shop" exact component={Shop}  />

      <Route path="/shop/product/:id/:slug" component={Product}  />

       <Route path="/shop/category/:slug-:id" component={Category}  />

       <Route path="/shop/brands" exact component={brands}  />

       <Route path="/shop/brand/:id" component={Brand}  />

       <Route path="/shop/type/:slug" component={ProductsByType}  />

       <Route path="/promo" component={Promo}  />

       <Route path="/shop/country/:code" component={Country}  />

       <Route path="/shared/wishlist/:userId" exact component={SharedWishList}  />

       <Route path="/search/:q" component={SearchResult}  />

        {/* Payement */}

        <Route path="/payment/ok" exact component={PaymentOk}  />

        <Route path="/payment/ko" exact component={PaymentKo}  />


      {/* Dashboard */}

      <PrivateRoute path="/dashboard" exact component={Dashboard}  />

      <PrivateRoute path="/dashboard/orders" exact component={ClientOrders}  />

      <Route path="/dashboard/orders/:id" component={ClientOrder}  />

      <PrivateRoute path="/dashboard/wishlist" exact component={UserWishList}  />

      <PrivateRoute path="/dashboard/rewardspoints" exact component={RewardWoint}  />


      <PrivateRoute path="/dashboard/parrainage/new" exact component={ParrainageMaker}  />


       {/* user password */}

       <Route path="/forgetpassword/request" exact component={ForgetPasswordRequest}  />

       <Route path="/forgetpassword/reset/:token" component={ResetPassword}  />


      {/* PAGE */}

      <Route path="/content/:id" component={Page}  />

      <Route path="/contact" component={Contact}  />

      <Route path="/help" component={Help}  />

      {/* BLOG */}

      <Route path="/blog" exact component={Blogs}  />

      <Route path="/blog/:id" component={Blog}  />


      </Switch>

      </DefaultLayout>

      </Router>


  );
}

export default App;
