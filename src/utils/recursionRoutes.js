//根据服务器用户返回的menuList数据和allRoutes进行匹配，得到符合当前用户的有效路由配置
/**
 *
 * @param {Array} allRoutes 整个页面完整的路由
 * @param {Array} menuList  从服务器获取的用户菜单名
 */
const recursionRoutes = (allRoutes = [], menuList = []) => {
  let userRoutes = []; //最后比对结果放入这里
  allRoutes.forEach(item => {
    menuList.forEach(v => {
      if (item.meta.name === v.name) {
        if (v.children && v.children.length > 0) {
          item.children = recursionRoutes(item.children, v.children);
        }
        userRoutes.push(item);
      }
    });
  });
  return userRoutes;
};

export default recursionRoutes;
