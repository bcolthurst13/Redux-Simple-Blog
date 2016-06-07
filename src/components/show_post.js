import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import CircularProgress from 'material-ui/CircularProgress';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';

import ActionDelete from 'material-ui/svg-icons/action/delete';
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';

import {fetchPost, deletePost} from '../actions/index';

class ShowPost extends React.Component {
    componentDidMount() {
      this.props.fetchPost(this.props.params.id);
    }

    onClickDelete() {
        this.props.deletePost(this.props.params.id)
        .then(() => {
            this.context.router.push('/');
            this.props.toast('Your post was deleted')
        });
    }

    render() {
        const {post} = this.props;

        if(!post){
            return <CircularProgress size={2} />
        }
        return (

            <div>
                <AppBar
                    title={post.title}
                    iconElementLeft={
                      <IconButton
                        containerElement={<Link to={"/"} />}
                        style={{WebkitAppearance: "none"}}
                      >
                          <NavigationChevronLeft />
                      </IconButton>
                    }
                    iconElementRight={
                      <FlatButton
                        label="Delete"
                        icon={<ActionDelete />}
                        onClick={this.onClickDelete.bind(this)}
                        style={{WebkitAppearance: "none"}} />
                    }
                />

                <div className="container">
                    <h1>{post.title}</h1>
                    <h6>Tags: {post.categories}</h6>
                    <br />
                    <p>{post.content}</p>
                </div>
            </div>
        );
    }
}

// Router Context
ShowPost.contextTypes = {
    router: React.PropTypes.object
};

function mapStateToProps(state) {
    return {post: state.posts.post};
}

export default connect(mapStateToProps, {fetchPost: fetchPost, deletePost: deletePost})(ShowPost);