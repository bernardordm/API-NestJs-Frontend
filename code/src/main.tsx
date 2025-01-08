import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css' // Certifique-se de que o Tailwind CSS está sendo importado aqui
import App from './App.tsx'
import { Provider } from 'react-redux';
import store from './store/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)