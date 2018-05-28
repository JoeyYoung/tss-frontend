import {Component} from 'react';
import * as React from 'react';
import {QuestionFormData, WrappedQuestionSearchForm} from './TestsysTeacherQuestionSearchForm';
import DvaProps from '../types/DvaProps';
import {Form} from "antd";
import {WrappedScoreDisplayForm} from "./TestsysStudentScoreForm";

interface UserProps extends DvaProps {
    uid: string;
    email: string;
    tel: string;
    intro: string;
    score_pids: string[];
    score_scores: string[];
    score_dates: string[];
}
interface UserState {
    modalVisible: boolean;
}
const FormItem = Form.Item;

export default class TestsysStudentScoreComponent extends Component<UserProps, UserState> {
    render() {
        return (
            <div>
                <h2>查询成绩</h2>
                <WrappedScoreDisplayForm
                    dispatch={this.props.dispatch}
                    pids={this.props.score_pids}
                    scores={this.props.score_scores}
                    dates={this.props.score_dates}/>
            </div>
    );
    }
}
