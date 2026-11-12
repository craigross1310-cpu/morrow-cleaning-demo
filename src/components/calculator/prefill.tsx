"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { SERVICES } from "@/config/pricing";
import { useBooking } from "@/lib/booking-store";

/**
 * Supports links such as /quote?service=deep: once saved progress has been
 * restored, pre-selects that service, moves to the property step and tidies
 * the URL. Rendered inside <Suspense> because it reads search params.
 */
export function QuotePrefill() {
  const params = useSearchParams();
  const router = useRouter();
  const { ready, setService } = useBooking();
  const done = useRef(false);

  useEffect(() => {
    if (!ready || done.current) return;
    done.current = true;
    const id = params.get("service");
    const service = SERVICES.find((s) => s.id === id);
    if (service) setService(service.id, { advance: true });
    if (id !== null) router.replace("/quote", { scroll: false });
  }, [ready, params, router, setService]);

  return null;
}
