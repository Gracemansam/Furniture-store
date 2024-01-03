import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
  HomeLayout,
  Landing,
  Error,
  Products,
  SingleProduct,
  Cart,
  About,
  Register,
  Login,
  Checkout,
  Orders,
} from './pages';
import { loader as landingLoader } from './pages/Landing';
import { loader as singlePageLoader } from './pages/SingleProduct';
import { loader as productPageLoader } from './pages/Products';
import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';
import { loader as checkoutLoader } from './pages/Checkout';
import { action as checkoutAction } from './components/CheckoutForm';
import { loader as ordersLoader } from './pages/Orders';



import { store } from './store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        loader : landingLoader(queryClient),
      },
      {
        path: 'products',
        element: <Products />,
        loader: productPageLoader(queryClient),
      },
      {
        path: 'products/:id',
        element: <SingleProduct />,
        loader: singlePageLoader(queryClient),
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      { path: 'about', element: <About /> },
      {
        path: 'checkout',
        element: <Checkout />,
        loader: checkoutLoader(store),
        action: checkoutAction(store,queryClient),
      },
      {
        path: 'orders',
        element: <Orders />,
        loader: ordersLoader(store,queryClient),
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
    action: loginAction(store),
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <Error />,
    action: registerAction, 
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;