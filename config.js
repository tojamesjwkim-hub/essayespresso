// ---- EDIT THESE TWO THINGS ----

// 1. Paste your Firebase web app config here (see SETUP.md, step 2)
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBmzSb3E2Hw1C0J3VnYcqRYRcHZkv0vGQoE",
  authDomain: "essay-espresso.firebaseapp.com",
  projectId: "essay-espresso",
};

// 2. Your login email. Only this account can open teacher.html
const TEACHER_EMAIL = "tojamesjwkim@gmail.com";

// ---- No edits needed below ----

firebase.initializeApp(FIREBASE_CONFIG);
const auth = firebase.auth();
const db = firebase.firestore();

// Redirects to index.html if not logged in; runs cb(user) if logged in
function requireLogin(cb) {
  auth.onAuthStateChanged(function (user) {
    if (!user) { window.location.href = "index.html"; return; }
    cb(user);
  });
}

function logout() {
  auth.signOut().then(function () { window.location.href = "index.html"; });
}

function fmtTime(ts) {
  if (!ts) return "";
  var d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleString();
}
