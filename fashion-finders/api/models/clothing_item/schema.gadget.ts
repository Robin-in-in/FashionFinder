import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "clothing_item" model, go to https://fashion-finders.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "wsGfhNm7JUCp",
  fields: {
    clothing_item_tag: {
      type: "hasOne",
      child: {
        model: "clothing_item_tag",
        belongsToField: "clothingItem",
      },
      storageKey: "FiO1ktTlYvkT",
    },
    item_name: { type: "string", storageKey: "so6Ui2ikTNr_" },
    tags: {
      type: "hasManyThrough",
      sibling: { model: "tag", relatedField: "clothingItem" },
      join: {
        model: "clothing_item_tag",
        belongsToSelfField: "clothingItem",
        belongsToSiblingField: "tag",
      },
      storageKey: "29MlA6_Z_BuT",
    },
  },
};
