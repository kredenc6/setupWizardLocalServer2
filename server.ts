import * as express from "express";
import axios from "axios";
import * as fs from "fs";
import * as simplegit from "simple-git/promise";
import { gitAdd, gitCommit, gitFetch, gitMerge, gitPush, gitStatus } from "./git/gitFunctions";
import gitSetup from "./git/gitSetup";

const filesInWritingProgress: string[] = [];
const REMOTE_REPO = "https://www.github.com/norakomi/resources_guru_config_json_files.git";
const REPO_DIR_NAME = "resources_guru_config_json_files";
export const GIT_REPO_PATH = `./jsonRepos/${REPO_DIR_NAME}`;
const JSON_FILES_PATH = `${GIT_REPO_PATH}/UnpublishedApps`;

// const REMOTE_REPO = "https://www.github.com/kredenc6/testRepo.git";
// const REPO_DIR_NAME = "testRepo";
// export const GIT_REPO_PATH = `./jsonRepos/${REPO_DIR_NAME}`;
// const JSON_FILES_PATH = `${GIT_REPO_PATH}`;

server();

async function server() {
  const git = simplegit(await gitSetup(REMOTE_REPO, GIT_REPO_PATH));
  const PORT = process.env.PORT || 5005;
  const app = express();
  app.use(express.json());
  app.use("/verify", express.text());
  app.use((_, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  // ** PAGE EXISTENCE VERIFICATION **
  
  app.post("/verify", (req, res) => {
    axios.get(req.body)
      .then(axiosResponse => res.sendStatus(axiosResponse?.status || 500))
      .catch(err => {
        typeof err.response?.status === "number" ? 
          res.sendStatus(err.response.status)
          :
          res.sendStatus(500);
      });
    });
    
    // *********************


    // ** FILE HANDLING **
    
    app.post("/saveJson", (req, res, next) => {
      const file = req.body;
      saveJsonFile(`${JSON_FILES_PATH}/${file.name}`, JSON.stringify(file.data, null, 2))
      .then(success => res.json({ fileName: file.name, savedSuccessfully: success }));
    });

    app.get("/jsonFileNames", async (req, res) => {
      res.json(await getJsonFileNames(JSON_FILES_PATH));
    });
    
    app.get("/jsonFiles", async (req, res) => {
      const fileNames = await getJsonFileNames(JSON_FILES_PATH);
      res.json( await getJsonFiles(JSON_FILES_PATH, fileNames.map(fileName => `/${fileName}.json`)));
    });
    
    // *********************
    

    // ** GITHUB HANDLING **

    app.get("/gitRepo/status", async (req, res) => {
    const wasFetchSuccessful = await gitFetch(git);
    const status = wasFetchSuccessful ? await gitStatus(git) : null;
    res.json(status);
  });
  
  app.post("/gitRepo/commit", async (req, res) => {
    const filesToCommit = req.body.files as string[];
    const commitMessage = req.body.message as string;
    let commitedFilesCount = 0;
    if(filesToCommit.length) {
      commitedFilesCount = await gitAdd(git, filesToCommit);
    }
    const commitSummary = await gitCommit(git, commitMessage);
    res.json({ commitedFilesCount, commitSummary });
  });

  app.post("/gitRepo/push", async (req, res) => {
    const status = await gitPush(git);
    res.json({ success: status });
  });
  
  app.get("/gitRepo/merge", async (req, res) => {
    const mergeSummary = await gitMerge(git);
    res.json(mergeSummary);
  });
  
  // *********************
  
  
  // ** SERVER TEST AND START **
  
  app.get("/", (req, res) => res.send("We're back baby!"));
  
  app.listen(PORT, () => console.log(`Server listening on port: ${PORT}.`));
  
  // *********************
  

  // ** HELP FUNCTIONS **

  async function getJsonFileNames(path: string) {
    const jsonFileNames = [];
    const fileNames = await fs.promises.readdir(path);
    for await(const fileName of fileNames) {
      if(fileName.endsWith(".json")) {
        jsonFileNames.push(fileName.substring(0, fileName.length - 5));
      }
    }
    return jsonFileNames;
  }

  async function getJsonFiles(path: string, fileNames: string[]) {
    const jsonBufferFiles: Buffer[] = [];
    for(const fileName of fileNames) {
      jsonBufferFiles.push(await fs.promises.readFile(`${path}${fileName}`));
    }
    return jsonBufferFiles.map(buffer => buffer.toString());
  }

  async function saveJsonFile(path: string, json: string) {
    if(filesInWritingProgress.includes(path)) return false;
    filesInWritingProgress.push(path);

    return await fs.promises.writeFile(path, json)
      .then(() => {
        removeFromWritingInProgress(path);
        return true;
      })
      .catch(err => {
        console.log(err.message);
        removeFromWritingInProgress(path);
        return false;
      });

    function removeFromWritingInProgress(path: string) {
      const fileIndex = filesInWritingProgress.findIndex(filePath => filePath === path);
      if(fileIndex !== -1) {
        filesInWritingProgress.splice(fileIndex, 1);
      }
    }
  }
}

// *********************