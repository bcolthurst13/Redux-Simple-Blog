import React from 'react';
import {reduxForm} from 'redux-form';
import {Link} from 'react-router';

import {createPost} from '../actions/index';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import ActionDone from 'material-ui/svg-icons/action/done';

class NewPosts extends React.Component {

    // Helper function for our submission + redirect
    // Keep in mind that the props being passed to cratePost are those from the form, not those from this.props
    // Also, createPost is a promise, so we'll chain the redirect when it resolves
    onSubmit(props) {
        this.props.createPost(props)
          .then(()=> {
             // Blog post was created, navigate the user to the index page
              this.context.router.push('/');
              this.props.toast('Your post was created');
          });
    }

    render() {

        const {handleSubmit} = this.props;
        const {title,categories,content} = this.props.fields;

        return(
            // handleSubmit can call an action creator with a valid form submission, which we pass in by mapping
            // createPost to this.props.createPost further below.
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <AppBar
                    title="Create A New Post"
                    showMenuIconButton={false}
                    iconElementRight={
                      <FlatButton
                        label="Submit"
                        icon={<ActionDone />}
                        type="submit"
                        style={{WebkitAppearance: "none"}} />
                    }
                />

                <div className="container">

                    <TextField
                        floatingLabelText="Title"
                        value=''
                        errorText={title.touched ? title.error : ''}
                        {...title} />
                    <br />
                    <TextField
                        floatingLabelText="Categories"
                        value=''
                        errorText={categories.touched ? categories.error : ''}
                        {...categories} />

                    <TextField
                        floatingLabelText="Content"
                        errorText={content.touched ? content.error : ''}
                        multiLine={true}
                        rows={12}
                        fullWidth={true}
                        {...content} />

                    <Link to="/" className="btn btn-danger">Cancel</Link>
                </div>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    if(!values.title) {
        errors.title = 'Your post needs a title';
    }

    if(!values.categories) {
        errors.categories = 'A few tags are always nice';
    }

    if(!values.content) {
        errors.content = 'You definitely need some content';
    }

    return errors;
}

// contextTypes for the router, seems that this should be .func via GitHub, double check later why this is an object.
NewPosts.contextTypes = {
    router: React.PropTypes.object
};

// As a note
// connect: 1st arg is mapStateToProps, 2nd is MapDispatchToProps
// reduxForm: 1st arg is form config, 2nd is mapStateToProps, 3rd is MapDispatchToProps

export default reduxForm({
    form: 'NewPosts',
    fields: ['title', 'categories', 'content'],
    validate
}, null, {createPost: createPost})(NewPosts);