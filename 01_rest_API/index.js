const express=require('express');
const users=require('./MOCK_DATA.json');
const fs=require('fs');

const app=express();

app.get('/',(req,res)=>{
    res.send("Welcome to first node project");
})

app.get('/users',(req,res)=>{
    return res.json(users);
})

app.get('/users/:id',(req,res)=>{
    const id=Number(req.params.id);
    const user=users.find((user)=>user.id===id);
    return res.json(user)
})
app.use(express.urlencoded({extended:false}));


app.post('/users',(req,res)=>{
    // console.log(req.body);
    const body=req.body;
    body.id=users.length+1;
    users.push(body);
    const fpath=__dirname+"/MOCK_DATA.json";
    fs.writeFile(fpath,JSON.stringify(users),(err,res)=>{
        if(err)
        {
            console.log("error");
            return;
        }

        console.log("user added !");
        
    });

    console.log(body);
    res.send(`User with name ${body.first_name}  ${body.last_name} added successfully !`);
});

app.patch('/users/:id',(req,res)=>{
     const body=req.body;
     const id=Number(req.params.id);
     body.id=id;
     let user=users.find((user)=>user.id===id);
     let flag=0,pos=-1;
    //  for(i=0;i<users.length;i++)
    //  {
    //     if(users[i].id===user.id)
    //     {
    //         console.log(users[i]);
    //         flag=1;
    //         pos=i;
    //         break;
    //     }
    //  }
    
    pos=users.indexOf(user);

     console.log("pos : ",pos);


     if(pos==-1)
     {
        res.send('User not found !');
     }else{
        users[pos]=body;
     }

      const fpath=__dirname+"/MOCK_DATA.json";
    fs.writeFile(fpath,JSON.stringify(users),(err,res)=>{
        if(err)
        {
            console.log("error");
            return;
        }

        console.log("use updated !");
        
    });

  res.send("User updated !");
})

app.delete('/users/:id',(req,res)=>{
    const id=Number(req.params.id);
    const user=users.find((user)=>user.id===id);
    const c=users.filter((user) => user.id !== id);
     const fpath=__dirname+"/MOCK_DATA.json";
   
    console.log(c);
    fs.writeFile(fpath,JSON.stringify(c),(err)=>{
        if(err)
        {
            console.log("solve error : ",err);
            return;
        }
    })
    res.send(`User deleted with ID : ${id}`);
})


app.listen(4000,()=>{
    console.log("Server is running on port 4000");
})


