import React, { Component } from 'react';
// import TinyMCE from 'react-tinymce';
import { Editor } from '@tinymce/tinymce-react';

class TinyMCEComponent extends Component {
    constructor(props) {
        super(props);
        this.handleEditorChange = this.handleEditorChange.bind(this);
    }
    handleEditorChange(e) {
        console.log(e.target.getContent());
    }
    render() {
        return (
            <Editor
                initialValue=""
                init={{
                    plugins: 'link image code table ',
                    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | link image | code | table ',
                    image_title: true,
                    automatic_uploads: true,
                    file_picker_types: 'image',
                    file_picker_callback: function (callback, value, meta) {
                        if (meta.filetype == 'image') {
                            var input = document.createElement('input');
                            input.setAttribute('type', 'file');
                            input.setAttribute('accept', 'image/*');
                            input.onchange = function () {
                                var xhr, formData;
                                xhr = new XMLHttpRequest();
                                var file = input.files[0];
                                formData = new FormData();
                                console.log("Uploading, please wait.");
                                formData.append("file", file, file.name);
                                formData.append("rewriteName", file.name);
                                formData.append("pathFolderSave", '/images/UserFeedback/');
                                try {
                                    xhr.open('POST', 'http://sandbox.resources.anbinhairlines.vn/Image/UploadImage/', true);
                                    xhr.setRequestHeader("Authorization", "Bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NDcwOTI3NTIsImlzcyI6IkFCQWlyU2VydmljZSIsImF1ZCI6IkFCQWlyU2VydmljZSJ9.4F7_rqiSDOuYlGc5vTh1TyN0RoFERGcz7wtHUQNZ3PU');
                                    xhr.onreadystatechange = function () {
                                        if (xhr.readyState == 4) {
                                            if (xhr.status == 200) {
                                                callback(xhr.response, { alt: 'My alt text' });
                                            } else {
                                                console.log('upload error', xhr.response);
                                            }
                                        }
                                    };
                                    xhr.send(formData);
                                } catch (e) {
                                    xhr.abort();
                                }
                            };
                            input.click();
                        }
                    }
                }}
                onChange={this.handleEditorChange}
            />
        )
    }
}
export default TinyMCEComponent;