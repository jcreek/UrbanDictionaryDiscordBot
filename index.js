const Discord = require('discord.js');
var axios = require('axios');
const config = require('./config.json');
const client = new Discord.Client();

const trim = (str, max) => str.length > max ? `${str.slice(0, max - 3)}...` : str;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  const args = msg.content.slice(config.prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();

  if (!msg.content.startsWith(config.prefix) || msg.author.bot) {
    return;
  }
  else if (command === 'ud') {
    if (!args.length) {
      return msg.channel.send(`You didn't provide any arguments, ${msg.author}!`);
    }
    else if (args[0] != "") {
      var searchQuery = args[0];

      // Send a POST request
      axios({
        method: 'get',
        url: 'http://api.urbandictionary.com/v0/define',
        headers: {"Content-Type": "application/json"},
        params: {"term": searchQuery}
      })
      .then(function(response) {
        console.log(response.data.list);

        const [answer] = response.data.list;

        const embed = new Discord.MessageEmbed()
          .setColor('#1D2439')
          .setTitle(answer.word)
          .setURL(answer.permalink)
          .setThumbnail('https://g.udimg.com/assets/logo-1b439b7fa6572b659fbef161d8946372f472ef8e7169db1e47d21c91b410b918.svg')
          .addFields(
            { name: 'Definition', value: trim(answer.definition, 1024) },
            { name: 'Example', value: trim(answer.example, 1024) },
            { name: 'Rating', value: `${answer.thumbs_up} thumbs up. ${answer.thumbs_down} thumbs down.` }
          );

          msg.channel.send(embed);

      })
      .catch(function (error) {
        console.log(error);
      });
    }
  
    msg.channel.send(`Command name: ${command}\nArguments: ${args}`);
  }  
});

client.login(config.token);