var botui = new BotUI('help-bot');


function startChat() {
  botui.message.add({
    delay: 300,
    loading: true,
    content: 'Welcome, Admin! What would you like to do?'
  }).then(function () {
    return botui.action.button({
      action: [
        { text: 'User Management', value: 'user_mgmt' },
        { text: 'Chatbot Analytics', value: 'analytics' },
        { text: 'FAQ Management', value: 'faq' },
        { text: 'End Session', value: 'end' }
      ]
    });
  }).then(handleMainMenu);
}

function handleMainMenu(res) {
  switch (res.value) {
    case 'user_mgmt':
      userManagement();
      break;
    case 'analytics':
      showAnalytics();
      break;
    case 'faq':
      faqManagement();
      break;
    case 'end':
      endSession();
      break;
  }
}

// --- User Management ---
// Only keep instructions and menu
function userManagement() {
  botui.message.add({
    content: 'User Management:'
  }).then(showUserActions);
}

function showUserActions() {
  return botui.action.button({
    action: [
      { text: 'Add User', value: 'add' },
      { text: 'Remove User', value: 'remove' },
      { text: 'Check Profile', value: 'profile' },
      { text: 'Back', value: 'back' }
    ]
  }).then(function (res) {
    switch (res.value) {
      case 'add':
        return showAddUserInstructions();
      case 'remove':
        return showRemoveUserInstructions();
      case 'profile':
        return showProfileInstructions();
      case 'back':
      default:
        return botui.message.removeAll().then(startChat);
    }
  });
}

function showAddUserInstructions() {
  return botui.message.add({
    type: 'html',
    content: `
      <b>To add a user:</b><br>
      1. Go to the admin dashboard.<br>
      2. Select "Users" from the menu.<br>
      3. Click "Add User" and fill in the details.<br>
      <br>
      <i>Contact IT support if you need further help.</i>
    `
  }).then(showUserActions);
}

function showRemoveUserInstructions() {
  return botui.message.add({
    type: 'html',
    content: `
      <b>To remove a user:</b><br>
      1. Go to the admin dashboard.<br>
      2. Select "Users" from the menu.<br>
      3. Find the user and click "Remove".<br>
      <br>
      <i>Contact IT support if you need further help.</i>
    `
  }).then(showUserActions);
}

function showProfileInstructions() {
  return botui.message.add({
    type: 'html',
    content: `
      <b>To check a user profile:</b><br>
      1. Go to the admin dashboard.<br>
      2. Select "Users" from the menu.<br>
      3. Click on the user's name to view their profile.<br>
      <br>
      <i>Contact IT support if you need further help.</i>
    `
  }).then(showUserActions);
}

// --- Analytics ---
function showAnalytics() {
  botui.message.add({
    content: 'Chatbot Analytics:'
  }).then(showAnalyticsActions);
}

function showAnalyticsActions() {
  return botui.action.button({
    action: [
      { text: 'View Stats', value: 'stats' },
      { text: 'Export Logs', value: 'export' },
      { text: 'Back', value: 'back' }
    ]
  }).then(function (res) {
    switch (res.value) {
      case 'stats':
        return botui.message.add({
          type: 'html',
          content: `
            <b>To view chatbot statistics:</b><br>
            1. Go to the analytics dashboard.<br>
            2. Review total chats, common questions, and response times.<br>
            <br>
            <i>Contact IT support if you need further help.</i>
          `
        }).then(showAnalyticsActions);
      case 'export':
        return botui.message.add({
          type: 'html',
          content: `
            <b>To export chat logs:</b><br>
            1. Go to the analytics dashboard.<br>
            2. Click "Export Logs" and choose your format.<br>
            <br>
            <i>Contact IT support if you need further help.</i>
          `
        }).then(showAnalyticsActions);
      case 'back':
      default:
        return botui.message.removeAll().then(startChat);
    }
  });
}

// --- FAQ Management ---
// Only keep instructions and menu
function faqManagement() {
  botui.message.add({
    content: 'FAQ Management:'
  }).then(showFaqActions);
}

function showFaqActions() {
  return botui.action.button({
    action: [
      { text: 'Add FAQ', value: 'add' },
      { text: 'Remove FAQ', value: 'remove' },
      { text: 'Edit FAQ', value: 'edit' },
      { text: 'Back', value: 'back' }
    ]
  }).then(function (res) {
    switch (res.value) {
      case 'add':
        return botui.message.add({
          type: 'html',
          content: `
            <b>To add an FAQ:</b><br>
            1. Go to the admin dashboard.<br>
            2. Select "FAQ Management".<br>
            3. Click "Add FAQ" and enter the details.<br>
            <br>
            <i>Contact IT support if you need further help.</i>
          `
        }).then(showFaqActions);
      case 'remove':
        return botui.message.add({
          type: 'html',
          content: `
            <b>To remove an FAQ:</b><br>
            1. Go to the admin dashboard.<br>
            2. Select "FAQ Management".<br>
            3. Find the FAQ and click "Remove".<br>
            <br>
            <i>Contact IT support if you need further help.</i>
          `
        }).then(showFaqActions);
      case 'edit':
        return botui.message.add({
          type: 'html',
          content: `
            <b>To edit an FAQ:</b><br>
            1. Go to the admin dashboard.<br>
            2. Select "FAQ Management".<br>
            3. Find the FAQ and click "Edit".<br>
            <br>
            <i>Contact IT support if you need further help.</i>
          `
        }).then(showFaqActions);
      case 'back':
      default:
        return botui.message.removeAll().then(startChat);
    }
  });
}

// --- End Session ---
function endSession() {
  botui.message.add({
    delay: 400,
    loading: true,
    content: 'Session ended. Thank you!'
  }).then(function () {
    return botui.action.button({
      action: [
        { text: 'Start New Chat', value: 'restart' }
      ]
    });
  }).then(function (res) {
    if (res.value === 'restart') {
      botui.message.removeAll().then(startChat);
    }
  });
}

startChat();
