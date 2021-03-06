import {Component} from 'react';
import * as React from 'react';
import {WrappedResultSearchSidForm} from './TestsysTeacherResultSidForm';
import DvaProps from '../types/DvaProps';
import TestTeacherSideBar from './TestTeacherSideBar'
import { Layout, Breadcrumb} from 'antd';
class HomePageProps implements DvaProps {
    public dispatch: any;
    // qids: string[];
    // rates: string[];
    presult: any[];
}

export default class TestsysTeacherResultSidComponent extends Component<HomePageProps, {}> {
    render() {
        return (
            <Layout>
                <TestTeacherSideBar dispatch={this.props.dispatch} />
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>按学号查询成绩</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout id = "content" style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                        <WrappedResultSearchSidForm
                            dispatch = {this.props.dispatch}
                            results={this.props.presult}/>

                    </Layout>
                </Layout>
            </Layout>


        );
    }
}
