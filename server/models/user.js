const { datastore } = require('../config/index');

const kind = 'user';

exports.login = async ({email, password}) => {
  const query = datastore
    .createQuery(kind)
    .filter('email', '=', email)
    .filter('password', '=', password);
  const [users] = await datastore.runQuery(query);
  if (users.length == 0) return 0;
  else return users[0][datastore.KEY].id;
}

exports.register = async ({name, email, password, imageUrl}) => {
  // The Cloud Datastore key for the new entity
  const userKey = datastore.key(kind);

  // Prepares the new entity
  const user = {
    key: userKey,
    data: {
      name,
      email,
      password,
      imageUrl,
      connections: []
    },
  };

  // Saves the entity
  await datastore.save(user);
  return userKey.id;
}

// userId belongs to reader, otherId belongs to profile being read (may be same as userId)
exports.read = async ({userId, otherId}) => {
  const otherKey = datastore.key([kind, datastore.int(otherId)]);
  const other = await datastore.get(otherKey).data;

  if (userId === otherId) {
    return {
      name: other.name,
      email: other.email,
      imageUrl: other.imageUrl,
      connections: other.connections
    }
  } else {
    let isConnected = false;
    other.connections.forEach(c => {
      if (c.id === userId) isConnected = true;
    });

    // optional: return all common posts
    return {
      name: other.name,
      email: other.email,
      imageUrl: other.imageUrl,
      isConnected
    }
  }
}

exports.connect = async ({user1Id, user2Id}) => {
  const user1Key = datastore.key([kind, datastore.int(user1Id)]);
  const [user1] = await datastore.get(user1Key);

  const user2Key = datastore.key([kind, datastore.int(user2Id)]);
  const [user2] = await datastore.get(user2Key);

  user1.connections.push({
    id: user2Id,
    name: user2.name,
    imageUrl: user2.imageUrl,
  });

  user2.connections.push({
    id: user1Id,
    name: user1.name,
    imageUrl: user1.imageUrl,
  });

  await datastore.update(user1);
  await datastore.update(user2);
}

// (async () => {
//   await exports.register({name:"Susan", email:"susan@mail.com", password:"password", imageUrl:"url"});
// })();