import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/core/SvgIcon/SvgIcon';
import { getAllNotes } from '../../store/actions/Notes.action';
import ButtonDelete from './buttons/deleteNotes';
import ButtonEdit from './buttons/editNotes';
import ButtonShare from './buttons/shareNotes';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginBottom: '100px',

        '& div.MuiExpansionPanelDetails-root': {
            flexDirection: 'column',

            '& > div': {
                marginTop: '40px',
                display: 'flex',
                flexDirection: 'row-reverse',
            },
        },
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    title: {
        textAlign: 'center',
    },
    share: {
        flexGrow: 1,
        alignSelf: 'flex-end',
        fontWeight: 400,
        color: 'rgba(0, 0, 0, 0.54)',
    },
}));

function GetNotes(props) {
    const classes = useStyles();

    const token = useSelector(state => state.auth.token);
    const arrNotes = useSelector(state => state.notes.notesArray);

    useEffect(() => {
        try {
            (async function getNotes() {
                await props.getNotes(token, '/api/notes');
            })();
        } catch (e) {
            console.error(e.message);
        }
    }, [props, token]);

    let notes =
        arrNotes.length > 0 ? (
            arrNotes.map((item, index) => {
                return (
                    <ExpansionPanel key={item._id}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={item._id + '-content'}
                            id={item._id + '-header'}
                        >
                            {item.email ? (
                                <Typography className={classes.heading}> Notes № {index + 1} || Public </Typography>
                            ) : (
                                <Typography className={classes.heading}> Notes № {index + 1} || Private </Typography>
                            )}
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>{item.notes}</Typography>
                            <div>
                                <ButtonDelete notesId={item._id} />
                                <ButtonEdit notesInfo={item} />
                                <ButtonShare notesId={item._id} socket={props.socket} />

                                {item.email ? (
                                    <Typography variant="subtitle1" gutterBottom className={classes.share}>
                                        share: {item.email}
                                    </Typography>
                                ) : null}
                            </div>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                );
            })
        ) : (
            <h3 className={classes.title}>Notes is empty.</h3>
        );

    return <div className={classes.root}>{notes}</div>;
}

function mapDispatchToProps(dispatch) {
    return {
        getNotes: (token, url) => dispatch(getAllNotes(token, url)),
    };
}

export default connect(null, mapDispatchToProps)(GetNotes);
