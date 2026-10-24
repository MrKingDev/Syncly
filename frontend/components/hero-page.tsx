import React from 'react'

export default function Hero() {
  return (
     <div className="pointer-events-none relative @3xl:mx-0 mx-auto flex max-w-md flex-col @3xl:items-start items-center gap-4 self-end @3xl:self-center px-6 @3xl:pb-0 pb-16 @3xl:pl-16 @3xl:text-left text-center">
      <h1 className="font-semibold @3xl:text-5xl text-4xl tracking-tight">
        Big ideas need a little space
      </h1>
      <p className="max-w-sm text-base text-zinc-600 dark:text-zinc-400">
        Any picture as a halftone screen. Hover or drag across it to look closer
        through the loupe.
      </p>
    </div>
  )
}

