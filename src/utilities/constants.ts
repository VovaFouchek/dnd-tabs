import { Tab } from '../components/Tabs';

import IDashboard from '../assets/icons/dashboard.svg';
import IBanking from '../assets/icons/banking.svg';
import Iphone from '../assets/icons/phone.svg';
import IUser from '../assets/icons/user.svg';
import IShop from '../assets/icons/shop.svg';
import IChartPie from '../assets/icons/chart-pie.svg';
import IPostOffice from '../assets/icons/post-office.svg';
import IAdministration from '../assets/icons/administration.svg';
import IBook from '../assets/icons/book.svg';
import ICube from '../assets/icons/cube.svg';
import IList from '../assets/icons/list.svg';
import IShoppingCard from '../assets/icons/shopping-cart.svg';

export const categories: Tab[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: IDashboard,
  },
  {
    id: 'banking',
    label: 'Banking',
    icon: IBanking,
    isPinned: true,
  },
  {
    id: 'telefonie',
    label: 'Telefonie',
    icon: Iphone,
  },
  {
    id: 'accounting',
    label: 'Accounting',
    icon: IUser,
  },
  {
    id: 'verkauf',
    label: 'Verkauf',
    icon: IShop,
  },
  {
    id: 'statistik',
    label: 'Statistik',
    icon: IChartPie,
  },
  {
    id: 'post-office',
    label: 'Post Office',
    icon: IPostOffice,
  },
  {
    id: 'administration',
    label: 'Administration',
    icon: IAdministration,
  },
  {
    id: 'help',
    label: 'Help',
    icon: IBook,
  },
  {
    id: 'warenbestand',
    label: 'Warenbestand',
    icon: ICube,
  },
  {
    id: 'auswahllisten',
    label: 'Auswahllisten',
    icon: IList,
  },
  {
    id: 'einkauf',
    label: 'Einkauf',
    icon: IShoppingCard,
  },
];
