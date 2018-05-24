import {stringify} from "querystring";
import {loadSession, saveSession} from "../utils/localStorage";
import {routerRedux} from "dva/router";
import {tssFetch} from "../utils/tssFetch";
import {message} from "antd";
import GlobalState from "../types/globalState";

const model = {
    namespace: 'testsys_student',
    state: {
        uid: "",
        pids: [],
        papers: [
            {
                pid:"1",
                pstatus: true,
                pscore: "90",
                ptime: "Monday 9:00-9:15",
                plength: "1:30:00",
            },
            {
                pid:"2",
                pstatus: false,
                pscore: 0,
                ptime: "Sunday 14:00-9:15",
                plength: "2:00:00",
            },
        ],
        qids: [],
        questions: [
            {
                qid: "1",
                question: "Is monkey an animal?",
                qtype: "1",
                qanswer: "yes",
                qmyanswer: "",
                qunit: "1",
            },
            {
                qid: "4",
                question: "Is apple an animal?",
                qtype: "1",
                qanswer: "no",
                qmyanswer: "",
                qunit: "2",
            },
            {
                qid: "5",
                question: "Which is an animal?\nA.monkey B.apple",
                qtype: "2",
                qanswer: "A",
                qmyanswer: "",
                qunit: "2",
            },
            {
                qid: "6",
                question: "What is an apple?",
                qtype: "3",
                qanswer: "fruit",
                qmyanswer: "",
                qunit: "2",
            },
        ],
        scores: [
            {
                pid:"1",
                pstatus: true,
                pscore: "90",
            },
            {
                pid:"3",
                pstatus: false,
                pscore: 0,
            },
        ],
    },

    reducers: {
        saveSession(st) {
            return saveSession(st)
        },
        loadSession(st) {
            return loadSession(st)
        },
        updateSession(st, payload) {
            return {...st, ...payload.payload};
        },
        updateQidList(st, payload) {
            return {...st, ...payload.payload};
        },
        updateQuestionList(st, payload) {
            return {...st, ...payload.payload};
        },
        updatePaperList(st, payload) {
            return {...st, ...payload.payload};
        },
        updateScoreList(st, payload) {
            return {...st, ...payload.payload};
        },
    },

    effects: {
        * jump(payload: {payload: {direction: string}}, {call, put}) {
            const direction = payload.payload.direction;
            console.log('jump_testsysstudent');
            switch(direction){
                case "student_paper":
                    yield put(routerRedux.push('/testsys_student_paper'));
                    const response = yield call(tssFetch, '/testsys_student/getpaperlist', 'POST', {uid:model.state.uid});
                    console.log("student/paper response: "+response);
                    if (response.status === 400) {
                        message.error('更新失败');
                        return;
                    }
                    //?datasource
                    const jsonBody = yield call(response.text.bind(response));
                    const body = JSON.parse(jsonBody);
                    yield put({
                        type: 'updatePaperList',
                        payload: {pids: body.pids}
                    });
                    return;
                    // break;
                case "student_score":
                    yield put(routerRedux.push('/testsys_student_score'));
                    const response1 = yield call(tssFetch, '/testsys_student/getscorelist', 'POST', {uid:model.state.uid});
                    console.log("student/score response: "+response1);
                    if (response1.status === 400) {
                        message.error('更新失败');
                        return;
                    }
                    //?datasource
                    const jsonBody1 = yield call(response1.text.bind(response1));
                    const body1 = JSON.parse(jsonBody1);
                    yield put({
                        type: 'updateScoreList',
                        payload: {scores: body1.scores}
                    });
                    return;
                    // break;
            }
            return;
        },

        * getpaper(payload: {payload: {pid: string, uid: string}}, {call, put}) {
            const msg = payload.payload;
            console.log("sp/paper: "+payload);
            const response = yield call(tssFetch, '/testsys_student/getpaper', 'POST', msg);
            console.log("sq/paper response: "+response);
            if (response.status === 400) {
                message.error('更新失败');
                return;
            }
            //?datasource
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            yield put({
                type: 'updateQidList',
                payload: {papers: body.papers}
            });
            return;
        },

        * getquestions(payload: {payload: {pid: string, uid: string}}, {call, put}) {
            yield put(routerRedux.push('/testsys_student_question_review'));
            const msg = payload.payload;
            console.log("sp/paper: "+payload);
            const response = yield call(tssFetch, '/testsys_student/getquestions', 'POST', msg);
            console.log("sq/paper response: "+response);
            if (response.status === 400) {
                message.error('更新失败');
                return;
            }
            //?datasource
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            yield put({
                type: 'updateQidList',
                payload: {qids: body.qids}
            });
            return;
        },

        * getquestion(payload: {payload: {qid: string, uid: string}}, {call, put}) {
            console.log("sq/question: "+payload);
            const msg = payload.payload;
            const response = yield call(tssFetch, '/testsys_student/getquestion', 'POST', msg);
            console.log("sq/question response: "+response);
            if (response.status === 400) {
                message.error('更新失败');
                return;
            }
            //?datasource
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            yield put({
                type: 'updateQuestionList',
                payload: {questions: body.questions}
            });
            return;
        },

        * submit(payload: {payload: {myAns: any[], uid: string}}, {call, put}) {
            console.log("sq/submit: "+payload.payload);
            const msg = payload.payload;
            const response = yield call(tssFetch, '/testsys_student/submit', 'POST', msg);
            console.log("sq/question response: "+response);
            if (response.status === 400) {
                message.error('更新失败');
                return;
            }
            return;
        }
    },
    subscriptions: {}

};


export default model;