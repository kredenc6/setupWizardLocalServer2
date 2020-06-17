import * as simplegit from "simple-git/promise";
import { SimpleGit } from "simple-git/promise";

export async function gitAdd(git: SimpleGit, files: string | string[]) {
  try {
     await git.add(files);
  }
  catch (e) {
    console.log(e);
     return -1;
  }
  
  return typeof files === "string" ? 1 : files.length;
}

export async function gitClone(remoteRepo: string, localPath: string) {
  let cloneSuccessful = false;
  await simplegit().clone(remoteRepo, localPath)
    .then((cloneStatus) => {
      console.log(cloneStatus);
      cloneSuccessful = true;
    })
    .catch(err => console.log(err));
  return cloneSuccessful;
}

export async function gitFetch(git: SimpleGit) {
  let fetchSuccessful = false;
  await git.fetch()
    .then(() => fetchSuccessful = true)
    .catch(err => console.log(err));
  return fetchSuccessful;
}

export async function gitMerge(git: SimpleGit) {
  const mergeOptions = { "--commit": true };
  let mergeSummary = null;
  
  try {
    mergeSummary = await git.merge(mergeOptions);
  } catch(err) {
    console.log(err.message);
  }
  return mergeSummary;
}

export async function gitCommit(git: SimpleGit, commitMsg: string) {
  let commitSummary = null;
  try {
    commitSummary = await git.commit(commitMsg);
  }
  catch (e) {
    console.log(e);
  }
  return commitSummary;
}

export async function gitPull(git: SimpleGit) {
  let pullSummary = null;
  try {
    pullSummary = await git.pull();
  }
  catch (e) {
    console.log(e);
  }
  return pullSummary;
}

export async function gitPush(git: SimpleGit) {
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

export async function gitStatus(git: SimpleGit) {
  let statusSummary = null;
  try {
     statusSummary = await git.status();
  }
  catch (e) {
    console.log(e);
  }
  
  return statusSummary;
}