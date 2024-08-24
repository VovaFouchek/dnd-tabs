import { Tab } from '../../components/Tabs';

import IDashboard from '/icons/dashboard.svg';
import IBanking from '/icons/banking.svg';
import Iphone from '/icons/phone.svg';
import IUser from '/icons/user.svg';
import IShop from '/icons/shop.svg';
import IChartPie from '/icons/chart-pie.svg';
import IPostOffice from '/icons/post-office.svg';
import IAdministration from '/icons/administration.svg';
import IBook from '/icons/book.svg';
import ICube from '/icons/cube.svg';
import IList from '/icons/list.svg';
import IShoppingCard from '/icons/shopping-cart.svg';

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
