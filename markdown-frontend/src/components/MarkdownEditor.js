import React, { useState } from 'react';
import axios from 'axios';
import "../styles/MarkdownEditorStyles.css";
import ReactModal from 'react-modal';

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState('');
  const [html, setHtml] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleChange = async(e) => {
    try{
        const newMarkdown = e.target.value;
        console.log(newMarkdown);
        if(newMarkdown.length === 0){
          setHtml('');
          setMarkdown('');
          return;
        }
        setMarkdown(newMarkdown);
       await axios.post('http://localhost:5000/convert', { markdown: newMarkdown })
          .then(response => {
            console.log(response.data);
            setHtml(response.data.html);
          });
    }catch(err){
      console.log(err);
      alert("Something went wrong");
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(html).then(() => {
      alert('HTML copied to clipboard!');
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  };



  return (
    <div className='container'>
        <div className="header">
        <h1 className='heading-style'>Markdown Editor</h1>
        {html?.length > 0 &&  <button className="show-html-button" onClick={openModal}>Show HTML</button>}
      </div>
      <div className="editor-container">
      <div className="input-area">
        <textarea
          className="markdown-input"
          value={markdown}
          onChange={handleChange}
          placeholder="Enter Markdown here..."
        />
      </div>
      <div className="preview-area">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
    <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="HTML Code Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <h1 className='close-modal' onClick={closeModal}>X</h1>
        <h2>HTML Code</h2>
        <div className="modal-content">
        <pre>{html}</pre>
        </div>
        <div className="button-container">
          <button onClick={copyToClipboard}>Copy HTML</button>
          <button onClick={closeModal}>Close</button>
        </div>
      </ReactModal>
    </div>
  );
};

export default MarkdownEditor;