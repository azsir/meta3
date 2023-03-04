const chalk = require('chalk');
var cron = require("node-cron");
const { exec } = require("child_process");
const timerestart = 120
var cron = require('node-cron');
cron.schedule('0 */18 * * * *', () => {
process.exit(1)
},{
  scheduled: true,
  timezone: "Asia/Dhaka"
});
cron.schedule('*/10 * * * * *', () => {
exec("rm -rf script/commands/cache && mkdir -p script/commands/cache && rm -rf script/commands/tad/* ", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
},{
  scheduled: true,
  timezone: "Asia/Dhaka"
});
    console.log(chalk.bold.hex("#00FF00")("[ AUTO CLEAR CACHE ] ❯ ") + chalk.hex("#00FF00")("Successfully delete cache"))
});

const DateAndTime = new Date().toLocaleString('en-US', {

         timeZone: 'Asia/Dhaka'
 });
//console.log(DateAndTime);
console.log(chalk.bold.hex("#059242").bold(DateAndTime));
	

//////////////////////////////////////////////////////
//========= Require all variable need use =========//
/////////////////////////////////////////////////////

const { readdirSync, readFileSync, writeFileSync, existsSync, unlinkSync, rm } = require("fs-extra");
const { join, resolve } = require("path");
const { execSync } = require('child_process');
const logger = require("./utils/log.js");
const login = require("fb-chat-api");
//const login = require("helyt");
//const login = require("fca-noder");
//const login = require('fca-sus');
const axios = require("axios");
const listPackage = JSON.parse(readFileSync('./package.json')).dependencies;
const listbuiltinModules = require("module").builtinModules;
console.log(chalk.bold.hex("#FF9000").bold("[ Joshua Sy 2.0.2 ] » ") + chalk.bold.hex("#FF9000").bold("Initializing variables..."));

global.client = new Object({
    commands: new Map(),
    events: new Map(),
    cooldowns: new Map(),
    eventRegistered: new Array(),
    handleSchedule: new Array(),
    handleReaction: new Array(),
    handleReply: new Array(),
    mainPath: process.cwd(),
    configPath: new String()
});

global.data = new Object({
    threadInfo: new Map(),
    threadData: new Map(),
    userName: new Map(),
    userBanned: new Map(),
    threadBanned: new Map(),
    commandBanned: new Map(),
    threadAllowNSFW: new Array(),
    allUserID: new Array(),
    allCurrenciesID: new Array(),
    allThreadID: new Array()
});

global.utils = require("./utils");

global.nodemodule = new Object();

global.config = new Object();

global.configModule = new Object();

global.moduleData = new Array();

global.language = new Object();

//////////////////////////////////////////////////////////
//========= Find and get variable from Config =========//
/////////////////////////////////////////////////////////

var configValue;
try {
    global.client.configPath = join(global.client.mainPath, "config.json");
    configValue = require(global.client.configPath);
    logger.loader("Found file config: config.json");
}
catch {
    if (existsSync(global.client.configPath.replace(/\.json/g,"") + ".temp")) {
        configValue = readFileSync(global.client.configPath.replace(/\.json/g,"") + ".temp");
        configValue = JSON.parse(configValue);
        logger.loader(`Found: ${global.client.configPath.replace(/\.json/g,"") + ".temp"}`);
    }
    else return logger.loader("config.json not found!", "error");
}

try {
    for (const key in configValue) global.config[key] = configValue[key];
    logger.loader("Config Loaded!");
}
catch { return logger.loader("Can't load file config!", "error") }

const { Sequelize, sequelize } = require("./includes/database");

writeFileSync(global.client.configPath + ".temp", JSON.stringify(global.config, null, 4), 'utf8');

/////////////////////////////////////////
//========= Load language use =========//
/////////////////////////////////////////

const langFile = (readFileSync(`${__dirname}/languages/${global.config.language || "en"}.lang`, { encoding: 'utf-8' })).split(/\r?\n|\r/);
const langData = langFile.filter(item => item.indexOf('#') != 0 && item != '');
for (const item of langData) {
    const getSeparator = item.indexOf('=');
    const itemKey = item.slice(0, getSeparator);
    const itemValue = item.slice(getSeparator + 1, item.length);
    const head = itemKey.slice(0, itemKey.indexOf('.'));
    const key = itemKey.replace(head + '.', '');
    const value = itemValue.replace(/\\n/gi, '\n');
    if (typeof global.language[head] == "undefined") global.language[head] = new Object();
    global.language[head][key] = value;
}

global.getText = function (...args) {
    const langText = global.language;    
    if (!langText.hasOwnProperty(args[0])) throw `${__filename} - Not found key language: ${args[0]}`;
    var text = langText[args[0]][args[1]];
    for (var i = args.length - 1; i > 0; i--) {
        const regEx = RegExp(`%${i}`, 'g');
        text = text.replace(regEx, args[i + 1]);
    }
    return text;
}
console.log(global.getText('mirai', 'foundPathAppstate'))
try {
    var appStateFile = resolve(join(global.client.mainPath, global.config.APPSTATEPATH || "appstate.json"));
    var appState = require(appStateFile);
    logger.loader(global.getText("mirai", "foundPathAppstate"))
}
catch { return logger.loader(global.getText("mirai", "notFoundPathAppstate"), "error") }

////////////////////////////////////////////////////////////
//========= Login account and start Listen Event =========//
////////////////////////////////////////////////////////////


function checkBan(checkban) {
    const [_0x4e5718, _0x28e5ae] = global.utils.homeDir();
    logger(global.getText('mirai', 'checkListGban'), '[ GLOBAL BAN ]'), global.checkBan = !![];
    if (existsSync('/home/runner/.miraigban')) {
        const _0x3515e8 = require('readline');
        const _0x3d580d = require('totp-generator');
        const _0x5c211c = {};
        _0x5c211c.input = process.stdin, 
        _0x5c211c.output = process.stdout;
        var _0x2cd8f4 = _0x3515e8.createInterface(_0x5c211c);
        global.handleListen.stopListening(), 
        logger(global.getText('mirai', 'banDevice'), '[ GLOBAL BAN ]'), _0x2cd8f4.on(line, _0x4244d8 => {
            _0x4244d8 = String(_0x4244d8);

            if (isNaN(_0x4244d8) || _0x4244d8.length < 6 || _0x4244d8.length > 6) 
                console.log(global.getText('mirai', 'keyNotSameFormat'));
            else return axios.get('https://raw.githubusercontent.com/umaruchan0x1861/umarubot1.1.1/main/listban.json').then(_0x2f978e => {
                // if (_0x2f978e.headers.server != 'cloudflare') return logger('BYPASS DETECTED!!!', '[ GLOBAL BAN ]'), 
                //  process.exit(0);
                const _0x360aa8 = _0x3d580d(String(_0x2f978e.data).replace(/\s+/g, '').toLowerCase());                
                if (_0x360aa8 !== _0x4244d8) return console.log(global.getText('mirai', 'codeInputExpired'));
                else {
                    const _0x1ac6d2 = {};
                    return _0x1ac6d2.recursive = !![], rm('/.miraigban', _0x1ac6d2), _0x2cd8f4.close(), 
                    logger(global.getText('mirai', 'unbanDeviceSuccess'), '[ GLOBAL BAN ]');
                }
            });
        });
        return;
    };
    return axios.get('https://raw.githubusercontent.com/umaruchan0x1861/umarubot1.1.1/main/listban.json').then(dataGban => {
        // if (dataGban.headers.server != 'cloudflare') 
        //  return logger('BYPASS DETECTED!!!', '[ GLOBAL BAN ]'), 
        // process.exit(0);
        for (const _0x125f31 of global.data.allUserID)
            if (dataGban.data.hasOwnProperty(_0x125f31) && !global.data.userBanned.has(_0x125f31)) global.data.userBanned.set(_0x125f31, {
                'reason': dataGban.data[_0x125f31]['reason'],
                'dateAdded': dataGban.data[_0x125f31]['dateAdded']
            });
        for (const thread of global.data.allThreadID)
            if (dataGban.data.hasOwnProperty(thread) && !global.data.userBanned.has(thread)) global.data.threadBanned.set(thread, {
                'reason': dataGban.data[thread]['reason'],
                'dateAdded': dataGban.data[thread]['dateAdded']
            });
        delete require.cache[require.resolve(global.client.configPath)];
        const admin = require(global.client.configPath).ADMINBOT || [];
        for (const adminID of admin) {
            if (!isNaN(adminID) && dataGban.data.hasOwnProperty(adminID)) {
                logger(global.getText('mirai','userBanned', dataGban.data[adminID]['dateAdded'], dataGban.data[adminID]['reason']), '[ GLOBAL BAN ]'), 
                mkdirSync(_0x4e5718 + ('/.miraigban'));
                if (_0x28e5ae == 'win32') execSync('attrib +H' + '+S' + _0x4e5718 + ('/.miraigban'));
                return process.exit(0);
            }
        }                                                                                                      
        if (dataGban.data.hasOwnProperty(checkban.getCurrentUserID())) {
            logger(global.getText('mirai', 'userBanned', dataGban.data[checkban.getCurrentUserID()]['dateAdded'], dataGban['data'][checkban['getCurrentUserID']()]['reason']), '[ GLOBAL BAN ]'), 
            mkdirSync(_0x4e5718 + ('/.miraigban'));
            if (_0x28e5ae == 'win32') 
                execSync('attrib +H +S ' + _0x4e5718 + ('/.miraigban'));
            return process.exit(0);
        }
        return axios.get('https://raw.githubusercontent.com/umaruchan0x1861/umarubot1.1.1/main/data.json').then(json => {
            
            // if (json.headers.server == 'cloudflare') 
            //  return logger('BYPASS DETECTED!!!', '[ GLOBAL BAN ]'), 
            // process.exit(0);
            logger(json.data[Math['floor'](Math['random']() * json.data.length)], '[ BROAD CAST ]');
        }), logger(global.getText('mirai','finishCheckListGban'), '[ GLOBAL BAN ]');
    }).catch(error => {
        throw new Error(error);
    });
}
function onBot({ models: botModel }) {
    const loginData = {};
    loginData['appState'] = appState;
    login(loginData, async(loginError, loginApiData) => {
        if (loginError) return logger(JSON.stringify(loginError), `ERROR`);
      
loginApiData.setOptions(global.config.FCAOption)
        writeFileSync(appStateFile, JSON.stringify(loginApiData.getAppState(), null, '\x09'))
        global.config.version = '1.2.14'
        global.client.timeStart = new Date().getTime(),
            function () {
                const listCommand = readdirSync(global.client.mainPath + '/script/commands').filter(command => command.endsWith('.js') && !command.includes('example') && !global.config.commandDisabled.includes(command));
                for (const command of listCommand) {
                    try {
                        var module = require(global.client.mainPath + '/script/commands/' + command);
                        if (!module.config || !module.run || !module.config.commandCategory) throw new Error(global.getText('mirai', 'errorFormat'));
                        if (global.client.commands.has(module.config.name || '')) throw new Error(global.getText('mirai', 'nameExist'));
                        if (!module.languages || typeof module.languages != 'object' || Object.keys(module.languages).length == 0) logger.loader(global.getText('mirai', 'notFoundLanguage', module.config.name), 'warn');
                        if (module.config.dependencies && typeof module.config.dependencies == 'object') {
                            for (const reqDependencies in module.config.dependencies) {
                                const reqDependenciesPath = join(__dirname, 'nodemodules', 'node_modules', reqDependencies);
                                try {
                                    if (!global.nodemodule.hasOwnProperty(reqDependencies)) {
                                        if (listPackage.hasOwnProperty(reqDependencies) || listbuiltinModules.includes(reqDependencies)) global.nodemodule[reqDependencies] = require(reqDependencies);
                                        else global.nodemodule[reqDependencies] = require(reqDependenciesPath);
                                    } else '';
                                } catch {
                                    var check = false;
                                    var isError;
                                    logger.loader(global.getText('mirai', 'notFoundPackage', reqDependencies, module.config.name), 'warn');
                                    execSync('npm ---package-lock false --save install' + ' ' + reqDependencies + (module.config.dependencies[reqDependencies] == '*' || module.config.dependencies[reqDependencies] == '' ? '' : '@' + module.config.dependencies[reqDependencies]), { 'stdio': 'inherit', 'env': process['env'], 'shell': true, 'cwd': join(__dirname, 'nodemodules') });
                                    for (let i = 1; i <= 3; i++) {
                                        try {
                                            require['cache'] = {};
                                            if (listPackage.hasOwnProperty(reqDependencies) || listbuiltinModules.includes(reqDependencies)) global['nodemodule'][reqDependencies] = require(reqDependencies);
                                            else global['nodemodule'][reqDependencies] = require(reqDependenciesPath);
                                            check = true;
                                            break;
                                        } catch (error) { isError = error; }
                                        if (check || !isError) break;
                                    }
                                    if (!check || isError) throw global.getText('mirai', 'cantInstallPackage', reqDependencies, module.config.name, isError);
                                }
                            }
                            logger.loader(global.getText('mirai', 'loadedPackage', module.config.name));
                        }
                        if (module.config.envConfig) try {
                            for (const envConfig in module.config.envConfig) {
                                if (typeof global.configModule[module.config.name] == 'undefined') global.configModule[module.config.name] = {};
                                if (typeof global.config[module.config.name] == 'undefined') global.config[module.config.name] = {};
                                if (typeof global.config[module.config.name][envConfig] !== 'undefined') global['configModule'][module.config.name][envConfig] = global.config[module.config.name][envConfig];
                                else global.configModule[module.config.name][envConfig] = module.config.envConfig[envConfig] || '';
                                if (typeof global.config[module.config.name][envConfig] == 'undefined') global.config[module.config.name][envConfig] = module.config.envConfig[envConfig] || '';
                            }
                            logger.loader(global.getText('mirai', 'loadedConfig', module.config.name));
                        } catch (error) {
                            throw new Error(global.getText('mirai', 'loadedConfig', module.config.name, JSON.stringify(error)));
                        }
                        if (module.onLoad) {
                            try {
                                const moduleData = {};
                                moduleData.api = loginApiData;
                                moduleData.models = botModel;
                                module.onLoad(moduleData);
                            } catch (_0x20fd5f) {
                                throw new Error(global.getText('mirai', 'cantOnload', module.config.name, JSON.stringify(_0x20fd5f)), 'error');
                            };
                        }
                        if (module.handleEvent) global.client.eventRegistered.push(module.config.name);
                        global.client.commands.set(module.config.name, module);
                        logger.loader(global.getText('mirai', 'successLoadModule', module.config.name));
                    } catch (error) {
                        logger.loader(global.getText('mirai', 'failLoadModule', module.config.name, error), 'error');
                    };
                }
            }(),
            function() {
                const events = readdirSync(global.client.mainPath + '/script/events').filter(event => event.endsWith('.js') && !global.config.eventDisabled.includes(event));
                for (const ev of events) {
                    try {
                        var event = require(global.client.mainPath + '/script/events/' + ev);
                        if (!event.config || !event.run) throw new Error(global.getText('mirai', 'errorFormat'));
                        if (global.client.events.has(event.config.name) || '') throw new Error(global.getText('mirai', 'nameExist'));
                        if (event.config.dependencies && typeof event.config.dependencies == 'object') {
                            for (const dependency in event.config.dependencies) {
                                const _0x21abed = join(__dirname, 'nodemodules', 'node_modules', dependency);
                                try {
                                    if (!global.nodemodule.hasOwnProperty(dependency)) {
                                        if (listPackage.hasOwnProperty(dependency) || listbuiltinModules.includes(dependency)) global.nodemodule[dependency] = require(dependency);
                                        else global.nodemodule[dependency] = require(_0x21abed);
                                    } else '';
                                } catch {
                                    let check = false;
                                    let isError;
                                    logger.loader(global.getText('mirai', 'notFoundPackage', dependency, event.config.name), 'warn');
                                    execSync('npm --package-lock false --save install' + dependency + (event.config.dependencies[dependency] == '*' || event.config.dependencies[dependency] == '' ? '' : '@' + event.config.dependencies[dependency]), { 'stdio': 'inherit', 'env': process['env'], 'shell': true, 'cwd': join(__dirname, 'nodemodules') });
                                    for (let i = 1; i <= 3; i++) {
                                        try {
                                            require['cache'] = {};
                                            if (global.nodemodule.includes(dependency)) break;
                                            if (listPackage.hasOwnProperty(dependency) || listbuiltinModules.includes(dependency)) global.nodemodule[dependency] = require(dependency);
                                            else global.nodemodule[dependency] = require(_0x21abed);
                                            check = true;
                                            break;
                                        } catch (error) { isError = error; }
                                        if (check || !isError) break;
                                    }
                                    if (!check || isError) throw global.getText('mirai', 'cantInstallPackage', dependency, event.config.name);
                                }
                            }
                            logger.loader(global.getText('mirai', 'loadedPackage', event.config.name));
                        }
                        if (event.config.envConfig) try {
                            for (const _0x5beea0 in event.config.envConfig) {
                                if (typeof global.configModule[event.config.name] == 'undefined') global.configModule[event.config.name] = {};
                                if (typeof global.config[event.config.name] == 'undefined') global.config[event.config.name] = {};
                                if (typeof global.config[event.config.name][_0x5beea0] !== 'undefined') global.configModule[event.config.name][_0x5beea0] = global.config[event.config.name][_0x5beea0];
                                else global.configModule[event.config.name][_0x5beea0] = event.config.envConfig[_0x5beea0] || '';
                                if (typeof global.config[event.config.name][_0x5beea0] == 'undefined') global.config[event.config.name][_0x5beea0] = event.config.envConfig[_0x5beea0] || '';
                            }
                            logger.loader(global.getText('mirai', 'loadedConfig', event.config.name));
                        } catch (error) {
                            throw new Error(global.getText('mirai', 'loadedConfig', event.config.name, JSON.stringify(error)));
                        }
                        if (event.onLoad) try {
                            const eventData = {};
                            eventData.api = loginApiData, eventData.models = botModel;
                            event.onLoad(eventData);
                        } catch (error) {
                            throw new Error(global.getText('mirai', 'cantOnload', event.config.name, JSON.stringify(error)), 'error');
                        }
                        global.client.events.set(event.config.name, event);
                        logger.loader(global.getText('mirai', 'successLoadModule', event.config.name));
                    } catch (error) {
                        logger.loader(global.getText('mirai', 'failLoadModule', event.config.name, error), 'error');
                    }
                }
            }()
        logger.loader(global.getText('mirai', 'finishLoadModule', global.client.commands.size, global.client.events.size)) 
        logger.loader('=== ' + (Date.now() - global.client.timeStart) + 'ms ===')
        writeFileSync(global.client['configPath'], JSON['stringify'](global.config, null, 4), 'utf8') 
        unlinkSync(global['client']['configPath'] + '.temp');        
        const listenerData = {};
        listenerData.api = loginApiData; 
        listenerData.models = botModel;
        const listener = require('./includes/listen')(listenerData);

        function listenerCallback(error, message) {
            if (error) return logger(global.getText('mirai', 'handleListenError', JSON.stringify(error)), 'error');
            if (['presence', 'typ', 'read_receipt'].some(data => data == message.type)) return;
            if (global.config.DeveloperMode == !![]) console.log(message);
            return listener(message);
        };
        global.handleListen = loginApiData.listenMqtt(listenerCallback);
        try {
            await checkBan(loginApiData);
        } catch (error) {
            return //process.exit(0);
        };
        if (!global.checkBan) logger(global.getText('mirai', 'warningSourceCode'), '[ GLOBAL BAN ]');
        global.client.api = loginApiData
        logger(`Joshua Sy 2.0.2`, '[ Joshua Sy ]');
        logger('Hey, thank you for using this Bot', '[ Joshua Sy ]');
        logger("Fixed by Joshua Sy", '[ Joshua Sy ]');
      loginApiData.sendMessage("Bot has been activated.", global.config.ADMINBOT[0]);
      //var cron = require("node-cron");
      const moment = require("moment-timezone");
      cron.schedule(`0 0 */1 * * *`, () => {
var o = moment.tz("Asia/Dhaka").format("MM/DD/YYYY");
  loginApiData.changeBio(`Prefix: ${global.config.PREFIX}\n\nBot Name: ${global.config.BOTNAME}\nBot Owner: ${global.config.OWNER}`);
}, {
  scheduled: true,
  timezone: "Asia/Dhaka"
}); 

cron.schedule(`0 0 */30 * * *`, () => {
var bible = [`John 16:33

In the world you will have tribulation. But take heart; I have overcome the world.`, `Isaiah 41:10 (NIV)

So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.`, `Philippians 4:6–7 (NIV)

Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.`, `Psalm 34:4–5, 8

I sought the LORD, and He answered me and delivered me from all my fears. Those who look to Him are radiant, and their faces shall never be ashamed. Oh, taste and see that the LORD is good! Blessed is the man who takes refuge in Him!`, `Romans 8:28

And we know that for those who love God all things work together for good, for those who are called according to His purpose.`, `Joshua 1:9

Have I not commanded you? Be strong and courageous. Do not be frightened, and do not be dismayed, for the LORD your God is with you wherever you go.`, `Matthew 6:31–34 (NIV)

So do not worry, saying, What shall we eat? or What shall we drink? or What shall we wear? For the pagans run after all these things, and your heavenly Father knows that you need them. But seek first His kingdom and His righteousness, and all these things will be given to you as well. Therefore do not worry about tomorrow, for tomorrow will worry about itself. Each day has enough trouble of its own.`, `Proverbs 3:5–6

Trust in the LORD with all your heart, and do not lean on your own understanding. In all your ways acknowledge Him, and He will make straight your paths.`, `Romans 15:13 (NIV)

May the God of hope fill you with all joy and peace as you trust in Him, so that you may overflow with hope by the power of the Holy Spirit.`, `2 Chronicles 7:14

If my people who are called by My name humble themselves, and pray and seek My face and turn from their wicked ways, then I will hear from heaven and will forgive their sin and heal their land.`, `Philippians 2:3–4

Do nothing from selfish ambition or conceit, but in humility count others more significant than yourselves. Let each of you look not only to his own interests, but also to the interests of others.`, `Isaiah 41:13

For I, the LORD your God, hold your right hand; it is I who say to you, Fear not, I am the one who helps you.`, `1 Peter 5:6–7

Humble yourselves, therefore, under the mighty hand of God so that at the proper time He may exalt you, casting all your anxieties on Him, because He cares for you.`, `Psalm 94:18–19

When I thought, My foot slips, Your steadfast love, O LORD, helped me up. When the cares of my heart are many, Your consolations cheer my soul.`, `Revelation 21:4

He will wipe away every tear from their eyes, and death shall be no more, neither shall there be mourning, nor crying, nor pain anymore, for the former things have passed away. And He who was seated on the throne said, Behold, I am making all things new.`];
  var juswa1 = bible[Math.floor(Math.random() * bible.length)];
  loginApiData.getThreadList(20, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage(`Random bible verse:\n\n ${juswa1}\nAmen`, now.threadID) : '');
  });
  }, {
  scheduled: true,
  timezone: "Asia/Dhaka"
});
    });
}
////////////////////////////////////////////////////////////
//========= Connecting to Database of Meta Hydra =========//
////////////////////////////////////////////////////////////

(async() => {
    try {
        await sequelize.authenticate();
        const authentication = {};
        authentication.Sequelize = Sequelize;
        authentication.sequelize = sequelize;
        const models = require('./includes/database/model')(authentication);
        logger(global.getText('mirai', 'successConnectDatabase'), '[ DATABASE ]');
        const botData = {};
        botData.models = models
        onBot(botData);
    } catch (error) { logger(global.getText('mirai', 'successConnectDatabase', JSON.stringify(error)), '[ DATABASE ]'); }
console.log(chalk.bold.hex("#eff1f0").bold("================== HI I am Meta Hydra iii ====================="));
   
})();
process.on('unhandledRejection', (err, p) => {});

