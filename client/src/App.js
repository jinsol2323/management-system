import './App.css';
import React, {Component} from 'react';
import Customer from './components/Customer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress';
import CustomerAdd from './components/CustomerAdd';


import {  alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';


/*
react LifeCycle

1) constructor()

2) componentWillMount()

3) render()

4) componentDidMount()

5) props or state가 변경되는 경우 
   shouldComponentUpdate()가 사용되어 다시 render()함수를 불러와서 뷰를 갱신

*/



const styles = theme => ({
  root:{
    width : 'auto',
    marginTop : theme.spacing(3),
    overflowX: 'auto',
  },

  paper:{
    marginLeft:18,
    marginRight:18
  },

  table:{
    minWidth:1080
  },
  
  progress:{
    margin:theme.spacing(2),
  },

  menu:{
    marginTop:15,
    marginBottom:20,
    display:'flex',
    justifyContent:'center',
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px) !important`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}); 


class App extends Component{

    constructor(props){
      super(props);
      this.state={
        customers:"",
        completed: 0,
        searchKeyword:''
      }
    }

    stateRefresh = () =>{
      this.setState({
        customees:'',
        completed:0,
        searchKeyword:''
      });
      this.callApi() 
      .then(res => this.setState({customers:res}))
      .catch(err => console.log(err));
    }

    //API를 불러와서 웹사이트 화면에 특정한 뷰를 출력하고자 할때 componentDidMount()함수에서 API를 비동기적으로 호출
    //모든 컴포넌트가 마운트가 완료되었을 때, 실행
    componentDidMount(){
      this.timer = setInterval(this.progress, 20);
      this.callApi() 
        .then(res => this.setState({customers:res}))
        .catch(err => console.log(err));
    }

    callApi = async () =>{
      const response = await fetch('/api/customers');
      const body = await response.json();
      console.log(body);
      return body;
    }

    progress = () =>{
      const {completed} = this.state;
      this.setState({completed:completed >= 100 ? 0 : completed+1});
    }

    handleValueChange = (e) =>{
      let nextState={};
      nextState[e.target.name] = e.target.value;
      this.setState(nextState); 
    }

    render() {
      const filteredComponents = (data) =>{
        data = data.filter((c)=>{
          return c.name.indexOf(this.state.searchKeyword) > -1;
        })
        return data.map((c)=>{
          return <Customer stateRefresh={this.stateRefresh}
                    key={c.id}
                    id={c.id}
                    image={c.image}
                    name={c.name}
                    birthday={c.birthday}
                    gender={c.gender}
                    job={c.job}
                  />
        })
      }
      const {classes} = this.props?this.props:null;
      return(
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
              >
                <MenuIcon />
              </IconButton>
              <Typography className={classes.title} variant="h6" noWrap>
                고객관리 Management
              </Typography>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="검색하기"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  name="searchKeyword"
                  value={this.state.seachKeyword}
                  onChange={this.handleValueChange}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>
            </Toolbar>
          </AppBar>
          <div className={classes.menu}>
            <CustomerAdd stateRefresh={this.stateRefresh}/>
          </div>
          <Paper className={classes.paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>번호</TableCell>
                  <TableCell>이미지</TableCell>
                  <TableCell>이름</TableCell>
                  <TableCell>생년원일</TableCell>
                  <TableCell>성별</TableCell>
                  <TableCell>직업</TableCell>
                  <TableCell>설정</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.customers ? 
                filteredComponents(this.state.customers):
              <TableRow>
                <TableCell colSpan="6" align='center'>
                  <CircularProgress className={classes.progress} value={this.state.completed}></CircularProgress>

                </TableCell>
              </TableRow>
              }
              </TableBody>
            </Table>       
          </Paper>
        </div>
      )
    }
}

export default withStyles(styles)(App);
