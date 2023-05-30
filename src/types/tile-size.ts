export enum TileSize {
  ExtraSmall = 'xsmall',
  Small = 'small',
  Default = 'default',
  Large = 'large',
  ExtraLarge = 'xlarge',
}

export default TileSize;

export enum Breakpoint {
  Xs = 'xs',
  Sm = 'sm',
  Md = 'md',
  Lg = 'lg',
  Xl = 'xl',
}

export const TileSizeByBreakpoint = {
  [TileSize.ExtraSmall]: {
    [Breakpoint.Xs]: 4,
    [Breakpoint.Sm]: 3,
    [Breakpoint.Md]: 2,
    [Breakpoint.Lg]: 1,
    [Breakpoint.Xl]: 1,
  },
  [TileSize.Small]: {
    [Breakpoint.Xs]: 6,
    [Breakpoint.Sm]: 3,
    [Breakpoint.Md]: 2,
    [Breakpoint.Lg]: 2,
    [Breakpoint.Xl]: 2,
  },
  [TileSize.Default]: {
    [Breakpoint.Xs]: 12,
    [Breakpoint.Sm]: 4,
    [Breakpoint.Md]: 3,
    [Breakpoint.Lg]: 3,
    [Breakpoint.Xl]: 2,
  },
  [TileSize.Large]: {
    [Breakpoint.Xs]: 12,
    [Breakpoint.Sm]: 6,
    [Breakpoint.Md]: 4,
    [Breakpoint.Lg]: 4,
    [Breakpoint.Xl]: 3,
  },
  [TileSize.ExtraLarge]: {
    [Breakpoint.Xs]: 12,
    [Breakpoint.Sm]: 12,
    [Breakpoint.Md]: 6,
    [Breakpoint.Lg]: 6,
    [Breakpoint.Xl]: 4,
  },
}
