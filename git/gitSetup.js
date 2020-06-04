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
exports.__esModule = true;
var fs = require("fs");
var gitFunctions_1 = require("./gitFunctions");
var prompt = require("prompt");
;
;
function gitSetup(remoteRepo, localRepoPath) {
    return __awaiter(this, void 0, void 0, function () {
        var wasCloningSuccessful, wantLogin, gitHubCredentials, remoteRepoName, remoteRepoAddressWithLogin;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!fs.existsSync(localRepoPath)) return [3 /*break*/, 5];
                    console.log("Did not find required local repo.");
                    console.log("Remote repo cloning started.");
                    return [4 /*yield*/, gitFunctions_1.gitClone(remoteRepo, localRepoPath)];
                case 1:
                    wasCloningSuccessful = _a.sent();
                    if (wasCloningSuccessful) {
                        console.log("Cloning repo was successful.");
                        return [2 /*return*/, localRepoPath];
                    }
                    console.log("Cloning repo failed. It's possible it was deleted or is private.");
                    return [4 /*yield*/, promptLogin()];
                case 2:
                    wantLogin = _a.sent();
                    if (!wantLogin || wantLogin["continue"] === "n")
                        return [2 /*return*/, undefined];
                    return [4 /*yield*/, promptLoginCredentials()];
                case 3:
                    gitHubCredentials = _a.sent();
                    if (!gitHubCredentials)
                        return [2 /*return*/, undefined];
                    remoteRepoName = remoteRepo.slice(remoteRepo.lastIndexOf("/") + 1);
                    remoteRepoAddressWithLogin = "https://" + gitHubCredentials.name + ":" + gitHubCredentials.password + "@github.com/" + gitHubCredentials.name + "/" + remoteRepoName;
                    return [4 /*yield*/, gitFunctions_1.gitClone(remoteRepoAddressWithLogin, localRepoPath)];
                case 4:
                    wasCloningSuccessful = _a.sent();
                    if (!wasCloningSuccessful) {
                        console.log("Cloning repo failed.");
                        return [2 /*return*/, undefined];
                    }
                    console.log("Cloning repo was successful.");
                    return [2 /*return*/, localRepoPath];
                case 5: return [2 /*return*/, localRepoPath];
            }
        });
    });
}
exports["default"] = gitSetup;
var promptLogin = function () { return __awaiter(void 0, void 0, void 0, function () {
    var promptSchema;
    return __generator(this, function (_a) {
        promptSchema = {
            properties: {
                "continue": {
                    message: "Would you like to try again with GitHub login?(y/n)",
                    required: true,
                    pattern: /[yYnN]/
                }
            }
        };
        return [2 /*return*/, new Promise(function (resolve) {
                console.log(promptSchema.properties["continue"].message);
                prompt.start();
                prompt.get(promptSchema, function (err, result) {
                    if (err) {
                        console.error("Prompt error.");
                        console.log(err.message);
                        resolve(null);
                    }
                    resolve(result);
                });
            })];
    });
}); };
var promptLoginCredentials = function () { return __awaiter(void 0, void 0, void 0, function () {
    var promptSchema;
    return __generator(this, function (_a) {
        promptSchema = {
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
        return [2 /*return*/, new Promise(function (resolve) {
                console.log("Please enter your GitHub credentials.");
                prompt.start();
                prompt.get(promptSchema, function (err, result) {
                    if (err) {
                        console.error("Prompt error.");
                        console.log(err.message);
                        resolve(null);
                    }
                    resolve(result);
                });
            })];
    });
}); };
