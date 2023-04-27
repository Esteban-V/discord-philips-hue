import { Hue } from "hue-hacking-node";
import Discord from "discord.js-selfbot";
const client = new Discord.Client();

const bridgeIP = "192.168.1.108";
const appname = "";

//1, 2 ESTEBAN
const myLights = [1, 2];

const ids = {
  dm: {
    "689535173704155379": "FFFFFF",
    "697217154742747150": "FFFFFF",
  },
  channel: {
    "847948969324970016": "55FF00",
    "765070161878712330": "55FF00",
  },
};

const hue = new Hue({
  ip: bridgeIP,
  key: appname,
  retrieveInitialState: true,
});

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async (msg) => {
  if (msg.channel.type === "dm" && ids.dm[msg.author.id.toString()]) {
    myLights.forEach(async (item) => {
      await flash(item, ids.dm[msg.author.id.toString()]);
    });
  }

  const channelId = msg.channel.id.toString();
  if (ids.channel[channelId]) {
    myLights.forEach(async (item) => {
      await flash(item, ids.channel[channelId]);
    });
  }
});

async function flash(lamp, color) {
  await hue.getLampState(lamp);
  await hue.setColor(lamp, color);
  await hue.longFlash(lamp);
}

client.login(process.env.DISCORD_TOKEN);
