'use client';

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useModal } from "@/app/contexts/ModalContext";

interface BottomHeaderProps {
  showActions?: boolean;
}

const navigationLinks = [
  { href: "/", label: "Главная" },
  { href: "/#about", label: "О нас" },
  { href: "/catalog", label: "Каталог" },
];

const BottomHeader = ({ showActions = true }: BottomHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState("");
  const pathname = usePathname();
  const { openModal } = useModal();

  const toggleMenu = () => {
    setIsMenuOpen((currentState) => !currentState);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const updateCurrentHash = () => {
      setCurrentHash(window.location.hash);
    };

    updateCurrentHash();
    window.addEventListener("hashchange", updateCurrentHash);

    return () => {
      window.removeEventListener("hashchange", updateCurrentHash);
    };
  }, [pathname]);

  const handleNavigationClick = (href: string, shouldCloseMenu = false) => {
    const hashIndex = href.indexOf("#");
    setCurrentHash(hashIndex >= 0 ? href.slice(hashIndex) : "");

    if (shouldCloseMenu) {
      closeMenu();
    }
  };

  const isActiveLink = (href: string) => {
    if (href === "/catalog") return pathname.startsWith("/catalog");
    if (href === "/#about") return pathname === "/" && currentHash === "#about";
    if (href === "/") return pathname === "/" && currentHash !== "#about";

    return false;
  };

  const handleApplicationClick = () => {
    closeMenu();
    openModal();
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#eadfd4]/80 bg-white/88 px-4 py-3 shadow-[0_10px_35px_rgba(23,23,23,0.06)] backdrop-blur-xl md:py-4">
        <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4">
          <Link href="/" aria-label="Aquawel — главная страница" className="flex shrink-0 items-center justify-self-start" onClick={() => handleNavigationClick("/")}>
            <Image
              src="/logo.svg"
              alt="Логотип компании Aquawel"
              width={112}
              height={96}
              className="h-14 w-auto object-contain md:h-[4.5rem]"
              priority
            />
          </Link>

          <nav className="hidden items-center justify-self-center rounded-full border border-[#eadfd4] bg-[#F6F4F2]/80 p-1 shadow-inner md:flex">
            {navigationLinks.map((link) => {
              const isActive = isActiveLink(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => handleNavigationClick(link.href)}
                  className={`rounded-full px-6 py-3 text-sm font-medium uppercase tracking-[0.18em] transition-all duration-300 ${
                    isActive
                      ? "bg-white text-[#947458] shadow-[0_8px_20px_rgba(148,116,88,0.14)]"
                      : "text-[#34302c] hover:bg-white/70 hover:text-[#947458]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden min-w-[176px] items-center justify-end gap-3 justify-self-end md:flex">
            {showActions && (
              <button
                type="button"
                onClick={handleApplicationClick}
                className="rounded-full border border-[#947458] bg-[#947458] px-6 py-3 text-sm font-medium uppercase tracking-[0.16em] text-white shadow-[0_12px_28px_rgba(148,116,88,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#7f624a] hover:shadow-[0_10px_20px_rgba(148,116,88,0.16)]"
              >
                Оставить заявку
              </button>
            )}
          </div>

          <button
            onClick={toggleMenu}
            className="col-start-3 flex h-12 w-12 items-center justify-center justify-self-end rounded-full border border-[#eadfd4] bg-[#F6F4F2] text-[#171717] shadow-sm transition-all hover:border-[#947458] hover:text-[#947458] md:hidden"
            aria-label="Открыть меню"
            aria-expanded={isMenuOpen}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/45 backdrop-blur-sm md:hidden"
          onClick={closeMenu}
        />
      )}

      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col border-l border-[#eadfd4] bg-[#F6F4F2] px-6 py-5 shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#e2d6ca] pb-5">
          <Link href="/" onClick={() => handleNavigationClick("/", true)} className="flex items-center">
            <Image src="/logo.svg" alt="Логотип компании Aquawel" width={96} height={82} className="h-14 w-auto object-contain" />
          </Link>

          <button
            onClick={closeMenu}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e2d6ca] bg-white text-[#171717] transition-colors hover:text-[#947458]"
            aria-label="Закрыть меню"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="py-8">
          <ul className="space-y-3">
            {navigationLinks.map((link) => {
              const isActive = isActiveLink(link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => handleNavigationClick(link.href, true)}
                    className={`flex items-center justify-between rounded-2xl border px-5 py-4 text-lg transition-all ${
                      isActive
                        ? "border-[#947458]/35 bg-white text-[#947458] shadow-sm"
                        : "border-transparent text-[#34302c] hover:border-[#e2d6ca] hover:bg-white/70 hover:text-[#947458]"
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className="text-sm">→</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-auto rounded-3xl border border-[#e2d6ca] bg-white p-5 shadow-sm">
          <p className="mb-3 text-xs uppercase tracking-[0.28em] text-[#947458]">Контакты</p>
          <p className="text-sm leading-6 text-gray-600">г. Домодедово, Станционная ул. 3</p>
          <Link href="tel:+78005553535" className="mt-3 block text-lg text-[#171717] transition-colors hover:text-[#947458]">
            +7 800 555 3535
          </Link>

          {showActions && (
            <button
              type="button"
              onClick={handleApplicationClick}
              className="mt-5 w-full rounded-full bg-[#947458] px-5 py-3 text-sm font-medium uppercase tracking-[0.16em] text-white shadow-lg transition-all hover:bg-[#7f624a]"
            >
              Оставить заявку
            </button>
          )}
        </div>
      </aside>
    </>
  );
};

export default BottomHeader;
