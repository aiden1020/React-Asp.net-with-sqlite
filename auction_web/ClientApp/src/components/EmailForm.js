import React, { useState } from 'react';

const EmailForm = () => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 使用 fetch 函式呼叫 API
    const response = await fetch('/api/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: to,
        subject: subject,
        body: body,
      }),
    });

    if (response.ok) {
      alert('Email sent successfully!');
      // 清空表單
      setTo('');
      setSubject('');
      setBody('');
    } else {
      alert('Failed to send email.');
    }
  };

  return (
    <div>
      <h1>Email Form</h1>
      <form onSubmit={handleSubmit}>
        <label>To:</label>
        <input type="text" value={to} onChange={(e) => setTo(e.target.value)} required />

        <label>Subject:</label>
        <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required />

        <label>Body:</label>
        <textarea value={body} onChange={(e) => setBody(e.target.value)} required />

        <button type="submit">Send Email</button>
      </form>
    </div>
  );
};

export default EmailForm;
