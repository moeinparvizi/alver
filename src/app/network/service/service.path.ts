export class ServicePath {
  // registration
  public static readonly LOGIN = 'auth/login/';
  public static readonly CHECK_TOKEN = 'auth/check_token/';
  public static readonly IS_LOGIN = 'auth/is_login/';
  public static readonly LOGOUT = 'auth/logout/';

  // product
  public static readonly GET_PRODUCTS = 'products/get/';
  public static readonly GET_COMMENTS = 'products/comment/get/';
  public static readonly ADD_COMMENTS = 'products/comment/add/';
  public static readonly GET_AMAZING_PRODUCTS = 'products/amazing/get/';
  public static readonly GET_CATEGORIES = 'products/category/get/';
  public static readonly GET_COMPANIES = 'products/compony/get/';
  public static readonly GET_PRODUCTS_BY_FILTERS = 'products/filter/';

  // info
  public static readonly GET_ABOUT_US = 'info/get/';
  public static readonly GET_FAVORITE = 'info/favorite/get';
  public static readonly REMOVE_FAVORITE = 'info/favorite/remove';
  public static readonly CHECK_FAVORITE = 'info/favorite/check';
  public static readonly ADD_FAVORITE = 'info/favorite/add';

  // card
  public static readonly GET_CARD = 'card/get/';
  public static readonly ADD_CARD = 'card/add/';
  public static readonly REMOVE_A_CARD = 'card/remove/';
  public static readonly REMOVE_CARD = 'card/delete/';
  public static readonly CARD_DETAIL_COUNT = 'card/detail/count/';
  public static readonly CARD_TOTAL_ITEM = 'card/total-items'
  public static readonly CARD_CONFIRM = 'card/confirm/'
  public static readonly CARD_HISTORY = 'card/history/'
}
