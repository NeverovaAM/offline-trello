import { FullStateType } from "../redux/store"

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const loadState = () => {
  try {
    const stringState = localStorage.getItem("state");
    if (stringState === null) {
      return undefined;
    }
    return JSON.parse(stringState)
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const stringState = JSON.stringify(state)
    localStorage.setItem('state', stringState)
  } catch (err) {
    console.log(err)
  }
}
