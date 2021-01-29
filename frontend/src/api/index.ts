import ky from "ky";

import { getAccessToken } from "../stores/AuthStore";

export function Api() {
  return ky.extend({
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      authorization: `Bearer ${getAccessToken()}`,
    },
  });
}
