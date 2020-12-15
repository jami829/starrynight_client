import React, { Component } from "react";
import "../css/Comments.scss";
const axios = require("axios").default;
import RemovePhoto from "./RemovePhoto";
import RemoveComment from "./RemoveComment";
import KakaoMap from "../KakaoMap";

let fakeData = {
  id: 1,
  photoPath:
    "https://s3.ap-northeast-2.amazonaws.com/mystar-story.com/uploadPhotos/img1.jpg",
  photoTitle: "Test Photo1",
  location: "신촌역 3번출구",
  writer: "Dummy2",
  writerProfilePath: "logologo",
  hashtags: [
    {
      subject: "어딘가1",
    },
  ],
  replies: [
    {
      writerId: 1,
      comment: "멋져요!! 3",
      nickname: "Dummy1",
      commenterProfilePath: "logologo",
      date: "2020.12.14",
    },
    {
      writerId: 1,
      comment: "멋져요!! 6",
      nickname: "Dummy1",
      commenterProfilePath: "logologo",
      date: "2020.12.14",
    },
    {
      writerId: 1,
      comment: "멋져요!! 9",
      nickname: "Dummy1",
      commenterProfilePath: "logologo",
      date: "2020.12.14",
    },
  ],
  favorite: false,
};

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgData: { ...fakeData },
      isRemovePhotoOpen: false,
      isRemoveCommentOpen: false,
      infoOpen: false,
    };
  }

  // 타이틀 수정 페이지 열기
  handleModifyInfo = () => {
    this.setState({
      infoOpen: !this.state.infoOpen,
    });
    // console.log(!this.state.infoOpen);
  };

  // 타이틀 수정 완료(axios 보내기, 수정 반영한 결과 출력)
  completeModifyInfo = () => {
    // onClick시 axios 요청
    // <input type="text" />을 다시 photoTitle로
    this.setState({
      infoOpen: false,
    });
    console.log("타이틀 수정 완료");
  };

  componentDidMount() {
    let url = `https://api.mystar-story.com/${this.props.isCommentId}`;
    axios.get(url).then((data) => {
      this.setState({
        imgData: data.data,
      });
      console.log(this.state.imgData);
    });
  }

  stars = () => {
    console.log(this.props.imgData.location);
  };

  // 모달 창 닫기
  handleModalClose = () => {
    this.props.handleModalClose();
    let myModal = document.querySelector(".myModal");
    let modalContent = document.querySelector(".modalContent");
    myModal.style.display = "none";
    modalContent.style.display = "none";
  };

  // 이미지 삭제 모달 실행
  removePhotoControl = () => {
    this.setState({
      isRemovePhotoOpen: !this.state.isRemovePhotoOpen,
    });
  };

  // 댓글 삭제 모달 실행
  removeCommentControl = () => {
    this.setState({
      isRemoveCommentOpen: !this.state.isRemoveCommentOpen,
    });
  };

  render() {
    return (
      <div>
        {/* ------------------댓글 삭제 모달------------------ */}
        <RemoveComment
          isRemoveCommentOpen={this.state.isRemoveCommentOpen}
          removeCommentControl={this.removeCommentControl}
        />
        {/* ------------------사진 삭제 모달------------------ */}
        <RemovePhoto
          isRemovePhotoOpen={this.state.isRemovePhotoOpen}
          removePhotoControl={this.removePhotoControl}
        />
        {/* ------------------포토뷰모달------------------ */}
        <div className="myModal" onClick={this.handleModalClose}></div>
        <div className="modalContent">
          <div className="modalContent_Left">
            {/* ------------------name------------------ */}
            <div className="photoName">
              {this.state.infoOpen === true ? (
                <div>
                  <input
                    type="text"
                    className="modifyPhotoName"
                    value={this.state.imgData.photoTitle}
                  />
                  <button
                    className="modifyPhotoNameBtn"
                    onClick={this.completeModifyInfo}
                  >
                    수정
                  </button>
                </div>
              ) : (
                this.state.imgData.photoTitle
              )}
            </div>
            {/* ------------------photo------------------ */}
            <img
              className="selectPhoto"
              src={this.state.imgData.photoPath}
              alt="img"
            />
            {/* ------------------hashTag------------------ */}
            <div className="hashTag">
              {this.state.imgData.hashtags.map((res) => {
                return <span>{res.subject}</span>;
              })}
            </div>
            {/* <div className="hashTag">
              <span>test</span>
            </div> */}
            {/* ------------------userInfo(userFace, userName)------------------ */}
            <div className="userInfo">
              <img
                className="userFace"
                src={this.state.imgData.writerProfilePath}
              />
              <span className="userName">{this.state.imgData.writer}</span>
            </div>
            {/* ------------------수정버튼, 삭제버튼------------------ */}
            <div className="btns">
              <button className="modifyBtn" onClick={this.handleModifyInfo}>
                수정
              </button>
              <button className="deleteBtn" onClick={this.removePhotoControl}>
                삭제
              </button>
            </div>
          </div>
          <div className="modalContent_Right">
            {/* ------------------close버튼------------------ */}
            {/* <span className="close" onClick={this.handleModalClose}>
              &times;
            </span> */}
            {/* ------------------지도------------------ */}
            <div className="mapImg">
              <KakaoMap place={this.state.imgData.location} />
            </div>

            {/* ------------------How to go 버튼------------------ */}
            <div className="HowToGo_div">
              <button className="HowToGo">How to go</button>
            </div>
            {/* ------------------favorite 버튼------------------ */}
            <div className="favorite_div">
              <button
                className="favorite"
                // onClick={() => console.log(this.props.imgData.location)}
              >
                별
              </button>
            </div>
            {/* ------------------댓글, 메시지입력btn------------------ */}
            <div className="commentDiv">
              <div className="comments">
                {this.state.imgData.replies.length === 0 ? (
                  <span className="emptyComments">
                    첫번째 댓글을 남겨주세요.
                  </span>
                ) : (
                  this.state.imgData.replies.map((data) => {
                    return (
                      <div className="comment">
                        <img
                          src={data.commenterProfilePath}
                          className="commentFace"
                          alt="img"
                        />
                        <span className="commentUserName">{data.nickname}</span>
                        <span className="commentDate">{data.date}</span>
                        <div className="commentComment">{data.comment}</div>
                        <span className="commentRemove">
                          <button onClick={this.removeCommentControl}>
                            삭제
                          </button>
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
              <button className="commentBtn">메시지를 입력하세요.</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Comments;
