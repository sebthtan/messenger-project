import { makeStyles } from '@material-ui/core'
import bgImage from './images/bg-img.png'

const useStyles = makeStyles({
    root: {
        height: '80vh',
        justifyContent: 'center',
    },
    submit: {
        marginTop: '40px',
        width: '180px',
        height: '60px',
        alignSelf: 'center'
    },
    input: {
        margin: '10px 4px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    background: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    gradient: {
        background: 'linear-gradient(180deg, #3A8DFF, #86B9FF)',
        opacity: 0.85,
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    motto: {
        color: 'white',
        fontSize: '24px',
        paddingX: '10px',
    },
    full: {
        width: '100%'
    },
    formMessage: {
        fontWeight: 900,
        '@media (max-width:600px)': {
            textAlign: 'center',
        },
    },
    redirect: {
        backgroundColor: 'white',
        boxShadow: '0 0 10px 4px rgba(0, 0, 0, 0.1)',
        color: '#3A8DFF',
        margin: '10px',
        width: '180px',
        height: '60px',
        alignSelf: 'center'
    },
    label: {
        color: 'rgba(0, 0, 0, 0.3)',
        margin: '10px',
    },
    page: {
        padding: '40px 40px 40px 10vw',
    },
    main: {
        width: '100vw',
    },
    loginSignup: {
        display: 'flex',
        flexDirection: 'column',
        width: '80%',
        '@media (max-width:750px)': {
            width: '100%',
        },
    },
    redirectHeader: {
        alignItems: 'center',
        '@media (max-width:750px)': {
            flexDirection: 'column',
            justifyContent: 'center',
        },
        '@media (min-width:750px)': {
            justifyContent: 'flex-end',
        }
    },
    logo: {
        width: 'auto',
        paddingBottom: '70px',
    }
})

export default useStyles
