import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "wardrobe" model, go to https://fashion-finders.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "RsbTY87c3Hi0",
  fields: {
    clothing_item_list: {
      type: "hasMany",
      children: {
        model: "clothing_item",
        belongsToField: "item_name",
      },
      storageKey: "yIYrhgXZ5AaE",
    },
    user: {
      type: "belongsTo",
      parent: { model: "user" },
      storageKey: "ueHOopADMgwj",
    },
    w: {
      type: "belongsTo",
      parent: { model: "user" },
      storageKey: "L-r7UmleaSUC",
    },
  },
};
