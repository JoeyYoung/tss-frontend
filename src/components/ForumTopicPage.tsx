import * as React from 'react'
import {Component} from 'react'
import BrowserFrame from './ForumBrowserFrame';
import DvaProps from "../models/DvaProps";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Pagination,Button,Icon,message} from "antd";
import NavigationBar from './ForumNavigation';







interface TopicProps extends DvaProps{
    allstate:any,
    URL:string;
    unread:any
    photo:any;
}


export class ReplyFormData {

    tid:string;
    text: string;
    quoteIndex: string;
}

export default class TopicPageComponent extends Component<TopicProps>{

    state = {
        editorState: EditorState.createEmpty(),
        showQuote:false,
        replyNum:0,
        topicID:"",
        page:""
    };

    constructor(props) {
        super(props);

    }

    gotoAnotherPage=(page)=>{
        if(page<=this.props.allstate.totalPage){

            var newpath = "/forum/topic/"+this.state.topicID+"/"+page.toString()

            const Data = {tid:this.state.topicID,page:page.toString()};
            this.setState({page:page.toString()})
            this.props.dispatch({type:'topic/getData', payload:Data});
            this.props.dispatch({type:'forumhome/gotoPage', payload:newpath});
        }
    };

    onEditorStateChange: Function = (editorState) => {
        this.setState({
            editorState:editorState,

        });
    };


    replyFloor=(e)=>{
        this.setState({showQuote:true,replyNum:e})
    };

    disappearQuote=(e)=>{
        this.setState({showQuote:false,replyNum:0});
    }
    uploadImageCallBack(){

    }

    deleteTopic(){
        //todo  增加权限检查
        this.props.dispatch({type:'topic/deleteTopic', payload:{topicID:this.props.allstate.topicID,boardID:this.props.allstate.boardID}});
    }


    changeTop(){
        //todo 增加权限检查
        if(parseInt(this.props.allstate.top)==1){
            this.props.dispatch({type:'topic/cancelTop', payload:{topicID:this.props.allstate.topicID}});
        }else{
            this.props.dispatch({type:'topic/setTop', payload:{topicID:this.props.allstate.topicID}});
        }
    }


    gotoPage=(e)=>{
        this.props.dispatch({type:'forumhome/gotoPage', payload:e});
    }
    componentWillMount(){
        var path = document.location.hash.toString();
        const temp = "#/forum/topic/";
        path = path.substring(temp.length);
        var topicID = "";
        var currentPage = "";
        var pos;
        for(var i=0;i<path.length;i++){
            if(path.charAt(i)==='/'){
                pos=i;
                break;
            }else{
                topicID+=path.charAt(i);
            }
        }

        currentPage =  path.substring(pos+1);

        const Data = {tid:topicID,page:currentPage};
        this.setState({topicID:topicID,page:currentPage});
        console.log("下面是帖子数据");
        console.log(Data)
        this.props.dispatch({type:'topic/getData', payload:Data});
        this.props.dispatch({type:"ForumNavigation/updateUnread",payload:{}});

        console.log("看当前页数")
        console.log(this.props.allstate.currentPage)
    }

    postReply =(e)=>{

        var postData = new ReplyFormData;
        postData.tid = this.props.allstate.topicID;
        postData.quoteIndex = this.state.replyNum.toString();
        postData.text =  draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())).toString();

        if(postData.text === "<p></p>\n"){
            message.warning("回复内容不能为空")
        }else{
            this.props.dispatch({type:'topic/postReply', payload:postData})
        }

    };




    render(){
        const { editorState } = this.state;
        var istop;
        if(parseInt(this.props.allstate.top)==1){
            istop="取消置顶"
        }else{
            istop="置顶"
        }
        let replylist = new Array();
        let quoteZone;
        let LZ;
        if(this.props.allstate.currentPage==="1"){
            LZ = <div style={{ marginLeft:200, marginRight:200, marginBottom:20,
                borderStyle:"solid",backgroundColor: "rgb(255,255,255)",
                borderWidth:1,
            }}>
                <div style={{fontSize:15}}>楼主</div>
                <div style={{width:"96%", marginLeft:"auto",marginRight:"auto",marginTop:10}}>

                    <div style={{float:"left"}}>
                        <img src={this.props.photo.url} width="60" height="60" />
                    </div>
                    <div >
                        <div onClick={this.gotoPage.bind(this,"/forum/uid/"+this.props.allstate.lzid)} style={{fontSize:16,fontWeight:"bold",marginLeft:70,marginTop:40,cursor:"pointer",width:100}}>
                            {this.props.allstate.lzname}
                        </div>
                        <div style={{marginLeft:70, fontSize:12 ,borderBottomStyle:"solid", borderBottomWidth:1,}}>发布于{this.props.allstate.lztime}</div>
                        {/*<div style={{marginTop:20 , fontSize:18,borderStyle:"solid"}} dangerouslySetInnerHTML={{__html: draftToHtml(reply.quote)}} />*/}
                        {q}
                        <div style={{marginTop:45 , marginBottom:20,fontSize:18}} dangerouslySetInnerHTML={{__html: this.props.allstate.lztext}} /></div>
                    {/*<div onClick={this.replyFloor.bind(this,"-1")} style={{cursor:"pointer",width:"30px"}} >回复</div>*/}

                </div>
            </div>
        }else{

        }

        if(this.props.allstate.ids==null){

        }else{
            for(var i=0; i<this.props.allstate.ids.length;i++){
                var author = this.props.allstate.names[i];
                var replyKey = this.props.allstate.indexs[i];
                var headurl = this.props.photo.url;
                var time = this.props.allstate.times[i];
                var quote = this.props.allstate.quotes[i];
                var text = this.props.allstate.texts[i];
                var id = this.props.allstate.ids[i];
                var quoteIndex = this.props.allstate.quoteIndexs[i];
                var quoteAuthor = this.props.allstate.quoteAuthors[i];
                var quoteTime  = this.props.allstate.quoteTimes[i];
                var q ;
                if(quote===""){
                }else{
                    q=  <div  style={{marginTop:45 , marginBottom:20, borderStyle:"solid" ,borderWidth:1,backgroundColor:"rgb(200, 200, 200)"}}>
                        <div style={{fontWeight:"bold",marginTop:10,marginLeft:10,fontSize:10}}>以下是引用{quoteIndex}楼用户&nbsp;{quoteAuthor}&nbsp;在{quoteTime}发表的内容</div>
                        <div style={{ marginTop:10,marginLeft:10,fontSize:18}} dangerouslySetInnerHTML={{__html: quote}}></div>
                    </div>;
                }



                replylist.push(
                    <div style={{ marginLeft:200, marginRight:200, marginBottom:20,
                        borderStyle:"solid",backgroundColor: "rgb(255,255,255)",
                        borderWidth:1,
                    }}>
                        <div style={{fontSize:15}}>{replyKey}楼</div>
                        <div style={{width:"96%", marginLeft:"auto",marginRight:"auto",marginTop:10}}>

                            <div style={{float:"left"}}>
                                <img src={headurl} width="60" height="60" />
                            </div>
                            <div >
                                <div onClick={this.gotoPage.bind(this,"/forum/uid/"+id)} style={{fontSize:16,fontWeight:"bold",marginLeft:70,marginTop:40,cursor:"pointer",width:100}}>
                                    {author}
                                </div>
                                <div style={{marginLeft:70, fontSize:12 ,borderBottomStyle:"solid", borderBottomWidth:1,}}>发布于{time}</div>
                                {/*<div style={{marginTop:20 , fontSize:18,borderStyle:"solid"}} dangerouslySetInnerHTML={{__html: draftToHtml(reply.quote)}} />*/}
                                {q}
                                <div style={{marginTop:45 , marginBottom:20,fontSize:18}} dangerouslySetInnerHTML={{__html: text}} /></div>
                            <div onClick={this.replyFloor.bind(this,replyKey)} style={{cursor:"pointer",width:"30px"}}>回复</div>

                        </div>
                    </div>


                )
            }

            quoteIndex = this.props.allstate.indexs[this.state.replyNum-1-10*(this.props.allstate.currentPage-1)];
            quoteAuthor = this.props.allstate.names[this.state.replyNum-1-10*(this.props.allstate.currentPage-1)];
            quoteTime = this.props.allstate.times[this.state.replyNum-1-10*(this.props.allstate.currentPage-1)];
            text = this.props.allstate.texts[this.state.replyNum-1-10*(this.props.allstate.currentPage-1)];

            if(this.state.showQuote==true){
                quoteZone = <div  style={{marginTop:45 , marginBottom:20, borderStyle:"solid" ,borderWidth:1,backgroundColor:"rgb(200, 200, 200)"}}>
                    <div style={{fontWeight:"bold",marginTop:10,marginLeft:10,fontSize:10}}>您将引用{quoteIndex}楼用户&nbsp;{quoteAuthor}&nbsp;在{quoteTime}发表的内容</div>
                    <div style={{ marginTop:10,marginLeft:10,fontSize:18}} dangerouslySetInnerHTML={{__html: text}}></div>
                    <div style={{marginTop:10,marginLeft:10,fontSize:10,cursor:"pointer"}} onClick={this.disappearQuote}>点击取消引用</div>
                </div>
            }else{
                quoteZone = <div></div>
            }
        }

        return(
            <BrowserFrame>
                {/*<div dangerouslySetInnerHTML={{__html: draftToHtml(this.props.testreply)}} />*/}

                <NavigationBar unread={this.props.unread} current={""} dispatch={this.props.dispatch}/>
                <div style={{marginLeft:200,marginTop:10,fontSize:20}}><a onClick={this.gotoPage.bind(this,"/forum/board/"+this.props.allstate.boardID+"/1")}>{this.props.allstate.boardName}</a></div>
                <div >
                    {/*{this.props.allstate.currentPage}*/}
                    <Pagination style={{ marginTop:20,marginLeft:200,marginBottom:20,}} current={parseInt(this.state.page)} showQuickJumper defaultCurrent={parseInt(this.state.page)} total={this.props.allstate.totalPage*10} onChange={this.gotoAnotherPage}/>
                    <div onClick={this.deleteTopic.bind(this)} style={{float:"right",marginRight:200,cursor:"pointer"}}>删除</div>
                    <div onClick={this.changeTop.bind(this)} style={{float:"right",marginRight:10,cursor:"pointer"}}>{istop}</div>
                </div>
                <div style={{marginLeft:200, marginRight:200,marginBottom:20,
                    backgroundColor: "rgb(255,255,255)",fontSize:30,borderStyle:"solid",
                    borderWidth:2,
                }}>
                    <div style={{marginLeft:20,marginTop:10,marginBottom:10}}>
                        <div>{this.props.allstate.title}</div>
                        <div style={{fontSize: 10}}>发帖时间: {this.props.allstate.postTime}</div>
                    </div>

                </div>
                {
                    LZ
                }
                {
                    replylist

                }

                <div>
                    <Pagination style={{marginLeft:200,marginBottom:20,}} showQuickJumper current={parseInt(this.state.page)} defaultCurrent={parseInt(this.state.page)} total={this.props.allstate.totalPage*10} onChange={this.gotoAnotherPage}/>
                    {/*<div style={{float:"left",marginRight:200}}>删除</div>*/}
                    {/*<div style={{float:"left",marginRight:10}}>置顶</div>*/}
                </div>
                <div style={{marginLeft:200,marginTop:10,fontSize:20,marginBottom:20}}><a onClick={this.gotoPage.bind(this,"/forum/board/"+this.props.allstate.boardID+"/1")} >{this.props.allstate.boardName}</a></div>

                <div style={{marginBottom:20,marginLeft:200,marginRight:200,backgroundColor: "rgb(255,255,255)",height:300}}>
                    {quoteZone}
                    <div>上传文件或图片</div>
                    <Editor
                        wrapperClassName="demo-wrapper  "
                        editorClassName="demo-editor"
                        localization={{
                            locale: 'zh',
                        }}
                        toolbar={{
                            image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
                        }}

                        onEditorStateChange={this.onEditorStateChange}
                    />

                </div>
                <div style={{marginLeft:window.innerWidth/2-10,}}> <Button type="primary" onClick={this.postReply}>回复</Button></div>

            </BrowserFrame>
        )

    }



}