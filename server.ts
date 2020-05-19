import * as express from "express";
import * as simplegit from "simple-git/promise";
 
const git = simplegit("./testRepo");

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

async function addAll( statusSummary: simplegit.StatusResult | null) {
  if(!statusSummary) return;
  const { not_added, created, deleted, modified, renamed } = statusSummary;
  const allChanges = [
      ...not_added,
      ...created,
      ...deleted,
      ...modified,
      ...renamed.map(renamedFile => renamedFile.to)
  ];
  try {
     await git.add(allChanges);
  }
  catch (e) {
    console.log(e);
     // handle the error
  }
  
  return status();
}


status()                                        // status
.then(statusSummary => {
  console.log(statusSummary);
  // if(statusSummary?.files.length) {
  //   addAll(statusSummary)                       // add...
  //   .then(statusSummary => {
  //     console.log(statusSummary);
  //   })
  //   .catch(err => console.log(err));
  // }
  // else if(statusSummary?.files.length) {             // ...or commit
  //   git.commit(`randomKey: ${randomKey()}`)
  //   .then(commitMessage => {
  //     console.log("commited");
  //     // console.log(commitMessage);
  //     git.push()                                  // push
  //     .then(pushMessage => {
  //       console.log("pushed");
  //       // console.log(pushMessage);
  //     })
  //     .catch(err => console.log(err));
  //   })
  //   .catch(err => console.log(err));
  // }
})
.catch(err => console.log(err));

// git.commit(`randomkey: ${randomKey()}`)
// .then(() => {
//   status()
//   .then(statusSummary => console.log(statusSummary))
//   .catch(err => console.log(err));
// })
// .catch(err => console.log(err));

function randomKey() {
  return Math.random().toString();
}
