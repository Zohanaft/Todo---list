export default () => ({
  // оставил id на случай динамического добавления страниц в pages
  pages: [
    {
      id: 1,
      path: '/',
      params: '',
      title: 'Home',
    },
    {
      id: 2,
      path: '/todo-list',
      params: '',
      title: 'Todo list',
    },
    {
      id: 3,
      path: '/about',
      params: '',
      title: 'About',
    },
  ],
  title: 'Home',
});
