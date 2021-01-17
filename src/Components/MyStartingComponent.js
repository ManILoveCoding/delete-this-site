import AsyncStorage from '@react-native-async-storage/async-storage';

const HAS_DELETED = 'hasDeleted';

function setAppDeleted() {
  AsyncStorage.setItem(HAS_DELETED, 'true');
}

export default async function checkIfDeleted() {
  try {
    const hasDeleted = await AsyncStorage.getItem(HAS_DELETED);
    if (hasDeleted === null) {
      setAppDeleted();
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}
