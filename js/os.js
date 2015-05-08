var os = {

  addElement: document.getElementById('add'),
  checkElement: document.getElementById('check'),
  usersElement: document.getElementById('users'),
  userField: document.getElementById('user'),
  repoField: document.getElementById('repo'),
  detailElement: document.getElementById('detail'),
  messageElement: document.getElementById('message'),
  statusElement: document.getElementById('status'),

  users: [],

  showUsers: function() {

    var users = os.usersElement;
    for (var i = 0; i < os.users.length; i++) {
      var element = document.createElement('li');
      element.innerText = "User: " + os.users[i].username + "   Repos: " + os.users[i].numRepos;
      users.appendChild(element);
    }
    
  },

  addUser: function() {

    os.messageElement.style.visibility = 'hidden';
    os.detailElement.style.visibility = 'hidden';

    var exists = false;
    for (var i = 0; i < os.users.length; i++) {
      if (os.users[i].username == os.userField.value) {
        exists = true;
        break;
      }
    }

    if (!exists) {
      os.users.push({username: os.userField.value, numRepos: os.repoField.value});
      var element = document.createElement('li');
      element.innerText = "User: " + os.userField.value + "   Repos: " + os.repoField.value;
      users.appendChild(element);
    } else {
      os.messageElement.innerText = "User exists";
      os.messageElement.style.visibility = 'visible';
    }

    os.userField.value = '';
    os.repoField.value = '';

  },

  checkUser: function() {

    os.messageElement.style.visibility = 'hidden';
    os.detailElement.style.visibility = 'hidden';

    var detail;
    for (var i = 0; i < os.users.length; i++)
      if (os.users[i].username == os.userField.value)
        detail = os.users[i];

    if (typeof detail == 'undefined') {

      os.messageElement.innerText = "User not found";
      os.messageElement.style.visibility = 'visible';

    } else {

      var no = parseInt(detail.numRepos);
      var status = '';
      if (no > 40)
        status = 'Open Source Evangelist';
      else if (no >= 20 && no <= 40)
        status = 'Intermediate Open Source Developer';
      else
        status = 'Open Source Hater';

      os.statusElement.innerText = status;
      os.detailElement.style.visibility = 'visible';

    }
  
  },

  initializeListeners: function() {
    os.addElement.addEventListener('click', os.addUser);
    os.checkElement.addEventListener('click', os.checkUser);
    os.messageElement.style.visibility = 'hidden';
    os.detailElement.style.visibility = 'hidden';
  }

};

os.initializeListeners();
os.showUsers();