import React, { useState } from "react";
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import useAxios from 'axios-hooks';
import ProfileIcon from "../Subjects/ProfileIcon.js";
import DefaultAvatar from "assets/img/default-avatar.png";

import Grid from '@material-ui/core/Grid';

import Loader from 'react-loader-spinner';
// import { makeStyles } from "@material-ui/core/styles";
import { getToken, getUser, getDzongkhag } from '../../Utils/Common.js';


import styles from "assets/jss/material-dashboard-pro-react/views/notificationsStyle.js";


const useStyles = makeStyles(styles);

const avatarImageStyle = {
    width: 100,
    height: 100,
  };

const GetSubjectDetails = (props) => {

    var url = `/api/resource/Subject/${props.subject_id}`;
    const [{data, loading, error}, refetch] = useAxios(url);

    if(!loading){
        if(data.data.initial_image != null){
            return (
                <ProfileIcon caseType={props.caseType} profileUrl={data.data.initial_image} />
            )
        }
        else{
            return (
                <ProfileIcon caseType={props.caseType} profileUrl={data.data.latest_image} />
            )
        }
    }
    else{
        return (
            <Avatar alt="Profile Image" src={DefaultAvatar} style={avatarImageStyle}/>
        )
    }
}

function SuspectCases() {
    const classes = useStyles();
    const [spacing, setSpacing] = React.useState(2);
    const [subjectDataLoaded, setsubjectDataLoaded] = React.useState(false);

    var caseUrl = `/api/resource/Case?fields=[%22*%22]&limit_page_length=50&filters=[[%22dzongkhag%22,%22=%22,%22${getDzongkhag()}%22]]`;
    const [{ data, loading, error }, refetch] = useAxios(caseUrl);
    const [modalShow, setModalShow] = React.useState(false);

    const [suspectId, setSuspectId] = React.useState("");

    const handleChange = event => {
        setSpacing(Number(event.target.value));
    };
    function handleClickView(susId) {
        setSuspectId(susId);
        setModalShow(true);
    }

    // var url = `/api/resource/Subject/${props.profileId}`;

    const filterMethod = (filter, row, column) => {
        const id = filter.pivotId || filter.id
        return row[id] !== undefined ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase()) : true
    }
    // const placeHolder = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAUEBAQEAwUEBAQGBQUGCA0ICAcHCBALDAkNExAUExIQEhIUFx0ZFBYcFhISGiMaHB4fISEhFBkkJyQgJh0gISABBQYGCAcIDwgIDyAVEhUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIP/AABEIAIAAgAMBEQACEQEDEQH/xACPAAABBQEBAQAAAAAAAAAAAAAHAgMEBQYIAQAQAAEDAwMDAgMFBgQHAAAAAAECAwQABREGEiETMUEHURRhcSKBkaGxIyQyQlLBCBVyojNDYoLR4fEBAAIDAQEAAAAAAAAAAAAAAAAEAQIDBQYRAQACAgICAwADAQEAAAAAAAABAgMRBBIhMRMiMhRBQiNR/9oADAMBAAIRAxEAPwC2Q0cUi1PJaoB5LPyNAOBk8eaAV0MUB70qAT0wTj8qjrtPpTXbUNism4XK5NMrSNxb7r/Ac1pWlmc3ZKT6raTaXtY+MfHlSWdoH4nP5Vr/AB5U+ZEZ9VrE8vaYzyfy59s9qn+OPmau0321XtGIT+XNu4tqxuA/vWFsU0aRdYrZwap7Sjlr5CpSYW0R4oCK41VlUVbeDVg2qGfNZtD6GeO1APIa5AoBwNGgFBr5ULaQbpcrbZYSpl0msxGUjO5xQBPyA7k/SpiGUyBWsPVabdiuHYA5BiDI6x4dWPu/hp7HxtFb5A0W466ve44pxR8qJJpuIrUvF5l70yUbvap3A0QUEUbGlnabhNtktEiG8ptxBygg9jWVqRZpSzonTF6b1FZW5g2peSAHUDwfeublr0O0WymucVksjraqQira4PFAQ3GqsG6SzVVzyWaAeSzQCw1x2oDLa41ZD0dYDLd/aS38txWRwVrx3+QHk1pXH3lTJdy/eb3c7/PXOuspb7yjxk8IHsB4FdStYrDn2srkp9zVlDgbO4EJqq3STqEkr27cggj+9RMwtWLPVMKKs7CBRE1W6WKCClGQk9x4o3WEdLN/6Z3ZTV9VAJIRKQoFI8qA4pTPuY8GscxX2ORa+zjvSTXRhbXHapV0iLaoShOtd+KA3yWcDgULnQzigHA1igFBugOXfWK6uz/USTELmWoKEsITjBT5V+Jro8aNRsjlkPAkngDk+KY3uS1Y2toNuCyN/PvWNraO0xtZadOx5a0gpGDx9aSvnmHRpx4ltbdoG0qUjeyta85+X0pK2exyvFq1LfpjaZLYOzpq2kAd+9U/kWWnBVJY9JrUww6h1CHFOjBPsPGKrOe0Sj4K2CDWGkbnoO7IududU22FkIc8oyK6mHNFo8uXyOPMeml9Ntdv3aebLc+XNhU26Co5xyQoEmrZMei2O+xTW3xxShlEca71KiE61QBCDFQuWGaAX0jQH3SoDjr1OJPqbfeVk9c/x11eP6c/Mztvj9V8FXYd6m8ow1aqHHTkDHnvSc2dSlW40/G/ekrIOAO3vSWSzpYoFO1RErebJSBgdqTNS2cZtAcCGxwB4qGMrBtgqG4jip6qxLK6w02zqLTky3Pgb1oIQr2Pg1eltSpeu4cnaW+LsvqLASllan2JXSU2Dgq5IUn5nvxXetPbE8/FemR1IW0lIKP4SMjjFc2fyb/0juN1AQnW+KsqI/R/SpXfBrigFBqgPOn5x2oDjb1Vjts+qt9ZZRsAeB88kpBJ59ya6WD0QyKe0RHD+02/Z7VnknyYwVaaIlKMbiBS0w6FW6sJa6jad4BJyAfNJXg7jkWLXH/4Sk4PGSaWMLn4noyABnnuaGa7Yc3IGDmrRO2UwZlIyk1WVquTNe2oxvWpDcJrDkmWy6gcjKioV2cFu2FxuXXrldELRyaThKK43UrIjjdWVErpVZV908UB50hQl4W80Byd60C1zPUx2TbZQeJaQ3KAQRsdb+yRyOeAORTWK3hlbH5UvTbiQkJ4TtTWVo3JuniEGNbr1eA4/GKIsVHd11W0fWtd9fSvx5Le5JTFvsVYch3uNJcR/wAtl4FePkD3o8W/TOaZa+pF/wBM9ZXGUv4C5g9RBNc3Pj1Lq4b7p1FOXIbVtXtwRzgnvSv6bxHWobOar9T37mXLVYuvFyUhtTe3AzwdxUO9O0x4dFt5Y9tFbddXyJKaj6ssL8Bl0hHX7obPuTWFqRvwvTf9q+92ViX63WeaQFlqGqQPbKcgH8SKYwTquinIrudtstFEey6MtFCERxHegCX0vGK2UedMUB5s4oQ8CMqHGOaEw5U1tEYuWs5qiR8V8Y4VJ8lAWrn7sCik6h0L44VYt4mFSTjA96rF/I+PwhXqJPkxmbZFUUoKiVDPBPjNXpbp7Uvhtf8AMiHpPTGmGfTpy23hh2bdCFOIc6YSUrJyAlRPYVjly7n6tMXFmv6kP2pM3T2rmwlZTsWNySoKIGfcVpP3qr+MmnTbCUSNLidEZD0npbwk/wAxxwBmudrVj29yyPp5pa/6ln3efr6a/FbyEw2GXSnb5JG0kY8YIpv/AJa8FLxli3lpYNmkus3GwXVRmxErKWHlpOSPB58j8qV3O/Bqa6r5JcsqWdWR5e8kR7YWB4yeqO/3Cr1nTC9d1TVo4phzI9oy0UJRVooAmbMeKYZE7PFAJKOfnULE7OeOD4qohyM7brjB1/Lj3rKpRU8UKCshRyckmiZdDey4a1InLRxjNZTDSrWRoDCkddCEkkcgil5kzSCJ8p+LEPQYAKeylnj7h5qatLSFMt39/WtStzq17lE+TT2vq5cz9nVGgpDMrSUJpw7z0xurnX9n/wDLZwTGiEnOz/q7fjU1UvOzrjjTqytAz86LMohSTUpMoq7K24PHirY1M0oK00xJGEZaeKgIq0UATSimmRBTQCSngVAIxwRiqgE/VTS8hnUsbU7IQYqyEL8KS7txz7ggVQ1jkMF4RcVcYCiDxVTkNvZUdRKUdxSdztXmtWnIOnXnIyAt4oOPepxs7yCMN1qM/EmSkF8OPDekDcRjk5HiupP5crf2dQaS1fAlxYkVyGYbkoqTEBQQlSW8ZOcYHccGuVf260R9W4beDr21Ywrx7GqRLOYWKEbUVpDKZ0pJRC7i8B/KlIP35NaYy+WUZY/Wt5KwjLHeqhGcHegCcU96bZE7eKAb2ioBG2oDFepsIy9CSSngsrQ4TgnAzg9qo0pLmT4sp+ysZUkkDxwDxVdHIs09svyYkRuQokgjtnvS1sZyl9KvUOtJEpwwWWQta05CuScVriwssmZYaJ0vDl3VFzuqmwQQUI4zkVOVfFi2NduiSmoDZRGbdUytSkoVgceCPY4pIxabUWtvu8Ca+pjJaktq2qbWMEGjWmUrwvANkZGattlLOxXTJdmPnG1T6koIPdKQB+oNMUglmktQrSWP9I6x3oCMsUAT8UywIKRQCCKhY2RQFVfrcm66fnW5QH7dlSU5GcKxwfxxVU1lxlcsNz32VODqtqwpGfIyKtpvs7bno6W0pnFRSDkBJ/8APes7t8dtkT7VEmXBciMtxIUASoKIJ49qml9L2x7afTMPTzDJ/wA3nOJQDk5cUCPwNL5DmK/QYbBE0/cIyHLTeZis9imST49jSze2atn0nTUmLq6PfGrjJeZwlLzTpB7eU4H5VS0l5XtxvDUfepYKUpHGeAf/AKeKmkbZSctsRUO1MMODDgTuWPZROT+Zp7TnXncnlihWUdY70BGcHegCeRTbE3j/ANUAg8iqoNkULQQRlWB3qI8ifEuRPW+zCx+oUt9hAEWftfGzgodI+2k/UgmrUTM+AuN3dQogKOMDtx+NMfGpOZf6ZvCEy225RLiSocA0rkxm8OcUY9rs+oeiSz046Cd4T9kk/WufuaurERcSdMtWmz27EZrpIKSoKWBjAOBWc/YdYqpbzrFTFzTGjyCqQkng5CSOR9/H54orSZ8Sxm8VSdOJe1TdE3aUk/AwV5RkfZfdx3B8pT+tM1xxUnlzTb03iu5rQuYWKqtBhYqUIy/NAE48802xN0A2fbtVUI0uVHhQ35kt5DEeOhTrrqzhKEJBJUfkACalLjD1I9dNTarub8KwTn7NYQShtDBLbz6e29xY5Gf6AQBTdMXgnbLuVXYGlzfT74SXlZW86tJcJJIOMKyee+eaTv8AWXUw07VYu4Qnorym3AePNOUvshkxzCKw+tpwYJ47EVa1YllS0w2dn1pIgNrbKjsWkDhWD9aTtx4s6VOV1aBr1SnCGhhMdXUQgJHT7YBzk/PjFZxx4q1tyZsnaI07fNd38Tp0p2LbmjlxxBPn+RGfJxyfAqMvWs6hGOtrV2udD+tzFtuh0vqWMyxbWHlsRprCMBlAWQkOpHBHusVrOHvXZL5YrbToDclSQpJCkkZBByCD5FKmIMrNVWgwqhCMugCcac2x0aJwKqhmtUa30ro2KH9SXqPAKhlDRO51z/S2nKj9cYq0UR3cwerfrqNZ2penNMMSYVpcP70+/gLlgdk7RnYimaY2FrgUkArGfetp9MNfYUdPv9aC2BwkoHHtgY/tXLzQ72Cd1W7+n03COopQCodsisq5NNL4tsXL0stqWWVILaxTdcxC3HaOw+lsu7r4nFkfNG6qTyl44gmWb0Ws9tAfnvvTnPmNrZPzFKX5EyZpgiBRtVtj2u1oYjMoabQDtSlOAKUmfts5XXXq4/8AUnSJ0lrB5pslcSXmQyVdwFKJKT9DXcwZN104PJw/FbsLXpb6vWKLpaHp7VM5cSVE/YsyXEEtLa/kClDO0pFVy45UplGxiVHmRUS4chqTHcGUOtLC0KHyI4NJamDUX2Ss1GlkdZo1CPLzUPrt6aWEOIF+F2fRx0bagvf7+Ef7q6EUKzcBdZ/4kdWXvfG0uyNOwv6xh2Sf+8jCPuFbRjZTkBOZNmXGa7Nnynpcp05W8+srWs/NR5NaVoytKKTVpnSj4GiFolvdESkrbeYcUMJI5/pJ/sf1pDPDp8O+xesjICktqRnd5H965do07FLbWF20yzKSHQ2hZT4IorItELXTFmXDfS+wpaAf4kE5GaraUQIIZU8lPUByPGapEbVlLca2pSgY+lW0iv8A65k/xES4p1Jarc0QX2GVLc+QUa6vCrtzebfv4BUV0ptEuT6XFg1XqHTD/Wsd2fh5OVNpOW1/6kH7J/CspxxK9cgxad9f217GNVWnZ4MqD+pbNK2waM1zi1Z9Q2XUUL4yy3Jia156Z+0g+yknlJ+opO1Jg3W8S//Z"
    return (
        <>
            {/* <SuspectCaseDetails /> */}
            {loading ? (
                <div styles="text-align:center">
                    <Loader
                        type="Bars"
                        color="#00BFFF"
                        height={50}
                        width={50}
                    />
                </div>
            ) : (
                    <>  
                        <Grid container className={classes.root} spacing={5}>
                            <Grid item xs={12}>
                                <Grid container spacing={spacing}>
                                    {data.data.map((prop, key) => (
                                        <Grid key={key} item>
                                            <a href={`/admin/subject-case-details/${prop.name}/${prop.suspect}`} >
                                            <GetSubjectDetails caseType={prop.case_type} subject_id={prop.suspect} />
                                            </a>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                
                            </Grid>
                        </Grid>
                        
                    </>
                )}
        </>
    );
}
export default SuspectCases;