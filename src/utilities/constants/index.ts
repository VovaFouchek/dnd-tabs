import { Tab } from '../../components/Tabs';

import IDashboard from '/icons/dashboard.svg';
import IBanking from '/icons/banking.svg';
import Iphone from '/icons/phone.svg';

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
  },
  {
    id: 'telefonie',
    label: 'Telefonie',
    icon: Iphone,
  },
];
