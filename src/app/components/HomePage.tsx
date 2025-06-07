"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Link from "next/link";

export const Home = () => {
  const textBlockRef = useRef<HTMLDivElement>(null);
  const paragraph1Ref = useRef<HTMLParagraphElement>(null);
  const paragraph2Ref = useRef<HTMLParagraphElement>(null);
  const button1Ref = useRef<HTMLAnchorElement>(null);
  const button2Ref = useRef<HTMLAnchorElement>(null);
  const button3Ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const elements = [
      paragraph1Ref.current,
      paragraph2Ref.current,
      button1Ref.current,
      button2Ref.current,
      button3Ref.current,
    ];

    elements.forEach((element) => {
      if (!element) return;

      const text = element.textContent || "";
      const chars = text.split("");

      element.innerHTML = chars
        .map((char, index) =>
          char === " "
            ? " "
            : `<span class="char" data-content="${char}">${char}</span>`
        )
        .join("");
    });
    const allCharElements =
      textBlockRef.current?.querySelectorAll(".char") || [];

    const handlePointerMove = (e: PointerEvent) => {
      allCharElements.forEach((char) => {
        const rect = char.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          const originalContent = char.getAttribute("data-content") || "";
          const scrambleChars = ".:#@*";

          gsap.to(char, {
            overwrite: true,
            duration: 1.2 - dist / 100,
            ease: "none",
            onUpdate: function () {
              if (this.progress() < 0.7) {
                char.textContent =
                  scrambleChars[
                    Math.floor(Math.random() * scrambleChars.length)
                  ];
              } else {
                char.textContent = originalContent;
              }
            },
          });
        }
      });
    };

    if (textBlockRef.current) {
      textBlockRef.current.addEventListener("pointermove", handlePointerMove);
    }

    return () => {
      if (textBlockRef.current) {
        textBlockRef.current.removeEventListener(
          "pointermove",
          handlePointerMove
        );
      }
    };
  }, []);

  return (
    <div
      ref={textBlockRef}
      className="text-block"
      style={{
        margin: "12vw",
        maxWidth: "800px",
        fontFamily: "var(--font-space-mono), monospace",
        fontWeight: 400,
        fontSize: "clamp(16px, 4vw, 40px)",
        color: "#fff",
      }}
    >
      <p ref={paragraph1Ref} style={{ marginBottom: "1em" }}>
        Hi, I'm Sabrina
      </p>

      <p ref={paragraph2Ref} style={{ marginBottom: "2em" }}>
        a Web2 fullstack dev + smart contract dev transitioning into DevRel to
        help more developers build in Web3.
      </p>

      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          <Link
            href="/previous-talk"
            ref={button1Ref}
            style={{
              display: "inline-block",
              background: "transparent",
              border: "2px solid #fff",
              color: "#fff",
              padding: "1rem 2rem",
              fontFamily: "var(--font-space-mono), monospace",
              fontSize: "clamp(14px, 3vw, 24px)",
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.color = "#0f0f0f";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#fff";
            }}
          >
            Previous Talks
          </Link>
          <Link
            href="/web2"
            ref={button2Ref}
            style={{
              display: "inline-block",
              background: "transparent",
              border: "2px solid #fff",
              color: "#fff",
              padding: "1rem 2rem",
              fontFamily: "var(--font-space-mono), monospace",
              fontSize: "clamp(14px, 3vw, 24px)",
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.color = "#0f0f0f";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#fff";
            }}
          >
            Web2 Work
          </Link>

          <Link
            href="/web3"
            ref={button3Ref}
            style={{
              display: "inline-block",
              background: "transparent",
              border: "2px solid #fff",
              color: "#fff",
              padding: "1rem 2rem",
              fontFamily: "var(--font-space-mono), monospace",
              fontSize: "clamp(14px, 3vw, 24px)",
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.color = "#0f0f0f";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#fff";
            }}
          >
            Web3 Work
          </Link>
        </div>
      </div>

      <style jsx>{`
        .char {
          will-change: transform;
        }
      `}</style>
    </div>
  );
};
