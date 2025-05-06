import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Auth from './utils/auth';
import UserContext from './utils/UserContext';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (Auth.loggedIn()) {
      const profile = Auth.getProfile();
      setUser(profile);
    }
  }, []);

  return (
    <ApolloProvider client={client}>
      <UserContext.Provider value={{ user, setUser }}>
        <div className="page-container">
          <Navbar />
          <Outlet />
        </div>
      </UserContext.Provider>
    </ApolloProvider>
  );
}

export default App;

