export interface Tab {
  active: boolean;
  attention?: boolean;
  audible?: boolean;
  autoDiscardable?: boolean;
  cookieStoreId?: string;
  discarded?: boolean;
  favIconUrl?: string;
  height?: number;
  hidden: boolean;
  highlighted: boolean;
  id?: number;
  incognito: boolean;
  index: number;
  isArticle: boolean;
  isInReaderMode: boolean;
  lastAccessed: number;
  mutedInfo?: any;
  openerTabId?: number;
  pinned: boolean;
  sessionId?: string;
  status?: string;
  successorTabId?: number;
  titile?: string;
  url?: string;
  width?: number;
  windowId: number;
}
