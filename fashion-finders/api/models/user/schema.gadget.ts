import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "user" model, go to https://fashion-finders.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "F8_LPmjDwhsT",
  fields: {
    email: {
      type: "email",
      validations: { required: true, unique: true },
      storageKey: "TgkwulGHWsEQ",
    },
    emailVerificationToken: {
      type: "string",
      storageKey: "gdbJoyCHMm-l",
    },
    emailVerificationTokenExpiration: {
      type: "dateTime",
      includeTime: true,
      storageKey: "9QVMkMPXMRZk",
    },
    emailVerified: {
      type: "boolean",
      default: false,
      storageKey: "XRRO2KU7yGzM",
    },
    firstName: { type: "string", storageKey: "9WU6FktUjNuY" },
    googleImageUrl: { type: "url", storageKey: "s8xuBvowyS5U" },
    googleProfileId: { type: "string", storageKey: "AQDOuSBRQrf-" },
    lastName: { type: "string", storageKey: "KDYPjUg4VVij" },
    lastSignedIn: {
      type: "dateTime",
      includeTime: true,
      storageKey: "g3NlVHjMGfsA",
    },
    password: {
      type: "password",
      validations: { strongPassword: true },
      storageKey: "zEMCAYwB9dV-",
    },
    profilePicture: {
      type: "file",
      allowPublicAccess: true,
      storageKey: "p-jILHbBYXOa",
    },
    resetPasswordToken: {
      type: "string",
      storageKey: "oWGrle1PMv__",
    },
    resetPasswordTokenExpiration: {
      type: "dateTime",
      includeTime: true,
      storageKey: "Hj3i3rWFmlXB",
    },
    roles: {
      type: "roleList",
      default: ["unauthenticated"],
      storageKey: "79o4PrATo4iV",
    },
    wardrobe_id: {
      type: "hasOne",
      child: { model: "wardrobe", belongsToField: "user" },
      storageKey: "twZgUv83cjjH",
    },
  },
};
