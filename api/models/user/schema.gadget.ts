import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "user" model, go to https://fashionfinder.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "tu7lXp3jiUMB",
  fields: {
    email: {
      type: "email",
      validations: { required: true, unique: true },
      storageKey: "oD1boIJIG2Ia",
    },
    emailVerificationToken: {
      type: "string",
      storageKey: "wHSFQ61Uq6M_",
    },
    emailVerificationTokenExpiration: {
      type: "dateTime",
      includeTime: true,
      storageKey: "BfPCjgkfSknF",
    },
    emailVerified: {
      type: "boolean",
      default: false,
      storageKey: "7I72ZE71rH5B",
    },
    firstName: { type: "string", storageKey: "irHDQgAp0MoW" },
    googleImageUrl: { type: "url", storageKey: "RKRt6FDitNCJ" },
    googleProfileId: { type: "string", storageKey: "FDV98-ToV0kY" },
    lastName: { type: "string", storageKey: "RJWVbv9o2hVo" },
    lastSignedIn: {
      type: "dateTime",
      includeTime: true,
      storageKey: "ge49krU-PIvd",
    },
    password: {
      type: "password",
      validations: { strongPassword: true },
      storageKey: "3WlXwES4JPw2",
    },
    profilePicture: {
      type: "file",
      allowPublicAccess: true,
      storageKey: "KQlL3wCqOVIh",
    },
    resetPasswordToken: {
      type: "string",
      storageKey: "gY9IYdTLAETc",
    },
    resetPasswordTokenExpiration: {
      type: "dateTime",
      includeTime: true,
      storageKey: "hqkUXE5SQYhh",
    },
    roles: {
      type: "roleList",
      default: ["unauthenticated"],
      storageKey: "WJkCZpcDfF7a",
    },
  },
};
