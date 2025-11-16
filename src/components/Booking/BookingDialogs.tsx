"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface BookingDialogsProps {
  showSuccessDialog: boolean;
  showErrorDialog: boolean;
  errorMessage: string;
  onSuccessClose: () => void;
  onSuccessBackToEvent: () => void;
  onErrorClose: () => void;
}

export function BookingDialogs({
  showSuccessDialog,
  showErrorDialog,
  errorMessage,
  onSuccessClose,
  onSuccessBackToEvent,
  onErrorClose,
}: BookingDialogsProps) {
  const t = useTranslations("booking");
  const tCommon = useTranslations("common");

  return (
    <>
      {/* Success Dialog */}
      <Dialog
        open={showSuccessDialog}
        onOpenChange={(open) => {
          if (!open) {
            onSuccessClose();
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <DialogTitle>{t("successTitle")}</DialogTitle>
            </div>
            <DialogDescription>{t("successDescription")}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={onSuccessClose}>{t("viewMyTickets")}</Button>
            <Button variant="outline" onClick={onSuccessBackToEvent}>
              {t("backToEvent")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Error Dialog */}
      <Dialog
        open={showErrorDialog}
        onOpenChange={(open) => {
          if (!open) {
            onErrorClose();
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <DialogTitle>{t("errorTitle")}</DialogTitle>
            </div>
            <DialogDescription>{errorMessage}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={onErrorClose}>{tCommon("close")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
