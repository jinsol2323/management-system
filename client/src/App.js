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
    width : '100%',
    marginTop : theme.spacing(3),
    overflowX: 'auto'
  },

  table:{
    minWidth:1080
  },
  
  progress:{
    margin:theme.spacing(2),
  }
}); 

class App extends Component{

    state = {
      customers:"",
      completed: 0
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

    render() {
      const {classes} = this.props?this.props:null;
      return(
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생년원일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.customers ? this.state.customers.map(c=>(
                <Customer 
                  key={c.id}
                  id={c.id}
                  image={c.image}
                  name={c.name}
                  birthday={c.birthday}
                  gender={c.gender}
                  job={c.job}
                />
              )
            ):
            <TableRow>
              <TableCell colSpan="6" align='center'>
                <CircularProgress className={classes.progress} value={this.state.completed}></CircularProgress>

              </TableCell>
            </TableRow>
            }
            </TableBody>
          </Table>       
        </Paper>
      )
    }
}

export default withStyles(styles)(App);
