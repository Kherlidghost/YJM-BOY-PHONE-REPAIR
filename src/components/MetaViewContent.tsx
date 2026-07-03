"use client";

import { useEffect } from "react";
import { trackMetaViewContent } from "@/lib/meta-pixel";

type MetaViewContentProps = {
  catalogProductId: string;
};

export function MetaViewContent({ catalogProductId }: MetaViewContentProps) {
  useEffect(() => {
    let retryCount = 0;
    let retryTimer: number | undefined;

    function fireViewContent() {
      // ViewContent is fired after product data loads. The content_id is the catalog feed id.
      const didFire = trackMetaViewContent({
        content_ids: [catalogProductId],
        content_type: "product",
      });

      if (!didFire && retryCount < 20) {
        retryCount += 1;
        retryTimer = window.setTimeout(fireViewContent, 250);
      }
    }

    fireViewContent();

    return () => {
      if (retryTimer) {
        window.clearTimeout(retryTimer);
      }
    };
  }, [catalogProductId]);

  return null;
}
