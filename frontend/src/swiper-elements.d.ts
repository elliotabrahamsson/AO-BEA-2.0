declare namespace JSX {
  interface IntrinsicElements {
    "swiper-container": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      "slides-per-view"?: number | string;
      navigation?: boolean | string;
      pagination?: boolean | string;
      scrollbar?: boolean | string;
      // Lägg till fler attribut efter behov
    };
    "swiper-slide": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >;
  }
}
