var SiteName = document.getElementById("SiteName");
var SiteURL = document.getElementById("SiteURL");
var tabelTbody = document.getElementById("tabelTbody");
var dataBase = [];
var exampleModal = document.getElementById("exampleModal");
var closeLink = document.getElementById("closeLink");

//regex var
var wrongRegex = document.getElementById("wrongRegex");
var wrongRegexUrl = document.getElementById("wrongRegexUrl");
var wrongLayer = document.getElementById("wrongLayer");
if (localStorage.getItem("siteDetails") != null) {
    dataBase = JSON.parse(localStorage.getItem("siteDetails"));
    showData();
}


function addData() {
    if (validName() == true && validUrl() == true) {
        var proudctData = {
            SiteNameValue: SiteName.value,
            SiteURLValue: SiteURL.value
        }

        dataBase.push(proudctData);
        localStorage.setItem("siteDetails", JSON.stringify(dataBase));
        console.log(dataBase);

        showData();
        clearAll();
    }
    else if(validName() == false && validUrl() == false) {
        wrongLayer.classList.remove("d-none")
        wrongLayer.classList.add("d-block")
    }

}

function clearAll() {
    SiteName.value = "";
    SiteURL.value = "";
}


function showData() {
    var cartona = "";

    for (var i = 0; i < dataBase.length; i++) {
        cartona += ` <tr class="fs-4">
        <td>${i + 1}</td>
        <td>${dataBase[i].SiteNameValue}</td>
        <td><button onclick = "visitSite(${i})" class="btn btn-success"><a href="${dataBase[i].SiteURLValue}" target="_blank"><i class="fa-solid fa-eye"></i></a></button></td>
        <td><button onclick = "delIndex(${i})" class="btn btn-danger"><i class="fa-regular fa-trash-can"></i></button></td>
    </tr>`
    }
    tabelTbody.innerHTML = cartona
}


function delIndex(index) {
    // console.log([index]+1);
    dataBase.splice(index, 1)
    localStorage.setItem("siteDetails", JSON.stringify(dataBase))
    showData()
}

function visitSite(index) {
    var VisitSite = dataBase[index].SiteURLValue
    // dataBase[index].length
    window.open(VisitSite, "_blank")
}

function validName() {
    var rgexName = /^[a-zA-Z]{4,60}$/;
    var test = SiteName.value;
    rgexName.test(test)
    if (rgexName.test(test) == true) {
        SiteName.classList.add("is-valid");
        SiteName.classList.remove("is-invalid");
        wrongRegex.classList.add("d-none");
        wrongRegex.classList.remove("d-block");
        return true
    }
    else {
        SiteName.classList.remove("is-valid");
        SiteName.classList.add("is-invalid");
        wrongRegex.classList.remove("d-none");
        wrongRegex.classList.add("d-block");


        return false
    }
}
// 

function validUrl() {
    var rgexUrl = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
    var test1 = SiteURL.value;
    if (rgexUrl.test(test1) == true) {
        SiteURL.classList.add("is-valid");
        SiteURL.classList.remove("is-invalid");
        wrongRegexUrl.classList.add("d-none");
        wrongRegexUrl.classList.remove("d-block");
        return true
    }
    else {
        SiteURL.classList.remove("is-valid");
        SiteURL.classList.add("is-invalid");
        wrongRegexUrl.classList.remove("d-none");
        wrongRegexUrl.classList.add("d-block");
        return false
    }

}

function closeBtn(){
    wrongLayer.classList.add("d-none")
    wrongLayer.classList.remove("d-block")
}
