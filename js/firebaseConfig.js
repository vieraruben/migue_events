const firebaseConfig = {
  databaseURL: "https://eventplannermiguel-default-rtdb.firebaseio.com",
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Reference to the 'items' collection in the Realtime Database
const usersRef = database.ref("users");

// Utility function to convert Firebase snapshot to an array of items
const snapshotToArray = (snapshot) => {
  const result = [];
  snapshot.forEach((childSnapshot) => {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;
    result.push(item);
  });
  return result;
};

const createRecord = async (collection, data) => {
  // send data
  var listRef = database.ref(collection);
  var newRef = listRef.push();
  await newRef.set(data);
};

// Utility function to load all items
const loadAllItems = async (collection) => {
  const collectionRef = database.ref(collection);
  const snapshot = await collectionRef.once("value");
  return snapshotToArray(snapshot);
};

// Utility function to perform an asynchronous query
const queryItem = async (collection, attribute, value) => {
  const collectionRef = database.ref(collection);
  const snapshot = await collectionRef
    .orderByChild(attribute)
    .equalTo(value)
    .once("value");
  return snapshotToArray(snapshot);
};

// Utility function to load an item by key
const loadItemByKey = async (collection, key) => {
  const collectionRef = database.ref(collection);
  const snapshot = await collectionRef.child(key).once("value");
  return snapshot.val();
};

// Utility function to perform an asynchronous update
const updateItemAsync = async (collection, key, payload) => {
  const collectionRef = database.ref(collection);
  await collectionRef.child(key).update(payload);
};

// Utility function to perform an asynchronous delete
const deleteItemAsync = async (collection, key) => {
  const collectionRef = database.ref(collection);
  await collectionRef.child(key).remove();
};

// // Create a new event room
// var listRef = database.ref("event_rooms/");
// var newRef = listRef.push();
// newRef.set({
//   name: "THEATRE.jpg",
//   pic: "https://github.com/vieraruben/migue_events/blob/main/images/THEATRE.jpg",
//   room_capacity: 250,
// });
