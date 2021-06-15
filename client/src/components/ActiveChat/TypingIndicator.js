import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Avatar } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    root: {
        display: "flex"
    },
    avatar: {
        height: 30,
        width: 30,
        marginRight: 11,
        marginTop: 6
    },
    usernameDate: {
        fontSize: 11,
        color: "#BECCE2",
        fontWeight: "bold",
        marginBottom: 5
    },
    bubble: {
        backgroundImage: "linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)",
        borderRadius: "0 10px 10px 10px",
        padding: '10px 15px',
        display: 'flex',
    },
    text: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#FFFFFF",
        letterSpacing: -0.2,
        padding: 8
    },
    dot: {
        height: '10px',
        width: '10px',
        borderRadius: '100%',
        display: 'inline-block',
        backgroundColor: 'rgb(250, 250, 250, 0.6)',
        margin: '2px',
        animation: '$typing-dot 1.2s ease-in-out 1.2s infinite',
        "&:nth-of-type(2)": {
            animationDelay: '0.15s',
        },
        "&:nth-of-type(3)": {
            animationDelay: '0.25s',
        },
    },
    '@keyframes typing-dot': {
        '15%': {
            transform: 'translateY(-35%)',
            opacity: 0.1
        },
        '30%': {
            transform: 'translateY(0%)',
            opacity: 1,
        },
    },
}));

const TypingIndicator = (props) => {
    const classes = useStyles();
    const { otherUser } = props;
    return (
        <Box className={classes.root}>
            <Avatar alt={otherUser.username} src={otherUser.photoUrl} className={classes.avatar}></Avatar>
            <Box>
                <Typography className={classes.usernameDate}>
                    {otherUser.username}
                </Typography>
                <Box className={classes.bubble}>
                    <Typography className={classes.dot}></Typography>
                    <Typography className={classes.dot}></Typography>
                    <Typography className={classes.dot}></Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default TypingIndicator;
