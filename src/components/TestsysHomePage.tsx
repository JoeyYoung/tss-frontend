import {Component} from 'react';
import * as React from 'react';
import DvaProps from '../types/DvaProps';
import {Icon, Form, Button, Input, message} from 'antd';

const FormItem = Form.Item;

class HomePageProps implements DvaProps {
    public dispatch: any;
}

export default class HomePageComponent extends Component<HomePageProps, {}> {
    handleClick = (e) => {
        this.props.dispatch({type:'testsys/jump', payload: {direction: e.direction}});
    };


    render() {

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 14},
            },
        };


        return (
            <div>
                <h2>选择你的职位</h2>

                <FormItem {...formItemLayout}>
                    <Button icon="copy" type="primary" htmlType="submit" onClick={this.handleClick.bind(this, {direction: "Teacher"})}>老师</Button>
                    <Button icon="copy" type="primary" htmlType="submit" onClick={this.handleClick.bind(this, {direction: "Student"})}>学生</Button>
                </FormItem>

                <FormItem {...formItemLayout}>

                </FormItem>

            </div>
        );
    }
}
