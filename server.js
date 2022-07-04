const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/customers', (req, res) => {
   res.send([
      {
        'id':1,
        'image':'http://placeimg.com/65/65/1',
        'name':'현빈',
        'birthday':'961222',
        'gender':'남자',
        'job':'대학생',
    
    },
    {
      'id':2,
      'image':'http://placeimg.com/65/65/2',
      'name':'홍길동',
      'birthday':'961222',
      'gender':'남자',
      'job':'대학생',
    
    },
    {
      'id':3,
      'image':'http://placeimg.com/65/65/3',
      'name':'김길동',
      'birthday':'961222',
      'gender':'남자',
      'job':'대학생',
    
    },
    ]);
});

app.listen(port, ()=> console.log(`Listening on port ${port}`));