const sql = require("mssql");
const signInBtn = document.getElementById("AdsignIn");
const signUpBtn = document.getElementById("UsersignUp");
const firstForm = document.getElementById("form1");
const secondForm = document.getElementById("form2");
const container = document.querySelector(".container");



/**************************************
 sqlserver连接函数
 **************************************/
// async function verify() {
//     try {
//         // make sure that any items are correctly URL encoded in the connection string
//         await sql.connect(sqlConfig)
//         const result = await sql.query`select * from AdministratorTable`
//         // console.log(result)
//         return result
//     } catch (err) {
//         console.log(err)
//         return 0
//     }
// }

/**************************************
界面动作
 **************************************/
signInBtn.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
});

signUpBtn.addEventListener("click", () => {
    container.classList.add("right-panel-active");
});

firstForm.addEventListener("submit", (e) => e.preventDefault());
secondForm.addEventListener("submit", (e) => e.preventDefault());

/**************************************
管理员登陆判定
 **************************************/
function login1()
{
    let x=document.getElementById('Administrator').value
    let y=document.getElementById('Administratorkey').value
    let flag=0
    const db=require('./db');
    db.sql('select * from AdministratorTable',(err,result)=>{
        if(err){
            console.log(err);
        }else{
            for(var p in result['recordset']) {
                if (x === result['recordset'][p]['Administrator'] && y === result['recordset'][p]['PassWord']) {
                    flag = 1
                    break
                }
            }
            if(flag===1){
                window.location.href="childwindow1.html";
            }
            else
            {
                document.getElementById("ts").innerHTML='用户名或密码错误'
            }
        }
    })
}

/**************************************
用户登陆判定
 **************************************/
function login2()
{
    let x=document.getElementById('CaedId').value
    // let flag=0
    const db=require('./db');
    var sqlword = "select isnull((select top(1) 1 from Card where CardNumber=" + x+"), 0)";
    db.sql(sqlword,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            if(result['recordset'][0]['']===1)
                window.location.href="childwindow2.html";
            else
                document.getElementById("ts1").innerHTML='用户不存在'
        }
    })

}