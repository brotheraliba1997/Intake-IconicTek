export interface MenuItemType {
  label: string;
  path: string;
  icons: string;
  subItems?: { label: string; path: string }[];
}
