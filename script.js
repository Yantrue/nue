// ===============================
// SCRIM ARENA
// ===============================

// GANTI TANGGAL EVENT DI SINI
const targetDate = new Date("2026-07-20T19:00:00").getTime();

const countdown = () => {

    const now = new Date().getTime();

    const distance = targetDate - now;

    if(distance <= 0){

        document.querySelector(".countdown").innerHTML = `
            <div class="live-now">
                🔴 LIVE NOW
            </div>
        `;

        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60))
        / (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60))
        / 1000
    );

    updateNumber("days", days);
    updateNumber("hours", hours);
    updateNumber("minutes", minutes);
    updateNumber("seconds", seconds);

}

setInterval(countdown,1000);

countdown();


// ===============================
// ANIMASI ANGKA
// ===============================

function updateNumber(id,value){

    const el = document.getElementById(id);

    const newValue = String(value).padStart(2,"0");

    if(el.innerText !== newValue){

        el.style.transform = "scale(1.2)";
        el.style.color = "#ffffff";

        setTimeout(()=>{

            el.innerText = newValue;

            el.style.transform = "scale(1)";
            el.style.color = "";

        },120);

    }

}



// ===============================
// FORM WA
// ===============================

document
.getElementById("scrimForm")
.addEventListener("submit",(e)=>{

e.preventDefault();

const team =
document.getElementById("teamName").value;

const rank =
document.getElementById("avgRank").value;

const captain =
document.getElementById("captainName").value;

const wa =
document.getElementById("captainWa").value;

const notes =
document.getElementById("notes").value || "-";

const admin =
"6288210222618";

const message =

`🏆 *PENDAFTARAN SCRIM MLBB*

━━━━━━━━━━━━━━

🛡 Tim : ${team}

👤 Kapten : ${captain}

📱 WA : ${wa}

🏅 Rank : ${rank}

🕖 Jam : 19.00 WIB

📝 Catatan :

${notes}

━━━━━━━━━━━━━━

Halo Myu, tim kami ingin mengikuti scrim. Mohon konfirmasi ya.`;

window.open(

`https://wa.me/${admin}?text=${encodeURIComponent(message)}`,

"_blank"

);

});



// ===============================
// CARD MASUK SATU SATU
// ===============================

const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";

entry.target.style.transform="translateY(0)";

}

});

});

cards.forEach(card=>{

card.style.opacity="0";

card.style.transform="translateY(60px)";

card.style.transition=".8s";

observer.observe(card);

});



// ===============================
// PREMIUM MOUSE EFFECT
// ===============================

document.querySelectorAll(".card").forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect = card.getBoundingClientRect();

const x = e.clientX - rect.left;

const y = e.clientY - rect.top;

const rotateY = (x / rect.width - .5) * 8;

const rotateX = (y / rect.height - .5) * -8;

card.style.transform = `
perspective(800px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
translateY(-5px)
`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform="";

});

});



// ===============================
// LIVE TITLE BERKEDIP
// ===============================

const liveText = document.querySelector(".live-text");

setInterval(()=>{

liveText.style.opacity=".45";

setTimeout(()=>{

liveText.style.opacity="1";

},800);

},1800);



// ===============================
// BUTTON RIPPLE
// ===============================

document.querySelectorAll("button,a").forEach(btn=>{

btn.addEventListener("click",function(e){

const circle=document.createElement("span");

const size=Math.max(this.clientWidth,this.clientHeight);

circle.style.width=size+"px";
circle.style.height=size+"px";

circle.style.left=e.offsetX-size/2+"px";
circle.style.top=e.offsetY-size/2+"px";

circle.className="ripple";

this.appendChild(circle);

setTimeout(()=>{

circle.remove();

},600);

});

});
