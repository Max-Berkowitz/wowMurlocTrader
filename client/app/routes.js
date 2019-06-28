import codeSplittingHelper from './codeSplittingHelper';

const importRoute = route => codeSplittingHelper(() => import(`./${route}/index`));

const HomePage = importRoute('HomePage');
const Admin = importRoute('Admin');

export default [{ path: '/', component: HomePage, exact: true }, { path: '/admin', component: Admin, exact: true }];
