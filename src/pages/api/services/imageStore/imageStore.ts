import { google } from "googleapis";
import path from "path";
import process from "process";
import fs from "node:fs/promises";

// ref: https://developers.google.com/drive/api/guides/manage-uploads#node.js
class ImageStore {
  credentials = null;

  async authenticate(): Promise<void> {
    try {
      // TODO: Should idealy spread out catch statements to detail what error its facing
      // this does not work yet sad :(
      const credential_data = await fs.readFile(
        path.join(process.cwd(), "./keys.json"),
      );
      const credentials = JSON.parse(credential_data.toString());
      const client = google.auth.fromJSON(credentials);
      if (client) {
        console.log("HEUYYYYY");
      }
    } catch (err) {
      console.error(err);
    }
  }
}

export default ImageStore;
