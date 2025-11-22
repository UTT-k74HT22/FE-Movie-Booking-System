import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";

function Collapsible({ isOpen, children, duration = 450, easing = "cubic-bezier(.2,.8,.2,1)" }) {
  const containerRef = useRef(null);
  const [maxH, setMaxH] = useState("0px");
  const [isAnimating, setIsAnimating] = useState(false);

  const transition = `max-height ${duration}ms ${easing}, opacity ${Math.round(duration / 2)}ms ${easing}`;

  // handle open/close
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const doOpen = () => {
      // đo chiều cao thực tế
      const h = el.scrollHeight;
      // đặt max-height => browser sẽ animate 0 -> h
      setIsAnimating(true);
      setMaxH(`${h}px`);
    };

    const doClose = () => {
      // If previously "none" (unconstrained), set to measured px first so we have a start value.
      const current = maxH;
      const measured = el.scrollHeight;
      // ensure there's a starting numeric px value before collapsing
      if (current === "none" || current === "0px") {
        // set to measured px then in next frame collapse to 0
        setMaxH(`${measured}px`);
        // next frame: set to 0 to trigger transition
        requestAnimationFrame(() => {
          // second rAF to ensure style applied
          requestAnimationFrame(() => {
            setIsAnimating(true);
            setMaxH("0px");
          });
        });
      } else {
        // normal: we already have a px start, go to 0
        setIsAnimating(true);
        setMaxH("0px");
      }
    };

    if (isOpen) doOpen();
    else doClose();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // after transition end: if opened, remove max-height constraint (allow grow).
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onTransitionEnd = (e) => {
      if (e.propertyName !== "max-height") return;
      // finished opening?
      if (isOpen) {
        // remove constraint so content can grow naturally
        setMaxH("none");
      }
      setIsAnimating(false);
    };

    el.addEventListener("transitionend", onTransitionEnd);
    return () => el.removeEventListener("transitionend", onTransitionEnd);
  }, [isOpen]);

  const style = {
    maxHeight: maxH,
    transition,
    overflow: "hidden",
    opacity: isOpen || isAnimating ? 1 : 0,
    willChange: "max-height, opacity",
  };

  return (
    <div ref={containerRef} style={style} aria-hidden={!isOpen}>
      {children}
    </div>
  );
}

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(null);

  const toggleMenu = (key) => {
    setIsOpen((prev) => (prev === key ? null : key));
  };

  // duration must match Collapsible default for perfect sync
  const chevronDuration = 450; // ms
  const chevronEasing = "cubic-bezier(.2,.8,.2,1)";

  const arrowClass = (open) =>
    `ml-auto transform transition-transform ${open ? "rotate-180" : "rotate-0"}`;

  return (
        <aside className="fixed top-0 left-0 h-screen w-[290px] bg-white border-r border-[#e0e0e0] px-5 box-border flex flex-col">
      <div className="flex items-center justify-center py-8">
        <NavLink to="/dashboard" className="text-2xl font-medium">
          ADMIN PANEL
        </NavLink>
      </div>

      <div className="flex flex-col overflow-y-auto no-scrollbar">
        <nav>
          <h2 className="mb-4 text-xs uppercase text-gray-400">menu</h2>
          <ul className="flex flex-col gap-1">
            <li>
              <NavLink
                className="px-3 py-2 flex items-center gap-3 w-full rounded-lg hover:bg-gray-100"
                to="/dashboard"
              >
                <span className="text-gray-500">
                  <i className="fi fi-rr-chart-simple text-base" />
                </span>
                <span className="text-gray-700 text-sm font-medium">Dashboard</span>
              </NavLink>
            </li>

            {/* Movies */}
            <li>
              <button
                onClick={() => toggleMenu("movies")}
                className="group px-3 py-2 flex items-center gap-3 w-full rounded-lg hover:bg-gray-100"
                aria-expanded={isOpen === "movies"}
                aria-controls="movies-collapse"
              >
                <span className="text-gray-500">
                  <i className="fi fi-rr-camera-movie text-base" />
                </span>
                <span className="text-gray-700 text-sm font-medium">Movies</span>

                {/* svg chevron - style inline to sync duration/easing */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={arrowClass(isOpen === "movies")}
                  style={{
                    width: 18,
                    height: 18,
                    transition: `transform ${chevronDuration}ms ${chevronEasing}`,
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              <Collapsible isOpen={isOpen === "movies"} duration={chevronDuration} easing={chevronEasing}>
                <ul id="movies-collapse" className="py-2.5 mt-2 space-y-1 ml-3 text-gray-700 text-sm font-medium">
                  <li>
                    <a className="block rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-gray-100 curcor-pointer" href="/addMovies">List Movies</a>
                  </li>
                  <li>
                    <NavLink className="block rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-gray-100 curcor-pointer" to="/addMovies">Add Movies</NavLink>
                  </li>
                </ul>
              </Collapsible>
            </li>

            {/* Cinemas */}
            <li>
              <button
                onClick={() => toggleMenu("cinemas")}
                className="group px-3 py-2 flex items-center gap-3 w-full rounded-lg hover:bg-gray-100"
                aria-expanded={isOpen === "cinemas"}
                aria-controls="cinemas-collapse"
              >
                <span className="text-gray-500">
                  <i className="fi fi-rr-video-camera text-base" />
                </span>
                <span className="text-gray-700 text-sm font-medium">Cinemas</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={arrowClass(isOpen === "cinemas")}
                  style={{
                    width: 18,
                    height: 18,
                    transition: `transform ${chevronDuration}ms ${chevronEasing}`,
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              <Collapsible isOpen={isOpen === "cinemas"} duration={chevronDuration} easing={chevronEasing}>
                <ul id="cinemas-collapse" className="py-2.5 mt-2 space-y-1 ml-3 text-gray-700 text-sm font-medium">

                  <li>
                    <a className="block rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-gray-100">
                      Cinemas List
                    </a>
                  </li>

                  <li>
                    <NavLink
                      to="/screens"
                      className="block rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-gray-100"
                    >
                      Screening Rooms
                    </NavLink>
                  </li>

                  <li>
                    <a className="block rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-gray-100">
                      Showtimes
                    </a>
                  </li>

                </ul>
              </Collapsible>
            </li>

            {/* Booking */}
            <li>
              <button
                onClick={() => toggleMenu("booking")}
                className="group px-3 py-2 flex items-center gap-3 w-full rounded-lg hover:bg-gray-100"
                aria-expanded={isOpen === "booking"}
                aria-controls="booking-collapse"
              >
                <span className="text-gray-500">
                  <i className="fi fi-rr-calendar-clock text-base" />
                </span>
                <span className="text-gray-700 text-sm font-medium">Booking</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={arrowClass(isOpen === "booking")}
                  style={{
                    width: 18,
                    height: 18,
                    transition: `transform ${chevronDuration}ms ${chevronEasing}`,
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              <Collapsible isOpen={isOpen === "booking"} duration={chevronDuration} easing={chevronEasing}>
                <ul id="booking-collapse" className="py-2.5 mt-2 space-y-1 ml-3 text-gray-700 text-sm font-medium">
                  <li>
                    <a className="block rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-gray-100">Booking List</a>
                  </li>
                  <li>
                    <a className="block rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-gray-100">Booking Statistics</a>
                  </li>
                </ul>
              </Collapsible>
            </li>

            <li className="px-3 py-2 text-sm">Users</li>
            <li className="px-3 py-2 text-sm">Payments</li>
            <li className="px-3 py-2 text-sm">Setting</li>
            <li className="px-3 py-2 text-sm">Account</li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
