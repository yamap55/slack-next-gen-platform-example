import { Manifest } from "deno-slack-sdk/mod.ts";
import { workflow as ExampleWorkflow } from "./example.ts";

export default Manifest({
  name: "distracted-bison-253",
  description: "Example workflow",
  icon: "assets/default_new_app_icon.png",
  workflows: [ExampleWorkflow],
  outgoingDomains: [],
  botScopes: [
    "commands", // 最低限一つの bot scope が必要
    "channels:read", // channel_created トリガーに必要
    "chat:write", // メッセージを投稿するための基本的な権限
    "chat:write.public", // public channel に参加することなくメッセージを投稿する権限
  ],
});
