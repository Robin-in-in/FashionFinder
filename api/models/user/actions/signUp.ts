import { applyParams, ActionOptions, hashCode, save } from "gadget-server";

export const run: ActionRun = async ({ params, record, logger, api, session }) => {
  // Applies new 'email' and 'password' to the user record and saves to database
  applyParams(params, record);

  // Ensure that the user is signing up with a valid invite
  const inviteToken = params.inviteCode && hashCode(params.inviteCode);
  const invite =
    inviteToken &&
    (await api.internal.invite.maybeFindFirst({
      filter: { inviteToken: { equals: inviteToken } },
      select: { id: true, email: true },
    }));

  if (!invite) {
    throw new Error(
      "You need to be invited to sign up to this application. Please ask the administrator of this application to invite you."
    );
  }

  if (invite.email !== record.email) {
    throw new Error(
      "The email address for this invite doesn't match the email that you have tried to sign up with. Please sign up with the email address the invitation was sent to."
    );
  }

  record.lastSignedIn = new Date();
  // since we've verified the invite via email, we can mark the user as emailVerified
  record.emailVerified = true;
  (record as any).roles = ["signed-in"];

  await save(record);

  // Assigns the signed-in user to the active session
  session?.set("user", { _link: record.id });

  await api.internal.invite.delete(invite.id);

  return {
    result: "ok",
  };
};

export const params = {
  inviteCode: { type: "string" },
};

export const options: ActionOptions = {
  actionType: "create",
  returnType: true,
  triggers: {
    googleOAuthSignUp: true,
    emailSignUp: true,
  },
};
