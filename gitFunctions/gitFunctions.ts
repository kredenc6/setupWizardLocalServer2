import { git } from "../server";
import { CommitSummary, StatusResult } from "simple-git/promise";

interface Summary {
  upToDateWithRemoteRepo: boolean | null;
  pulledFromRemoteToSync: boolean;
  startStatusSummary: StatusResult | null;
  addedFiles: number;
  commitSummary: CommitSummary | null;
  pushSuccessful: boolean;
};

export async function gitAdd( files: string | string[]) {
  try {
     await git.add(files);
  }
  catch (e) {
    console.log(e);
     return -1;
  }
  
  return typeof files === "string" ? 1 : files.length;
}

export async function gitFetch() {
  let fetchSuccessful = false;
  await git.fetch()
    .then(() => fetchSuccessful = true)
    .catch(err => console.log(err));
  return fetchSuccessful;
}

export async function gitMerge() {
  const mergeOptions = { "--commit": true };
  let mergeSummary = null;
  await git.merge(mergeOptions)
    .then(summary => mergeSummary = summary)
    .catch(err => console.log(err));
  return mergeSummary;
}

export async function gitCommit(commitMsg: string) {
  let commitSummary = null;
  try {
    commitSummary = await git.commit(commitMsg);
  }
  catch (e) {
    console.log(e);
  }
  return commitSummary;
}

export async function gitPull() {
  let pullSuccesfull = false;
  try {
    const pullResponse = await git.pull();
    pullSuccesfull = true;
  }
  catch (e) {
    console.log(e);
  }
  return pullSuccesfull;
}

export async function gitPush() {
  let pushSuccesfull = false;
  try {
    await git.push();
    pushSuccesfull = true;
  }
  catch (e) {
    console.log(e);
  }
  return pushSuccesfull;
}

export async function gitStatus() {
  let statusSummary = null;
  try {
     statusSummary = await git.status();
  }
  catch (e) {
    console.log(e);
  }
  
  return statusSummary;
}

// export async function pull_add_commit_push_all(commitMsg: string) {
//   const summary: Summary = {
//     upToDateWithRemoteRepo: null,
//     pulledFromRemoteToSync: false,
//     startStatusSummary: null,
//     addedFiles: 0,
//     commitSummary: null,
//     pushSuccessful: false
//   };

//   summary.upToDateWithRemoteRepo = await isLocalRepoUpToDate(); // check if repo is up to date
//   if(summary.upToDateWithRemoteRepo === null) {
//     console.warn("Did not managed to get remote repo status. Exiting the function.");
//     return summary;
//   }
  
//   if(!summary.upToDateWithRemoteRepo) {
//     console.log("Local repo is out of date.");
//     const pullQuery = await queryRepoPull();  // ask user if he wants to update
//     if(pullQuery) {
//       summary.pulledFromRemoteToSync = await pull();
      
//       if(!summary.pulledFromRemoteToSync) {
//         console.warn("Pull fail. Exiting the function.");
//         return summary;
//       }
//     } else {
//       console.warn("Pull denied by user. Exiting the function.");
//       return summary;
//     }
//   }


//   summary.startStatusSummary = await status();
//   if(!summary.startStatusSummary) {
//     console.warn("Did not manage to get git status summary. Exiting the function.");
//     return summary;
//   }

//   summary.addedFiles = await addAll(summary.startStatusSummary.files);
//   if(summary.addedFiles === -1) {
//     console.warn("Add files failure. Exiting the function.");
//     return summary;
//   }

//   summary.commitSummary = await commit(commitMsg);
//   if(!summary.commitSummary) {
//     console.warn("Did not manage to commit files. Exiting the function.");
//     return summary;
//   }

//   summary.pushSuccessful = await push();
//   if(!summary.pushSuccessful) {
//     console.warn("Failed to push files. Exiting the function.");
//     return summary
//   }

//   console.log("Full repo update succefull!");
//   return summary;
// }