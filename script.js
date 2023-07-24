function add_menu(){
    document.getElementById("edit-form").style.display="block";
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
            "name":${document.getElementById("emp-name").value},
            "desc":${document.getElementById("emp-desc").value},
            "sal":${document.getElementById("emp-sal").value},
            "city":${city}
        }`;

        localStorage.setItem(id,JSON.stringify(str));
        for(let e  in localStorage){
            console.log(localStorage.getItem(e));
        }
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
    if(localStorage.getItem(id)!=null){
        return 'Id Already Exist';
    }
    if(/\d/.test(city)){
        return 'Enter Valid city Name';
    }
    else  if(/\d/.test(name)){
        return 'Enter Valid Name';
    }
    else{
        return 'nope';
    }
}


function detailsDisplay(){
    let tag=document.getElementById("main-table").innerHTML="";
    tag.innerHTML+=`
        <div class="row-data row-head">
            <div><a>Employee Id</a></div>
            <div><a>Name</a></div>
            <div><a>Designation</a></div>
            <div><a>Salary</a></div>
            <div><a>City</a></div>
            <div><a>Action</a></div>
        </div>`;
    for(let e in localStorage){
        if(localStorage.getItem(e)!=undefined){
            let local=JSON.parse(localStorage.getItem(e));

        //     tag.innerHTML+=`
        // <div class="row-data">
        //     <div><a>${e}</a></div>
        //     <div><a>${local.}</a></div>
        //     <div><a>${}</a></div>
        //     <div><a>${}</a></div>
        //     <div><a>${}</a></div>
        //     <div><a>Action</a></div>
        // </div>`;
        }
    }
}