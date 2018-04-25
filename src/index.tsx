import dva, {connect} from 'dva';
import {Router, Route, Switch, routerRedux, browserHistory} from 'dva/router';
import * as React from 'react';
import {Layout, message} from 'antd';
import {TssFooter, TssHeader} from './components/TssPublicComponents';
import HomePageComponent from './components/HomePage';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import LoginModel from './models/loginModel';
import NavigationModel from './models/navigationModel';
import FreeClassroomInfoModel from './models/FreeClassroomInfoModel';
import CourseInfoModel from './models/CourseInfoModel';
import UserInfoModel from './models/userInfoModel';
import CurriculumTeacherModel from './models/CurriculumTeacherModel'
import NavigationPageComponent from './components/NavigationPage';
import UserPageComponent from './components/UserPage';
import UserManagePageComponent from './components/UserManagePage';
import ClassroomManagePageComponent from './components/ClassroomManagePage';
import AutoSchedulingComponent from './components/AutoScheduling';
import ManualSchedulingPageComponent from './components/ManualScheduling';
import ManualSchModifyPageComponent from './components/ManualSchModify';
import CurriculumManagePageComponent from './components/CurriculumManage';
import CurriculumTeacherPageComponent from './components/CurriculumTeacher';

const {Content} = Layout;

const app = dva({
    history: browserHistory
});

app.model(LoginModel);
app.model(NavigationModel);
app.model(UserInfoModel);
app.model(FreeClassroomInfoModel);
app.model(CourseInfoModel);
app.model(CurriculumTeacherModel);

const HomePage = connect(state => {
    return {}
})(HomePageComponent);

const NavigationPage = connect(state => {
    const {uid, level} = state.login;
    return {level: level, uid: uid}
})(NavigationPageComponent);

const UserPage = connect(state => {
    return {...state.userinfo};
})(UserPageComponent);

const UserManagePage = connect(state => {
    return {};
})(UserManagePageComponent);

const AutoSchedulingPage = connect(state => {
    return {};
})(AutoSchedulingComponent);

const ManualSchedulingPage = connect(state => {
    const {dataSource} = state.courseinfo;
    return {dataSource: dataSource};
})(ManualSchedulingPageComponent);

const ManualSchModifyPage = connect(state => {
    const {dataSource} = state.freeclassroominfo;
    return {dataSource: dataSource};
})(ManualSchModifyPageComponent);

const ClassroomManagePage = connect(state => {
    return {};
})(ClassroomManagePageComponent);

const CurriculumTeacherPage = connect(state => {
    const {dataSource} = state.curriculumteacher;
    return {dataSource: dataSource};
})(CurriculumTeacherPageComponent);

const CurriculumManagePage = connect(state => {
    return {};
})(CurriculumManagePageComponent);

app.router(({history}) => (
        <Router history={history}>
            <Layout>
                <TssHeader/>
                <Content style={{minHeight: '300px'}}>
                    <Switch>
                        <Route path="/" exact component={HomePage}/>
                        <Route path="/navi" component={NavigationPage}/>
                        <Route path="/user" component={UserPage}/>
                        <Route path="/userManage" component={UserManagePage}/>
                        <Route path="/autoScheduling" component={AutoSchedulingPage} />
                        <Route path="/manualScheduling" component={ManualSchedulingPage} />
                        <Route path="/manualSchModify/:name" component={ManualSchModifyPage} />
                        <Route path="/classroomManage" component={ClassroomManagePage}/>
                        <Route path="/curriculumTeacher/:name" component={CurriculumTeacherPage}/>
                        <Route path="/curriculumManage" component={CurriculumManagePage}/>
                    </Switch>
                </Content>
                <TssFooter/>
            </Layout>
        </Router>
    )
);

app.start('#root');

registerServiceWorker();
