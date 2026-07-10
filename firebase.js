
// ===============================
// FIREBASE CONFIG
// ===============================

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    onSnapshot,
    doc,
    updateDoc,
    deleteDoc,
    getDocs
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDAEhGdpdtNpDKxi29KqNWq5wMle2cWNDc",
    authDomain: "nuee-926ff.firebaseapp.com",
    projectId: "nuee-926ff",
    storageBucket: "nuee-926ff.firebasestorage.app",
    messagingSenderId: "23464672643",
    appId: "1:23464672643:web:9e7e9a842f62050f630ab6"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

// ===============================
// COLLECTION
// ===============================

export const teamsRef = collection(db, "teams");

export const bracketRef = collection(db, "bracket");

export const settingsRef = collection(db, "settings");

// ===============================
// TEAM
// ===============================

export async function addTeam(team){

    await addDoc(teamsRef,team);

}

export function listenTeams(callback){

    onSnapshot(teamsRef,(snapshot)=>{

        const teams=[];

        snapshot.forEach(doc=>{

            teams.push({

                id:doc.id,

                ...doc.data()

            });

        });

        callback(teams);

    });

}

// ===============================
// BRACKET
// ===============================

export async function saveMatch(match){

    await addDoc(bracketRef,match);

}

export function listenBracket(callback){

    onSnapshot(bracketRef,(snapshot)=>{

        const matches=[];

        snapshot.forEach(doc=>{

            matches.push({

                id:doc.id,

                ...doc.data()

            });

        });

        callback(matches);

    });

}

// ===============================
// SETTINGS
// ===============================

export async function getSettings(){

    const snapshot=await getDocs(settingsRef);

    let settings={};

    snapshot.forEach(doc=>{

        settings={

            id:doc.id,

            ...doc.data()

        };

    });

    return settings;

}

export async function updateSettings(id,data){

    await updateDoc(doc(db,"settings",id),data);

}

console.log("Firebase Connected");
