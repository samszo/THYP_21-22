"use strict";

let studListAll = new Array();
let studListDisplay;
// let studCardsDisplay;

let dataCsv;

let facet = {};

let studCards = document.getElementById("studCards");
let searchButton = document.getElementById("searchButton");
let searchInput = document.getElementById("searchInput");
let navbarFacet = document.getElementById("navbarFacet");
let moreInfo = document.getElementById("moreInfo");


let file_csv = "./data/data.csv";


d3.csv(file_csv)
    .then((data) => {
        // console.log(data);
        setData(data);
    });

function getUrl(url){
    //merci à https://davidwalsh.name/query-string-javascript
    // https://developers.google.com/web/updates/2016/01/urlsearchparams?hl=en
    let newUrl = new URL(url);
    let urlParam = new URLSearchParams(newUrl.search);
    let id = urlParam.get('id');
    //merci à https://stackoverflow.com/questions/50664868/get-pictures-from-google-drive-folder-with-javascript-to-my-website
    let urlTof = "https://drive.google.com/uc?id=" + id + "&export=download";                      
    return urlTof;
}

function setData(data){
    dataCsv = data;
    dataCsv.forEach(function(etud, id) {
        let newStud = new Student(etud, id, facet);
        facet = newStud.facet;
        newStud.cleanFacet();
        studListAll.push(newStud);
    });

    studListDisplay = studListAll;
    generateCards(studListDisplay);
    createNavFacet(facet);
    // studListDisplay.forEach(stud => {
    //     studCards.appendChild(createCards_1(stud));
    // });
}

function getUrl(url){
    //merci à https://davidwalsh.name/query-string-javascript
    // https://developers.google.com/web/updates/2016/01/urlsearchparams?hl=en
    let newUrl = new URL(url);
    let urlParam = new URLSearchParams(newUrl.search);
    let id = urlParam.get('id');
    //merci à https://stackoverflow.com/questions/50664868/get-pictures-from-google-drive-folder-with-javascript-to-my-website
    let urlTof = "https://drive.google.com/uc?id=" + id + "&export=download";                      
    return urlTof;
}

// function createDiv(className, style){
//     let newElt = document.createElement("div");
//     newElt.className = className;
//     newElt.style = style;
//     return newElt;
// }

function createBalise(balise, className, src, style){
    let newElt = document.createElement(balise);
    if(className)
        newElt.className = className;
    if(src)
        newElt.setAttribute("src", src);
        // newElt.src = src;
    if(style)
        newElt.style = style;
    return newElt;
}

// function createImg(src, className, style){
//     let newEltImg = document.createElement("IMG");
//     newEltImg.src = src;
//     newEltImg.className = className;
//     newEltImg.style = style;
//     return newEltImg;
// }

function createCards_1(stud){
    let newElt = createBalise("div","card mb-3 studCard");
    let newElt2 = createBalise("div","row no-gutters");
    let newElt3 = createBalise("div","col-md-4 bg-white");
    let newImg = createBalise("img", "card-img", getUrl(stud.details["Votre photo"]));
    let newElt4 = createBalise("div","col-md-8");
    let newElt5 = createBalise("div","card-body");
    let newTitle = createBalise("h5", "card-title studName");
    newTitle.appendChild(document.createTextNode(stud.details["Votre prénom"] + " " + stud.details["Votre nom"].toUpperCase()));
    let newSubTitle = createBalise("p", "card-text studCorse");
    newSubTitle.appendChild(document.createTextNode(stud.details["Parcours"]));
    let newText = createBalise("p", "card-text");
    let newSmall = createBalise("small", "text-muted");
    let newLien = createBalise("a");
    newLien.setAttribute("href", "#");
    newLien.addEventListener("click", e => {
        if(moreInfo.style.display == "none"){
            moreInfo.style.display = "";
            moreInfo.appendChild(createMoreInfo(stud));
        }
    })
    // newLien.setAttribute("data-toggle", "tooltip");
    // newLien.setAttribute("data-html", "true");
    // newLien.setAttribute("title", "aaaaaaaaaaa");
    newSmall.appendChild(newLien).appendChild(document.createTextNode("Plus d'information"));

    newText.appendChild(newSmall);
    newElt5.appendChild(newTitle);
    newElt5.appendChild(newSubTitle);
    newElt5.appendChild(newText);
    newElt4.appendChild(newElt5);
    newElt3.appendChild(newImg);
    newElt2.appendChild(newElt3);
    newElt2.appendChild(newElt4);
    newElt.appendChild(newElt2);

    return newElt;
}

function generateCards(CardsList){
    CardsList.forEach(stud => {
        studCards.appendChild(createCards_1(stud));
    });
}

function filterStudByName(){
    let nameSearched = searchInput.value.toLowerCase();
    let studName = document.getElementsByClassName("studName");
    let cards = document.getElementsByClassName("studCard");

    for(let i = 0; i < studName.length; i++){
        if(studName[i].textContent.toLowerCase().indexOf(nameSearched) == -1){
            cards[i].style.display = "none";
        }else{
            cards[i].style.display = "";
        }
    }
}

function filterStudByCorse(corseSearched){
    // let nameSearched = searchInput.value.toLowerCase();
    let studCorse = document.getElementsByClassName("studCorse");
    let cards = document.getElementsByClassName("studCard");

    displayAllCards();

    for(let i = 0; i < studCorse.length && corseSearched != "tous"; i++){
        if(studCorse[i].textContent.indexOf(corseSearched) == -1){
            cards[i].style.display = "none";
        }
    }
}

// function filterStudByCorse2(corseSearched){
//     // let nameSearched = searchInput.value.toLowerCase();
//     let studCorse = document.getElementsByClassName("studCorse");
//     let cards = document.getElementsByClassName("studCard");
//     let invisibleCards = [];
//     let visibleCards = [];

//     for(let i = 0; i < studCorse.length; i++){
//         if(studCorse[i].textContent.indexOf(corseSearched) != -1 && !visibleCards.indexOf(cards[i])){
//             visibleCards.push(cards[i]);
//             invisibleCards.pop(invisibleCards.indexOf(cards[i]));
//         }
//     }
// }

function displayAllCards() {
    let cards = document.getElementsByClassName("studCard");
    for(let i = 0; i < cards.length; i++){
        cards[i].style.display = "";
    }
}


// searchButton.onclick = filterStudByName;
searchInput.addEventListener("keyup", e => {
        filterStudByName();
});


function createNavFacet(facet) {
    let newNavbar = createBalise("ul", "navbar-nav mr-auto");
    let parcours = createDropdown("Parcours", facet);
    newNavbar.appendChild(parcours);

    // let newNavbar2 = createBalise("ul", "navbar-nav mr-auto");
    // let ordinateur = createDropdown("Ordinateur", facet);
    // newNavbar2.appendChild(ordinateur);
    // console.log(facet);

    // navbarFacet.prepend(newNavbar2);
    navbarFacet.prepend(newNavbar);
}

function createCheckbox(name, exp, id, subTitles) {
            
    let subTitle = createBalise("a", "dropdown-item");
    subTitle.href = "#";
    // console.log(exp);
    let checkbox = createBalise("div", "form-check");
    let checkInput = createBalise("input", "form-check-input");
    checkInput.setAttribute("name", name);
    checkInput.setAttribute("type", "radio");
    checkInput.setAttribute("value", "");
    checkInput.addEventListener("change", e => {
        // if(checkInput.checked){
            filterStudByCorse(exp);
        // }else{
            // displayAllCards();
        // }
    });
    checkInput.type = "radio";
    checkInput.value = "";
    checkInput.id = id;
    checkbox.appendChild(checkInput);
    let checkLabel = createBalise("label", "form-check-label");
    checkLabel.setAttribute("for", id);
    // checkLabel.addEventListener("click", e => {
    //     if(checkLabel["clicked"] == "false"){
    //         filterStudByCorse(exp);
    //     }else{
    //         displayAllCards();
    //     }
    // });
    // checkLabel.for = "defaultCheck1";
    checkLabel.appendChild(document.createTextNode(exp));
    checkbox.appendChild(checkLabel);

    subTitle.appendChild(checkbox);
    subTitles.appendChild(subTitle);
}

function createDropdown(name, facet) {
    if(facet[name]){
        let newDropdown = createBalise("li", "nav-item dropdown");
        let title = createBalise("a", "nav-link dropdown-toggle");
        title.href = "#";
        title.id = "navbarDropdown";
        title.setAttribute("role", "button");
        title.setAttribute("data-toggle", "dropdown")
        title.setAttribute("aria-haspopup", "true")
        title.setAttribute("aria-expanded", "false")
        title.appendChild(document.createTextNode(name));
        newDropdown.appendChild(title);

        let subTitles = createBalise("div", "dropdown-menu");
        subTitles.setAttribute("aria-labelledby", "navbarDropdown");

        for(const exp in facet[name].facetList){
            let id = exp.replace(/ /g, "_").toLowerCase();
            createCheckbox(name, exp, id, subTitles);
        }

        createCheckbox(name, "tous", "tous", subTitles);

        newDropdown.appendChild(title);
        newDropdown.appendChild(subTitles);
        

        return newDropdown;
    }
}

function createMoreInfo(stud) {
    let newElt = createBalise("div", "card");
    let newElt2 = createBalise("div","row no-gutters");
    let newElt3 = createBalise("div","col-md-4 bg-white");
    let newImg = createBalise("img", "card-img", getUrl(stud.details["Votre photo"]));
    let newElt4 = createBalise("div","col-md-8");
    let newElt5 = createBalise("div","card-body");
    
    let newTitle = createBalise("h5", "card-title studName");
    newTitle.appendChild(document.createTextNode(stud.details["Votre prénom"] + " " + stud.details["Votre nom"].toUpperCase()));
    
    let studNum = createBalise("p", "card-text");
    studNum.appendChild(document.createTextNode("N° étudiant : " + stud.details["N° étudiant"]));

    let e_mail = createBalise("p", "card-text");
    e_mail.appendChild(document.createTextNode("E-mail : " + stud.details["Votre mail"]));

    let parcours = createBalise("p", "card-text studCorse");
    parcours.appendChild(document.createTextNode("Parcours : " + stud.details["Parcours"]));

    let objectifs = createBalise("p", "card-text");
    objectifs.appendChild(document.createTextNode("Objectifs : " + stud.details["Objectifs"]));

    let close = createBalise("button", "btn btn-danger", "", "position : absolute; right : 10px; top : 10px;");
    close.addEventListener("click", e => {
        moreInfo.innerHTML = "";
        moreInfo.style.display = "none";
    })
    close.appendChild(document.createTextNode("X"));

    newElt5.appendChild(newTitle);
    newElt5.appendChild(studNum);
    newElt5.appendChild(e_mail);
    newElt5.appendChild(parcours);
    newElt5.appendChild(objectifs);


    newElt4.appendChild(newElt5);
    newElt3.appendChild(newImg);
    newElt2.appendChild(newElt3);
    newElt2.appendChild(newElt4);
    newElt.appendChild(newElt2);
    newElt.appendChild(close);
    return newElt;
}
