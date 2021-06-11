import { Grid, Typography } from '@material-ui/core'
import useStyles from '../../Styles'
import logo from '../../images/bubble.svg'

const HomeSideBanner = () => {
    const classes = useStyles()

    return (
        <Grid item xs={false} sm={4} md={5} className={classes.background}>
            <Grid container direction='column' justify='center' className={classes.gradient}>
                <Grid container justify='center'>
                    <img src={logo} alt='logo' className={classes.logo} />
                </Grid>
                <Grid container justify='center' className={classes.layer}>
                    <Typography variant="h4" align='center' className={classes.motto}>Converse with anyone with any language</Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default HomeSideBanner
