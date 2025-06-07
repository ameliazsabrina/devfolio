"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import Image from "next/image";

export default function Web2Page() {
  const textBlockRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const backButtonRef = useRef<HTMLAnchorElement>(null);

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

  const projects = [
    {
      name: "Sericlo",
      description:
        "A comprehensive preloved fashion e-commerce platform with inventory management, order processing, and AI-Redesign to help users reuse their clothes. Built with modern web technologies for optimal performance and user experience.",
      techStack: ["Next.js", "TypeScript", "PostgreSQL", "Express", "Supabase"],
      githubUrl: "https://github.com/ameliazsabrina/sericlo-app",
      liveUrl: "https://sericlo.my.id",
      image: "/sericlo.png",
      imageAlt: "Sericlo e-commerce platform mockup",
    },
    {
      name: "JournalShe",
      description:
        "A comprehensive digital journaling platform for educational institutions, enabling students to submit assignments, receive AI-powered feedback, and track their academic progress through gamified features.",
      techStack: ["Next.js", "TypeScript", "Hono", "PostgreSQL"],
      githubUrl: "https://github.com/ameliazsabrina/journalshe",
      liveUrl: "https://journalshe.xyz",
      image: "/journalshe.png",
      imageAlt: "JournalShe digital journal app mockup",
    },
  ];

  return (
    <div
      className="w-full min-h-screen page-container"
      style={{ background: "#f5f5f5", padding: "2rem 1rem" }}
    >
      <div
        ref={textBlockRef}
        className="content-wrapper"
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          padding: "0 1rem",
          fontFamily: "var(--font-space-mono), monospace",
          color: "#000",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="title-section"
          style={{ marginBottom: "3rem", textAlign: "center" }}
        >
          <h1
            ref={titleRef}
            data-scramble="true"
            className="main-title"
            style={{
              fontSize: "4rem",
              marginTop: "1rem",
              marginBottom: "2rem",
              fontWeight: 400,
            }}
          >
            Web2 Projects
          </h1>
        </div>

        <div
          className="projects-grid"
          style={{ display: "grid", gap: "3rem", marginBottom: "3rem" }}
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card"
              style={{
                display: "grid",
                gridTemplateColumns: "0.8fr 1.2fr",
                gap: "2rem",
                padding: "2rem",
                border: "2px solid #000",
                backgroundColor: "transparent",
              }}
            >
              <div className="aspect-[4/3] flex items-center justify-center text-xs text-[#666] text-center p-4">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  width={500}
                  height={500}
                />
              </div>

              <div>
                <h2
                  data-scramble="true"
                  style={{
                    fontSize: "clamp(20px, 4vw, 28px)",
                    marginBottom: "1rem",
                    fontWeight: 400,
                  }}
                >
                  {project.name}
                </h2>

                <p
                  data-scramble="true"
                  style={{
                    fontSize: "14px",
                    lineHeight: "1.5",
                    marginBottom: "1.5rem",
                    opacity: 0.8,
                  }}
                >
                  {project.description}
                </p>

                <div style={{ marginBottom: "1.5rem" }}>
                  <h3
                    data-scramble="true"
                    style={{
                      fontSize: "16px",
                      marginBottom: "0.5rem",
                      fontWeight: 400,
                    }}
                  >
                    Tech Stack:
                  </h3>
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}
                  >
                    {project.techStack.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        data-scramble="true"
                        style={{
                          padding: "0.25rem 0.5rem",
                          border: "1px solid #000",
                          fontSize: "12px",
                          backgroundColor: "transparent",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {/* GitHub Link */}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.5rem 1rem",
                      border: "2px solid #000",
                      color: "#000",
                      textDecoration: "none",
                      fontSize: "12px",
                      transition: "all 0.3s ease",
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
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.046.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span data-scramble="true">GitHub</span>
                  </a>

                  {/* Live URL */}
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: "0.5rem 1rem",
                      border: "2px solid #000",
                      color: "#000",
                      textDecoration: "none",
                      fontSize: "12px",
                      transition: "all 0.3s ease",
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
                    <span data-scramble="true">Live Demo</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <Link
            href="/"
            ref={backButtonRef}
            data-scramble="true"
            style={{
              display: "inline-block",
              background: "transparent",
              border: "2px solid #000",
              color: "#000",
              padding: "0.75rem 1.5rem",
              fontFamily: "var(--font-space-mono), monospace",
              fontSize: "clamp(14px, 3vw, 18px)",
              textDecoration: "none",
              transition: "all 0.3s ease",
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

        <style jsx>{`
          .char {
            will-change: transform;
          }

          /* Tablet styles */
          @media (max-width: 768px) {
            .project-card {
              grid-template-columns: 1fr !important;
              gap: 1.5rem !important;
            }

            .projects-grid {
              gap: 2rem !important;
            }

            .main-title {
              font-size: 3rem !important;
            }
          }

          /* Mobile styles */
          @media (max-width: 480px) {
            .page-container {
              padding: 1rem 0.5rem !important;
            }

            .main-title {
              font-size: 2.5rem !important;
              margin-top: 0.5rem !important;
              margin-bottom: 1rem !important;
            }

            .title-section {
              margin-bottom: 1.5rem !important;
            }

            .project-card {
              padding: 1rem !important;
            }

            .projects-grid {
              gap: 1.5rem !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
