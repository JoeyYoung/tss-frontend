import {httpMethod, tssFetch} from '../utils/tssFetch';
import {message} from 'antd';
import {Router, Route, Switch, routerRedux, browserHistory} from 'dva/router';
import {apiBaseUrl} from "../configs/apiBaseUrl";


var myMap = new Map();
myMap.set('MON','周一');
myMap.set('TUE','周二');
myMap.set('WED','周三');
myMap.set('THU','周四');
myMap.set('FRI','周五');
myMap.set('SAT','周六');
myMap.set('SUN','周日');

myMap.set('1_2','第1~2节');
myMap.set('3_5','第3~5节');
myMap.set('6_8','第6~8节');
myMap.set('9_10','第9~10节');
myMap.set('11_13','第11~13节');

const model = {
    namespace: 'curriculumteacher',
    state: {
        dataSource: [
            // {id: -1, courseId:'asd', courseName: 'aaa', arrangements:[{typeName:'', classroomName:'',buildingName:'',campusName:''},]},
            {id: -1, courseId:'', courseName: '', arrangements:''},
            ]
    },
    reducers: {
        updateCurriculumTeacherInfo(st, payload) {
            return {...st, ...payload.payload};
        },
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname}) => {
                if (pathname === '/curriculumTeacher') {
                    dispatch({ type: 'curriculumTeacher', payload: {teacherId: '',year: -1, semester: ''} });
                }
                if (pathname === '/curriculumTeacher') {
                    dispatch({ type: 'showList', payload: {classId: ''} });
                }
            });
        }
    },
    effects: {
        * curriculumTeacher(payload: { payload: {teacherId: string, year: number, semester: string} }, {call, put})  {
            if(payload.payload.year>0)
            {
                const response = yield call(tssFetch, '/teachers/'+payload.payload.teacherId+'/classes?year='+payload.payload.year+'&semester='+payload.payload.semester, 'GET');
                if (response.status === 400) {
                    message.error('教师信息错误');
                    return;
                }
                const jsonBody = yield call(response.text.bind(response));
                const body = JSON.parse(jsonBody);
                let newData = [{id: -1, courseId: -1, courseName: '', arrangements:''},]
                newData.pop();
                if(body.length>0)
                {
                    for(let i=0; i<body.length; i++)
                    {
                        var arr = '';
                        for(let j=0;j<body[i].arrangements.length;j++)
                            arr += (body[i].arrangements[j].campusName+' '+body[i].arrangements[j].buildingName+' '+
                                body[i].arrangements[j].classroomName+' '+myMap.get(body[i].arrangements[j].typeName.substring(0,3))+myMap.get(body[i].arrangements[j].typeName.substring(4))+' ; ')
                        newData.push({id: body[i].id, courseId: body[i].courseId, courseName: body[i].courseName, arrangements: arr});
                    }
                }
                //console.log(newData);
                yield put({
                    type: 'updateCurriculumTeacherInfo',
                    payload: {dataSource:newData}
                });
                return;
            }
            else{
                yield put({
                    type: 'updateCurriculumTeacherInfo',
                    payload: {dataSource:[]}
                });
            }
        },

        * getMap(payload: { payload: {input: string} }, {call, put})  {
            console.log(payload.payload.input);
            return myMap.get(payload.payload.input);
        },

        * export(payload: { payload: {classId: string} }, {call, put})  {
             var value = payload.payload["classId"];
             console.log(value+"daf")
            if(value!='') {
                //fetch the studentList according to the classId
                const response = yield call(tssFetch, '/excel/download/classes/'+value, 'GET');
                if(response.status == 200){
                    message.success("开始下载Excel");
                    var win = window.open(apiBaseUrl+'/excel/download/classes/'+value, '_blank');
                    if(win!=null)
                        win.focus();
                }else{
                    message.error("下载失败");
                }
            }
            return;
        },
    }
};

export default model;
