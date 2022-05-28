import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { clearUser, createUser, loginUser } from '../../store/reducers/LoginUserSlice';
import { openNotification } from '../../store/reducers/PopupSlice';
import { clearSavedStories } from '../../store/reducers/SavedStoresSlice';
import BestStoriesPage from '../BestStoriesPage/BestStoriesPage';
import Header from '../Header/Header';
import JobsPage from '../JobsPage/JobsPage';
import LatestNewsPage from '../LatestNewsPage/LatestNewsPage';
import Loader from '../Loader/Loader';
import Login from '../Login/Login';
import Notification from '../Notificaion/Notification';
import Register from '../Register/Register';
import SavedStoriesPage from '../SavedStorisPage/SavedStorisPage';
import Sidebar from '../Sidebar/Sidebar';
import StoryPage from '../StoryPage/StoryPage';
import TopNewsPage from '../TopNewsPage/TopNewsPage';
import UserInfoPage from '../UserInfoPage/UserInfoPage';
import './App.css';

function App() {
  const dispatch = useAppDispatch();

  function handleLoginUser(name: string, email: string) {
    dispatch(createUser({ name, email }));
    dispatch(loginUser(true));
  }

  function handleExit() {
    dispatch(clearUser());
    dispatch(loginUser(false));
    dispatch(clearSavedStories());
    dispatch(openNotification({ title: 'Success!', text: 'you have been logged out' }));
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Header handleExit={handleExit} />
        <Routes>
          <Route path="/" element={<LatestNewsPage />} />
          <Route path="/top-news" element={<TopNewsPage />} />
          <Route path="/best-news" element={<BestStoriesPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/saved-stories" element={<SavedStoriesPage />} />
          <Route path="/:id" element={<StoryPage />} />
          <Route path="user/:id" element={<UserInfoPage />} />
        </Routes>
        <Login loginUser={handleLoginUser} />
        <Register loginUser={handleLoginUser} />
        <Sidebar />
        <Notification />
      </BrowserRouter>
    </div>
  );
}

export default App;
