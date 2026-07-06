# Setup — one-time, ~15 minutes

## 1. Create the Firebase project
- Go to console.firebase.google.com → Add project (name it anything). Skip Analytics.

## 2. Get your web config
- In the project: gear icon → Project settings → "Your apps" → click the `</>` (Web) icon → register app (no hosting needed).
- Copy the `apiKey`, `authDomain`, `projectId` values into `config.js`.
- Also in `config.js`: set `TEACHER_EMAIL` to your own email.

## 3. Turn on login
- Build → Authentication → Get started → Sign-in method → enable **Email/Password**.
- Users tab → **Add user** → create YOUR account (the teacher email) and one account per student. You set their passwords and just tell them.

## 4. Turn on the database
- Build → Firestore Database → Create database → Start in **production mode** → pick a US region.
- Rules tab → replace everything with the rules below → Publish.

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Students: read/write only their own answers
    match /students/{uid}/answers/{doc} {
      allow read, write: if request.auth != null
        && (request.auth.uid == uid
            || request.auth.token.email == 'tojamesjwkim@gmail.com');
    }

    // Teacher: read everyone's answers (collection group query)
    match /{path=**}/answers/{doc} {
      allow read: if request.auth != null
        && request.auth.token.email == 'tojamesjwkim@gmail.com';
    }
  }
}
```

(Replace `YOUR_TEACHER_EMAIL_HERE` in BOTH places — keep the quotes.)

## 5. Put your real content in
- `worksheets.js`: replace the sample questions, paste your slideshow link.
- Add ws2–ws5 by copying the block.

## 6. Deploy
- Push the folder to a GitHub repo → Settings → Pages → deploy from main branch.
- (Works locally too: `python3 -m http.server` in the folder → open localhost:8000. Opening the file directly with file:// will NOT work — Firebase needs http.)
- Firebase → Authentication → Settings → Authorized domains → add your `yourname.github.io` domain if login complains.

## Day-to-day
- Student: opens the site → logs in → picks worksheet → types → Save. "Start new attempt" for a redo; old attempts stay.
- You: log in with the teacher email → "Teacher view" link appears → see every save, filter by worksheet, print.

## Notes
- Free tier limits are 50k reads / 20k writes per DAY. A handful of students won't get near 1% of that.
- The repo can be public — the Firebase config values are not secrets; the security rules are what protect the data.
