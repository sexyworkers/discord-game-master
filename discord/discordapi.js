class DiscordAPI {
    constructor(client, recieved) {
        this.client = client
        this.recieved = recieved
        this.serverID = recieved.channel.guild.id
    }

    getVoiceChannel() {
        for (let channel of this.recieved.guild.voiceStates.cache)
            return channel[1].channelID
        return
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
        /*
        we should return username if there is no server nickname
        */

        const { nickname, user } = this.client.guilds.cache.get(this.serverID).members.cache.get(`${userID}`)

        return nickname ? nickname : user.username
    }

    setNickname(userID, nickname) {
        this.client.guilds.cache.get(this.serverID).members.cache.get(`${userID}`).setNickname(nickname)
    }


    //или роль выше // можно попробовать обрабатывать код response 
    isOwner(userID) {
        return userID === this.client.guilds.cache.get(this.serverID).ownerID
    }
}

module.exports.DiscordAPI = DiscordAPI

