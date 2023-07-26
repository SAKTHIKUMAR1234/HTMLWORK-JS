let update_id=null;

function add_menu(){
    document.getElementById("edit-form").style.display="block";
    document.getElementById("update-form").style.display="none";
    document.getElementById("emp-id").value="";
    document.getElementById("emp-name").value="";
    document.getElementById("emp-desc").value="";
    document.getElementById("emp-sal").value="";
    document.getElementById("emp-city").value="";
}

function add_employee(){
    event.preventDefault();
    document.getElementById("alert").style.display="none";
    let err=validate();
    if(err=='nope'){
        let id=document.getElementById("emp-id").value;
        let city=document.getElementById("emp-city").value;
        let str= `{
            "id":"${document.getElementById("emp-id").value}",
            "name":"${document.getElementById("emp-name").value}",
            "desc":"${document.getElementById("emp-desc").value}",
            "sal":"${document.getElementById("emp-sal").value}",
            "city":"${city}"
        }`;

        localStorage.setItem(id,str);
        document.getElementById("edit-form").style.display="none";
        detailsDisplay();
    }
    else{
        document.getElementById("alert").style.display="block";
        document.getElementById("msg").innerHTML=err;
    }
}

function validate(){
    let id=document.getElementById("emp-id").value;
    let city=document.getElementById("emp-city").value;
    let name=document.getElementById("emp-name").value;
    let sal=document.getElementById("emp-sal").value;
    let desc=document.getElementById("emp-desc").value;
    
    if(localStorage.getItem(id)!=undefined){
        return 'Id Already Exist';
    }
    if(/\d/.test(city)){
        return 'Enter Valid city Name';
    }
    else  if(/\d/.test(name)){
        return 'Enter Valid Name';
    }
    else if(id=='' || city=='' || name=='' || sal=='' ||desc==''){
        return 'All data are required';
    }
    else{
        return 'nope';
    }
}


function detailsDisplay(){
    document.getElementById("alert").style.display="none";
    let tag=document.getElementById("main-table").innerHTML="";
    document.getElementById("main-table").innerHTML=`
        <div class="row-data row-head">
            <div><a>Employee Id</a></div>
            <div><a>Name</a></div>
            <div><a>Designation</a></div>
            <div><a>Salary</a></div>
            <div><a>City</a></div>
            <div><a>Action</a></div>
        </div>`;
    for(let e in localStorage){
        if(localStorage.getItem(e)!=null){
            let local=JSON.parse(localStorage.getItem(e));
            //console.log(local);


            document.getElementById("main-table").innerHTML+=`
        <div class="row-data">
            <div><a>${local.id}</a></div>
            <div><a>${local.name}</a></div>
            <div><a>${local.desc}</a></div>
            <div><a>${local.sal}</a></div>
            <div><a>${local.city}</a></div>
            <div><a class="btn" id="btne" onclick="edit(${local.id})">Edit</a><a class="btn" id="btnd" onclick="del(${local.id})" style="margin:10px;">Delete</a></div>
        </div>`;
        }
    }
}


function exit_menu(i){
    if(i==1){
        document.getElementById("edit-form").style.display="none";
    }
    if(i==2){
        document.getElementById("update-form").style.display="none";
    }
}

function edit(index){
    document.getElementById("edit-form").style.display="none";
    let local=JSON.parse(localStorage.getItem(index));
    update_id=index;
    document.getElementById("update-form").style.display="block";
    console.log(local.id);
    document.getElementById("emp-id-u").value=local.id;
    document.getElementById("emp-name-u").value=local.name;
    document.getElementById("emp-desc-u").value=local.desc;
    document.getElementById("emp-sal-u").value=local.sal;
    document.getElementById("emp-city-u").value=local.city;



}

function update_employee(){
    event.preventDefault();
    if(update_id!=document.getElementById("emp-id-u").value){
        document.getElementById("alert").style.display="block";
        document.getElementById("msg").innerHTML='EmployeeId cannot be changed!';
        return;
    }
    let err=validate1();
    if(err=='nope'){
        let id=document.getElementById("emp-id-u").value;
        let city=document.getElementById("emp-city-u").value;
        let str= `{
            "id":"${document.getElementById("emp-id-u").value}",
            "name":"${document.getElementById("emp-name-u").value}",
            "desc":"${document.getElementById("emp-desc-u").value}",
            "sal":"${document.getElementById("emp-sal-u").value}",
            "city":"${city}"
        }`;

        localStorage.setItem(id,str);
        document.getElementById("update-form").style.display="none";
        detailsDisplay();
    }
    else{
        document.getElementById("alert").style.display="block";
        document.getElementById("msg").innerHTML=err;
    }
}


function validate1(){
    let id=document.getElementById("emp-id-u").value;
    let city=document.getElementById("emp-city-u").value;
    let name=document.getElementById("emp-name-u").value;
    let sal=document.getElementById("emp-sal-u").value;
    let desc=document.getElementById("emp-desc-u").value;
    
    if(/\d/.test(city)){
        return 'Enter Valid city Name';
    }
    else  if(/\d/.test(name)){
        return 'Enter Valid Name';
    }

    else if(/\d/.test(desc)){
        return 'Enter Valid Designation';
    }

    else if(id=='' || city=='' || name=='' || sal=='' ||desc==''){
        return 'All data are required';
    }
    else{
        return 'nope';
    }
}


function del(i){
    console.log(i);
    update_id=i.toString();
    localStorage.removeItem(update_id);
    update_id=null;
    detailsDisplay();
}
