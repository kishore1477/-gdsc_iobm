const text = document.querySelector(".text");
const form = document.querySelector("form");
const std_name = document.querySelector("#std_name");
const std_fname = document.querySelector("#std_fname");
const std_email = document.querySelector("#std_email");
const std_role = document.querySelector("#std_role");
const std_phone = document.querySelector("#std_phone");
const std_sem = document.querySelector("#std_sem");
const std_program = document.querySelector("#std_program");
const port_links = document.querySelector("#port-links");
const std_communication = document.querySelector("#std_communication");
const std_management = document.querySelector("#std_management");
const is_community = document.querySelector("#is_community");
const community_role = document.querySelector("#community_role");
const PS_Experience = document.querySelector("#PS_Experience");
const tt_Experience = document.querySelector("#tt_experience");
const any_chapter_before = document.querySelector("#any_chapter_before");
const std_problem_solving = document.querySelector("#std_problem_solving");
const role_chapter_be = document.querySelector("#role_chapter_be");
const role_interested = document.querySelector("#role_interested");
const tec_interest = document.querySelector("#tec_interest");
const non_tec_interest = document.querySelector("#non_tec_interest");
const programming_skills = document.querySelector("#programming_skills");
const motivation = document.querySelector("#motivation");
const contribution = document.querySelector("#contribution");
const alert = document.querySelector("#alert");

let clearData = () =>{
    std_name.innerHTML = "";
    std_fname.innerHTML = "";
    std_email.innerHTML = "";
    // std_phone.innerHTML = "";
    std_role.innerHTML = "";
    std_sem.innerHTML = "";
    std_program.innerHTML = "";
    
    port_links.innerHTML = "";
    
    std_communication.innerHTML = "";
    std_management.innerHTML = "";
    std_problem_solving.innerHTML = "";
    
    is_community.innerHTML = "";
    community_role.innerHTML = "";
    PS_Experience.innerHTML = "";
    tt_Experience.innerHTML = "";
    
    any_chapter_before.innerHTML = "";
    role_chapter_be.innerHTML = "";

    role_interested.innerHTML = "";
    tec_interest.innerHTML = "";
    non_tec_interest.innerHTML = "";
    programming_skills.innerHTML = "";

    port_links.innerHTML = "";

    motivation.innerHTML = "";
    contribution.innerHTML = "";
}

let handleData = (data) =>{
    if(data.Error){
        alert.innerHTML = `
            <div class="alert alert-danger text-center alert-dismissible fade show" role="alert">
                ${data.Error}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        return;
    }
    std_name.innerHTML = data.name;
    std_fname.innerHTML = data.name;
    std_email.innerHTML = data.email;
    std_phone.innerHTML = data.phone;
    std_role.innerHTML = data.role;
    std_sem.innerHTML = data.batch;
    std_program.innerHTML = data.major;

    is_community.innerHTML = data.is_community;
    community_role.innerHTML = data.community_role;
    PS_Experience.innerHTML = data.P_Speaking_Experience;
    tt_Experience.innerHTML = data.Training_teaching_Experience;
    if(data.Chapter_Before){
        any_chapter_before.innerHTML = data.Chapter_Before;
    }else{
        any_chapter_before.innerHTML = "No";
    }

    role_chapter_be.innerHTML = data.role_chapter_be;

    if(data.github){
        port_links.innerHTML +=`
            <li class="list-group-item d-flex flex-column justify-content-between align-items-center p-3">
                <label for="GitHub">GitHub Account</label><br>
                <a class="mb-0" href="${data.github}">${data.github}</a>
            </li>`
    }else if(data.social_link){
        port_links.innerHTML += `
            <li class="list-group-item d-flex flex-column justify-content-between align-items-center p-3">
                <label for="portfolio">Portfolio</label>
                <a class="mb-0 portfolio" href="${data.social_link}">${data.social_link}</a>
            </li>`
    }else{
        port_links.innerHTML = `
            <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                <div class="mb-0">No links available</div>
            </li>`
    }

    role_interested.innerHTML = data.role;
    tec_interest.innerHTML = data.if_tech;
    non_tec_interest.innerHTML = data.if_non_tech;
    programming_skills.innerHTML = data.programming_level;

    let com = parseInt(data.communication_skills)*10;
    let mang = parseInt(data.Management_Skills)*10;
    let pbsl = parseInt(data.Problem_Solving_Skills)*10;
    
    std_communication.innerHTML = `${com}%`;
    std_communication.style.width = `${com}%`
    
    std_management.innerHTML = `${mang}%`;
    std_management.style.width = `${mang}%`;
    
    std_problem_solving.innerHTML = `${pbsl}%`;
    std_problem_solving.style.width = `${pbsl}%`;

    motivation.innerHTML = data.what_do_think;
    contribution.innerHTML = data.contribution;
}

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    let val = form.querySelector(".id").value;
    console.log("value", val)
    clearData();
    ajax(
        {
            method: 'GET',
            url: "/jsondata/"+val,
            onsuccess: function(responseText){
                data = JSON.parse(responseText);
                console.log("Data received",data)
                handleData(data);
            }
        }
    )

    val.value="";
})
