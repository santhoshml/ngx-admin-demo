import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Profile',
    icon: 'person-outline',
    link: '/pages/profile',
    home: true,
  },
  {
    title: 'Find Care',
    icon: 'layout-outline',
    children: [
      {
        title: 'Schedule COVID Vaccine',
        link: '/pages/profile',
      },
      {
        title: 'Schedule an Appointment',
        link: '/pages/profile',
      },
      {
        title: 'View Care Team',
        link: '/pages/profile',
      },
      {
        title: 'Find Care Now',
        link: '/pages/profile',
      },
      {
        title: 'Schedule Video Visit',
        pathMatch: 'prefix',
        link: '/pages/profile',
      },
    ],
  },
  {
    title: 'Communication',
    icon: 'keypad-outline',
    link: '/pages/ui-features',
    children: [
      {
        title: 'Message Center',
        link: '/pages/profile',
      },
      {
        title: 'Send a Message',
        link: '/pages/profile',
      },
      {
        title: 'Letters',
        link: '/pages/profile',
      },
      {
        title: 'Nurse Advice Line',
        link: '/pages/profile',
      },
    ],
  },
  {
    title: 'My Record',
    icon: 'browser-outline',
    children: [
      {
        title: 'COVID-19',
        link: '/pages/profile',
      },
      {
        title: 'To Do',
        link: '/pages/profile',
      },
      {
        title: 'Appointment and Visits',
        link: '/pages/profile',
      },
      {
        title: 'Test Results',
        link: '/pages/profile',
      },
      {
        title: 'Immunizations',
        link: '/pages/profile',
      },
    ],
  },
];
