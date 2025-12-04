"use client";

import { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

// Medieval/Fantasy themed icons - sourced from game-icons.net style
export const Icons = {
  // Navigation & UI
  menu: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M3 12h18M3 6h18M3 18h18" />
    </svg>
  ),
  close: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  ),
  chevronDown: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  ),
  chevronRight: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M9 18l6-6-6-6" />
    </svg>
  ),
  chevronLeft: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M15 18l-6-6 6-6" />
    </svg>
  ),
  externalLink: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
    </svg>
  ),
  home: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9,22 9,12 15,12 15,22" />
    </svg>
  ),

  // Feature Icons
  paintbrush: (props: IconProps) => (
    <svg viewBox="0 0 512 512" fill="currentColor" {...props}>
      <path d="M256 32c-17.7 0-32 14.3-32 32v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V64c0-17.7-14.3-32-32-32zm-80 96c-26.5 0-48 21.5-48 48v48c0 8.8 7.2 16 16 16h224c8.8 0 16-7.2 16-16v-48c0-26.5-21.5-48-48-48H176zm-48 128c-8.8 0-16 7.2-16 16v48c0 26.5 21.5 48 48 48h192c26.5 0 48-21.5 48-48v-48c0-8.8-7.2-16-16-16H128zm32 144c-35.3 0-64 28.7-64 64v16c0 17.7 14.3 32 32 32h256c17.7 0 32-14.3 32-32v-16c0-35.3-28.7-64-64-64H160z" />
    </svg>
  ),
  people: (props: IconProps) => (
    <svg viewBox="0 0 512 512" fill="currentColor" {...props}>
      <path d="M256 288c79.5 0 144-64.5 144-144S335.5 0 256 0 112 64.5 112 144s64.5 144 144 144zm128 32h-55.1c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16H128C57.3 320 0 377.3 0 448v16c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48v-16c0-70.7-57.3-128-128-128z" />
    </svg>
  ),
  dagger: (props: IconProps) => (
    <svg viewBox="0 0 512 512" fill="currentColor" {...props}>
      <path d="M256 0L128 128l64 64-160 288h448L320 192l64-64L256 0zm0 64l64 64-32 32-32-32 32-32-32-32zm-64 192l160 160H96l96-160z" />
    </svg>
  ),
  animation: (props: IconProps) => (
    <svg viewBox="0 0 512 512" fill="currentColor" {...props}>
      <path d="M256 32C132.3 32 32 132.3 32 256s100.3 224 224 224 224-100.3 224-224S379.7 32 256 32zm112 240l-160 96V176l160 96z" />
    </svg>
  ),
  sunMoon: (props: IconProps) => (
    <svg viewBox="0 0 512 512" fill="currentColor" {...props}>
      <path d="M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm0 160c-35.3 0-64-28.7-64-64s28.7-64 64-64 64 28.7 64 64-28.7 64-64 64zm-32-256V32h64v32h-64zM224 480v-32h64v32h-64zM32 224h32v64H32v-64zm416 0h32v64h-32v-64zM91.3 91.3l22.6 22.6-45.3 45.3-22.6-22.6 45.3-45.3zm316.1 316.1l22.6 22.6-45.3 45.3-22.6-22.6 45.3-45.3zm0-316.1l45.3 45.3-22.6 22.6-45.3-45.3 22.6-22.6zM68.6 159.2l45.3-45.3 22.6 22.6-45.3 45.3-22.6-22.6z" />
    </svg>
  ),
  ecosystem: (props: IconProps) => (
    <svg viewBox="0 0 512 512" fill="currentColor" {...props}>
      <path d="M256 32C132.3 32 32 132.3 32 256c0 101.8 67.9 187.5 160.8 214.4-.3-8.8-.6-22.4.1-32.1 2.1-28.9 14.5-50.2 14.5-50.2s-35.8-7.2-35.8-89c0-19.6 7-35.7 18.5-48.2-1.8-4.5-8-22.9 1.8-47.7 0 0 15.1-4.8 49.5 18.4 14.4-4 29.8-6 45.1-6.1 15.3.1 30.7 2.1 45.1 6.1 34.3-23.2 49.4-18.4 49.4-18.4 9.8 24.8 3.6 43.2 1.8 47.7 11.5 12.5 18.5 28.6 18.5 48.2 0 82-35.9 88.7-70.1 93.4 5.5 4.7 10.4 14 10.4 28.3 0 20.4-.2 36.9-.2 41.9 0 4.1 2.7 8.8 10.5 7.3C411.9 443.6 480 357.9 480 256c0-123.7-100.3-224-224-224z" />
    </svg>
  ),
  crossroads: (props: IconProps) => (
    <svg viewBox="0 0 512 512" fill="currentColor" {...props}>
      <path d="M256 0L128 128h64v128H64V128L0 192l64 64v-64h128v256H128l64 64 64-64h-64V192h128v64l64-64-64-64v64H256V128h64L256 0z" />
    </svg>
  ),
  scroll: (props: IconProps) => (
    <svg viewBox="0 0 512 512" fill="currentColor" {...props}>
      <path d="M448 0H64C28.7 0 0 28.7 0 64v32c0 17.7 14.3 32 32 32h16v288c0 35.3 28.7 64 64 64h320c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64zM64 64h384v32H64V64zm352 352H96V128h320v288zm-160-64c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z" />
    </svg>
  ),
  map: (props: IconProps) => (
    <svg viewBox="0 0 512 512" fill="currentColor" {...props}>
      <path d="M0 96v320c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32V96c0-17.7-14.3-32-32-32H32C14.3 64 0 78.3 0 96zm160 256V160l96 64-96 128zm192-192l96 64-96 128V160z" />
    </svg>
  ),

  // Social Icons
  discord: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  ),
  patreon: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M15.386.524c-4.764 0-8.64 3.876-8.64 8.64 0 4.75 3.876 8.613 8.64 8.613 4.75 0 8.614-3.864 8.614-8.613C24 4.4 20.136.524 15.386.524zM.003 23.537h4.22V.524H.003z" />
    </svg>
  ),
  itchio: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M3.13 1.338C2.08 1.96.02 4.328 0 4.95v1.03c0 1.303 1.22 2.45 2.325 2.45 1.2 0 2.27-.96 2.27-2.22 0 1.26 1.02 2.22 2.22 2.22 1.2 0 2.14-.96 2.14-2.22 0 1.26 1.09 2.22 2.29 2.22h1.5c1.2 0 2.29-.96 2.29-2.22 0 1.26.94 2.22 2.14 2.22 1.2 0 2.22-.96 2.22-2.22 0 1.26 1.07 2.22 2.27 2.22 1.1 0 2.32-1.15 2.32-2.45V4.95c-.02-.62-2.08-2.99-3.13-3.61H3.13zm-.16 8.33v.01c-.05.15-.12.63-.17 1.14v8.27c0 .6.5 1.03 1.03 1.03h.06c.4 0 .74-.32.74-.74v-4.55c0-.4.32-.74.74-.74h.06c.4 0 .74.34.74.74v4.55c0 .42.34.74.74.74h.06c.4 0 .74-.32.74-.74v-4.55c0-.4.34-.74.74-.74h.06c.4 0 .74.34.74.74v4.55c0 .42.34.74.74.74h.06c.53 0 1.03-.43 1.03-1.03v-8.27c-.05-.51-.12-.99-.17-1.14v-.01l-.01.01c-.68.14-1.4.22-2.14.22-.87 0-1.7-.11-2.48-.33a8.85 8.85 0 01-2.48.33c-.74 0-1.46-.08-2.14-.22l-.01-.01z" />
    </svg>
  ),
  steam: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z" />
    </svg>
  ),
  twitter: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  youtube: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),

  // UI Icons
  bell: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  ),
  mail: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <path d="M22 6l-10 7L2 6" />
    </svg>
  ),
  image: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  ),
  star: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  play: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M8 5v14l11-7z" />
    </svg>
  ),
  pause: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  ),
  volume: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" />
    </svg>
  ),
  volumeMute: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" />
    </svg>
  ),
  expand: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </svg>
  ),
  compress: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7" />
    </svg>
  ),
  download: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </svg>
  ),
  search: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  ),
  calendar: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  ),
  clock: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
  user: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  users: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  shield: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  warning: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01" />
    </svg>
  ),
  check: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  ),

  // Wiki Icons
  book: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
    </svg>
  ),
  sword: (props: IconProps) => (
    <svg viewBox="0 0 512 512" fill="currentColor" {...props}>
      <path d="M507.31 72.57L439.43 4.69a16 16 0 00-22.63 0l-22.63 22.63-45.25-45.26a16 16 0 00-22.63 0L281.03 27.3a16 16 0 000 22.63l45.25 45.25L141.86 279.6a16 16 0 000 22.63l67.88 67.88a16 16 0 0022.63 0l184.42-184.42 45.25 45.25a16 16 0 0022.63 0l45.26-45.25a16 16 0 000-22.63l-45.26-45.25 22.63-22.63a16 16 0 00.01-22.61zM96 400L4.69 491.31a16 16 0 0022.63 22.63L96 445.25V400z" />
    </svg>
  ),
  chest: (props: IconProps) => (
    <svg viewBox="0 0 512 512" fill="currentColor" {...props}>
      <path d="M464 128H48c-26.5 0-48 21.5-48 48v224c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V176c0-26.5-21.5-48-48-48zm-208 64c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zM48 64h416c26.5 0 48 21.5 48 48v16H0v-16c0-26.5 21.5-48 48-48z" />
    </svg>
  ),
  key: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
  ),

  // Loading
  spinner: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <circle cx="12" cy="12" r="10" opacity="0.25" />
      <path d="M12 2a10 10 0 019.17 6" strokeLinecap="round" />
    </svg>
  ),

  // Age Gate
  ageGate: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
      <text x="12" y="16" textAnchor="middle" fontSize="8" fill="currentColor" stroke="none">18+</text>
    </svg>
  ),

  // Scroll Down Indicator
  scrollDown: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M12 5v14M19 12l-7 7-7-7" />
    </svg>
  ),

  // Quote
  quote: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
    </svg>
  ),
};

// Icon wrapper component
interface IconWrapperProps extends IconProps {
  name: keyof typeof Icons;
}

export function Icon({ name, size = 24, className = "", ...props }: IconWrapperProps) {
  const IconComponent = Icons[name];
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }
  return (
    <IconComponent
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      {...props}
    />
  );
}

export default Icons;
