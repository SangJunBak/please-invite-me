import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import Fire from '../fire.js';
import 'firebase/database';
import SimplePopover from './SimplePopover';


function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}


function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
    { id: 'user_name', numeric: false, disablePadding: true, label: 'Full Name' },
    { id: 'rsvp_status', numeric: false, disablePadding: false, label: 'RSVP Status' },
    { id: 'user_email', numeric: false, disablePadding: false, label: 'Email' },
    { id: 'user_mobile', numeric: false, disablePadding: false, label: 'Mobile' },
    { id: 'user_dietary', numeric: false, disablePadding: false, label: 'Dietary Restrictions' },
    { id: 'guest_name', numeric: false, disablePadding: false, label: 'Plus One'},
    { id: 'guest_status', numeric: false, disablePadding: false, label: 'Plus One Status'},
    { id: 'guest_mobile', numeric: false, disablePadding: false, label: 'Plus One Mobile'},
    { id: 'url', numeric: false, disablePadding: false, label: 'URL'}
];

class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                    {rows.map(row => {
                        return (
                            <TableCell
                                key={row.id}
                                numeric={row.numeric}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={this.createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}

                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
};

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
});

let EnhancedTableToolbar = props => {
    const { numSelected, classes } = props;

    return (
        <Toolbar
            className={classNames(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <div className={classes.title}>
                {numSelected > 0 ? (
                    <Typography color="inherit" variant="subtitle1">
                        {numSelected} selected
                    </Typography>
                ) : (
                    <SimplePopover
                        data = {props.data}
                        guestInvitedCount = {props.guestInvitedCount}
                    />
                )}
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                {numSelected > 0 && (
                    <Tooltip title="Delete">
                        <IconButton aria-label="Delete" onClick={props.onDeleteGuest}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </div>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired,
    guestInvitedCount: PropTypes.number.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

class EnhancedTable extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            order: 'asc',
            orderBy: 'user_name',
            selected: [],
            guestInvitedCount: 0,
            data: [],
            page: 0,
            rowsPerPage: 10,
            isInitialValueDone : false
        };

        this.counter = 0;
        this.database = Fire.database();
    }

    componentDidMount(){

        let boolToString = (bool) => bool ? "True" : "False";

        let createListofData = (user, newData) => {
            if(user.active){
                newData.push(this.createData(
                    user.user_first_name + ' ' + user.user_last_name,
                    boolToString(user.rsvp_status),
                    user.user_email,
                    user.user_mobile,
                    user.user_dietary,
                    user.guest_first_name + ' ' +user.guest_last_name,
                    boolToString(user.guest_status),
                    user.guest_mobile,
                    user.url,
                    user.active
                ));
            }
        };

        this.database.ref('/users/').once('value', (snap)=> {
            let newData = this.state.data.slice();

            snap.forEach(function(child) {
                const user =  child.val();
                createListofData(user, newData);
            });
            this.setState({
                data: newData,
                guestInvitedCount: newData.length,
                isInitialValueDone: true
            });
        });

        this.database.ref('/users/').on('child_added', snap => {
            if(this.state.isInitialValueDone){
                let newData = this.state.data.slice();
                const user =  snap.val();
                createListofData(user, newData);
                this.setState({
                    data: newData,
                    guestInvitedCount: newData.length
                });
            }

        });

    }

    createData = (user_name, rsvp_status, user_email, user_mobile, user_dietary, guest_name, guest_status, guest_mobile, url, active) => {
        this.counter+=1;
        return { id: this.counter, user_name, rsvp_status, user_email, user_mobile, user_dietary, guest_name, guest_status, guest_mobile, url, active};
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy });
    };

    handleSelectAllClick = event => {
        if (event.target.checked) {
            this.setState(state => ({ selected: state.data.map(n => n.id) }));
            return;
        }
        this.setState({ selected: [] });
    };

    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    handleDeleteGuest = () => {

        let newData = this.state.data.slice();
        let guestInvitedCount = this.state.guestInvitedCount;
        this.state.selected.forEach((id)=>{

            const user = this.state.data[id-1];

            const hash = user.url.split('Invitation/').pop();
            this.database.ref('/users/'+hash).update({
                active: false
            });

            newData[id-1].active = false;
            guestInvitedCount--;
        });


        this.setState({
            data: newData,
            guestInvitedCount: guestInvitedCount,
            selected: []
        });

    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const { classes } = this.props;
        const { data, order, orderBy, selected, rowsPerPage, page, guestInvitedCount} = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, guestInvitedCount - page * rowsPerPage);

        return (
            <Paper className={classes.root}>
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    onDeleteGuest = {this.handleDeleteGuest}
                    data = {this.state.data}
                    guestInvitedCount = {guestInvitedCount}
                />
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={guestInvitedCount}
                        />
                        <TableBody>
                            {stableSort(data, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(n => {
                                    const isSelected = this.isSelected(n.id);
                                    if(n.active){
                                        return (
                                            <TableRow
                                                hover
                                                onClick={event => this.handleClick(event, n.id)}
                                                role="checkbox"
                                                aria-checked={isSelected}
                                                tabIndex={-1}
                                                key={n.id}
                                                selected={isSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox checked={isSelected} />
                                                </TableCell>
                                                <TableCell component="th" scope="row" padding="none">
                                                    {n.user_name}
                                                </TableCell>
                                                <TableCell>{n.rsvp_status}</TableCell>
                                                <TableCell>{n.user_email}</TableCell>
                                                <TableCell>{n.user_mobile}</TableCell>
                                                <TableCell>{n.user_dietary}</TableCell>
                                                <TableCell>{n.guest_name}</TableCell>
                                                <TableCell>{n.guest_status}</TableCell>
                                                <TableCell>{n.guest_mobile}</TableCell>
                                                <TableCell><a href={n.url}>{n.url}</a></TableCell>
                                            </TableRow>
                                        );
                                    }
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    component="div"
                    count={guestInvitedCount}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);