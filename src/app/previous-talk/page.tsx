"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import Image from "next/image";

export default function RealTalkPage() {
  const textBlockRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const backButtonRef = useRef<HTMLAnchorElement>(null);

  const talks = [
    {
      section: "VC Conversations with Maven 11",
      title: "Meetings with Maven 11 Capital",
      text: "Following our hackathon win, we were approached by Maven 11, a notable Web3 VC. I led multiple meetings to discuss our roadmap, sustainability, and market fit. Though our project wasn't mature enough for investment, one of their partners expressed personal interest in my work and offered future connections with Web3 companies they invest in.",
      image: "/maven11.png",
    },
    {
      section: "Hackathon Presentation",
      title: "Top 10 Winner in Celestia's Mammothon",
      award: "$250,000",
      project: "WeAreLazyDev",
      text: "I led the technical narrative and demo pitch for WeAreLazyDev, a project built during Celestia's Mammothon hackathon. Out of hundreds of teams, we placed in the Top 10 and received $250,000 in grant funding. I focused on communicating our architecture, the problem we solved, and why modular chains matter in the real world.",
      image: "/hackathon.png",
    },

    {
      section: "2K+ Organic Followers on X",
      title: "Casual Sharing",
      location: "@makantersera",
      text: "I've grown a personal Twitter account with over 2,000 organic followers, where I casually share thoughts, ideas, and updates—from dev life to crypto tech to everyday ramblings. Occasionally, I break down something I've learned in Web3 or share behind-the-scenes from hackathons. It's not a polished 'Crypto Twitter,' but it's where I keep things real and connect with peers.",
      image: "/x.png",
    },
    {
      section: "Sharing with Local Dev Community",
      title: " ",
      location: "CryptoWorldID",
      text: "I've spoken to student devs and beginner builders to demystify hackathons and share how I got started in Web3. My focus was on making the space feel less intimidating, showing them real results, and encouraging them to experiment and ship. Several attendees have since joined hackathons or built their first smart contract.",
      image: "/crypto.png",
    },
  ];

  useEffect(() => {
    const textElements =
      textBlockRef.current?.querySelectorAll('[data-scramble="true"]') || [];

    textElements.forEach((element) => {
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
    <>
      <div
        className="w-full min-h-screen"
        style={{
          background: "#f5f5f5",
          padding: "clamp(1rem, 4vw, 2rem) clamp(0.5rem, 2vw, 1rem)",
        }}
      >
        <div
          ref={textBlockRef}
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            padding: "0 clamp(0.5rem, 2vw, 1rem)",
            fontFamily: "var(--font-space-mono), monospace",
            color: "#000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              marginBottom: "clamp(1.5rem, 4vw, 3rem)",
              textAlign: "center",
              width: "100%",
            }}
          >
            <h1
              ref={titleRef}
              data-scramble="true"
              style={{
                fontSize: "clamp(2rem, 6vw, 4rem)",
                marginTop: "clamp(0.5rem, 2vw, 1rem)",
                marginBottom: "clamp(0.5rem, 2vw, 1rem)",
                fontWeight: 400,
                wordBreak: "break-word",
              }}
            >
              Developer Relations
            </h1>
          </div>

          <div
            style={{
              marginBottom: "clamp(2rem, 4vw, 3rem)",
              textAlign: "center",
              width: "100%",
            }}
          >
            <p
              data-scramble="true"
              style={{
                fontSize: "clamp(14px, 2.5vw, 24px)",
                lineHeight: "1.6",
                marginBottom: "2rem",
                opacity: 0.8,
                maxWidth: "800px",
                margin: "0 auto",
              }}
            >
              Developer Relations is more than shipping code—it's about telling
              the story behind the work. This is where I share how I've
              communicated my journey, shared wins, and built bridges in the
              Web3 space.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 400px), 1fr))",
              gap: "clamp(1.5rem, 4vw, 3rem)",
              marginBottom: "clamp(2rem, 4vw, 3rem)",
              width: "100%",
            }}
          >
            {talks.map((talk, index) => (
              <div
                key={index}
                style={{
                  padding: "clamp(1rem, 3vw, 2rem)",
                  border: "2px solid #000",
                  backgroundColor: "transparent",
                  textAlign: "left",
                  minWidth: 0,
                }}
              >
                <div style={{ marginBottom: "1.5rem" }}>
                  <h2
                    data-scramble="true"
                    style={{
                      fontSize: "clamp(16px, 2.5vw, 24px)",
                      marginBottom: "0.5rem",
                      fontWeight: 400,
                      display: "flex",
                      alignItems: "center",
                      letterSpacing: "0.05rem",
                      whiteSpace: "nowrap",
                      flexWrap: "wrap",
                      wordBreak: "break-word",
                    }}
                  >
                    {talk.section}
                  </h2>

                  <h3
                    data-scramble="true"
                    style={{
                      fontSize: "clamp(14px, 2vw, 20px)",
                      marginBottom: "1rem",
                      fontWeight: 400,
                      opacity: 0.9,
                      wordBreak: "break-word",
                    }}
                  >
                    {talk.title}
                  </h3>

                  {talk.award && (
                    <div
                      data-scramble="true"
                      style={{
                        fontSize: "clamp(12px, 1.8vw, 16px)",
                        marginBottom: "0.5rem",
                        color: "#2563eb",
                        fontWeight: 600,
                        wordBreak: "break-word",
                      }}
                    >
                      💰 Award: {talk.award}
                    </div>
                  )}

                  {talk.project && (
                    <div
                      data-scramble="true"
                      style={{
                        fontSize: "clamp(12px, 1.8vw, 16px)",
                        marginBottom: "0.5rem",
                        opacity: 0.8,
                        wordBreak: "break-word",
                      }}
                    >
                      🧠 Project: {talk.project}
                    </div>
                  )}

                  {talk.location && (
                    <div
                      data-scramble="true"
                      style={{
                        fontSize: "clamp(12px, 1.8vw, 16px)",
                        marginBottom: "0.5rem",
                        opacity: 0.8,
                        wordBreak: "break-word",
                      }}
                    >
                      📍 Location: {talk.location}
                    </div>
                  )}
                </div>

                <p
                  data-scramble="true"
                  style={{
                    fontSize: "clamp(12px, 1.8vw, 16px)",
                    lineHeight: "1.6",
                    marginBottom: "1.5rem",
                    opacity: 0.8,
                    wordBreak: "break-word",
                  }}
                >
                  {talk.text}
                </p>

                <div
                  style={{
                    width: "100%",
                    overflow: "hidden",
                    borderRadius: "4px",
                  }}
                >
                  <Image
                    src={talk.image}
                    alt={talk.title}
                    width={800}
                    height={600}
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      maxWidth: "100%",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", width: "100%" }}>
            <Link
              href="/"
              ref={backButtonRef}
              data-scramble="true"
              style={{
                display: "inline-block",
                background: "transparent",
                border: "2px solid #000",
                color: "#000",
                padding: "clamp(0.5rem, 2vw, 0.75rem) clamp(1rem, 3vw, 1.5rem)",
                fontFamily: "var(--font-space-mono), monospace",
                fontSize: "clamp(12px, 2.5vw, 18px)",
                textDecoration: "none",
                transition: "all 0.3s ease",
                minWidth: "120px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#000";
                e.currentTarget.style.color = "#f5f5f5";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#000";
              }}
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .char {
          will-change: transform;
        }

        /* Base styles - ensure no overflow */
        * {
          box-sizing: border-box;
        }

        body {
          overflow-x: hidden;
        }

        /* Ensure responsive images */
        img {
          max-width: 100% !important;
          height: auto !important;
          object-fit: cover;
        }

        /* Large tablets and small desktops */
        @media (max-width: 1024px) {
          div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
          }
        }

        /* Tablets */
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
          }

          /* Ensure single column layout */
          div[style*="gap: clamp"] {
            gap: clamp(1rem, 3vw, 2rem) !important;
          }
        }

        /* Mobile devices */
        @media (max-width: 480px) {
          /* Force single column and reduce spacing */
          div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }

          /* Adjust padding for mobile */
          div[style*="padding: clamp(1rem"] {
            padding: 1rem !important;
          }

          /* Ensure text doesn't overflow */
          h1,
          h2,
          h3,
          p,
          div {
            word-wrap: break-word !important;
            overflow-wrap: break-word !important;
          }
        }

        /* Extra small devices */
        @media (max-width: 320px) {
          div[style*="padding: clamp(1rem, 4vw, 2rem)"] {
            padding: 0.5rem 0.25rem !important;
          }

          div[style*="padding: 0 clamp"] {
            padding: 0 0.5rem !important;
          }

          div[style*="padding: clamp(1rem"] {
            padding: 0.75rem !important;
          }
        }

        /* Touch device optimizations */
        @media (hover: none) and (pointer: coarse) {
          /* Improve touch targets */
          a,
          button {
            min-height: 44px;
            min-width: 44px;
          }
        }

        /* High DPI displays */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          img {
            image-rendering: -webkit-optimize-contrast;
          }
        }
      `}</style>
    </>
  );
}
