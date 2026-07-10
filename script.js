/* ==========================================
   SCRIM ARENA V3
   Powered by Firebase
========================================== */

import {
    addTeam,
    listenTeams,
    saveMatch,
    listenBracket,
    getSettings
} from "./firebase.js";

/* ==========================================
GLOBAL
========================================== */

const app = {

    teams: [],

    bracket: [],

    settings: {

        maxTeam: 16,

        registrationOpen: true,

        registrationDate: null,

        matchDate: null

    }

};


/* ==========================================
ELEMENT
========================================== */

const registerForm =
document.getElementById("registerForm");

const submitBtn =
document.getElementById("submitBtn");

const statusText =
document.getElementById("tournamentStatus");

const teamCounter =
document.getElementById("teamCount");

const teamList =
document.getElementById("teamList");

const bracketContainer =
document.getElementById("bracket");


/* Countdown */

const regDay =
document.getElementById("regDays");

const regHour =
document.getElementById("regHours");

const regMinute =
document.getElementById("regMinutes");

const regSecond =
document.getElementById("regSeconds");

const matchDay =
document.getElementById("matchDays");

const matchHour =
document.getElementById("matchHours");

const matchMinute =
document.getElementById("matchMinutes");

const matchSecond =
document.getElementById("matchSeconds");


/* ==========================================
INIT
========================================== */

async function init(){

    console.log("Loading...");

    await loadSettings();

    realtimeTeam();

    realtimeBracket();

    startCountdown();

}

window.addEventListener(

"DOMContentLoaded",

init

);


/* ==========================================
SETTING
========================================== */

async function loadSettings(){

    const setting =
    await getSettings();

    if(setting){

        app.settings = {

            ...app.settings,

            ...setting

        };

    }

}


/* ==========================================
REALTIME TEAM
========================================== */

function realtimeTeam(){

    listenTeams((teams)=>{

        app.teams = teams;

        renderTeam();

        updateCounter();

        updateStatus();

    });

}


/* ==========================================
REALTIME BRACKET
========================================== */

function realtimeBracket(){

    listenBracket((matches)=>{

        app.bracket = matches;

        renderBracket();

    });

}
/* ==========================================
REGISTER FORM
========================================== */

registerForm.addEventListener(

"submit",

registerTeam

);

async function registerTeam(e){

e.preventDefault();

if(!app.settings.registrationOpen){

toast("Pendaftaran sudah ditutup.");

return;

}

if(app.teams.length>=app.settings.maxTeam){

toast("Slot tim sudah penuh.");

return;

}

const team={

name:

document.getElementById("teamName")
.value.trim(),

rank:

document.getElementById("rank")
.value,

captain:

document.getElementById("captain")
.value.trim(),

whatsapp:

document.getElementById("whatsapp")
.value.trim(),

notes:

document.getElementById("notes")
.value.trim(),

createdAt:Date.now()

};


/* VALIDASI */

if(team.name===""){

toast("Nama tim wajib diisi.");

return;

}

if(team.captain===""){

toast("Nama kapten wajib diisi.");

return;

}

if(team.whatsapp===""){

toast("Nomor WhatsApp wajib diisi.");

return;

}


/* DUPLIKAT */

const duplicate=

app.teams.find(

t=>t.name.toLowerCase()

===

team.name.toLowerCase()

);

if(duplicate){

toast("Nama tim sudah digunakan.");

return;

}


/* SIMPAN */

submitBtn.disabled=true;

submitBtn.innerHTML="LOADING...";

try{

await addTeam(team);

toast(

`${team.name} berhasil didaftarkan.`

);

registerForm.reset();

}catch(error){

console.error(error);

toast("Gagal menyimpan data.");

}

submitBtn.disabled=false;

submitBtn.innerHTML="ENTER THE ARENA";

}



/* ==========================================
COUNTER
========================================== */

function updateCounter(){

teamCounter.innerHTML=

`${app.teams.length} / ${app.settings.maxTeam} Team`;

}



/* ==========================================
STATUS
========================================== */

function updateStatus(){

if(app.settings.registrationOpen){

statusText.innerHTML=

"🟢 REGISTRATION OPEN";

submitBtn.disabled=false;

return;

}

statusText.innerHTML=

"🔴 REGISTRATION CLOSED";

submitBtn.disabled=true;

}



/* ==========================================
TOAST
========================================== */

function toast(message){

let toast=

document.querySelector(".toast");

if(!toast){

toast=document.createElement("div");

toast.className="toast";

document.body.appendChild(toast);

}

toast.innerHTML=

message;

toast.classList.add("show");

setTimeout(()=>{

toast.classList.remove("show");

},3000);

}
/* ==========================================
COUNTDOWN
========================================== */

function startCountdown(){

setInterval(()=>{

updateRegistrationCountdown();

updateMatchCountdown();

checkRegistrationTime();

},1000);

}



/* ==========================================
REGISTRATION COUNTDOWN
========================================== */

function updateRegistrationCountdown(){

if(!app.settings.registrationDate){

setTimer(

regDay,

regHour,

regMinute,

regSecond,

0

);

return;

}

const distance=

new Date(

app.settings.registrationDate

).getTime()

-

Date.now();

setTimer(

regDay,

regHour,

regMinute,

regSecond,

distance

);

}



/* ==========================================
MATCH COUNTDOWN
========================================== */

function updateMatchCountdown(){

if(!app.settings.matchDate){

setTimer(

matchDay,

matchHour,

matchMinute,

matchSecond,

0

);

return;

}

const distance=

new Date(

app.settings.matchDate

).getTime()

-

Date.now();

setTimer(

matchDay,

matchHour,

matchMinute,

matchSecond,

distance

);

}



/* ==========================================
SET TIMER
========================================== */

function setTimer(

day,

hour,

minute,

second,

distance

){

if(distance<0){

distance=0;

}

const days=Math.floor(

distance/

(1000*60*60*24)

);

const hours=Math.floor(

(distance%

(1000*60*60*24))

/

(1000*60*60)

);

const minutes=Math.floor(

(distance%

(1000*60*60))

/

(1000*60)

);

const seconds=Math.floor(

(distance%

(1000*60))

/

1000

);

animateNumber(day,days);

animateNumber(hour,hours);

animateNumber(minute,minutes);

animateNumber(second,seconds);

}



/* ==========================================
ANIMATION NUMBER
========================================== */

function animateNumber(

element,

number

){

const value=

String(number)

.padStart(2,"0");

if(element.innerText!==value){

element.style.transform="scale(1.15)";

element.innerText=value;

setTimeout(()=>{

element.style.transform="scale(1)";

},120);

}

}



/* ==========================================
CHECK REGISTRATION
========================================== */

function checkRegistrationTime(){

if(!app.settings.registrationDate){

return;

}

const now=Date.now();

const closeTime=

new Date(

app.settings.registrationDate

).getTime();

if(now>=closeTime){

submitBtn.disabled=true;

submitBtn.innerHTML=

"REGISTRATION CLOSED";

statusText.innerHTML=

"🔴 REGISTRATION CLOSED";

}

}
/* ==========================================
RENDER TEAM
========================================== */

function renderTeam(){

    teamList.innerHTML="";

    if(app.teams.length===0){

        teamList.innerHTML=`

        <div class="empty">

            Belum ada tim yang mendaftar.

        </div>

        `;

        updateCounter();

        return;

    }

    app.teams.forEach((team,index)=>{

        const card=document.createElement("div");

        card.className="team";

        card.innerHTML=`

        <div class="team-info">

            <h3>${index+1}. ${team.name}</h3>

            <small>${team.rank}</small>

            <p>${team.captain}</p>

        </div>

        <div class="team-status">

            READY

        </div>

        `;

        teamList.appendChild(card);

    });

    updateCounter();

    animateTeam();

}



/* ==========================================
TEAM ANIMATION
========================================== */

function animateTeam(){

    const cards=document.querySelectorAll(".team");

    cards.forEach((card,index)=>{

        card.animate(

        [

            {

                opacity:0,

                transform:"translateY(15px)"

            },

            {

                opacity:1,

                transform:"translateY(0)"

            }

        ],

        {

            duration:350,

            delay:index*70,

            easing:"ease-out",

            fill:"forwards"

        });

    });

}



/* ==========================================
TEAM COUNTER
========================================== */

function updateCounter(){

    teamCounter.innerHTML=

    `${app.teams.length} / ${app.settings.maxTeam} Team`;

}



/* ==========================================
EMPTY CHECK
========================================== */

function hasEnoughTeam(){

    return app.teams.length>=2;

}



/* ==========================================
TEAM SEARCH
========================================== */

function getTeam(name){

    return app.teams.find(

        team=>team.name===name

    );

}



/* ==========================================
AUTO STATUS
========================================== */

function autoStatus(){

    if(app.teams.length>=app.settings.maxTeam){

        submitBtn.disabled=true;

        submitBtn.innerHTML="FULL";

        statusText.innerHTML=

        "🟡 SLOT FULL";

    }

}

setInterval(autoStatus,1000);
