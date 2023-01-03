// -------------------------
// ワークフロー定義
// -------------------------
import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";

// この定義オブジェクトを manifest.ts で参照するのを忘れずに！
export const workflow = DefineWorkflow({
  callback_id: "hello-world-workflow",
  title: "Hello World Workflow",
  input_parameters: {
    properties: {
      channel_id: { type: Schema.slack.types.channel_id },
    },
    required: ["channel_id"],
  },
});

// 標準ファンクションを使ってメッセージを投稿
// channel_id は Slack UI 上から入手してください
workflow.addStep(Schema.slack.functions.SendMessage, {
  // ワークフロー全体のトリガーからの入力を指定
  // リンクトリガーの場合はそれを起動したチャンネルの ID が渡される
  channel_id: workflow.inputs.channel_id,
  message: "Hello World!",
});

// -------------------------
// トリガー定義
// -------------------------
import { Trigger } from "deno-slack-api/types.ts";

// Incoming Webhooks によるトリガー
const trigger: Trigger<typeof workflow.definition> = {
  type: "shortcut",
  name: "Hello World Trigger",
  workflow: `#/workflows/${workflow.definition.callback_id}`,
  inputs: {
    // クリックしたチャンネルのIDが設定される
    channel_id: { value: "{{data.channel_id}}" }
  },
};

// トリガーの作成には `slack triggers create --trigger-def [ファイルパス]` を実行する
// Trigger 形の定義オブジェクトを export default さえしていれば
// そのソースファイルを使用できる
export default trigger;
