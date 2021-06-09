import { makeStyles } from '@material-ui/core'
import bgImage from './images/bg-img.png'

const useStyles = makeStyles({
    root: {
        height: '80vh',
        justifyContent: 'center',
    },
    form: {
        alignSelf: 'center',
        height: '100%',
        alignContent: 'center',
        justifySelf: 'center',
        justifyContent: 'center',
    },
    submit: {
        margin: '20px 4px',
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
    xcentered: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    formMessage: {
        fontWeight: 900,
    },
    redirect: {
        backgroundColor: 'white',
        boxShadow: '0 0 10px 4px rgba(0, 0, 0, 0.1)',
        color: '#3A8DFF',
        margin: '4px',
        width: '180px',
        height: '60px',
        alignSelf: 'center'
    },
    label: {
        color: 'rgba(0, 0, 0, 0.3)',
    }
})

export default useStyles
