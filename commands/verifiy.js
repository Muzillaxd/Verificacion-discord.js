const discord = require("discord.js") //npm i discord.js
const randoStrings = require("randostrings") //npm i randostrings
const client = new discord.Client();
const random = new randoStrings

module.exports = {
  name: "verificame", // esto es lo que decia en en el index.js, lo puedes cambiar si quieres Ej: !verify
  aliases: [],
  description: "Verify that you are a real user",
  run: async (client, message, args) => {
  message.delete()
   let role = message.guild.roles.cache.find(rl => rl.name === "Miembro") // puedes cambiarlo si quieres pero si lo haces tienes que cambiar el nombre del role.
   if(!role) return message.channel.send("Ubo un error en buscar el role")
    
   let captcha = random.captcha() 
    
   let filter = m => m.author.id === message.author.id
   
     message.author.send(`Para verificarte escribe aqui mismo este codigo : ${captcha}\nCuidado con las mayusuculas, son importantes`)
     .then(() => { message.author.dmChannel.awaitMessages(filter, {max: 1, time: 60000, errors: ["time"]}) //omg i see my mistake
        .then(collected => {
      if(![captcha].includes(collected.first().content)) {
        return message.author.send("Ese codigo es incorrecto, porfavor vuelva a intentarlo")
      }
      
      if([captcha].includes(collected.first().content)) {
        message.author.send("Ya estas verificado!")
        message.member.roles.add(role)
      }
    }).catch(() => {
      message.author.send("Tiempo terminado, vuelve a intentarlo poniendo **!verificame** en <#ID-DEL-CANAL>") //Put the catch in the wrong place
   })
    })
  }
}



client.login(process.env.TOKEN);
