import ky from "ky";

export function Api() {
  return ky.extend({
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
  });
}
