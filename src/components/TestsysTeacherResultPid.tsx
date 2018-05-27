import {Component} from 'react';
import * as React from 'react';
import {WrappedResultSearchPidForm} from './TestsysTeacherResultPidForm';
import DvaProps from '../types/DvaProps';
import TestTeacherSideBar from './TestTeacherSideBar'
import { Layout, Breadcrumb} from 'antd';

export class ResultPidProps implements DvaProps {
    public dispatch: any;

    qid: string[];  //题目
    avg: string[];
}

export default class TestsysTeacherResultPidComponent extends Component<ResultPidProps, {}> {
    render() {
        return (
            <Layout>
                <TestTeacherSideBar dispatch={this.props.dispatch} />
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>按试卷号查询成绩</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout id = "content" style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                        <WrappedResultSearchPidForm qid = {this.props.qid}
                                                        avg = {this.props.avg} dispatch={this.props.dispatch}/>

                    </Layout>
                </Layout>
            </Layout>


        );
    }
}
