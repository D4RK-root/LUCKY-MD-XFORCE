const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'LUCKY-XFORCE••<=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUdpeG53UFhrS2M1QmpDRkVSUGhoZmg0dmJXWlpVeXI3V3FEWTViRVhGbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ01qVkV1N3J5dkdXUzhLR0VQRExjNVR2ZjY3THBXSTVEVk10M1VYc25IRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2RUovMEZtSnpSenhYYStjWTJpeHRsK3pKenNIbWdBeTdsNEs0TCtwUFdrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIzeWo3Q0k0dGpvWWJFd2p3ZVoyTzZDU3RoUFFXMkEyb2phbTF0RUVkbjA0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdFLzlpRVVKMDJoRUF5a1NnT29RZkFmVUZCamUzNm5OdkNzaFMzMWV0a1E9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Iktab2JYazE5SURZdXo3TUxhWndnK2o4Y2dwbG9QL3pkYmQ2c0FPT2N6ajA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEJyR1JHTGRMZEpzK1FHSFFmM3gyZW94ZjdvbVRYRmRoc0dSNUc0ckxWYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTU9jc0M5T25rdWVTTWhxSEt1OFc2eWtUNmNVc040WW1Jc1JQSmJBOU5RVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldiTXZyUit3cjlNUDBHaWUxczdEbVN5OFNOQ1NOMEhHbzhSaFg2RHFoRnU0MzBQeFpYcW5RMGZVOUptTHZmeFcveVR6QUJVY2lmQnRobmp1eEFFbkFnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTY5LCJhZHZTZWNyZXRLZXkiOiJ5U1BOMVY2dGR5M1JNMnVtSzFMUGwyN0lYMWtiWjFZbkFOaEJCaERBdW5zPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjkxNzUwMTM3MTEwNUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIxNjIwOTEwMkJEQjgzMzgwMjBEMkJENUE2QUZDQzQ3OSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzU1MjMwMjg3fSx7ImtleSI6eyJyZW1vdGVKaWQiOiI5MTc1MDEzNzExMDVAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMzA3NzUwRTQzMjkxMjY5ODA5NjU1MTBGNERGNEJEMjgifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1NTIzMDI4N30seyJrZXkiOnsicmVtb3RlSmlkIjoiOTE3NTAxMzcxMTA1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkI5NjREMjkwNTcwNjdBRDZBMjE4QjNFN0M5QkQzQjAwIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTUyMzAyODl9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IkJBMlNISFZIIiwibWUiOnsiaWQiOiI5MTc1MDEzNzExMDU6MkBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJENHJrIiwibGlkIjoiMTE5ODU2MDk1NTY4MTE1OjJAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNPZXl2OVVCRU1IZytzUUdHQUlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJVVE1oZHV0cURhbUQ4MGh4d01NSWJjV05LWU5OUTNGOExuTFdMcmY5V0Y0PSIsImFjY291bnRTaWduYXR1cmUiOiJuZTAzdVM4Ym1lRnNLcU5WS3lmL1lQTnRwNGo1c1VyelFRbnVwRkN4KzFUMnVOMXMrTlVBME1pOGlqNFkvcmFiY0FvVDdBMWQrdVJNcHp1WUJCMWNCdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiYUprUUpTU3ZaTXQ3cVI0TDY4NTd3TG56VWg4Z2pwcStFUG1wbmQ0Wk12d3p4QzVUUy9qak5lSzllT09sZWJlOVMweDA1RXFXTG1JN1RjSUdtVUJvQkE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5MTc1MDEzNzExMDU6MkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJWRXpJWGJyYWcycGcvTkljY0REQ0czRmpTbURUVU54ZkM1eTFpNjMvVmhlIn19XSwicGxhdGZvcm0iOiJzbWJhIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQklJRFE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTUyMzAyODYsImxhc3RQcm9wSGFzaCI6IjNmWXdDSyIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBT09TIn0=',
    PREFIXE: process.env.PREFIX || ".",
    GITHUB : process.env.GITHUB|| 'https://github.com/mr-X-force/LUCKY-MD-XFORCE',
    OWNER_NAME : process.env.OWNER_NAME || "Shiva.PR",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "917501371105",
    DEV : process.env.DEV || "Shiva.PR",
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT : process.env.AUTO_REACTION || "no", 
    AUTO_STICKER : process.env.AUTO_STICKER || "no",
    AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    URL: process.env.URL || "https://files.catbox.moe/dvvl81.jpeg",  
    URL2: process.env.URL2 || "https://files.catbox.moe/dvvl81.jpeg",
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'yes',              
    CHAT_BOT: process.env.CHAT_BOT || "yes",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    GREET : process.env.GREET_MESSAGE || "yes", 
    AUTO_STICKER : process.env.AUTO_STICKER || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'Your Status Seen By D4RK',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    ANTI_BUG : process.env.ANTI_BUG || "no",
    ANTI_MENTION_GROUP : process.env.ANTI_MENTION_GROUP || "on",
    ANTI_TAG : process.env.ANTI_TAG || "on",
    ANTI_BAD : process.env.ANTI_BAD || "on",
    ANTI_SHARE_GROUP : process.env.ANTI_SHARE_GROUP || "on",
    ANTI_LINK_GROUP : process.env.ANTI_LINK_GROUP || "on",
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '',             
    GURL: process.env.GURL  || ".",
    WEBSITE :process.env.GURL || "https://d4rkboy.bio.link",
    CAPTION : process.env.CAPTION || "D4RK-SH",
    BOT : process.env.BOT_NAME || 'LUCKY-MD-XFORCE',
    MODE: process.env.PUBLIC_MODE || "D4RK-SH"",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    LUCKY_ADM : process.env.ANTI_DELETE_MESSAGES || 'no',
    ANTI_DELETE_GROUP : process.env.ANTI_DELETE_GROUP || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'yes', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes', 
    VOICE_CHATBOT_INBOX : process.env.VOICE_CHATBOT_INBOX || "no",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
