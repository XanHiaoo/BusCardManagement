function guashi() {
    const db=require('./db');
    let idnum=document.getElementById('idnum').value
    var sqlword = "select isnull((select top(1) 1 from Card where IDNumber=" + idnum+"), 0)";
    db.sql(sqlword,(err,result)=>{
        if(err){
            console.log(err);
        }else {
            if(result['recordset'][0][''] === 1) {
                getloss(idnum)
            }
            else{
                document.getElementById("ts_2").innerHTML="该身份证未办理";
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

function getloss(var1){
    const db=require('./db');
    var sqlword = "delete from Card where IDNumber="+var1;
    console.log(sqlword)
    db.sql(sqlword,(err,result)=>{
        if(err){
            console.log(err);
        }
        else {
            document.getElementById("ts_2").innerHTML="挂失完毕";
        }
    })
}