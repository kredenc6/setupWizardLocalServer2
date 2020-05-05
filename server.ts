import express from "express";
import gitP from "simple-git/promise";
 

const git = gitP("./testRepo");
// const status: StatusResult = await git.status();

const PORT = process.env.PORT || 5005;
const app = express();

// app.listen(() => console.log(`Server listening on port: ${PORT}.`));

async function status() {
  let statusSummary = null;
  try {
     statusSummary = await git.status();
  }
  catch (e) {
    console.log(e);
     // handle the error
  }
  
  return statusSummary;
}

async function add(fileNames: string | string[]) {
  try {
     await git.add(fileNames);
  }
  catch (e) {
    console.log(e);
     // handle the error
  }
  
  return status();
}


// status()                                      // status
// .then(statusSummary => {
//   console.log(statusSummary);
//   if(statusSummary?.not_added.length) {
//     add(statusSummary.not_added)              // add...
//     .then((statusSummary) => {
//       console.log(statusSummary);
//     })
//     .catch(err => console.log(err));
//   }
//   else if(statusSummary?.files.length) {             // ...or commit
//     git.commit(`randomKey: ${randomKey()}`)
//     .then(commitMessage => {
//       console.log("commited");
//       // console.log(commitMessage);
//       git.push()                              // push
//       .then(pushMessage => {
//         console.log("pushed");
//         // console.log(pushMessage);
//       })
//       .catch(err => console.log(err));
//     })
//     .catch(err => console.log(err));
//   }
// })
// .catch(err => console.log(err));

status()
.then(statusSummary => console.log(statusSummary))
.catch(err => console.log(err));

function randomKey() {
  return Math.random().toString();
}