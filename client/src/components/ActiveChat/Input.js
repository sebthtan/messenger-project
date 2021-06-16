import React, { Component } from "react";
import { FormControl, FilledInput } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage, changeTypingStatus } from "../../store/utils/thunkCreators";

const styles = {
  root: {
    justifySelf: "flex-end",
    marginTop: 15,
  },
  input: {
    height: 70,
    backgroundColor: "#F4F6FA",
    borderRadius: 8,
    marginBottom: 20,
  },
};

// TO-DO: refactor to use functional components and react hooks
class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      typing: false,
      timeout: "",
    };
  }

  handleChange = (event) => {
    const timer = setTimeout(this.typingTimeout, 3000)
    this.setState({
      text: event.target.value,
      typing: true,
      timeout: clearTimeout(this.state.timeout),
    });
    this.props.changeTypingStatus(this.props.user, this.props.otherUser.id, this.state.typing)
    this.setState({
      timeout: timer,
    })
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: event.target.text.value,
      recipientId: this.props.otherUser.id,
      conversationId: this.props.conversationId,
      sender: this.props.conversationId ? null : this.props.user,
    };
    await this.props.postMessage(reqBody);
    this.setState({
      text: "",
      timeout: clearTimeout(this.state.timeout),
    });
    this.typingTimeout()
  };

  typingTimeout = () => {
    this.setState({ typing: false })
    this.props.changeTypingStatus(this.props.user, this.props.otherUser.id, this.state.typing)
  }

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.root} onSubmit={this.handleSubmit}>
        <FormControl fullWidth hiddenLabel>
          <FilledInput
            classes={{ root: classes.input }}
            disableUnderline
            placeholder="Type something..."
            value={this.state.text}
            name="text"
            onChange={this.handleChange}
          />
        </FormControl>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversations: state.conversations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
    changeTypingStatus: (sender, recipientId, isTyping) =>
      dispatch(changeTypingStatus(sender, recipientId, isTyping))

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Input));
