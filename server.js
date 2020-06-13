"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
exports.__esModule = true;
var express = require("express");
var axios_1 = require("axios");
var fs = require("fs");
var simplegit = require("simple-git/promise");
var gitFunctions_1 = require("./git/gitFunctions");
var gitSetup_1 = require("./git/gitSetup");
var filesInWritingProgress = [];
// const REMOTE_REPO = "https://www.github.com/norakomi/resources_guru_config_json_files.git";
// const REPO_DIR_NAME = "resources_guru_config_json_files";
// export const GIT_REPO_PATH = `./jsonRepos/${REPO_DIR_NAME}`;
// const JSON_FILES_PATH = `${GIT_REPO_PATH}/UnpublishedApps`;
var REMOTE_REPO = "https://github.com/norakomi/Circle-CI-Android-test-app.git";
var REPO_DIR_NAME = "Circle-CI-Android-test-app.git";
exports.GIT_REPO_PATH = "./jsonRepos/" + REPO_DIR_NAME;
var JSON_FILES_PATH = exports.GIT_REPO_PATH + "/unpublishedJsons";
// const REMOTE_REPO = "https://www.github.com/kredenc6/testRepo.git";
// const REPO_DIR_NAME = "testRepo";
// export const GIT_REPO_PATH = `./jsonRepos/${REPO_DIR_NAME}`;
// const JSON_FILES_PATH = `${GIT_REPO_PATH}`;
server();
function server() {
    return __awaiter(this, void 0, void 0, function () {
        // *********************
        // ** HELP FUNCTIONS **
        function getJsonFileNames(path) {
            var e_1, _a;
            return __awaiter(this, void 0, void 0, function () {
                var jsonFileNames, fileNames, fileNames_1, fileNames_1_1, fileName, e_1_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            jsonFileNames = [];
                            return [4 /*yield*/, fs.promises.readdir(path)];
                        case 1:
                            fileNames = _b.sent();
                            _b.label = 2;
                        case 2:
                            _b.trys.push([2, 7, 8, 13]);
                            fileNames_1 = __asyncValues(fileNames);
                            _b.label = 3;
                        case 3: return [4 /*yield*/, fileNames_1.next()];
                        case 4:
                            if (!(fileNames_1_1 = _b.sent(), !fileNames_1_1.done)) return [3 /*break*/, 6];
                            fileName = fileNames_1_1.value;
                            if (fileName.endsWith(".json")) {
                                jsonFileNames.push(fileName.substring(0, fileName.length - 5));
                            }
                            _b.label = 5;
                        case 5: return [3 /*break*/, 3];
                        case 6: return [3 /*break*/, 13];
                        case 7:
                            e_1_1 = _b.sent();
                            e_1 = { error: e_1_1 };
                            return [3 /*break*/, 13];
                        case 8:
                            _b.trys.push([8, , 11, 12]);
                            if (!(fileNames_1_1 && !fileNames_1_1.done && (_a = fileNames_1["return"]))) return [3 /*break*/, 10];
                            return [4 /*yield*/, _a.call(fileNames_1)];
                        case 9:
                            _b.sent();
                            _b.label = 10;
                        case 10: return [3 /*break*/, 12];
                        case 11:
                            if (e_1) throw e_1.error;
                            return [7 /*endfinally*/];
                        case 12: return [7 /*endfinally*/];
                        case 13: return [2 /*return*/, jsonFileNames];
                    }
                });
            });
        }
        function getJsonFiles(path, fileNames) {
            return __awaiter(this, void 0, void 0, function () {
                var jsonBufferFiles, _i, fileNames_2, fileName, _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            jsonBufferFiles = [];
                            _i = 0, fileNames_2 = fileNames;
                            _c.label = 1;
                        case 1:
                            if (!(_i < fileNames_2.length)) return [3 /*break*/, 4];
                            fileName = fileNames_2[_i];
                            _b = (_a = jsonBufferFiles).push;
                            return [4 /*yield*/, fs.promises.readFile("" + path + fileName)];
                        case 2:
                            _b.apply(_a, [_c.sent()]);
                            _c.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/, jsonBufferFiles.map(function (buffer) { return buffer.toString(); })];
                    }
                });
            });
        }
        function saveJsonFile(path, json) {
            return __awaiter(this, void 0, void 0, function () {
                function removeFromWritingInProgress(path) {
                    var fileIndex = filesInWritingProgress.findIndex(function (filePath) { return filePath === path; });
                    if (fileIndex !== -1) {
                        filesInWritingProgress.splice(fileIndex, 1);
                    }
                }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (filesInWritingProgress.includes(path))
                                return [2 /*return*/, false];
                            filesInWritingProgress.push(path);
                            return [4 /*yield*/, fs.promises.writeFile(path, json)
                                    .then(function () {
                                    removeFromWritingInProgress(path);
                                    return true;
                                })["catch"](function (err) {
                                    console.log(err.message);
                                    removeFromWritingInProgress(path);
                                    return false;
                                })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        }
        var git, _a, PORT, app;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = simplegit;
                    return [4 /*yield*/, gitSetup_1["default"](REMOTE_REPO, exports.GIT_REPO_PATH)];
                case 1:
                    git = _a.apply(void 0, [_b.sent()]);
                    PORT = process.env.PORT || 5005;
                    app = express();
                    app.use(express.json());
                    app.use("/verify", express.text());
                    app.use(function (_, res, next) {
                        res.header("Access-Control-Allow-Origin", "*");
                        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                        next();
                    });
                    // ** PAGE EXISTENCE VERIFICATION **
                    app.post("/verify", function (req, res) {
                        axios_1["default"].get(req.body)
                            .then(function (axiosResponse) { var _a; return res.sendStatus(((_a = axiosResponse) === null || _a === void 0 ? void 0 : _a.status) || 500); })["catch"](function (err) {
                            var _a;
                            typeof ((_a = err.response) === null || _a === void 0 ? void 0 : _a.status) === "number" ?
                                res.sendStatus(err.response.status)
                                :
                                    res.sendStatus(500);
                        });
                    });
                    // *********************
                    // ** FILE HANDLING **
                    app.post("/saveJson", function (req, res, next) {
                        var file = req.body;
                        saveJsonFile(JSON_FILES_PATH + "/" + file.name, JSON.stringify(file.data, null, 2))
                            .then(function (success) { return res.json({ fileName: file.name, savedSuccessfully: success }); });
                    });
                    app.get("/jsonFileNames", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    _b = (_a = res).json;
                                    return [4 /*yield*/, getJsonFileNames(JSON_FILES_PATH)];
                                case 1:
                                    _b.apply(_a, [_c.sent()]);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    app.get("/jsonFiles", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var fileNames, _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0: return [4 /*yield*/, getJsonFileNames(JSON_FILES_PATH)];
                                case 1:
                                    fileNames = _c.sent();
                                    _b = (_a = res).json;
                                    return [4 /*yield*/, getJsonFiles(JSON_FILES_PATH, fileNames.map(function (fileName) { return "/" + fileName + ".json"; }))];
                                case 2:
                                    _b.apply(_a, [_c.sent()]);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    // *********************
                    // ** GITHUB HANDLING **
                    app.get("/gitRepo/status", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var wasFetchSuccessful, status, _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, gitFunctions_1.gitFetch(git)];
                                case 1:
                                    wasFetchSuccessful = _b.sent();
                                    if (!wasFetchSuccessful) return [3 /*break*/, 3];
                                    return [4 /*yield*/, gitFunctions_1.gitStatus(git)];
                                case 2:
                                    _a = _b.sent();
                                    return [3 /*break*/, 4];
                                case 3:
                                    _a = null;
                                    _b.label = 4;
                                case 4:
                                    status = _a;
                                    res.json(status);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    app.post("/gitRepo/commit", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var filesToCommit, commitMessage, commitedFilesCount, commitSummary;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    filesToCommit = req.body.files;
                                    commitMessage = req.body.message;
                                    commitedFilesCount = 0;
                                    if (!filesToCommit.length) return [3 /*break*/, 2];
                                    return [4 /*yield*/, gitFunctions_1.gitAdd(git, filesToCommit)];
                                case 1:
                                    commitedFilesCount = _a.sent();
                                    _a.label = 2;
                                case 2: return [4 /*yield*/, gitFunctions_1.gitCommit(git, commitMessage)];
                                case 3:
                                    commitSummary = _a.sent();
                                    res.json({ commitedFilesCount: commitedFilesCount, commitSummary: commitSummary });
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    app.post("/gitRepo/push", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var status;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, gitFunctions_1.gitPush(git)];
                                case 1:
                                    status = _a.sent();
                                    res.json({ success: status });
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    app.get("/gitRepo/merge", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var mergeSummary;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, gitFunctions_1.gitMerge(git)];
                                case 1:
                                    mergeSummary = _a.sent();
                                    res.json(mergeSummary);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    // *********************
                    // ** SERVER TEST AND START **
                    app.get("/", function (req, res) { return res.send("We're back baby!"); });
                    app.listen(PORT, function () { return console.log("Server listening on port: " + PORT + "."); });
                    return [2 /*return*/];
            }
        });
    });
}
// *********************
