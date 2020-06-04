import * as fs from "fs";
import { gitClone } from "./gitFunctions";
const prompt = require("prompt");

interface PromptLogin {
  continue: "y" | "n"
};

interface PromptLoginCredentials {
  name: string,
  password: string
};

export default async function gitSetup(remoteRepo: string, localRepoPath: string) {
  if(!fs.existsSync(localRepoPath)) {
    console.log("Did not find required local repo.");
    console.log("Remote repo cloning started.");
    let wasCloningSuccessful = await gitClone(remoteRepo, localRepoPath);

    if(wasCloningSuccessful) {
      console.log("Cloning repo was successful.");
      return localRepoPath;
    }

    console.log("Cloning repo failed. It's possible it was deleted or is private.");

    const wantLogin = await promptLogin(); // ask to login
    if(!wantLogin || wantLogin.continue === "n") return undefined;

    const gitHubCredentials = await promptLoginCredentials(); // ask for GitHub credentials
    if(!gitHubCredentials) return undefined;

    // attempt to clone the repo again using given github credentials
    const remoteRepoName = remoteRepo.slice(remoteRepo.lastIndexOf("/") + 1);
    const remoteRepoAddressWithLogin = `https://${gitHubCredentials.name}:${gitHubCredentials.password}@github.com/${gitHubCredentials.name}/${remoteRepoName}`;
    wasCloningSuccessful = await gitClone(remoteRepoAddressWithLogin, localRepoPath);

    if(!wasCloningSuccessful) {
      console.log("Cloning repo failed.");
      return undefined;
    }
    console.log("Cloning repo was successful.");
    return localRepoPath;
  }
  return localRepoPath;
}

const promptLogin = async (): Promise<PromptLogin | null> => {
  const promptSchema = {
    properties: {
        continue: {
          message: "Would you like to try again with GitHub login?(y/n)",
          required: true,
          pattern: /[yYnN]/
        }
    }
  };
  return new Promise(resolve => {
    console.log(promptSchema.properties.continue.message);
    prompt.start();
    prompt.get(promptSchema, (err: Error, result: PromptLogin) => {
      if(err) {
        console.error("Prompt error.");
        console.log(err.message);
        resolve(null);
      }
      resolve(result);
    })
  })
}

const promptLoginCredentials = async (): Promise<PromptLoginCredentials | null> => {
  const promptSchema = {
    properties: {
      name: {
        message: "Enter your username or email on GitHub.",
        required: true
      },
      password: {
        message: "Enter your GitHub password.",
        hidden: true,
        required: true
      }
    }
  };
  return new Promise(resolve => {
    console.log("Please enter your GitHub credentials.");
    prompt.start();
    prompt.get(promptSchema, (err: Error, result: PromptLoginCredentials) => {
      if(err) {
        console.error("Prompt error.");
        console.log(err.message);
        resolve(null);
      }
      resolve(result);
    })
  });
}