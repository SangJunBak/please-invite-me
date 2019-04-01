import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';

const styles = theme => ({
    typography: {
        margin: theme.spacing.unit * 2,
    },
});

function SimplePopover(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [plusOneInvitedCount, setPlusOneInvitedCount] = useState(0);
    const [guestGoingCount, setGuestGoingCount] = useState(0);
    const [plusOneGoingCount, setPlusOneGoingCount] = useState(0);


    function getCount()  {
        let plusOneInvitedCount = 0,
            guestGoingCount = 0,
            plusOneGoingCount = 0;

        props.data.forEach((user)=>{
            if(user.active) {
                if(user.rsvp_status==="True"){
                    guestGoingCount++;
                }
                if(user.guest_name.trim() !== ""){
                    plusOneInvitedCount++;
                }
                if(user.guest_status === "True"){
                    plusOneGoingCount++;
                }
            }
        });

        return {
            plusOneInvitedCount: plusOneInvitedCount,
            guestGoingCount: guestGoingCount,
            plusOneGoingCount: plusOneGoingCount
        }
    }

    function handleClick(event) {
        const count = getCount();
        setAnchorEl(event.currentTarget);
        setPlusOneInvitedCount(count.plusOneInvitedCount);
        setGuestGoingCount(count.guestGoingCount);
        setPlusOneGoingCount(count.plusOneGoingCount);
    }

    function handleClose()  {
        setAnchorEl(null);
    }

    const { classes } = props;
    const open = Boolean(anchorEl);

    return (
        <div>
            <Button
                aria-owns={open ? 'simple-popper' : undefined}
                aria-haspopup="true"
                variant="contained"
                onClick={handleClick}
            >
                Get Count
            </Button>
            <Popover
                id="simple-popper"
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Typography className={classes.typography}>
                    # Guests Invited: {props.guestInvitedCount}
                    <br/>
                    # Guests Going: {guestGoingCount}
                    <br/>
                    # Plus Ones Invited: {plusOneInvitedCount}
                    <br/>
                    # Plus Ones Going: {plusOneGoingCount}
                </Typography>
            </Popover>
        </div>
    );
}

SimplePopover.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    guestInvitedCount: PropTypes.number.isRequired
};

export default withStyles(styles)(SimplePopover);