import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "clothing_item_tag" model, go to https://fashion-finders.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "AnW7jSojbscu",
  fields: {
    clothingItem: {
      type: "belongsTo",
      parent: { model: "clothing_item" },
      storageKey: "rBrAxTQUkRTK",
    },
    tag: {
      type: "belongsTo",
      parent: { model: "tag" },
      storageKey: "l9nDOLAoQoI-",
    },
  },
};
