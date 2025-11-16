"use client";

import {
  useEffect,
  useState,
  useCallback,
  useRef,
  startTransition,
} from "react";
import { useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";

const SUCCESS_MESSAGE_DURATION = 5000;
const SUCCESS_QUERY_PARAM = "booking";
const SUCCESS_QUERY_VALUE = "success";

export function SuccessMessage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [show, setShow] = useState(false);
  const hasProcessedRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const t = useTranslations("tickets");

  const cleanupUrl = useCallback(() => {
    router.replace("/tickets", { scroll: false });
  }, [router]);

  useEffect(() => {
    const bookingParam = searchParams.get(SUCCESS_QUERY_PARAM);
    const shouldShow = bookingParam === SUCCESS_QUERY_VALUE;

    if (shouldShow && !hasProcessedRef.current) {
      hasProcessedRef.current = true;

      startTransition(() => {
        setShow(true);
      });

      cleanupUrl();

      timerRef.current = setTimeout(() => {
        startTransition(() => {
          setShow(false);
        });
      }, SUCCESS_MESSAGE_DURATION);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [searchParams, cleanupUrl]);

  if (!show) {
    return null;
  }

  return (
    <div
      role="alert"
      aria-live="polite"
      className="mb-6 rounded-md bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4"
    >
      <div className="flex items-center gap-2">
        <CheckCircle2
          className="h-5 w-5 text-green-600 dark:text-green-400"
          aria-hidden="true"
        />
        <p className="text-sm font-medium text-green-800 dark:text-green-200">
          {t("ticketBookedSuccessfully")}
        </p>
      </div>
    </div>
  );
}
