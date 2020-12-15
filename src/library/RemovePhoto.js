// import Axios from "axios";
const axios = require("axios").default;
import React, { Component } from "react";
import "../css/RemovePhoto.css";

class RemovePhoto extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    if (this.props.isRemovePhotoOpen) {
      let myModal = document.querySelector(".myModal_RemovePhoto");
      myModal.style.display = "block";
    }
  }

  handleRemovePhotoModalClose = () => {
    this.props.removePhotoControl();
    let modal = document.querySelector(".myModal_RemovePhoto");
    modal.style.display = "none";
  };

  removePhoto = () => {
    //this.props.photoId
    console.log(this.props.photoId);
    let url = `https://mystar-story.com/${this.props.photoId}/delete`;
    axios
      .delete(url, {
        data: {
          id: this.props.photoId,
        },
      })
      .then((res) => {
        alert(res);
        window.location.replace("/");
      })
      .catch((err) => {
        alert(err);
      });

    // axios
    //   .delete(
    //     url,
    //     {
    //       id: this.props.photoId,
    //     }
    //     // withCredentials: true,
    //   )
    //   .then((res) => {
    //     alert(res);
    //     window.location.replace("/");
    //   })
    //   .catch((err) => {
    //     alert(err);
    //   });
  };

  render() {
    return (
      <div>
        <div>
          <div className="myModal_RemovePhoto">
            <div className="modalContent_RemovePhoto">
              <div className="removePhoto_text">
                사진 삭제
                <hr />
              </div>
              <button
                className="removePhoto_DeleteBtn"
                onClick={this.removePhoto}
              >
                삭제
              </button>
              <br />
              <button
                className="removePhoto_ReturnBtn"
                onClick={this.handleRemovePhotoModalClose}
              >
                돌아가기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RemovePhoto;
