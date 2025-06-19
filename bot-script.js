var botui = new BotUI('help-bot');

function startChat() {
  botui.message.add({
    delay: 500,
    loading: true,
    content: 'Hi! Welcome to my website'
  }).then(function () {
    return botui.message.add({
      delay: 500,
      loading: true,
      content: 'How can I help?'
    });
  }).then(function () {
    return botui.action.button({
      action: [
        {
          text: 'What are your opening hours?',
          value: 'hours'
        },
        {
          text: 'What do you do?',
          value: 'do'
        }
      ]
    });
  }).then(handleMainResponse);
}

function handleMainResponse(res) {
  var message;

  if (res.value === "hours") {
    message = 'That’s a good one! This is a website, it’s always open.';
  }
  else if (res.value === "do") {
    message = 'I’m a product-focused Scrum master<br><br>I also have a keen interest in chatbots and web analytics';
  }

  botui.message.add({
    type: 'html',
    delay: 1000,
    loading: true,
    content: message
  }).then(function () {
    return botui.action.button({
      action: [
        {
          text: 'Cool!',
          value: 'cool'
        },
        {
          text: 'Go to Start',
          value: 'start'
        },
        {
          text: 'End Chat',
          value: 'end'
        }
      ]
    });
  }).then(function (res) {
    if (res.value === 'start') {
      botui.message.removeAll().then(startChat);
    } else if (res.value === 'end') {
      endChat();
    } else {
      botui.message.add({
        delay: 1000,
        loading: true,
        content: 'I know! Thanks.'
      }).then(function () {
        return botui.action.button({
          action: [
            {
              text: 'Start New Chat',
              value: 'restart'
            }
          ]
        });
      }).then(function (res) {
        if (res.value === 'restart') {
          botui.message.removeAll().then(startChat);
        }
      });
    }
  });
}

function endChat() {
  botui.message.add({
    delay: 500,
    loading: true,
    content: 'Thank you for chatting! Have a great day.'
  }).then(function () {
    return botui.action.button({
      action: [
        {
          text: 'Start New Chat',
          value: 'restart'
        }
      ]
    });
  }).then(function (res) {
    if (res.value === 'restart') {
      botui.message.removeAll().then(startChat);
    }
  });
}

startChat();
