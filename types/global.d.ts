// types/global.d.ts
declare global {
  interface Window {
    Tally?: {
      loadEmbeds: () => void;
    };
  }
}

