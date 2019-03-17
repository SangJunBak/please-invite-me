import React from 'react';
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

class SimplePopover extends React.Component {
    state = {
        anchorEl: null,
        guestInvitedCount : 0,
        plusOneInvitedCount : 0,
        guestGoingCount : 0,
        plusOneGoingCount : 0
};

    handleClick = event => {
        const count = this.getCount();
        this.setState({
            anchorEl: event.currentTarget,
            plusOneInvitedCount: count.plusOneInvitedCount,
            guestGoingCount: count.guestGoingCount,
            plusOneGoingCount: count.plusOneGoingCount
        })
    };

    handleClose = () => {
        this.setState({
            anchorEl: null,
        });
    };

    getCount = () => {
        let plusOneInvitedCount = 0,
            guestGoingCount = 0,
            plusOneGoingCount = 0;

        this.props.data.forEach((user)=>{
            if(user.active) {
                if(user.rsvp_status==="True"){
                    guestGoingCount++;
                }
                if(user.guest_name.trim()!==""){
                    plusOneInvitedCount++;
                }
                if(user.guest_status==="True"){
                    plusOneGoingCount++;
                }
            }
        });

        return {
            plusOneInvitedCount: plusOneInvitedCount,
            guestGoingCount: guestGoingCount,
            plusOneGoingCount: plusOneGoingCount
        }
    };

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div>
                <Button
                    aria-owns={open ? 'simple-popper' : undefined}
                    aria-haspopup="true"
                    variant="contained"
                    onClick={this.handleClick}
                >
                    Get Count
                </Button>
                <Popover
                    id="simple-popper"
                    open={open}
                    anchorEl={anchorEl}
                    onClose={this.handleClose}
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
                        # Guests Invited: {this.props.guestInvitedCount}
                        <br/>
                        # Guests Going: {this.state.guestGoingCount}
                        <br/>
                        # Plus Ones Invited: {this.state.plusOneInvitedCount}
                        <br/>
                        # Plus Ones Going: {this.state.plusOneGoingCount}
                    </Typography>
                </Popover>
            </div>
        );
    }
}

SimplePopover.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    guestInvitedCount: PropTypes.number.isRequired
};

export default withStyles(styles)(SimplePopover);