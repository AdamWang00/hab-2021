const { datastore } = require('../config/index');
const User = require('./user');

const kind = 'connect-request';

exports.send = async ({userIdSend, userIdReceive}) => {
  // The Cloud Datastore key for the new entity
  const crKey = datastore.key(kind);

  // Prepares the new entity
  const cr = {
    key: crKey,
    data: {
      userIdSend,
      userIdReceive,
      timestamp: (new Date()).toJSON()
    },
  };

  // Saves the entity
  await datastore.save(cr);
  return crKey.id;
}

exports.accept = async ({connectRequestId}) => {
  const crKey = datastore.key([kind, datastore.int(connectRequestId)]);
  const [cr] = await datastore.get(crKey);
  await datastore.delete(crKey);

  await User.connect({user1Id: cr.userIdSend, user2Id: cr.userIdReceive});
  // optional: create activity that request was accepted
}