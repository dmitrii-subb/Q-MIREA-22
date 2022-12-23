class Bot {
  constructor(token) {
    this.url = `https://api.telegram.org/bot${token}/`;
    this.updateId = 1;
    this.chatId = 0;
  }

  parseResponse(response) {
    this.updateId = response.result[0].update_id;
  }

  sendMessage(message) {
    fetch(this.url + "sendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chat_id: this.chatId, text: message }),
    });
  }

  async getUpdate(callback, body = null) {
    let response = await fetch(this.url + "getUpdates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    response = await response.json();
    console.log(response);
    if (response.result.length !== 0) {
      body.offset = response.result[response.result.length - 1].update_id + 1;
      callback(response.result[0].message.text);
      this.chatId = response.result[0].message.chat.id;
    } else return body;

    return body;
  }

  async run(callback) {
    let update_body = {
      offset: 0,
      timeout: 10,
    };

    while (true) {
      await this.getUpdate(callback, update_body).then((body) => {
        update_body.offset = body.offset;
      });
    }
  }
}

export default Bot;
