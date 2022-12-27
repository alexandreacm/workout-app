import data from "../../data.json";

export function getData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 5000);
  });
}
