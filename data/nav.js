import {allVideos} from '/data/videos.js' 
const videoMenu = [];
allVideos.forEach(item => {
  videoMenu.push({
    name: item.type,
    url: `/pages/videos/type/?type=${item.type}`
  })
});
export const nav = [
  {
    name: 'Home',
    url: '/'
  },
  {
    name: 'Coding Otaku',
    url: 'https://codingotaku.com',
    isNewTab: true
  },
  {
    name: 'About',
    url: '/pages/about',
  }, {
    name: 'Videos',
    url: '/pages/videos',
    isDropdown: true,
    items: videoMenu
  },
  {
    name: 'Contact',
    url: '/pages/contact',
  },
  {
    name: 'Donate',
    url: '/pages/donate',
  }
];
