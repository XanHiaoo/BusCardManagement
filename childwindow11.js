function banli() {
    let idnum=document.getElementById('idnum').value
    let charge=document.getElementById('charge').value
    if(idnum.length<6){
        document.getElementById("ts_2").innerHTML="请输入正确的身份证";
    }
    else if(charge<0){
        document.getElementById("ts_2").innerHTML='请输入正确的充值金额';
    }
    else{
        (idexsit(idnum))
    }

}

function idexsit(var1){
    let cardtype=document.getElementById('cardtype').value
    let idnum=document.getElementById('idnum').value
    let cardtypenum
    if(cardtype==='普通卡')
        cardtypenum=1
    else if(cardtype==='学生卡')
        cardtypenum=2
    else if(cardtype==='老人卡')
        cardtypenum=3
    let charge=document.getElementById('charge').value
    const db=require('./db');
    var exsitflag
    var sqlword = "select isnull((select top(1) 1 from Card where IDNumber=" + var1+"), 0)";
    db.sql(sqlword,(err,result)=>{
        if(err){
            console.log(err);
        }else {
            if(result['recordset'][0][''] === 1) {
                document.getElementById("ts_2").innerHTML="身份证已办理";
            }
            else{
                // if (cardtypenum===1)
                //     cc=idnum
                // else if(cardtypenum===2)
                //     cc=idnum
                // else if(cardtypenum===3)
                //     cc=idnum
                // // cc=autoAddZero(cc,7)
                updatecard(var1,var1,cardtypenum,charge)
                let html="办理成功,卡号是"+var1
                document.getElementById("ts_2").innerHTML=html;
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

function getcardnum(var1){
    let idnum=document.getElementById('idnum').value
    let charge=document.getElementById('charge').value
    const db=require('./db');
    var sqlword = "select count(IDNumber) from Card where CardType="+var1;
    db.sql(sqlword,(err,result)=>{
        if(err){
            console.log(err);
        }
        else {
            count=result['recordset'][0]['']
            if (var1===1)
                cc=count+1
            else if(var1===2)
                cc=100000+count+1
            else if(var1===3)
                cc=200000+count+1
            cc=autoAddZero(cc,6)
            updatecard(idnum,cc,var1,charge)
            document.getElementById("ts_2").innerHTML="办理成功,卡号是"+cc;
        }
    })
}



function updatecard(var1,var2,var3,var4){
    const db=require('./db');
    var sqlword = "INSERT INTO Card VALUES ('"+var1+"','"+var2+"','"+var3+"','"+var4+"')";
    console.log(sqlword)
    db.sql(sqlword,(err,result)=>{
        if(err){
            console.log(err);
        }else {
        }
    })
}

let autoAddZero = (val, len) => {
    let tempStr = ''
    for(let i=0;i<len;i++){
        tempStr += '0'
    }
    return  (`${tempStr}${val}`).slice(-len)
}