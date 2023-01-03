// -------------------------
// ワークフロー定義
// -------------------------
import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";

export const workflow = DefineWorkflow({
  callback_id: "example-workflow",
  title: "Example Workflow",
  input_parameters: {
    properties: {
      channel_id: { type: Schema.slack.types.channel_id },
      channel_name: { type: Schema.types.string },
      channel_type: { type: Schema.types.string },
      creator_id: { type: Schema.slack.types.user_id },
      created: { type: Schema.types.string },
    },
    required: [
      "channel_id",
      "channel_name",
      "channel_type",
      "creator_id",
      "created",
    ],
  },
});

workflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: workflow.inputs.channel_id,
  message:
    `Hi <@${workflow.inputs.creator_id}>, thanks for creating this channel!`,
});

// -------------------------
// トリガー定義
// -------------------------
import { Trigger } from "deno-slack-api/types.ts";

const trigger: Trigger<typeof workflow.definition> = {
  type: "event",
  name: "Trigger the example workflow",
  workflow: `#/workflows/${workflow.definition.callback_id}`,
  event: { event_type: "slack#/events/channel_created" },
  inputs: {
    channel_id: { value: "{{data.channel_id}}" },
    channel_name: { value: "{{data.channel_name}}" },
    channel_type: { value: "{{data.channel_type}}" },
    creator_id: { value: "{{data.creator_id}}" },
    created: { value: "{{data.created}}" },
  },
};

export default trigger;
