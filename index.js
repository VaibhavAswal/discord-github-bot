require("dotenv").config;
const Discord = require("discord.js");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const client = new Discord.Client({
	intents: [
		Discord.Intents.FLAGS.GUILDS,
		Discord.Intents.FLAGS.DIRECT_MESSAGES,
		Discord.Intents.FLAGS.GUILD_MESSAGES,
	],
});

client.login(
	"OTgyNzQ3NTUzOTMyMTE1OTc4.GsekGX.8kckqvEG_Kr0uXWJAnKtCRs3c9SzwtRfy-4vlE"
);
let ready = false;
client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
	ready = true;
});

client.on("messageCreate", (msg) => {
	if (msg.content.startsWith("bh")) {
		msg.reply(
			"Bot Under construction!\nFollow **That_back.bencher** for more!!!"
		);
	} else if (msg.content.startsWith("bakchod")) {
		msg.reply("ewww, i hate that word\ncall me bh");
	}
});

app.post("/", (req, res) => {
	const sendUpdate = function () {
		if (ready == true) {
			client.channels.fetch("979831340000239709").then((channel) => {
				const exampleEmbed = new Discord.MessageEmbed()
					.setColor("#CC00CC")
					.setURL("https://discord.js.org/")
					.setAuthor({
						name: `${req.body.head_commit.author.name}`,
						iconURL: req.body.sender.avatar_url,
						url: req.body.url,
					})
					.setDescription(
						`Pushed a new commit to [**${req.body.repository.name}**](${req.body.repository.html_url})\n\u200B`
					)
					.addFields(
						{
							name: "Commit Title",
							value: `[${req.body.head_commit.message.split("\n")[0]}](${
								req.body.head_commit.url
							})`,
						},
						{
							name: "Files modified",
							value: `${req.body.head_commit.modified.length}`,
							inline: true,
						},
						{
							name: "Files inserted",
							value: `${req.body.head_commit.added.length}`,
							inline: true,
						},
						{
							name: "Files removed",
							value: `${req.body.head_commit.removed.length}`,
							inline: true,
						}
					)
					.setTimestamp()
					.setFooter({
						text: "'bakchod help' for help",
						iconURL:
							"https://upload.wikimedia.org/wikipedia/en/thumb/9/96/Meme_Man_on_transparent_background.webp/316px-Meme_Man_on_transparent_background.webp.png",
					});
				channel.send({ embeds: [exampleEmbed] });
				res.status(200).send("success");
			});
		} else {
			setTimeout(function () {
				sendUpdate();
			}, 1000);
		}
	};
	sendUpdate();
});

app.listen(PORT, () => {
	console.log(`server listening on ${PORT}`);
});
