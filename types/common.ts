export interface MenuItemType {
  label: string;
  path: string;
  subItems?: { label: string; path: string }[];
}
