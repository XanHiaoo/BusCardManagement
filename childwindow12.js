function chongzhi() {
    const db=require('./db');
    let cardnum=document.getElementById('cardnum').value
    let charge=document.getElementById('charge').value
    var sqlword = "select isnull((select top(1) 1 from Card where CardNumber=" + cardnum+"), 0)";
    db.sql(sqlword,(err,result)=>{
        if(err){
            console.log(err);
        }else {
            if(result['recordset'][0][''] === 1) {
                getbalance(cardnum)
            }
            else{
                document.getElementById("ts_2").innerHTML="卡号不存在";
            }
        }
    })

}


function ret() {
    document.forms[0].action="childwindow1.html";
}

function ret2() {
    document.forms[0].action="childwindow11.html";
}





function getbalance(var1){
    const db=require('./db');
    var sqlword = "select Balance from Card where CardNumber="+var1;
    console.log(sqlword)
    db.sql(sqlword,(err,result)=>{
        if(err){
            console.log(err);
        }
        else {
            b=result['recordset'][0]['Balance']
            updatebalance(b)
        }
    })
}

function updatebalance(var1){
    const db=require('./db');
    let cardnum=document.getElementById('cardnum').value
    let charge=document.getElementById('charge').value
    var b= Number(var1)+Number(charge)
    var sqlword = "UPDATE Card SET Balance ="+b + "WHERE CardNumber="+cardnum;
    console.log(sqlword)
    db.sql(sqlword,(err,result)=>{
        if(err){
            console.log(err);
        }
        else {
            document.getElementById("ts_2").innerHTML="充值成功";
        }
    })
}