import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/app';
import IndexPosts from './components/index_posts';
import NewPosts from './components/new_posts';
import ShowPost from './components/show_post';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={IndexPosts} />
        <Route path="posts/new" component={NewPosts} />
        <Route path="posts/:id" component={ShowPost} />
    </Route>
);