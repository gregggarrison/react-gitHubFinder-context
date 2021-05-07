import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Users from './components/users/Users';
import User from './components/users/User';
import Navbar from './components/layout/Navbar'
import Search from './components/users/Search'
import Alert from './components/layout/Alert'
import About from './components/pages/About'
import axios from 'axios';

const App1 = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);


    const searchUsers = async (text) => {
        setLoading(true);
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID
            }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        setUsers(res.data.items);
        setLoading(false);
    }

    const getUser = async (username) => {
        setLoading(true);
        const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID
            }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        setUser(res.data);
        setLoading(false);
    }

    const getUserRepos = async (username) => {
        setLoading(true);
        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created.asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID
            }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        setRepos(res.data);
        setLoading(false);
    }

    const clearUsers = () => {
        setUsers([]);
        setLoading(false);
    }

    const clearUser = () => {
        setUser({});
        setRepos([]);
        setLoading(false);
    }

    const clearUsersAndUser = () => {
        clearUsers();
        clearUser();
        setRepos([]);
        setLoading(false);
        
    }

    const activateAlert = (msg, type) => {
        setAlert({ msg: msg, type: type })
        setTimeout(() => setAlert(null), 5000);
    }


    return (
        <Router>
            <div className="App">
                <Navbar />
                <div className='container'>
                    <Alert alert={alert} />
                    <Switch>
                        <Route exact path='/' render={props => (
                            <>
                                <Search
                                    searchUsers={searchUsers}
                                    clearUsers={clearUsers}
                                    showClear={users.length > 0 ? true : false}
                                    setAlert={activateAlert}
                                />
                                <Users
                                    loading={loading}
                                    users={users}
                                />
                            </>
                        )}
                        />

                        <Route exact path='/about' component={About} />
                        <Route
                            exact path='/user/:login'
                            render={props => (
                                <User
                                    {...props}
                                    getUser={getUser}
                                    clearUser={clearUser}
                                    getUserRepos={getUserRepos}
                                    user={user}
                                    repos={repos}
                                    loading={loading}
                                />
                            )}
                        />
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App1
