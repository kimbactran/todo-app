import './App.css';
import AppContent from './components/AppContent';
import AppHeader from './components/AppHeader';
import PageTitle from './components/PageTitle';
import style from './styles/modules/app.module.scss'
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
    <div className="container">
      <PageTitle>TODO LIST</PageTitle>
      <div className={style.app__wrapper}>
        <AppHeader></AppHeader>
        <AppContent></AppContent>
      </div>
    </div>
    <Toaster 
    position='top-right'
    toastOptions={{
      style: {
        fontSize: '1.4rem'
      }
    }
      
    }></Toaster>
    </>
  );
}

export default App;
