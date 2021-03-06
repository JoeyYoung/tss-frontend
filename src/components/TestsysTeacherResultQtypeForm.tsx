import {Component, FormEvent, ReactNode} from 'react';
import * as React from 'react';
import {Popconfirm, Table, Icon, Form, Button, Input, message, Modal} from 'antd';
import DvaProps from '../types/DvaProps';

const FormItem = Form.Item;
const { TextArea } = Input;

interface studentProp extends DvaProps {
    form:any;
    // qids: string[];
    // rates: string[];
    results: any[];
}

export class ResultFormData {
    id: string;
    qid: string;
    rate: string;

}

interface  ResultList{
    qtype: string;
    results: ResultFormData[];
    modalVisible: boolean;

}


export class ResultSearchQtypeForm extends Component<studentProp,  ResultList> {
    constructor(props){
        super(props);
        // this.state = {
        //     qtype: '0',
        //     modalVisible: false,
        //
        //     results :[{
        //         id: '1',
        //         qid: '10',
        //         rate: '0.90'
        //         ,
        //     }, {
        //         id: '2',
        //         qid: '10',
        //         rate: '0.93'
        //     },{
        //         id: '3',
        //         qid: '10',
        //         rate: '0.70'
        //     }]
        // };
        // for(let i in this.props.qids) {
        //     this.state.results.push({
        //         id: '',
        //         qid: this.props.qids[i],
        //         rate: this.props.rates[i],
        //     });
        // }
    }

    componentDidMount() {
    }

    handleSearch = (e: FormEvent<{}>) => {
        e.preventDefault();
        const formProps = this.props.form;
        formProps.validateFieldsAndScroll((err: any, values: ResultFormData) => {
            if (err) {
                message.error('信息填写不合法');
                return;
            }
            // this.props.dispatch({type:'teacherresult/search', payload: values});
            const{form} = this.props;
            const qtype = form.getFieldValue("qtype");
            console.log("tr/search: "+qtype);
            this.props.dispatch({type:'teacherresult/search', payload: {type:2, sid:null, pid:null, qtype:qtype, qunit:null}});
        });
    };



    handleDetail = (id) => {
//        e.preventDefault();

        this.props.dispatch({type:'teacherquestion/detail', payload: id});     //!!!!!!!!


    };

    formRef: any;
    setModalVisible(modalVisible) {
        if(this.formRef && modalVisible === true) this.formRef.refresh();
        this.setState({ modalVisible: modalVisible });
    };

    render() {


        const {getFieldDecorator} = this.props.form;
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

        const columns = [{
            title: '题目编号',
            dataIndex: 'qid',
            key: 'qid',
        },{
            title: '题目内容',
            dataIndex: 'question',
            key: 'question',
        } , {
            title: '答案',
            dataIndex: 'qanswer',
            key: 'qanswer',
        } ,  {
            title: '单元',
            dataIndex: 'qunit',
            key: 'qunit',
        } ,  {
            title: '题型',
            dataIndex: 'qtype',
            key: 'qtype',
        } ,  {
            title: '正确率',
            dataIndex: 'rate',
            key: 'rate',

        }];


        return (
            <Form onSubmit={this.handleSearch}>


                <FormItem label="题型" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('qtype', {
                            rules: [
                                {required: true, message: '请输入题型'},
                            ]
                        })(
                            <Input placeholder="请输入题型（1：判断，2：选择，3：填空）"/>
                        )
                    }
                </FormItem>


                <FormItem {...formItemLayout}>
                    <Button icon="copy" type="primary" htmlType="submit">搜索</Button>

                </FormItem>


                <Table columns = {columns} rowKey="qid" dataSource = {this.props.results}/>
            </Form>



        );
    }
}

const WrappedResultSearchQtypeForm: any = Form.create({})(ResultSearchQtypeForm);

export {WrappedResultSearchQtypeForm};
