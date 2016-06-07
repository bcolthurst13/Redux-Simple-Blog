import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {fetchPosts} from '../actions/index';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import Divider from 'material-ui/Divider';
import {List,ListItem} from 'material-ui/List';

import ContentAdd from 'material-ui/svg-icons/content/add';

class PostsIndex extends React.Component {

    componentWillMount() {
        this.props.fetchPosts();
    }

    renderPosts() {
        return this.props.posts.map((post) => {
            return (
                <li className="list-group-item" key={post.id}>
                    <Link to={"posts/" + post.id}>
                      <span className="pull-xs-right">{post.categories}</span>
                      <strong>{post.title}</strong>
                    </Link>
                </li>
            );
        })
    }

    renderListItems() {
        return this.props.posts.map((post) => {
            return(
                <span key={post.id}>
                  <ListItem
                    primaryText={post.title}
                    secondaryText={"Tagged: " + post.categories}
                    containerElement={<Link to={"/posts/" + post.id} />}
                    style={{WebkitAppearance: "none"}} />
                  <Divider />
                </span>
            );
        })
    }

    render() {
        return(
            <div>
                <AppBar
                    title="Posts"
                    showMenuIconButton={false}
                    style={{width: "100%"}}
                    iconElementRight={
                      <FlatButton
                        containerElement={<Link to="/posts/new" />}
                        label="New Post"
                        icon={<ContentAdd />}
                        style={{WebkitAppearance: "none"}} />
                    }
                />

                <List>
                    {this.renderListItems()}
                </List>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {posts: state.posts.all};
}

export default connect(mapStateToProps, {fetchPosts: fetchPosts})(PostsIndex);