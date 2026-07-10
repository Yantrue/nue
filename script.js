/* ==========================================
   SCRIM ARENA V2
   script.js
========================================== */

const maxTeam = 16;

let teams = [];

let registrationOpen = true;



/* ==========================================
COUNTDOWN DATE
========================================== */

// GANTI TANGGAL PENDAFTARAN
const registrationDate = new Date(
"2026-07-30T18:00:00"
).getTime();

// GANTI TANGGAL MATCH
const matchDate = new Date(
"2026-07-30T19:00:00"
).getTime();



/* ==========================================
ELEMENT
========================================== */

const teamList =
document.getElementById("teamList");

const teamCounter =
document.getElementById("teamCount");

const registerForm =
document.getElementById("registerForm");

const submitBtn =
document.getElementById("submitBtn");

const statusText =
document.getElementById("tournamentStatus");



/* ==========================================
COUNTDOWN
========================================== */

function updateCountdown(){

const now = Date.now();

updateTimer(

registrationDate,

"regDays",

"regHours",

"regMinutes",

"regSeconds"

);

updateTimer(

matchDate,

"matchDays",

"matchHours",

"matchMinutes",

"matchSeconds"

);

if(now >= registrationDate){

registrationOpen = false;

submitBtn.disabled = true;

submitBtn.innerText =
"REGISTRATION CLOSED";

statusText.innerHTML =
"🔴 REGISTRATION CLOSED";

}

}

setInterval(updateCountdown,1000);

updateCountdown();



/* ==========================================
UPDATE TIMER
========================================== */

function updateTimer(

target,

day,

hour,

minute,

second

){

let distance = target - Date.now();

if(distance < 0){

distance = 0;

}

const days = Math.floor(

distance /
(1000*60*60*24)

);

const hours = Math.floor(

(distance %

(1000*60*60*24))

/

(1000*60*60)

);

const minutes = Math.floor(

(distance %

(1000*60*60))

/

(1000*60)

);

const seconds = Math.floor(

(distance %

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
ANIMATE NUMBER
========================================== */

function animateNumber(id,value){

const el = document.getElementById(id);

const text = String(value)
.padStart(2,"0");

if(el.innerText !== text){

el.style.transform="scale(1.18)";
el.style.color="#fff";

setTimeout(()=>{

el.innerText=text;

el.style.transform="scale(1)";
el.style.color="";

},120);

}

}



/* ==========================================
REGISTER
========================================== */

registerForm.addEventListener(

"submit",

function(e){

e.preventDefault();

if(!registrationOpen){

toast(

"Pendaftaran sudah ditutup."

);

return;

}

const team={

name:

document
.getElementById("teamName")
.value,

rank:

document
.getElementById("rank")
.value,

captain:

document
.getElementById("captain")
.value,

whatsapp:

document
.getElementById("whatsapp")
.value,

notes:

document
.getElementById("notes")
.value

};

addTeam(team);

registerForm.reset();

}

);



/* ==========================================
ADD TEAM
========================================== */

function addTeam(team){

if(teams.length>=maxTeam){

toast("Slot penuh.");

return;

}

teams.push(team);

renderTeam();

toast(

team.name+

" berhasil didaftarkan."

);

}
/* ==========================================
RENDER TEAM
========================================== */

function renderTeam(){

teamList.innerHTML="";

teamCounter.innerText=
`${teams.length} / ${maxTeam} Team`;

if(teams.length===0){

teamList.innerHTML=`
<div class="empty">
Belum ada tim yang mendaftar.
</div>
`;

return;

}

teams.forEach((team,index)=>{

const card=document.createElement("div");

card.className="team fade-up";

card.innerHTML=`

<div>

<strong>${index+1}. ${team.name}</strong>

<br>

<small>

${team.rank}

</small>

</div>

<div class="badge">

READY

</div>

`;

teamList.appendChild(card);

});

saveLocal();

}



/* ==========================================
LOCAL STORAGE
========================================== */

function saveLocal(){

localStorage.setItem(

"scrimTeams",

JSON.stringify(teams)

);

}

function loadLocal(){

const data=

localStorage.getItem(

"scrimTeams"

);

if(data){

teams=JSON.parse(data);

renderTeam();

}

}

loadLocal();



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

toast.innerHTML=`

✅ ${message}

`;

toast.classList.add("show");

setTimeout(()=>{

toast.classList.remove("show");

},3000);

}



/* ==========================================
AUTO CLOSE
========================================== */

function checkSlot(){

if(teams.length>=maxTeam){

registrationOpen=false;

submitBtn.disabled=true;

submitBtn.innerText="FULL";

statusText.innerHTML=

"🟡 SLOT FULL";

}

}

setInterval(checkSlot,1000);



/* ==========================================
NEW TEAM EFFECT
========================================== */

function teamEffect(){

teamList.animate([

{

transform:"scale(.96)",

opacity:.5

},

{

transform:"scale(1)",

opacity:1

}

],{

duration:300

});

}



/* ==========================================
UPDATE ADD TEAM
========================================== */

const oldAddTeam=addTeam;

addTeam=function(team){

if(teams.length>=maxTeam){

toast("Slot sudah penuh.");

return;

}

teams.push(team);

renderTeam();

teamEffect();

toast(

team.name+

" berhasil masuk."

);

};



/* ==========================================
BUTTON RIPPLE
========================================== */

document

.querySelectorAll("button,a")

.forEach(button=>{

button.addEventListener(

"click",

function(e){

const ripple=

document.createElement("span");

ripple.className="ripple";

const size=Math.max(

this.clientWidth,

this.clientHeight

);

ripple.style.width=size+"px";

ripple.style.height=size+"px";

ripple.style.left=

e.offsetX-size/2+"px";

ripple.style.top=

e.offsetY-size/2+"px";

this.appendChild(ripple);

setTimeout(()=>{

ripple.remove();

},600);

}

);

});



/* ==========================================
CARD ANIMATION
========================================== */

const observer=

new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add(

"fade-up"

);

}

});

});

document

.querySelectorAll(".card")

.forEach(card=>{

observer.observe(card);

});



/* ==========================================
MOUSE GLOW
========================================== */

document

.querySelectorAll(".card")

.forEach(card=>{

card.addEventListener(

"mousemove",

e=>{

const rect=

card.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

card.style.background=

`radial-gradient(circle at ${x}px ${y}px,
rgba(248,198,48,.12),
rgba(13,18,38,.85) 45%)`;

});

card.addEventListener(

"mouseleave",

()=>{

card.style.background="";

});

});
/* ==========================================
AUTO DRAW MATCH
========================================== */

let bracketData = [];

function shuffle(array){

for(let i=array.length-1;i>0;i--){

const j=Math.floor(Math.random()*(i+1));

[array[i],array[j]]=[array[j],array[i]];

}

return array;

}

function generateBracket(){

if(teams.length < 2){

return;

}

const randomTeams = [...teams];

shuffle(randomTeams);

bracketData=[];

for(let i=0;i<randomTeams.length;i+=2){

bracketData.push({

round:"Quarter Final",

teamA:randomTeams[i]?.name || "BYE",

teamB:randomTeams[i+1]?.name || "BYE",

winner:null

});

}

renderBracket();

toast("🎲 Match berhasil diacak.");

}



/* ==========================================
RENDER BRACKET
========================================== */

function renderBracket(){

const bracket=document.getElementById("bracket");

bracket.innerHTML="";

if(bracketData.length===0){

bracket.innerHTML=`

<div class="empty">

Bracket akan muncul setelah pendaftaran ditutup.

</div>

`;

return;

}

bracketData.forEach((match,index)=>{

const card=document.createElement("div");

card.className="match";

card.innerHTML=`

<div class="match-title">

${match.round}

</div>

<div class="team-name">

<span>${match.teamA}</span>

</div>

<div class="team-name">

<span>${match.teamB}</span>

</div>

`;

bracket.appendChild(card);

});

}



/* ==========================================
AUTO DRAW
========================================== */

let drawDone=false;

setInterval(()=>{

if(

!registrationOpen &&

!drawDone &&

teams.length>1

){

drawDone=true;

generateBracket();

}

},1000);



/* ==========================================
MATCH STATUS
========================================== */

function updateStatus(){

if(registrationOpen){

statusText.innerHTML=

"🟢 REGISTRATION OPEN";

return;

}

if(drawDone){

statusText.innerHTML=

"🟠 MATCH READY";

}

}

setInterval(updateStatus,1000);



/* ==========================================
SIMULASI WINNER
========================================== */

function setWinner(matchIndex,winner){

if(!bracketData[matchIndex]){

return;

}

bracketData[matchIndex].winner=winner;

renderBracket();

}



/* ==========================================
ADMIN PREVIEW
========================================== */

window.scrim={

teams,

bracketData,

generateBracket,

setWinner,

renderBracket,

renderTeam

};



/* ==========================================
LIVE TEAM COUNTER
========================================== */

setInterval(()=>{

teamCounter.innerText=

`${teams.length} / ${maxTeam} Team`;

},1000);



/* ==========================================
LIVE CLOCK
========================================== */

function liveClock(){

const now=new Date();

const time=

now.toLocaleTimeString(

"id-ID",

{

hour:"2-digit",

minute:"2-digit",

second:"2-digit"

}

);

document.title=

`(${time}) SCRIM ARENA`;

}

setInterval(liveClock,1000);



/* ==========================================
READY FIREBASE
========================================== */

// Nanti firebase.js akan memanggil:
//
// addFirebaseTeam(team)
//
// loadFirebaseTeam()
//
// updateFirebaseBracket()
//
// jadi script ini tidak perlu diubah lagi.



console.log("SCRIM ARENA READY");
