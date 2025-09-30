// types/tally.d.ts
interface TallyWidget {
  loadEmbeds: () => void;
}

declare global {
  interface Window {
    Tally?: TallyWidget;
  }
}

export {};