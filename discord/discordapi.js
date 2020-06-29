const { shuffle } = require('../utils')

class DiscordAPI {
    constructor(client, recieved) {
        this.client = client
        this.recieved = recieved
    }

    //Возвращает массив пользователей, где пользователь
    // .send('sss') .tag() @alm#1234 <@!248080925919805440> .send()
    getAllConnectedMembers(channelID) {
        const members = this.recieved.guild.voiceStates.cache.filter(u => u.channelID === channelID)

        let players = []

        for (let member of members)
            players.push(member[0])

        return players
    }

    sendRole(userID, role) {
        this.client.users.cache.get(`${userID}`).send(`${role}`)
    }

    getNickname(userID) {
        //console.log('nickname', this.client.users.cache.get(`${userID}`).username)
        return this.client.users.cache.get(`${userID}`).username
    }

    setNickname(userID, nickname) {
        //console.log(this.client.guilds.cache.get('680051236900569096').members.cache.get(`${userID}`).user.username)
        this.client.guilds.cache.get(process.env.SERVER_ID).members.cache.get(`${userID}`).setNickname(nickname)
    }

    isOwner(userID) {
        //console.log(this.client.guilds.cache.get('680051236900569096').owner)
        return userID === this.client.guilds.cache.get(process.env.SERVER_ID).ownerID
    }
}

module.exports.DiscordAPI = DiscordAPI

