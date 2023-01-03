import { Manifest } from "deno-slack-sdk/mod.ts";
import { workflow as HelloWorld } from "./hello_world.ts";

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/future/manifest
 */
export default Manifest({
  name: "great-antelope-491",
  description: "Hellow World",
  icon: "assets/default_new_app_icon.png",
  functions: [],
  workflows: [HelloWorld],
  outgoingDomains: [],
  botScopes: ["commands", "chat:write", "chat:write.public"],
});
