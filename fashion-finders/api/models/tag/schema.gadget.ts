import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "tag" model, go to https://fashion-finders.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "XEvLsIdEvNtH",
  fields: {
    clothingItem: {
      type: "hasManyThrough",
      sibling: { model: "clothing_item", relatedField: "tags" },
      join: {
        model: "clothing_item_tag",
        belongsToSelfField: "tag",
        belongsToSiblingField: "clothingItem",
      },
      storageKey: "Zf05VGq5LURc",
    },
    clothing_item_tag: {
      type: "hasOne",
      child: { model: "clothing_item_tag", belongsToField: "tag" },
      storageKey: "WoEp_RfCiXTH",
    },
    tag_name: { type: "string", storageKey: "ALO6iZE1ApMl" },
  },
};
