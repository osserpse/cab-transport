/**
 * Material Icons used in this application.
 * Add new icons here as needed.
 * Full list: https://fonts.google.com/icons
 */
export const MATERIAL_ICONS = [
    // Navigation
    'home',
    'menu',
    'arrow_back',
    'arrow_forward',
    'chevron_left',
    'chevron_right',
    'keyboard_arrow_down',
    'keyboard_arrow_up',
    'close',
    'expand_more',
    'expand_less',
    // Actions
    'add',
    'edit',
    'delete',
    'save',
    'cancel',
    'refresh',
    'search',
    'filter_list',
    'sort',
    'more_vert',
    'more_horiz',
    'swap_horiz',
    'calculate',
    'attach_file',
    'save',
    // Common
    'settings',
    'notifications',
    'person',
    'people',
    'favorite',
    'star',
    'info',
    'info_outline',
    'help',
    'help_outline',
    'warning',
    'error',
    'check',
    'check_circle',
    'lock_open',
    'lock',
    'lock_open',
    'lock',
    // Content
    'description',
    'folder',
    'folder_open',
    'image',
    'inbox',
    'calendar_today',
    'event',
    // App-specific
    'directions_car',
    'desktop_windows',
    'menu_book',
    // Theme
    'light_mode',
    'dark_mode',
    'brightness_auto',
] as const;

/** Material icon name - derived from MATERIAL_ICONS array */
export type MaterialIconName = (typeof MATERIAL_ICONS)[number];