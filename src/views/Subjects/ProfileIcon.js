import React from 'react';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import DefaultAvatar from "assets/img/default-avatar.png";
import axios from "axios";

const StyledBadge = withStyles(theme => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(0.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(5.7)',
      opacity: 0,
    },
  },
}))(Badge);


const StyledBadge1 = withStyles(theme => ({
  badge: {
    backgroundColor: '#f9c10b',
    color: '#f9c10b',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.4s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(0.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(5.7)',
      opacity: 0,
    },
  },
}))(Badge);

const StyledBadge2 = withStyles(theme => ({
  badge: {
    backgroundColor: '#d41f11',
    color: '#d41f11',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.6s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(0.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(5.7)',
      opacity: 0,
    },
  },
}))(Badge);

const StyledBadge3 = withStyles(theme => ({
  badge: {
    backgroundColor: '#12aade',
    color: '#12aade',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.8s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(0.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(5.7)',
      opacity: 0,
    },
  },
}))(Badge);

const StyledBadge4 = withStyles(theme => ({
  badge: {
    backgroundColor: '#2e04bf',
    color: '#2e04bf',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 2.1s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(0.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(5.7)',
      opacity: 0,
    },
  },
}))(Badge);

const StyledBadge5 = withStyles(theme => ({
  badge: {
    backgroundColor: '#6691ea',
    color: '#6691ea',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 4s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(0.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(10)',
      opacity: 0,
    },
  },
}))(Badge);

const StyledBadge6 = withStyles(theme => ({
  badge: {
    backgroundColor: '#4f4f50',
    color: '#4f4f50',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 3s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(0.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(10)',
      opacity: 0,
    },
  },
}))(Badge);

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(3),
    },
    width:200,
    height:200,
  },
}));

const avatarImageStyle = {
  width: 100,
  height: 100,
};

export default function ProfileIcon(props) {
  const classes = useStyles();

  const [caseType, setCaseType] = React.useState(props.caseType);
  const [profilePic, setprofilePic] = React.useState();
  
  console.log(props.profileUrl);

  if(props.profileUrl == null){

  }
  else{
    const url = `/api/method/covid.tracker_api.convert_base64?image=${props.profileUrl}`;
    axios.get(url).then(res=>{
      setprofilePic(`data:image/jpeg;base64,${res.data.message.data_base64}`);
    });
  }
  
  if(caseType === "No GPS Update"){
    return (
      <StyledBadge
      overlap="circle"
      anchororigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      variant="dot"
    >
      {profilePic ?(
        <Avatar alt="Profile Picture" src={profilePic} style={avatarImageStyle}/>
      ):(
        <Avatar alt="Profile Picture" src={DefaultAvatar} style={avatarImageStyle}/>
      )
      }
    </StyledBadge>
    )
  }
  else if(caseType === "No GPS Update"){
    
    return (<StyledBadge1
        overlap="circle"
        anchororigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        variant="dot"
      >
        {profilePic ?(
        <Avatar alt="Profile Picture" src={profilePic} style={avatarImageStyle}/>
      ):(
        <Avatar alt="Profile Picture" src={DefaultAvatar} style={avatarImageStyle}/>
      )
      }
      </StyledBadge1>
    )
  }
  else if(caseType === "No Selfie Update"){
    return (<StyledBadge2
      overlap="circle"
      anchororigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      variant="dot"
    >
     {profilePic ?(
        <Avatar alt="Profile Picture" src={profilePic} style={avatarImageStyle}/>
      ):(
        <Avatar alt="Profile Picture" src={DefaultAvatar} style={avatarImageStyle}/>
      )
      }
    </StyledBadge2>
  )
  }
  else if(caseType === "Perimeter Breach"){
    return (
      <StyledBadge3
        overlap="circle"
        anchororigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        variant="dot"
      >
        {profilePic ?(
        <Avatar alt="Profile Picture" src={profilePic} style={avatarImageStyle}/>
      ):(
        <Avatar alt="Profile Picture" src={DefaultAvatar} style={avatarImageStyle}/>
      )
      }
      </StyledBadge3>
    )
  }
  else if(caseType === "Home Location Not Set"){
    return (
      <StyledBadge4
        overlap="circle"
        anchororigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        variant="dot"
      >
        {profilePic ?(
        <Avatar alt="Profile Picture" src={profilePic} style={avatarImageStyle}/>
      ):(
        <Avatar alt="Profile Picture" src={DefaultAvatar} style={avatarImageStyle}/>
      )
      }
      </StyledBadge4>
    )
  }
  else if(caseType === "No Symptoms Update"){
    return (
      <StyledBadge5
        overlap="circle"
        anchororigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        variant="dot"
      >
        {profilePic ?(
        <Avatar alt="Profile Picture" src={profilePic} style={avatarImageStyle}/>
      ):(
        <Avatar alt="Profile Picture" src={DefaultAvatar} style={avatarImageStyle}/>
      )
      }
      </StyledBadge5>
    )
  }
  return (
    <div>
      <StyledBadge5
        overlap="circle"
        anchororigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        variant="dot"
      >
        {profilePic ?(
        <Avatar alt="Profile Picture" src={profilePic} style={avatarImageStyle}/>
      ):(
        <Avatar alt="Profile Picture" src={DefaultAvatar} style={avatarImageStyle}/>
      )
      }
      </StyledBadge5>
    </div>
  );
}
