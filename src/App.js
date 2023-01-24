import NavBar from './components/NavBar';
import styles from './App.module.css';
import Container from 'react-bootstrap/Container';
import { Route, Switch } from 'react-router-dom';
import './api/axiosDefaults';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import PostCreateForm from './pages/posts/PostCreateForm';
import PostPage from './pages/posts/PostPage';
import Postspage from './pages/posts/Postspage';
import { useCurrentUser } from './contexts/CurrentUserContext';


function App() {
  // Determines who the user is
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
        <div className={styles.App}>
          <NavBar />
          <Container className={styles.Main}>
            <Switch>
              <Route exact path="/"
                render={() => (<Postspage message="No plants found by that name or type, please try another or follow a user."
                filter={`owner__followed__owner__profile=${profile_id}&`} />
                )} />
              <Route exact path="/explore"
                render={() => (<Postspage message="No plants found by that name or type, please try another."
                />
                )} />
              <Route exact path="/bookmarks"
                render={() => (<Postspage message="No plants found by that name or type, please try another or save a post."
                filter={`bookmarks__owner__profile=${profile_id}&ordering=-bookmarks__created_at&`}
                />
                )} />
              <Route exact path="/signin" render={() => <SignInForm />} />
              <Route exact path="/signup" render={() => <SignUpForm />} />
              <Route exact path="/posts/create" render={() => <PostCreateForm />} />
              <Route exact path="/posts/:id" render={() => <PostPage />} />
              <Route render={() => <p>Page not found!</p>} />
            </Switch>
          </Container>
        </div>
  );
}

export default App;