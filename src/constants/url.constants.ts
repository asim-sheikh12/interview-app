export const enum ADMIN {
  LOGIN = 'auth/login',
  ACTIONS = '/recruiter',
  ADD_RECRUITER = '/recruiter/add-recruiter',
}

export const enum RECRUITER {
  LOGIN = 'auth/login',
  ACTIONS = '/candidate',
  GET_BY_EMAIL = '/candidate/email',
}
export const enum CANDIDATE {
  REGISTER = 'auth/register',
}

export const URL = {
  Dashboard: '/dashboard',
  Login: '/',
  REGISTER: '/register',
  CANDIDATE: '/candidate',
  RECRUITER: '/recruiter',
  CANDIDATE_LIST: '/candidate/list',
  CANDIDATE_DETAIL: '/candidate/detail',
  RECRUITER_LIST: '/recruiter/list',
  SEND_EMAIL: '/candidate/send-mail',
  SETTINGS: '/settings',
};
