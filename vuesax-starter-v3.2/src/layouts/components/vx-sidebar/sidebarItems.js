

export default [
  {
    url: "/",
    name: "主页",
    slug: "home",
    icon: "HomeIcon",
  },
  {
    url: "/search",
    name: "接触者查询",
    slug: "search",
    icon: "SearchIcon",
  },
  {
    url: "/map",
    name: "疫情地图",
    slug: "map",
    icon: "MapIcon",
  },
  {
    url: "/userInfo",
    name: "用户信息",
    slug: "userInfo",
    icon: "MenuIcon",
    submenu: [
      {
        url: '/userInfo/userList',
        name: "用户列表",
        slug: "UserList",
      }
    ]
  },
  {
    url: "/contactInfo",
    name: "密接及确诊者信息",
    slug: "ContactInfo",
    icon: "MenuIcon",
    submenu: [
      {
        url: '/contactInfo/contactList',
        name: "密接及确诊者列表",
        slug: "ContactList",
      }
    ]
  }

]
