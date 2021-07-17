var count=0;
const db=require('./db');//设置一个 count值，用于存储td的id
function add(){
    let cardnumber=document.getElementById("CardNumber").value;
    var tr=document.getElementById("info");
    // var tr=document.getElementById("info");
    sqlword='select Time,Record,Cost from CardRecord where CardNumber='+cardnumber
    db.sql(sqlword,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            for(var p in result['recordset']) {
                let t=(result['recordset'][p]['Time'])
                let r=(result['recordset'][p]['Record'])
                let c=(result['recordset'][p]['Cost'])
                // c=(c).toString()
                // console.log(t)
                // console.log(r)
                // console.log(c)
                tr.innerHTML+="<tr>"+"<td>"+t+"</td>"+"<td>"+r+"</td>"+"<td>"+c+"</td>"+"</tr>";
            }
        }
    })
}
function retuenmainwindow(){
    window.location.href="childwindow2.html";
}
// function delet(count){
//     var row = document.getElementById(count);
//     row.remove(count);                                    //删除id为count的行数据
// }