import { useAction, useTable, useActionForm } from "@gadgetinc/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { api } from "../api";

export default function InvitePage() {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const { toast } = useToast();
  const [_, resendInvite] = useAction(api.invite.resend);

  const [{ rows, columns }] = useTable(api.invite, {
    columns: ["email", "updatedAt"],
  });

  const handleResendInvite = async (id: string) => {
    const { error } = await resendInvite({ id });
    toast({
      title: error ? "Error" : "Success",
      description: error ? "Failed to resend invite" : "Invite resent",
      variant: error ? "destructive" : "default",
    });
  };

  return (
    <section
      style={{
        backgroundColor: "lightyellow",
        color: "brown",
        fontFamily: "'Book Antiqua', serif",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <div className="container mx-auto p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Invite team</h1>
            <Button
              onClick={() => setShowInviteModal(true)}
              style={{
                backgroundColor: "lightyellow",
                color: "brown",
                fontFamily: "'Book Antiqua', serif",
              }}
            >
              Invite
            </Button>
          </div>

          <Card
            style={{
              backgroundColor: "lightyellow",
              color: "brown",
              fontFamily: "'Book Antiqua', serif",
            }}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Sent at</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows?.map((row) => (
                  <TableRow key={row.id as string}>
                    <TableCell>{row.email as string}</TableCell>
                    <TableCell>
                      {row.updatedAt ? row.updatedAt.toLocaleString() : ""}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        className="hover:underline"
                        onClick={() => handleResendInvite(row.id as string)}
                        style={{
                          backgroundColor: "lightyellow",
                          color: "brown",
                          fontFamily: "'Book Antiqua', serif",
                        }}
                      >
                        Resend invite
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>

        <InviteModal
          open={showInviteModal}
          onClose={() => setShowInviteModal(false)}
        />
      </div>
    </section>
  );
}

const InviteModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const {
    register,
    submit,
    formState: { isSubmitting },
  } = useActionForm(api.invite.create, {
    onSuccess: onClose,
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        style={{
          backgroundColor: "lightyellow",
          color: "brown",
          fontFamily: "'Book Antiqua', serif",
        }}
      >
        <DialogHeader>
          <DialogTitle>Invite team member</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit}>
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Email address"
              {...register("email")}
              style={{
                backgroundColor: "lightyellow",
                color: "brown",
                fontFamily: "'Book Antiqua', serif",
              }}
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              style={{
                backgroundColor: "lightyellow",
                color: "brown",
                fontFamily: "'Book Antiqua', serif",
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              style={{
                backgroundColor: "lightyellow",
                color: "brown",
                fontFamily: "'Book Antiqua', serif",
              }}
            >
              Send invite
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
