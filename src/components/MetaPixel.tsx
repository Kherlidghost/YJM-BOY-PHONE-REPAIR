"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { trackMetaContact, trackMetaPageView } from "@/lib/meta-pixel";

type MetaPixelProps = {
  pixelId?: string;
};

export function MetaPixel({ pixelId }: MetaPixelProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const normalizedPixelId = pixelId?.trim();
  const [isPixelReady, setIsPixelReady] = useState(false);

  useEffect(() => {
    if (!normalizedPixelId || !isPixelReady) {
      return;
    }

    // PageView is fired once for the first URL and again whenever Next changes route.
    trackMetaPageView();
  }, [isPixelReady, normalizedPixelId, pathname, searchParams]);

  useEffect(() => {
    if (!normalizedPixelId) {
      return;
    }

    function handleContactClick(event: MouseEvent) {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const link = target.closest<HTMLAnchorElement>("a[href]");
      const href = link?.href.toLowerCase();

      if (!href) {
        return;
      }

      // WhatsApp clicks are real contact intent, so they send Contact.
      if (href.includes("wa.me") || href.includes("whatsapp")) {
        trackMetaContact("whatsapp_click");
        return;
      }

      // Phone call clicks are real contact intent, so they send Contact.
      if (href.startsWith("tel:")) {
        trackMetaContact("phone_call_click");
      }
    }

    document.addEventListener("click", handleContactClick);
    return () => document.removeEventListener("click", handleContactClick);
  }, [normalizedPixelId]);

  if (!normalizedPixelId) {
    return null;
  }

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive" onReady={() => setIsPixelReady(true)}>
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${normalizedPixelId}');
        `}
      </Script>
      <noscript>
        {/* Pixel fallback for browsers with JavaScript disabled. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          height="1"
          src={`https://www.facebook.com/tr?id=${normalizedPixelId}&ev=PageView&noscript=1`}
          style={{ display: "none" }}
          width="1"
        />
      </noscript>
    </>
  );
}
