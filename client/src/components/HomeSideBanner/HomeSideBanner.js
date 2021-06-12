import { Grid, Typography } from '@material-ui/core'
import useStyles from '../../Styles'
import logo from '../../images/bubble.svg'

const HomeSideBanner = () => {
    const classes = useStyles()

    return (
        <Grid item xs={false} sm={4} md={5} className={classes.background}>
            <Grid container direction='column' justify='center' className={classes.gradient}>
                <img src={logo} alt='logo' className={classes.logo} />
                <Typography variant="h4" align='center' className={classes.motto}>Converse with anyone with any language</Typography>
            </Grid>
        </Grid>
    )
}

export default HomeSideBanner
