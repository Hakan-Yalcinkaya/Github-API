
//Element Seçme
const githubForm=document.getElementById("github-form");
const nameInput=document.getElementById("githubname");
const clearLastUsers=document.getElementById("clear-last-users");
const lastUsers=document.getElementById("last-users");
const github=new Github();
const ui =new UI();
eventListeners();

function eventListeners(){
    githubForm.addEventListener("submit",getData);
    clearLastUsers.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched);
}

function getData(e){
    let username=nameInput.value.trim();
    if(username===""){
        alert("Lütfen geçerli bir kullanıcı adı girin")
    }
    else{

        github.getGithubData(username)
        .then(response=>{
            if(response.user.message==="Not Found"){
                ui.showError("Kullanıcı Bulunamadı...")
            }
            else{
                ui.addSearchedUserToUI(username);
                Storage.addSearchedUsersToStorage(username);
                ui.showUserInfo(response.user);
                ui.showRepoInfo(response.repo);
            }
        })
        .catch(err=>ui.showError(err));
    }


    ui.clearInput();


    e.preventDefault();
}

function clearAllSearched(){

    //Tüm arananları temizle
    if(confirm("Tüm Arananları Silmek İstediğinize Emin Misiniz?")){
        Storage.clearAllSearchedUsersFromStorage();
        ui.clearAllSearchedFromUI();
    }
}
let result="";
function getAllSearched(){
    //Arananları storageden al ve ui'a ekle
    let users=Storage.getSearchedUsersFromStorage();
    users.forEach(user=>{
        result+=`<li class="list-group-item">${user}</li>`;

    });
    lastUsers.innerHTML=result;

}