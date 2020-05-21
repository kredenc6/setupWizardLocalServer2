import * as express from "express";
import * as simplegit from "simple-git/promise";
import axios from "axios";
import * as fs from "fs";
import { gitAdd, gitCommit, gitFetch, gitMerge, gitPush, gitStatus } from "./gitFunctions/gitFunctions";

const filesInWritingProgress: string[] = [];
const REPO_DIR_NAME = "testRepo";
const GIT_REPO_PATH = `./${REPO_DIR_NAME}`;
 
export const git = simplegit(GIT_REPO_PATH);

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

app.post("/saveJson", (req, res, next) => {
  const file = req.body;
  saveJsonFile(`${GIT_REPO_PATH}/${file.name}`, JSON.stringify(file.data, null, 2))
    .then(success => res.json({ fileName: file.name, savedSuccessfully: success }));
});

app.get("/gitRepo/status", async (req, res) => {
  const wasFetchSuccessful = await gitFetch();
  const status = wasFetchSuccessful ? await gitStatus() : null;
  res.json(status);
});

app.post("/gitRepo/commit", async (req, res) => {
  const filesToAdd = req.body.files as string[];
  const commitMessage = req.body.message as string;
  let addedFilesCount = 0;
  if(filesToAdd.length) {
    addedFilesCount = await gitAdd(filesToAdd);
  }
  const commitSummary = await gitCommit(commitMessage);

  res.json({ addedFilesCount, commitSummary });
});

app.post("/gitRepo/push", async (req, res) => {
  const status = await gitPush();
  res.json({ success: status });
});

app.get("/gitRepo/merge", async (req, res) => {
  const mergeSummary = await gitMerge();
  res.json(mergeSummary);
});

app.get("/jsonFileNames", async (req, res) => {
  res.json(await getJsonFileNames(GIT_REPO_PATH));
});

app.get("/jsonFiles", async (req, res) => {
  const fileNames = await getJsonFileNames(GIT_REPO_PATH);
  res.json( await getJsonFiles(GIT_REPO_PATH, fileNames.map(fileName => `/${fileName}.json`)));
});

app.get("/", (req, res) => res.send("We're back baby!"));

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}.`));

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