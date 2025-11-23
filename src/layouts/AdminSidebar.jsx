import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";

function Collapsible({
  isOpen,
  children,
  duration = 450,
  easing = "cubic-bezier(.2,.8,.2,1)",
}) {
  const containerRef = useRef(null);
  const [maxH, setMaxH] = useState("0px");
  const [isAnimating, setIsAnimating] = useState(false);

  const transition = `max-height ${duration}ms ${easing}, opacity ${Math.round(
    duration / 2
  )}ms ${easing}`;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const doOpen = () => {
      const h = el.scrollHeight;
      setIsAnimating(true);
      setMaxH(`${h}px`);
    };

    const doClose = () => {
      const current = maxH;
      const measured = el.scrollHeight;
      if (current === "none" || current === "0px") {
        setMaxH(`${measured}px`);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsAnimating(true);
            setMaxH("0px");
          });
        });
      } else {
        setIsAnimating(true);
        setMaxH("0px");
      }
    };

    if (isOpen) doOpen();
    else doClose();
  }, [isOpen]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onTransitionEnd = (e) => {
      if (e.propertyName !== "max-height") return;
      // finished opening?
      if (isOpen) {
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

  const chevronDuration = 450;
  const chevronEasing = "cubic-bezier(.2,.8,.2,1)";

  const arrowClass = (open) =>
    `ml-auto transform transition-transform ${
      open ? "rotate-180" : "rotate-0"
    }`;

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
                <span className="text-gray-700 text-sm font-medium">
                  Dashboard
                </span>
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
                <span className="text-gray-700 text-sm font-medium">
                  Movies
                </span>


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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>

              <Collapsible
                isOpen={isOpen === "movies"}
                duration={chevronDuration}
                easing={chevronEasing}
              >
                <ul
                  id="movies-collapse"
                  className="py-2.5 mt-2 space-y-1 ml-3 text-gray-700 text-sm font-medium"
                >
                  <li>
                    <a
                      className="block rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-gray-100 curcor-pointer"
                      href="/addMovies"
                    >
                      List Movies
                    </a>
                  </li>
                  <li>
                    <NavLink
                      className="block rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-gray-100 curcor-pointer"
                      to="/addMovies"
                    >
                      Add Movies
                    </NavLink>
                  </li>
                </ul>
              </Collapsible>
            </li>

            {/* theater */}
            <li>
              <button
                onClick={() => toggleMenu("theater")}
                className="group px-3 py-2 flex items-center gap-3 w-full rounded-lg hover:bg-gray-100"
                aria-expanded={isOpen === "theater"}
                aria-controls="theater-collapse"
              >
                <span className="text-gray-500">
                  <i className="fi fi-rr-stage-theatre" />
                </span>
                <span className="text-gray-700 text-sm font-medium">
                  Theater
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={arrowClass(isOpen === "theater")}
                  style={{
                    width: 18,
                    height: 18,
                    transition: `transform ${chevronDuration}ms ${chevronEasing}`,
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>

              <Collapsible
                isOpen={isOpen === "theater"}
                duration={chevronDuration}
                easing={chevronEasing}
              >
                <ul
                  id="theater-collapse"
                  className="py-2.5 mt-2 space-y-1 ml-3 text-gray-700 text-sm font-medium"
                >
                  <li>
                    <NavLink className="block rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-gray-100" to="/theaterList">
                      Theater List
                    </NavLink>
                  </li>
                </ul>
              </Collapsible>
            </li>
            {/* screen */}
            <li>
              <button
                onClick={() => toggleMenu("Screen")}
                className="group px-3 py-2 flex items-center gap-3 w-full rounded-lg hover:bg-gray-100"
                aria-expanded={isOpen === "Screen"}
                aria-controls="Screen-collapse"
              >
                <span className="text-gray-500">
                  <i className="fi fi-rr-screen" />
                </span>
                <span className="text-gray-700 text-sm font-medium">
                  Screen
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={arrowClass(isOpen === "Screen")}
                  style={{
                    width: 18,
                    height: 18,
                    transition: `transform ${chevronDuration}ms ${chevronEasing}`,
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>

              <Collapsible
                isOpen={isOpen === "Screen"}
                duration={chevronDuration}
                easing={chevronEasing}
              >
                <ul
                  id="Screen-collapse"
                  className="py-2.5 mt-2 space-y-1 ml-3 text-gray-700 text-sm font-medium"
                >
                  <li>
                    <a className="block rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-gray-100">
                      Screen List
                    </a>
                  </li>
                </ul>
              </Collapsible>
            </li>

            {/* Showtime */}
            <li>
              <button
                onClick={() => toggleMenu("Showtime")}
                className="group px-3 py-2 flex items-center gap-3 w-full rounded-lg hover:bg-gray-100"
                aria-expanded={isOpen === "Showtime"}
                aria-controls="Showtime-collapse"
              >
                <span className="text-gray-500">
                  <i className="fi fi-rr-calendar-clock" />
                </span>
                <span className="text-gray-700 text-sm font-medium">
                  Showtime
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={arrowClass(isOpen === "Showtime")}
                  style={{
                    width: 18,
                    height: 18,
                    transition: `transform ${chevronDuration}ms ${chevronEasing}`,
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>

              <Collapsible
                isOpen={isOpen === "Showtime"}
                duration={chevronDuration}
                easing={chevronEasing}
              >
                <ul
                  id="Showtime-collapse"
                  className="py-2.5 mt-2 space-y-1 ml-3 text-gray-700 text-sm font-medium"
                >
                  <li>
                    <a className="block rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-gray-100">
                      Showtime List
                    </a>
                  </li>
                </ul>
              </Collapsible>
            </li>
            {/* Seats */}
            <li>
              <button
                onClick={() => toggleMenu("Seats")}
                className="group px-3 py-2 flex items-center gap-3 w-full rounded-lg hover:bg-gray-100"
                aria-expanded={isOpen === "Seats"}
                aria-controls="Seats-collapse"
              >
                <span className="text-gray-500">
                  <i className="fi fi-rr-seat-airline" />
                </span>
                <span className="text-gray-700 text-sm font-medium">Seats</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={arrowClass(isOpen === "Seats")}
                  style={{
                    width: 18,
                    height: 18,
                    transition: `transform ${chevronDuration}ms ${chevronEasing}`,
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>

              <Collapsible
                isOpen={isOpen === "Seats"}
                duration={chevronDuration}
                easing={chevronEasing}
              >
                <ul
                  id="Seats-collapse"
                  className="py-2.5 mt-2 space-y-1 ml-3 text-gray-700 text-sm font-medium"
                >
                  <li>
                    <a className="block rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-gray-100">
                      Seats List
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
                  <i className="fi fi-rr-ticket" />
                </span>
                <span className="text-gray-700 text-sm font-medium">
                  Booking
                </span>
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>

              <Collapsible
                isOpen={isOpen === "booking"}
                duration={chevronDuration}
                easing={chevronEasing}
              >
                <ul
                  id="booking-collapse"
                  className="py-2.5 mt-2 space-y-1 ml-3 text-gray-700 text-sm font-medium"
                >
                  <li>
                    <a className="block rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-gray-100">
                      Booking List
                    </a>
                  </li>
                  <li>
                    <a className="block rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-gray-100">
                      Booking Statistics
                    </a>
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
